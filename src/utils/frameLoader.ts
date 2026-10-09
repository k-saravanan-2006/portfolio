/**
 * Intelligent Frame Sequence Preloader & Cache Manager
 * Handles 812 frames with priority loading, nearest-frame fallback, and bounded concurrency.
 */

export const TOTAL_FRAMES = 812;

export function getFramePath(frameIndex: number): string {
  // frameIndex is 1-indexed (1 to 812)
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(frameIndex)));
  const formatted = clamped.toString().padStart(4, '0');
  return `/frames/${formatted}.jpg`;
}

export class FrameSequenceManager {
  private cache: Map<number, HTMLImageElement> = new Map();
  private loadingSet: Set<number> = new Set();
  private loadedCount: number = 0;
  private onProgressCallback?: (loaded: number, total: number) => void;
  private queue: number[] = [];
  private activeConnections: number = 0;
  private maxConcurrency: number = 6;
  private isDestroyed: boolean = false;

  constructor(onProgress?: (loaded: number, total: number) => void) {
    this.onProgressCallback = onProgress;
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  public getFrame(index: number): HTMLImageElement | null {
    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(index)));
    
    // Direct hit
    if (this.cache.has(clamped)) {
      return this.cache.get(clamped)!;
    }

    // Nearest loaded neighbor fallback (find closest frame already loaded)
    let bestDist = Infinity;
    let closestFrame: HTMLImageElement | null = null;

    for (const [loadedIdx, img] of this.cache.entries()) {
      const dist = Math.abs(loadedIdx - clamped);
      if (dist < bestDist) {
        bestDist = dist;
        closestFrame = img;
      }
    }

    // If current frame isn't loaded, prioritize it at the front of the queue
    if (!this.loadingSet.has(clamped)) {
      this.prioritizeFrame(clamped);
    }

    return closestFrame;
  }

  public prioritizeFrame(index: number) {
    if (this.cache.has(index) || this.loadingSet.has(index)) return;
    // Put at front of queue
    this.queue = this.queue.filter(i => i !== index);
    this.queue.unshift(index);
    this.processQueue();
  }

  public startPreloading() {
    // 1. Priority: Load Frame 1 immediately
    this.loadSingleFrame(1, true);

    // 2. Priority: Sparse Keyframes across entire animation (every 20th frame)
    // This guarantees that any instant fast scroll already has smooth visual targets
    const keyframes: number[] = [];
    for (let i = 20; i <= TOTAL_FRAMES; i += 20) {
      keyframes.push(i);
    }
    // Also include last frame
    if (!keyframes.includes(TOTAL_FRAMES)) keyframes.push(TOTAL_FRAMES);

    // 3. Sequential frames for smooth continuous scrubbing
    const sequential: number[] = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (!keyframes.includes(i)) {
        sequential.push(i);
      }
    }

    // Queue: keyframes first, then sequential
    this.queue.push(...keyframes, ...sequential);
    this.processQueue();
  }

  private processQueue() {
    if (this.isDestroyed) return;
    while (this.activeConnections < this.maxConcurrency && this.queue.length > 0) {
      const nextIndex = this.queue.shift();
      if (nextIndex !== undefined && !this.cache.has(nextIndex) && !this.loadingSet.has(nextIndex)) {
        this.loadSingleFrame(nextIndex);
      }
    }
  }

  private loadSingleFrame(index: number, isUrgent = false) {
    if (this.cache.has(index) || this.loadingSet.has(index)) return;

    this.loadingSet.add(index);
    this.activeConnections++;

    const img = new Image();
    img.src = getFramePath(index);

    img.onload = () => {
      this.activeConnections--;
      this.loadingSet.delete(index);
      this.cache.set(index, img);
      this.loadedCount++;

      if (this.onProgressCallback) {
        this.onProgressCallback(this.loadedCount, TOTAL_FRAMES);
      }

      this.processQueue();
    };

    img.onerror = () => {
      this.activeConnections--;
      this.loadingSet.delete(index);
      this.processQueue();
    };
  }

  public destroy() {
    this.isDestroyed = true;
    this.queue = [];
    this.cache.clear();
    this.loadingSet.clear();
  }
}
