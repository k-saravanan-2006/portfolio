// SOURCE OF TRUTH: Preserved Portfolio Content of K Saravanan
// Extracted directly from production bundle and verified user records

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  features?: string[];
  metrics?: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFlagship?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    description: string;
  }[];
}

export interface CodingProfile {
  name: string;
  platform: string;
  handle: string;
  url: string;
  stats?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  focus: string;
  achievements: string[];
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  identity: {
    name: "SARAVANAN K",
    degree: "B.Tech Artificial Intelligence & Data Science",
    description: "Passionate AI & Data Science student who loves building smart, data-driven solutions.",
    institution: "Sri Sairam Engineering College",
    email: "saravanankumar8285@gmail.com",
    contactEndpoint: "https://formsubmit.co/ajax/saravanankumar8285@gmail.com",
    summary:
      "I am an AI and Software Developer specializing in machine learning, computer vision, and intelligent automation systems. I have built practical, production-focused solutions such as stock prediction engines, real-time vision pipelines, and AI-powered collaboration bots.",
    approach:
      "My expertise spans Python, OpenCV, Flask, AWS, and modern JavaScript frameworks, enabling me to work across the full stack—from model development and API integration to frontend implementation and deployment."
  },

  projects: [
    {
      id: "ai-traffic-signal",
      number: "01",
      title: "AI Traffic Signal Automation",
      subtitle: "Autonomous Computer Vision & Dynamic Arbitration System",
      description:
        "An intelligent traffic regulation architecture utilizing computer vision to dynamically analyze real-time lane density, distinguish pedestrians from vehicles, and optimize signal cycles with priority override for emergency service vehicles.",
      category: "Computer Vision / AI Systems",
      technologies: ["Python", "OpenCV", "Deep Learning", "Flask", "Real-Time Vision Pipeline"],
      features: [
        "Real-time vehicle and pedestrian density calculation",
        "Dynamic cycle timing replacing static timers",
        "Automated emergency vehicle detection & lane priority override",
        "Fail-safe manual and semi-autonomous operational modes"
      ],
      metrics: ["Sub-second density evaluation", "Zero latency failover mode"],
      githubUrl: "https://github.com/k-saravanan-2006",
      isFlagship: true
    },
    {
      id: "vision-ai-tools",
      number: "02",
      title: "Vision AI Tools",
      subtitle: "Real-Time Video Stream Analysis Suite",
      description:
        "A suite of modular computer vision tools built in Python utilizing OpenCV for low-latency video stream analysis, facial feature tracking, gesture telemetry, and multi-object spatial detection.",
      category: "Computer Vision / Python",
      technologies: ["Python", "OpenCV", "NumPy", "MediaPipe"],
      features: [
        "Multi-stream video feed ingestion",
        "Low-latency landmark and object tracking",
        "Custom heuristic detection thresholds"
      ],
      githubUrl: "https://github.com/k-saravanan-2006"
    },
    {
      id: "taskflow",
      number: "03",
      title: "TaskFlow",
      subtitle: "AI-Powered Collaborative Task Ecosystem",
      description:
        "Collaborative workflow management platform featuring real-time synchronization over WebSockets, intelligent task triage, and an interactive modern dashboard interface.",
      category: "Full Stack / AI Automation",
      technologies: ["React", "Node.js", "WebSockets", "MongoDB", "Tailwind CSS"],
      features: [
        "Bi-directional real-time task board updates",
        "Role-based workspace collaboration",
        "Automated status classification"
      ],
      githubUrl: "https://github.com/k-saravanan-2006"
    },
    {
      id: "neon-dash",
      number: "04",
      title: "Neon Dash",
      subtitle: "High-Throughput Analytics Dashboard",
      description:
        "High-density responsive data visualization dashboard built with modern React featuring virtualized data tables, interactive metric charting, and dark-theme telemetry displays.",
      category: "Frontend Engineering",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Chart.js"],
      features: [
        "Virtualized high-volume data tables",
        "Real-time KPI charting and state filters",
        "Micro-responsive layout adaptation"
      ],
      githubUrl: "https://github.com/k-saravanan-2006"
    },
    {
      id: "aura-ecommerce",
      number: "05",
      title: "Aura E-Commerce",
      subtitle: "Modern Digital Commerce Architecture",
      description:
        "End-to-end commerce application with Node.js backend services, secure payment gateway orchestration via Stripe, persistent cart state management, and optimized inventory querying.",
      category: "Full Stack Web",
      technologies: ["React", "Node.js", "Stripe API", "MongoDB", "Express"],
      features: [
        "Secure checkout & webhook transaction verification",
        "Dynamic cart state with optimistic UI updates",
        "Category filtering and relational search"
      ],
      githubUrl: "https://github.com/k-saravanan-2006"
    }
  ] as ProjectItem[],

  skillCategories: [
    {
      title: "Core & Engineering",
      description: "Foundational programming paradigms, systems, and algorithms",
      skills: [
        { name: "Java", description: "Object-oriented architecture & algorithmic problem solving" },
        { name: "Python", description: "Machine learning, computer vision & backend services" },
        { name: "C", description: "Low-level system programming & memory discipline" },
        { name: "Data Structures & Algorithms", description: "Trees, graphs, dynamic programming, sorting & optimization" }
      ]
    },
    {
      title: "Frontend & Creative",
      description: "Interactive visual interfaces, performance, and motion",
      skills: [
        { name: "React.js", description: "Component architecture, hooks & reactive state engines" },
        { name: "TypeScript", description: "Type-safe scalability & design system contracts" },
        { name: "Three.js / WebGL", description: "3D scene composition, geometry, shaders & canvas rendering" },
        { name: "GSAP & Motion", description: "ScrollTrigger, timeline choreography & micro-interactions" },
        { name: "HTML5 & CSS3", description: "Semantic markup, modern CSS variables & responsive grids" }
      ]
    },
    {
      title: "AI, Vision & Backend",
      description: "Intelligent systems, data manipulation, and services",
      skills: [
        { name: "OpenCV", description: "Real-time image processing, edge detection & spatial tracking" },
        { name: "PyTorch", description: "Neural network training & deep learning pipelines" },
        { name: "LangChain", description: "LLM orchestration & intelligent autonomous agents" },
        { name: "Node.js / Express", description: "Asynchronous backend runtimes & REST services" },
        { name: "FastAPI / Flask", description: "High-performance Python microservices" },
        { name: "NumPy / Matplotlib", description: "Numerical analysis and scientific visualization" }
      ]
    },
    {
      title: "Platforms & Database",
      description: "Data persistence, cloud infrastructure, and developer tooling",
      skills: [
        { name: "MongoDB", description: "Document-oriented NoSQL storage" },
        { name: "MySQL", description: "Relational data modeling and structured query optimization" },
        { name: "Docker", description: "Application containerization & consistent runtimes" },
        { name: "Git & GitHub", description: "Distributed version control & collaborative workflows" },
        { name: "VS Code & Jupyter", description: "Integrated development & exploratory data science" }
      ]
    }
  ] as SkillCategory[],

  codingProfiles: [
    {
      name: "GitHub",
      platform: "Version Control & Open Source",
      handle: "k-saravanan-2006",
      url: "https://github.com/k-saravanan-2006",
      stats: "Active repositories & code contributions"
    },
    {
      name: "LeetCode",
      platform: "Competitive Problem Solving",
      handle: "K_SARAVANAN",
      url: "https://leetcode.com/u/K_SARAVANAN/",
      stats: "Algorithmic practice across DSA patterns"
    },
    {
      name: "LinkedIn",
      platform: "Professional Network",
      handle: "k-saravanan-14b03132a",
      url: "https://www.linkedin.com/in/k-saravanan-14b03132a/",
      stats: "Engineering updates & collaborative network"
    },
    {
      name: "SkillRack",
      platform: "Technical Assessments",
      handle: "ID: 494274",
      url: "https://www.skillrack.com/faces/resume.xhtml?id=494274&key=c6656285d433d6f25b8b37f07312a1b086e8525f",
      stats: "Verified institutional assessment record"
    },
    {
      name: "CodeChef",
      platform: "Competitive Programming",
      handle: "k_saravanan",
      url: "https://www.codechef.com/users/k_saravanan",
      stats: "Contest participation & ratings"
    }
  ] as CodingProfile[],

  experiences: [
    {
      period: "2024 — Present",
      role: "B.Tech in Artificial Intelligence & Data Science",
      organization: "Sri Sairam Engineering College",
      focus: "Autonomous systems, deep learning architectures, computer vision, and computational problem solving.",
      achievements: [
        "Developing real-time computer vision traffic arbitration pipelines",
        "Competed consistently in collegiate competitive programming hackathons",
        "Engineered full-stack reactive applications and distributed systems"
      ],
      technologies: ["Python", "OpenCV", "PyTorch", "Java", "React", "TypeScript"]
    },
    {
      period: "2023 — 2024",
      role: "Full-Stack & Computer Vision Projects",
      organization: "Independent Engineering & Research",
      focus: "Applied machine learning models, REST microservices, and interactive frontend interfaces.",
      achievements: [
        "Implemented real-time video stream analyzers with OpenCV and MediaPipe",
        "Created TaskFlow real-time collaborative workspace with WebSockets",
        "Formulated DSA problem solver routines across 300+ competitive problems"
      ],
      technologies: ["Node.js", "Python", "Flask", "MongoDB", "Tailwind CSS"]
    }
  ] as ExperienceItem[]
};
