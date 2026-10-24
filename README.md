# BalloonVerse 3D — Explore Beyond the Horizon

A browser-based 3D hot air balloon flight simulator built with React, TypeScript, Three.js and React Three Fiber.

> **Status: Stage 3 of 4 (core + worlds + Balloon Studio, missions, achievements, dashboard and persistence).** See [Implemented](#implemented) and [Not yet built](#not-yet-built) below. This README only describes what exists in this repository.

## Implemented

**Stage 1 (core)**
- Home screen with a 3D balloon over a procedural valley, pointer parallax and a no-WebGL fallback.
- Flight simulator (`#/simulator`): real-geometry balloon (lathe envelope with coloured gores, woven basket, ropes, animated burner flame), simplified flight model (heat-based buoyancy, altitude-dependent wind, steering, limits, soft world boundary), flight states Grounded → Inflating → Taking off → Flying → Descending → Landing → Landed, soft/hard landing detection, ground collision, flight timer, distance and best altitude.
- Four cameras (Chase, Basket, Side, Cinematic) with smooth blending and ground clamping.
- HUD with altitude ladder, vertical/ground speed, timer, distance, compass, wind dial, burner and air-heat gauges; collapsible; pause menu; control guide; Reset Flight; Return to Launch autopilot; keyboard, mouse and touch (pointer-event hold buttons) controls.
- *This is a game model, not physically accurate aerodynamics.*

**Stage 3 (game systems and persistence)**
- **Balloon Studio** (`#/studio`): large live 3D preview (drag to orbit, optional auto-rotation); 10 presets (Sunrise Gold, Ocean Blue, Sunset Orange, Forest Green, Royal Purple, Candy Rainbow, Midnight Star, Arctic Ice, Desert Sand, Neon Adventure); three colour slots with 12 swatches plus a free colour picker; 6 patterns (solid, vertical stripes, horizontal stripes, alternating panels, rainbow, checkerboard); 4 materials (fabric, satin, matte, glossy); 3 baskets; 4 burner flame effects; balloon name. The balloon you design is the one you fly.
- **Design library:** save, load, rename and delete designs (delete asks for confirmation). Saving stores the full configuration. Names are trimmed, limited to 28 characters, must not be empty, and duplicates are numbered ("Ocean Blue (2)"). Five example designs are saved on first use and can be restored.
- **Eight missions** that run on the real simulation (`#/missions`): First Flight (real takeoff), Sky Explorer (climb 120 m), Cloud Chaser (five 3D rings in order), Mountain Explorer (fly over a scenic beacon), Wind Rider (600 m while the wind is at least 2 m/s), Golden Hour (a whole 60 s+ flight in golden-hour or sunset light, then a soft landing), Precision Landing (soft landing inside a marked ring), Long-Distance Adventure (reach 500 m out, then land softly within 60 m of the pad). Each has a description, objective, reward, progress bar and completion state. Rewards are paid once.
- **3D markers** for the tracked mission: glowing checkpoint rings (next ring highlighted and pulsing), a scenic beacon, or a landing target. Markers are generated per world. Spatial missions (rings, beacon, landing zone) only count while they are the tracked mission; the HUD shows the tracked mission's progress and the distance and compass direction to the next target.
- **Ten achievements** (First Takeoff, First Landing, High Flyer, Cloud Explorer, Mountain Adventurer, Sunset Traveler, Mission Master, World Explorer, Gentle Touch, Marathon Flyer) with locked/unlocked states and toast notifications. They unlock only when their real conditions are met.
- **Flight Dashboard** (`#/dashboard`): total flights, flight time, distance, highest altitude, successful landings, missions, achievements, favourite world and most-used balloon; a flight history table; Recharts charts (flight duration, altitude records, distance by environment, mission completion). With no flights it shows an empty state with a Start First Flight button. Flights are recorded when they end in a landing, or when you reset or leave after at least 10 s in the air (logged as "Ended early"). Nothing is pre-filled.
- **Persistence** (LocalStorage, versioned `balloonverse:v1:*` keys): current balloon and saved designs, progress (missions, achievements, history, lifetime statistics) and the selected world, time of day, weather and wind. Reads never throw: corrupt JSON, wrong types or unusable entries fall back to defaults, and valid parts are kept. Mission points are recomputed from completed missions.
- Home screen now shows a "Customize Balloon" button, your real flying log, missions and achievement badges.
- Test suite (195 tests) covering physics, worlds, atmosphere, every mission condition, achievements, flight-session recording against the real simulation, storage recovery, designs and progress persistence.

## Not yet built

- Stage 4: Settings page (graphics quality, volume, sensitivity, HUD and motion options, **Reset Progress with confirmation**), audio, final polish. The progress-reset logic already exists in the store and is tested, but there is no button for it yet.
- Rain, snow and lightning.

## Technology

React 18, TypeScript (strict), Vite 5, Three.js 0.169, @react-three/fiber 8, @react-three/drei 9, Zustand, React Router (HashRouter), Bootstrap 5 + custom CSS, Lucide icons, Vitest. Fonts (Fraunces, Figtree) are bundled locally via Fontsource, so there are no external requests. No backend, API keys or paid services.

## Getting started

```bash
npm install
npm run dev        # development server
npm run typecheck  # TypeScript check
npm test           # run the automated tests
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build locally
```

## Controls

| Key | Action |
| --- | --- |
| W / Space / ↑ | Burner (climb). Pressing it while grounded starts the lift-off. |
| S / ↓ | Vent hot air (descend) |
| A / ← and D / → | Steer left / right |
| C | Cycle camera |
| R | Reset flight |
| P or Esc | Pause / resume |

Touch and mouse: use the on-screen Burner, Vent and arrow buttons.

**Landing tip:** keep the sink rate under about 2.5 m/s using short burner bursts. Without the burner the air keeps cooling and you will land hard.

## Deploying to GitHub Pages

1. Push this project to a GitHub repository whose default branch is `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually). `.github/workflows/deploy.yml` installs, tests, builds and publishes `dist/`.

The Vite `base` is `./` and routing uses `HashRouter`, so no repository name or server rewrite rules are needed.

## Verification status

| Check | Status |
| --- | --- |
| `tsc --noEmit` (strict) | Passes |
| `vitest run` (195 tests) | Passes |
| `vite build` | Passes |
| Rendering, lighting and sky colours, controls, cameras, touch input, HUD layout in a real browser | **Not tested** — the build environment had no browser or GPU. Please run the app and check these yourself. |
| GitHub Pages workflow | **Not run** — written but never executed. |

## Known limitations

- Nothing has been seen running in a browser by me. The Studio, Missions and Dashboard pages, the 3D mission markers, toasts, charts and layouts have only been type-checked, unit-tested and built. Sky, light and fog values (`src/simulation/atmosphere.ts`) are tuned by reasoning rather than by eye.
- Missions are tracked one at a time for the spatial ones; checkpoint progress is not carried between flights. Only the best percentage per mission is remembered.
- A flight must last 10 s or more to be logged if you end it early. The history keeps the latest 100 flights; lifetime totals keep counting.
- Data lives in this browser only. Private windows or blocked storage fall back to memory and are lost on close.
- Lakes use a tinted translucent surface, not real reflections. Switching world rebuilds terrain on the main thread, so a short hitch is possible.
- No audio yet. Graphics quality is not user-configurable yet.
- Visual tuning (camera distances, flame look, HUD spacing on small screens, chart sizing on phones) has not been checked on real devices.
