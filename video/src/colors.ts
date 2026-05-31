export const theme = {
  black: "#050505",
  nearBlack: "#050505",
  charcoal: "#0B0B0D",
  darkGray: "#111113",
  gold: "#D4AF37",
  goldLight: "#F2D27A",
  goldDark: "#B8962E",
  goldWarm: "#E8C04A",
  white: "#F5F5F5",
  whitePure: "#FFFFFF",
  muted: "#8B8B8B",
  mutedLight: "#A8A8AD",
  border: "rgba(212, 175, 55, 0.22)",
  borderLight: "rgba(212, 175, 55, 0.35)",
  glassBg: "rgba(11, 11, 13, 0.6)",
  glassCard: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(11, 11, 13, 0.4) 100%)",
  glowGold: "rgba(212, 175, 55, 0.4)",
  glowGoldSoft: "rgba(212, 175, 55, 0.15)",
  gradientGold: "linear-gradient(135deg, #D4AF37 0%, #F2D27A 50%, #D4AF37 100%)",
  gradientDark: "radial-gradient(ellipse at 50% 50%, #0B0B0D 0%, #050505 70%, #050505 100%)",
  gradientHero: "radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.03) 0%, transparent 60%)",
  fontHeading: "'Plus Jakarta Sans', 'Clash Display', sans-serif",
  fontBody: "'Inter', 'Satoshi', sans-serif",
  fontAlt: "'DM Sans', 'General Sans', sans-serif",
  fontAccent: "'Cormorant Garamond', serif",
} as const;

export const FPS = 60;
export const RESOLUTION = { width: 3840, height: 2160 } as const;

// Exact durations in frames at 60fps
export const DURATIONS = {
  INTRO: 8 * FPS,
  HERO: 13 * FPS,
  SERVICES: 13 * FPS,
  SHOWCASE: 15 * FPS,
  WHY: 15 * FPS,
  FINAL: 16 * FPS,
} as const;

export const TOTAL_DURATION = Object.values(DURATIONS).reduce((a, b) => a + b, 0);

// Real website content data
export const REAL_SKILLS = {
  languages: { title: "Languages", icon: "</>", items: [
    { name: "JavaScript", level: 95 }, { name: "TypeScript", level: 85 },
    { name: "Python", level: 75 }, { name: "PHP", level: 70 },
    { name: "HTML5", level: 98 }, { name: "CSS3", level: 95 },
  ]},
  tools: { title: "Tools", icon: "⚙", items: [
    { name: "Git", level: 90 }, { name: "Docker", level: 70 },
    { name: "VS Code", level: 95 }, { name: "Figma", level: 80 },
    { name: "Vite", level: 90 }, { name: "Webpack", level: 75 },
  ]},
  styling: { title: "Styling", icon: "🎨", items: [
    { name: "Tailwind CSS", level: 95 }, { name: "SCSS", level: 85 },
    { name: "Framer Motion", level: 90 }, { name: "GSAP", level: 88 },
    { name: "Styled Comp.", level: 80 },
  ]},
  motions: { title: "3D & Motions", icon: "◆", items: [
    { name: "Three.js", level: 85 }, { name: "React Three Fiber", level: 88 },
    { name: "GSAP", level: 90 }, { name: "Lenis", level: 85 },
    { name: "WebGL", level: 70 }, { name: "Blender", level: 65 },
  ]},
};

export const REAL_STATS = [
  { value: "48h", label: "Fast Delivery", desc: "Express turnaround on starter projects" },
  { value: "100%", label: "Premium UI/UX", desc: "Award-winning design interface" },
  { value: "98", label: "SEO Optimized", desc: "Built for search visibility" },
  { value: "100%", label: "Fully Responsive", desc: "Flawless on every device" },
  { value: "∞", label: "Smooth Animations", desc: "Cinematic motion design" },
  { value: "∞", label: "Scalable Systems", desc: "Built to grow with you" },
];

export const REAL_SERVICES = [
  { icon: "🌐", title: "Starter Website",     price: "99 $ CAD", tag: "starting at", popular: false,
    desc: "Clean, modern websites for local businesses ready to establish their digital presence.",
    features: ["5-page responsive website", "Modern UI design", "Basic SEO setup", "Mobile optimized", "1 revision round", "Fast delivery (48h)"] },
  { icon: "⚡", title: "Premium Business Website",     price: "149 $ CAD", tag: "starting at", popular: true,
    desc: "Advanced animations, modern UI, and high-performance architecture for growing brands.",
    features: ["Up to 10 pages", "GSAP animations", "Advanced UI/UX design", "SEO optimization", "CMS integration", "3 revision rounds", "Priority support"] },
  { icon: "🛒", title: "E-Commerce Website",     price: "249 $ CAD", tag: "starting at", popular: false,
    desc: "Modern online stores with seamless checkout, inventory management, and beautiful product displays.",
    features: ["Product management", "Shopping cart & checkout", "Payment gateway", "Inventory management", "SEO optimization", "3 revision rounds"] },
  { icon: "🔧", title: "Custom Digital Solution", price: "Custom", tag: null, popular: false,
    desc: "Tailor-made scalable digital systems designed around your unique business requirements.",
    features: ["Unlimited pages", "Custom architecture", "Advanced animations", "Full SEO strategy", "API integrations", "Unlimited revisions", "Dedicated support"] },
];

export const REAL_PROJECT = {
  title: "LOOKING2FLYY", category: "Hair Salon", icon: "💇‍♀️",
  desc: "Premium hair studio website for locs, braids, and extensions with online booking.",
  link: "https://looking2flyybymkash.vercel.app",
  tags: ["Locs", "Braids", "Extensions"],
  features: ["Online Booking", "Service Menu", "Gallery", "Location"],
};

export const REAL_WHY = [
  { num: "01", title: "Modern Architecture", desc: "Built with the latest web technologies for speed, security, and scalability." },
  { num: "02", title: "Luxury UI/UX", desc: "Cinematic interfaces that captivate users and elevate your brand perception." },
  { num: "03", title: "Fast Performance", desc: "Optimized load times and buttery-smooth interactions for maximum engagement." },
  { num: "04", title: "Smooth Interactions", desc: "Framer Motion and GSAP-powered animations that feel incredibly natural." },
  { num: "05", title: "Mobile-First Systems", desc: "Every pixel meticulously crafted for every screen size, from watch to 4K." },
  { num: "06", title: "Built for Scaling", desc: "Architecture that grows effortlessly as your business expands and evolves." },
];

export const REAL_PROCESS = [
  { num: "01", title: "Strategy", desc: "Deep research and planning to align your vision with market opportunities." },
  { num: "02", title: "Design", desc: "Cinematic wireframes and luxury UI design crafted for your audience." },
  { num: "03", title: "Development", desc: "Clean, scalable code with GSAP animations and Framer Motion precision." },
  { num: "04", title: "Optimization", desc: "Performance tuning, SEO setup, and cross-device quality assurance." },
  { num: "05", title: "Scale", desc: "Deployment, monitoring, and continuous improvements as you grow." },
];

export const REAL_CONTACT = {
  booking: "Book a 15-min Call",
  projectOptions: ["Starter Website", "Premium Website", "E-Commerce", "Restaurant", "Brand Identity", "Motion Design", "Custom Solution"],
  socials: [
    { name: "Email", value: "hamzachahby30@gmail.com" },
    { name: "Instagram", value: "@hmzdevelop" },
    { name: "GitHub", value: "HMZDevelop1" },
  ],
};

export const REAL_FOOTER = {
  tagline: "Complete digital solutions, without limits.",
  motto: "We Design. We Develop. We Scale.",
  navLinks: [
    { label: "Home", href: "#" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#showcase" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
};

export const NAV_LINKS = ["Home", "Skills", "Projects", "Process", "Contact"];

export const WELCOME_FEATURES = [
  { label: "Modern Web Development", sub: "React, GSAP, Three.js — built for speed" },
  { label: "Luxury UI & Motion Design", sub: "Cinematic interfaces that tell your story" },
  { label: "Full-Stack Solutions", sub: "From frontend to backend, we deliver" },
];
