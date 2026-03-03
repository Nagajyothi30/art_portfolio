import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

function RotatingFrame() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <Float speed={1} floatIntensity={0.3}>
            <group ref={meshRef}>
                {/* Portrait Frame */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2.6, 0.06]} />
                    <meshStandardMaterial color="#1a0533" roughness={0.6} metalness={0.4} emissive="#3b0764" emissiveIntensity={0.3} />
                </mesh>
                {/* Frame edges */}
                {[
                    [[0, 1.36, 0], [2.18, 0.12, 0.12]],
                    [[0, -1.36, 0], [2.18, 0.12, 0.12]],
                    [[-1.09, 0, 0], [0.12, 2.72, 0.12]],
                    [[1.09, 0, 0], [0.12, 2.72, 0.12]],
                ].map(([pos, dim], i) => (
                    <mesh key={i} position={pos}>
                        <boxGeometry args={dim} />
                        <meshStandardMaterial color="#9333ea" metalness={0.9} roughness={0.1} />
                    </mesh>
                ))}
                {/* Abstract portrait */}
                <mesh position={[0, 0.3, 0.04]}>
                    <circleGeometry args={[0.5, 64]} />
                    <meshStandardMaterial color="#c084fc" />
                </mesh>
                <mesh position={[0, -0.4, 0.04]}>
                    <planeGeometry args={[1.2, 1.0]} />
                    <meshStandardMaterial color="#7c3aed" transparent opacity={0.8} />
                </mesh>
            </group>
        </Float>
    );
}

const stats = [
    { value: '12+', label: 'Years of Practice' },
    { value: '40+', label: 'Exhibitions' },
    { value: '200+', label: 'Artworks' },
    { value: '18', label: 'Countries' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' } }),
};

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section id="about" ref={ref} className="relative min-h-screen flex items-center py-28 px-6 md:px-16 overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 30% 60%, #1a0533 0%, #050505 60%)' }}
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* 3D Frame */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-[480px] w-full"
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                        <ambientLight intensity={0.4} />
                        <pointLight position={[3, 4, 3]} intensity={1.5} color="#a855f7" />
                        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#ec4899" />
                        <RotatingFrame />
                    </Canvas>
                </motion.div>

                {/* Text Content */}
                <div className="flex flex-col gap-8">
                    <motion.p
                        custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        className="text-purple-400/70 text-xs tracking-[0.4em] uppercase"
                    >
                        About the Artist
                    </motion.p>
                    <motion.h2
                        custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        className="font-heading text-5xl md:text-6xl text-white leading-tight"
                    >
                        Where Emotion <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Meets Canvas</span>
                    </motion.h2>
                    <motion.p
                        custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        className="text-white/50 leading-relaxed text-base"
                    >
                        Chinnu is a globally exhibited contemporary artist whose work explores the
                        intersection of memory, feminine identity, and the digital sublime. Her canvases are intimate
                        landscapes—layered with texture, symbol, and a quiet intensity that invites the viewer into
                        states of deep reflection.
                    </motion.p>
                    <motion.p
                        custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        className="text-white/40 leading-relaxed text-sm"
                    >
                        From gallery walls in Tokyo and New York to immersive digital installations, her practice
                        continuously pushes the boundaries between the physical and the infinite. She holds a Master
                        of Fine Arts from the École des Beaux-Arts de Paris.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="glass rounded-lg p-4 text-center">
                                <p className="font-heading text-3xl text-purple-300 text-glow">{stat.value}</p>
                                <p className="text-white/40 text-xs mt-1 tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
