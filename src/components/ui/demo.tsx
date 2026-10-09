import Component from '@/components/ui/smooth-scroll';
import PublishedComponent from '@/components/ui/inversion-circle-scroll-animation';
import FlowArt, { FlowSection } from './story-scroll';
import FlowArtDefaultDemo from './story-scroll-demo';

function ComponentDemo() {
  return <Component />;
}

export default function Demo() {
  return <PublishedComponent />;
}

export { ComponentDemo as DemoOne, ComponentDemo, FlowArtDefaultDemo, FlowArt, FlowSection };


