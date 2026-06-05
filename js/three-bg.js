import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const canvas = document.getElementById('heroWebgl');

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
const isMobile = window.matchMedia?.('(max-width: 768px)')?.matches;

if (!canvas || prefersReducedMotion || isMobile) {
  // Keep visuals lightweight and accessible.
  if (canvas) canvas.style.display = 'none';
} else {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0.15, 6.5);

  const group = new THREE.Group();
  scene.add(group);

  // Soft lights.
  const key = new THREE.DirectionalLight(0xa78bfa, 1.1);
  key.position.set(4, 3, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x6366f1, 0.9);
  fill.position.set(-5, -2, 4);
  scene.add(fill);

  // A minimal “signature” object (abstract torus-knot) inspired vibe, not copied.
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.05, 0.33, 220, 28),
    new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.35,
      metalness: 0.35,
      emissive: 0x1b1040,
      emissiveIntensity: 0.45,
    })
  );
  knot.position.set(1.4, -0.15, 0);
  knot.rotation.set(0.35, 0.5, 0.1);
  group.add(knot);

  // Particles.
  const count = 700;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const c1 = new THREE.Color(0x6366f1);
  const c2 = new THREE.Color(0xa78bfa);

  for (let i = 0; i < count; i++) {
    const r = 5.2 * Math.pow(Math.random(), 0.55);
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 3.2;

    positions[i * 3 + 0] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r - 2.0;

    const t = Math.random();
    const cc = c1.clone().lerp(c2, t);
    colors[i * 3 + 0] = cc.r;
    colors[i * 3 + 1] = cc.g;
    colors[i * 3 + 2] = cc.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  group.add(points);

  // Subtle fog to blend.
  scene.fog = new THREE.FogExp2(0x0a0a0f, 0.09);

  let targetX = 0;
  let targetY = 0;
  let mx = 0;
  let my = 0;

  window.addEventListener(
    'mousemove',
    (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = (e.clientX - cx) / cx;
      targetY = (e.clientY - cy) / cy;
    },
    { passive: true }
  );

  function resize() {
    const hero = document.querySelector('.hero-bg') || canvas.parentElement;
    const w = hero?.clientWidth || window.innerWidth;
    const h = hero?.clientHeight || Math.max(520, window.innerHeight * 0.75);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();

  function tick() {
    const dt = clock.getDelta();
    const t = clock.elapsedTime;

    // Ease mouse.
    mx += (targetX - mx) * 0.06;
    my += (targetY - my) * 0.06;

    group.rotation.y = 0.2 * Math.sin(t * 0.2) + mx * 0.35;
    group.rotation.x = 0.1 * Math.sin(t * 0.17) - my * 0.18;

    knot.rotation.y += dt * 0.22;
    knot.rotation.x += dt * 0.08;
    points.rotation.y -= dt * 0.04;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}

