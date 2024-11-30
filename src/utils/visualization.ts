import { Particle, Parameters } from '../types';

export const createParticle = (
  x: number,
  y: number,
  color: string,
  parameters: Parameters
): Particle => {
  const { particleSize, particleSpeed } = parameters;
  
  return {
    x,
    y,
    color,
    size: Math.random() * particleSize + 2,
    speedX: (Math.random() * 4 - 2) * particleSpeed,
    speedY: (Math.random() * 4 - 2) * particleSpeed,
    life: 1,
    gravity: Math.random() * 0.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: Math.random() * 0.1 - 0.05,
  };
};

export const animate = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  parameters: Parameters
) => {
  ctx.fillStyle = `rgba(26, 26, 42, ${1 - parameters.trailLength})`;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw connection lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach(other => {
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
      }
    });
  });
  ctx.stroke();

  // Update and draw particles
  particles.forEach((particle, index) => {
    updateParticle(particle);
    drawParticle(ctx, particle);
    if (particle.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(() => animate(ctx, particles, parameters));
};

const updateParticle = (particle: Particle) => {
  particle.x += particle.speedX;
  particle.y += particle.speedY + particle.gravity;
  particle.speedY += particle.gravity;
  particle.rotation += particle.rotationSpeed;
  particle.life -= 0.01;
  if (particle.size > 0.2) particle.size -= 0.1;
};

const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
  ctx.save();
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.life;

  ctx.beginPath();
  ctx.moveTo(-particle.size, -particle.size);
  ctx.lineTo(particle.size, -particle.size);
  ctx.lineTo(particle.size, particle.size);
  ctx.lineTo(-particle.size, particle.size);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};