import { site } from "../data/site.js";

const EQ_BARS = Array.from({ length: 22 }, (_, i) => i);
const NOTES = ["\u266A", "\u266B", "\u266C", "\u2669", "\u266A", "\u266B"];

// Two full sine periods so the wave can scroll seamlessly at -50%.
const WAVE_D =
  "M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 C1680,80 1920,240 2160,160 C2400,80 2640,240 2880,160 L2880,320 L0,320 Z";

function Wave({ className }) {
  return (
    <svg
      className={`hero-wave ${className}`}
      viewBox="0 0 2880 320"
      preserveAspectRatio="none"
    >
      <path d={WAVE_D} />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-orb hero-orb-a" />
        <span className="hero-orb hero-orb-b" />
        <span className="hero-orb hero-orb-c" />

        <span className="hero-vinyl" />
        <span className="hero-ring hero-ring-a" />
        <span className="hero-ring hero-ring-b" />
        <span className="hero-ring hero-ring-c" />

        <div className="hero-eq">
          {EQ_BARS.map((i) => (
            <span className="hero-eq-bar" key={i} />
          ))}
        </div>

        <div className="hero-waves">
          <Wave className="hero-wave-1" />
          <Wave className="hero-wave-2" />
          <Wave className="hero-wave-3" />
        </div>

        <div className="hero-notes">
          {NOTES.map((note, i) => (
            <span className="hero-note" key={i}>
              {note}
            </span>
          ))}
        </div>
      </div>

      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Live Music · {site.location}</p>
          <h1 className="hero-title">{site.name}</h1>
          <p className="hero-tagline">{site.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Book Joel
            </a>
            <a className="btn btn-ghost" href="#music">
              Listen
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <img src={site.heroPhoto} alt={`Photo of ${site.name}`} />
        </div>
      </div>
    </section>
  );
}
