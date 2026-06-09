import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { getRendererPixelRatio, isLowEndDevice } from "@/lib/performance";
import { createWebGLRenderer } from "@/lib/webgl";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const mountedRef = useRef(false);
  const [, setChar] = useState<THREE.Object3D | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (mountedRef.current || !canvasDiv.current) return;
    mountedRef.current = true;

    const markFallback = () => {
      setWebglFailed(true);
      document.querySelector(".character-container")?.classList.add("character-loaded");
    };

    try {
      const containerEl = canvasDiv.current;
      const rect = containerEl.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height || 1;
      const scene = sceneRef.current;

      const renderer = createWebGLRenderer({
        antialias: !isLowEndDevice(),
      });

      if (!renderer) {
        console.warn("[Character] WebGL renderer could not be created — showing fallback.");
        markFallback();
        return;
      }

      const gl = renderer;

      gl.setSize(container.width, container.height);
      gl.setPixelRatio(getRendererPixelRatio());
      gl.toneMapping = THREE.ACESFilmicToneMapping;
      gl.toneMappingExposure = 1;
      containerEl.appendChild(gl.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let character: THREE.Object3D | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(gl, scene, camera);

      loadCharacter()
        .then((gltf) => {
          if (gltf) {
            const animations = setAnimations(gltf);
            hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
            character = gltf.scene;
            setChar(character);
            scene.add(character);
            headBone = character.getObjectByName("spine006") || null;
            screenLight = character.getObjectByName("screenlight") || null;
            light.turnOnLights();
            animations.startIntro();
            document.querySelector(".character-container")?.classList.add("character-loaded");
            window.addEventListener("resize", () =>
              handleResize(gl, camera, canvasDiv, character!)
            );
          }
        })
        .catch((err) => {
          console.error("[Character] Failed to load 3D model:", err);
          markFallback();
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: ReturnType<typeof setTimeout> | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let animId = 0;
      let isVisible = true;
      let isInView = true;
      let loopRunning = false;

      function animate() {
        if (!isVisible || !isInView) {
          loopRunning = false;
          animId = 0;
          return;
        }

        animId = requestAnimationFrame(animate);

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        gl.render(scene, camera);
      }

      function ensureLoop() {
        if (loopRunning || !isVisible || !isInView) return;
        loopRunning = true;
        animId = requestAnimationFrame(animate);
      }

      const onVisibility = () => {
        isVisible = document.visibilityState === "visible";
        ensureLoop();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const viewObserver = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;
          ensureLoop();
        },
        { threshold: 0.05 }
      );
      viewObserver.observe(containerEl);

      ensureLoop();
      return () => {
        mountedRef.current = false;
        loopRunning = false;
        if (animId) cancelAnimationFrame(animId);
        viewObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        clearTimeout(debounce);
        scene.clear();
        gl.dispose();
        window.removeEventListener("resize", () =>
          handleResize(gl, camera, canvasDiv, character!)
        );
        if (containerEl.contains(gl.domElement)) {
          containerEl.removeChild(gl.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    } catch (err) {
      console.warn("[Character] WebGL setup failed:", err);
      markFallback();
    }
  }, []);

  return (
    <div className="character-container">
      <div
        className={`character-model${webglFailed ? " character-fallback" : ""}`}
        ref={canvasDiv}
      >
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
