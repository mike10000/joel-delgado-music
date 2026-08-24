import { site } from "../data/site.js";

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <p className="about-text">{site.bio}</p>
        <div className="genres">
          {site.genres.map((g) => (
            <span className="tag" key={g}>
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
