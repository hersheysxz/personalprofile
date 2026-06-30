import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const mount = document.getElementById('liquid-ether');

if (mount) {
  createLiquidEther(mount, {
    colors: ['#5227FF', '#FF9FFC', '#B497CF'],
    mouseForce: 20,
    cursorSize: 100,
    resolution: 0.5,
    autoDemo: true,
    autoSpeed: 0.5,
    autoIntensity: 2.2,
    takeoverDuration: 0.25,
    autoResumeDelay: 3000,
    autoRampDuration: 0.6
  });
}

function createLiquidEther(container, options = {}) {
  const settings = {
    colors: ['#5227FF', '#FF9FFC', '#B497CF'],
    mouseForce: 20,
    cursorSize: 100,
    resolution: 0.5,
    autoDemo: true,
    autoSpeed: 0.5,
    autoIntensity: 2.2,
    takeoverDuration: 0.25,
    autoResumeDelay: 3000,
    autoRampDuration: 0.6,
    ...options
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2(0.5, 0.5);
  const target = new THREE.Vector2(0.5, 0.5);
  const previous = new THREE.Vector2(0.5, 0.5);
  const velocity = new THREE.Vector2(0, 0);
  let lastInteraction = performance.now();
  let width = 1;
  let height = 1;
  let raf = 0;

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: pointer },
    uVelocity: { value: velocity },
    uCursorSize: { value: settings.cursorSize },
    uColor0: { value: new THREE.Color(settings.colors[0]) },
    uColor1: { value: new THREE.Color(settings.colors[1]) },
    uColor2: { value: new THREE.Color(settings.colors[2]) }
  };

  const material = new THREE.RawShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms,
    vertexShader: `
precision highp float;
attribute vec3 position;
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position, 1.0);
}
`,
    fragmentShader: `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uVelocity;
uniform float uCursorSize;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

float wave(vec2 p, float speed, float scale, float offset) {
  return sin((p.x + p.y) * scale + uTime * speed + offset);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 m = (uPointer - 0.5) * aspect;
  float cursor = 1.0 - smoothstep(0.0, uCursorSize / max(uResolution.y, 1.0), distance(p, m));
  vec2 flow = normalize(uVelocity + vec2(0.0001)) * cursor * 0.08;

  float a = wave(p + flow, 0.38, 7.0, 0.0);
  float b = wave(vec2(p.y, p.x) - flow, -0.28, 10.0, 1.7);
  float c = wave(p + vec2(a, b) * 0.045, 0.62, 15.0, 3.1);
  float ether = smoothstep(-0.65, 1.0, (a + b + c) / 3.0 + cursor * 0.75);

  vec3 color = mix(uColor0, uColor1, smoothstep(0.1, 0.85, ether));
  color = mix(color, uColor2, smoothstep(0.45, 1.0, abs(c)));
  float vignette = smoothstep(0.95, 0.15, length(uv - 0.5));
  float alpha = (0.22 + ether * 0.46 + cursor * 0.25) * vignette;
  gl_FragColor = vec4(color, alpha);
}
`
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  function resize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width * settings.resolution));
    height = Math.max(1, Math.floor(rect.height * settings.resolution));
    renderer.setSize(rect.width, rect.height, false);
    uniforms.uResolution.value.set(width, height);
  }

  function setPointer(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    target.set(
      (clientX - rect.left) / rect.width,
      1 - (clientY - rect.top) / rect.height
    );
    lastInteraction = performance.now();
  }

  function handleMouse(event) {
    setPointer(event.clientX, event.clientY);
  }

  function handleTouch(event) {
    if (!event.touches.length) return;
    setPointer(event.touches[0].clientX, event.touches[0].clientY);
  }

  window.addEventListener('mousemove', handleMouse);
  window.addEventListener('touchstart', handleTouch, { passive: true });
  window.addEventListener('touchmove', handleTouch, { passive: true });
  window.addEventListener('resize', resize);

  function autoDrive(now) {
    if (!settings.autoDemo) return;
    const idle = now - lastInteraction;
    if (idle < settings.autoResumeDelay) return;
    const ramp = Math.min(1, (idle - settings.autoResumeDelay) / (settings.autoRampDuration * 1000));
    const t = now * 0.0001 * settings.autoSpeed;
    target.x = 0.5 + Math.cos(t * 5.7) * 0.32 * ramp;
    target.y = 0.5 + Math.sin(t * 7.3) * 0.28 * ramp;
  }

  function animate(now = 0) {
    autoDrive(now);
    previous.copy(pointer);
    pointer.lerp(target, settings.takeoverDuration);
    velocity.subVectors(pointer, previous).multiplyScalar(settings.mouseForce * settings.autoIntensity);
    uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  resize();
  animate();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', handleMouse);
    window.removeEventListener('touchstart', handleTouch);
    window.removeEventListener('touchmove', handleTouch);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    material.dispose();
    mesh.geometry.dispose();
  };
}
