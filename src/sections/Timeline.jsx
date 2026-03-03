import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const exhibitions = [
    {
        year: '2024',
        title: 'Lumière Intérieure',
        venue: 'Galerie Perrotin, Paris',
        type: 'Solo Exhibition',
        description: 'A landmark solo show exploring the concepts of inner light and spiritual radiance through 18 large-format oil paintings. Attended by over 12,000 visitors across 6 weeks.',
    },
    {
        year: '2023',
        title: 'Digital Femme',
        venue: 'The New Museum, New York',
        type: 'Group Exhibition',
        description: 'Featured alongside 9 international artists in a groundbreaking exhibition exploring feminine identity in the digital age, incorporating AR and immersive digital installations.',
    },
    {
        year: '2023',
        title: 'Memory & Myth',
        venue: 'Mori Art Museum, Tokyo',
        type: 'Residency & Exhibition',
        description: 'A 3-month artist residency resulting in a 12-piece collection investigating the intersection of Western mythology and Eastern philosophy.',
    },
    {
        year: '2022',
        title: 'Corpus/Cosmos',
        venue: 'Serpentine Gallery, London',
        type: 'Solo Exhibition',
        description: 'An ambitious solo show of large-scale works bridging the body and the cosmos. Named one of Frieze Magazine\'s Top 10 exhibitions of the year.',
    },
    {
        year: '2021',
        title: 'Territoire de l\'Âme',
        venue: 'MAMBO, Bogotá',
        type: 'Solo Exhibition',
        description: 'First Latin American solo show, a deeply personal exploration of heritage and displacement through mixed-media works combining resin, oil, and archival photography.',
    },
    {
        year: '2020',
        title: 'Fragments',
        venue: 'Whitechapel Gallery, London',
        type: 'Group Exhibition',
        description: 'Part of a pivotal group exhibition addressing fragmentation in contemporary life. Aria\'s contribution won the Critics\' Choice Award.',
    },
];

export default function Timeline() {
    const ref = useRef(null);
    const scrollRef = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="exhibitions" ref={ref} className="relative py-28 overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 20% 70%, #1a0533 0%, #050505 60%)' }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-purple-400/70 text-xs tracking-[0.4em] uppercase mb-4">Exhibition History</p>
                    <h2 className="font-heading text-5xl md:text-6xl text-white">
                        The{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Journey</span>
                    </h2>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={scrollRef} className="flex gap-6 px-6 md:px-16 overflow-x-auto pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                {exhibitions.map((ex, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: i * 0.12 }}
                        className="flex-shrink-0 w-72 md:w-80"
                    >
                        <div className="relative">
                            {/* Year marker */}
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-purple-500/50 text-purple-300 text-xs font-mono font-bold"
                                    animate={activeIndex === i ? { scale: 1.2, borderColor: '#a855f7' } : { scale: 1 }}
                                    style={{ background: 'rgba(139,92,246,0.1)' }}
                                >
                                    {ex.year.slice(2)}
                                </motion.div>
                                <p className="font-heading text-2xl text-white/60">{ex.year}</p>
                                {i < exhibitions.length - 1 && (
                                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
                                )}
                            </div>

                            {/* Card */}
                            <motion.div
                                className="glass rounded-xl p-6 cursor-pointer transition-all duration-300 hover-target"
                                animate={activeIndex === i ? { borderColor: 'rgba(168,85,247,0.4)' } : {}}
                                whileHover={{ y: -4 }}
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            >
                                <p className="text-purple-400/70 text-xs tracking-widest uppercase mb-2">{ex.type}</p>
                                <h3 className="font-heading text-xl text-white mb-1">{ex.title}</h3>
                                <p className="text-white/40 text-sm mb-4">{ex.venue}</p>

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={activeIndex === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-white/50 text-sm leading-relaxed pt-2 border-t border-white/5">
                                        {ex.description}
                                    </p>
                                </motion.div>

                                <div className="flex items-center gap-2 mt-3">
                                    <span className="text-purple-400/60 text-xs">{activeIndex === i ? 'Read less' : 'Read more'}</span>
                                    <motion.span
                                        animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                        className="text-purple-400/60 text-xs"
                                    >
                                        ↓
                                    </motion.span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Gradient fades on sides */}
            <div className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
            <div className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
        </section>
    );
}
