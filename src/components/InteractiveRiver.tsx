import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface FloatingItem {
  id: string;
  startX: number;
  startY: number;
  name: string;
  image: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

interface DriftingObject {
  id: number;
  progress: number; // 0 to 1 along the vertical river path
  speed: number;
  type: 'pirogue' | 'banana_leaf_1' | 'banana_leaf_2' | 'tropical_flower';
  xOffset: number; // offset from center of river
  rotation: number;
  rotSpeed: number;
}

interface InteractiveRiverProps {
  cartTargetRef?: React.RefObject<HTMLDivElement | null>;
}

export const InteractiveRiver: React.FC<InteractiveRiverProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const [floatingCartItems, setFloatingCartItems] = useState<FloatingItem[]>([]);

  // Listen for custom "add-to-river-cart" events
  useEffect(() => {
    const handleAddDish = (e: CustomEvent<{ item: { name: string; image: string }; clientX: number; clientY: number }>) => {
      const newItem: FloatingItem = {
        id: `${Date.now()}-${Math.random()}`,
        startX: e.detail.clientX,
        startY: e.detail.clientY,
        name: e.detail.item.name,
        image: e.detail.item.image,
      };
      setFloatingCartItems(prev => [...prev, newItem]);

      // Remove after 1.2s animation completion
      setTimeout(() => {
        setFloatingCartItems(prev => prev.filter(it => it.id !== newItem.id));
      }, 1200);
    };

    window.addEventListener('add-dish-to-river' as any, handleAddDish as any);
    return () => {
      window.removeEventListener('add-dish-to-river' as any, handleAddDish as any);
    };
  }, []);

  // Track scroll speed to accelerate river current
  useEffect(() => {
    let timeoutId: any;
    const onScroll = () => {
      const now = Date.now();
      const dt = Math.max(16, now - lastScrollTime.current);
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      const velocity = dy / dt;

      setScrollVelocity(Math.min(velocity * 2.5, 4));
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollVelocity(0);
      }, 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Main Canvas animation for river flow, ripples & drifting pirogue/leaves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ripples: Ripple[] = [];
    const driftingObjects: DriftingObject[] = prefersReducedMotion
      ? [{ id: 1, progress: 0.3, speed: 0.0001, type: 'pirogue', xOffset: 0, rotation: 10, rotSpeed: 0 }]
      : [
          { id: 1, progress: 0.15, speed: 0.0004, type: 'pirogue', xOffset: 0, rotation: 12, rotSpeed: 0.002 },
          { id: 2, progress: 0.45, speed: 0.0006, type: 'banana_leaf_1', xOffset: -25, rotation: -15, rotSpeed: 0.004 },
          { id: 3, progress: 0.72, speed: 0.0005, type: 'banana_leaf_2', xOffset: 30, rotation: 30, rotSpeed: -0.003 },
          { id: 4, progress: 0.90, speed: 0.0007, type: 'tropical_flower', xOffset: -10, rotation: 45, rotSpeed: 0.006 },
        ];

    let time = 0;

    // Helper to calculate river path centerline (meandering spline)
    const getRiverX = (yPos: number, currentWidth: number) => {
      const scrollOffset = window.scrollY * 0.0008;
      // Meanders gently between 30% and 75% of screen width depending on vertical position
      const frequency = 0.0012;
      const wave = Math.sin((yPos + window.scrollY) * frequency + scrollOffset);
      const wave2 = Math.cos((yPos + window.scrollY) * 0.0006);
      const baseCenter = currentWidth * (0.52 + wave * 0.18 + wave2 * 0.08);
      return baseCenter;
    };

    // User interaction: create water ripple
    const addRipple = (x: number, y: number, isClick = false) => {
      ripples.push({
        x,
        y,
        radius: isClick ? 8 : 4,
        maxRadius: isClick ? (width < 768 ? 80 : 130) : (width < 768 ? 45 : 70),
        opacity: isClick ? 0.85 : 0.45,
        color: isClick ? '#2dd4bf' : '#5eead4',
      });
      if (ripples.length > 30) ripples.shift();
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (Math.random() > 0.4) {
        addRipple(clientX, clientY, false);
      }
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      // Triple concentric drops
      addRipple(clientX, clientY, true);
      setTimeout(() => addRipple(clientX, clientY, true), 120);
      setTimeout(() => addRipple(clientX, clientY, true), 260);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      time += 0.015 + scrollVelocity * 0.04;
      ctx.clearRect(0, 0, width, height);

      const riverWidth = width < 768 ? 140 : 280;
      const steps = 30;
      const stepY = height / steps;

      // 1. Draw River Ribbon with Water Gradient & Flowing Shimmer
      ctx.save();
      ctx.beginPath();

      // Left bank
      for (let i = 0; i <= steps; i++) {
        const y = i * stepY;
        const centerX = getRiverX(y, width);
        const waveSway = Math.sin(time + y * 0.01) * 8;
        const x = centerX - riverWidth / 2 + waveSway;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Right bank (draw down to up)
      for (let i = steps; i >= 0; i--) {
        const y = i * stepY;
        const centerX = getRiverX(y, width);
        const waveSway = Math.sin(time * 1.2 + y * 0.01) * 8;
        const x = centerX + riverWidth / 2 + waveSway;
        ctx.lineTo(x, y);
      }

      ctx.closePath();

      // Deep aquatic gradient reflecting the Wouri River
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(19, 78, 74, 0.28)'); // deep teal
      gradient.addColorStop(0.3, 'rgba(20, 184, 166, 0.22)'); // turquoise flow
      gradient.addColorStop(0.6, 'rgba(15, 118, 110, 0.25)'); // rich river green
      gradient.addColorStop(1, 'rgba(31, 61, 46, 0.32)'); // harmonizing brand vert foncé

      ctx.fillStyle = gradient;
      ctx.fill();

      // Soft water highlight edge
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.28)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Animated Water Caustics / Undulation Waves
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.strokeStyle = j === 0 ? 'rgba(255, 255, 255, 0.22)' : 'rgba(45, 212, 191, 0.18)';
        for (let i = 0; i <= steps; i++) {
          const y = i * stepY;
          const centerX = getRiverX(y, width);
          const waveOffset = Math.sin(time * 2 + y * 0.015 + j * 1.6) * (18 + j * 6);
          const x = centerX + waveOffset;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.restore();

      // 3. Render Drifting Objects (Cameroonian Pirogue & Banana Leaves)
      driftingObjects.forEach(obj => {
        // Update progress down the river
        obj.progress += obj.speed * (1 + scrollVelocity * 1.8);
        if (obj.progress > 1.1) {
          obj.progress = -0.1;
        }

        const screenY = obj.progress * height;
        const riverCenterX = getRiverX(screenY, width);
        const objX = riverCenterX + obj.xOffset;
        obj.rotation += obj.rotSpeed;

        ctx.save();
        ctx.translate(objX, screenY);
        ctx.rotate((obj.rotation * Math.PI) / 180);

        if (obj.type === 'pirogue') {
          // Traditional wooden dugout pirogue of the Wouri
          ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 4;

          // Boat hull
          ctx.beginPath();
          ctx.ellipse(0, 0, 36, 10, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#5A2E1A'; // brand deep brown wood
          ctx.fill();
          ctx.strokeStyle = '#3E1F11';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Boat interior rim
          ctx.beginPath();
          ctx.ellipse(0, 0, 31, 6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#8B4513';
          ctx.fill();

          // Pirogier oarsman silhouette / paddle
          ctx.beginPath();
          ctx.moveTo(-10, -18);
          ctx.lineTo(8, 22);
          ctx.strokeStyle = '#E67A2E'; // brand warm orange paddle
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Small wake ripple behind boat
          ctx.beginPath();
          ctx.arc(-26, 0, 8, -Math.PI / 2, Math.PI / 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else if (obj.type === 'banana_leaf_1' || obj.type === 'banana_leaf_2') {
          // Lush green banana leaf
          ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.ellipse(0, 0, 18, 7, Math.PI / 8, 0, Math.PI * 2);
          ctx.fillStyle = '#3E6B3E'; // brand green
          ctx.fill();
          // Leaf spine
          ctx.beginPath();
          ctx.moveTo(-16, 0);
          ctx.lineTo(16, 0);
          ctx.strokeStyle = '#86efac';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (obj.type === 'tropical_flower') {
          // Hibiscus / Foléré tropical flower
          ctx.beginPath();
          ctx.arc(0, 0, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#E67A2E'; // brand vibrant orange
          ctx.fill();
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#F2B134'; // yellow center
          ctx.fill();
        }

        ctx.restore();
      });

      // 4. Render Active Water Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.8;
        r.opacity *= 0.96;

        if (r.opacity < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(45, 212, 191, ${r.opacity})`;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Inner secondary wave ring
        if (r.radius > 12) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.6})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollVelocity]);

  return (
    <>
      {/* Background Interactive River Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Floating Add-to-Cart Dish Animation along water */}
      {floatingCartItems.map(item => (
        <div
          key={item.id}
          className="fixed pointer-events-none z-50 transition-all ease-in-out duration-1000 flex items-center gap-2 bg-[#1F3D2E] text-white p-2 rounded-full shadow-2xl border-2 border-[#14b8a6]"
          style={{
            left: item.startX - 30,
            top: item.startY - 30,
            ['--start-x' as any]: `${item.startX}px`,
            ['--start-y' as any]: `${item.startY}px`,
            animation: 'flyToCart 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          <img
            src={item.image}
            alt=""
            className="w-10 h-10 rounded-full object-cover border border-white/50"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs font-semibold pr-2 truncate max-w-[120px]">{item.name}</span>
          {/* Water trail splash */}
          <span className="absolute -inset-2 rounded-full border border-teal-400/80 animate-ping" />
        </div>
      ))}

      {/* Embedded keyframe for the floating dish animation toward bottom-right cart */}
      <style>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translate(calc((100vw - 120px - var(--start-x, 0px)) * 0.4), -60px) scale(1.15) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw - 100px - var(--start-x, 0px)), calc(100vh - 100px - var(--start-y, 0px))) scale(0.2) rotate(25deg);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
};
