import { useTheme } from "./theme.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Music from "./components/Music.jsx";
import Tour from "./components/Tour.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="app">
      <Header theme={theme} setTheme={setTheme} />
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
