export function initIntroCanvas() {
  const canvas = document.querySelector(".intro-canvas");
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    rafId: 0,
    particles: [],
    pointerX: 0.5,
    pointerY: 0.5,
  };

  function resize() {
    state.width = canvas.clientWidth || window.innerWidth;
    state.height = canvas.clientHeight || window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    createParticles();
  }

  function createParticles() {
    const count = Math.max(32, Math.round((state.width * state.height) / 28000));
    state.particles = Array.from({ length: count }, (_, index) => ({
      angle: (index / count) * Math.PI * 2,
      radius: 90 + Math.random() * Math.min(state.width, state.height) * 0.26,
      speed: 0.0007 + Math.random() * 0.0016,
      size: 1.5 + Math.random() * 3.5,
      drift: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.55 ? "steel" : Math.random() > 0.5 ? "silver" : "moon",
      alpha: 0.28 + Math.random() * 0.34,
    }));
  }

  function onPointerMove(event) {
    state.pointerX = event.clientX / Math.max(window.innerWidth, 1);
    state.pointerY = event.clientY / Math.max(window.innerHeight, 1);
  }

  function drawBackground(time) {
    const cx = state.width * 0.5;
    const cy = state.height * 0.5;
    const t = time * 0.001;

    ctx.clearRect(0, 0, state.width, state.height);

    const bg = ctx.createLinearGradient(0, 0, 0, state.height);
    bg.addColorStop(0, "#05040c");
    bg.addColorStop(0.5, "#0b0815");
    bg.addColorStop(1, "#120912");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, state.width, state.height);

    const pointerOffsetX = (state.pointerX - 0.5) * 90;
    const pointerOffsetY = (state.pointerY - 0.5) * 70;

    const glowA = ctx.createRadialGradient(cx - 160 + pointerOffsetX, cy - 40 + pointerOffsetY, 0, cx - 160 + pointerOffsetX, cy - 40 + pointerOffsetY, 340);
    glowA.addColorStop(0, "rgba(178, 193, 216, 0.24)");
    glowA.addColorStop(1, "rgba(178, 193, 216, 0)");
    ctx.fillStyle = glowA;
    ctx.fillRect(0, 0, state.width, state.height);

    const glowB = ctx.createRadialGradient(cx + 180 - pointerOffsetX, cy + 10 - pointerOffsetY, 0, cx + 180 - pointerOffsetX, cy + 10 - pointerOffsetY, 360);
    glowB.addColorStop(0, "rgba(112, 130, 158, 0.2)");
    glowB.addColorStop(1, "rgba(112, 130, 158, 0)");
    ctx.fillStyle = glowB;
    ctx.fillRect(0, 0, state.width, state.height);

    const glowC = ctx.createRadialGradient(cx, cy + 120, 0, cx, cy + 120, 300);
    glowC.addColorStop(0, "rgba(214, 220, 232, 0.14)");
    glowC.addColorStop(1, "rgba(214, 220, 232, 0)");
    ctx.fillStyle = glowC;
    ctx.fillRect(0, 0, state.width, state.height);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.sin(t * 0.35) * 0.05);

    for (let index = 0; index < 4; index += 1) {
      const radiusX = 220 + index * 56;
      const radiusY = 120 + index * 34;
      ctx.beginPath();
      ctx.ellipse(
        Math.cos(t * 0.3 + index) * 18,
        Math.sin(t * 0.24 + index) * 12,
        radiusX,
        radiusY,
        Math.sin(t * 0.22 + index) * 0.35,
        0,
        Math.PI * 2,
      );
      ctx.strokeStyle = `rgba(${index % 2 === 0 ? "182, 197, 220" : "106, 124, 151"}, ${0.06 + index * 0.025})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawParticles(time) {
    const cx = state.width * 0.5;
    const cy = state.height * 0.5;
    const t = time;

    state.particles.forEach((particle, index) => {
      const angle = particle.angle + t * particle.speed;
      const drift = Math.sin(t * 0.0012 + particle.drift + index) * 18;
      const x = cx + Math.cos(angle) * (particle.radius + drift) + (state.pointerX - 0.5) * 40;
      const y = cy + Math.sin(angle * 1.35) * (particle.radius * 0.32 + drift * 0.4) + (state.pointerY - 0.5) * 24;

      let color = "255,255,255";
      if (particle.hue === "steel") color = "106,124,151";
      if (particle.hue === "silver") color = "212,220,232";
      if (particle.hue === "moon") color = "178,193,216";

      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, ${particle.alpha})`;
      ctx.shadowBlur = 18;
      ctx.shadowColor = `rgba(${color}, 0.32)`;
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }

  function render(time) {
    drawBackground(time);
    drawParticles(time);
    state.rafId = window.requestAnimationFrame(render);
  }

  resize();
  window.addEventListener("resize", resize);
  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }
  state.rafId = window.requestAnimationFrame(render);

  return () => {
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    if (state.rafId) window.cancelAnimationFrame(state.rafId);
  };
}
