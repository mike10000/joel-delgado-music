import { site } from "../data/site.js";

export default function Music() {
  const embeds = site.embeds || [];

  return (
    <section className="section music" id="music">
      <div className="container">
        <div className="music-video card">
          <video
            className="music-video-player"
            controls
            playsInline
            preload="metadata"
            aria-label="Joel Delgado performance video"
          >
            <source src={site.performanceVideo} type="video/mp4" />
          </video>
        </div>

        <h2 className="section-title">Music</h2>
        {embeds.length > 0 ? (
          <div className="embed-grid">
            {embeds.map((e, i) => (
              <div className="embed card" key={i}>
                {e.title && <h3 className="embed-title">{e.title}</h3>}
                <div className="embed-frame">
                  <iframe
                    src={e.src}
                    title={e.title || `Player ${i + 1}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card music-placeholder">
            <p>
              Music players will appear here. Add Spotify or YouTube embed links
              in <code>src/data/site.js</code>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
