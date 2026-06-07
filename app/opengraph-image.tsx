import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

export const alt = `${siteConfig.name} — Python Developer & AI Automation Expert`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0b080c",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#c481ff",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 40, color: "#eae5ec", marginBottom: 16 }}>
          Python Developer &amp; AI Automation Expert
        </div>
        <div style={{ fontSize: 28, color: "#9b8aab" }}>
          Custom websites · WhatsApp bots · n8n · Lahore, Pakistan
        </div>
        <div style={{ fontSize: 26, color: "#c481ff", marginTop: 48 }}>ahtasham.site</div>
      </div>
    ),
    { ...size }
  );
}
