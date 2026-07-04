import { useEffect, type RefObject } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  cyan: boolean;
  ph: number;
};

type Pulse = { a: Node; b: Node; t: number; sp: number };

const DIST = 150;
const DIST2 = DIST * DIST;

/**
 * Drives the animated "nucleus" field behind the hero: drifting nodes,
 * proximity bonds, travelling pulses and a subtle mouse parallax.
 * Particle colours follow the active theme (re-read when `theme` changes).
 * No-ops when the user prefers reduced motion.
 */
export function useNucleusCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  theme?: string,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read the theme-aware particle colours (space-separated RGB → "r,g,b").
    const root = getComputedStyle(document.documentElement);
    const rgb = (name: string, fallback: string) => {
      const v = root.getPropertyValue(name).trim();
      return v ? v.replace(/\s+/g, ",") : fallback;
    };
    const NAVY = rgb("--nucleus-navy", "23,64,148");
    const CYAN = rgb("--nucleus-cyan", "90,197,241");
    const SPARK = rgb("--nucleus-spark", "191,233,251");

    let W = 0;
    let H = 0;
    let DPR = 1;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let lastSpawn = 0;

    function buildNodes() {
      nodes = [];
      const area = W * H;
      const count = Math.max(26, Math.min(64, Math.round(area / 26000)));
      for (let i = 0; i < count; i++) {
        const cyan = Math.random() < 0.42;
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: cyan ? Math.random() * 2.2 + 1.8 : Math.random() * 1.6 + 1.1,
          cyan,
          ph: Math.random() * Math.PI * 2,
        });
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildNodes();
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      const a = nodes[(Math.random() * nodes.length) | 0];
      let best: Node | null = null;
      let bd = 1e9;
      for (let i = 0; i < nodes.length; i++) {
        const b = nodes[i];
        if (b === a) continue;
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
        if (d < bd) {
          bd = d;
          best = b;
        }
      }
      if (best && bd < 26000) {
        pulses.push({ a, b: best, t: 0, sp: 0.012 + Math.random() * 0.012 });
      }
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, W, H);

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const px = (mouse.x - W / 2) * 0.012;
      const py = (mouse.y - H / 2) * 0.012;

      // nodes + proximity bonds
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < DIST2) {
            const al = (1 - d2 / DIST2) * 0.5;
            ctx!.strokeStyle = `rgba(${CYAN},${al * 0.5})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(n.x + px * n.r, n.y + py * n.r);
            ctx!.lineTo(m.x + px * m.r, m.y + py * m.r);
            ctx!.stroke();
          }
        }
      }

      // node glow + core
      for (let k = 0; k < nodes.length; k++) {
        const nd = nodes[k];
        const glow = nd.cyan ? 0.6 + 0.4 * Math.sin(ts * 0.0015 + nd.ph) : 1;
        const color = nd.cyan ? CYAN : NAVY;
        const ox = nd.x + px * nd.r;
        const oy = nd.y + py * nd.r;
        if (nd.cyan) {
          const g = ctx!.createRadialGradient(ox, oy, 0, ox, oy, nd.r * 6);
          g.addColorStop(0, `rgba(${CYAN},${0.35 * glow})`);
          g.addColorStop(1, `rgba(${CYAN},0)`);
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(ox, oy, nd.r * 6, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = `rgba(${color},${nd.cyan ? 0.95 : 0.7})`;
        ctx!.beginPath();
        ctx!.arc(ox, oy, nd.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // pulses travelling along bonds
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pl = pulses[p];
        pl.t += pl.sp;
        if (pl.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const x = pl.a.x + (pl.b.x - pl.a.x) * pl.t;
        const y = pl.a.y + (pl.b.y - pl.a.y) * pl.t;
        const gg = ctx!.createRadialGradient(x, y, 0, x, y, 7);
        gg.addColorStop(0, `rgba(${SPARK},0.95)`);
        gg.addColorStop(1, `rgba(${CYAN},0)`);
        ctx!.fillStyle = gg;
        ctx!.beginPath();
        ctx!.arc(x, y, 7, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (ts - lastSpawn > 520) {
        spawnPulse();
        lastSpawn = ts;
      }
      raf = requestAnimationFrame(draw);
    }

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    mouse.x = mouse.tx = W / 2;
    mouse.y = mouse.ty = H / 2;
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canvasRef]);
}
