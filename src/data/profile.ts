// Central content model — sourced from Aldo's CV (authoritative for bio,
// education, experience, skills, honors). Project case studies live in
// src/content/projects/*.mdx and are grounded in the actual repositories.

export const profile = {
  name: 'Muhammad Aldo Fahrezy',
  shortName: 'Aldo Fahrezy',
  roles: 'Data Science · Machine Learning · AI',
  thesis:
    'I turn messy, real-world data into measured results — building end-to-end ML pipelines across computer vision, NLP, and tabular modeling, hardened through 15+ data-science competitions.',
  location: 'Depok, Indonesia',
  email: 'aldofahrezy@gmail.com',
  links: {
    github: 'https://github.com/aldofahrezy',
    linkedin: 'https://www.linkedin.com/in/aldofahrezy',
    scholar: 'https://scholar.google.com/',
  },
};

// The signature "results readout". Values pending verification are noted;
// they are cross-checked against the actual repositories before shipping.
export const heroStats = [
  { value: '3.88', label: 'GPA · Universitas Indonesia' },
  { value: '15+', label: 'ML / DS competitions' },
  { value: 'R² 0.992', label: 'Best-of-9 carbon model' },
  { value: '8.0', label: 'IELTS · C2 English' },
];

export const about = [
  'I’m a Computer Science student at Universitas Indonesia (GPA 3.88), focused on Data Science and Artificial Intelligence. My work spans the full ML lifecycle — from framing a messy problem and cleaning data to benchmarking models, explaining them, and shipping them behind a real interface.',
  'I learn fastest under pressure, which is why I compete: 15+ data-science and ML competitions across computer vision, NLP, and tabular modeling, with wins and finals at the national and international level. Alongside that, I build production systems — from Rust microservices to full-stack, cross-platform apps.',
  'I teach what I learn, too — as a Teaching Assistant I run tutorials for Linear Algebra, Statistics & Probability, and Programming Foundations, grading 200+ students a semester.',
];

export const education = {
  institution: 'Universitas Indonesia',
  location: 'Depok, West Java',
  degree: 'Bachelor of Computing in Computer Science',
  period: 'Aug 2024 — (Expected) Aug 2028',
  gpa: '3.88 / 4.00',
  scholarship: 'Bank Indonesia Scholarship — “Skema Unggulan” (2025–present)',
  coursework: [
    'Statistics & Probability',
    'Linear Algebra',
    'Data Structures & Algorithms',
    'Numerical Analysis',
    'Data Science & AI',
    'Advanced Programming',
    'Databases',
    'Operating Systems',
  ],
};

export const experience = [
  {
    role: 'Data Science & AI Member',
    org: 'RISTEK Fasilkom UI',
    period: 'Mar 2026 — present',
    points: [
      'Compete in DSAI competitions in member-formed teams and internal contests; attend weekly training reinforcing ML/DL skills.',
      'Contribute to DSAI research (currently on Retrieval-Augmented Generation).',
      'Assisted in problem-setting for Datathon 2026.',
    ],
  },
  {
    role: 'Local Committee Vice President — Outgoing Global Volunteer',
    org: 'AIESEC in Universitas Indonesia',
    period: 'Feb 2026 — present',
    points: [
      'Lead a department spanning external relations, marketing, customer experience, and international relations.',
      'Manage end-to-end data tracking for the LEADs pipeline.',
      'Coordinate with international partners on UN SDG-aligned programs, generating revenue through exchange products.',
    ],
  },
  {
    role: 'Teaching Assistant',
    org: 'Faculty of Computer Science, Universitas Indonesia',
    period: 'Aug 2025 — present',
    points: [
      'Deliver tutorials for Linear Algebra, Programming Foundations II (Java), Statistics & Probability, and Introduction to Digital Systems.',
      'Coordinate with 4 lecturers and grade 200+ students per semester.',
    ],
  },
];

export const honors = [
  {
    title: 'Bank Indonesia Scholarship — “Skema Unggulan”',
    org: 'Central Bank of the Republic of Indonesia',
    year: '2025',
    level: 'National',
    note: 'Merit scholarship awardee.',
  },
  {
    title: 'Best Payment Use Case — OpenClaw Agenthon Indonesia',
    org: 'OpenClaw',
    year: '2026',
    level: 'National',
    note: 'WarungFlow — an autonomous multi-agent finance-ops system for Indonesian UMKM.',
  },
  {
    title: '2nd Winner — PKM-PI, Olimpiade Ilmiah Mahasiswa (OIM UI)',
    org: 'BEM Universitas Indonesia',
    year: '2025',
    level: 'University',
    note: 'Full-stack digital ecosystem for AWMI with an NLP chatbot + Human–AI handoff.',
  },
  {
    title: '3rd Winner — Pekan RISTEK Data Science Competition',
    org: 'RISTEK Fasilkom UI',
    year: '2025',
    level: 'University',
    note: 'Seismic S-wave arrival-time prediction on the STEAD dataset.',
  },
  {
    title: 'Finalist — GarudaHacks 6.0 International Hackathon',
    org: 'GarudaHQ',
    year: '2025',
    level: 'International',
    note: 'Batik pattern recognition with a custom CNN + Gemini API.',
  },
  {
    title: '1st Winner — RISE! IT Business Case Competition',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    year: '2024',
    level: 'National',
    note: 'Industry-4.0 solution (ERP + IoT + AI) for PT INALUM.',
  },
];

export const skillGroups = [
  {
    label: 'Machine Learning & Data Science',
    items: ['Tabular / Structured Data', 'Computer Vision', 'NLP', 'Feature Engineering', 'EDA', 'XAI / SHAP', 'Ensemble Methods', 'Time-Series', 'Model Calibration'],
  },
  {
    label: 'ML Libraries & Frameworks',
    items: ['scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'TensorFlow', 'PyTorch', 'MediaPipe', 'spaCy', 'NLTK', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    label: 'Languages & Engineering',
    items: ['Python', 'Java (Spring Boot)', 'Rust', 'SQL', 'JavaScript / TypeScript', 'REST API Design', 'Docker', 'Git / GitHub', 'Linux CLI'],
  },
  {
    label: 'Web & Full-Stack',
    items: ['Next.js', 'React', 'Django', 'Node.js', 'Flutter', 'WebSockets', 'PostgreSQL', 'MongoDB', 'Prisma ORM'],
  },
];

export const languages = [
  { name: 'Bahasa Indonesia', level: 'Native' },
  { name: 'English', level: 'C2 · IELTS 8.0' },
  { name: 'French', level: 'A2' },
];

export const certifications = [
  'Java Associate (Microsoft)',
  'Intro to Machine Learning (Kaggle)',
  'Deep Learning (Kaggle)',
  'Adobe Certified Professional — Visual Design',
];

// Broader competition participation, shown as a compact list (not full case studies).
export const competitions = [
  { name: 'Data Slayer 3.0', note: 'Video drowsiness detection — MediaPipe FaceMesh features + gradient boosting.' },
  { name: 'Objective Quest 2025', note: 'Sentence-duration regression over 23k Indonesian court decisions (NLP).' },
  { name: 'GEMASTIK 2025 · Data Mining', note: 'Cross-lingual retrieval with neural MT + anagram fingerprinting.' },
  { name: 'Datavers Anava', note: '5-class ride-hailing trip-risk classification with physics-based features.' },
  { name: 'MineToday · IT Today 2025', note: 'Student-outcome prediction from multi-source academic data.' },
  { name: 'Gammafest IPB 2025', note: 'Scientific-paper citation link prediction.' },
];
