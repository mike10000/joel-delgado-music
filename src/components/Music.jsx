// public/videos/joel-video.mp4
const joelVideo = "/videos/joel-video.mp4";

export default function Music() {
  return (
    <section className="section music" id="music">
      <div className="container">
        <div className="music-video card">
          <video
            className="music-video-player"
            src={joelVideo}
            controls
            playsInline
            preload="metadata"
            aria-label="Joel Delgado performance video"
          />
        </div>
      </div>
    </section>
  );
}
