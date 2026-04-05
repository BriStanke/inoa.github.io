import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ══════════════════════════════════════════════
   TRANSLATIONS
   ══════════════════════════════════════════════ */
const T = {
  lt: {
    tagline: "Interjero dizaino studija",
    hero: "Ramybė per\nformą ir šviesą",
    nav: {
      home: "Pagrindinis",
      about: "Apie",
      projects: "Projektai",
      services: "Paslaugos",
      contact: "Siųsti užklausą",
    },
    about: {
      title: "Apie",
      // ✏️ EDIT: About paragraphs
      p1: "Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo. Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.",
      p2: "Dirbame su privačiais ir komerciniais klientais Vilniuje ir visame pasaulyje, kurdami erdves, kurios yra ne tik gražios, bet ir jautrios gyvenimo ritmui.",
      stats: [
        { label: "PATIRTIS",  value: "7+ metai" },
        { label: "PROJEKTAI", value: "50+ erdvių" },
        { label: "VIETA",     value: "Vilnius & visas pasaulis" },
      ],
    },
    services: {
      title: "Paslaugos",
      intro: "Dirbame su gyvenamaisiais ir komerciniais objektais. Kiekvienas projektas yra individualus – nuo pirmosios konsultacijos iki galutinio rezultato.",
      scope: {
        title: "Projektų apimtis",
        // ✏️ EDIT: scope lines
        items: [
          "Gyvenamieji butai ir namai nuo 40 m²",
          "Komercinės erdvės: biurai, restoranai, viešbučiai",
          "Dalinė rekonstrukcija ir atnaujinimas",
          "Konsultacijos ir koncepcijų kūrimas",
        ],
      },
      process: {
        title: "Darbo procesas",
        steps: [
          { num: "01", title: "Konsultacija",    desc: "Susipažįstame su Jūsų poreikiais, erdve ir biudžetu. Aptariame stilistines kryptis ir tikslus." },
          { num: "02", title: "Koncepcija",      desc: "Kuriame erdvės koncepciją: nuotaikų lentas, erdvių planus, medžiagų ir spalvų paletę." },
          { num: "03", title: "Dizaino projektas", desc: "Detalizuojame sprendimus: baldų išdėstymą, apšvietimą, medžiagas ir dekoro elementus." },
          { num: "04", title: "Įgyvendinimas",   desc: "Koordinuojame rangovus ir tiekėjus, prižiūrime darbų eigą, užtikriname kokybę." },
        ],
      },
    },
    contact: {
      title: "Siųsti užklausą",
      intro: "Turite klausimų ar norite pradėti projektą? Parašykite mums.",
      name: "Vardas",
      email: "El. paštas",
      message: "Žinutė",
      send: "Siųsti →",
      sending: "Siunčiama...",
      sent: "Išsiųsta ✓",
      error: "Klaida. Bandykite dar kartą arba rašykite tiesiai el. paštu.",
    },
    project: {
      back: "← Grįžti į projektus",
      description: "Aprašymas",
    },
    footer: {
      studio: "INOA INTERJERO DIZAINO STUDIJA",
      tagline: "Minimalistinio interjero dizaino studija.",
      location: "VIETA",
      // ✏️ EDIT: location lines
      locationLines: ["VILNIUS, LIETUVA", "Visame pasaulyje pagal susitarimą"],
      contact: "KONTAKTAI",
      // ✏️ EDIT: email, phone, instagram
      email: "aire.romaskeviciute@gmail.com",
      phone: "+370 672 59010",
      instagram: "@inoa.interiors",
      instagramUrl: "https://instagram.com/inoa.studio",
      copyright: "© 2026 INOA INTERJERO DIZAINO STUDIJA. ALL RIGHTS RESERVED.",
    },
  },
  en: {
    tagline: "Interior design studio",
    hero: "Stillness through\nform and light",
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Get in touch",
    },
    about: {
      title: "About",
      p1: "We create calm, considered interiors inspired by Japanese minimalism. Every space is distilled to its essence — light, texture, and balance.",
      p2: "We work with private and commercial clients in Vilnius and worldwide, creating spaces that are not only beautiful but attuned to the rhythm of life.",
      stats: [
        { label: "EXPERIENCE", value: "7+ years" },
        { label: "PROJECTS",   value: "50+ spaces" },
        { label: "LOCATION",   value: "Vilnius & worldwide" },
      ],
    },
    services: {
      title: "Services",
      intro: "We work with residential and commercial projects. Every project is individual — from the first consultation to the final result.",
      scope: {
        title: "Project scope",
        items: [
          "Residential apartments and houses from 40 m²",
          "Commercial spaces: offices, restaurants, hotels",
          "Partial renovation and refresh",
          "Consultations and concept development",
        ],
      },
      process: {
        title: "Our process",
        steps: [
          { num: "01", title: "Consultation",    desc: "We get to know your needs, space and budget. We discuss stylistic directions and goals." },
          { num: "02", title: "Concept",         desc: "We develop a spatial concept: mood boards, floor plans, material and colour palette." },
          { num: "03", title: "Design project",  desc: "We detail the solutions: furniture layout, lighting, materials and decorative elements." },
          { num: "04", title: "Implementation",  desc: "We coordinate contractors and suppliers, oversee the work process and ensure quality." },
        ],
      },
    },
    contact: {
      title: "Get in touch",
      intro: "Have a question or want to start a project? Write to us.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send →",
      sending: "Sending...",
      sent: "Sent ✓",
      error: "Error. Please try again or write to us directly by email.",
    },
    project: {
      back: "← Back to projects",
      description: "Description",
    },
    footer: {
      studio: "INOA INTERIOR DESIGN STUDIO",
      tagline: "Minimalist interior design studio.",
      location: "LOCATION",
      locationLines: ["VILNIUS, LITHUANIA", "Worldwide by arrangement"],
      contact: "CONTACT",
      email: "aire.romaskeviciute@gmail.com",
      phone: "+370 672 59010",
      instagram: "@inoa.interiors",
      instagramUrl: "https://instagram.com/inoa.studio",
      copyright: "© 2026 INOA INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.",
    },
  },
};

/* ══════════════════════════════════════════════
   PROJECT DATA
   Each project has: title, category, image (cover),
   gallery (array of extra images), description (lt+en)
   ✏️ EDIT: Fill in descriptions and add gallery images
   ══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "vonios-erdve-1",
    titleLt: "Vonios erdvė",
    titleEn: "Bathroom space",
    category: "GYVENAMASIS / RESIDENTIAL",
    image: "/01.photo.jpg",
    gallery: ["/01.photo.jpg"],
    descLt: "Minimalistinė vonios erdvė, kurioje dominuoja natūralaus akmens tekstūros ir subtili šviesa. Projektas sukurtas siekiant suteikti ramybės ir prabangos jausmą kasdienėje aplinkoje.",
    descEn: "A minimalist bathroom where natural stone textures and subtle light dominate. The project was designed to bring a sense of calm and luxury to everyday surroundings.",
  },
  {
    id: "virtuves-erdve",
    titleLt: "Virtuvės erdvė",
    titleEn: "Kitchen space",
    category: "GYVENAMASIS / RESIDENTIAL",
    image: "/02.photo.jpg",
    gallery: ["/02.photo.jpg"],
    descLt: "Atviros virtuvės dizainas, integruojantis funkcionalumą ir estetiką. Medžio ir betono derinys sukuria šiltą, tačiau modernų charakterį.",
    descEn: "An open kitchen design that integrates functionality and aesthetics. The combination of wood and concrete creates a warm yet modern character.",
  },
  {
    id: "miegamojo-erdve",
    titleLt: "Miegamojo erdvė",
    titleEn: "Bedroom space",
    category: "GYVENAMASIS / RESIDENTIAL",
    image: "/03.photo.jpg",
    gallery: ["/03.photo.jpg"],
    descLt: "Ramios spalvų paletės miegamasis, sukurtas poilsiui ir atsipalaidavimui. Natūralūs audiniai ir minimalistiniai baldai formuoja harmoningą aplinką.",
    descEn: "A bedroom with a calm colour palette designed for rest and relaxation. Natural textiles and minimalist furniture create a harmonious environment.",
  },
  {
    id: "vonios-erdve-2",
    titleLt: "Vonios erdvė",
    titleEn: "Bathroom space",
    category: "GYVENAMASIS / RESIDENTIAL",
    image: "/04.photo.jpg",
    gallery: ["/04.photo.jpg"],
    descLt: "Erdvi vonia su laisvai stovinčia vonia kaip centrine kompozicijos ašimi. Šviesūs tonai ir geometrinės plytelės suteikia erdvei klasikinį elegantiškumą.",
    descEn: "A spacious bathroom with a freestanding bath as the central compositional axis. Light tones and geometric tiles give the space a classic elegance.",
  },
  {
    id: "sienu-plyteles",
    titleLt: "Vonios sienų plytelės",
    titleEn: "Bathroom wall tiles",
    category: "ARTCRAFT Calce",
    image: "/05.photo.jpg",
    gallery: ["/05.photo.jpg"],
    descLt: "Rankų darbo kalkių plytelės ARTCRAFT Calce kolekcijos. Subtili faktūra ir matinis paviršius sukuria tikrą ir gyvą plytelių charakterį.",
    descEn: "Hand-crafted lime tiles from the ARTCRAFT Calce collection. The subtle texture and matte surface create a genuinely alive tile character.",
  },
  {
    id: "grindų-plyteles",
    titleLt: "Vonios grindų plytelės",
    titleEn: "Bathroom floor tiles",
    category: "BITS&PIECES PEARL GRAY",
    image: "/06.photo.jpg",
    gallery: ["/06.photo.jpg"],
    descLt: "BITS&PIECES Pearl Gray grindų plytelės. Subtilus perlinis atspalvis ir mozaikinis raštas suteikia erdvei rafinuotą pojūtį.",
    descEn: "BITS&PIECES Pearl Gray floor tiles. The subtle pearlescent tone and mosaic pattern give the space a refined feel.",
  },
];

/* ══════════════════════════════════════════════
   SHARED COMPONENTS
   ══════════════════════════════════════════════ */

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

function Footer({ t }) {
  const f = t.footer;
  return (
    <footer className="w-full bg-[#F7F3F0] text-black px-6 md:px-10 pt-6 pb-4">
      <div className="w-full flex flex-col md:flex-row items-start gap-6">
        <div className="tracking-[0.25em] text-sm font-light">
          {f.studio}
          <p className="mt-2 text-xs text-gray-500 tracking-normal">{f.tagline}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-20 w-full md:w-auto md:ml-auto text-left">
          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-2">{f.location}</p>
            {f.locationLines.map((l, i) => <p key={i} className="text-gray-600">{l}</p>)}
          </div>
          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-2">{f.contact}</p>
            {/* ✏️ EDIT: email */}
            <p className="text-gray-600">{f.email}</p>
            {/* ✏️ EDIT: phone number */}
            <p className="text-gray-600 mt-1">{f.phone}</p>
            {/* ✏️ EDIT: Instagram handle + URL */}
            <a href={f.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="text-gray-600 mt-1 hover:opacity-60 transition-opacity block">
              {f.instagram}
            </a>
          </div>
        </div>
      </div>
      <div className="w-full mt-6 pt-4 border-t border-gray-300 text-[10px] md:text-xs text-gray-400 flex justify-start tracking-[0.2em]">
        <span>{f.copyright}</span>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   PROJECT DETAIL PAGE
   ══════════════════════════════════════════════ */
function ProjectDetail({ project, onBack, t, lang }) {
  const title = lang === "lt" ? project.titleLt : project.titleEn;
  const desc  = lang === "lt" ? project.descLt  : project.descEn;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Back button */}
      <div className="px-6 md:px-10 pt-8 pb-4">
        <button
          onClick={onBack}
          className="text-sm font-light tracking-wide hover:opacity-60 transition-opacity"
        >
          {t.project.back}
        </button>
      </div>

      {/* Title + category */}
      <div className="px-6 md:px-10 pb-6">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{project.category}</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-wide">{title}</h2>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 md:px-2">
        {project.gallery.map((img, i) => (
          <div key={i} className={`overflow-hidden ${project.gallery.length === 1 ? "md:col-span-2" : ""}`}>
            <img src={img} className="w-full h-[60vw] md:h-[50vh] object-cover" />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="max-w-2xl px-6 md:px-10 py-10">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-3">{t.project.description.toUpperCase()}</p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{desc}</p>
      </div>
      {/* ✏️ EDIT: Add more gallery images to project.gallery array in PROJECTS data above */}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MOBILE PROJECTS
   ══════════════════════════════════════════════ */
function MobileProjects({ projects, onSelect, lang }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTap = (i) => {
    if (activeIndex === i) {
      // second tap → go to project page
      onSelect(projects[i]);
    } else {
      setActiveIndex(i);
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
      {projects.map((project, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 w-[72vw] snap-start overflow-hidden cursor-pointer"
          onClick={() => handleTap(i)}
        >
          <img
            src={project.image}
            className={`w-full h-[90vw] object-cover transition-transform duration-700 ${activeIndex === i ? "scale-105" : "scale-100"}`}
          />
          <div className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[10px] opacity-70">{project.category}</p>
            <p className="text-sm mb-1">{lang === "lt" ? project.titleLt : project.titleEn}</p>
            <p className="text-[10px] opacity-60 tracking-wide">Spausti dar kartą →</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   DESKTOP PAGES
   ══════════════════════════════════════════════ */

function DesktopHero({ y, t }) {
  const lines = t.hero.split("\n");
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
        {/* ✏️ EDIT: tagline in T object above */}
        <p className="text-xs tracking-[0.35em] mb-3 opacity-80 uppercase">{t.tagline}</p>
        {/* ✏️ EDIT: hero headline in T object above */}
        <h1 className="text-5xl font-light tracking-wide leading-tight max-w-xl">
          {lines[0]}<br />{lines[1]}
        </h1>
      </motion.div>
    </div>
  );
}

function DesktopAbout({ t }) {
  const a = t.about;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-10 h-full flex flex-col justify-center"
    >
      <h2 className="text-3xl font-light tracking-wide mb-10">{a.title}</h2>
      <div className="flex flex-row gap-12">

        {/* Designer photo */}
        {/* ✏️ EDIT: designer photo is at public/designer.jpeg */}
        <div className="flex-shrink-0 w-48 h-60 overflow-hidden">
          <img src="/designer.jpeg" alt="Designer" className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <div className="flex-1 text-gray-600 text-base leading-relaxed space-y-4 flex flex-col justify-center">
          <p>{a.p1}</p>
          <p>{a.p2}</p>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-6 min-w-[160px] text-sm flex-shrink-0">
          {a.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{s.label}</p>
              <p className="font-light">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DesktopProjects({ projects, onSelect, lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="px-10 pt-10 pb-6">
        <h2 className="text-3xl font-light tracking-wide">{lang === "lt" ? "Projektai" : "Projects"}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 pb-40">
        {projects.map((project, i) => (
          <div
            key={i}
            className="relative group overflow-hidden h-[70vh] cursor-pointer"
            onClick={() => onSelect(project)}
          >
            <img
              src={project.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
              <p className="text-[11px] tracking-[0.2em] opacity-70">{project.category}</p>
              <p className="text-lg font-light">{lang === "lt" ? project.titleLt : project.titleEn}</p>
              <p className="text-xs opacity-60 mt-1 tracking-wide">View project →</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DesktopServices({ t }) {
  const s = t.services;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-10 w-full overflow-y-auto"
    >
      <h2 className="text-3xl font-light tracking-wide pt-10 pb-4">{s.title}</h2>
      {/* ✏️ EDIT: services intro in T object above */}
      <p className="text-gray-500 text-sm mb-10 max-w-xl">{s.intro}</p>

      <div className="flex flex-col md:flex-row gap-12 pb-40">
        {/* Process */}
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-6">{s.process.title.toUpperCase()}</p>
          <div className="space-y-8">
            {s.process.steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <span className="text-[10px] tracking-[0.2em] text-gray-300 mt-1 flex-shrink-0">{step.num}</span>
                <div>
                  <p className="text-sm font-light mb-1">{step.title}</p>
                  {/* ✏️ EDIT: step descriptions in T object above */}
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scope */}
        <div className="md:min-w-[220px]">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-6">{s.scope.title.toUpperCase()}</p>
          <ul className="space-y-3">
            {s.scope.items.map((item, i) => (
              // ✏️ EDIT: scope items in T object above
              <li key={i} className="text-sm text-gray-600 font-light flex gap-2">
                <span className="text-gray-300 flex-shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopContact({ t, formState, setFormState, formStatus, setFormStatus, handleSubmit }) {
  const c = t.contact;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-10 h-full flex flex-col justify-center"
    >
      <h2 className="text-3xl font-light tracking-wide mb-4">{c.title}</h2>
      {/* ✏️ EDIT: contact intro in T object above */}
      <p className="text-gray-500 text-sm mb-8">{c.intro}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
        <input type="text" placeholder={c.name} required
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors" />
        <input type="email" placeholder={c.email} required
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors" />
        <textarea placeholder={c.message} rows="4" required
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none resize-none focus:border-black transition-colors" />
        <button type="submit"
          disabled={formStatus === "sending" || formStatus === "sent"}
          onClick={() => { if (formStatus === "error") setFormStatus(null); }}
          className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed">
          {formStatus === "sending" ? c.sending : formStatus === "sent" ? c.sent : c.send}
        </button>
        {formStatus === "error" && <p className="text-red-500 text-xs mt-1">{c.error}</p>}
      </form>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════════ */
export default function InteriorPortfolio() {
  const [lang, setLang]               = useState("lt");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [desktopPage, setDesktopPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formState, setFormState]     = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus]   = useState(null);
  const resetTimer                    = useRef(null);
  const { scrollY }                   = useScroll();
  const y                             = useTransform(scrollY, [0, 500], [0, 80]);

  const t = T[lang];

  /* ── EmailJS config ──
     Replace these three values with your own from emailjs.com:
     - YOUR_PUBLIC_KEY   → Account > API Keys
     - YOUR_SERVICE_ID   → Email Services
     - YOUR_TEMPLATE_ID  → Email Templates
  */
  const EMAILJS_PUBLIC_KEY  = "TWFCArr6N7D8bqFjI";
  const EMAILJS_SERVICE_ID  = "service_1oxor2f";
  const EMAILJS_TEMPLATE_ID = "template_j7w2c5c";

  useEffect(() => {
    if (window.emailjs) window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  /* ── Lenis smooth scroll ── */
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
      resetTimer.current = setTimeout(() => setFormStatus(null), 4000);
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => { return () => clearTimeout(resetTimer.current); }, []);

  /* ── When project is selected on desktop, show project detail view ── */
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setDesktopPage("project-detail");
  };
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setDesktopPage("projects");
  };

  const desktopMenuItems = [
    { key: "home",     label: t.nav.home },
    { key: "about",    label: t.nav.about },
    { key: "projects", label: t.nav.projects },
    { key: "services", label: t.nav.services },
    { key: "contact",  label: t.nav.contact },
  ];

  const mobileMenuLinks = [
    { label: t.nav.home,     href: "#" },
    { label: t.nav.about,    href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.contact,  href: "#contact" },
  ];

  /* active page for nav highlight — treat project-detail as projects */
  const activePage = desktopPage === "project-detail" ? "projects" : desktopPage;

  /* ────────────────────────────────────────────── */
  return (
    <div className="bg-[#F7F3F0] text-black overflow-x-hidden">

      {/* ── SHARED HEADER ── */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-50 backdrop-blur bg-[#F4F2EE]/70">
        <a href="#" onClick={(e) => { e.preventDefault(); setDesktopPage("home"); setSelectedProject(null); }}>
          <img src="/logo.png" alt="INOA" className="h-12 md:h-14" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-10 text-sm lg:text-base font-light tracking-[0.1em]">
            {desktopMenuItems.map((item) => (
              <button key={item.key}
                onClick={() => { setDesktopPage(item.key); setSelectedProject(null); }}
                className={`hover:opacity-60 transition-opacity duration-300 ${activePage === item.key ? "opacity-40" : ""}`}>
                {item.label}
              </button>
            ))}
          </nav>
          {/* Language toggle */}
          <div className="flex gap-2 text-xs tracking-[0.15em] font-light border-l border-gray-300 pl-6">
            <button onClick={() => setLang("lt")} className={`transition-opacity ${lang === "lt" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>LT</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => setLang("en")} className={`transition-opacity ${lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>EN</button>
          </div>
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden p-1" aria-label="Open menu">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-center items-center gap-6 z-50"
          >
            <button className="absolute top-6 right-6 text-white p-1" aria-label="Close menu"
              onClick={() => setMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="19" y1="1" x2="1"  y2="19" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            {mobileMenuLinks.map((item) => (
              <a key={item.label} href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl font-light tracking-wide">
                {item.label}
              </a>
            ))}
            {/* Mobile language toggle */}
            <div className="flex gap-4 text-white text-sm tracking-[0.15em] mt-2">
              <button onClick={() => { setLang("lt"); setMenuOpen(false); }} className={lang === "lt" ? "opacity-100" : "opacity-50"}>LT</button>
              <span className="opacity-30">|</span>
              <button onClick={() => { setLang("en"); setMenuOpen(false); }} className={lang === "en" ? "opacity-100" : "opacity-50"}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          DESKTOP — fixed viewport, page swap
          ════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col" style={{ height: "100dvh" }}>
        <div className="flex-shrink-0 h-[72px]" />

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">

            {desktopPage === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <DesktopHero y={y} t={t} />
              </motion.div>
            )}

            {desktopPage === "about" && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto">
                <DesktopAbout t={t} />
              </motion.div>
            )}

            {desktopPage === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto">
                <DesktopProjects projects={PROJECTS} onSelect={handleSelectProject} lang={lang} />
              </motion.div>
            )}

            {desktopPage === "project-detail" && selectedProject && (
              <motion.div key="project-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto">
                <ProjectDetail project={selectedProject} onBack={handleBackToProjects} t={t} lang={lang} />
              </motion.div>
            )}

            {desktopPage === "services" && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto">
                <DesktopServices t={t} />
              </motion.div>
            )}

            {desktopPage === "contact" && (
              <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto">
                <DesktopContact t={t} formState={formState} setFormState={setFormState}
                  formStatus={formStatus} setFormStatus={setFormStatus} handleSubmit={handleSubmit} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="flex-shrink-0">
          <Footer t={t} />
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE — single scrollable page
          ════════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Mobile project detail page */}
        {selectedProject ? (
          <div className="pt-[72px]">
            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} t={t} lang={lang} />
            <Footer t={t} />
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="h-screen w-full relative overflow-hidden">
              <motion.img src="/main.jpeg" style={{ y }}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 }}
                className="absolute bottom-8 pb-safe left-6 text-white">
                <p className="text-[10px] tracking-[0.35em] mb-3 opacity-80 uppercase">{t.tagline}</p>
                <h1 className="text-3xl font-light tracking-wide leading-tight max-w-sm">
                  {t.hero.split("\n")[0]}<br />{t.hero.split("\n")[1]}
                </h1>
              </motion.div>
            </section>

            {/* About */}
            <Section id="about" title={t.about.title}>
              {/* Designer photo */}
              <div className="w-full h-64 overflow-hidden mb-6">
                <img src="/designer.jpeg" alt="Designer" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex flex-col gap-6">
                <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                  {t.about.stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{s.label}</p>
                      <p className="font-light">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Projects */}
            <section id="projects" className="py-24">
              <div className="px-6 mb-10">
                <h2 className="text-2xl font-light tracking-wide">{t.nav.projects}</h2>
              </div>
              <MobileProjects projects={PROJECTS} onSelect={(p) => setSelectedProject(p)} lang={lang} />
            </section>

            {/* Services */}
            <Section id="services" title={t.services.title}>
              <p className="text-gray-500 text-sm mb-8 -mt-2">{t.services.intro}</p>
              {/* Process steps */}
              <div className="space-y-6 mb-10">
                {t.services.process.steps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] text-gray-300 mt-1 flex-shrink-0">{step.num}</span>
                    <div>
                      <p className="text-sm font-light mb-1">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scope */}
              <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-4">{t.services.scope.title.toUpperCase()}</p>
              <ul className="space-y-2">
                {t.services.scope.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 font-light flex gap-2">
                    <span className="text-gray-300 flex-shrink-0">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Contact */}
            <Section id="contact" title={t.contact.title}>
              <p className="text-gray-500 text-sm mb-8 -mt-2">{t.contact.intro}</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
                <input type="text" placeholder={t.contact.name} required
                  value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors" />
                <input type="email" placeholder={t.contact.email} required
                  value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors" />
                <textarea placeholder={t.contact.message} rows="4" required
                  value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none resize-none focus:border-black transition-colors" />
                <button type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  onClick={() => { if (formStatus === "error") setFormStatus(null); }}
                  className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed">
                  {formStatus === "sending" ? t.contact.sending : formStatus === "sent" ? t.contact.sent : t.contact.send}
                </button>
                {formStatus === "error" && <p className="text-red-500 text-xs mt-1">{t.contact.error}</p>}
              </form>
            </Section>

            <Footer t={t} />
          </>
        )}
      </div>

    </div>
  );
}
