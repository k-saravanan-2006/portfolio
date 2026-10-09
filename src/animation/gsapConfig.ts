import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Observer } from 'gsap/Observer';

// Register plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Observer);

// Create luxury automotive & cinematic easing curves
CustomEase.create('cinematic', '0.22, 1, 0.36, 1');
CustomEase.create('editorial', '0.16, 1, 0.3, 1');
CustomEase.create('heavy', '0.25, 1, 0.5, 1');
CustomEase.create('smoothReveal', '0.33, 1, 0.68, 1');

export { gsap, ScrollTrigger, SplitText, CustomEase, Observer };
