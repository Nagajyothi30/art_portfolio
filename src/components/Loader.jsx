import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ isLoading }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    style={{ background: 'radial-gradient(ellipse at center, #2D0B5A 0%, #050505 80%)' }}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Animated Icon */}
                        <div className="relative w-20 h-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-400"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-2 rounded-full border-t-2 border-l-2 border-purple-600"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">✦</span>
                            </div>
                        </div>

                        {/* Text */}
                        <motion.div
                            className="text-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <p className="font-heading text-2xl text-white tracking-widest text-glow">CHINNU</p>
                            <p className="text-xs text-purple-300/70 tracking-[0.4em] uppercase mt-1">Visual Artist</p>
                        </motion.div>

                        {/* Loading bar */}
                        <motion.div className="w-48 h-px bg-white/10 rounded-full overflow-hidden mt-2">
                            <motion.div
                                className="h-full bg-purple-400 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2.2, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
