import React, { useEffect, useRef, useState, useCallback } from 'react';
import createGlobe from 'cobe';
import { motion, AnimatePresence } from 'framer-motion';

const CITIES = [
  { name: 'San Francisco', location: [37.7749, -122.4194] as [number, number], size: 0.1 },
  { name: 'New York', location: [40.7128, -74.0060] as [number, number], size: 0.1 },
  { name: 'London', location: [51.5074, -0.1278] as [number, number], size: 0.08 },
  { name: 'Tokyo', location: [35.6762, 139.6503] as [number, number], size: 0.1 },
  { name: 'Sydney', location: [-33.8688, 151.2093] as [number, number], size: 0.07 },
  { name: 'Berlin', location: [52.5200, 13.4050] as [number, number], size: 0.07 },
  { name: 'Singapore', location: [1.3521, 103.8198] as [number, number], size: 0.07 },
];

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionStart = useRef<number>(0);
  const [width, setWidth] = useState(0);
  const phi = useRef(0);

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        setWidth(canvasRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [1, 0.176, 0.333], // Dotted red base
          markerColor: [1, 0.176, 0.333], // Match primary color
          glowColor: [0.3, 0.05, 0.1], // Reddish glow
          markers: CITIES.map(city => ({ location: city.location, size: city.size })),
          onRender: (state) => {
            if (!pointerInteracting.current) {
              phi.current += 0.005;
            }
            state.phi = phi.current;
            state.width = width * 2;
            state.height = width * 2;
          },
        });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [width]);

  return (
    <div className="relative w-full aspect-square max-w-[700px] mx-auto flex items-center justify-center select-none perspective-1000">
      {/* Cinematic Lighting */}
      <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full scale-90 animate-pulse" />
      <div className="absolute inset-[-20%] bg-primary/5 blur-[120px] rounded-full scale-75 animate-pulse delay-700" />
      
      <div className="absolute inset-10 rounded-full border border-white/5 bg-gradient-to-br from-black/60 to-transparent backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(255,45,85,0.05),0_0_50px_rgba(255,45,85,0.1)]" />
      
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
          opacity: width ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionStart.current;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionStart.current = delta;
            phi.current = delta / 200;
          }
        }}
      />

      {/* Interface Elements */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 opacity-60 z-20">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
          <span className="text-[10px] font-mono text-primary tracking-[0.5em] uppercase font-bold">Global Sync</span>
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2 opacity-60 z-20">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-primary/80 tracking-[0.5em] uppercase font-bold whitespace-nowrap">Core Protocol v4.0</span>
          <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-pulse" />
        </div>
        <div className="h-[1px] w-32 bg-gradient-to-l from-primary/50 via-primary/30 to-transparent" />
      </div>

      {/* Atmospheric Arcs */}
      {[1.1, 1.25, 1.4].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/5 pointer-events-none"
          animate={{ 
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 20 + i * 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            width: `${75 * scale}%`, 
            height: `${75 * scale}%`,
            borderDasharray: i === 1 ? "4 12" : "none"
          }}
        />
      ))}

      {/* Data Transmission Pulse */}
      <AnimatePresence>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10 pointer-events-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.4], 
              opacity: [0, 0.3, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "easeOut" 
            }}
            style={{ width: '80%', height: '80%' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Globe;
