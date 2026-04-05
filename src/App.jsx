import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── MOBILE SECTION WRAPPER (scroll-based, unchanged) ─── */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-6 py-24"
    >
      <h2 className="text-2xl font-light tracking-wide mb-6">{title}</h2>
      {children}
    </motion.section>
  );
}

/* ─── MOBILE PROJECTS ─── */
function MobileProjects({ projects }) {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
      {projects.map((project, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 w-[72vw] snap-start overflow-hidden"
          onClick={() => setActiveIndex(activeIndex === i ? null : i)}
        >
          <img
            src={project.image}
            className={`w-full h-[90vw] object-cover transition-transform duration-700 ${activeIndex === i ? "scale-105" : "scale-100"}`}
          />
          <div className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[10px] opacity-70">{project.category}</p>
            <p className="text-sm">{project.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── DESKTOP PAGE: HERO ─── */
function DesktopHero({ y }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.img
        src="/main.jpeg"
        style={{ y }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3 }}
        className="absolute bottom-14 left-14 text-white"
      >
        {/* ✏️ EDIT: Studio tagline */}
        <p className="text-xs tracking-[0.35em] mb-3 opacity-80 uppercase">
          Interjero dizaino studija
        </p>
        {/* ✏️ EDIT: Main hero headline */}
        <h1 className="text-5xl font-light tracking-wide leading-tight max-w-xl">
          Ramybė per<br />formą ir šviesą
        </h1>
      </motion.div>
    </div>
  );
}

/* ─── DESKTOP PAGE: ABOUT ─── */
function DesktopAbout() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-10 h-full flex flex-col justify-center"
    >
      <h2 className="text-3xl font-light tracking-wide mb-10">Apie</h2>
      <div className="flex flex-row gap-16">
        <div className="flex-1 text-gray-600 text-base leading-relaxed space-y-4">
          {/* ✏️ EDIT: About paragraph 1 */}
          <p>
            Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo.
            Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.
          </p>
          {/* ✏️ EDIT: About paragraph 2 */}
          <p>
            Dirbame su privačiais klientais Vilniuje ir visame pasaulyje, kurdami
            erdves, kurios yra ne tik gražios, bet ir jautrios gyvenimo ritmui.
          </p>
        </div>
        <div className="flex flex-col gap-8 min-w-[180px] text-sm">
          {/* ✏️ EDIT: Stat blocks */}
          <div>
            <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">PATIRTIS</p>
            <p className="font-light">7+ metai</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">PROJEKTAI</p>
            <p className="font-light">50+ erdvių</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">VIETA</p>
            <p className="font-light">Vilnius & visas pasaulis</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── DESKTOP PAGE: PROJECTS ─── */
function DesktopProjects({ projects }) {
  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="px-10 pt-10 pb-6">
        <h2 className="text-3xl font-light tracking-wide">Projektai</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {projects.map((project, i) => (
          <div key={i} className="relative group overflow-hidden h-[70vh]">
            <img
              src={project.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
              <p className="text-[11px] tracking-[0.2em] opacity-70">{project.category}</p>
              <p className="text-lg font-light">{project.title}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── DESKTOP PAGE: CONTACT ─── */
function DesktopContact({ formState, setFormState, formStatus, setFormStatus, handleSubmit }) {
  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-10 h-full flex flex-col justify-center"
    >
      <h2 className="text-3xl font-light tracking-wide mb-4">Siųsti užklausą</h2>
      {/* ✏️ EDIT: Contact intro text */}
      <p className="text-gray-500 text-sm mb-8">
        Turite klausimų ar norite pradėti projektą? Parašykite mums.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
        <input
          type="text" placeholder="Vardas" required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors"
        />
        <input
          type="email" placeholder="El. paštas" required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors"
        />
        <textarea
          placeholder="Žinutė" rows="4" required
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none resize-none focus:border-black transition-colors"
        />
        <button
          type="submit"
          disabled={formStatus === "sending" || formStatus === "sent"}
          onClick={() => { if (formStatus === "error") setFormStatus(null); }}
          className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {formStatus === "sending" ? "Siunčiama..." :
           formStatus === "sent"    ? "Išsiųsta ✓" :
           "Siųsti →"}
        </button>
        {formStatus === "error" && (
          <p className="text-red-500 text-xs mt-1">
            Klaida. Bandykite dar kartą arba rašykite tiesiai el. paštu.
          </p>
        )}
      </form>
    </motion.div>
  );
}

/* ─── SHARED FOOTER ─── */
function Footer() {
  return (
    <footer className="w-full bg-[#F7F3F0] text-black px-6 md:px-10 pt-10 pb-6">
      <div className="w-full flex flex-col md:flex-row items-start gap-12">
        <div className="tracking-[0.25em] text-sm font-light">
          INOA INTERJERO DIZAINO STUDIO
          <p className="mt-4 text-xs text-gray-500 tracking-normal">
            Minimalistinio interjero dizaino studija.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 w-full md:w-auto md:ml-auto text-left">
          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">VIETA</p>
            {/* ✏️ EDIT: Location lines */}
            <p className="text-gray-600">VILNIUS, LIETUVA</p>
            <p className="text-gray-600">Visame pasaulyje pagal susitarimą</p>
          </div>
          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">KONTAKTAI</p>
            {/* ✏️ EDIT: Contact email */}
            <p className="text-gray-600">inoa@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 pt-6 border-t border-gray-300 text-[10px] md:text-xs text-gray-400 flex justify-start tracking-[0.2em]">
        <span>
          © 2026 INOA INTERJERO DIZAINO STUDIJA.
          <br className="block md:hidden" />
          {" "}ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}

/* ─── MAIN ─── */
export default function InteriorPortfolio() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [desktopPage, setDesktopPage] = useState("home");
  const [formState, setFormState]     = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus]   = useState(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  /* ── EmailJS config ──
     Replace these three values with your own from emailjs.com:
     - YOUR_PUBLIC_KEY   → Account > API Keys
     - YOUR_SERVICE_ID   → Email Services
     - YOUR_TEMPLATE_ID  → Email Templates
  */
  const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  useEffect(() => {
    if (window.emailjs) window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  /* ── Lenis smooth scroll (mobile only) ── */
  useEffect(() => {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({ lerp: 0.08, smooth: true });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── Send form ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.emailjs) { setFormStatus("error"); return; }
    setFormStatus("sending");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  formState.name,
        from_email: formState.email,
        message:    formState.message,
      });
      setFormStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 4000);
    } catch {
      setFormStatus("error");
    }
  };

  const desktopMenuItems = [
    { name: "Pagrindinis",     page: "home" },
    { name: "Apie",            page: "about" },
    { name: "Projektai",       page: "projects" },
    { name: "Siųsti užklausą", page: "contact" },
  ];

  const mobileMenuItems = [
    { name: "Pagrindinis",     link: "#" },
    { name: "Apie",            link: "#about" },
    { name: "Projektai",       link: "#projects" },
    { name: "Siųsti užklausą", link: "#contact" },
  ];

  const projects = [
    { title: "Vonios erdvė",           category: "GYVENAMASIS",             image: "/01.photo.jpg" },
    { title: "Virtuvės erdvė",         category: "GYVENAMASIS",             image: "/02.photo.jpg" },
    { title: "Miegamojo erdvė",        category: "GYVENAMASIS",             image: "/03.photo.jpg" },
    { title: "Vonios erdvė",           category: "GYVENAMASIS",             image: "/04.photo.jpg" },
    { title: "Vonios sienų plyteles",  category: "ARTCRAFT Calce",          image: "/05.photo.jpg" },
    { title: "Vonios grindų plytelės", category: "BITS&PIECES PEARL GRAY",  image: "/06.photo.jpg" },
  ];

  /* ────────────────────────────────────────────── */
  return (
    <div className="bg-[#F7F3F0] text-black overflow-x-hidden">

      {/* ── SHARED HEADER ── */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-50 backdrop-blur bg-[#F4F2EE]/70">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setDesktopPage("home"); }}
        >
          <img src="/logo.png" alt="INOA" className="h-12 md:h-14" />
        </a>

        {/* Desktop nav — swaps pages */}
        <nav className="hidden md:flex gap-10 text-sm lg:text-base font-light tracking-[0.1em]">
          {desktopMenuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setDesktopPage(item.page)}
              className={`hover:opacity-60 transition-opacity duration-300 ${desktopPage === item.page ? "opacity-40" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden p-1" aria-label="Open menu">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="1.5"/>
            <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="1.5"/>
            <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-center items-center gap-8 z-50"
          >
            <button className="absolute top-6 right-6 text-white p-1" aria-label="Close menu"
              onClick={() => setMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="19" y1="1" x2="1"  y2="19" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            {mobileMenuItems.map((item) => (
              <a key={item.name} href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl font-light tracking-wide">
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          DESKTOP — fixed viewport height, page swap
          ════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col" style={{ height: "100dvh" }}>

        {/* Spacer for fixed header (~72px) */}
        <div className="flex-shrink-0 h-[72px]" />

        {/* Page content fills remaining space between header and footer */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {desktopPage === "home" && (
              <motion.div key="home"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <DesktopHero y={y} />
              </motion.div>
            )}
            {desktopPage === "about" && (
              <motion.div key="about"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <DesktopAbout />
              </motion.div>
            )}
            {desktopPage === "projects" && (
              <motion.div key="projects"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <DesktopProjects projects={projects} />
              </motion.div>
            )}
            {desktopPage === "contact" && (
              <motion.div key="contact"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <DesktopContact
                  formState={formState}
                  setFormState={setFormState}
                  formStatus={formStatus}
                  setFormStatus={setFormStatus}
                  handleSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer always pinned to bottom on desktop */}
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE — single scrollable page, unchanged
          ════════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Hero */}
        <section className="h-screen w-full relative overflow-hidden">
          <motion.img
            src="/main.jpeg"
            style={{ y }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6 }}
            className="absolute bottom-8 pb-safe left-6 text-white"
          >
            {/* ✏️ EDIT: Studio tagline */}
            <p className="text-[10px] tracking-[0.35em] mb-3 opacity-80 uppercase">
              Interjero dizaino studija
            </p>
            {/* ✏️ EDIT: Main hero headline */}
            <h1 className="text-3xl font-light tracking-wide leading-tight max-w-sm">
              Ramybė per<br />formą ir šviesą
            </h1>
          </motion.div>
        </section>

        {/* About */}
        <Section id="about" title="Apie">
          <div className="flex flex-col gap-10">
            <div className="flex-1 text-gray-600 text-sm leading-relaxed space-y-4">
              {/* ✏️ EDIT: About paragraph 1 */}
              <p>
                Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo.
                Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.
              </p>
              {/* ✏️ EDIT: About paragraph 2 */}
              <p>
                Dirbame su privačiais klientais Vilniuje ir visame pasaulyje, kurdami
                erdves, kurios yra ne tik gražios, bet ir jautrios gyvenimo ritmui.
              </p>
            </div>
            <div className="flex flex-col gap-6 text-sm">
              {/* ✏️ EDIT: Stat blocks */}
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">PATIRTIS</p>
                <p className="font-light">7+ metai</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">PROJEKTAI</p>
                <p className="font-light">50+ erdvių</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">VIETA</p>
                <p className="font-light">Vilnius & visas pasaulis</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <section id="projects" className="py-24">
          <div className="px-6 mb-10">
            <h2 className="text-2xl font-light tracking-wide">Projektai</h2>
          </div>
          <MobileProjects projects={projects} />
        </section>

        {/* Contact */}
        <Section id="contact" title="Siųsti užklausą">
          <p className="text-gray-500 text-sm mb-8 -mt-2">
            {/* ✏️ EDIT: Contact intro text */}
            Turite klausimų ar norite pradėti projektą? Parašykite mums.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
            <input
              type="text" placeholder="Vardas" required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors"
            />
            <input
              type="email" placeholder="El. paštas" required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors"
            />
            <textarea
              placeholder="Žinutė" rows="4" required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none resize-none focus:border-black transition-colors"
            />
            <button
              type="submit"
              disabled={formStatus === "sending" || formStatus === "sent"}
              onClick={() => { if (formStatus === "error") setFormStatus(null); }}
              className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {formStatus === "sending" ? "Siunčiama..." :
               formStatus === "sent"    ? "Išsiųsta ✓" :
               "Siųsti →"}
            </button>
            {formStatus === "error" && (
              <p className="text-red-500 text-xs mt-1">
                Klaida. Bandykite dar kartą arba rašykite tiesiai el. paštu.
              </p>
            )}
          </form>
        </Section>

        <Footer />
      </div>

    </div>
  );
}
