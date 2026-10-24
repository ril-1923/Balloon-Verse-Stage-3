import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CHECKPOINT_COUNT, getMissionTargets } from '../../simulation/missionTargets';
import { liveSession } from '../../simulation/sessionRuntime';
import type { WorldDefinition } from '../../simulation/worldDefinitions';
import { effectiveTracked, useProgressStore } from '../../store/useProgressStore';

const NEXT = new THREE.Color('#ffc857');
const PASSED = new THREE.Color('#5ee08a');
const FUTURE = new THREE.Color('#d8ecff');

function CheckpointRings({ world }: { world: WorldDefinition }) {
  const targets = useMemo(() => getMissionTargets(world), [world]);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const beams = useRef<(THREE.Mesh | null)[]>([]);

  const yaw = useMemo(
    () => targets.checkpoints.map((c, i) => {
      const prev = i === 0 ? { x: world.launch.x, z: world.launch.z } : targets.checkpoints[i - 1];
      return Math.atan2(c.x - prev.x, c.z - prev.z);
    }),
    [targets, world],
  );

  useFrame(({ clock }) => {
    const passed = liveSession.run?.checkpointsPassed ?? 0;
    const pulse = 1 + Math.sin(clock.elapsedTime * 4) * 0.06;
    for (let i = 0; i < CHECKPOINT_COUNT; i++) {
      const m = mats.current[i];
      const g = groups.current[i];
      const b = beams.current[i];
      if (!m || !g) continue;
      const isNext = i === passed;
      m.color.copy(i < passed ? PASSED : isNext ? NEXT : FUTURE);
      m.opacity = i < passed ? 0.35 : isNext ? 1 : 0.55;
      g.scale.setScalar(isNext ? pulse : 1);
      if (b) b.visible = isNext;
    }
  });

  return (
    <group>
      {targets.checkpoints.map((c, i) => (
        <group key={i} ref={(el) => { groups.current[i] = el; }} position={[c.x, c.y, c.z]} rotation={[0, yaw[i], 0]}>
          <mesh>
            <torusGeometry args={[14, 0.9, 10, 40]} />
            <meshBasicMaterial ref={(el) => { mats.current[i] = el; }} color="#d8ecff" transparent opacity={0.6} toneMapped={false} fog={false} />
          </mesh>
          <mesh ref={(el) => { beams.current[i] = el; }} position={[0, 60, 0]} visible={false}>
            <cylinderGeometry args={[1.2, 1.2, 120, 8, 1, true]} />
            <meshBasicMaterial color="#ffc857" transparent opacity={0.25} toneMapped={false} depthWrite={false} fog={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ScenicBeacon({ world }: { world: WorldDefinition }) {
  const t = useMemo(() => getMissionTargets(world).scenic, [world]);
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.visible = !liveSession.run?.scenicReached;
    if (ring.current) ring.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 3) * 0.08);
  });
  return (
    <group ref={group} position={[t.x, t.ground, t.z]}>
      <mesh position={[0, 90, 0]}>
        <cylinderGeometry args={[3, 3, 180, 12, 1, true]} />
        <meshBasicMaterial color="#5cc8ff" transparent opacity={0.28} toneMapped={false} depthWrite={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring} position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[30, 36, 40]} />
        <meshBasicMaterial color="#5cc8ff" transparent opacity={0.7} toneMapped={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function LandingZone({ world }: { world: WorldDefinition }) {
  const z = useMemo(() => getMissionTargets(world).zone, [world]);
  return (
    <group position={[z.x, z.y + 1.2, z.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[z.radius - 2, z.radius, 48]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.01]} position={[0, 0.05, 0]}>
        <ringGeometry args={[z.radius * 0.45, z.radius * 0.62, 48]} />
        <meshBasicMaterial color="#ff8a3d" toneMapped={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <circleGeometry args={[z.radius * 0.18, 24]} />
        <meshBasicMaterial color="#ffc857" toneMapped={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 45, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 90, 8, 1, true]} />
        <meshBasicMaterial color="#ff8a3d" transparent opacity={0.35} toneMapped={false} depthWrite={false} fog={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** 3D markers for the tracked mission: checkpoint rings, scenic beacon or landing zone. */
export function MissionMarkers({ world }: { world: WorldDefinition }) {
  const tracked = useProgressStore((s) => effectiveTracked(s));
  if (tracked === 'cloud-chaser') return <CheckpointRings world={world} />;
  if (tracked === 'mountain-explorer') return <ScenicBeacon world={world} />;
  if (tracked === 'precision-landing') return <LandingZone world={world} />;
  return null;
}
