import { site } from "../data/site.js";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top">
          {site.name}
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#music">Music</a>
          <a href="#tour">Tour</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
