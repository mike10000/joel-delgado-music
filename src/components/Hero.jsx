import { site } from "../data/site.js";

export default function Hero() {
  return (
    <section className="hero" id="top">
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
