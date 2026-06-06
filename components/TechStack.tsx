import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { isLowEndDevice } from "@/lib/performance";
import { techStackItems } from "../data/techStackData";
import { createTechTexture } from "./utils/createTechTexture";

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereCount = isLowEndDevice() ? 6 : techStackItems.length;

const spheres = [...Array(sphereCount)].map((_, i) => ({
  scale: [0.75, 0.95, 0.85][i % 3],
  techIndex: i % techStackItems.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale)
      );
    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.85}
      angularDamping={0.2}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh scale={scale} geometry={sphereGeometry} material={material} rotation={[0.3, 1, 1]} />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldRender(true);
        setIsActive(entry.isIntersecting);
      },
      { rootMargin: "200px", threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    Promise.all(techStackItems.map((item) => createTechTexture(item))).then((textures) => {
      setMaterials(
        textures.map(
          (texture) =>
            new THREE.MeshStandardMaterial({
              map: texture,
              metalness: 0.25,
              roughness: 0.55,
            })
        )
      );
    });
  }, []);

  const sphereMaterials = useMemo(() => {
    if (!materials.length) return [];
    return spheres.map((s) => materials[s.techIndex]);
  }, [materials]);

  return (
    <div className="techstack" ref={sectionRef}>
      <h2> My Techstack</h2>

      {shouldRender && sphereMaterials.length > 0 ? (
        <Canvas
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          className="tech-canvas"
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                scale={props.scale}
                material={sphereMaterials[i]}
                isActive={isActive}
              />
            ))}
          </Physics>
        </Canvas>
      ) : (
        <div className="techstack-fallback">
          {techStackItems.map((item) => (
            <div
              key={item.name}
              className="techstack-fallback-pill"
              style={{ background: item.bg, color: item.fg }}
            >
              {item.image ? (
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
              ) : (
                <span>{item.subtitle || item.name}</span>
              )}
              <small>{item.name}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechStack;
