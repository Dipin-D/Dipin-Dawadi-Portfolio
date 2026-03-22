export function initScene() {
  const canvas = document.querySelector(".scene-canvas");
  if (!canvas) return;
  const root = document.documentElement;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) {
    root.classList.add("no-webgl-scene");
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    width: 0,
    height: 0,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
    pointerX: 0.5,
    pointerY: 0.35,
    scroll: 0,
    rafId: 0,
    program: null,
    buffer: null,
    points: 220,
    locations: null,
  };

  const vertexShaderSource = `
    attribute vec3 a_position;
    attribute float a_size;
    attribute float a_seed;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_pointer;
    uniform float u_scroll;

    varying float v_seed;
    varying float v_depth;
    varying float v_lineMask;

    void main() {
      float t = u_time * (0.18 + a_seed * 0.4);
      vec3 pos = a_position;

      pos.x += sin(t + a_seed * 6.2831) * (0.08 + a_seed * 0.12);
      pos.y += cos(t * 0.9 + a_seed * 4.7123) * (0.06 + a_seed * 0.1);
      pos.z += sin(t * 0.7 + a_seed * 3.1415) * 0.08;

      pos.x += (u_pointer.x - 0.5) * (0.35 + pos.z * 0.3);
      pos.y += (u_pointer.y - 0.5) * (0.22 + pos.z * 0.2);
      pos.y -= u_scroll * (0.08 + a_seed * 0.12);

      float perspective = 1.25 - pos.z;
      vec2 clip = vec2(pos.x / perspective, pos.y / perspective);

      gl_Position = vec4(clip, 0.0, 1.0);
      gl_PointSize = a_size * (1.15 + (1.0 - perspective)) * u_resolution.y / 980.0;

      v_seed = a_seed;
      v_depth = perspective;
      v_lineMask = smoothstep(0.0, 1.0, pos.z);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;

    varying float v_seed;
    varying float v_depth;
    varying float v_lineMask;

    vec3 palette(float t) {
      vec3 moon = vec3(0.84, 0.88, 0.94);
      vec3 steel = vec3(0.56, 0.65, 0.78);
      vec3 slate = vec3(0.36, 0.43, 0.54);
      return mix(mix(moon, steel, step(0.45, t)), slate, 0.24);
    }

    void main() {
      vec2 uv = gl_PointCoord.xy - 0.5;
      float dist = dot(uv, uv);
      if (dist > 0.25) discard;

      float ring = smoothstep(0.22, 0.02, dist);
      float halo = smoothstep(0.25, 0.0, dist);
      vec3 color = palette(fract(v_seed * 7.13));
      float alpha = halo * (0.12 + (1.0 - v_depth) * 0.24) * (0.84 + v_lineMask * 0.26);

      gl_FragColor = vec4(color * ring * 1.2, alpha);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("Scene shader compilation failed.");
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram() {
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Scene program link failed.");
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  function buildPoints() {
    const data = [];
    for (let index = 0; index < state.points; index += 1) {
      const spread = index / Math.max(1, state.points - 1);
      const arc = spread * Math.PI * 2.6;
      const radius = 0.18 + Math.random() * 0.92;
      const x = Math.cos(arc) * radius + (Math.random() - 0.5) * 0.45;
      const y = Math.sin(arc * 0.82) * radius * 0.55 + (Math.random() - 0.5) * 0.28;
      const z = Math.random() * 1.1;
      const size = 10 + Math.random() * 34;
      const seed = Math.random();
      data.push(x, y, z, size, seed);
    }
    return new Float32Array(data);
  }

  function resize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function onPointerMove(event) {
    state.pointerX = event.clientX / state.width;
    state.pointerY = event.clientY / state.height;
  }

  function onScroll() {
    state.scroll = Math.min(1, (window.scrollY || window.pageYOffset) / Math.max(window.innerHeight * 2.2, 1));
  }

  function render(time) {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(state.program);
    const { resolution, time: timeLocation, pointer, scroll, position, size, seed } = state.locations;

    gl.uniform2f(resolution, state.width, state.height);
    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform2f(pointer, state.pointerX, state.pointerY);
    gl.uniform1f(scroll, state.scroll);

    gl.bindBuffer(gl.ARRAY_BUFFER, state.buffer);

    const stride = Float32Array.BYTES_PER_ELEMENT * 5;
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, stride, 0);

    gl.enableVertexAttribArray(size);
    gl.vertexAttribPointer(size, 1, gl.FLOAT, false, stride, Float32Array.BYTES_PER_ELEMENT * 3);

    gl.enableVertexAttribArray(seed);
    gl.vertexAttribPointer(seed, 1, gl.FLOAT, false, stride, Float32Array.BYTES_PER_ELEMENT * 4);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, state.points);

    if (!prefersReducedMotion) {
      state.rafId = window.requestAnimationFrame(render);
    }
  }

  state.program = createProgram();
  if (!state.program) {
    root.classList.add("no-webgl-scene");
    return;
  }

  state.locations = {
    resolution: gl.getUniformLocation(state.program, "u_resolution"),
    time: gl.getUniformLocation(state.program, "u_time"),
    pointer: gl.getUniformLocation(state.program, "u_pointer"),
    scroll: gl.getUniformLocation(state.program, "u_scroll"),
    position: gl.getAttribLocation(state.program, "a_position"),
    size: gl.getAttribLocation(state.program, "a_size"),
    seed: gl.getAttribLocation(state.program, "a_seed"),
  };

  state.buffer = gl.createBuffer();
  if (!state.buffer) {
    root.classList.add("no-webgl-scene");
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, state.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, buildPoints(), gl.STATIC_DRAW);

  resize();
  onScroll();

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", onScroll, { passive: true });
  if (window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
      return;
    }

    if (!prefersReducedMotion && !state.rafId) {
      state.rafId = window.requestAnimationFrame(render);
    }
  });

  render(0);
}
