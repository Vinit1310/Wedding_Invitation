import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'sparkle';
  color: string;
}

export default function FloralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const count = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 30000));
      
      for (let i = 0; i < count; i++) {
        const isPetal = Math.random() > 0.45;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isPetal ? Math.random() * 8 + 6 : Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: isPetal ? Math.random() * 0.5 + 0.3 : Math.random() * 0.3 + 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.5 + 0.3,
          type: isPetal ? 'petal' : 'sparkle',
          color: isPetal 
            ? `rgba(${220 + Math.floor(Math.random() * 35)}, ${180 + Math.floor(Math.random() * 30)}, ${190 + Math.floor(Math.random() * 20)}, ${Math.random() * 0.4 + 0.2})` // soft rose/pink
            : `rgba(233, 195, 73, ${Math.random() * 0.5 + 0.3})` // gold sparkle
        });
      }
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          // Draw sweet rose petal shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size, -p.size, -p.size * 1.5, p.size / 2, 0, p.size * 1.5);
          ctx.bezierCurveTo(p.size * 1.5, p.size / 2, p.size, -p.size, 0, 0);
          ctx.fill();
        } else {
          // Draw glowing gold sparkle/diamond
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();
          
          // Add central highlight for sparkle
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Reset if out of boundaries
        if (p.y > canvas.height + 15) {
          p.y = -15;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 15) {
          p.x = -15;
        } else if (p.x < -15) {
          p.x = canvas.width + 15;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="webgl-background"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
