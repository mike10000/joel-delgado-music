import { site } from "../data/site.js";

export default function Contact() {
  const { booking } = site;

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-card card">
          <p className="contact-label">Booking Agent</p>
          <h2 className="contact-agent">{booking.agent}</h2>
          <p className="contact-company">{booking.company}</p>
          <a
            className="btn btn-primary contact-cta"
            href={booking.url}
            target="_blank"
            rel="noreferrer"
          >
            Book the Band
          </a>
        </div>
      </div>
    </section>
  );
}
