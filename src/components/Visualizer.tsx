import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { animate } from '../utils/visualization';

export const Visualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { visualizer, parameters, setVisualizer } = useStore();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animateFrame = () => {
      animate(ctx, visualizer.particles, parameters);
      animationFrameRef.current = requestAnimationFrame(animateFrame);
    };

    animationFrameRef.current = requestAnimationFrame(animateFrame);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visualizer.particles, parameters]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-gray-900 rounded-lg visualizer"
    />
  );
};