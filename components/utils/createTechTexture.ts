import * as THREE from "three";
import type { TechItem } from "../../data/techStackData";

const loader = new THREE.TextureLoader();

export function createTechTexture(item: TechItem): Promise<THREE.Texture> {
  if (item.image) {
    return new Promise((resolve, reject) => {
      loader.load(
        item.image!,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          resolve(tex);
        },
        undefined,
        reject
      );
    });
  }

  return Promise.resolve(makeCanvasTexture(item));
}

function makeCanvasTexture(item: TechItem): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const cx = size / 2;
  const r = size * 0.46;

  const grad = ctx.createRadialGradient(cx, cx * 0.85, r * 0.1, cx, cx, r);
  grad.addColorStop(0, lighten(item.bg, 40));
  grad.addColorStop(0.55, item.bg);
  grad.addColorStop(1, darken(item.bg, 30));

  ctx.beginPath();
  ctx.arc(cx, cx, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 6;
  ctx.stroke();

  const label = item.subtitle || item.name;
  const isShort = label.length <= 3;

  ctx.fillStyle = item.fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (isShort) {
    ctx.font = `bold ${label.length > 2 ? 118 : 140}px Inter, Arial, sans-serif`;
    ctx.fillText(label, cx, cx + 8);
  } else {
    ctx.font = "bold 72px Inter, Arial, sans-serif";
    wrapText(ctx, label, cx, cx, 280, 78);
  }

  ctx.font = "600 34px Inter, Arial, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  if (isShort && item.name !== label) {
    ctx.fillText(item.name, cx, cx + r * 0.55);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = test;
    }
  }
  lines.push(line.trim());
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((ln, i) => ctx.fillText(ln, x, startY + i * lineHeight));
}

function lighten(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + amount);
  const g = Math.min(255, ((n >> 8) & 255) + amount);
  const b = Math.min(255, (n & 255) + amount);
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - amount);
  const g = Math.max(0, ((n >> 8) & 255) - amount);
  const b = Math.max(0, (n & 255) - amount);
  return `rgb(${r},${g},${b})`;
}
