import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';

function SocialIcon3D({ color, symbol }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={1.5} floatIntensity={0.4}>
            <group ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                <mesh>
                    <boxGeometry args={[0.7, 0.7, 0.1]} />
                    <meshStandardMaterial
                        color={color}
                        metalness={0.6}
                        roughness={0.3}
                        emissive={color}
                        emissiveIntensity={hovered ? 0.8 : 0.3}
                    />
                </mesh>
            </group>
        </Float>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        { label: 'Instagram', handle: '@chinnu.art', href: '#', icon: '📷', color: '#e1306c' },
        { label: 'Behance', handle: 'Chinnu', href: '#', icon: '🎨', color: '#1769ff' },
        { label: 'Email', handle: 'chinnu@example.com', href: 'mailto:chinnu@example.com', icon: '✉️', color: '#7c3aed' },
    ];

    return (
        <section id="contact" ref={ref} className="relative py-28 px-6 md:px-16 overflow-hidden"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, #2D0B5A 0%, #050505 60%)' }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-purple-400/70 text-xs tracking-[0.4em] uppercase mb-4">Get in Touch</p>
                    <h2 className="font-heading text-5xl md:text-6xl text-white">
                        Let's{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Connect</span>
                    </h2>
                    <p className="text-white/40 mt-4 text-base max-w-lg mx-auto">
                        Commission a piece, discuss a collaboration, or simply say hello.
                        Chinnu personally responds to every message.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 flex flex-col gap-6">
                            <div>
                                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your name"
                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/60 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/60 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell me about your vision..."
                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500/60 transition-all resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-4 text-sm tracking-widest uppercase transition-all duration-400 rounded-sm text-white"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #a21caf)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                            >
                                {submitted ? '✓ Message Sent' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Social Links + 3D Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        {/* 3D Icon Canvas Row */}
                        <div className="grid grid-cols-3 gap-4 h-36">
                            {['#e1306c', '#7c3aed', '#1769ff'].map((c, i) => (
                                <div key={i} className="h-full">
                                    <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }}>
                                        <ambientLight intensity={0.5} />
                                        <pointLight position={[2, 2, 2]} intensity={2} color={c} />
                                        <SocialIcon3D color={c} symbol="✦" />
                                    </Canvas>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        {socialLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                                whileHover={{ x: 6 }}
                                className="group flex items-center gap-5 glass rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-500/40 hover-target"
                            >
                                <span className="text-2xl">{link.icon}</span>
                                <div>
                                    <p className="text-white/40 text-xs tracking-widest uppercase">{link.label}</p>
                                    <p className="text-white text-base group-hover:text-purple-300 transition-colors">{link.handle}</p>
                                </div>
                                <span className="ml-auto text-white/20 group-hover:text-purple-400 text-lg transition-colors">→</span>
                            </motion.a>
                        ))}

                        <p className="text-white/20 text-xs text-center mt-4 tracking-wide">
                            © 2024 Chinnu · All rights reserved
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
