import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import './index.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <CustomCursor />
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Gallery />
            <Timeline />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}
