"use client";

import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  type RapierRigidBody,
} from "@react-three/rapier";
import { isLowEndDevice } from "@/lib/performance";
import { techStackItems } from "../data/techStackData";
import { createTechTexture } from "./utils/createTechTexture";
import TechStackFallback from "./TechStackFallback";

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereCount = isLowEndDevice() ? 6 : techStackItems.length;

const spheres = [...Array(sphereCount)].map((_, i) => ({
  scale: [0.75, 0.95, 0.85][i % 3],
  techIndex: i % techStackItems.length,
}));

function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

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
    const dt = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(new THREE.Vector3(-50 * dt * scale, -150 * dt * scale, -50 * dt * scale));
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
    ref.current.setNextKinematicTranslation(
      vec.lerp(
        new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        ),
        0.2
      )
    );
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

type SceneProps = {
  sphereMaterials: THREE.MeshStandardMaterial[];
  isActive: boolean;
};

function TechStackScene({ sphereMaterials, isActive }: SceneProps) {
  return (
    <Physics gravity={[0, 0, 0]}>
      <Pointer isActive={isActive} />
      {spheres.map((props, i) => {
        const material = sphereMaterials[i];
        if (!material) return null;
        return (
          <SphereGeo
            key={i}
            scale={props.scale}
            material={material}
            isActive={isActive}
          />
        );
      })}
    </Physics>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [materials, setMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
  const [useFallback, setUseFallback] = useState(() => {
    if (typeof window === "undefined") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return !hasWebGL();
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldRender(true);
        setIsActive(entry.isIntersecting);
      },
      { rootMargin: "120px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (useFallback) return;

    let cancelled = false;

    Promise.all(techStackItems.map((item) => createTechTexture(item)))
      .then((textures) => {
        if (cancelled) return;
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
      })
      .catch((err) => {
        console.warn("TechStack textures failed:", err);
        if (!cancelled) setUseFallback(true);
      });

    return () => {
      cancelled = true;
    };
  }, [useFallback]);

  const sphereMaterials = useMemo(() => {
    if (!materials.length) return [];
    return spheres.map((s) => materials[s.techIndex]).filter(Boolean);
  }, [materials]);

  const showCanvas =
    !useFallback && shouldRender && sphereMaterials.length === spheres.length;

  return (
    <div className="techstack" ref={sectionRef}>
      <h2> My Techstack</h2>

      {showCanvas ? (
        <Canvas
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          className="tech-canvas"
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <TechStackScene sphereMaterials={sphereMaterials} isActive={isActive} />
          </Suspense>
        </Canvas>
      ) : (
        <TechStackFallback />
      )}
    </div>
  );
};

export default TechStack;
