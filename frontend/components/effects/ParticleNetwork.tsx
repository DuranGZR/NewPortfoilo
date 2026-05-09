"use client";

import { useEffect, useRef, useCallback } from 'react';

// ─── Configuration ─────────────────────────────────────────────
const CONFIG = {
  particleCount: 180,
  particleCountMobile: 80,
  connectionDistance: 140,
  mouseInfluenceRadius: 250,
  mouseAttractionStrength: 0.06,
  particleSpeed: 0.3,
  lineWidth: 0.6,
  particleMinSize: 1.2,
  particleMaxSize: 2.8,
  // Colors matching the site theme
  colors: {
    particle: { r: 129, g: 159, b: 167 },       // #819fa7
    particleAlt: { r: 243, g: 245, b: 249 },     // #f3f5f9
    line: { r: 129, g: 159, b: 167 },            // #819fa7
    mouseLine: { r: 160, g: 200, b: 210 },       // brighter for mouse connections
    glow: { r: 129, g: 159, b: 167 },            // glow around cursor
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  // Slow sine drift for organic feel
  phaseX: number;
  phaseY: number;
  driftSpeed: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const isVisibleRef = useRef(true);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  // ─── Initialize particles ───────────────────────────────────
  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const count = isMobile ? CONFIG.particleCountMobile : CONFIG.particleCount;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = CONFIG.particleSpeed * (0.3 + Math.random() * 0.7);

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        size: CONFIG.particleMinSize + Math.random() * (CONFIG.particleMaxSize - CONFIG.particleMinSize),
        opacity: 0.3 + Math.random() * 0.5,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        driftSpeed: 0.002 + Math.random() * 0.004,
      });
    }

    particlesRef.current = particles;
  }, []);

  // ─── Animation loop ──────────────────────────────────────────
  const animate = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    if (!isVisibleRef.current) {
      animationRef.current = requestAnimationFrame((t) => animate(ctx, t));
      return;
    }

    const { w, h } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // ── Update particle positions ──
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Organic sine drift
      const driftX = Math.sin(time * 0.001 * p.driftSpeed * 100 + p.phaseX) * 0.15;
      const driftY = Math.cos(time * 0.001 * p.driftSpeed * 100 + p.phaseY) * 0.15;

      p.vx = p.baseVx + driftX;
      p.vy = p.baseVy + driftY;

      // Mouse attraction
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseInfluenceRadius) {
          const force = (1 - dist / CONFIG.mouseInfluenceRadius) * CONFIG.mouseAttractionStrength;
          p.vx += dx * force;
          p.vy += dy * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges with soft padding
      const pad = 20;
      if (p.x < -pad) p.x = w + pad;
      if (p.x > w + pad) p.x = -pad;
      if (p.y < -pad) p.y = h + pad;
      if (p.y > h + pad) p.y = -pad;
    }

    // ── Draw connections between particles ──
    const connDist = CONFIG.connectionDistance;
    const connDistSq = connDist * connDist;

    ctx.lineWidth = CONFIG.lineWidth;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / connDist) * 0.35;
          const { r, g, b } = CONFIG.colors.line;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // ── Draw mouse connections ──
    if (mouse.active) {
      const mouseRadius = CONFIG.mouseInfluenceRadius;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // Subtle glow around cursor
      const glowGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouseRadius * 0.6
      );
      const { r: gr, g: gg, b: gb } = CONFIG.colors.glow;
      glowGrad.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, 0.1)`);
      glowGrad.addColorStop(1, `rgba(${gr}, ${gg}, ${gb}, 0)`);
      ctx.fillStyle = glowGrad;
      ctx.fillRect(mouse.x - mouseRadius, mouse.y - mouseRadius, mouseRadius * 2, mouseRadius * 2);

      ctx.lineWidth = 1.0;

      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / mouseRadius) * 0.6;
          const { r, g, b } = CONFIG.colors.mouseLine;

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
        }
      }

      ctx.lineWidth = CONFIG.lineWidth;
    }

    // ── Draw particles ──
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Pulsing opacity
      const pulse = Math.sin(time * 0.001 + p.phaseX) * 0.15;
      const finalOpacity = p.opacity + pulse;

      // Determine if near mouse for brightness boost
      let brightBoost = 0;
      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseInfluenceRadius) {
          brightBoost = (1 - dist / CONFIG.mouseInfluenceRadius) * 0.4;
        }
      }

      // Alternate colors for variety
      const color = i % 5 === 0 ? CONFIG.colors.particleAlt : CONFIG.colors.particle;

      // Particle glow (soft radial gradient dot)
      const glowSize = p.size * 3;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
      grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${(finalOpacity + brightBoost) * 0.8})`);
      grad.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${(finalOpacity + brightBoost) * 0.2})`);
      grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Solid core
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${finalOpacity + brightBoost})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame((t) => animate(ctx, t));
  }, []);

  // ─── Setup ───────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle HiDPI displays
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      dimensionsRef.current = { w, h };

      // Re-initialize particles only if count changes dramatically
      if (particlesRef.current.length === 0) {
        initParticles(w, h);
      }
    };

    resize();

    // Mouse events — listen on WINDOW so it works through content layer
    const canvasRect = { left: 0, top: 0, width: 0, height: 0 };

    const updateRect = () => {
      const rect = canvas.getBoundingClientRect();
      canvasRect.left = rect.left;
      canvasRect.top = rect.top;
      canvasRect.width = rect.width;
      canvasRect.height = rect.height;
    };
    updateRect();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      // Check if mouse is within the canvas area
      if (x >= 0 && x <= canvasRect.width && y >= 0 && y <= canvasRect.height) {
        mouseRef.current = { x, y, active: true };
      } else {
        mouseRef.current = { ...mouseRef.current, active: false };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };

    // Visibility observer — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Event listeners — window-level for mouse to pass through content
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    // Start animation
    animationRef.current = requestAnimationFrame((t) => animate(ctx, t));

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateRect);
    };
  }, [animate, initParticles]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
