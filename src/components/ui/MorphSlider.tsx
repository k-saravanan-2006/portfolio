import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback
} from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import { gsap } from '../../animation/gsapConfig';

export interface MorphSliderItem {
  image: string;
  title?: string;
  category?: string;
}

export interface MorphSliderProps {
  items: MorphSliderItem[];
  startIndex?: number;
  transition?: 'melt' | 'ripple' | 'shear' | 'swirl';
  duration?: number;
  ease?: string;
  intensity?: number;
  scale?: number;
  aberration?: number;
  drift?: number;
  loop?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onIndexChange?: (newIndex: number) => void;
}

export interface MorphSliderHandle {
  next: () => void;
  prev: () => void;
  goTo: (targetIndex: number) => void;
  getCurrentIndex: () => number;
}

const TRANSITIONS = {
  melt: 0,
  ripple: 1,
  shear: 2,
  swirl: 3
};

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;

varying vec2 vUv;

const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) {
    s.y = 1.0 / ratio;
  } else {
    s.x = ratio;
  }
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);

  vec2 uv = vUv;

  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;

  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
      m = smoothstep(0.0, 1.0, p);
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 1e-4);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float slices = 14.0;
      float row = floor(uv.y * slices);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);

  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );

  vec3 col = mix(colC, colN, m);

  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.28);

  gl_FragColor = vec4(col, 1.0);
}
`;

const createPlaceholderTexture = (gl: any) => {
  const pixel = new Uint8Array([5, 6, 8, 255]);
  return new Texture(gl, {
    image: pixel,
    width: 1,
    height: 1,
    generateMipmaps: false
  });
};

const hexToRgb = (hex: string): [number, number, number] => {
  let clean = (hex || '#050608').replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const parsed = parseInt(clean, 16);
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

export const MorphSlider = forwardRef<MorphSliderHandle, MorphSliderProps>(
  (
    {
      items,
      startIndex = 0,
      transition = 'melt',
      duration = 0.75,
      ease = 'power2.inOut',
      intensity = 0.65,
      scale = 2.2,
      aberration = 0.25,
      drift = 0.2,
      loop = true,
      overlayColor = '#050608',
      className = '',
      style,
      onIndexChange
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const currentIndexRef = useRef(startIndex);
    const animatingRef = useRef(false);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    // Engine references
    const rendererRef = useRef<Renderer | null>(null);
    const programRef = useRef<Program | null>(null);
    const texturesRef = useRef<Texture[]>([]);
    const sizesRef = useRef<[number, number][]>([]);
    const rafRef = useRef<number>(0);

    const optionsRef = useRef({
      transition,
      duration,
      ease,
      intensity,
      scale,
      aberration,
      drift,
      loop,
      overlayColor
    });

    optionsRef.current = {
      transition,
      duration,
      ease,
      intensity,
      scale,
      aberration,
      drift,
      loop,
      overlayColor
    };

    const wrapIndex = useCallback(
      (idx: number) => {
        const len = items.length;
        if (len === 0) return 0;
        return ((idx % len) + len) % len;
      },
      [items.length]
    );

    const goTo = useCallback(
      (targetIndex: number) => {
        const len = items.length;
        if (len < 2 || !programRef.current) return;

        let nextIdx = targetIndex;
        if (!optionsRef.current.loop) {
          nextIdx = Math.max(0, Math.min(len - 1, targetIndex));
        } else {
          nextIdx = wrapIndex(targetIndex);
        }

        if (nextIdx === currentIndexRef.current) return;

        const currentIdx = currentIndexRef.current;
        const dir = nextIdx > currentIdx ? 1 : -1;

        const program = programRef.current;
        const textures = texturesRef.current;
        const sizes = sizesRef.current;

        // Kill active tween if in flight and seamlessly start from current state
        if (tweenRef.current) {
          tweenRef.current.kill();
          if (textures[currentIdx]) {
            program.uniforms.tCurrent.value = textures[currentIdx];
            program.uniforms.uCurrentSize.value = sizes[currentIdx] || [1, 1];
          }
        } else {
          if (textures[currentIdx]) {
            program.uniforms.tCurrent.value = textures[currentIdx];
            program.uniforms.uCurrentSize.value = sizes[currentIdx] || [1, 1];
          }
        }

        if (textures[nextIdx]) {
          program.uniforms.tNext.value = textures[nextIdx];
          program.uniforms.uNextSize.value = sizes[nextIdx] || [1, 1];
        }

        program.uniforms.uDir.value = dir;
        program.uniforms.uMode.value = TRANSITIONS[optionsRef.current.transition] ?? 0;
        program.uniforms.uIntensity.value = optionsRef.current.intensity;
        program.uniforms.uScale.value = optionsRef.current.scale;
        program.uniforms.uAberration.value = optionsRef.current.aberration;
        program.uniforms.uDrift.value = optionsRef.current.drift;
        program.uniforms.uOverlay.value = hexToRgb(optionsRef.current.overlayColor);

        animatingRef.current = true;
        currentIndexRef.current = nextIdx;
        onIndexChange?.(nextIdx);

        tweenRef.current = gsap.fromTo(
          program.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: optionsRef.current.duration,
            ease: optionsRef.current.ease,
            onComplete: () => {
              if (textures[nextIdx]) {
                program.uniforms.tCurrent.value = textures[nextIdx];
                program.uniforms.uCurrentSize.value = sizes[nextIdx] || [1, 1];
              }
              program.uniforms.uProgress.value = 0;
              animatingRef.current = false;
              tweenRef.current = null;
              setCurrentIndex(nextIdx);
            }
          }
        );
      },
      [items.length, wrapIndex, onIndexChange]
    );

    const next = useCallback(() => {
      goTo(currentIndexRef.current + 1);
    }, [goTo]);

    const prev = useCallback(() => {
      goTo(currentIndexRef.current - 1);
    }, [goTo]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        prev,
        goTo,
        getCurrentIndex: () => currentIndexRef.current
      }),
      [next, prev, goTo]
    );

    // Stable key for image URLs so array recreation in parent never tears down WebGL context
    const itemsKey = items.map((i) => i.image).join('|');

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      let renderer: Renderer;
      try {
        renderer = new Renderer({
          alpha: true,
          antialias: true,
          dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
      } catch (err) {
        console.warn('WebGL initialization failed for MorphSlider', err);
        return;
      }

      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.clearColor(0.02, 0.03, 0.05, 1);

      const canvas = gl.canvas;
      canvas.className = 'morph-slider-canvas';
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.objectFit = 'cover';
      canvas.style.zIndex = '1';
      container.appendChild(canvas);

      const geometry = new Triangle(gl);

      // Initialize textures with placeholder
      texturesRef.current = items.map(() => createPlaceholderTexture(gl));
      sizesRef.current = items.map(() => [1, 1]);

      const initialOpts = optionsRef.current;

      const program = new Program(gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms: {
          tCurrent: { value: texturesRef.current[startIndex] || createPlaceholderTexture(gl) },
          tNext: { value: texturesRef.current[startIndex] || createPlaceholderTexture(gl) },
          uResolution: { value: [1, 1] },
          uCurrentSize: { value: [1, 1] },
          uNextSize: { value: [1, 1] },
          uProgress: { value: 0 },
          uDir: { value: 1 },
          uMode: { value: TRANSITIONS[initialOpts.transition] ?? 0 },
          uIntensity: { value: initialOpts.intensity },
          uScale: { value: initialOpts.scale },
          uAberration: { value: initialOpts.aberration },
          uDrift: { value: initialOpts.drift },
          uTime: { value: 0 },
          uReduce: { value: prefersReduced ? 1 : 0 },
          uPointer: { value: [0.5, 0.5] },
          uOverlay: { value: hexToRgb(initialOpts.overlayColor) }
        }
      });
      programRef.current = program;

      const mesh = new Mesh(gl, { geometry, program });

      // Resize observer
      const handleResize = () => {
        const rect = container.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
        renderer.render({ scene: mesh });
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      handleResize();

      // Load all textures asynchronously with crossOrigin anonymous
      items.forEach((item, idx) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const onLoad = () => {
          const tex = new Texture(gl, { image: img, generateMipmaps: false });
          tex.needsUpdate = true;
          texturesRef.current[idx] = tex;
          sizesRef.current[idx] = [img.naturalWidth || 1, img.naturalHeight || 1];

          if (idx === currentIndexRef.current) {
            program.uniforms.tCurrent.value = tex;
            program.uniforms.uCurrentSize.value = sizesRef.current[idx];
            renderer.render({ scene: mesh });
          }
        };

        img.onload = onLoad;
        img.src = item.image;
        if (img.complete && img.naturalWidth > 0) {
          onLoad();
        }
      });

      let isIntersecting = true;
      let isVisible = !document.hidden;

      const render = (time: number) => {
        program.uniforms.uTime.value = time * 0.001;
        renderer.render({ scene: mesh });
        rafRef.current = requestAnimationFrame(render);
      };

      const startRAF = () => {
        if (isIntersecting && isVisible && rafRef.current === 0) {
          rafRef.current = requestAnimationFrame(render);
        }
      };

      const stopRAF = () => {
        if (rafRef.current !== 0) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      };

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) startRAF();
          else stopRAF();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);

      const onVisibility = () => {
        isVisible = !document.hidden;
        if (isVisible) startRAF();
        else stopRAF();
      };
      document.addEventListener('visibilitychange', onVisibility);

      startRAF();

      return () => {
        stopRAF();
        if (tweenRef.current) tweenRef.current.kill();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);

        texturesRef.current.forEach((t) => {
          try {
            t?.gl?.deleteTexture?.(t.texture);
          } catch {
            // safe cleanup
          }
        });

        try {
          container.removeChild(canvas);
        } catch {
          // safe cleanup
        }

        const loseContext = gl.getExtension('WEBGL_lose_context');
        loseContext?.loseContext();

        rendererRef.current = null;
        programRef.current = null;
      };
    }, [itemsKey, startIndex]);

    return (
      <div
        ref={containerRef}
        className={`morph-slider-container ${className}`.trim()}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style
        }}
      >
        {/* Underlay fallback image ensuring immediate display before WebGL texture boots */}
        <img
          src={items[currentIndex]?.image}
          alt={items[currentIndex]?.title || 'Project'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }
);

MorphSlider.displayName = 'MorphSlider';

export default MorphSlider;
