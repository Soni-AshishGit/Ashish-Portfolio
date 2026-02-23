import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, X, Instagram } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { GalaxyBackground } from './components/GalaxyBackground'
import { GlassCard } from './components/GlassCard'
import { BuyMeTea } from './components/BuyMeTea'
import { fetchCv } from './api'

type CvData = {
  name: string
  title: string
  summary: string
  experience: Array<{
    company: string
    role: string
    period: string
    description: string
    technologies: string[]
  }>
  projects: Array<{
    name: string
    description: string
    status: string
    liveUrl: string
    technologies: string[]
  }>
  education: Array<{
    degree: string
    description: string
    period: string
  }>
  awards: Array<{
    title: string
    description: string
    issuer: string
  }>
  certifications: Array<{
    title: string
    description: string
  }>
  hobbies: Array<{
    title: string
    description: string
  }>
}

const cvFallback: CvData = {
  name: 'Ashish Kumar',
  title: 'Cross-Platform .NET Developer (MVC · MAUI · Blazor · MVVM)',
  summary:
    'Results-driven Cross-Platform .NET Developer with hands-on experience in building web and mobile applications using .NET MAUI, Blazor, and C#. Skilled in MVVM architecture, RESTful API integration, and database-driven systems. Passionate about writing clean, scalable code and delivering high-quality user experiences across platforms. Proven ability to lead teams, mentor peers, and optimize application performance.',
  experience: [
    {
      company: 'Winlancer Technologies Pvt Ltd | Indore (M.P.)',
      role: 'Dotnet Developer',
      period: 'Feb 2025 - Present',
      description:
        'Delivered scalable web and cross-platform applications using C# and .NET MAUI/Blazor. Collaborated in Agile teams, implemented RESTful APIs, integrated third-party services, and optimised application performance to improve user experience.',
      technologies: ['C#', '.NET MAUI', 'Blazor', 'ASP.NET Core', 'REST APIs', 'SQL Server'],
    },
    {
      company: 'TagX Data Solutions | Indore',
      role: 'Data Annotation Specialist & Data Analyst',
      period: 'Aug 2023 - Dec 2025',
      description:
        'Managed large-scale annotation projects with 99%+ accuracy for ML datasets. Coordinated with data scientists and ML engineers for dataset optimisation, led a team of annotators, and performed training and quality checks.',
      technologies: ['Data Annotation', 'ML Datasets', 'Quality Control'],
    },
    {
      company: 'Bharat Intern | Remote',
      role: 'Web Developer Intern',
      period: 'Mar 2023 - June 2023',
      description:
        'Built responsive web applications and a personal portfolio using HTML, CSS, and JavaScript. Gained hands-on experience in UI/UX and front-end frameworks while collaborating with senior developers on live projects.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
  projects: [
    {
      name: 'US Parking Auction',
      description: 'Web-based parking auction platform for managing and bidding on US parking slots. (In Progress)',
      status: 'In Progress',
      liveUrl: '#',
      technologies: ['ASP.NET Core', 'Blazor', 'SQL Server'],
    },
    {
      name: 'Instant People',
      description:
        'Integrated app concept combining Dating, Job Posting, System Management, and Social Media into a single platform.',
      status: 'Prototype',
      liveUrl: '#',
      technologies: ['.NET', 'Blazor', 'REST APIs'],
    },
    {
      name: 'GalaxyAlive.AI',
      description:
        'AI-powered React + Vite game with civilization-building, role-based gameplay, and real-time galaxy visualisation.',
      status: 'Live',
      liveUrl: '#',
      technologies: ['React', 'Vite', 'Framer Motion', 'AI'],
    },
    {
      name: 'Oil Ticketing',
      description: 'Modern truck tracking and oil ticket management system used for logistics operations.',
      status: 'Live',
      liveUrl: '#',
      technologies: ['ASP.NET Core', 'SQL Server', 'REST APIs'],
    },
    {
      name: 'DeliveryLoop',
      description: 'US grocery delivery application with order tracking, routing, and delivery management.',
      status: 'Live',
      liveUrl: '#',
      technologies: ['.NET', 'Mobile', 'REST APIs'],
    },
    {
      name: 'HopeQure',
      description: 'Web-based Ultra Health Qure System for healthcare management and digital health services.',
      status: 'Live',
      liveUrl: '#',
      technologies: ['ASP.NET Core', 'React', 'SQL Server'],
    },
  ],
  education: [
    {
      degree: 'M.C.A Computer Application',
      description:
        'Vikram University, Ujjain (Madhya Pradesh) – Institute of Science and Technology. Specialisation in Cross-Platform Applications and Software Development. Core Subjects: Software Engineering, Web Technologies, Cloud Fundamentals. GPA: 7.6.',
      period: '2021 – 2023 (Completed)',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      description:
        'Rajeev Gandhi P. G. College, Mandsaur (Madhya Pradesh). Academic Focus: Data Structures, OOP, DBMS, Operating Systems. Practical Exposure: C/C++, SQL-based assignments, logical problem-solving. GPA: 7.0.',
      period: '2019 – 2021 (Completed)',
    },
  ],
  awards: [
    {
      title: 'Most Rapid Career Growth (TagX)',
      description: 'Awarded "Employee of the Year" for exceptional dedication and performance.',
      issuer: 'TagX Data Solutions',
    },
    {
      title: 'Dedicated Team Leader (Winlancer Technologies)',
      description: 'Recognised for leading teams effectively and delivering successful projects.',
      issuer: 'Winlancer Technologies',
    },
  ],
  certifications: [
    {
      title: '.NET MAUI & Blazor Mastery',
      description: 'Advanced online training and projects focused on cross-platform .NET development.',
    },
    {
      title: 'RESTful API Development',
      description: 'Hands-on course building RESTful APIs with C# and .NET.',
    },
    {
      title: 'HackerRank Problem Solving',
      description: 'Certified for algorithm and data structure problem solving challenges.',
    },
    {
      title: 'React + Vite Fundamentals',
      description: 'Completed interactive web development projects using React and Vite.',
    },
  ],
  hobbies: [
    {
      title: 'Guitar & Music',
      description: 'Playing and composing music.',
    },
    {
      title: 'Gaming & AI Projects',
      description: 'Exploring AI-powered games and simulations.',
    },
    {
      title: 'Writing & Blogging',
      description: 'Writing tech blogs and content about coding and software.',
    },
  ],
}

const typingText = 'Cross-Platform .NET Developer (MVC · MAUI · Blazor · MVVM)'

export function App() {
  const [cv, setCv] = useState<CvData>(cvFallback)
  const [typed, setTyped] = useState('')
  const [activeProject, setActiveProject] = useState<CvData['projects'][number] | null>(null)
  const { scrollYProgress } = useScroll()
  const scrollBar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  })

  useEffect(() => {
    fetchCv()
      .then((data) => setCv(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTyped(typingText.slice(0, index))
      index += 1
      if (index > typingText.length) {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const preventDefault = (event: Event) => {
      event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (event.ctrlKey || event.metaKey) {
        if (['c', 'x', 's', 'p', 'u'].includes(key)) {
          event.preventDefault()
        }

        if (event.shiftKey && ['i', 'j', 'k'].includes(key)) {
          event.preventDefault()
        }
      }

      if (event.key === 'F12') {
        event.preventDefault()
      }
    }

    document.addEventListener('copy', preventDefault)
    document.addEventListener('cut', preventDefault)
    document.addEventListener('paste', preventDefault)
    document.addEventListener('contextmenu', preventDefault)
    document.addEventListener('selectstart', preventDefault)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('copy', preventDefault)
      document.removeEventListener('cut', preventDefault)
      document.removeEventListener('paste', preventDefault)
      document.removeEventListener('contextmenu', preventDefault)
      document.removeEventListener('selectstart', preventDefault)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <GalaxyBackground>
      <motion.div
        className="fixed left-0 right-0 top-0 z-40 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 origin-left"
        style={{ scaleX: scrollBar }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-12 pt-6 text-slate-100 md:px-6 lg:px-8">
        <header className="sticky top-4 z-30 mb-8">
          <GlassCard className="flex items-center justify-between px-4 py-3">
            <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
              Ashish Kumar
            </span>
            <nav className="hidden gap-6 text-sm text-slate-200/80 md:flex">
              <a href="#experience" className="hover:text-white">
                Experience
              </a>
              <a href="#projects" className="hover:text-white">
                Projects
              </a>
              <a href="#education" className="hover:text-white">
                Education
              </a>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-3 md:hidden">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md"
                aria-label="Open navigation menu"
              >
                <span className="block h-[2px] w-4 rounded bg-slate-100" />
              </button>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://github.com/Soni-AshishGit"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-400/10"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashish-kumar-aa8a22183"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-400/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:soniashishkumar164@gmail.com"
                aria-label="Mail"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-300/60 hover:bg-blue-300/10"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </GlassCard>
        </header>

        <main className="flex flex-1 flex-col gap-10 md:gap-16">
          <section
            id="hero"
            className="grid gap-8 md:grid-cols-[minmax(0,3fr),minmax(0,2fr)] md:items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-6"
            >
              <GlassCard className="inline-flex items-center gap-2 border-blue-400/30 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-500/10 px-3 py-1 text-xs font-medium text-blue-100">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <span>Available for cross-platform .NET projects</span>
              </GlassCard>
              <div className="space-y-3">
                <h1 className="text-balance bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                  Ashish Kumar
                </h1>
                <p className="text-md text-slate-200/80 sm:text-lg">
                  {typed}
                  <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-blue-300 align-middle" />
                </p>
              </div>
              <p className="max-w-xl text-sm text-slate-200/70 sm:text-base">
                {cv.summary}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(37,99,235,0.45)] transition hover:brightness-110">
                  Download CV
                </button>
                <div className="flex gap-2 md:hidden">
                  <a
                    href="https://github.com/Soni-AshishGit"
                    aria-label="GitHub"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-400/10"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashish-kumar-aa8a22183"
                    aria-label="LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-400/10"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:soniashishkumar164@gmail.com"
                    aria-label="Mail"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-300/60 hover:bg-blue-300/10"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-4">
                <div className="flex w-full items-center justify-between px-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-slate-300/70">
                      Hologram
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-50">
                      Ashish Kumar
                    </p>
                  </div>
                  <div className="rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-medium text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.7)]">
                    Online
                  </div>
                </div>
                <div className="relative aspect-[4/5] w-full">
                  <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_0_0,rgba(8,47,73,0.85),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(30,64,175,0.9),transparent_60%)] opacity-80 blur-3xl" />
                  <motion.div
                    className="relative h-full w-full overflow-hidden rounded-tl-[3rem] rounded-tr-[1.25rem] rounded-br-[3rem] rounded-bl-[1.5rem]"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  >
                    <img
                      src="/ashish-hologram.png"
                      alt="Ashish Kumar portrait"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-tl-[3rem] rounded-tr-[1.25rem] rounded-br-[3rem] rounded-bl-[1.5rem] bg-[linear-gradient(to_bottom,rgba(15,23,42,0.32),transparent_25%,transparent_70%,rgba(15,23,42,0.9)),repeating-linear-gradient(to_bottom,rgba(148,163,184,0.18)_0,rgba(148,163,184,0.18)_1px,transparent_1px,transparent_3px)] mix-blend-soft-light" />
                    <motion.div
                      className="pointer-events-none absolute inset-x-[-20%] h-20 bg-gradient-to-b from-cyan-300/0 via-cyan-300/24 to-cyan-300/0"
                      initial={{ y: '-130%' }}
                      animate={{ y: '140%' }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 2,
                      }}
                    />
                  </motion.div>
                </div>
                <div className="mt-1 grid w-full grid-cols-3 gap-2 text-[10px] text-slate-100/85">
                  <div className="rounded-xl bg-slate-950/60 px-2 py-1.5 backdrop-blur">
                    .NET
                    <span className="mt-0.5 block text-[9px] text-emerald-300/80">
                      Cross-platform
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-950/60 px-2 py-1.5 backdrop-blur">
                    Cloud
                    <span className="mt-0.5 block text-[9px] text-sky-300/80">
                      Ready
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-950/60 px-2 py-1.5 backdrop-blur">
                    UI/UX
                    <span className="mt-0.5 block text-[9px] text-fuchsia-300/80">
                      Motion-first
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="experience" className="space-y-4">
            <motion.h2
              className="text-lg font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Experience
            </motion.h2>
            <div className="space-y-5 border-l border-slate-500/40 pl-4 sm:pl-6">
              {cv.experience.map((item, index) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="relative pl-4"
                >
                  <div className="absolute -left-[9px] top-2 flex size-3 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-950">
                    <span className="size-1.5 rounded-full bg-cyan-300" />
                  </div>
                  <GlassCard className="border-white/15 bg-slate-950/40 px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-50">
                          {item.role}
                        </p>
                        <p className="text-xs text-slate-300/75">
                          {item.company}
                        </p>
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                        {item.period}
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/80 sm:text-[13px]">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-900/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200/80 backdrop-blur"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="space-y-4">
            <motion.h2
              className="text-lg font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Projects
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              {cv.projects.map((project, index) => (
                <motion.button
                  key={project.name}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="group h-full text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <GlassCard className="flex h-full flex-col border-white/15 bg-slate-950/40 p-4 transition group-hover:-translate-y-1.5 group-hover:border-cyan-400/40 group-hover:bg-slate-900/40">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-50">
                        {project.name}
                      </h3>
                      <span className="rounded-full bg-blue-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/80">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-900/60 px-2 py-1 text-[10px] text-slate-200/85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center text-[11px] font-medium text-blue-300 opacity-0 transition group-hover:opacity-100">
                      View details
                      <span className="ml-1 inline-block h-[1px] w-4 bg-blue-300" />
                    </span>
                  </GlassCard>
                </motion.button>
              ))}
            </div>
          </section>

          <section id="education" className="space-y-4">
            <div className="grid gap-5 items-start md:grid-cols-2 lg:gap-6">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold tracking-tight text-slate-50">
                  Education
                </h2>
                <div className="space-y-3">
                  {cv.education.map((item) => (
                    <GlassCard
                      key={item.degree}
                      className="w-full border-white/15 bg-slate-950/40 px-4 py-3 text-xs"
                    >
                      <p className="font-semibold text-slate-50">{item.degree}</p>
                      <p className="mt-0.5 text-[11px] text-slate-300/80">
                        {item.description}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {item.period}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
              <motion.div
                id="awards"
                className="space-y-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <h2 className="text-lg font-semibold tracking-tight text-slate-50">
                  Awards
                </h2>
                <div className="space-y-3">
                  {cv.awards.map((award) => (
                    <GlassCard
                      key={award.title}
                      className="w-full border-amber-300/40 bg-slate-950/50 px-4 py-3 text-xs"
                    >
                      <p className="font-semibold text-amber-200">
                        {award.title}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-200/85">
                        {award.description}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {award.issuer}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section id="certifications" className="space-y-4">
            <motion.h2
              className="text-lg font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Certifications & Trainings
            </motion.h2>
            <div className="grid gap-3 md:grid-cols-2">
              {(cv.certifications ?? []).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <GlassCard className="border-white/15 bg-slate-950/40 px-4 py-3 text-xs">
                    <p className="font-semibold text-slate-50">{item.title}</p>
                    <p className="mt-1 text-[11px] text-slate-300/85">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="interests" className="space-y-4">
            <motion.h2
              className="text-lg font-semibold tracking-tight text-slate-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Hobbies & Interests
            </motion.h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(cv.hobbies ?? []).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <GlassCard className="h-full border-white/15 bg-slate-950/40 px-4 py-3 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-50">{item.title}</p>
                      {item.title === 'Guitar & Music' && (
                        <a
                          href="https://www.instagram.com/ashish_carvaan?igsh=MTdrYWgxdG14MTlwcA=="
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open Instagram profile"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-pink-400/60 bg-pink-500/10 text-pink-300 transition hover:bg-pink-500/20"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300/80">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer
          id="contact"
          className="mt-10 border-t border-white/5 pt-6 text-xs text-slate-400"
        >
          <GlassCard className="flex flex-col items-center justify-between gap-3 bg-slate-950/40 px-4 py-3 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] text-slate-300/80">
              Indore · +91 88-****-6218 · soniashishkumar164@gmail.com
            </p>
            <p className="text-[11px] text-slate-400">
              Cross-Platform .NET Developer · ashish-kumar-aa8a22183 · @soniashish11
            </p>
          </GlassCard>
        </footer>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/90 p-5 shadow-glass"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-fuchsia-400/60 hover:bg-fuchsia-400/10"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-3 flex items-center justify-between gap-3 pr-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Featured Project
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-slate-50">
                    {activeProject.name}
                  </h3>
                </div>
                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                  {activeProject.status}
                </span>
              </div>
              <p className="text-xs text-slate-200/80">
                {activeProject.description}
              </p>
              <div className="mt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-4 py-2 text-[11px] font-semibold text-slate-950 shadow-[0_18px_40px_rgba(37,99,235,0.5)] transition hover:brightness-110"
                >
                  Open live project
                </a>
                <p className="text-[11px] text-slate-400">
                  Press outside the card to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <BuyMeTea />
    </GalaxyBackground>
  )
}
