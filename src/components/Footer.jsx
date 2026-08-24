import { site } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-brand">{site.name}</span>
        <span className="footer-note">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
