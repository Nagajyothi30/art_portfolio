import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import ParticleBackground from '../components/ParticleBackground';

function FloatingCanvas3D() {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock, mouse }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.3, 0.05);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.3, 0.05);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <group ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                {/* Main Canvas Frame */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 2, 0.08]} />
                    <meshStandardMaterial
                        color="#1a0533"
                        metalness={0.3}
                        roughness={0.7}
                        emissive="#3b0764"
                        emissiveIntensity={hovered ? 0.6 : 0.2}
                    />
                </mesh>
                {/* Frame Border - Top */}
                <mesh position={[0, 1.06, 0]}>
                    <boxGeometry args={[3.12, 0.12, 0.12]} />
                    <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Frame Border - Bottom */}
                <mesh position={[0, -1.06, 0]}>
                    <boxGeometry args={[3.12, 0.12, 0.12]} />
                    <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Frame Border - Left */}
                <mesh position={[-1.56, 0, 0]}>
                    <boxGeometry args={[0.12, 2.24, 0.12]} />
                    <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Frame Border - Right */}
                <mesh position={[1.56, 0, 0]}>
                    <boxGeometry args={[0.12, 2.24, 0.12]} />
                    <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Abstract art inside - colored geometric shapes */}
                <mesh position={[-0.5, 0.3, 0.05]}>
                    <circleGeometry args={[0.5, 32]} />
                    <meshStandardMaterial color="#a855f7" transparent opacity={0.7} />
                </mesh>
                <mesh position={[0.6, -0.2, 0.05]} rotation={[0, 0, Math.PI / 5]}>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshStandardMaterial color="#ec4899" transparent opacity={0.5} />
                </mesh>
                <mesh position={[0.1, 0.5, 0.06]}>
                    <circleGeometry args={[0.25, 3]} />
                    <meshStandardMaterial color="#f0abfc" />
                </mesh>
            </group>
        </Float>
    );
}

export default function Hero() {
    const scrollToGallery = () => {
        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 60% 50%, #2D0B5A 0%, #050505 70%)' }}
        >
            {/* 3D Background Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
                    <pointLight position={[-5, -5, 3]} intensity={0.5} color="#ec4899" />
                    <ParticleBackground count={1200} />
                    <FloatingCanvas3D />
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 text-center px-6 pointer-events-none select-none">
                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.3em' }}
                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                    transition={{ duration: 1.5, delay: 2.8 }}
                    className="text-purple-300/70 text-xs uppercase tracking-[0.5em] mb-6"
                >
                    Welcome to my world
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 3, ease: 'easeOut' }}
                    className="font-heading text-7xl md:text-9xl font-light text-white mb-4 leading-none text-glow"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Chinnu</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 3.4 }}
                    className="text-white/50 text-lg md:text-xl tracking-widest font-light mb-12"
                >
                    Visual Storyteller &amp; Contemporary Artist
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 3.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToGallery}
                    className="pointer-events-auto px-10 py-4 bg-purple-600/30 border border-purple-400/50 text-purple-200 text-sm tracking-widest uppercase backdrop-blur-md hover:bg-purple-600/50 hover:border-purple-400 transition-all duration-400 rounded-sm"
                    style={{ boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
                >
                    Explore Gallery
                </motion.button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <p className="text-white/30 text-xs tracking-widest uppercase">Scroll</p>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-purple-400 to-transparent"
                />
            </motion.div>
        </section>
    );
}
