import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// --- Original cartoon GLB loader (kept — switch USE_PERSONAL_AVATAR to false to restore) ---
// import setCharacter from "./utils/character";
// import setAnimations from "./utils/animationUtils";
import { loadPersonalCharacter } from "./utils/personalAvatar";
import { USE_PERSONAL_AVATAR } from "../../data/avatarConfig";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import { getRendererPixelRatio, isLowEndDevice } from "../../utils/performance";

let sceneMounted = false;

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const [, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (sceneMounted || !canvasDiv.current) return;
    sceneMounted = true;

    const canvas = canvasDiv.current;
    const rect = canvas.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowEndDevice(),
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(getRendererPixelRatio());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvas.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | undefined;
    let loadedCharacter: THREE.Object3D | null = null;
    let idlePhase = 0;

    const clock = new THREE.Clock();
    const light = setLighting(scene);

    const loadAvatar = async () => {
      if (USE_PERSONAL_AVATAR) {
        const avatar = await loadPersonalCharacter(renderer, scene, camera);
        loadedCharacter = avatar;
        setChar(avatar);
        scene.add(avatar);
        headBone = avatar.getObjectByName("spine006") || null;
        screenLight = avatar.getObjectByName("screenlight") || null;
        light.turnOnLights();
        document.querySelector(".character-container")?.classList.add("character-loaded");
        return;
      }

      /* --- ORIGINAL CARTOON GLB (uncomment block + imports to restore) ---
      const { loadCharacter } = setCharacter(renderer, scene, camera);
      const gltf = await loadCharacter();
      if (gltf) {
        const animations = setAnimations(gltf);
        hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
        mixer = animations.mixer;
        loadedCharacter = gltf.scene;
        setChar(loadedCharacter);
        scene.add(loadedCharacter);
        headBone = loadedCharacter.getObjectByName("spine006") || null;
        screenLight = loadedCharacter.getObjectByName("screenlight") || null;
        light.turnOnLights();
        animations.startIntro();
        document.querySelector(".character-container")?.classList.add("character-loaded");
      }
      --- END ORIGINAL --- */
    };

    loadAvatar().then(() => {
      if (loadedCharacter) {
        window.addEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, loadedCharacter!)
        );
      }
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

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
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    landingDiv?.addEventListener("touchstart", onTouchStart);
    landingDiv?.addEventListener("touchend", onTouchEnd);

    let animId = 0;
    let isVisible = true;
    const onVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }
      if (screenLight) {
        light.setPointLight(screenLight);
      }

      // Subtle idle breathing for personal avatar
      if (USE_PERSONAL_AVATAR && loadedCharacter) {
        idlePhase += clock.getDelta();
        const neck = loadedCharacter.getObjectByName("spine005");
        if (neck) {
          neck.position.y = 4.2 + Math.sin(idlePhase * 1.2) * 0.03;
        }
      }

      if (mixer) {
        mixer.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      sceneMounted = false;
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();
      if (loadedCharacter) {
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, loadedCharacter!)
        );
      }
      if (canvas.contains(renderer.domElement)) {
        canvas.removeChild(renderer.domElement);
      }
      document.removeEventListener("mousemove", onMouseMove);
      landingDiv?.removeEventListener("touchstart", onTouchStart);
      landingDiv?.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
