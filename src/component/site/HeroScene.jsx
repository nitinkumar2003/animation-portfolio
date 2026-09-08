"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 640;

// Mirrors the --nk-mint/--nk-sky/--nk-violet values in site.css. Those custom
// properties live on the `.nk` wrapper rather than <html>, so they aren't
// readable from here via getComputedStyle — keeping a matching pair in sync
// with the two theme blocks in site.css is simpler than reaching into the DOM.
const PALETTE = {
  dark: { mint: "#45e6b0", sky: "#5bbcff", violet: "#b9a7ff" },
  light: { mint: "#0c825f", sky: "#1b77b8", violet: "#6f52c9" },
};

const PARTICLE_VERTEX = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vTwinkle;
  void main() {
    vTwinkle = 0.4 + 0.6 * sin(uTime * 1.3 + aPhase);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vTwinkle;
  void main() {
    vec2 centered = gl_PointCoord - 0.5;
    float falloff = smoothstep(0.5, 0.0, length(centered));
    gl_FragColor = vec4(uColor, falloff * uOpacity * vTwinkle);
  }
`;

/** A sparse particle field with a real per-particle twinkle, driven by a small
 * hand-written shader rather than the stock material — each point fades in
 * and out on its own phase instead of holding a flat, uniform brightness. */
const ParticleField = ({ color, opacity, reduceMotion }) => {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const [positions, sizes, phases] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const size = new Float32Array(PARTICLE_COUNT);
    const phase = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 17;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      size[i] = 1.2 + Math.random() * 1.4;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return [pos, size, phase];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uOpacity: { value: opacity },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps -- kept in sync via the effect below

  useEffect(() => {
    uniforms.uColor.value.set(color);
    uniforms.uOpacity.value = opacity;
  }, [color, opacity, uniforms]);

  useFrame((state, delta) => {
    if (!reduceMotion) {
      uniforms.uTime.value = state.clock.elapsedTime;
      if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.018;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={PARTICLE_COUNT} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={PARTICLE_COUNT} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={PARTICLE_VERTEX}
        fragmentShader={PARTICLE_FRAGMENT}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const SHAPES = [
  { geometry: "icosahedron", position: [3.6, 1.1, -2], scale: 0.85, speed: 0.12, bobSpeed: 0.55, bobAmount: 0.22, colorKey: "sky" },
  { geometry: "torus", position: [-3.9, -1.4, -3.4], scale: 0.75, speed: 0.16, bobSpeed: 0.4, bobAmount: 0.28, colorKey: "violet" },
  { geometry: "octahedron", position: [1.6, -2.1, -4.6], scale: 0.6, speed: 0.2, bobSpeed: 0.7, bobAmount: 0.18, colorKey: "mint" },
];

/** One low-poly wireframe shape that rotates on its own axis and floats on a
 * gentle sine wave, instead of sitting rotating in a fixed spot. */
const FloatingShape = ({ shape, color, opacity, reduceMotion }) => {
  const meshRef = useRef(null);
  const basePosition = shape.position;

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh || reduceMotion) return;
    mesh.rotation.x += delta * shape.speed;
    mesh.rotation.y += delta * shape.speed * 0.72;
    mesh.position.y = basePosition[1] + Math.sin(state.clock.elapsedTime * shape.bobSpeed) * shape.bobAmount;
  });

  return (
    <mesh ref={meshRef} position={basePosition} scale={shape.scale}>
      {shape.geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {shape.geometry === "torus" && <torusGeometry args={[0.9, 0.16, 6, 32]} />}
      {shape.geometry === "octahedron" && <octahedronGeometry args={[1.1, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

/** Pointer parallax lives on the camera, not the objects — near and far shapes
 * then shift by different amounts as it moves, which reads as real depth
 * rather than one flat layer spinning in place. */
const CameraRig = ({ reduceMotion }) => {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  useFrame(() => {
    if (reduceMotion) return;
    const targetX = pointer.current.x * 0.7;
    const targetY = pointer.current.y * -0.45;
    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.lookAt(0, 0, -1.5);
  });

  return null;
};

const Scene = ({ reduceMotion, colors, opacity }) => (
  <>
    <CameraRig reduceMotion={reduceMotion} />
    <ParticleField color={colors.mint} opacity={opacity.particles} reduceMotion={reduceMotion} />
    {SHAPES.map((shape) => (
      <FloatingShape key={shape.geometry} shape={shape} color={colors[shape.colorKey]} opacity={opacity.shapes} reduceMotion={reduceMotion} />
    ))}
  </>
);

/**
 * Subtle Three.js backdrop for the homepage hero. Purely decorative: it never
 * intercepts pointer events (the parallax tracks the mouse via `window`, not
 * the canvas), freezes under prefers-reduced-motion, and pulls its colors
 * straight from the active theme so it never clashes with light/dark mode.
 */
const HeroScene = ({ theme }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const colors = PALETTE[theme] || PALETTE.dark;
  const opacity = theme === "light"
    ? { particles: 0.55, shapes: 0.22 }
    : { particles: 0.8, shapes: 0.3 };

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Scene reduceMotion={reduceMotion} colors={colors} opacity={opacity} />
    </Canvas>
  );
};

export default HeroScene;
