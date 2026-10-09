/**
 * Safe DPR calculation to prevent GPU memory saturation on high-density displays
 */
export function getOptimizedDpr(): number {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio || 1;
  // Cap at 2 to balance crispness with rendering performance
  return Math.min(dpr, 2);
}

/**
 * Mobile detection helper for adaptive Level of Detail (LOD)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
