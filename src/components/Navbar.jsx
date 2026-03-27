import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = ['Home', 'About', 'Gallery', 'Exhibitions', 'Contact'];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-500 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
                }`}
        >
            {/* Logo */}
            <button onClick={() => scrollTo('Home')} className="font-heading text-xl tracking-widest text-white text-glow">
                CHINNU
            </button>

            {/* Links */}
            <ul className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link}>
                        <button
                            onClick={() => scrollTo(link)}
                            className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${activeSection === link ? 'text-purple-300' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            {link}
                            {activeSection === link && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-purple-400"
                                />
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <motion.a
                href="mailto:chinnu@example.com"
                className="hidden md:block text-xs tracking-widest uppercase px-5 py-2 border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all duration-300 rounded-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
            >
                Commission
            </motion.a>
        </motion.nav>
    );
}
