import { techStackItems } from "../data/techStackData";

/** Lightweight tech stack — no WebGL/Rapier (prevents home-page scroll crashes). */
const TechStack = () => {
  return (
    <div className="techstack">
      <h2> My Techstack</h2>
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
    </div>
  );
};

export default TechStack;
