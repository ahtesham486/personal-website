import { techStackItems } from "../data/techStackData";

export default function TechStackFallback() {
  return (
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
  );
}
