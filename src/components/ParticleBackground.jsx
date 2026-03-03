import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleBackground({ count = 1500 }) {
    const points = useRef();

    // Generate random particles
    const particlesPosition = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        particlesPosition[i * 3] = (Math.random() - 0.5) * 10;
        particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10;
        particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.y -= delta * 0.05;
            points.current.rotation.x -= delta * 0.02;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#8b5cf6"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
