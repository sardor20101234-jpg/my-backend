import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Users,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle,
  Shield,
  Lightbulb,
  Globe,
  PlayCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

// framer-motion is optional. If you don't have it installed, use a lightweight no-op fallback
// that provides `motion.div` without throwing module-not-found errors or passing
// animation-specific props to the DOM (avoids React warnings).
const motion = {
  div: ({ children, initial, animate, transition, whileHover, whileInView, viewport, ...rest }) =>
    React.createElement('div', rest, children),
};

/*
  EduVerse — A responsive, animated education website in a single React file.
  - Built with React Router for multi-page navigation
  - Tailwind CSS utility classes for styling
  - Framer Motion for animations (scroll + hover)
  - Lucide icons for visuals

  Pages:
   • Home (long, scrollable landing)
   • Courses (age-based, filterable)
   • About (mission, values, team)
   • Contact (working form UI + details)
   • Sign Up (CTA destination)
   • 404 Fallback

  Notes:
   - Buttons/links navigate between pages via <Link/ NavLink>.
   - Smooth scroll for in-page anchors on Home.
   - Replace email/phone/address with your real info.
*/

// ---------- Shared UI ----------
const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Robust Button component that avoids passing `to` to native DOM elements accidentally.
const Button = ({ as: As, to = "#", onClick, children, variant = "primary", size = "md", className = "", icon: Icon }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-transform active:scale-[0.98]";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-6 py-3 text-lg",
  };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30",
    secondary: "bg-white text-indigo-700 ring-1 ring-indigo-200 hover:ring-indigo-400",
    ghost: "bg-transparent text-indigo-700 hover:bg-indigo-50",
    dark: "bg-zinc-900 text-white hover:bg-zinc-800",
  };
  const classes = `${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`;
  const content = (
    <>
      <span className="flex items-center gap-2">{children}{Icon ? <Icon className="h-5 w-5" /> : null}</span>
    </>
  );

  // Explicit native button
  if (As === "button") {
    return (
      <button onClick={onClick} className={classes} type="button">
        {content}
      </button>
    );
  }

  // Default to react-router Link if no `as` provided
  const Component = As || Link;

  // If Component is the router Link or NavLink, pass `to`
  if (Component === Link || Component === NavLink) {
    return (
      <Component to={to} onClick={onClick} className={classes}>
        {content}
      </Component>
    );
  }

  // If Component is a string (native element like 'a' or 'div'), avoid passing `to` as a DOM prop
  if (typeof Component === "string") {
    const props = { onClick, className: classes };
    if (Component === "a") props.href = to;
    return React.createElement(Component, props, content);
  }

  // Otherwise assume it's a custom React component (accepts `to`), pass props through
  return (
    <Component to={to} onClick={onClick} className={classes}>
      {content}
    </Component>
  );
};

const SectionTitle = ({ eyebrow, title, subtitle, center }) => (
  <div className={`mb-10 ${center ? "text-center" : ""}`}>
    {eyebrow && (
      <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </div>
    )}
    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-zinc-600 sm:text-lg">{subtitle}</p>}
  </div>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:shadow-lg ${className}`}>{children}</div>
);

// ---------- Layout: Header & Footer ----------
const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  const navLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${isActive ? "text-indigo-600" : "text-zinc-700 hover:text-indigo-600"}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <p className="text-base font-extrabold tracking-tight text-zinc-900">EduVerse</p>
            <p className="text-xs font-medium text-zinc-500 -mt-0.5">Learn • Grow • Succeed</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLink("/", "Home")}
          {navLink("/courses", "Courses")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
        </nav>

        <div className="hidden md:flex">
          <Button to="/signup" variant="primary" size="md" icon={ArrowRight}>Join Now</Button>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-xl p-2 hover:bg-zinc-100 md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </Container>

      {open && (
        <div className="border-t border-zinc-100 bg-white md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            <Link to="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">Home</Link>
            <Link to="/courses" className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">Courses</Link>
            <Link to="/about" className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">About</Link>
            <Link to="/contact" className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">Contact</Link>
            <Button to="/signup" variant="primary" className="mt-1" icon={ArrowRight}>Join Now</Button>
          </Container>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-zinc-100 bg-white">
    <Container className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-extrabold tracking-tight text-zinc-900">EduVerse</p>
            <p className="text-xs text-zinc-500">Learn • Grow • Succeed</p>
          </div>
        </div>
        <p className="mt-4 max-w-xs text-sm text-zinc-600">
          Empowering learners of every age with engaging, high‑quality courses and real‑world skills.
        </p>
        <div className="mt-4 flex gap-3">
          <a className="rounded-xl p-2 hover:bg-zinc-100" href="#" aria-label="Twitter"><Twitter className="h-5 w-5"/></a>
          <a className="rounded-xl p-2 hover:bg-zinc-100" href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5"/></a>
          <a className="rounded-xl p-2 hover:bg-zinc-100" href="#" aria-label="GitHub"><Github className="h-5 w-5"/></a>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900">Quick Links</h4>
        <ul className="mt-3 space-y-2 text-sm text-zinc-600">
          <li><Link className="hover:text-indigo-600" to="/">Home</Link></li>
          <li><Link className="hover:text-indigo-600" to="/courses">Courses</Link></li>
          <li><Link className="hover:text-indigo-600" to="/about">About</Link></li>
          <li><Link className="hover:text-indigo-600" to="/contact">Contact</Link></li>
          <li><Link className="hover:text-indigo-600" to="/signup">Sign Up</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900">Contact</h4>
        <ul className="mt-3 space-y-2 text-sm text-zinc-600">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@eduverse.org</li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> +1 (555) 555‑1234</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 123 Learning Ave, Innovation City</li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900">Newsletter</h4>
        <p className="mt-3 text-sm text-zinc-600">Get new courses, freebies and tips.</p>
        <form className="mt-3 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
          <input type="email" required placeholder="you@example.com" className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
          <Button as="button" variant="dark">Subscribe</Button>
        </form>
      </div>
    </Container>
    <div className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-500">© {new Date().getFullYear()} EduVerse. All rights reserved.</div>
  </footer>
);

// ---------- Home Page ----------
const Home = () => {
  const navigate = useNavigate();
  const features = [
    { icon: BookOpen, title: "Age‑Smart Curriculum", desc: "Content tailored for 4–7, 8–12, 13–17, and 18+." },
    { icon: Shield, title: "Safe & Secure", desc: "Privacy‑first design, kid‑friendly spaces." },
    { icon: Lightbulb, title: "Project‑based", desc: "Build real projects that showcase your skills." },
    { icon: Globe, title: "Anytime, Anywhere", desc: "Responsive design works great on all devices." },
  ];

  return (
    <main className="bg-gradient-to-b from-white via-indigo-50/40 to-white">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 inset-x-0 h-[500px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,0.25),rgba(255,255,255,0))]"></div>
        <Container className="grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
              <Sparkles className="h-3.5 w-3.5"/> New: Interactive quizzes now live!
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
              Learn without limits.
              <span className="block bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">For every age.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-600">
              Master fundamentals, explore STEM, and gain career skills with courses crafted for your stage. Join thousands leveling up with EduVerse.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/signup" variant="primary" size="lg" icon={ArrowRight}>Start Learning</Button>
              <Button as="button" variant="secondary" size="lg" onClick={()=>navigate("/courses")}>Browse Courses</Button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
              <Star className="h-4 w-4"/> 4.9/5 average rating • 120k+ learners
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.7, delay:0.1}} className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl">
              <div className="absolute inset-0 grid grid-cols-3 gap-3 p-3">
                {[...Array(9)].map((_,i)=> (
                  <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.05*i}} className="rounded-2xl bg-gradient-to-br from-indigo-50 to-fuchsia-50 ring-1 ring-inset ring-indigo-100"/>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <Card className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="h-8 w-8 text-indigo-600"/>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Try a 3‑minute demo lesson</p>
                      <p className="text-xs text-zinc-500">No sign‑up required</p>
                    </div>
                  </div>
                  <Button to="/courses" variant="primary" size="sm">Watch</Button>
                </Card>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Age-based preview */}
      <section id="ages" className="py-16">
        <Container>
          <SectionTitle eyebrow="Age-Based Learning" title="Courses for every learner" subtitle="From playful phonics to professional portfolios, choose your track." center/>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {range: "Ages 4–7", color: "from-amber-100 to-orange-50", topics: "Early learning, games", to: "/courses?age=4-7"},
              {range: "Ages 8–12", color: "from-sky-100 to-cyan-50", topics: "Math • Science • Reading", to: "/courses?age=8-12"},
              {range: "Ages 13–17", color: "from-violet-100 to-fuchsia-50", topics: "STEM • Coding • Arts", to: "/courses?age=13-17"},
              {range: "Ages 18+", color: "from-emerald-100 to-teal-50", topics: "Career • Uni prep", to: "/courses?age=18+"},
            ].map((a) => (
              <motion.div key={a.range} whileHover={{y:-4}} transition={{type:"spring", stiffness:300, damping:20}}>
                <Link to={a.to} className={`block rounded-3xl border border-zinc-100 bg-gradient-to-br ${a.color} p-6 shadow-sm hover:shadow-md`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{a.range}</p>
                      <p className="mt-1 text-sm text-zinc-600">{a.topics}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 ring-1 ring-inset ring-indigo-100">
                      <Users className="h-6 w-6"/>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-16">
        <Container>
          <SectionTitle eyebrow="Why Choose Us" title="Learning that sticks" subtitle="We mix pedagogy with play and purposeful practice." center/>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.06*i}}>
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">{f.title}</p>
                        <p className="mt-1 text-sm text-zinc-600">{f.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <Container>
          <SectionTitle eyebrow="Success Stories" title="What learners say" center/>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Alex (14)", "Priya (University)", "Sam (Parent)"].map((name, i) => (
              <motion.div key={name} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.08*i}}>
                <Card>
                  <div className="flex items-center gap-2 text-yellow-500">
                    {Array.from({length:5}).map((_,j)=>(<Star key={j} className="h-4 w-4"/>))}
                  </div>
                  <p className="mt-3 text-sm text-zinc-600">
                    “I built my first app, aced my exam, and actually enjoyed studying. EduVerse makes learning fun and practical.”
                  </p>
                  <p className="mt-3 text-sm font-semibold text-zinc-900">{name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-10 text-white">
            <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl"/>
            <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-white/10 blur-2xl"/>
            <div className="relative">
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to level up?</h3>
              <p className="mt-2 max-w-2xl text-white/90">Join free, explore a demo, and unlock premium when you’re ready. Cancel anytime.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/signup" variant="secondary" size="lg" icon={ArrowRight}>Create your account</Button>
                <Button to="/courses" variant="ghost" size="lg">See all courses</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

// ---------- Courses Page ----------
const ageGroups = [
  { key: "4-7", label: "Ages 4–7" },
  { key: "8-12", label: "Ages 8–12" },
  { key: "13-17", label: "Ages 13–17" },
  { key: "18+", label: "Ages 18+" },
];

const allCourses = [
  { id: 1, title: "Phonics Fun", age: "4-7", level: "Beginner", icon: BookOpen },
  { id: 2, title: "Math Adventures", age: "8-12", level: "Beginner", icon: BookOpen },
  { id: 3, title: "Intro to Coding with Scratch", age: "8-12", level: "Beginner", icon: BookOpen },
  { id: 4, title: "Algebra Boost", age: "13-17", level: "Intermediate", icon: BookOpen },
  { id: 5, title: "Physics Lab", age: "13-17", level: "Intermediate", icon: BookOpen },
  { id: 6, title: "Web Dev Foundations", age: "13-17", level: "Beginner", icon: BookOpen },
  { id: 7, title: "Data Literacy", age: "18+", level: "Beginner", icon: BookOpen },
  { id: 8, title: "Career Portfolio", age: "18+", level: "Advanced", icon: BookOpen },
];

const Courses = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const defaultAge = params.get("age") || "8-12";
  const [age, setAge] = useState(defaultAge);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => allCourses.filter(c => (age === "all" || c.age === age) && c.title.toLowerCase().includes(query.toLowerCase())), [age, query]);

  return (
    <main>
      <section className="border-b border-zinc-100 bg-gradient-to-b from-white via-indigo-50/40 to-white">
        <Container className="py-12">
          <SectionTitle eyebrow="Course Catalog" title="Explore our courses" subtitle="Filter by age group and search your interests."/>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <Button as="button" variant={age === "all" ? "primary" : "secondary"} onClick={()=>setAge("all")}>All</Button>
              {ageGroups.map(g => (
                <Button key={g.key} as="button" variant={age === g.key ? "primary" : "secondary"} onClick={()=>setAge(g.key)}>{g.label}</Button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses..." className="w-56 rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
              <span className="text-sm text-zinc-500">{filtered.length} found</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(c => {
              const Icon = c.icon;
              return (
                <motion.div key={c.id} whileHover={{y:-4}}>
                  <Card>
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-zinc-900">{c.title}</p>
                        <p className="mt-1 text-sm text-zinc-600">{ageGroups.find(g=>g.key===c.age)?.label} • {c.level}</p>
                        <ul className="mt-3 space-y-1 text-sm text-zinc-600">
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500"/> Hands‑on projects</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500"/> Downloadable resources</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-500"/> Certificate of completion</li>
                        </ul>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm font-semibold text-indigo-700">Free • 6–10 hrs</div>
                          <Button to="/signup" variant="primary" size="sm">Enroll</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
};

// ---------- About Page ----------
const About = () => (
  <main>
    <section className="border-b border-zinc-100 bg-gradient-to-b from-white via-indigo-50/40 to-white">
      <Container className="py-12">
        <SectionTitle eyebrow="Our Mission" title="We make world‑class learning accessible" subtitle="Founded by educators and engineers, EduVerse blends pedagogy with technology to help learners thrive."/>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Research‑backed methods","Inclusive by design","Outcome‑focused"].map((t,i)=> (
            <Card key={t}>
              <p className="text-base font-semibold text-zinc-900">{t}</p>
              <p className="mt-2 text-sm text-zinc-600">We rely on evidence‑based practices and iterate with real learner feedback.</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>

    <section className="py-12">
      <Container>
        <SectionTitle eyebrow="Team" title="Humans behind EduVerse" subtitle="A small team with a big heart."/>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100"/>
                <div>
                  <p className="font-semibold text-zinc-900">Team Member {i}</p>
                  <p className="text-sm text-zinc-600">Educator & Researcher</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  </main>
);

// ---------- Contact Page ----------
const Contact = () => (
  <main>
    <section className="border-b border-zinc-100 bg-gradient-to-b from-white via-indigo-50/40 to-white">
      <Container className="py-12">
        <SectionTitle eyebrow="Get in touch" title="We’d love to hear from you" subtitle="Questions, partnerships, or media? Drop us a line."/>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Card>
            <form onSubmit={(e)=>e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-zinc-700">First name</label>
                  <input required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-700">Last name</label>
                  <input required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Email</label>
                <input type="email" required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Message</label>
                <textarea rows={5} required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>
              <Button as="button" variant="primary" icon={ArrowRight} onClick={(e)=>e.preventDefault()}>Send message</Button>
            </form>
          </Card>

          <div className="space-y-4">
            <Card>
              <p className="text-sm text-zinc-600">Prefer email or phone? Reach us directly.</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@eduverse.org</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> +1 (555) 555‑1234</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 123 Learning Ave, Innovation City</li>
              </ul>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-zinc-900">Office Hours</p>
              <p className="mt-1 text-sm text-zinc-600">Mon–Fri • 9:00–17:00</p>
              <p className="mt-1 text-xs text-zinc-500">Response within 1–2 business days.</p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  </main>
);

// ---------- Sign Up Page ----------
const SignUp = () => (
  <main>
    <section className="border-b border-zinc-100 bg-gradient-to-b from-white via-indigo-50/40 to-white">
      <Container className="py-12">
        <SectionTitle eyebrow="Join EduVerse" title="Create your free account" subtitle="No credit card required. Upgrade anytime."/>
        <Card>
          <form onSubmit={(e)=>e.preventDefault()} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-700">Full name</label>
              <input required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <input type="email" required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-700">Password</label>
              <input type="password" required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-700">Confirm password</label>
              <input type="password" required className="mt-1 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="tos" required className="h-4 w-4"/>
              <label htmlFor="tos" className="text-sm text-zinc-600">I agree to the Terms and Privacy Policy.</label>
            </div>
            <div className="sm:col-span-2">
              <Button as="button" variant="primary" size="lg" icon={ArrowRight} onClick={(e)=>e.preventDefault()}>Create Account</Button>
            </div>
          </form>
        </Card>
      </Container>
    </section>
  </main>
);

// ---------- 404 ----------
const NotFound = () => (
  <main className="flex min-h-[60vh] items-center justify-center">
    <div className="text-center">
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">Page not found</h1>
      <p className="mt-2 text-zinc-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-6">
        <Button to="/" variant="primary">Back to Home</Button>
      </div>
    </div>
  </main>
);

// ---------- App Shell ----------
export default function App() {
  useEffect(() => {
    // Ensure smooth scrolling for in-page anchors
    const style = document.createElement("style");
    style.innerHTML = `html{scroll-behavior:smooth}`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-zinc-800">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

