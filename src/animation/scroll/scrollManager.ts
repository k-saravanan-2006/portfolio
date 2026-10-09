import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../gsapConfig';
import { SCROLL_CONFIG } from './scrollConfig';

type ProgressCallback = (progress: number) => void;

class MasterScrollManager {
  private lenis: Lenis | null = null;
  private tickerHandler: ((time: number) => void) | null = null;
  private subscribers = new Set<ProgressCallback>();
  private currentProgress = 0;
  private isInitialized = false;

  public init(prefersReducedMotion = false): Lenis | null {
    if (this.isInitialized) return this.lenis;

    if (typeof window === 'undefined') return null;

    if (prefersReducedMotion) {
      // Reduced motion: rely on native scroll with standard ScrollTrigger updates
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const p = total > 0 ? window.scrollY / total : 0;
        this.emitProgress(p);
      };

      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      this.isInitialized = true;
      return null;
    }

    // Initialize Lenis with authoritative configuration
    this.lenis = new Lenis({
      duration: SCROLL_CONFIG.lenis.duration,
      wheelMultiplier: SCROLL_CONFIG.lenis.wheelMultiplier,
      touchMultiplier: SCROLL_CONFIG.lenis.touchMultiplier,
      smoothWheel: SCROLL_CONFIG.lenis.smoothWheel,
      orientation: 'vertical',
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    // 1. Sync Lenis scroll with GSAP ScrollTrigger
    this.lenis.on('scroll', (e: { progress: number }) => {
      this.emitProgress(e.progress || 0);
      ScrollTrigger.update();
    });

    // 2. Drive Lenis through GSAP ticker for frame-perfect lockstep synchronization
    this.tickerHandler = (time: number) => {
      this.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(this.tickerHandler);
    gsap.ticker.lagSmoothing(0);

    this.isInitialized = true;
    return this.lenis;
  }

  public subscribe(cb: ProgressCallback): () => void {
    this.subscribers.add(cb);
    cb(this.currentProgress);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public getLenis(): Lenis | null {
    return this.lenis;
  }

  public scrollTo(target: string | number | HTMLElement, options?: Parameters<Lenis['scrollTo']>[1]): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public refresh(): void {
    ScrollTrigger.refresh();
  }

  private emitProgress(p: number): void {
    this.currentProgress = p;
    this.subscribers.forEach((cb) => cb(p));
  }

  public destroy(): void {
    if (this.tickerHandler) {
      gsap.ticker.remove(this.tickerHandler);
      this.tickerHandler = null;
    }
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    this.subscribers.clear();
    this.isInitialized = false;
  }
}

export const scrollManager = new MasterScrollManager();
