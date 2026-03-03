import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Artwork data with beautiful gradients simulating art
const artworks = [
    {
        id: 1, title: 'Soleil Intérieur', year: 2024, medium: 'Oil on Canvas', size: '120 × 90 cm',
        description: 'A luminous exploration of the inner sun — layers of gold and crimson converging in a spiral of pure radiance. This work invites the viewer to seek the warmth within.',
        palette: ['#f59e0b', '#dc2626', '#7c3aed'],
    },
    {
        id: 2, title: "L'Ombre du Rêve", year: 2023, medium: 'Mixed Media', size: '90 × 120 cm',
        description: 'Dreams leave shadows. This piece explores the liminal space between consciousness and sleep, rendered in midnight blues and silver.',
        palette: ['#1d4ed8', '#6d28d9', '#c4b5fd'],
    },
    {
        id: 3, title: 'Mémoire Flottante', year: 2023, medium: 'Acrylic & Resin', size: '100 × 100 cm',
        description: 'Memory is fluid — it shifts, distorts, and floats. Layers of iridescent resin capture this ephemeral quality in a circular composition.',
        palette: ['#0891b2', '#06b6d4', '#a5f3fc'],
    },
    {
        id: 4, title: 'La Forêt Interdite', year: 2022, medium: 'Oil on Canvas', size: '150 × 100 cm',
        description: 'Deep within the forbidden forest lies a garden of impossible color. This mythic landscape evokes both danger and sublime beauty.',
        palette: ['#166534', '#4ade80', '#a21caf'],
    },
    {
        id: 5, title: 'Identité Fragile', year: 2022, medium: 'Charcoal & Pastel', size: '80 × 110 cm',
        description: 'A meditation on feminine identity — the fragility, resilience, and multiplicity of self. Rendered in charcoal with delicate rose accents.',
        palette: ['#881337', '#fb7185', '#fda4af'],
    },
    {
        id: 6, title: 'Le Cosmos Intime', year: 2021, medium: 'Digital & Print on Canvas', size: '130 × 130 cm',
        description: 'The intimate cosmos — a universe that exists only in the spaces between heartbeats. Dark matter and stardust, rendered in obsidian and violet.',
        palette: ['#1e1b4b', '#7c3aed', '#e879f9'],
    },
];

function ArtFrame({ artwork, onClick }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.position.y = THREE.MathUtils.lerp(
                meshRef.current.position.y,
                hovered ? 0.15 : 0,
                0.08
            );
        }
    });

    const [c1, c2, c3] = artwork.palette;

    return (
        <Float speed={1.2} floatIntensity={0.2} rotationIntensity={0.1}>
            <group
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={onClick}
            >
                {/* Frame Body */}
                <mesh>
                    <boxGeometry args={[2, 2.6, 0.07]} />
                    <meshStandardMaterial color="#0d0118" metalness={0.2} roughness={0.8} emissive={hovered ? '#3b0764' : '#1a0533'} emissiveIntensity={0.4} />
                </mesh>
                {/* Frame decoration */}
                <mesh position={[0, 1.37, 0]}><boxGeometry args={[2.16, 0.1, 0.12]} /><meshStandardMaterial color={hovered ? '#a855f7' : '#6d28d9'} metalness={0.8} /></mesh>
                <mesh position={[0, -1.37, 0]}><boxGeometry args={[2.16, 0.1, 0.12]} /><meshStandardMaterial color={hovered ? '#a855f7' : '#6d28d9'} metalness={0.8} /></mesh>
                <mesh position={[-1.08, 0, 0]}><boxGeometry args={[0.1, 2.74, 0.12]} /><meshStandardMaterial color={hovered ? '#a855f7' : '#6d28d9'} metalness={0.8} /></mesh>
                <mesh position={[1.08, 0, 0]}><boxGeometry args={[0.1, 2.74, 0.12]} /><meshStandardMaterial color={hovered ? '#a855f7' : '#6d28d9'} metalness={0.8} /></mesh>
                {/* Art content - abstract gradient shapes */}
                <mesh position={[0, 0, 0.04]}>
                    <planeGeometry args={[1.9, 2.5]} />
                    <meshStandardMaterial color={c1} transparent opacity={0.3} />
                </mesh>
                <mesh position={[-0.3, 0.2, 0.05]}><circleGeometry args={[0.6, 64]} /><meshStandardMaterial color={c2} transparent opacity={0.7} /></mesh>
                <mesh position={[0.4, -0.3, 0.06]} rotation={[0, 0, 1]}><boxGeometry args={[0.5, 0.8, 0.01]} /><meshStandardMaterial color={c3} transparent opacity={0.6} /></mesh>
            </group>
        </Float>
    );
}

import * as THREE from 'three';

function GalleryFrame({ artwork, onClick }) {
    return (
        <div className="h-80 w-full cursor-pointer hover-target" onClick={onClick}>
            <Canvas camera={{ position: [0, 0, 4], fov: 60 }} >
                <ambientLight intensity={0.3} />
                <pointLight position={[3, 3, 3]} intensity={1.5} color="#a855f7" />
                <pointLight position={[-2, -2, 2]} intensity={0.8} color="#ec4899" />
                <ArtFrame artwork={artwork} onClick={onClick} />
            </Canvas>
        </div>
    );
}

function ArtworkModal({ artwork, onClose }) {
    const [c1, c2, c3] = artwork.palette;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
            style={{ background: 'rgba(5,5,5,0.85)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative max-w-4xl w-full glass rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Artwork Preview */}
                <div className="h-72 md:h-auto relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}44, ${c2}33, ${c3}44)` }}>
                    <div className="absolute inset-8 rounded-lg border border-purple-400/30" style={{ background: `radial-gradient(ellipse at 40% 40%, ${c2}55, ${c3}22, ${c1}11)` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 rounded-full" style={{ background: c1, opacity: 0.6 }} />
                                <div className="absolute inset-4 rounded-sm" style={{ background: c2, opacity: 0.7 }} />
                                <div className="absolute inset-8 rotate-45" style={{ background: c3, opacity: 0.8, borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                    <p className="text-purple-400/70 text-xs tracking-[0.4em] uppercase">{artwork.medium}</p>
                    <h3 className="font-heading text-3xl md:text-4xl text-white">{artwork.title}</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-white/40 text-sm">{artwork.year}</span>
                        <span className="w-1 h-1 rounded-full bg-purple-400/40" />
                        <span className="text-white/40 text-sm">{artwork.size}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mt-2">{artwork.description}</p>
                    <div className="flex gap-2 mt-4">
                        {artwork.palette.map((c, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-white/10" style={{ background: c }} />
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onClose}
                        className="mt-4 px-6 py-3 border border-purple-500/40 text-purple-300 text-sm tracking-widest uppercase hover:bg-purple-500/10 transition-all rounded-sm w-fit"
                    >
                        Close
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Gallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    const [selected, setSelected] = useState(null);

    return (
        <section id="gallery" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a0533 0%, #050505 60%)' }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-purple-400/70 text-xs tracking-[0.4em] uppercase mb-4">Selected Works</p>
                    <h2 className="font-heading text-5xl md:text-6xl text-white">
                        The{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Gallery</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map((artwork, i) => (
                        <motion.div
                            key={artwork.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="glass rounded-xl overflow-hidden group"
                        >
                            <GalleryFrame artwork={artwork} onClick={() => setSelected(artwork)} />
                            <div className="p-5 border-t border-white/5">
                                <p className="text-white/30 text-xs tracking-widest uppercase mb-1">{artwork.medium} · {artwork.year}</p>
                                <h3 className="font-heading text-xl text-white group-hover:text-purple-300 transition-colors">{artwork.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
