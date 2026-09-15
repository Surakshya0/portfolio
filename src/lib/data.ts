/**
 * Central content source for the portfolio.
 * Edit this file to personalize the site — every section reads from here.
 */

export const profile = {
  name: "Surakshya Bhusal",
  firstName: "Surakshya",
  roles: ["Full Stack Developer", "MERN & PERN Stack"],
  role: "Full Stack Developer",
  tagline:
    "I build complete web applications — responsive React interfaces backed by secure Node.js APIs and well-designed databases.",
  // Shown in the hero "Available for hire" card.
  hire: {
    status: "Available now",
    workModes: "Full-time · Remote or onsite",
    timeZone: "Asia/Kathmandu",
    timeZoneLabel: "Kathmandu time",
    responseTime: "Usually replies within 24 hours",
  },
  location: "Kathmandu, Nepal",
  email: "surimwm@gmail.com",
  phone: "+977 9849729050",
  // Add your photo to /public (e.g. /profile.jpg) and set the path here.
  avatar: "/profile.jpg",
  // Add your CV to /public (e.g. /cv.pdf) and update this path.
  resumeUrl: "/cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Surakshya0" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/surakshya-bhusal-408771371/" },
    { label: "Instagram", href: "https://www.instagram.com/suriimwm/" },
  ],
};

export const about = {
  heading: "Full stack developer who builds from database to interface.",
  paragraphs: [
    "I'm Surakshya Bhusal, a full stack developer based in Kathmandu, Nepal. I've completed my Bachelor in Computer Applications (BCA) at National School of Computer Studies and am awaiting my final results.",
    "I build web applications end to end — PostgreSQL schemas, secure REST APIs with Node.js and Express, and responsive React interfaces. A background in UI/UX design means I think about the people using the product before I write the first line of code.",
    "During my internship at Asterdio Inc., I worked on a production task management system in an Agile team. I'm now looking for a full-time Full Stack or Frontend Developer role — remote or onsite — where I can ship real features and keep growing as an engineer.",
  ],
  stats: [
    { value: "BCA", label: "Completed" },
    { value: "4+", label: "Projects built" },
    { value: "6", label: "Certifications" },
    { value: "2025", label: "Internship" },
  ],
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  period: string;
  note?: string;
};

export const education: Education[] = [
  {
    degree: "Bachelor in Computer Applications (BCA)",
    school: "National School of Computer Studies",
    location: "Paknajol, Kathmandu",
    period: "2021 – 2026",
    note: "Completed · Awaiting final results",
  },
  {
    degree: "+2 Business Management",
    school: "National Institution of Science and Technology",
    location: "Lainchaur, Kathmandu",
    period: "2018 – 2020",
  },
];

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Stacks",
    items: [
      "MERN (MongoDB, Express, React, Node.js)",
      "PERN (PostgreSQL, Express, React, Node.js)",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "React Router",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
      "Responsive Design",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "MVC Architecture",
      "PHP",
      "Python (Django)",
      "Java",
    ],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Prisma ORM", "Drizzle ORM"],
  },
  {
    category: "AI / ML",
    items: [
      "Naive Bayes Classification",
      "Weighted Ranking Algorithms",
      "Model Evaluation",
      "Python",
    ],
  },
  {
    category: "UI / UX",
    items: [
      "Wireframing",
      "User Interface Design",
      "User Experience Design",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "VS Code", "Android Studio", "NetBeans"],
  },
  {
    category: "Testing",
    items: ["Playwright", "API Testing", "Manual Testing"],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Development Intern",
    company: "Asterdio Inc.",
    location: "Hybrid",
    period: "Jul 2025 – Sep 2025",
    description:
      "Contributed to a production task management system within an Agile team, working across the full PERN stack — from database schema to responsive React interfaces. I later reworked the project independently into Taskly.",
    highlights: [
      "Built a full-stack task management system using the PERN stack (PostgreSQL, Express, React, Node.js)",
      "Implemented secure authentication with JWT and role-based authorization",
      "Designed and developed REST APIs following a clean, modular architecture",
      "Crafted responsive React interfaces with attention to usability and detail",
      "Modeled and managed the PostgreSQL database schema",
      "Worked in an Agile workflow with Git version control and peer code reviews",
      "Rebuilt the project on my own afterwards as Taskly — moving to React 19 + Vite and Prisma, with a six-stage Kanban workflow and a full activity audit trail",
    ],
  },
];

/** Websites showcase — the "shipped product" view of my web builds. */
export type WebProject = {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  /** Screenshots shown in the click-to-open slider. First item is the cover. */
  gallery?: { src: string; caption: string }[];
  links: { live?: string; github?: string };
};

export const webProjects: WebProject[] = [
  {
    title: "Medimatch",
    description:
      "A full-stack TypeScript healthcare platform (React + Express) that connects patients with the right providers through a three-stage clinical decision pipeline: a Bernoulli Naïve Bayes classifier (97.6% accuracy across 41 diseases) predicts likely conditions, maps them to specialties, then a six-factor weighted algorithm ranks doctors by symptom match, expertise, experience, rating, location, and availability. Includes patient, doctor, and admin roles, appointment scheduling with conflict detection, telemedicine, secure digital health records, and medication reminders — backed by PostgreSQL with Drizzle ORM and covered by 40 automated tests.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM"],
    image: "/medimatch/01-home.png",
    gallery: [
      { src: "/medimatch/01-home.png", caption: "Landing — AI-powered symptom checker" },
      { src: "/medimatch/02-signup.png", caption: "Create account (patient / doctor)" },
      { src: "/medimatch/03-login.png", caption: "Secure sign in" },
      { src: "/medimatch/04-symptom-checker.png", caption: "Smart symptom checker" },
      { src: "/medimatch/05-ai-prediction.png", caption: "AI prediction & recommended doctors" },
      { src: "/medimatch/06-book-appointment.png", caption: "Book an appointment" },
      { src: "/medimatch/07-patient-dashboard.png", caption: "Patient dashboard" },
      { src: "/medimatch/08-doctor-dashboard.png", caption: "Doctor dashboard" },
      { src: "/medimatch/09-admin-panel.png", caption: "Admin panel" },
    ],
    links: { github: "https://github.com/Surakshya0/medimatchh" },
  },
  {
    title: "Taskly",
    description:
      "A full-stack Kanban board for team task management — my independent rework of the task management system I built during my internship at Asterdio. Tasks move through a six-stage workflow — To Do → In Progress → Code Review → QA To Do → QA Accepted → Done — with role-based permissions for Admins and Members, assignment and priority tracking, and filtering by status, assignee, priority, and due date. Every action is recorded in a complete audit trail. Rebuilt with a React 19 + Vite + TypeScript client and an Express 5 API, backed by PostgreSQL with Prisma, JWT authentication, and Zod-validated requests.",
    tech: ["React 19", "TypeScript", "Express", "PostgreSQL", "Prisma"],
    image: "/taskly/03-board.png",
    gallery: [
      { src: "/taskly/01-landing.png", caption: "Landing — how it works, admin & member roles" },
      { src: "/taskly/02-login.png", caption: "Secure sign in" },
      { src: "/taskly/03-board.png", caption: "Member board — the six-stage Kanban workflow" },
      { src: "/taskly/04-create-task.png", caption: "Create a task with priority and due date" },
      { src: "/taskly/05-task-details.png", caption: "Task details — status, priority, assignee" },
      { src: "/taskly/06-edit-task.png", caption: "Edit a task — reassign, reprioritize, move stage" },
      { src: "/taskly/07-admin-board.png", caption: "Admin board — every task across the team" },
      { src: "/taskly/08-members.png", caption: "Member management — roles, search, and access control" },
    ],
    links: { github: "https://github.com/Surakshya0/taskly" },
  },
];

/** UI/UX gallery — placeholder categories until screenshots are added. */
export type UIDesign = {
  title: string;
  description: string;
};

export const uiDesigns: UIDesign[] = [
  { title: "Mobile App Designs", description: "Clean, tactile mobile interfaces with thoughtful flows." },
  { title: "Website Landing Pages", description: "Conversion-focused landing pages with clear hierarchy." },
  { title: "Dashboard Designs", description: "Data-dense dashboards made calm and readable." },
  { title: "E-commerce UI", description: "Shopping experiences that feel effortless and trustworthy." },
  { title: "Admin Panels", description: "Powerful admin tooling with an intuitive layout." },
  { title: "Figma Designs", description: "Component-driven design systems built in Figma." },
];

export const certifications: { title: string; subtitle: string }[] = [
  { title: "QA", subtitle: "Quality Assurance & Testing" },
  { title: "Python", subtitle: "Programming Fundamentals" },
  { title: "WordPress", subtitle: "Website Development" },
  { title: "Java", subtitle: "Object-Oriented Programming" },
  { title: "Scripting Language", subtitle: "Automation & Scripting" },
  { title: "C Programming", subtitle: "Core Programming" },
];

export const process: { step: string; description: string }[] = [
  { step: "Research", description: "Understand the problem, users, and requirements." },
  { step: "Wireframe", description: "Map structure and flow before visuals." },
  { step: "UI Design", description: "Craft clean, on-brand, responsive interfaces." },
  { step: "Development", description: "Build robust frontend and backend systems." },
  { step: "Testing", description: "Validate with automated and manual testing." },
  { step: "Deployment", description: "Ship, monitor, and iterate." },
];

export const reasons: { title: string; description: string }[] = [
  { title: "Full Stack Development", description: "Comfortable across frontend, backend, and databases." },
  { title: "Design Sense", description: "I plan the user experience before I build it." },
  { title: "Clean Code", description: "Modular, readable, and maintainable by default." },
  { title: "Responsive Design", description: "Flawless on every screen size." },
  { title: "Problem Solving", description: "I break big problems into shippable steps." },
  { title: "Fast Learner", description: "I pick up new tools and stacks quickly." },
  { title: "Team Collaboration", description: "Agile, Git, and code reviews are second nature." },
  { title: "Attention to Detail", description: "The small things are what make it feel premium." },
];

export const hobbies: { title: string }[] = [
  { title: "Playing Valorant" },
  { title: "Listening to Music" },
  { title: "Watching Series" },
  { title: "Watching Movies" },
  { title: "Foodie / Trying New Food" },
  { title: "UI Designing" },
  { title: "Exploring Design Trends" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
