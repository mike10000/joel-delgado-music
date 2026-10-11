import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Music from "./components/Music.jsx";
import Tour from "./components/Tour.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Music />
        <Tour />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
