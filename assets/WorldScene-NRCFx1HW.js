import{r as g,u as O,j as d,e as be}from"./r3f-DTRQ_kAm.js";import{I as V,o as X,p as K,d as ve,c as S,Q,q as $,r as B,E as ce,f as q,s as G,t as D,u as I,v as J,w as Me,h as A,x as we,y as Se,z as ke,F as Ee,G as le,H as ee,J as ue,K as Ae,X as Ce,D as ze,Y as Re}from"./three-B6SRsD9o.js";import{w as je,r as te,l as E,m as Ge,n as ne,o as oe,p as se}from"./Balloon-D3OyHkgc.js";import{I as W,J as ae,N as fe,O as Te,P as b,Q as Pe,S as Ye,U as Be}from"./index-B-oDs1r1.js";const j=900;function Ie(e,t,o,n){const s=W(t),i=[];for(let m=0;m<e;m++){const f=.7+s()*1.1,r=[],h=5+Math.floor(s()*4);for(let a=0;a<h;a++)r.push({ox:(s()-.5)*70*f,oy:(s()-.3)*8*f,oz:(s()-.5)*30*f,s:(12+s()*14)*f});i.push({x:(s()*2-1)*j,y:o+s()*(n-o),z:(s()*2-1)*j,puffs:r})}return i}const re=e=>((e+j)%(2*j)+2*j)%(2*j)-j;function De({count:e=22,seed:t=12,minY:o=160,maxY:n=340,followWind:s=!0,drift:i=[2.4,-1.4]}){const m=g.useMemo(()=>Ie(e,t,o,n),[e,t,o,n]),f=g.useMemo(()=>{const u=[0];return m.forEach(l=>u.push(u[u.length-1]+l.puffs.length)),u},[m]),r=g.useMemo(()=>new V(1,1),[]),h=g.useMemo(()=>new X({color:"#ffffff",emissive:"#dfeaf7",emissiveIntensity:.35,roughness:1,flatShading:!0,transparent:!0,opacity:.93,depthWrite:!1}),[]),a=g.useMemo(()=>{const u=new K(r,h,f[f.length-1]);return u.frustumCulled=!1,u},[r,h,f]),c=g.useMemo(()=>({m:new $,q:new Q,p:new S,s:new S,off:new ve}),[]);return O((u,l)=>{const y=Math.min(l,.1),p=E;let M=i[0],H=i[1];if(s){const C=je(te.world,te.time),z=1.2+C.strength*.9;M=Math.sin(C.direction)*z,H=-Math.cos(C.direction)*z}c.off.x+=M*p.cloudSpeed*y,c.off.y+=H*p.cloudSpeed*y;const L=Math.round(p.cloudCoverage*m.length);a.count=f[L];let ge=0;for(let C=0;C<L;C++){const z=m[C],ye=re(z.x+c.off.x),xe=re(z.z+c.off.y);for(const T of z.puffs)c.p.set(ye+T.ox,z.y+T.oy,xe+T.oz),c.s.set(T.s*1.5,T.s*.7,T.s),c.m.compose(c.p,c.q,c.s),a.setMatrixAt(ge++,c.m)}a.instanceMatrix.needsUpdate=!0,h.color.copy(p.cloudColor).multiplyScalar(p.cloudDark),h.emissive.copy(p.cloudColor).multiplyScalar(.28*p.cloudDark),h.opacity=p.cloudOpacity}),g.useEffect(()=>()=>{r.dispose(),h.dispose(),a.dispose()},[r,h,a]),d.jsx("primitive",{object:a})}function Fe({color:e,count:t,radius:o,minH:n,maxH:s,seed:i}){const m=g.useMemo(()=>new B(1,1,7,1),[]),f=g.useMemo(()=>new X({color:e,flatShading:!0,roughness:1}),[e]),r=g.useMemo(()=>{const h=new K(m,f,t),a=W(i),c=new $;for(let u=0;u<t;u++){const l=u/t*Math.PI*2+a()*.12,y=o+a()*160,p=n+a()*(s-n),M=170+a()*150;c.compose(new S(Math.sin(l)*y,p/2-40,Math.cos(l)*y),new Q().setFromEuler(new ce(0,a()*6,0)),new S(M,p,M)),h.setMatrixAt(u,c)}return h.instanceMatrix.needsUpdate=!0,h.frustumCulled=!1,h},[m,f,i,o,t,n,s]);return g.useEffect(()=>()=>{m.dispose(),f.dispose(),r.dispose()},[m,f,r]),d.jsx("primitive",{object:r})}function me(e,t,o=1){const n=Math.max(0,Math.round(t.count*o)),s=W(t.seed*9973+e.seed),i=[],m=e.size/2-40,f=t.launchClear??60,r=t.seed%90+1,h=(c,u)=>{if(Math.abs(c)>m||Math.abs(u)>m||Math.hypot(c-e.launch.x,u-e.launch.z)<f)return null;const l=e.heightAt(c,u);return l<t.minY||l>t.maxY||e.blocked(c,u)||ae(e,c,u)>t.maxSlope?null:l},a=[];if(t.cluster){for(let c=0;c<4e3&&a.length<t.cluster.centres;c++){const u=(s()*2-1)*m,l=(s()*2-1)*m;Math.hypot(u,l)<t.cluster.minDistFromLaunch||h(u,l)===null||ae(e,u,l,12)>.14||a.some(y=>Math.hypot(y.x-u,y.z-l)<t.cluster.radius*2.5)||a.push({x:u,z:l,angle:s()*Math.PI})}if(a.length===0)return i}for(let c=0;c<n*8&&i.length<n;c++){let u,l,y=s()*Math.PI*2;if(t.cluster){const M=a[Math.floor(s()*a.length)],H=t.cluster.radius*Math.sqrt(s()),L=s()*Math.PI*2;u=M.x+Math.cos(L)*H,l=M.z+Math.sin(L)*H,y=M.angle+(s()-.5)*.35+(s()<.5?0:Math.PI/2)}else u=(s()*2-1)*m,l=(s()*2-1)*m;const p=h(u,l);if(p!==null){if(t.density){const M=fe(u*t.density.scale,l*t.density.scale,3,r);if(M<t.density.threshold||s()>Te((M-t.density.threshold+.06)*2.2,0,1))continue}i.push({x:u,y:p-(t.kind==="rock"?.4:.3),z:l,scale:t.scale[0]+s()*(t.scale[1]-t.scale[0]),rotation:y,tint:.82+s()*.28})}}return i}function He(e,t=!1){const o=e[0].index!==null,n=new Set(Object.keys(e[0].attributes)),s=new Set(Object.keys(e[0].morphAttributes)),i={},m={},f=e[0].morphTargetsRelative,r=new q;let h=0;for(let a=0;a<e.length;++a){const c=e[a];let u=0;if(o!==(c.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const l in c.attributes){if(!n.has(l))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+'. All geometries must have compatible attributes; make sure "'+l+'" attribute exists among all geometries, or in none of them.'),null;i[l]===void 0&&(i[l]=[]),i[l].push(c.attributes[l]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+". Make sure all geometries have the same number of attributes."),null;if(f!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const l in c.morphAttributes){if(!s.has(l))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+".  .morphAttributes must be consistent throughout all geometries."),null;m[l]===void 0&&(m[l]=[]),m[l].push(c.morphAttributes[l])}if(t){let l;if(o)l=c.index.count;else if(c.attributes.position!==void 0)l=c.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+a+". The geometry must have either an index or a position attribute"),null;r.addGroup(h,l,a),h+=l}}if(o){let a=0;const c=[];for(let u=0;u<e.length;++u){const l=e[u].index;for(let y=0;y<l.count;++y)c.push(l.getX(y)+a);a+=e[u].attributes.position.count}r.setIndex(c)}for(const a in i){const c=ie(i[a]);if(!c)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+a+" attribute."),null;r.setAttribute(a,c)}for(const a in m){const c=m[a][0].length;if(c===0)break;r.morphAttributes=r.morphAttributes||{},r.morphAttributes[a]=[];for(let u=0;u<c;++u){const l=[];for(let p=0;p<m[a].length;++p)l.push(m[a][p][u]);const y=ie(l);if(!y)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+a+" morphAttribute."),null;r.morphAttributes[a].push(y)}}return r}function ie(e){let t,o,n,s=-1,i=0;for(let h=0;h<e.length;++h){const a=e[h];if(t===void 0&&(t=a.array.constructor),t!==a.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(o===void 0&&(o=a.itemSize),o!==a.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=a.normalized),n!==a.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=a.gpuType),s!==a.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=a.count*o}const m=new t(i),f=new G(m,o,n);let r=0;for(let h=0;h<e.length;++h){const a=e[h];if(a.isInterleavedBufferAttribute){const c=r/o;for(let u=0,l=a.count;u<l;u++)for(let y=0;y<o;y++){const p=a.getComponent(u,y);f.setComponent(u+c,y,p)}}else m.set(a.array,r);r+=a.count*o}return s!==void 0&&(f.gpuType=s),f}function w(e,t){const o=new A(t),n=e.getAttribute("position").count,s=new Float32Array(n*3);for(let i=0;i<n;i++)s[i*3]=o.r,s[i*3+1]=o.g,s[i*3+2]=o.b;return e.setAttribute("color",new G(s,3)),e}function F(e){const t=e.map(n=>{const s=n.index?n.toNonIndexed():n;return s!==n&&n.dispose(),s}),o=He(t);if(t.forEach(n=>n.dispose()),!o)throw new Error("Failed to merge prop geometry");return o}function Le(){const e=w(new I(.35,.5,2.4,6),"#6b4a2f").translate(0,1.2,0),t=w(new B(2.8,5,7),"#2f6b3c").translate(0,4.4,0),o=w(new B(2.2,4.4,7),"#3a7d44").translate(0,7,0),n=w(new B(1.4,3.6,7),"#468a4c").translate(0,9.3,0);return F([e,t,o,n])}function Ue(){const e=w(new I(.4,.55,3,6),"#6b4a2f").translate(0,1.5,0),t=w(new V(3.4,0),"#4f9140").translate(0,5.6,0),o=w(new V(2.3,0),"#62a44c").translate(1.6,7,.8),n=w(new V(2.1,0),"#468a3a").translate(-1.5,6.6,-.9);return F([e,t,o,n])}function Oe(){const e="#4e8a4a",t=w(new I(.55,.65,5.4,7),e).translate(0,2.7,0),o=w(new Me(.55,7,4),e).translate(0,5.4,0),n=w(new D(1.3,.55,.55),e).translate(.9,3,0),s=w(new I(.34,.38,2.2,6),e).translate(1.5,4,0),i=w(new D(1.1,.5,.5),e).translate(-.8,3.9,0),m=w(new I(.3,.34,1.8,6),e).translate(-1.3,4.7,0);return F([t,o,n,s,i,m])}function We(){const e=w(new J(2.2,0),"#ffffff");e.scale(1,.72,.9),e.translate(0,.9,0);const t=w(new J(1.2,0),"#d8d8d8");return t.scale(1,.8,1),t.translate(2.1,.5,.8),F([e,t])}function he(e,t,o,n){const s=w(new B(1,o,4),n);return s.rotateY(Math.PI/4),s.scale(e/2*Math.SQRT2*.94,1,t/2*Math.SQRT2*.94),s}function _e(){const e=w(new D(6,4,8),"#f1e6cf").translate(0,2,0),t=he(7,9,3.2,"#b5482f").translate(0,4+1.6,0),o=w(new D(1.2,2.2,.2),"#5b3a22").translate(0,1.1,4.05);return F([e,t,o])}function Ne(){const e=w(new D(8,5,12),"#a63a2c").translate(0,2.5,0),t=he(9,13,3.6,"#4d4540").translate(0,5+1.8,0),o=w(new I(1.8,1.8,9,10),"#cfd3d6").translate(7,4.5,0),n=w(new B(2,1.6,10),"#8b929a").translate(7,9.8,0);return F([e,t,o,n])}const Ve={pine:Le,broadleaf:Ue,cactus:Oe,rock:We,house:_e,barn:Ne};function Xe({world:e,spec:t,countScale:o=1}){const n=g.useMemo(()=>Ve[t.kind](),[t.kind]),s=g.useMemo(()=>me(e,t,o),[e,t,o]),i=g.useMemo(()=>{const m=new X({vertexColors:!0,flatShading:!0,roughness:1,color:t.color??"#ffffff"}),f=new K(n,m,Math.max(1,s.length)),r=new $,h=new Q,a=new ce,c=new S,u=new S,l=new A;return s.forEach((y,p)=>{h.setFromEuler(a.set(0,y.rotation,0));const M=t.kind==="pine"?1.1:1;r.compose(c.set(y.x,y.y,y.z),h,u.set(y.scale,y.scale*M,y.scale)),f.setMatrixAt(p,r),f.setColorAt(p,l.setScalar(y.tint))}),f.count=s.length,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),f.frustumCulled=!1,f},[n,s,t.color,t.kind]);return g.useEffect(()=>()=>{i.material.dispose(),i.dispose()},[i]),g.useEffect(()=>()=>n.dispose(),[n]),d.jsx("primitive",{object:i})}class Z extends we{constructor(){const t=Z.SkyShader,o=new Se({name:t.name,uniforms:Ee.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:ke,depthWrite:!1});super(new D(1,1,1),o),this.isSky=!0}}Z.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new S},up:{value:new S(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const _=4200;function qe({moonDir:e}){const t=g.useRef(null),o=g.useMemo(()=>{const f=W(2024),r=1600,h=new Float32Array(r*3),a=new Float32Array(r*3),c=new A;for(let l=0;l<r;l++){const y=f()*1.15-.15,p=f()*Math.PI*2,M=Math.sqrt(Math.max(0,1-y*y));h[l*3]=Math.cos(p)*M*_,h[l*3+1]=y*_,h[l*3+2]=Math.sin(p)*M*_,c.setHSL(.58+f()*.12,.35,.72+f()*.28),a.set([c.r,c.g,c.b],l*3)}const u=new q;return u.setAttribute("position",new G(h,3)),u.setAttribute("color",new G(a,3)),u},[]),n=g.useMemo(()=>new le({size:2.4,sizeAttenuation:!1,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),[]),s=g.useMemo(()=>new ee({color:"#f6f3e6",fog:!1,transparent:!0,opacity:0,depthWrite:!1}),[]),i=g.useMemo(()=>new ee({color:"#9bb8ff",fog:!1,transparent:!0,opacity:0,depthWrite:!1,blending:ue}),[]);g.useEffect(()=>()=>{o.dispose(),n.dispose(),s.dispose(),i.dispose()},[o,n,s,i]),O(({camera:f})=>{const r=t.current;if(!r)return;const h=E.stars;r.visible=h>.01,r.visible&&(r.position.copy(f.position),n.opacity=h,s.opacity=Math.min(1,h*1.2)*(E.night>.4?1:0),i.opacity=s.opacity*.18)});const m=e.clone().multiplyScalar(_*.95).toArray();return d.jsxs("group",{ref:t,visible:!1,renderOrder:-1,children:[d.jsx("points",{geometry:o,material:n,frustumCulled:!1}),d.jsx("mesh",{position:m,material:s,children:d.jsx("sphereGeometry",{args:[85,24,16]})}),d.jsx("mesh",{position:m,material:i,children:d.jsx("sphereGeometry",{args:[190,24,16]})})]})}function Ze({world:e,timeOfDay:t,weather:o}){const{scene:n,gl:s}=be(),i=g.useMemo(()=>Ge(t,o,e.fog),[t,o,e]),m=g.useRef(i);m.current=i;const f=g.useMemo(()=>{const p=new Z;return p.scale.setScalar(45e4),p},[]),r=g.useMemo(()=>new Ae("#b9d6ee",220,1500),[]),h=g.useRef(null),a=g.useRef(null),c=g.useRef(null),u=g.useMemo(()=>new S,[]),l=g.useMemo(()=>ne(oe.elevation,oe.azimuth,new S),[]),y=()=>{const p=E,M=f.material.uniforms;ne(p.sunElevation,p.sunAzimuth,u),M.sunPosition.value.copy(u),M.turbidity.value=p.turbidity,M.rayleigh.value=p.rayleigh,M.mieCoefficient.value=p.mie,M.mieDirectionalG.value=p.mieG,r.color.copy(p.fogColor),r.near=p.fogNear,r.far=p.fogFar,s.toneMappingExposure=p.exposure,h.current&&(h.current.position.copy(u).multiplyScalar(400),h.current.color.copy(p.sunColor),h.current.intensity=p.sunIntensity*(u.y>-.05?1:0)),a.current&&(a.current.intensity=p.moonIntensity),c.current&&(c.current.color.copy(p.hemiSky),c.current.groundColor.copy(p.hemiGround),c.current.intensity=p.hemiIntensity)};return g.useLayoutEffect(()=>(n.fog=r,se(m.current,1),y(),()=>{n.fog=null,s.toneMappingExposure=1}),[n,r,s]),g.useEffect(()=>()=>f.material.dispose(),[f]),O((p,M)=>{se(m.current,1-Math.exp(-Math.min(M,.1)*1.6)),y()},-1),d.jsxs(d.Fragment,{children:[d.jsx("primitive",{object:f}),d.jsx("hemisphereLight",{ref:c,args:["#bcd9ff","#6d8a4a",1]}),d.jsx("directionalLight",{ref:h,position:[200,200,200],intensity:2}),d.jsx("directionalLight",{ref:a,position:l.clone().multiplyScalar(400).toArray(),color:"#9bb8ff",intensity:0}),d.jsx(qe,{moonDir:l})]})}const x=e=>new A(e),v=(e,t,o)=>e.lerp(t,Math.min(1,Math.max(0,o))),k={grassLow:x("#4f9a45"),grassHigh:x("#86a35a"),meadow:x("#6fae4e"),rock:x("#7b7873"),rockDark:x("#5d5b59"),snow:x("#f3f7fb"),bank:x("#8f8a62"),plateau:x("#7fb35a")};function Ke(e,t){t.copy(k.grassLow),v(t,k.meadow,e.patch),v(t,k.grassHigh,b(40,150,e.y)),e.y<13&&v(t,k.bank,b(13,9.5,e.y)),v(t,e.patch>.5?k.rock:k.rockDark,Math.max(b(.22,.45,e.steep),b(150,230,e.y)*.9)),v(t,k.snow,b(250,310,e.y+e.patch*30)*(1-b(.5,.75,e.steep)*.6)),v(t,k.plateau,1-b(30,70,e.r))}const de=["#b9c66a","#7fb04a","#a2b955","#6e9f3f","#d2c26b","#8c6d3f","#93b84f"].map(x),P={grass:x("#5fa646"),hill:x("#7fae52"),road:x("#b59a6a"),bank:x("#9c9468"),rock:x("#8a8780"),plateau:x("#79b457")};function Qe(e,t){const n=Math.floor((e*Math.cos(.42)-t*Math.sin(.42))/70),s=Math.floor((e*Math.sin(.42)+t*Math.cos(.42))/70);let i=Math.imul(n,374761393)^Math.imul(s,668265263);return i=Math.imul(i^i>>>13,1274126177),(i>>>0)%de.length}function $e(e,t){t.copy(P.grass),v(t,P.hill,e.patch);const o=1-b(.08,.2,e.steep);v(t,de[Qe(e.x,e.z)],o*b(60,110,e.r)*.85*(1-b(48,70,e.y))),e.y<14&&v(t,P.bank,b(14,11.5,e.y)),v(t,P.rock,b(.35,.6,e.steep)),v(t,P.road,1-b(3.5,7.5,Ye(e.x,e.z))),v(t,P.plateau,1-b(30,70,e.r))}const Y={sand:x("#e3c58a"),sandAlt:x("#d6ac70"),sandDark:x("#c99a5f"),mesa:x("#b0653c"),mesaDark:x("#8c4a2c"),plateau:x("#e8cf98")};function Je(e,t){t.copy(Y.sand),v(t,Y.sandAlt,e.patch),v(t,Y.sandDark,b(.1,.35,e.steep)*.7);const o=Math.floor(e.y/7)%2===0?Y.mesa:Y.mesaDark;v(t,o,Math.max(Pe(e.x,e.z)*b(60,80,e.y),b(.45,.7,e.steep))),v(t,Y.plateau,1-b(30,70,e.r))}const R={grass:x("#4f9a52"),grassHigh:x("#7ea65c"),sand:x("#d9cba0"),bed:x("#2f7088"),rock:x("#7b7a78"),snow:x("#eef3f8"),plateau:x("#7ab45c")};function et(e,t){t.copy(R.grass),v(t,R.grassHigh,b(50,170,e.y)*.8),v(t,R.sand,b(10.5,6.8,e.y)),v(t,R.bed,b(6.2,1,e.y)),v(t,R.rock,Math.max(b(.25,.5,e.steep),b(160,240,e.y)*.9)),v(t,R.snow,b(250,310,e.y+e.patch*30)*(1-b(.5,.75,e.steep)*.5)),v(t,R.plateau,1-b(30,70,e.r))}const U={gold:x("#b9a24a"),dry:x("#8f7b3a"),rock:x("#6e5048"),dark:x("#4d3a3f"),plateau:x("#bfa857")};function tt(e,t){t.copy(U.gold),v(t,U.dry,e.patch),v(t,e.patch>.5?U.rock:U.dark,Math.max(b(.25,.5,e.steep),b(80,130,e.y)*.5)),v(t,U.plateau,1-b(30,70,e.r))}const N={grass:x("#3e6b52"),grassAlt:x("#4a7a5a"),rock:x("#5c6068"),plateau:x("#4c7f60")};function nt(e,t){t.copy(N.grass),v(t,N.grassAlt,e.patch),v(t,N.rock,Math.max(b(.28,.5,e.steep),b(110,170,e.y)*.8)),v(t,N.plateau,1-b(30,70,e.r))}const ot={"mountain-valley":{terrainColor:Ke,scatter:[{kind:"pine",seed:1,count:1800,minY:12,maxY:200,maxSlope:.75,density:{scale:.009,threshold:.46},scale:[.8,1.7]}],ring:{color:"#8aa3bf",count:46,radius:1050,minH:380,maxH:760,seed:4},clouds:{minY:160,maxY:340,count:22,seed:12},horizon:"#8fa7a0",launchPad:{stone:"#9aa0a6",ring:"#ff8a3d",inner:"#ffc857"}},"green-countryside":{terrainColor:$e,scatter:[{kind:"broadleaf",seed:2,count:1100,minY:14,maxY:90,maxSlope:.6,density:{scale:.008,threshold:.5},scale:[.8,1.5]},{kind:"pine",seed:3,count:250,minY:40,maxY:120,maxSlope:.6,density:{scale:.01,threshold:.52},scale:[.8,1.4]},{kind:"house",seed:4,count:36,minY:16,maxY:60,maxSlope:.2,scale:[.9,1.15],launchClear:130,cluster:{centres:3,radius:48,minDistFromLaunch:160}},{kind:"barn",seed:5,count:9,minY:16,maxY:55,maxSlope:.18,scale:[.95,1.2],launchClear:110}],ring:{color:"#86a98f",count:40,radius:900,minH:220,maxH:380,seed:5},clouds:{minY:150,maxY:300,count:22,seed:21},horizon:"#6f9a60",launchPad:{stone:"#a7a39a",ring:"#e8590c",inner:"#ffd166"}},"desert-adventure":{terrainColor:Je,scatter:[{kind:"rock",seed:6,count:260,minY:20,maxY:110,maxSlope:.9,scale:[.7,2.2],color:"#a8643d"},{kind:"cactus",seed:7,count:170,minY:20,maxY:80,maxSlope:.35,density:{scale:.01,threshold:.55},scale:[.8,1.5]}],ring:{color:"#c58a58",count:44,radius:1050,minH:200,maxH:380,seed:6},clouds:{minY:220,maxY:380,count:22,seed:31},horizon:"#d7b27a",launchPad:{stone:"#c7b08a",ring:"#a63a2c",inner:"#f5d57a"}},"lake-paradise":{terrainColor:et,scatter:[{kind:"pine",seed:8,count:1500,minY:8.5,maxY:170,maxSlope:.7,density:{scale:.009,threshold:.44},scale:[.8,1.7]},{kind:"broadleaf",seed:9,count:380,minY:8.5,maxY:30,maxSlope:.5,density:{scale:.014,threshold:.42},scale:[.7,1.3]}],ring:{color:"#8fa9c2",count:46,radius:1050,minH:380,maxH:740,seed:7},clouds:{minY:130,maxY:300,count:22,seed:41},horizon:"#7fa0a0",launchPad:{stone:"#a3a8ad",ring:"#2fa4d6",inner:"#ffd166"}},"sunset-horizon":{terrainColor:tt,scatter:[{kind:"broadleaf",seed:10,count:520,minY:14,maxY:110,maxSlope:.55,density:{scale:.008,threshold:.52},scale:[.7,1.3]},{kind:"rock",seed:11,count:140,minY:14,maxY:130,maxSlope:.9,scale:[.7,1.8],color:"#6b4f47"}],ring:{color:"#3b2a4c",count:52,radius:980,minH:260,maxH:520,seed:8},clouds:{minY:140,maxY:320,count:22,seed:51},horizon:"#6f5646",launchPad:{stone:"#9a9088",ring:"#e8590c",inner:"#ffd166"}},"night-sky":{terrainColor:nt,scatter:[{kind:"pine",seed:12,count:1e3,minY:12,maxY:170,maxSlope:.7,density:{scale:.009,threshold:.47},scale:[.8,1.6]},{kind:"rock",seed:13,count:90,minY:12,maxY:150,maxSlope:.9,scale:[.7,1.6],color:"#6a6e76"}],ring:{color:"#4b5878",count:46,radius:1e3,minH:300,maxH:560,seed:9},clouds:{minY:160,maxY:320,count:18,seed:61},horizon:"#33475a",launchPad:{stone:"#8d939b",ring:"#5cc8ff",inner:"#ffc857"}}};function pe(e){return ot[e]}const st=(e,t)=>fe(e*.02,t*.02,3,21);function at(e,t){const o=new Ce(e.size,e.size,t,t);o.rotateX(-Math.PI/2);const n=o.getAttribute("position");for(let r=0;r<n.count;r++)n.setY(r,e.heightAt(n.getX(r),n.getZ(r)));o.computeVertexNormals();const s=o.getAttribute("normal"),i=new Float32Array(n.count*3),m=new A,{terrainColor:f}=pe(e.id);for(let r=0;r<n.count;r++){const h=n.getX(r),a=n.getZ(r);f({x:h,y:n.getY(r),z:a,steep:1-s.getY(r),patch:st(h,a),r:Math.hypot(h,a)},m),i[r*3]=m.r,i[r*3+1]=m.g,i[r*3+2]=m.b}return o.setAttribute("color",new G(i,3)),o}function rt({world:e,segments:t=160}){const o=g.useMemo(()=>at(e,t),[e,t]);return g.useEffect(()=>()=>o.dispose(),[o]),d.jsx("mesh",{geometry:o,children:d.jsx("meshStandardMaterial",{vertexColors:!0,flatShading:!0,roughness:1,metalness:0})})}function it(e){const t=e.river,o=[],n=[];if(t){const m=e.size/2-20;let f=0;for(let r=-m;r<=m;r+=16){const h=t.centerX(r);if(!(Math.hypot(h,r)>t.maxRadius)){if(o.push(h-t.halfWidth,t.level,r,h+t.halfWidth,t.level,r),f>0){const a=(f-1)*2;n.push(a,a+2,a+1,a+1,a+2,a+3)}f++}}}const s=new q;return s.setAttribute("position",new Re(o,3)),s.setIndex(n),s.computeVertexNormals(),s}function ct({world:e}){const t=g.useMemo(()=>e.river?it(e):null,[e]),o=g.useMemo(()=>new X({color:"#3d9fd6",roughness:.18,metalness:.2,transparent:!0,opacity:.88,side:ze}),[]);g.useEffect(()=>()=>{t==null||t.dispose(),o.dispose()},[t,o]);const n=g.useMemo(()=>new A,[]),s=g.useMemo(()=>new A(e.lake?"#2a86b8":"#3d9fd6"),[e]);return O(()=>{n.copy(s).multiplyScalar(.35+.65*E.dayLight).lerp(E.fogColor,.28),o.color.copy(n),o.emissive.copy(E.fogColor).multiplyScalar(.12)}),d.jsxs(d.Fragment,{children:[t&&d.jsx("mesh",{geometry:t,material:o}),e.lake&&d.jsx("mesh",{position:[e.lake.cx,e.lake.level,e.lake.cz],rotation:[-Math.PI/2,0,0],material:o,children:d.jsx("circleGeometry",{args:[e.lake.discRadius,64]})})]})}function lt({world:e}){const t=g.useMemo(()=>{var r;const n=Be(),s=new S(Math.cos(n.angle),0,Math.sin(n.angle)),i=e.heightAt(n.x-s.x*36,n.z-s.z*36),m=e.heightAt(n.x+s.x*36,n.z+s.z*36),f=Math.max(i,m,(((r=e.river)==null?void 0:r.level)??12)+3)+.8;return{...n,deck:f}},[e]),o=[-27,-13.5,0,13.5,27];return d.jsxs("group",{position:[t.x,0,t.z],rotation:[0,-t.angle,0],children:[d.jsxs("mesh",{position:[0,t.deck,0],children:[d.jsx("boxGeometry",{args:[78,.8,7.5]}),d.jsx("meshStandardMaterial",{color:"#8a6a45",roughness:.95})]}),[-3.6,3.6].map(n=>d.jsxs("mesh",{position:[0,t.deck+1.1,n],children:[d.jsx("boxGeometry",{args:[78,.25,.25]}),d.jsx("meshStandardMaterial",{color:"#6e5233",roughness:.95})]},n)),o.map(n=>[-3.3,3.3].map(s=>d.jsxs("mesh",{position:[n,(t.deck+6)/2+1,s],children:[d.jsx("boxGeometry",{args:[.5,t.deck-6,.5]}),d.jsx("meshStandardMaterial",{color:"#6e5233",roughness:.95})]},`${n}${s}`)))]})}function ut({world:e}){const{geometry:t,material:o}=g.useMemo(()=>{const n=me(e,{kind:"house",seed:99,count:1400,minY:10,maxY:90,maxSlope:.3,scale:[1,1],launchClear:300,cluster:{centres:4,radius:60,minDistFromLaunch:380}}),s=W(5),i=new Float32Array(n.length*3),m=new Float32Array(n.length*3),f=new A;n.forEach((a,c)=>{i.set([a.x,a.y+3+s()*4,a.z],c*3),f.set(s()<.7?"#ffd9a0":s()<.5?"#fff6e0":"#ffb868"),m.set([f.r,f.g,f.b],c*3)});const r=new q;r.setAttribute("position",new G(i,3)),r.setAttribute("color",new G(m,3));const h=new le({size:6,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:0,blending:ue,depthWrite:!1,fog:!1});return{geometry:r,material:h}},[e]);return g.useEffect(()=>()=>{t.dispose(),o.dispose()},[t,o]),O(()=>{o.opacity=Math.min(1,E.night*1.1)*.95}),d.jsx("points",{geometry:t,material:o,frustumCulled:!1})}function ft({world:e}){return e.id==="green-countryside"?d.jsx(lt,{world:e}):e.id==="night-sky"?d.jsx(ut,{world:e}):null}function gt({world:e,timeOfDay:t,weather:o,detail:n="full",followWind:s=!0}){const i=pe(e.id),m=n==="hero";return d.jsxs(d.Fragment,{children:[d.jsx(Ze,{world:e,timeOfDay:t,weather:o}),d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,e.lake?-12:-3,0],children:[d.jsx("circleGeometry",{args:[5e3,32]}),d.jsx("meshStandardMaterial",{color:i.horizon,roughness:1})]}),d.jsx(rt,{world:e,segments:m?120:160}),d.jsx(ct,{world:e}),i.scatter.map((f,r)=>d.jsx(Xe,{world:e,spec:f,countScale:m?.55:1},`${e.id}-${r}`)),d.jsx(Fe,{...i.ring}),d.jsx(De,{...i.clouds,followWind:s}),d.jsx(ft,{world:e})]})}export{gt as W,pe as g};
