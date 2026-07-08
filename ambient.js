/* DARTE — ambient interactive background.
   Slow aurora-style neon blobs that drift, parallax to the cursor, and shift with
   scroll. Adapts colour + intensity to light/dark theme. Canvas-based, low-res +
   soft radial gradients (no per-frame CSS blur) so it stays cheap. Respects
   prefers-reduced-motion. */
(function () {
  var canvas = document.getElementById('ambient');
  if (!canvas) return;
  var ctx = canvas.getContext('2d', { alpha: true });
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Render at a fraction of device resolution — the art is all soft gradients,
  // so upscaling is free softness and a big perf win.
  var SCALE = 0.5;
  var W = 0, H = 0, DPR = 1;

  // brand neons
  var PALETTE = {
    dark: [
      { c: [21, 191, 0],   a: 0.64 },  // pure green
      { c: [0, 245, 255],  a: 0.52 },  // aqua
      { c: [255, 122, 26], a: 0.48 },  // orange
      { c: [194, 77, 255], a: 0.42 },  // purple
      { c: [0, 224, 198],  a: 0.48 }   // teal
    ],
    light: [
      { c: [21, 191, 0],   a: 0.15 },
      { c: [0, 200, 210],  a: 0.13 },
      { c: [255, 150, 60],  a: 0.11 },
      { c: [170, 120, 255], a: 0.10 },
      { c: [0, 210, 190],   a: 0.11 }
    ]
  };

  // Each blob: relative home position (0-1), drift speed/phase, radius factor, depth.
  var blobs = [
    { x: 0.20, y: 0.18, r: 0.55, sx: 0.021, sy: 0.017, px: 0.0, py: 0.0, depth: 0.9 },
    { x: 0.82, y: 0.25, r: 0.50, sx: 0.017, sy: 0.023, px: 1.7, py: 0.6, depth: 0.6 },
    { x: 0.65, y: 0.78, r: 0.60, sx: 0.014, sy: 0.019, px: 3.1, py: 2.2, depth: 1.0 },
    { x: 0.12, y: 0.72, r: 0.45, sx: 0.023, sy: 0.015, px: 4.6, py: 1.1, depth: 0.7 },
    { x: 0.50, y: 0.48, r: 0.52, sx: 0.012, sy: 0.021, px: 5.4, py: 3.5, depth: 0.45 }
  ];

  var mx = 0.5, my = 0.5;          // target cursor (0-1)
  var cmx = 0.5, cmy = 0.5;        // eased cursor
  var scrollN = 0;                 // eased scroll factor
  var pointerSeen = false;         // only glow grid once the cursor is active

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(window.innerWidth * SCALE));
    H = Math.max(1, Math.round(window.innerHeight * SCALE));
    canvas.width = W;
    canvas.height = H;
  }

  function theme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function draw(t) {
    var mode = theme();
    var pal = PALETTE[mode];
    var minDim = Math.min(W, H);

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = mode === 'light' ? 'source-over' : 'lighter';

    // ease cursor + scroll
    cmx += (mx - cmx) * 0.045;
    cmy += (my - cmy) * 0.045;
    var sTarget = (window.scrollY || 0) / Math.max(1, (document.body.scrollHeight - window.innerHeight));
    scrollN += (sTarget - scrollN) * 0.06;

    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      var col = pal[i % pal.length];
      // slow autonomous drift
      var dx = Math.sin(t * b.sx + b.px) * 0.085;
      var dy = Math.cos(t * b.sy + b.py) * 0.085;
      // cursor parallax (deeper = moves more) + scroll parallax
      var ox = (cmx - 0.5) * 0.22 * b.depth;
      var oy = (cmy - 0.5) * 0.22 * b.depth - scrollN * 0.28 * b.depth;

      var cx = (b.x + dx + ox) * W;
      var cy = (b.y + dy + oy) * H;
      var rad = b.r * minDim;

      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      var c = col.c;
      g.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + col.a + ')');
      g.addColorStop(0.55, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (col.a * 0.35) + ')');
      g.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- cursor-reactive grid tiles (echoes the interactive grid) ---
    if (pointerSeen) {
      var cell = (window.innerWidth < 680 ? 40 : 48) * SCALE;
      var px = cmx * W, py = cmy * H;
      var reach = cell * 3.4;
      var i0 = Math.floor((px - reach) / cell), i1 = Math.ceil((px + reach) / cell);
      var j0 = Math.floor((py - reach) / cell), j1 = Math.ceil((py + reach) / cell);
      var baseA = mode === 'light' ? 0.09 : 0.30;
      for (var gi = i0; gi <= i1; gi++) {
        for (var gj = j0; gj <= j1; gj++) {
          var ccx = (gi + 0.5) * cell, ccy = (gj + 0.5) * cell;
          var d = Math.hypot(ccx - px, ccy - py);
          if (d > reach) continue;
          var f = 1 - d / reach; f = f * f;
          // green core, aqua on the outer ring — keeps it energetic
          var mix = Math.min(1, d / reach);
          var rr = Math.round(21 + (0 - 21) * mix);
          var gg = Math.round(191 + (245 - 191) * mix);
          var bb = Math.round(0 + (255 - 0) * mix);
          ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (baseA * f) + ')';
          ctx.fillRect(gi * cell + 1, gj * cell + 1, cell - 1.5, cell - 1.5);
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  var raf = null, start = null;
  function loop(now) {
    if (start === null) start = now;
    draw((now - start) / 1000);
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', function () {
    resize();
    if (reduce) draw(0);
  });
  window.addEventListener('pointermove', function (e) {
    mx = e.clientX / window.innerWidth;
    my = e.clientY / window.innerHeight;
    pointerSeen = true;
  }, { passive: true });

  resize();

  if (reduce) {
    // one static, gentle frame — no animation loop
    cmx = mx; cmy = my;
    draw(0);
  } else {
    // pause when tab hidden
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
      else if (!raf) { start = null; raf = requestAnimationFrame(loop); }
    });
    raf = requestAnimationFrame(loop);
  }
})();
