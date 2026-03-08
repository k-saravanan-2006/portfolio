import React from 'react';
import GlassIcons from './GlassIcons';
import { Brain, Translate, Robot, FlowArrow, ChartBar } from '@phosphor-icons/react';

export default function Skills() {
  const CatIcon = ({ src }) => (
    <img src={src} className="w-[2.2em] h-[2.2em] object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" alt="skill icon" />
  );

  const programming = [
    { label: 'C', color: 'indigo', icon: <CatIcon src="/image/py/C.svg" /> },
    { label: 'Python', color: 'blue', icon: <CatIcon src="/image/py/Python.svg" /> },
    { label: 'JavaScript', color: 'yellow', icon: <CatIcon src="/image/extras/JavaScript.svg" /> },
  ];

  const ml = [
    { label: 'PyTorch', color: 'red', icon: <CatIcon src="/image/py/PyTorch.svg" /> },
    { label: 'NumPy', color: 'blue', icon: <CatIcon src="/image/py/NumPy.svg" /> },
    { label: 'Matplotlib', color: 'green', icon: <CatIcon src="/image/py/Matplotlib.svg" /> },
    { label: 'Seaborn', color: 'cyan', icon: <CatIcon src="/image/extras/Seaborn.svg" /> },
    { label: 'OpenCV', color: 'red', icon: <CatIcon src="/image/py/OpenCV.svg" /> },
  ];

  const genAI = [
    { label: 'NLP', color: 'purple', icon: <Brain size={36} weight="duotone" color="#fff" /> },
    { label: 'LangChain', color: 'green', icon: <CatIcon src="/image/py/langchain-icon-seeklogo.svg" /> },
    { label: 'LangGraph', color: 'teal', icon: <FlowArrow size={36} weight="duotone" color="#fff" /> },
    { label: 'Streamlit', color: 'red', icon: <CatIcon src="/image/extras/Streamlit.svg" /> },
  ];

  const webDev = [
    { label: 'HTML', color: 'orange', icon: <CatIcon src="/image/web/HTML5.svg" /> },
    { label: 'CSS', color: 'blue', icon: <CatIcon src="/image/web/CSS3.svg" /> },
    { label: 'JavaScript', color: 'yellow', icon: <CatIcon src="/image/extras/JavaScript.svg" /> },
    { label: 'React.js', color: 'cyan', icon: <CatIcon src="/image/web/React.svg" /> },
    { label: 'Node.js', color: 'green', icon: <CatIcon src="/image/web/Node.js.svg" /> },
    { label: 'Flask', color: 'purple', icon: <CatIcon src="/image/py/Flask.svg" /> },
    { label: 'FastAPI', color: 'teal', icon: <CatIcon src="/image/web/FastAPI.svg" /> },
    { label: 'MongoDB', color: 'green', icon: <CatIcon src="/image/web/MongoDB.svg" /> },
    { label: 'MySQL', color: 'blue', icon: <CatIcon src="/image/web/MySQL.svg" /> },
    { label: 'Tailwind', color: 'cyan', icon: <CatIcon src="/image/web/Tailwind CSS.svg" /> },
    { label: 'Bootstrap', color: 'purple', icon: <CatIcon src="/image/extras/Bootstrap.svg" /> },
  ];

  const appDev = [
    { label: 'Flutter', color: 'cyan', icon: <CatIcon src="/image/web/Flutter.svg" /> },
  ];

  const tools = [
    { label: 'Git', color: 'orange', icon: <CatIcon src="/image/plt/Git.svg" /> },
    { label: 'GitHub', color: 'purple', icon: <CatIcon src="/image/plt/GitHub.svg" /> },
    { label: 'Jupyter', color: 'orange', icon: <CatIcon src="/image/plt/Jupyter.svg" /> },
    { label: 'Docker', color: 'blue', icon: <CatIcon src="/image/plt/Docker.svg" /> },
    { label: 'VS Code', color: 'blue', icon: <CatIcon src="/image/plt/Visual Studio Code (VS Code).svg" /> },
  ];

  const languages = [
    { label: 'English', color: 'blue', icon: <Translate size={36} weight="duotone" color="#fff" /> },
    { label: 'Tamil', color: 'orange', icon: <Translate size={36} weight="duotone" color="#fff" /> },
  ];

  const renderSection = (title, items) => (
    <div className="flex flex-col items-center w-full my-12" data-aos="fade-up">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-brand-glow)] uppercase tracking-widest">{title}</h3>
      <GlassIcons items={items} />
    </div>
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden flex flex-col items-center">
      <div className="container mx-auto px-8 max-w-[1200px] text-center w-full">
        <h2
          className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold mb-8 tracking-tight"
          data-aos="fade-up"
        >
          My <span className="text-[var(--color-brand-glow)]">Expertise.</span>
        </h2>

        <div className="flex flex-col w-full mt-8 overflow-visible">
          {renderSection("Programming", programming)}
          {renderSection("Machine Learning / Deep Learning", ml)}
          {renderSection("Generative AI", genAI)}
          {renderSection("Web Development", webDev)}
          {renderSection("App Development", appDev)}
          {renderSection("Tools", tools)}
          {renderSection("Languages", languages)}
        </div>
      </div>
    </section>
  );
}
