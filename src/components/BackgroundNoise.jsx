import { useEffect, useRef } from 'react';
import './BackgroundNoise.css';

function BackgroundNoise() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      const ctx = canvas.getContext('2d');
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCircles();
    };

    const initCircles = () => {
      circlesRef.current = [];
      const circleCount = 6;
      
      for (let i = 0; i < circleCount; i++) {
        createCircle(true);
      }
    };

    const createCircle = (randomDelay = false) => {
      const size = Math.random() * 50 + 10;
      const speed = Math.random() * 1.5 + 0.6;
      
      circlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -size - Math.random() * 100,
        size: size,
        speed: speed,
        alpha: Math.random() * 0.1 + 0.05,
        pulse: Math.random() * Math.PI * 2
      });
    };

    const render = (time) => {
      const { width, height } = canvas;

      ctx.fillRect(0, 0, width, height);

      circlesRef.current.forEach((circle, index) => {
        circle.y += circle.speed;
        circle.pulse += 0.01;

        const pulseScale = 1 + Math.sin(circle.pulse) * 0.1;

        if (circle.y - circle.size > height) {
          circlesRef.current.splice(index, 1);
          createCircle();
          return;
        }

        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.size * pulseScale
        );
        
        gradient.addColorStop(0, `rgba(243, 112, 30, ${circle.alpha})`);
        gradient.addColorStop(0.3, `rgba(243, 112, 30, ${circle.alpha * 0.6})`);
        gradient.addColorStop(0.6, `rgba(243, 112, 30, ${circle.alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(243, 112, 30, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size * pulseScale, 0, Math.PI * 2);
        ctx.fill();
      });

      if (circlesRef.current.length < 6) {
        createCircle();
      }
      
      rafRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="background-noise" />;
}

export default BackgroundNoise;