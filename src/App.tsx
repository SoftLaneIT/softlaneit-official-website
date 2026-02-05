import { Navbar, Footer } from './components/layout';
import { Hero, Services, About, Portfolio, Testimonials, Contact } from './components/sections';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
