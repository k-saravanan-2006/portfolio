import React from 'react';
import DomeGallery from './DomeGallery';
import Particles from './Particles';

export default function Skills() {
  const images = [
    { src: '/image/extras/Bootstrap.svg', alt: 'Bootstrap', title: 'Bootstrap', description: 'Responsive CSS framework.' },
    { src: '/image/extras/JavaScript.svg', alt: 'JavaScript', title: 'JavaScript', description: 'Core web interactivity.' },
    { src: '/image/extras/Seaborn.svg', alt: 'Seaborn', title: 'Seaborn', description: 'Statistical data visualization.' },
    { src: '/image/extras/Streamlit.svg', alt: 'Streamlit', title: 'Streamlit', description: 'Rapidly build data apps in Python.' },
    { src: '/image/plt/Docker.svg', alt: 'Docker', title: 'Docker', description: 'Containerize and distribute software.' },
    { src: '/image/plt/Git.svg', alt: 'Git', title: 'Git', description: 'Version control system.' },
    { src: '/image/plt/GitHub.svg', alt: 'GitHub', title: 'GitHub', description: 'Cloud repository hosting.' },
    { src: '/image/plt/Jupyter.svg', alt: 'Jupyter', title: 'Jupyter', description: 'Interactive Python notebooks.' },
    { src: '/image/plt/Visual Studio Code (VS Code).svg', alt: 'VS Code', title: 'VS Code', description: 'Versatile code editor.' },
    { src: '/image/py/C.svg', alt: 'C', title: 'C', description: 'Fundamental programming language.' },
    { src: '/image/py/Flask.svg', alt: 'Flask', title: 'Flask', description: 'Lightweight Python web framework.' },
    { src: '/image/py/Java.svg', alt: 'Java', title: 'Java', description: 'Object-oriented application language.' },
    { src: '/image/py/Matplotlib.svg', alt: 'Matplotlib', title: 'Matplotlib', description: 'Create static, animated, and interactive python charts.' },
    { src: '/image/py/NumPy.svg', alt: 'NumPy', title: 'NumPy', description: 'Numerical computing with Python arrays.' },
    { src: '/image/py/OpenCV.svg', alt: 'OpenCV', title: 'OpenCV', description: 'Real-time computer vision.' },
    { src: '/image/py/PyTorch.svg', alt: 'PyTorch', title: 'PyTorch', description: 'Deep learning research framework.' },
    { src: '/image/py/Python.svg', alt: 'Python', title: 'Python', description: 'Versatile general-purpose programming.' },
    { src: '/image/py/langchain-icon-seeklogo.svg', alt: 'LangChain', title: 'LangChain', description: 'Building applications with LLMs.' },
    { src: '/image/web/CSS3.svg', alt: 'CSS3', title: 'CSS3', description: 'Styling the modern web.' },
    { src: '/image/web/FastAPI.svg', alt: 'FastAPI', title: 'FastAPI', description: 'High-performance Python APIs.' },
    { src: '/image/web/Flutter.svg', alt: 'Flutter', title: 'Flutter', description: 'Cross-platform mobile UI framework.' },
    { src: '/image/web/HTML5.svg', alt: 'HTML5', title: 'HTML5', description: 'Structure of the World Wide Web.' },
    { src: '/image/web/MongoDB.svg', alt: 'MongoDB', title: 'MongoDB', description: 'NoSQL document database.' },
    { src: '/image/web/MySQL.svg', alt: 'MySQL', title: 'MySQL', description: 'Relational database management.' },
    { src: '/image/web/Node.js.svg', alt: 'Node.js', title: 'Node.js', description: 'JavaScript runtime for the backend.' },
    { src: '/image/web/React.svg', alt: 'React', title: 'React', description: 'Building user interfaces.' },
    { src: '/image/web/Tailwind CSS.svg', alt: 'Tailwind CSS', title: 'Tailwind CSS', description: 'Utility-first CSS styling.' }
  ];

  return (
    <section id="skills" className="py-[5px] relative overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-0 max-w-[1200px] text-center w-full z-10 mb-8">
        <h2
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight"
          data-aos="fade-up"
        >
          My <span className="text-[var(--color-brand-glow)]">Expertise.</span>
        </h2>
      </div>

      <div className="relative w-full min-h-[100vh] h-[800px] mx-auto z-0 overflow-hidden drop-shadow-2xl bg-black flex flex-col items-center justify-center p-8" data-aos="fade-up" data-aos-delay="200">
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <Particles
            particleColors={["#00b4a6", "#00e5cc", "#ffffff"]}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
          />
        </div>
        <div className="relative z-10 w-full h-[60vh] max-h-[800px] flex items-center justify-center">
          <DomeGallery
            images={images}
            fit={0.4}
            minRadius={180}
            maxRadius={450}
            maxVerticalRotationDeg={25}
            segments={30}
            dragDampening={1.5}
            grayscale={false}
            imageBorderRadius="50%"
            openedImageWidth="200px"
            openedImageHeight="200px"
          />
        </div>
      </div>
    </section>
  );
}
