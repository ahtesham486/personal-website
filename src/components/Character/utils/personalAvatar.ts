import * as THREE from "three";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const THEME = {
  blazer: 0x4f46e5,
  blazerDark: 0x3730a3,
  shirt: 0x12101a,
  skin: 0xc9a27a,
  hair: 0x2b1f14,
  desk: 0xf4f4f8,
  chair: 0x312e81,
  monitor: 0x1a1a24,
  screenGlow: 0xc8bfff,
  accent: 0x8b5cf6,
};

function mat(color: number, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.08,
    ...opts,
  });
}

export function createPersonalAvatar(faceUrl: string): Promise<THREE.Group> {
  return new Promise((resolve, reject) => {
    const root = new THREE.Group();
    root.name = "personalAvatar";

    const loader = new THREE.TextureLoader();
    loader.load(
      faceUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.center.set(0.5, 0.5);

        // --- Skeleton-compatible groups (for scroll + head tracking) ---
        const spine005 = new THREE.Group();
        spine005.name = "spine005";
        spine005.position.set(0, 4.2, 0.2);

        const spine006 = new THREE.Group();
        spine006.name = "spine006";
        spine006.position.set(0, 0.35, 0.15);

        // Face from your photo
        const face = new THREE.Mesh(
          new THREE.CircleGeometry(0.62, 64),
          new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.85,
            metalness: 0,
          })
        );
        face.position.set(0, 0.05, 0.42);
        face.name = "facePhoto";

        const hair = new THREE.Mesh(
          new THREE.SphereGeometry(0.66, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
          mat(THEME.hair, { roughness: 0.9 })
        );
        hair.position.set(0, 0.28, -0.05);
        hair.rotation.x = -0.15;

        const headShell = new THREE.Mesh(
          new THREE.SphereGeometry(0.68, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5),
          mat(THEME.skin, { roughness: 0.75 })
        );
        headShell.position.set(0, -0.08, 0.1);
        headShell.scale.set(1, 0.9, 0.85);

        spine006.add(headShell, hair, face);
        spine005.add(spine006);

        // --- Body (purple theme blazer) ---
        const torso = new THREE.Mesh(
          new THREE.CylinderGeometry(0.95, 1.1, 2.2, 16),
          mat(THEME.blazer)
        );
        torso.position.set(0, 2.6, 0);
        torso.rotation.x = 0.08;

        const shirt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55, 0.65, 1.1, 12),
          mat(THEME.shirt)
        );
        shirt.position.set(0, 3.35, 0.12);

        const collar = new THREE.Mesh(
          new THREE.TorusGeometry(0.42, 0.07, 8, 24),
          mat(THEME.blazerDark)
        );
        collar.position.set(0, 3.75, 0.2);
        collar.rotation.x = Math.PI / 2;

        // Arms
        const makeArm = (side: number) => {
          const arm = new THREE.Group();
          const upper = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.2, 1.1, 10),
            mat(THEME.blazer)
          );
          upper.rotation.z = side * 0.9;
          upper.position.set(side * 0.55, 0, 0);
          const fore = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.17, 0.95, 10),
            mat(THEME.blazerDark)
          );
          fore.rotation.z = side * 0.4;
          fore.position.set(side * 1.05, -0.55, 0.35);
          const hand = new THREE.Mesh(
            new THREE.SphereGeometry(0.17, 12, 12),
            mat(THEME.skin)
          );
          hand.position.set(side * 1.25, -1.05, 0.55);
          arm.add(upper, fore, hand);
          arm.position.set(side * 1.05, 3.4, 0.1);
          return arm;
        };

        // Chair
        const seat = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.35, 2.2),
          mat(THEME.chair)
        );
        seat.position.set(0, 1.35, -0.3);

        const backrest = new THREE.Mesh(
          new THREE.BoxGeometry(2.3, 2.4, 0.25),
          mat(THEME.blazerDark)
        );
        backrest.position.set(0, 2.8, -1.15);
        backrest.rotation.x = -0.12;

        // Desk
        const desk = new THREE.Mesh(
          new THREE.BoxGeometry(5.5, 0.18, 2.4),
          mat(THEME.desk, { roughness: 0.35 })
        );
        desk.position.set(0.3, 1.05, 1.6);

        // Keyboard
        const keyboard = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.08, 0.55),
          mat(0x2a2a35)
        );
        keyboard.position.set(0.2, 1.2, 1.35);

        // Monitor (compatible names for GsapScroll)
        const plane004 = new THREE.Group();
        plane004.name = "Plane004";
        plane004.position.set(0.5, 2.8, 2.1);
        plane004.rotation.x = -0.08;

        const monitorFrame = new THREE.Mesh(
          new THREE.BoxGeometry(2.6, 1.55, 0.12),
          mat(THEME.monitor)
        );

        const monitorScreen = new THREE.Mesh(
          new THREE.PlaneGeometry(2.35, 1.3),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            emissive: 0x222233,
            emissiveIntensity: 0.2,
          })
        );
        monitorScreen.name = "Material.027";
        monitorScreen.material.name = "Material.027";
        monitorScreen.position.set(0, 0, 0.07);

        plane004.add(monitorFrame, monitorScreen);

        const screenlight = new THREE.Mesh(
          new THREE.PlaneGeometry(2.5, 1.4),
          new THREE.MeshStandardMaterial({
            color: THEME.screenGlow,
            transparent: true,
            opacity: 0,
            emissive: THEME.screenGlow,
            emissiveIntensity: 0,
            side: THREE.DoubleSide,
          })
        );
        screenlight.name = "screenlight";
        screenlight.position.set(0.5, 2.75, 2.05);
        screenlight.rotation.x = -0.08;

        // Feet placeholders (original GLB compatibility)
        const footL = new THREE.Object3D();
        footL.name = "footL";
        footL.position.set(-0.4, 0.2, 0.5);
        const footR = new THREE.Object3D();
        footR.name = "footR";
        footR.position.set(0.4, 0.2, 0.5);

        // Purple accent ring under desk
        const glowRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.8, 0.06, 8, 48),
          mat(THEME.accent, { emissive: THEME.accent, emissiveIntensity: 0.6 })
        );
        glowRing.rotation.x = Math.PI / 2;
        glowRing.position.set(0, 0.05, 1.2);

        root.add(
          glowRing,
          seat,
          backrest,
          torso,
          shirt,
          collar,
          spine005,
          makeArm(-1),
          makeArm(1),
          desk,
          keyboard,
          plane004,
          screenlight,
          footL,
          footR
        );

        root.position.set(0, -0.5, 0);
        root.rotation.y = -0.15;
        root.scale.set(1.15, 1.15, 1.15);

        resolve(root);
      },
      undefined,
      (err) => reject(err)
    );
  });
}

export function loadPersonalCharacter(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  faceUrl = "/images/ahtasham-face.png"
) {
  return createPersonalAvatar(faceUrl).then(async (character) => {
    await renderer.compileAsync(character, camera, scene);
    character.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });
    setCharTimeline(character, camera);
    setAllTimeline();
    return character;
  });
}
