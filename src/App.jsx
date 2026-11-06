import { useEffect, useRef, useState } from 'react';
import './index.css';

// ===== INTERSECTION OBSERVER HOOK =====
function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up, .fade-in, .stagger-children');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ===== LOGO ICON =====
function BrandIcon() {
  return (
    <div className="brand-icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="8" r="5" stroke="white" strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="8" r="1.5" fill="white" />
      </svg>
    </div>
  );
}

// ===== CTA BUTTON =====
function CtaButton({ label = 'See my works', dark = false }) {
  return (
    <button className={dark ? 'btn-dark' : 'btn-primary'}>
      <span className="btn-icon">→</span>
      {label}
    </button>
  );
}

// ===== NAVBAR =====
function Navbar() {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand">
          <BrandIcon />
          Dominic
        </a>
        <button className="menu-btn" aria-label="Open menu">
          <div className="menu-icon">
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
}

// ===== HERO =====
function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-top-left">
            <div className="availability-badge fade-in">
              <span className="availability-dot"></span>
              Available for Work
            </div>
            <h1 className="hero-headline fade-up">
              Brand &amp; UI/UX<br />
              Designer based<br />
              in London
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-image-container">
            <img
              src="/images/hero-portrait.jpg"
              alt="Dominic Wagner – Brand and UI/UX Designer"
              className="hero-image"
            />
          </div>
          <div className="hero-right-content fade-up">
            <p className="hero-bio">
              Hi, I'm Dominic Wagner – a UI/UX and brand designer passionate
              about creating seamless digital experiences that connect and convert.
            </p>
            <CtaButton label="See my works" />
          </div>
        </div>
      </div>

      {/* BIG NAME */}
      <div className="hero-name-overlay" aria-hidden="true">
        <span className="hero-name-text">Dominic</span>
      </div>

      {/* Decorative dots */}
      <div className="hero-dot" style={{ bottom: '82px', left: '50%', transform: 'translateX(-50%)' }}></div>
      <div className="hero-dot" style={{ bottom: '82px', right: '120px' }}></div>
    </section>
  );
}

// ===== MARQUEE / TICKER =====
const MARQUEE_ITEMS = [
  { label: 'Supa Blox' },
  { label: 'Ship Blox' },
  { label: 'Ultra Blox' },
  { label: 'Frame Blox' },
  { label: 'Hype Blox' },
  { label: 'Brand Blox' },
  { label: 'Supa Blox' },
  { label: 'Ship Blox' },
  { label: 'Ultra Blox' },
  { label: 'Frame Blox' },
  { label: 'Hype Blox' },
  { label: 'Brand Blox' },
];

function MarqueeSection() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <div className="marquee-item" key={i}>
            <svg className="marquee-item-icon" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="10" r="4" fill="currentColor" />
            </svg>
            {item.label}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {MARQUEE_ITEMS.map((item, i) => (
          <div className="marquee-item" key={`dup-${i}`}>
            <svg className="marquee-item-icon" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="10" r="4" fill="currentColor" />
            </svg>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== ABOUT ME SECTION =====
function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      if (videoRef.current.currentSrc) {
        videoRef.current.play().catch(() => { });
        setIsPlaying(true);
      } else {
        setIsPlaying((prev) => !prev);
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="about" className="about-me-section">
      <div className="about-me-container">
        {/* LEFT: Video Placeholder (Introductory Video) */}
        <div className="about-left fade-up">
          <div
            className={`about-video-card ${isPlaying ? 'is-playing' : ''}`}
            onClick={handleVideoToggle}
            role="button"
            tabIndex={0}
            aria-label="Play introductory video"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleVideoToggle();
              }
            }}
          >
            {/* Native video element ready for local file embedding */}
            <video
              ref={videoRef}
              className="about-video-element"
              playsInline
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            >
              {/* Local video source placeholder: */}
              {/* <source src="/videos/intro.mp4" type="video/mp4" /> */}
            </video>

            {/* Video Background Mockup & Ambient Aesthetics */}
            <div className="about-video-poster">
              <div className="video-mesh-glow"></div>
              <div className="video-grid-pattern"></div>
              <div className="video-center-graphic" aria-hidden="true">
                <span className="video-subtle-tag">INTRO VIDEO</span>
              </div>
            </div>

            {/* Top Bar Badges */}
            <div className="about-video-top-bar">
              <div className="video-status-badge">
                <span className="video-rec-dot"></span>
                <span>Introductory Video</span>
              </div>
              <div className="video-duration-badge">01:30</div>
            </div>

            {/* Play Button Overlay */}
            <div className="about-video-play-overlay">
              <div className="play-button-circle">
                <svg
                  className="play-icon"
                  width="22"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                >
                  <path d="M20 12L3 22V2L20 12Z" fill="currentColor" />
                </svg>
              </div>
              <span className="play-button-label">
                {isPlaying ? 'Pause Video' : 'Watch Introduction'}
              </span>
            </div>

            {/* Bottom Bar Info */}
            <div className="about-video-bottom-bar">
              <div className="video-author-info">
                <span className="video-author-title">Meet The Designer</span>
                <span className="video-author-sub">UI/UX &amp; Product Design</span>
              </div>
              <div className="video-quality-pill">4K ULTRA HD</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Text Content (2-lined Heading + 6-lined Paragraph) */}
        <div className="about-right fade-up">
          <div className="about-badge">
            <span className="about-badge-dot"></span>
            About Me
          </div>

          <h2 className="about-heading">
            UI/UX &amp; Product Designer<br />
            Crafting Intuitive Experiences
          </h2>

          <p className="about-bio">
            I am a UI/UX and Product Designer passionate about shaping intuitive digital products from concept to final execution. My work centers on solving complex business challenges with clean, user-focused design systems, rigorous interaction details, and purposeful design patterns. Over the years, I have helped tech startups and global brands turn ambitious ideas into seamless digital experiences across web and mobile platforms. I believe great products live at the intersection of aesthetic craft, engineering feasibility, and genuine customer value. By combining research-driven discovery with rapid prototyping, I build experiences that engage, convert, and scale. Every detail—from motion to micro-interactions—is crafted with deliberate care.
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== SERVICES =====
const SERVICES = [
  {
    num: '01',
    name: 'Brand Identity & Strategy',
    desc: 'From logo design to full brand systems, I create cohesive identities that reflect your vision and resonate with your audience.',
  },
  {
    num: '02',
    name: 'UI/UX Design & Digital Experiences',
    desc: 'I design intuitive, user-centered digital experiences that enhance engagement and bring brands to life online.',
  },
  {
    num: '03',
    name: 'Fast integration',
    desc: 'With a strong design vision, I help brands define their aesthetic, ensuring consistency across all touchpoints.',
  },
];

function ServicesSection() {
  return (
    <section id="services" style={{ background: 'var(--bg-primary)', paddingBottom: '0' }}>
      <div className="services-section">
        <div className="services-header fade-up">
          <h2 className="services-title">
            Design Solutions That Elevate Your Brand
          </h2>
          <p className="services-desc">
            From strategy to execution, I provide tailored design services that help brands stand out
            and create meaningful connections. Whether you need a strong identity, a seamless digital
            experience, or creative direction, I've got you covered.
          </p>
        </div>
        <div className="services-grid stagger-children">
          {SERVICES.map((s) => (
            <div className="service-card stagger-child" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-card-bottom">
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== FEATURED WORK (4TH SECTION) =====
const FEATURED_WORKS = [
  {
    name: 'Bookify',
    desc: 'SaaS project mainly focusing the user flow from a user perspective to acheive modern and simple experiance.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop',
    link: 'https://bookify-amq.vercel.app/',
  },
  {
    name: 'Remindly',
    desc: 'A reminder App Designed in figma showcasing modern designing and ui skills',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&fit=crop',
    link: 'https://www.figma.com/design/Nk08hZUKWjze1tbLHwDKpK/Portfolio-Work-AMQ?node-id=63-5&t=5wO53CSkwrn0dAVU-1',
  },
  {
    name: 'ESAC',
    desc: 'Web Desing for an Architectural Firm showcasing UI and modern designing and animations',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop',
    link: 'https://esaconsultants.vercel.app/',
  },
  {
    name: 'NexCafe',
    desc: 'a web design for a premium resturants focusing on order flow, animations and UI',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80&fit=crop',
    link: 'https://thenexcafe.vercel.app/',
  },
];

function AwardsSection() {
  const [activeWork, setActiveWork] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="awards" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="awards-section">
        <div className="awards-left fade-up">
          <div className="section-label" style={{ marginBottom: '16px' }}>Featured Work</div>
          <h2 className="awards-title">
            Selected Projects &amp; Digital Experiences
          </h2>
          <p className="awards-desc">
            A curated selection of digital products, web platforms, and mobile apps crafted with obsessive attention to user flow, modern interaction, and clean visual aesthetics.
          </p>
          <CtaButton label="See all projects" />
        </div>

        <div className="awards-right featured-work-list fade-up" onMouseMove={handleMouseMove}>
          {FEATURED_WORKS.map((work) => (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-work-item"
              key={work.name}
              onMouseEnter={() => setActiveWork(work)}
              onMouseLeave={() => setActiveWork(null)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="project-work-title-wrap">
                <span className="project-work-name">{work.name}</span>
                <span className="project-work-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-work-desc">{work.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Hover Screenshot Preview */}
      <div
        className={`project-hover-preview ${activeWork ? 'active' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
        aria-hidden="true"
      >
        <div className="preview-card-inner">
          <img src={activeWork ? activeWork.img : ''} alt="Project Preview Screenshot" />
          <div className="preview-card-overlay">
            <span className="preview-badge">{activeWork ? activeWork.name : 'Project Preview'}</span>
            <span className="preview-hint">View Case Study ↗</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== HOW I WORK (5TH SECTION) =====
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We start with deep listening — stakeholder interviews, user research, competitive landscape analysis, and goal alignment. No assumptions, only data.',
    side: 'left',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Strategize',
    desc: 'Insights become blueprints. We define clear success metrics, map user journeys, establish the tech stack, and build a phased roadmap with ownership at every step.',
    side: 'right',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Design',
    desc: 'From wireframes to pixel-perfect high-fidelity designs. Every screen is backed by UX principles and validated through rapid iteration cycles with your team.',
    side: 'left',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Production-grade development with rigorous QA. We build in public, with regular demos and checkpoints so you always know exactly where things stand.',
    side: 'right',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Launch & Grow',
    desc: 'Go live with confidence. Post-launch, we monitor performance, optimize based on real data, and continue iterating toward sustainable, compounding growth.',
    side: 'left',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
      </svg>
    ),
  },
];

function HowIWorkSection() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !progressLineRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const startThreshold = winH * 0.65;

      const steps = containerRef.current.querySelectorAll('.timeline-step');
      if (steps.length > 0) {
        const firstNode = steps[0].querySelector('.step-node');
        const lastNode = steps[steps.length - 1].querySelector('.step-node');
        if (firstNode && lastNode) {
          const firstY = firstNode.getBoundingClientRect().top;
          const lastY = lastNode.getBoundingClientRect().top;
          const totalDistance = lastY - firstY;

          let progress = (startThreshold - firstY) / (totalDistance || 1);
          progress = Math.max(0, Math.min(1, progress));
          progressLineRef.current.style.height = `${progress * 100}%`;
        }

        steps.forEach((step, idx) => {
          const node = step.querySelector('.step-node');
          const nodeTop = node ? node.getBoundingClientRect().top : step.getBoundingClientRect().top;
          if (nodeTop < startThreshold) {
            setActiveStepIndex((prev) => Math.max(prev, idx));
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="how-i-work" className="how-i-work-section">
      <div className="how-i-work-header fade-up">
        <div className="section-label">How I Work</div>
        <h2 className="section-heading">My Proven Process From Concept to Launch</h2>
        <p className="section-body">A structured, transparent methodology designed to de-risk development, elevate design standards, and deliver high-impact digital products.</p>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line-track">
          <div className="timeline-line-progress" ref={progressLineRef}></div>
        </div>

        {PROCESS_STEPS.map((step, idx) => {
          const isActive = idx <= activeStepIndex;
          return (
            <div
              className={`timeline-step step-${step.side}`}
              key={step.num}
              data-step={step.num}
            >
              {step.side === 'right' && <div className="step-spacer" aria-hidden="true"></div>}

              {step.side === 'left' && (
                <div className={`step-card ${isActive ? 'is-active' : ''}`}>
                  <div className="step-icon-btn" aria-hidden="true">{step.icon}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              )}

              <div className={`step-node ${isActive ? 'is-active' : ''}`}>
                <span className="node-number">{step.num}</span>
              </div>

              {step.side === 'right' && (
                <div className={`step-card ${isActive ? 'is-active' : ''}`}>
                  <div className="step-icon-btn" aria-hidden="true">{step.icon}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              )}

              {step.side === 'left' && <div className="step-spacer" aria-hidden="true"></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ===== VISION CTA SECTION (ZOOM-OUT IMAGE & TEXT ANIMATION) =====
function VisionCtaSection() {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else if (entry.boundingClientRect.top > 0) {
            setInView(false);
          }
        });
      },
      { threshold: 0.25 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="vision-cta" className="vision-cta-section" aria-label="Let's Bring Your Vision To Life">
      <div
        ref={wrapRef}
        className={`vision-cta-wrap ${inView ? 'in-view' : ''}`}
        id="vision-cta-wrap"
      >
        <div className="vision-img-container">
          <img
            id="vision-bg-img"
            className="vision-bg-img"
            src="/images/cta-portrait.jpg"
            alt="Let's Bring Your Vision To Life portrait"
          />
        </div>
        <div className="vision-overlay" aria-hidden="true"></div>
        <div className="vision-content">
          <h2 className="vision-heading">Let's Bring Your Vision To Life</h2>
          <p className="vision-sub">Ready to create something meaningful?</p>
          <div className="vision-cta-btn-wrap">
            <a href="#footer" className="btn-primary vision-btn">
              <span className="btn-icon">→</span>
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== STATS =====
const STATS = [
  { num: '500+', label: 'Projects Done' },
  { num: '10+', label: 'Years Experience' },
  { num: '200+', label: 'Happy Clients' },
  { num: '50+', label: 'Awards Won' },
];

function StatsSection() {
  return (
    <section id="stats" style={{ background: 'var(--bg-primary)' }}>
      <div className="stats-section">
        <div className="stats-grid stagger-children">
          {STATS.map((s) => (
            <div className="stat-item stagger-child" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="stats-images fade-up">
          <div className="stats-img-card">
            <img src="/images/stats-interior.jpg" alt="Interior design project" />
          </div>
          <div className="stats-img-card">
            <img src="/images/stats-cube.jpg" alt="Product design project" />
          </div>
          <div className="stats-img-card">
            <img src="/images/stats-orange-room.jpg" alt="Brand color project" />
          </div>
          <div className="stats-img-card">
            <img src="/images/project-streetwear.jpg" alt="Streetwear project" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT 2 =====
function Contact2Section() {
  return (
    <section id="contact-2" style={{ background: 'var(--bg-primary)' }}>
      <div className="contact2-section">
        <div className="contact2-images fade-up">
          <div className="contact2-img">
            <img src="/images/project-car.jpg" alt="Portfolio work" />
          </div>
          <div className="contact2-img">
            <img src="/images/project-interior.jpg" alt="Portfolio work" />
          </div>
        </div>
        <div className="contact2-content fade-up">
          <h2 className="contact2-title">Let's Create Something Exceptional</h2>
          <p className="contact2-sub">
            Let's collaborate to create a bold brand or seamless digital experience. Get in touch!
          </p>
          <CtaButton label="Contact me" />
        </div>
      </div>
    </section>
  );
}

// ===== TESTIMONIALS =====
const TESTIMONIALS = [
  {
    name: 'Jillie Bernard',
    role: 'Founder & CEO',
    text: 'Dominic transformed our brand identity with a fresh, modern look that truly resonates with our audience.',
    initials: 'JB',
  },
  {
    name: 'David Miller',
    role: 'Lead Software Engineer',
    text: "From concept to execution, Dominic's attention to detail and creativity exceeded our expectations.",
    initials: 'DM',
  },
  {
    name: 'Jillie Bernard',
    role: 'Director of Sales',
    text: "Our website UX is now sleek and intuitive, thanks to Dominic's expertise in digital design.",
    initials: 'JB',
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: 'var(--bg-primary)' }}>
      <div className="testimonials-section">
        <div className="testimonials-header fade-up">
          <h2 className="testimonials-title">What Clients Say</h2>
          <p className="testimonials-desc">
            Great design goes beyond aesthetics—it creates impact. Hear from clients who have
            experienced the power of thoughtful branding and design firsthand.
          </p>
        </div>
        <div className="testimonials-grid stagger-children">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card stagger-child" key={i}>
              <div className="testimonial-avatar">
                <div className="avatar-placeholder">{t.initials}</div>
              </div>
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span className="star" key={n}>★</span>
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div>
                <div className="testimonial-author-name">{t.name}</div>
                <div className="testimonial-author-role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== PRICING =====
const PRICING_PLANS = [
  {
    id: 'basic',
    planName: 'BASIC PLAN',
    price: '$2990',
    billed: 'Billed monhtly',
    name: 'Start Your Journey',
    features: [
      'Basic brand consultation',
      'Access to design resources',
      'One revision on initial concept',
      'Basic chat and support',
    ],
    featured: false,
  },
  {
    id: 'pro',
    planName: 'PRO PLAN',
    price: '$4990',
    billed: 'Billed monhtly',
    name: 'Elevate Your Brand',
    features: [
      'Full brand identity design',
      'UI/UX design for website or app',
      'Up to three revisions',
      'Brand guidelines & assets',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    planName: 'ENTERPRISE PLAN',
    price: '$6990',
    billed: 'Billed monhtly',
    name: 'Complete Branding Solution',
    features: [
      'Custom brand strategy & identity',
      'Digital experience design',
      'Unlimited revisions',
      'Priority support',
    ],
    featured: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" style={{ background: 'var(--bg-primary)' }}>
      <div className="pricing-section">
        <div className="pricing-header fade-up">
          <h2 className="pricing-title">Flexible Pricing Plans</h2>
          <p className="pricing-desc">
            Choose the plan that fits your needs and budget.
          </p>
        </div>
        <div className="pricing-grid stagger-children">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card stagger-child${plan.featured ? ' featured' : ''}`}
            >
              <div className="pricing-card-top">
                <div className="pricing-plan-name">{plan.planName}</div>
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-billed">{plan.billed}</div>
                <div className="pricing-name">{plan.name}</div>
              </div>
              <div className="pricing-divider"></div>
              <div className="pricing-card-bottom">
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="pricing-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.featured ? (
                  <CtaButton label="Contact me" dark />
                ) : (
                  <CtaButton label="Contact me" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== FINAL CONTACT =====
function FinalContact() {
  return (
    <section id="final-contact" className="final-contact-section">
      <div className="final-contact-bg">
        <img
          src="/images/contact-final.jpg"
          alt="Let's Bring Your Vision to Life"
        />
      </div>
      <div className="final-contact-overlay"></div>
      <div className="final-contact-content">
        <h2 className="final-contact-title">Let's Bring Your Vision to Life</h2>
        <CtaButton label="Contact me" />
      </div>
    </section>
  );
}

// ===== FOOTER =====
const FOOTER_MENU = ['About', 'Work', 'My Process', 'Contact', 'Testimonials'];
const FOOTER_SOCIAL = [
  { name: 'LinkedIn', icon: '𝐢𝐧' },
  { name: 'Instagram', icon: '◎' },
  { name: 'Twitter', icon: '𝕏' },
  { name: 'Facebook', icon: 'ⓕ' },
  { name: 'Tiktok', icon: '♪' },
];

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <BrandIcon />
            Dominic
          </div>
          <p className="footer-tagline">Brand &amp; UI/UX Designer based in London</p>
          <p className="footer-bio">
            Hi, I'm Dominic Wagner – a UI/UX and brand designer passionate about creating
            seamless digital experiences that connect and convert.
          </p>
        </div>

        <div>
          <p className="footer-col-title">Menu</p>
          <ul className="footer-links">
            {FOOTER_MENU.map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-col-title">Social</p>
          <ul className="footer-links">
            {FOOTER_SOCIAL.map((s) => (
              <li key={s.name}>
                <a href="#">
                  <span className="social-icon">{s.icon}</span>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big watermark name */}
      <div className="footer-watermark" aria-hidden="true">
        <span className="footer-big-name">Dominic</span>
        <div className="footer-dot-container">
          <div className="footer-dot"></div>
          <div className="footer-dot"></div>
        </div>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  useScrollAnimation();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <AwardsSection />
        <HowIWorkSection />
        <VisionCtaSection />
        <StatsSection />
        <Contact2Section />
        <TestimonialsSection />
        <PricingSection />
        <FinalContact />
      </main>
      <Footer />
    </>
  );
}
