'use client'

import Image from 'next/image'
import Lenis from 'lenis'
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  FileDown,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  ShieldCheck,
  X,
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { type CSSProperties, type RefObject, useEffect, useRef, useState } from 'react'

type Project = {
  name: string
  kicker: string
  statement: string
  summary: string
  image: string
  mobileImage: string
  live: string
  github: string
  accent: string
  surface: string
  stack: string[]
  proof: string[]
  architecture: string[]
}

type Moment = { src: string; title: string; note: string }
type Career = {
  org: string
  shortOrg: string
  period: string
  role: string
  logo: string
  website: string
  accent: string
  copy: string
  proof: string[]
  stack: string[]
  signal: string
  signalLabel: string
}
type FieldItem =
  | { kind: 'image'; src: string; title: string; note: string }
  | { kind: 'video'; src: string; poster: string; title: string; note: string }

const builderMoment: Moment = {
  src: '/assets/archive/saurav_dp.avif',
  title: 'The builder',
  note: 'S Mukherjee — AI engineer, product thinker, community builder.',
}

const projects: Project[] = [
  {
    name: 'OpsWeave',
    kicker: '01 / Governed agents',
    statement: 'Agents can improvise. Operations cannot.',
    summary: 'A production-minded workspace that turns messy multimodal evidence into versioned, inspectable workflows with evaluation and human approval built in.',
    image: '/assets/projects/opsweave.webp',
    mobileImage: '/assets/projects/opsweave-mobile-dark-v2.png',
    live: 'https://opsweave.sauravmukherjee.in/',
    github: 'https://github.com/SauravMukherjee44/OpsWeave',
    accent: '#c8ff5a',
    surface: '#171814',
    stack: ['Next.js', 'FastAPI', 'AWS', 'Terraform'],
    proof: ['Typed workflow contracts', 'Evaluation gates', 'Traceable execution'],
    architecture: ['Evidence intake', 'Agentic compiler', 'Workflow DSL', 'Evaluation gates', 'Human approval', 'Governed runtime'],
  },
  {
    name: 'VerdaTrace',
    kicker: '02 / Environmental intelligence',
    statement: 'A source of truth should show its working.',
    summary: 'An evidence-first workspace that converts approvals, amendments, maps, and field records into current obligations and inspection-ready action.',
    image: '/assets/projects/verdatrace.webp',
    mobileImage: '/assets/projects/verdatrace-mobile.jpg',
    live: 'https://verdatrace.com/',
    github: 'https://github.com/SauravMukherjee44/VerdaTrace',
    accent: '#acffe9',
    surface: '#09473f',
    stack: ['TypeScript', 'MapLibre', 'Document AI', 'Next.js'],
    proof: ['Clause-level citations', 'Amendment graph', 'Spatial validation'],
    architecture: ['Source records', 'Clause extraction', 'Amendment graph', 'Spatial evidence', 'Human review'],
  },
  {
    name: 'HealthAI Agent Lab',
    kicker: '03 / Safety-first research',
    statement: 'Different risks deserve different model boundaries.',
    summary: 'An open-weight health-screening research system combining specialist ML, local voice inference, typed tools, and deterministic safety precedence.',
    image: '/assets/projects/healthai.webp',
    mobileImage: '/assets/projects/healthai-mobile.jpg',
    live: 'http://healthai.sauravmukherjee.in/',
    github: 'https://github.com/SauravMukherjee44/HealthAI-Agent-Lab',
    accent: '#ffcf9d',
    surface: '#5b2848',
    stack: ['Python', 'FastAPI', 'Open models', 'AWS SAM'],
    proof: ['Open-weight boundary', 'Emergency precedence', 'Versioned models'],
    architecture: ['Voice or text', 'Intent router', 'Specialist models', 'Safety policy', 'Research result'],
  },
]

const moments: Moment[] = [
  { src: '/assets/archive/0D29C238-8746-4EBC-AFEB-9ABF9C48C8A3.avif', title: 'EY.ai', note: 'Where enterprise AI becomes an operating system, not a slide.' },
  { src: '/assets/archive/0ae157cc-2472-42be-907d-59a4b6ea1ff3.avif', title: 'Between sessions', note: 'The quieter part of building: noticing, sketching, reframing.' },
  { src: '/assets/archive/16EC0B24-08DE-4A03-B467-BAE05552C492.avif', title: 'On the floor', note: 'Learning from products in their natural habitat.' },
  { src: '/assets/archive/17292D22-19CA-4C35-9C51-400A60BCA9CC.avif', title: 'Field note', note: 'A corridor, a conversation, a new direction.' },
  { src: '/assets/archive/2E308E6F-7F6D-4FA8-AB32-1A4B84949244.webp', title: 'Inside Google', note: 'A room designed around curiosity.' },
  { src: '/assets/archive/393D1250-438F-435B-B633-C8B9AF6C8576.avif', title: 'The AI Foundry', note: 'Seeing ambitious prototypes meet practical constraints.' },
  { src: '/assets/archive/3C335EF9-19BE-4DBE-8BB3-EF9840EF219F.webp', title: 'India AI Impact Summit', note: 'A global room, an unmistakably Indian moment.' },
  { src: '/assets/archive/97C9B74E-458D-45BF-AC51-E2BAD6E1B236.avif', title: 'AWS × AI Impact Summit', note: 'Cloud infrastructure meeting India’s AI ambition.' },
  { src: '/assets/archive/4EF7FEF3-98F3-4EF9-BEF7-935AD9AD93F7.avif', title: 'Builder energy', note: 'Close enough to the work to ask better questions.' },
  { src: '/assets/archive/80C70690-D29F-47BD-B5A4-3783245208A4.avif', title: 'Google for Developers', note: 'Community, craft, and the giant G.' },
  { src: '/assets/archive/IMG_3330-portrait-v2.avif', title: 'AI compute, up close', note: 'IBM accelerators and processors—the physical layer beneath intelligent products.' },
  { src: '/assets/archive/A7C72A44-4E0E-47BD-9115-85BBB86699AB.avif', title: 'NVIDIA', note: 'The infrastructure underneath the intelligence.' },
  { src: '/assets/archive/AFECA23E-CED1-47AB-9C10-6BDAA764E3C4.avif', title: 'In transit', note: 'Collecting patterns between one room and the next.' },
  { src: '/assets/archive/C590933F-F55E-4E32-9174-C4349821A7CD.avif', title: 'Prototype / India 2026', note: 'The interface is where the idea starts answering back.' },
  { src: '/assets/archive/E1C9B38C-4012-4722-AC43-66C4DD10EC93.avif', title: 'Adobe', note: 'Creativity and computation sharing the same floor.' },
  { src: '/assets/archive/F72F3379-4834-4962-A413-712D15AA910E.avif', title: 'Human × machine', note: 'The future is more interesting when it is tangible.' },
  { src: '/assets/archive/IMG_3368.avif', title: 'Interactive intelligence', note: 'Understanding a system by touching its edges.' },
  { src: '/assets/archive/IMG_3423.avif', title: 'Meeting the hardware', note: 'Software feels different when it can look back.' },
  { src: '/assets/archive/IMG_3462.avif', title: 'Inside the installation', note: 'Interfaces that invite movement, not instructions.' },
  { src: '/assets/archive/IMG_3524.avif', title: 'Break barriers', note: 'Technology becomes culture when people can enter it.' },
  { src: '/assets/archive/IMG_3591.avif', title: 'Meta / New Delhi', note: 'The people behind the platforms.' },
  { src: '/assets/archive/IMG_3592.avif', title: 'Meta / another frame', note: 'Same room, different signal.' },
  { src: '/assets/archive/IMG_3625.avif', title: 'AI Impact Summit 2026', note: 'A checkpoint for where the ecosystem is heading.' },
  { src: '/assets/archive/IMG_4769.avif', title: 'Explaining the build', note: 'Clarity is part of the engineering.' },
  { src: '/assets/archive/IMG_4824.avif', title: 'From screen to room', note: 'A product story should survive outside the laptop.' },
  { src: '/assets/archive/IMG_5012.webp', title: 'The build table', note: 'Coffee, code, and the stubborn middle of the problem.' },
  { src: '/assets/archive/cc6e76af-9f07-49db-9733-5d3992015365.avif', title: 'Community on stage', note: 'Knowledge compounds when the room participates.' },
]

const reels: FieldItem[] = [
  { kind: 'image', src: '/assets/archive/IMG_4824.avif', title: 'From screen to room', note: 'A product story should survive outside the laptop.' },
  { kind: 'video', src: '/assets/reels/IMG_3409.mp4', poster: moments[21].src, title: 'Walking the ecosystem', note: 'A moving field note from the summit.' },
  { kind: 'video', src: '/assets/reels/IMG_3466.mp4', poster: moments[8].src, title: 'Portraits of progress', note: 'A playful interface for a serious ambition.' },
  { kind: 'video', src: '/assets/reels/IMG_3480.mp4', poster: moments[4].src, title: 'Supporting India’s AI ambition', note: 'Storytelling at the scale of a room.' },
  { kind: 'video', src: '/assets/reels/IMG_3541.mp4', poster: moments[15].src, title: 'The system answers back', note: 'A focused excerpt from an interactive AI installation.' },
  { kind: 'video', src: '/assets/reels/IMG_3567.mp4', poster: moments[6].src, title: 'Across ecosystems', note: 'A conversation from the India AI Impact Summit floor.' },
  { kind: 'video', src: '/assets/reels/IMG_3595.mp4', poster: moments[17].src, title: 'Inside the circle', note: 'An interface discovered through motion.' },
]

const career: Career[] = [
  {
    org: 'EY (Ernst & Young)', shortOrg: 'EY', period: 'Sep 2024 — now', role: 'AI Engineer',
    logo: '/assets/brands/ey.svg', website: 'https://www.ey.com/', accent: '#c7ff47',
    copy: 'I turn ambiguous enterprise requirements into governed AI systems that are secure enough to operate, observable enough to trust, and practical enough to ship.',
    proof: [
      'Architected a role-aware multimodal knowledge retrieval agent on Azure AI Foundry, Azure OpenAI, and Azure AI Search.',
      'Built hybrid retrieval with Dataverse and Cosmos DB, adding access controls, provenance, freshness, and audit-ready observability.',
      'Delivered multi-agent test generation plus governance and FinOps signals across FastAPI, Azure Functions, Power Platform, and .NET.',
    ],
    stack: ['Azure AI Foundry', 'Semantic Kernel', 'MCP', 'FastAPI', 'Cosmos DB'], signal: 'PROD', signalLabel: 'governed AI delivery',
  },
  {
    org: 'Mercor', shortOrg: 'Mercor', period: '2024 · contract', role: 'AI Agent Trainer — Cloud Tool Use',
    logo: '/assets/brands/mercor.svg', website: 'https://www.mercor.com/', accent: '#8c8fff',
    copy: 'A focused contract improving how AI agents reason through real cloud consoles and complete long-horizon infrastructure work with human-like precision.',
    proof: [
      'Created and evaluated end-to-end agentic tasks spanning AWS and Google Cloud services.',
      'Trained tool-use behavior around navigation, state inspection, multi-step execution, and recovery from incorrect actions.',
      'Applied quality rubrics to make cloud-task completion more reliable, reproducible, and aligned with human workflows.',
    ],
    stack: ['AWS', 'Google Cloud', 'Tool use', 'Agent evaluation', 'Human feedback'], signal: 'CLOUD', signalLabel: 'agent behaviour',
  },
  {
    org: 'SMIIT LTD', shortOrg: 'SMIIT', period: 'Dec 2023 — Jul 2024', role: 'Software Development Engineer Intern',
    logo: '/assets/brands/smiit.svg', website: 'https://smiit.co.uk/', accent: '#3aa9e8',
    copy: 'I worked at the intersection of applied ML and cybersecurity, turning high-volume telemetry into prioritized risk signals for faster enterprise triage.',
    proof: [
      'Engineered ML-driven threat-detection pipelines for streaming security telemetry and real-time analysis.',
      'Built scalable feature-engineering, preprocessing, and model-inference workflows for high-volume security logs.',
      'Iterated on detection quality to reduce false positives while improving performance, testing, and alert actionability.',
    ],
    stack: ['Python', 'Machine learning', 'Threat detection', 'Streaming data', 'Model inference'], signal: 'REAL TIME', signalLabel: 'security intelligence',
  },
  {
    org: 'CodeIN Community', shortOrg: 'CodeIN', period: '2021 — 2024', role: 'Founder & Community Builder',
    logo: '/assets/brands/codein.png', website: 'https://codeincommunity.com/', accent: '#ffc900',
    copy: 'I built an open learning community where developers could move from consuming tutorials to shipping, collaborating, and making their first open-source contribution.',
    proof: [
      'Grew a community of 15,000+ coding enthusiasts around open source, emerging technology, and peer mentorship.',
      'Designed beginner-friendly contribution programs, hackathons, roadmaps, workshops, and community-led technical events.',
      'Built the operating system behind the community: mentors, event teams, contributor pathways, partnerships, and public resources.',
    ],
    stack: ['Open source', 'Community systems', 'Mentorship', 'Hackathons', 'Developer education'], signal: '15K+', signalLabel: 'developers reached',
  },
  {
    org: 'ConnectBud', shortOrg: 'ConnectBud', period: 'Jul 2022 — Jan 2024', role: '1:1 Live Coding Tutor',
    logo: '/assets/brands/connectbud.png', website: 'https://www.connectbud.com/', accent: '#56c24b',
    copy: 'I made technical ideas tangible for young learners through live, individualized sessions—adapting the interface, pace, and explanation to each student.',
    proof: [
      'Delivered 100+ live one-to-one coding classes across web development, app development, machine learning, and programming languages.',
      'Turned complex concepts into small visual builds, guided exercises, and feedback loops that students could own.',
      'Practiced the communication discipline I now bring to product design: explain clearly, observe friction, and iterate in real time.',
    ],
    stack: ['Web development', 'App development', 'Machine learning', 'Live teaching', 'Curriculum'], signal: '100+', signalLabel: 'live classes',
  },
]

type Skill = { name: string; logo?: string; mark?: string; usedAt: string; proof: string }
type SkillGroup = { name: string; code: string; skills: Skill[] }
const devicon = (slug: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`
const skillGroups: SkillGroup[] = [
  { name: 'Agentic AI & LLM systems', code: '01 / REASON', skills: [
    { name: 'Agentic RAG', mark: 'RAG', usedAt: 'EY · OpsWeave', proof: 'Grounded enterprise answers and compiled multimodal evidence into reviewable workflows.' },
    { name: 'Multi-agent orchestration', mark: 'MA', usedAt: 'EY', proof: 'Built coordinated agents that transform requirements into grounded, review-ready test cases.' },
    { name: 'Tool calling', mark: 'TC', usedAt: 'Mercor · HealthAI', proof: 'Evaluated cloud-console tool use and built typed specialist tools with deterministic boundaries.' },
    { name: 'LangGraph', mark: 'LG', usedAt: 'Applied AI toolkit', proof: 'Used graph-based patterns for explicit agent state, routing, and controlled execution.' },
    { name: 'MCP', mark: 'MCP', usedAt: 'EY', proof: 'Connected agent capabilities through explicit tool contracts in enterprise AI systems.' },
    { name: 'Semantic Kernel', mark: 'SK', usedAt: 'EY', proof: 'Orchestrated Azure-based agent workflows with governed plugins and enterprise integrations.' },
    { name: 'Vector databases', mark: 'VDB', usedAt: 'EY', proof: 'Designed hybrid retrieval across Azure AI Search, Dataverse, and Cosmos DB.' },
    { name: 'Prompt engineering', mark: 'PE', usedAt: 'EY · AI projects', proof: 'Designed constrained prompts around provenance, safety, evaluation, and structured output.' },
    { name: 'Fine-tuning', mark: 'FT', usedAt: 'Applied AI toolkit', proof: 'Part of the model-adaptation workflow documented in the current résumé.' },
    { name: 'Evaluations', mark: 'EVAL', usedAt: 'EY · Mercor', proof: 'Built quality gates and rubrics for agent behavior, retrieval freshness, and task completion.' },
    { name: 'Guardrails', mark: 'SAFE', usedAt: 'EY · HealthAI', proof: 'Implemented role boundaries, deterministic precedence, escalation, and responsible-AI controls.' },
  ]},
  { name: 'AI / ML', code: '02 / LEARN', skills: [
    { name: 'Azure AI Foundry', logo: '/assets/brands/azure.svg', usedAt: 'EY', proof: 'Deployed a governed multimodal knowledge retrieval agent on Azure AI Foundry.' },
    { name: 'Azure OpenAI', logo: '/assets/brands/azure.svg', usedAt: 'EY', proof: 'Powered enterprise retrieval and agent experiences with approved-source grounding.' },
    { name: 'Amazon Bedrock', logo: '/assets/brands/aws.svg', usedAt: 'OpsWeave', proof: 'Used managed foundation models inside an AWS-native workflow compiler.' },
    { name: 'Hugging Face', logo: '/assets/brands/huggingface.svg', usedAt: 'HealthAI Agent Lab', proof: 'Worked with open-weight language and voice models in a safety-first research system.' },
    { name: 'Transformers', logo: '/assets/brands/huggingface.svg', usedAt: 'HealthAI Agent Lab', proof: 'Applied transformer models within local and open-model inference workflows.' },
    { name: 'PyTorch', logo: devicon('pytorch'), usedAt: 'HealthAI · ML work', proof: 'Model experimentation and inference across applied AI prototypes.' },
    { name: 'ONNX', mark: 'ONNX', usedAt: 'HealthAI Agent Lab', proof: 'Versioned specialist models for portable, controlled inference.' },
    { name: 'Scikit-learn', logo: devicon('scikitlearn'), usedAt: 'SMIIT · HealthAI', proof: 'Built preprocessing, feature engineering, and classical model pipelines.' },
    { name: 'Feature engineering', mark: 'FX', usedAt: 'SMIIT', proof: 'Transformed high-volume security logs into actionable threat-detection signals.' },
    { name: 'Model evaluation', mark: 'QA', usedAt: 'SMIIT · EY', proof: 'Improved detection quality, reduced false positives, and tested model behavior.' },
    { name: 'Pandas', logo: devicon('pandas'), usedAt: 'SMIIT · ML projects', proof: 'Prepared and analyzed structured telemetry and model datasets.' },
    { name: 'NumPy', logo: devicon('numpy'), usedAt: 'SMIIT · ML projects', proof: 'Numerical foundations for preprocessing and inference workflows.' },
  ]},
  { name: 'Platform, cloud & backend', code: '03 / OPERATE', skills: [
    { name: 'System design', mark: 'SYS', usedAt: 'EY · OpsWeave · VerdaTrace', proof: 'Designed production systems around reliability, traceability, access, and failure states.' },
    { name: 'FastAPI', mark: 'FA', usedAt: 'EY · OpsWeave · HealthAI', proof: 'Shipped typed Python APIs for agentic and ML-backed products.' },
    { name: 'REST APIs', mark: 'API', usedAt: 'EY · Product work', proof: 'Built and integrated service contracts across enterprise and public products.' },
    { name: 'Node.js', logo: devicon('nodejs'), usedAt: 'VerdaTrace · Web platforms', proof: 'Backend services and tooling for TypeScript-based product systems.' },
    { name: '.NET', logo: devicon('dot-net'), usedAt: 'EY', proof: 'Delivered secure enterprise integrations alongside Azure Functions and Power Platform.' },
    { name: 'Microsoft Azure', logo: '/assets/brands/azure.svg', usedAt: 'EY', proof: 'Production AI delivery with managed identity, Key Vault, telemetry, and CI/CD.' },
    { name: 'AWS', logo: '/assets/brands/aws.svg', usedAt: 'OpsWeave · HealthAI · Mercor', proof: 'Built serverless products and evaluated agent execution across cloud services.' },
    { name: 'Docker', logo: '/assets/brands/docker.svg', usedAt: 'EY · Product delivery', proof: 'Packaged reproducible services for controlled deployment.' },
    { name: 'Terraform', logo: '/assets/brands/terraform.svg', usedAt: 'OpsWeave', proof: 'Defined reviewable AWS infrastructure and cost-aware deployment changes.' },
    { name: 'Kubernetes', logo: devicon('kubernetes'), usedAt: 'Platform toolkit', proof: 'Container orchestration capability documented in the current résumé.' },
    { name: 'Observability', mark: 'OBS', usedAt: 'EY · OpsWeave', proof: 'Designed telemetry for health, cost, traceability, and production diagnosis.' },
    { name: 'CI/CD', mark: 'CI', usedAt: 'EY · GitHub projects', proof: 'Automated validation and delivery for enterprise and public codebases.' },
  ]},
  { name: 'Frontend, data & tools', code: '04 / SHIP', skills: [
    { name: 'React', logo: '/assets/brands/react.svg', usedAt: 'OpsWeave · VerdaTrace · Community work', proof: 'Built interaction-heavy product surfaces and developer-facing experiences.' },
    { name: 'Next.js', logo: '/assets/brands/next.svg', usedAt: 'OpsWeave · VerdaTrace · Portfolio', proof: 'Delivered full-stack interfaces, public products, and this portfolio.' },
    { name: 'HTML', logo: devicon('html5'), usedAt: 'Web products · ConnectBud', proof: 'Semantic foundations for product interfaces and live coding instruction.' },
    { name: 'CSS', logo: devicon('css3'), usedAt: 'Web products · ConnectBud', proof: 'Responsive interfaces, visual systems, and hands-on developer education.' },
    { name: 'Git', logo: devicon('git'), usedAt: 'All public systems', proof: 'Versioned product delivery with inspectable commits and reviewable change history.' },
    { name: 'GitHub', logo: devicon('github'), usedAt: 'Open source · Product work', proof: 'Public shipping, contribution programs, and a globally trending developer profile.' },
    { name: 'PostgreSQL', logo: devicon('postgresql'), usedAt: 'Product toolkit', proof: 'Relational data modeling capability documented in the current résumé.' },
    { name: 'DynamoDB', logo: '/assets/brands/aws.svg', usedAt: 'OpsWeave', proof: 'AWS-native persistence for workflow state and execution records.' },
    { name: 'Azure Cosmos DB', logo: '/assets/brands/azure.svg', usedAt: 'EY', proof: 'Retrieval foundations with synchronization, provenance, and enterprise access controls.' },
  ]},
  { name: 'Languages', code: '05 / EXPRESS', skills: [
    { name: 'Python', logo: '/assets/brands/python.svg', usedAt: 'EY · SMIIT · OpsWeave · HealthAI', proof: 'Primary language for AI agents, ML pipelines, APIs, and evaluation.' },
    { name: 'C++', logo: devicon('cplusplus'), usedAt: 'Engineering foundation', proof: 'Systems-oriented programming foundation documented in the résumé.' },
    { name: 'Java', logo: devicon('java'), usedAt: 'Engineering foundation', proof: 'Object-oriented application development foundation documented in the résumé.' },
    { name: 'JavaScript', logo: devicon('javascript'), usedAt: 'Web products · Community teaching', proof: 'Interactive web development and live coding instruction.' },
    { name: 'TypeScript', logo: '/assets/brands/typescript.svg', usedAt: 'OpsWeave · VerdaTrace · Portfolio', proof: 'Typed frontend and service contracts across production-minded products.' },
    { name: 'C#', logo: devicon('csharp'), usedAt: 'EY · .NET delivery', proof: 'Enterprise application capability alongside the Microsoft cloud stack.' },
  ]},
]
const skillInventory = skillGroups.flatMap(group => group.skills)

const commits = [
  ['OpsWeave', '4858116', 'Keep ECR storage within free tier', 'https://github.com/SauravMukherjee44/OpsWeave/commit/4858116c3b63986d7c2ff57c78859230eed8ae8f'],
  ['OpsWeave', '35ed053', 'Eliminate idle polling and KMS request amplification', 'https://github.com/SauravMukherjee44/OpsWeave/commit/35ed053bf66b489906e0523ef314bf214b4abcc7'],
  ['VerdaTrace', '6455f4a', 'Release VerdaTrace public MVP', 'https://github.com/SauravMukherjee44/VerdaTrace/commit/6455f4a778c18e2ed0eae043c68f189cea8d573b'],
  ['HealthAI', '045e535', 'Expand specialist intent routing', 'https://github.com/SauravMukherjee44/HealthAI-Agent-Lab/commit/045e535c70a94cff90588940d6fa8868ec0c5680'],
]

export default function Home() {
  const [booting, setBooting] = useState(true)
  const [introWord, setIntroWord] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null)
  const [activeCareer, setActiveCareer] = useState(0)
  const [activeSkill, setActiveSkill] = useState('Agentic RAG')
  const reduceMotion = useReducedMotion()
  const deskRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 26, mass: .22 })
  const pointerX = useMotionValue(-400)
  const pointerY = useMotionValue(-400)
  const smoothX = useSpring(pointerX, { stiffness: 100, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 100, damping: 24 })

  useEffect(() => {
    if (reduceMotion) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let frame = 0
    const loop = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(loop) }
    frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [reduceMotion])

  useEffect(() => {
    const words = [window.setTimeout(() => setIntroWord(1), 420), window.setTimeout(() => setIntroWord(2), 840)]
    const done = window.setTimeout(() => setBooting(false), reduceMotion ? 200 : 1550)
    return () => { words.forEach(window.clearTimeout); window.clearTimeout(done) }
  }, [reduceMotion])

  useEffect(() => {
    document.body.style.overflow = booting || menuOpen || selectedProject || selectedMoment ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [booting, menuOpen, selectedProject, selectedMoment])

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setSelectedProject(null); setSelectedMoment(null) }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const selectedSkill = skillInventory.find(skill => skill.name === activeSkill) ?? skillInventory[0]

  return <>
    <AnimatePresence>{booting && <motion.div className="boot" exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .42, ease: [.65, 0, .35, 1] }}>
      <div className="boot-meta"><span>SAURAV / 2026</span><span>BUILDING THE SIGNAL</span></div>
      <div className="boot-shapes"><motion.i animate={{ rotate: 180, x: 18 }} /><motion.i animate={{ rotate: -130, y: -12 }} /><motion.i animate={{ rotate: 90, x: -12 }} /></div>
      <AnimatePresence mode="wait"><motion.strong key={introWord} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        {['Observe.', 'Reason.', 'Ship.'][introWord]}
      </motion.strong></AnimatePresence>
      <div className="boot-line"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.35, ease: 'easeInOut' }} /></div>
    </motion.div>}</AnimatePresence>

    <motion.div className="page-progress" style={{ scaleX: progress }} />
    <main onPointerMove={event => { pointerX.set(event.clientX); pointerY.set(event.clientY) }}>
      <motion.div className="cursor-aura" style={{ x: smoothX, y: smoothY }} />
      <Navigation open={menuOpen} setOpen={setMenuOpen} />

      <section className="desk" id="top">
        <div className="desk-grid" ref={deskRef}>
          <motion.div className="desk-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45, duration: .8 }}>
            <p className="micro"><span /> AI ENGINEER · PRODUCT BUILDER · KOLKATA</p>
            <h1>I make AI<br /><em>behave.</em></h1>
            <div className="desk-intro">
              <p>Saurav Mukherjee builds intelligent products that can explain themselves, survive production, and still feel human.</p>
              <a href="#systems" aria-label="Explore the work"><ArrowDownRight /></a>
            </div>
          </motion.div>

          <motion.div className="sculpture" initial={{ opacity: 0, scale: .82, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1.52, duration: 1, ease: [.2, .8, .2, 1] }}>
            <img src="/assets/system-sculpture.avif" alt="Abstract glass sculpture representing an AI system" fetchPriority="high" draggable={false} />
          </motion.div>

          <DeskNote className="note-role" constraints={deskRef} rotate={-5}><span>currently</span><strong>AI Engineer @ EY</strong><small>enterprise agents / Azure</small></DeskNote>
          <DeskNote className="note-place" constraints={deskRef} rotate={4}><MapPin size={16} /><strong>Kolkata, India</strong></DeskNote>
          <DeskNote className="note-community" constraints={deskRef} rotate={-2}><span>community built</span><strong>10K+ developers</strong></DeskNote>
          <motion.button className="portrait-note" drag={!reduceMotion} dragConstraints={deskRef} dragElastic={.15} whileDrag={{ scale: 1.05, rotate: 0 }} initial={{ opacity: 0, rotate: 7 }} animate={{ opacity: 1, rotate: 5 }} transition={{ delay: 1.85 }} onClick={() => setSelectedMoment(builderMoment)}>
            <span className="portrait-photo"><Image src="/assets/archive/saurav_dp.avif" alt="Saurav Mukherjee" fill priority sizes="220px" /></span>
            <b>builder behind the systems ↗</b>
          </motion.button>
          <div className="drag-hint"><MousePointer2 size={15} /> drag the artifacts</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Organizations and communities">
        <span className="trust-label">A CAREER SHAPED AROUND</span>
        <div className="trust-track">
          <div className="brand-ey"><img src="/assets/brands/ey.svg" alt="EY" /></div>
          <div><img src="/assets/brands/mercor.svg" alt="Mercor" /><span>Mercor</span></div>
          <div><img src="/assets/brands/google-g.svg" alt="Google" /><span>Google</span></div>
          <div><img className="wide-logo" src="/assets/brands/samsung-wordmark.svg" alt="Samsung" /></div>
          <div><img src="/assets/brands/codein.png" alt="CodeIN Community" /><span>CodeIN</span></div>
          <div><img src="/assets/brands/connectbud.png" alt="ConnectBud" /><span>ConnectBud</span></div>
        </div>
      </section>

      <section className="motion-log" id="field-notes">
        <header className="scene-heading inverse">
          <span>01 / FIELD NOTES</span>
          <h2>Signals from where<br /><em>AI takes shape.</em></h2>
          <p>Six high-resolution films and one still from summits, installations, and the conversations around them. Media loads only as it enters view.</p>
        </header>
        <div className="reel-river">
          {reels.map((reel, index) => <motion.figure className={`reel reel-${index + 1}`} key={reel.src} initial={{ opacity: 0, y: 70, rotate: index % 2 ? 3 : -3 }} whileInView={{ opacity: 1, y: 0, rotate: index % 2 ? 1.3 : -1.3 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: (index % 3) * .08 }} whileHover={{ y: -12, rotate: 0 }}>
            {reel.kind === 'video'
              ? <FieldVideo src={reel.src} poster={reel.poster} />
              : <span className="reel-still"><img src={reel.src} alt={reel.title} loading="lazy" /></span>}
            <figcaption><small>0{index + 1}</small><strong>{reel.title}</strong><span>{reel.note}</span></figcaption>
          </motion.figure>)}
        </div>
      </section>

      <section className="systems" id="systems">
        <header className="scene-heading">
          <span>02 / SYSTEMS</span>
          <h2>Ideas engineered into<br /><em>living systems.</em></h2>
          <p>Three products built around the difficult part: evidence, reliability, and what happens after the demo.</p>
        </header>
        <div className="project-stack">
          {projects.map((project, index) => <ProjectWorld key={project.name} project={project} index={index} open={() => setSelectedProject(project)} />)}
        </div>
      </section>

      <section className="archive" id="archive">
        <div className="archive-intro">
          <div className="archive-kicker"><span>03 / VISUAL ARCHIVE</span><i><b /> memory index online</i></div>
          <h2>Proof that life<br />exists <em>off-screen.</em></h2>
          <div className="archive-index"><strong>{moments.length}<small>captured frames</small></strong><div className="archive-signal" aria-hidden="true"><i /><i /><i /><b /></div><p>Every frame in the source archive, re-cut as a lightweight visual journal. Tap a frame to inspect it.</p></div>
        </div>
        <div className="archive-flourish"><span>{moments.length} FRAMES / ONE CONTINUOUS FIELD NOTE</span><i>↯</i><b>tap to inspect</b></div>
        <div className="archive-wall">
          {moments.map((moment, index) => <motion.button className={`moment moment-${index % 7}`} key={moment.src} onClick={() => setSelectedMoment(moment)} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: .5, delay: (index % 5) * .04 }} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
            <span className="moment-image"><span className="moment-blur" style={{ backgroundImage: `url("${moment.src}")` }} aria-hidden="true" /><img src={moment.src} loading="lazy" alt={moment.title} /></span>
            <span className="moment-open" aria-hidden="true"><ArrowUpRight size={15} /></span>
            <span className="moment-caption"><b>{moment.title}</b><i>{String(index + 1).padStart(2, '0')}</i></span>
            <span className="moment-note">{moment.note}</span>
          </motion.button>)}
        </div>
      </section>

      <section className="trajectory" id="trajectory">
        <header className="trajectory-head">
          <span>04 / EXPERIENCE</span>
          <h2>A career built<br /><em>through the work.</em></h2>
          <p>Five chapters across enterprise AI, cloud-agent evaluation, cybersecurity, open source, and developer education—each organized around the work itself.</p>
        </header>
        <div className="career-board">
          <div className="career-nodes">{career.map((item, index) => <button key={item.org} data-org={item.shortOrg.toLowerCase()} className={activeCareer === index ? 'active' : ''} style={{ '--career-accent': item.accent } as CSSProperties} onClick={() => setActiveCareer(index)} aria-pressed={activeCareer === index}>
            <span><img src={item.logo} alt={`${item.org} logo`} /></span><small>{item.period}</small><b>{item.shortOrg}</b>
          </button>)}</div>
          <AnimatePresence mode="wait"><motion.article className="career-card" data-org={career[activeCareer].shortOrg.toLowerCase()} style={{ '--career-accent': career[activeCareer].accent } as CSSProperties} key={activeCareer} initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }} transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}>
            <div className="career-card-top">
              <div><span>CHAPTER {String(activeCareer + 1).padStart(2, '0')} / {career[activeCareer].period}</span><h3>{career[activeCareer].role}</h3><h4>{career[activeCareer].org}</h4></div>
              <a href={career[activeCareer].website} target="_blank" rel="noreferrer" aria-label={`Visit ${career[activeCareer].org}`}><img src={career[activeCareer].logo} alt="" /><ArrowUpRight size={17} /></a>
            </div>
            <p className="career-summary">{career[activeCareer].copy}</p>
            <div className="career-proof">
              {career[activeCareer].proof.map((line, index) => <motion.div key={line} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .08 + index * .07 }}><b>{String(index + 1).padStart(2, '0')}</b><span>{line}</span></motion.div>)}
            </div>
            <div className="career-meta"><div className="career-stack">{career[activeCareer].stack.map(item => <span key={item}>{item}</span>)}</div><div className="career-signal"><strong>{career[activeCareer].signal}</strong><small>{career[activeCareer].signalLabel}</small></div></div>
          </motion.article></AnimatePresence>
          <div className="career-principle">
            <div><span>OPERATING PRINCIPLE</span><strong>Make the complex legible—then make it dependable.</strong></div>
            <div className="career-loop"><span>UNDERSTAND</span><i>→</i><span>BUILD</span><i>→</i><span>EVALUATE</span><i>→</i><span>OPERATE</span></div>
          </div>
        </div>
      </section>

      <section className="playground" id="playground">
        <div className="playground-head"><span>05 / CAPABILITY EVIDENCE</span><h2>Trace the stack.<br /><em>See where it shipped.</em></h2><p>Explore the complete résumé toolkit. Hover, focus, or tap any skill to connect it to real company work and public products.</p></div>
        <div className="skill-workbench">
          <div className="workbench-map">
            <span className="workbench-label">SELECT A SIGNAL</span>
            {skillGroups.map((group, index) => <button key={group.name} onClick={() => setActiveSkill(group.skills[0].name)} className={group.skills.some(skill => skill.name === activeSkill) ? 'active' : ''}>
              <small>{group.code}</small><strong>{group.name}</strong><i>{String(group.skills.length).padStart(2, '0')}</i>
            </button>)}
          </div>
          <AnimatePresence mode="wait"><motion.article className="skill-evidence" key={selectedSkill.name} initial={{ opacity: 0, y: 16, filter: 'blur(7px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: .28 }}>
            <div className="evidence-orbit" aria-hidden="true"><i /><i /><i /></div>
            <span>ACTIVE SKILL / VERIFIED CONTEXT</span>
            <div className="evidence-title"><SkillIdentity skill={selectedSkill} /><h3>{selectedSkill.name}</h3></div>
            <p>{selectedSkill.proof}</p>
            <div className="evidence-source"><small>USED IN</small><strong>{selectedSkill.usedAt}</strong></div>
            <div className="skill-terminal" aria-label={`Live evidence trace for ${selectedSkill.name}`}>
              <div><i /><i /><i /><span>capability.trace</span></div>
              <code><b>$</b> portfolio inspect --skill=&quot;{selectedSkill.name.toLowerCase().replaceAll(' ', '-')}&quot;</code>
              <code><em>↳</em> evidence: {selectedSkill.usedAt}</code>
              <code><strong>✓</strong> context linked · proof resolved<span className="terminal-cursor" /></code>
            </div>
            <div className="evidence-path"><i>problem</i><b>→</b><i>{selectedSkill.name.toLowerCase()}</i><b>→</b><i>working system</i></div>
          </motion.article></AnimatePresence>
        </div>
        <div className="skill-inventory">
          {skillGroups.map(group => <section key={group.name} className="skill-group"><header><span>{group.code}</span><h3>{group.name}</h3><i>{group.skills.length} skills</i></header><div>
            {group.skills.map(skill => <button key={skill.name} className={activeSkill === skill.name ? 'active' : ''} onMouseEnter={() => setActiveSkill(skill.name)} onFocus={() => setActiveSkill(skill.name)} onClick={() => setActiveSkill(skill.name)}><SkillIdentity skill={skill} /><span>{skill.name}</span><small>{skill.usedAt}</small></button>)}
          </div></section>)}
        </div>
      </section>

      <section className="proof-strip" id="proof">
        <div className="proof-heading"><span><GitBranch size={15} /> PROOF OF WORK / PUBLIC GIT</span><a href="https://github.com/SauravMukherjee44" target="_blank" rel="noreferrer">complete activity <ArrowUpRight size={15} /></a></div>
        <div className="commit-marquee"><div>{[...commits, ...commits].map((commit, index) => <a href={commit[3]} target="_blank" rel="noreferrer" key={`${commit[1]}-${index}`}><GitBranch className="commit-source" size={18} /><small>GITHUB · {commit[0]} · {commit[1]}</small><strong>{commit[2]}</strong><ArrowUpRight className="commit-arrow" size={16} /></a>)}</div></div>
      </section>

      <footer id="contact">
        <div className="footer-top"><span>06 / CONTACT</span><p>Available for AI engineering, product collaboration, and selected advisory work.</p></div>
        <h2>Let’s build<br /><em>what lasts.</em></h2>
        <div className="footer-link-row">
          <div className="footer-actions"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=sauravmukherjee928%40gmail.com&su=Let%27s%20build%20something%20together&body=Hi%20Saurav%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20project%20or%20collaboration.%0A%0AHere%27s%20a%20little%20context%3A%0A%0A%0ABest%2C" target="_blank" rel="noreferrer"><Mail size={18} /> Start a conversation <ArrowUpRight /></a><a href="/Saurav-Mukherjee-Resume.pdf" target="_blank"><FileDown size={18} /> View résumé</a></div>
          <nav className="footer-socials" aria-label="Professional profiles"><a href="https://github.com/SauravMukherjee44" target="_blank" rel="noreferrer"><span><SocialIcon name="github" />GitHub</span><ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/sauravmukherjee44" target="_blank" rel="noreferrer"><span><SocialIcon name="linkedin" />LinkedIn</span><ArrowUpRight size={15} /></a><a href="https://www.instagram.com/mesouravofficial" target="_blank" rel="noreferrer"><span><SocialIcon name="instagram" />Instagram</span><ArrowUpRight size={15} /></a><a href="https://x.com/mesourav44" target="_blank" rel="noreferrer"><span><SocialIcon name="x" />X / Twitter</span><ArrowUpRight size={15} /></a></nav>
        </div>
        <div className="footer-base"><span>© 2026 Saurav Mukherjee</span><span>Kolkata, India</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </main>

    <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />}</AnimatePresence>
    <AnimatePresence>{selectedMoment && <MomentModal moment={selectedMoment} close={() => setSelectedMoment(null)} />}</AnimatePresence>
  </>
}

function SkillIdentity({ skill }: { skill: Skill }) {
  return <span className="skill-identity">{skill.logo ? <img src={skill.logo} alt="" loading="lazy" /> : <ConceptMark code={skill.mark ?? skill.name.slice(0, 2).toUpperCase()} />}</span>
}

function ConceptMark({ code }: { code: string }) {
  const variant = ['RAG', 'VDB'].includes(code) ? 'retrieval' : ['MA', 'LG', 'MCP', 'SYS'].includes(code) ? 'network' : ['TC', 'PE', 'FA', 'API', 'CI'].includes(code) ? 'command' : ['SAFE', 'QA', 'EVAL', 'OBS'].includes(code) ? 'verify' : 'model'
  return <svg className={`concept-mark concept-${variant}`} viewBox="0 0 48 48" role="img" aria-label={`${code} capability mark`}>
    <rect x="1" y="1" width="46" height="46" rx="13" />
    {variant === 'retrieval' && <><ellipse cx="19" cy="14" rx="9" ry="4" /><path d="M10 14v13c0 2.2 4 4 9 4s9-1.8 9-4V14M10 20c0 2.2 4 4 9 4 2.7 0 5-.5 6.7-1.4" /><path d="m29 29 4 4 7-9" /></>}
    {variant === 'network' && <><path d="M14 15 24 9l10 6v12l-10 6-10-6Z" /><circle cx="24" cy="9" r="3" /><circle cx="14" cy="27" r="3" /><circle cx="34" cy="27" r="3" /><circle cx="24" cy="36" r="3" /></>}
    {variant === 'command' && <><path d="m11 16 8 8-8 8M23 33h14" /><path d="M26 13h11v11" opacity=".45" /></>}
    {variant === 'verify' && <><path d="M24 8 37 13v10c0 8-5.4 13.2-13 17-7.6-3.8-13-9-13-17V13Z" /><path d="m17 24 5 5 10-11" /></>}
    {variant === 'model' && <><path d="M12 31c5-13 9 4 14-10s7 2 10-5" /><circle cx="12" cy="31" r="3" /><circle cx="26" cy="21" r="3" /><circle cx="36" cy="16" r="3" /></>}
    <text x="24" y="43" textAnchor="middle">{code}</text>
  </svg>
}

function DeskNote({ children, className, constraints, rotate }: { children: React.ReactNode; className: string; constraints: RefObject<HTMLDivElement | null>; rotate: number }) {
  return <motion.div className={`desk-note ${className}`} drag dragConstraints={constraints} dragMomentum={false} dragElastic={.12} whileDrag={{ scale: 1.05, rotate: 0, zIndex: 9 }} initial={{ opacity: 0, rotate: rotate * 2 }} animate={{ opacity: 1, rotate }} transition={{ delay: 1.75 }}>{children}</motion.div>
}

function FieldVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined)
      else video.pause()
    }, { threshold: .18, rootMargin: '140px 0px' })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [reduceMotion])

  return <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" />
}

function Navigation({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const links = [['Field notes', '#field-notes'], ['Systems', '#systems'], ['Archive', '#archive'], ['Trajectory', '#trajectory'], ['Playground', '#playground']]
  return <>
    <nav className="nav"><a className="brand" href="#top" aria-label="Saurav.dev — back to top"><span className="brand-mark"><i>&lt;</i><b>/</b><i>&gt;</i></span><span className="brand-name">Saurav<em>.dev</em></span></a><div className="nav-links">{links.map(([name, href]) => <a href={href} key={name}>{name}</a>)}</div><a className="nav-contact" href="#contact">Let’s build <ArrowUpRight size={15} /></a><button className="nav-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button></nav>
    <AnimatePresence>{open && <motion.div className="menu-overlay" initial={{ clipPath: 'circle(0% at 95% 5%)' }} animate={{ clipPath: 'circle(150% at 95% 5%)' }} exit={{ clipPath: 'circle(0% at 95% 5%)' }} transition={{ duration: .65, ease: [.8, 0, .2, 1] }}>
      <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button><span>NAVIGATE / V2</span>{links.map(([name, href], index) => <a href={href} key={name} onClick={() => setOpen(false)}><small>0{index + 1}</small>{name}<ArrowUpRight /></a>)}<a className="menu-mail" href="mailto:sauravmukherjee928@gmail.com">sauravmukherjee928@gmail.com</a>
    </motion.div>}</AnimatePresence>
  </>
}

function ProjectWorld({ project, index, open }: { project: Project; index: number; open: () => void }) {
  const style = { '--accent': project.accent, '--surface': project.surface, '--index': index } as CSSProperties
  return <article className="project-world" style={style}>
    <div className="project-copy"><span>{project.kicker}</span><h3>{project.name}</h3><strong>{project.statement}</strong><p>{project.summary}</p><div className="project-tags">{project.stack.map(tag => <i key={tag}>{tag}</i>)}</div><button onClick={open}>Open the system <ArrowUpRight /></button></div>
    <div className="product-window"><div className="window-bar"><span><i /><i /><i /></span><small>{project.live.replace(/^https?:\/\//, '')}</small><ExternalLink size={14} /></div><div className="window-image"><Image src={project.image} fill loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} sizes="(max-width: 900px) 92vw, 54vw" alt={`${project.name} product interface`} /></div><div className="window-proof">{project.proof.map(item => <span key={item}>✓ {item}</span>)}</div></div>
    <span className="project-ghost">0{index + 1}</span>
  </article>
}

function SocialIcon({ name }: { name: 'github' | 'linkedin' | 'instagram' | 'x' }) {
  if (name === 'github') return <i className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.78 1.07.78 2.16v3.2c0 .31.21.68.79.56A11.5 11.5 0 0 0 12 .7Z" /></svg></i>
  if (name === 'linkedin') return <i className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5.32 7.43a2.07 2.07 0 1 0 0-4.14 2.07 2.07 0 0 0 0 4.14ZM3.54 20.45H7.1V9H3.54v11.45ZM9.34 20.45h3.56v-5.67c0-1.49.29-2.94 2.14-2.94 1.82 0 1.85 1.71 1.85 3.04v5.57h3.56v-6.28c0-3.09-.67-5.46-4.27-5.46-1.73 0-2.89.95-3.37 1.85h-.05V9H9.34v11.45Z" /></svg></i>
  if (name === 'instagram') return <i className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg></i>
  return <i className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.84L7.08 4.13H5.12l11.96 15.64Z" /></svg></i>
}

function ProjectModal({ project, close }: { project: Project; close: () => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close} role="dialog" aria-modal="true" aria-label={`${project.name} case study`}><motion.article className="project-modal" initial={{ y: 48, scale: .94 }} animate={{ y: 0, scale: 1 }} exit={{ y: 42, scale: .96, opacity: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 230 }} onMouseDown={event => event.stopPropagation()} style={{ '--accent': project.accent, '--surface': project.surface } as CSSProperties}>
    <button className="modal-close" onClick={close} aria-label="Close project details"><X size={18} /><span>Close</span></button>
    <div className="modal-visual">
      <span className="modal-capture-label"><i /> Live mobile capture</span>
      <div className="modal-phone"><span className="phone-speaker" /><div className="phone-screen"><Image src={project.mobileImage} fill loading="eager" sizes="(max-width: 760px) 210px, 290px" alt={`${project.name} mobile landing page`} /></div><span className="phone-home" /></div>
      <div className="modal-orbit" aria-hidden="true"><i /><i /><i /></div>
      <small>{project.live.replace(/^https?:\/\//, '')}</small>
    </div>
    <div className="modal-content">
      <span className="modal-kicker">{project.kicker}</span><h2>{project.name}</h2><p className="modal-lead">{project.statement}</p>
      <p className="modal-summary">{project.summary}</p>
      <div className="modal-proof">{project.proof.map(item => <span key={item}><ShieldCheck size={15} />{item}</span>)}</div>
      <div className="modal-columns"><div><small>STACK</small><div className="modal-stack">{project.stack.map(item => <i key={item}>{item}</i>)}</div></div><div><small>ARCHITECTURE</small><ol>{project.architecture.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}</li>)}</ol></div></div>
      <div className="modal-actions"><a href={project.live} target="_blank" rel="noreferrer">Visit live product <ArrowUpRight size={17} /></a><a href={project.github} target="_blank" rel="noreferrer"><GitBranch size={17} /> View on GitHub</a></div>
    </div>
  </motion.article></motion.div>
}

function MomentModal({ moment, close }: { moment: Moment; close: () => void }) {
  return <motion.div className="modal-backdrop moment-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close} role="dialog" aria-modal="true" aria-label={moment.title}><motion.div className="moment-modal" initial={{ scale: .85, rotate: -3 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: .88, opacity: 0 }} onMouseDown={event => event.stopPropagation()}>
    <button onClick={close} aria-label="Close image"><X /></button><div><Image src={moment.src} fill sizes="90vw" alt={moment.title} /></div><figcaption><small>FROM THE FIELD</small><strong>{moment.title}</strong><p>{moment.note}</p></figcaption>
  </motion.div></motion.div>
}
