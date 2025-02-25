import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Building2, ChevronRight, ArrowUp } from 'lucide-react';
import kateImage from '../assets/images/kate.jpg';

const projects = [
  {
    title: "Vital",
    description: "Vital is a Kotlin Multiplatform app that helps users track and manage their health. It features a dashboard, a medicine tracker, blood pressure tracker, and curated articles.",
    tags: ["Kotlin", "Compose MultiPlatform", "Swift", "Gradle"],
    link: "https://github.com/kateliu20/vital_health_tracker_kmp/tree/main"
  },
  {
    title: "Skate",
    description: "An open-source intelliJ plugin created during my Slack internship. Used by all android developers at Slack, which helps to improve local developer productivity by surfacing useful information in the IDE.",
    tags: ["Kotlin", "Intellij SDK", "Gradle"],
    link: "https://github.com/slackhq/foundry/tree/main/platforms/intellij/skate"
  },
  {
    title: "Presentable AI",
    description: "ElevenLabs and a16z hackathon submission. Leveraging ElevenLabs API to create a text-to-voice AI teaching lecturer.",
    tags: ["Node.js", "React", "Vercel", "Typescript", "Firebase", "Python"],
    link: "https://github.com/liezl200/frontend-present-ai"
  }
];

const experiences = [
  {
    company: "Slack",
    role: "Software Engineer, Mobile Developer Experience",
    period: "August 2024 - Present",
    description: "Improving Android developer experience -- smoother CI/CD, faster merge times, and IDE integration.",
    technologies: ["Kotlin", "Bash", "Python", "Starlark"],
    link: "https://slack.com/"
  },
  {
    company: "MathWorks",
    role: "Software Engineering Intern",
    period: "2023-2024",
    description: "Full-stack web development, then worked on AI test generation.",
    technologies: ["Node.js, SQL, python, Docker"],
    link: "https://www.mathworks.com/"
  },
  {
    company: "Slack",
    role: "Software Engineering Intern",
    period: "May - August 2023",
    description: "Developed an open source intelliJ plugin for Android devs at Slack! Also published a blog post on it.",
    technologies: ["Kotlin", "IntelliJ", "Jfrog artifactory management"],
    link: "https://slack.engineering/my-summer-return-internship-slack-a-guide-on-building-on-past-experiences/"
  }
];

function useIntersectionObserver(options = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

function FadeIn({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span 
        className={`inline-block w-[2px] h-[1em] bg-purple-400 -mb-1 ml-1 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  );
}

function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedExperience = experiences[selectedIndex];
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div 
      ref={ref}
      className={`grid md:grid-cols-[200px,1fr] gap-8 transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-10'
      }`}
    >
      {/* Fixed Company List */}
      <div className="md:sticky md:top-24 self-start space-y-1">
        {experiences.map((exp, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
              selectedIndex === index
                ? 'bg-slate-800 border border-purple-400'
                : 'hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className={`w-4 h-4 ${
                selectedIndex === index ? 'text-purple-400' : 'text-slate-400'
              }`} />
              <div className="min-w-0">
                <h3 className={`font-mono text-sm truncate ${
                  selectedIndex === index ? 'text-white' : 'text-slate-300'
                }`}>
                  {exp.company}
                </h3>
                <p className={`text-xs truncate ${
                  selectedIndex === index ? 'text-purple-400' : 'text-slate-400'
                }`}>
                  {exp.period}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Experience Details */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-mono text-white">{selectedExperience.company}</h3>
            <p className="text-purple-400 font-mono mt-1">{selectedExperience.role}</p>
            <p className="text-slate-400 text-sm">{selectedExperience.period}</p>
          </div>
          
          <p className="text-slate-300 leading-relaxed">
            {selectedExperience.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {selectedExperience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-mono text-purple-400 bg-slate-900/50 rounded-full border border-purple-400/20"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <a 
            href={selectedExperience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Learn more</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const threshold = document.documentElement.scrollHeight - window.innerHeight - 100;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-purple-400 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-purple-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      setIsVisible(scrolled > window.innerHeight - 100);
    };

    const observeSection = () => {
      const sections = ['home', 'about', 'experience', 'projects'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', observeSection);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', observeSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-800 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="text-purple-400 hover:text-purple-300 transition-colors font-mono text-lg"
          >
            kate liu
          </button>
          <div className="flex space-x-8">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`font-mono transition-colors ${
                  activeSection === section.id
                    ? 'text-purple-400'
                    : 'text-slate-400 hover:text-purple-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <header id="home" className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Terminal className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-5xl font-mono tracking-tight text-white sm:text-6xl md:text-7xl lowercase">
              <TypewriterText text="kate liu" />
            </h1>
            <p className="mt-6 max-w-md mx-auto text-xl text-slate-400 sm:text-2xl md:mt-8 md:max-w-3xl font-mono">
              &lt;software_engineer /&gt;
            </p>
            <div className="mt-8 flex justify-center space-x-6">
              <a href="https://github.com/kateliu20" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="w-7 h-7" />
              </a>
              <a href="https://linkedin.com/in/kateliu20" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="mailto:kateliu20@gmail.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr,300px] gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl font-mono text-purple-400">&gt; about_me</h2>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                hey! it's kate. i'm a software engineer focused on android developer experience @ slack,
                also interested in ai, good ui/ux, and building scalable applications. nice to meet you! :)
              </p>
            </FadeIn>
            
            <FadeIn delay={200}>
            <div className="aspect-square rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
              <img 
                src={kateImage}
                alt="Profile Picture" 
                className="w-full h-full object-cover"
              />
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center" delay={200}>
            <h2 className="text-3xl font-mono text-center text-purple-400 mb-16">&gt; experience</h2>
          </FadeIn>
          <ExperienceSection />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center" delay={200}>
            <h2 className="text-3xl font-mono text-center text-purple-400 mb-16">&gt; projects</h2>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-purple-400 transition-colors h-full">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <Code2 className="w-6 h-6 text-purple-400" />
                      <a href={project.link} className="text-slate-400 hover:text-purple-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <h3 className="mt-4 text-xl font-mono text-white">{project.title}</h3>
                    <p className="mt-2 text-slate-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-sm font-mono text-purple-400 bg-slate-900/50 rounded-full border border-purple-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="text-slate-500 font-mono">© {new Date().getFullYear()} kate liu // all rights reserved</p>
          </FadeIn>
        </div>
      </footer>

      <ScrollToTopButton />
    </div>
  );
}

export default App;