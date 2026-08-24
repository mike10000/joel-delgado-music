import { tourDates } from "../data/tour.js";

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
    year: d.getFullYear(),
  };
}

export default function Tour() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = tourDates
    .filter((t) => t.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section className="section tour" id="tour">
      <div className="container">
        <h2 className="section-title">Tour Dates</h2>
        {upcoming.length > 0 ? (
          <ul className="tour-list">
            {upcoming.map((t, i) => {
              const d = formatDate(t.date);
              return (
                <li className="tour-item card" key={i}>
                  <div className="tour-date">
                    <span className="tour-month">{d.month}</span>
                    <span className="tour-day">{d.day}</span>
                    <span className="tour-year">{d.year}</span>
                  </div>
                  <div className="tour-info">
                    <span className="tour-venue">{t.venue}</span>
                    <span className="tour-city">{t.city}</span>
                  </div>
                  {t.ticketUrl ? (
                    <a
                      className="btn btn-primary tour-link"
                      href={t.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tickets
                    </a>
                  ) : (
                    <span className="tour-link tour-link-muted">Details soon</span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="card">
            <p>No upcoming dates announced yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
