import React, { useEffect, useRef } from 'react';

const KEYFRAMES = `
  @keyframes scroll-back       { from{background-position-x:0} to{background-position-x:-15400px} }
  @keyframes scroll-far        { from{background-position-x:0} to{background-position-x:-15400px} }
  @keyframes scroll-middle     { from{background-position-x:0} to{background-position-x:-38600px} }
  @keyframes scroll-near       { from{background-position-x:0} to{background-position-x:-108000px} }
  @keyframes scroll-foreground { from{background-position-x:0} to{background-position-x:-108000px} }
  @keyframes torch-flicker {
    0%  {opacity:0.58} 12%{opacity:0.68} 25%{opacity:0.52} 37%{opacity:0.64}
    50% {opacity:0.47} 62%{opacity:0.61} 75%{opacity:0.55} 88%{opacity:0.65} 100%{opacity:0.58}
  }
`;

const LAYERS = [
  { name: 'back',       duration: '2400s', opacity: 1.00, filter: 'hue-rotate(150deg) saturate(0.9) brightness(0.30)', flicker: false },
  { name: 'far',        duration: '1060s', opacity: 1.00, filter: 'hue-rotate(150deg) saturate(0.9) brightness(0.30)', flicker: false },
  { name: 'middle',     duration: '1375s', opacity: 1.00, filter: 'hue-rotate(150deg) saturate(0.9) brightness(0.35)', flicker: false },
  { name: 'near',       duration: '2070s', opacity: 1.00, filter: 'saturate(0.8) brightness(0.38)',                    flicker: false },
  { name: 'foreground', duration: '1225s', opacity: 1.00, filter: 'hue-rotate(150deg) saturate(0.4) brightness(0.10)', flicker: false },
];

// near.png is 224×224 — tile_width at any viewport height h = h (square image scaled to 100% height)
// CSS scroll speed: 108000px / 1380s
const NEAR_SPEED   = 108000 / 2070;
// Torch position within near.png original coords (224px space)
const TORCH_CX_ORIG = 146;
const TORCH_TY_ORIG =  86;
const TORCH_SIZE_ORIG = 32;
const TORCH_FRAMES  = 4;
const TORCH_FPS     = 6;

const APP_TORCH_X = 58;
const APP_TORCH_Y = 70;

function layerStyle({ name, duration, opacity, filter, flicker }) {
  return {
    position: 'fixed', inset: 0,
    backgroundImage: `url('/sprites/layers/${name}.png')`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 100%',
    backgroundPosition: '0 0',
    imageRendering: 'pixelated',
    filter, opacity,
    animation: flicker
      ? `scroll-${name} ${duration} linear infinite, torch-flicker 1.9s ease-in-out infinite`
      : `scroll-${name} ${duration} linear infinite`,
    zIndex: 0, pointerEvents: 'none',
  };
}

export default function DungeonBackground() {
  const torchRef  = useRef(null);
  const fxRef     = useRef(null);
  const stateRef  = useRef({ parts: [], fxRaf: null, torchRaf: null, torchImg: null, startTime: null });

  // ── Torch overlay canvas (synced to near layer scroll) ──────────────────
  useEffect(() => {
    const s = stateRef.current;
    const canvas = torchRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw(ts) {
      if (!s.startTime) s.startTime = ts;
      const elapsed = (ts - s.startTime) / 1000;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const img = s.torchImg;
      if (img) {
        const scale    = h / 224;           // match near layer scale
        const tileW    = h;                 // near.png is square → tile = h at full scale
        const offset   = (elapsed * NEAR_SPEED) % tileW;
        const frameIdx = Math.floor(elapsed * TORCH_FPS) % TORCH_FRAMES;

        const dw = TORCH_SIZE_ORIG * scale;
        const dh = TORCH_SIZE_ORIG * scale;
        const tx = TORCH_CX_ORIG * scale - dw / 2;
        const ty = TORCH_TY_ORIG * scale;

        for (let n = -1; n <= Math.ceil(w / tileW) + 1; n++) {
          const x = n * tileW + tx - offset;
          ctx.drawImage(img, frameIdx * 32, 0, 32, 32, Math.floor(x), Math.floor(ty), Math.ceil(dw), Math.ceil(dh));
        }
      }

      s.torchRaf = requestAnimationFrame(draw);
    }

    resize();
    s.torchRaf = requestAnimationFrame(draw);

    const img = new window.Image();
    img.src = '/sprites/layers/torch-sheet.png';
    img.onload  = () => { s.torchImg = img; };
    img.onerror = () => console.warn('DungeonBackground: torch-sheet failed to load');

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(s.torchRaf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── FX canvas (vignette + embers) ───────────────────────────────────────
  useEffect(() => {
    const s = stateRef.current;
    const canvas = fxRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const r  = Math.max(w, h) * 0.68;
      const vignette = ctx.createRadialGradient(cx, cy, r * 0.08, cx, cy, r);
      vignette.addColorStop(0,   'rgba(6,5,10,0)');
      vignette.addColorStop(0.5, 'rgba(6,5,10,0.45)');
      vignette.addColorStop(0.8, 'rgba(4,3,8,0.78)');
      vignette.addColorStop(1,   'rgba(2,1,5,0.97)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      const wallW = 160;
      for (const side of ['left', 'right']) {
        const g = ctx.createLinearGradient(
          side === 'left' ? 0 : w, 0,
          side === 'left' ? wallW : w - wallW, 0
        );
        g.addColorStop(0, 'rgba(2,1,5,0.92)');
        g.addColorStop(1, 'rgba(2,1,5,0)');
        ctx.fillStyle = g;
        ctx.fillRect(side === 'left' ? 0 : w - wallW, 0, wallW, h);
      }

      for (const [tx, ty] of [[APP_TORCH_X, APP_TORCH_Y], [w - APP_TORCH_X, APP_TORCH_Y]]) {
        const gr = ctx.createRadialGradient(tx, ty, 0, tx, ty, Math.min(w, h) * 0.42);
        gr.addColorStop(0,    'rgba(255,140,30,0.08)');
        gr.addColorStop(0.35, 'rgba(200,90,10,0.03)');
        gr.addColorStop(1,    'rgba(255,140,30,0)');
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, w, h);
      }

      for (const [tx, ty] of [[APP_TORCH_X, APP_TORCH_Y], [w - APP_TORCH_X, APP_TORCH_Y]]) {
        if (Math.random() < 0.14) {
          s.parts.push({
            x: tx + (Math.random() - 0.5) * 14, y: ty,
            vx: (Math.random() - 0.5) * 0.7,
            vy: -(0.8 + Math.random() * 1.2),
            life: 1.0,
            decay: 0.018 + Math.random() * 0.02,
            size: 1.2 + Math.random() * 1.5,
          });
        }
      }
      for (let i = s.parts.length - 1; i >= 0; i--) {
        const p = s.parts[i];
        p.x += p.vx + (Math.random() - 0.5) * 0.18;
        p.y += p.vy;
        p.vy *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) { s.parts.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle   = p.life > 0.55 ? '#ffd060' : p.life > 0.25 ? '#ff8020' : '#cc3000';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * Math.sqrt(p.life), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      s.fxRaf = requestAnimationFrame(draw);
    }

    resize();
    s.fxRaf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(s.fxRaf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{KEYFRAMES}</style>
      {/* Base */}
      <div style={{ position:'fixed', inset:0, backgroundColor:'#06050a', zIndex:0, pointerEvents:'none' }} />
      {/* back, far, middle, near */}
      {LAYERS.slice(0, 4).map(l => <div key={l.name} style={layerStyle(l)} />)}
      {/* Animated torch canvas — sits on top of near, under foreground */}
      <canvas ref={torchRef} style={{
        position:'fixed', inset:0, width:'100%', height:'100%',
        zIndex:0, pointerEvents:'none', imageRendering:'pixelated',
      }} />
      {/* foreground pillars */}
      {LAYERS.slice(4).map(l => <div key={l.name} style={layerStyle(l)} />)}
      {/* Dark overlay to bring overall brightness down */}
      <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.35)', zIndex:0, pointerEvents:'none' }} />
      {/* Vignette + embers */}
      <canvas ref={fxRef} style={{
        position:'fixed', inset:0, width:'100%', height:'100%',
        zIndex:1, pointerEvents:'none',
      }} />
    </>
  );
}
