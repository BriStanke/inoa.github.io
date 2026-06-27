import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ══════════════════════════════════════════════
   TRANSLATIONS
   ══════════════════════════════════════════════ */
const T = {
  lt: {
    tagline: "Interjero dizaino studija",
    nav: {
      home: "Pagrindinis",
      about: "Apie",
      projects: "Projektai",
      services: "Paslaugos",
      contact: "Kontaktai",
    },
    about: {
      title: "Apie",
      // ✏️ EDIT: About — Mano istorija (heading + paragraphs)
      storyTitle: "Mano istorija",
      story: [
        "Interjero dizainerės kelią pasirinkau dar būdama dešimtoje klasėje. Jau tada žinojau, kad noriu kurti erdves, tačiau tik vėliau supratau, kodėl tai man taip svarbu.",
        "Tam tikri gyvenimo etapai paskatino pažvelgti giliau į savo profesiją ir užduoti sau klausimą – kokią vertę iš tikrųjų kuriu žmogui? Tada supratau, kad mane visada labiausiai domino ne pats interjeras, o žmogus, kuris jame gyvena, dirba, kuria ir ilsisi.",
        "Šis suvokimas dar labiau sustiprino mano ryšį su interjero dizainu. Pasirinkau sąmoningą kelią nuolat augti, gilinti žinias ir ieškoti sprendimų, kurie kuria ne tik estetinę vertę, bet ir gerina žmogaus kasdienę patirtį. Tikiu, kad erdvės mus veikia kur kas labiau, nei dažnai pastebime, todėl kiekvieną projektą matau kaip galimybę prisidėti prie geresnės gyvenimo kokybės.",
      ],
      // ✏️ EDIT: About — INOA filosofija (heading + intro + paragraphs)
      philosophyTitle: "INOA filosofija",
      philosophyIntro: "INOA – tai prasmingas dizainas žmogaus gyvenimo ritmui.",
      philosophy: [
        "Tikiu, kad gerai sukurta erdvė gali įgalinti žmogų veikti. Ji gali padėti pailsėti po intensyvios dienos, susikaupti darbui, kūrybai ar tapti vieta prasmingiems susitikimams ir bendravimui.",
        "Man interjeras nėra tik estetikos klausimas. Tai sistema, kurioje kiekvienas sprendimas turi įtakos žmogaus savijautai. Kartais net vienas netinkamai suplanuotas elementas gali kasdien kelti nepatogumų, o gerai apgalvoti sprendimai gali nepastebimai kurti daugiau komforto, aiškumo ir ramybės.",
        "Todėl kiekvieno projekto pradžioje siekiu pažinti žmogų – jo įpročius, rutiną, ritualus, poreikius ir gyvenimo būdą. Tik supratus, kaip žmogus gyvena, galima sukurti erdvę, kuri iš tikrųjų jam tarnauja.",
        "Tinkamai parinktos medžiagos, spalvos, šviesa ir funkcionalūs sprendimai susijungia į vientisą visumą, kuri tampa autentišku konkretaus žmogaus ar verslo atspindžiu.",
      ],
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
          { num: "01", title: "Konsultacija",      desc: "Susipažįstame su Jūsų poreikiais, erdve ir biudžetu. Aptariame stilistines kryptis ir tikslus." },
          { num: "02", title: "Koncepcija",         desc: "Kuriame erdvės koncepciją: nuotaikų lentas, erdvių planus, medžiagų ir spalvų paletę." },
          { num: "03", title: "Dizaino projektas",  desc: "Detalizuojame sprendimus: baldų išdėstymą, apšvietimą, medžiagas ir dekoro elementus." },
          { num: "04", title: "Įgyvendinimas",      desc: "Koordinuojame rangovus ir tiekėjus, prižiūrime darbų eigą, užtikriname kokybę." },
        ],
      },
    },
    contact: {
      title: "Kontaktai",
      intro: "Turite klausimų ar norite pradėti projektą? Susisiekite su mumis.",
      // ✏️ EDIT: contact details
      location: "VIETA",
      locationLines: ["Vilnius, Lietuva", "Visame pasaulyje pagal susitarimą"],
      detailsTitle: "KONTAKTAI",
      contactName: "Airė Romaškevičiūtė",
      email: "inoa.aire@gmail.com",
      phone: "+370 672 59010",
      instagram: "inoa.interiors",
      instagramUrl: "https://www.instagram.com/inoa.interiors/",
      facebook: "INOA.interiors",
      facebookUrl: "https://www.facebook.com/profile.php?id=61575323777448",
      // form labels
      formTitle: "Parašykite mums",
      name: "Vardas",
      emailField: "El. paštas",
      message: "Žinutė",
      send: "Siųsti →",
      sending: "Siunčiama...",
      sent: "Išsiųsta ✓",
      error: "Klaida. Bandykite dar kartą arba rašykite tiesiai el. paštu.",
    },
    project: {
      back: "← Grįžti į projektus",
      description: "Aprašymas",
      viewProject: "Žiūrėti projektą",
      tapAgain: "Spausti dar kartą",
    },
  },
  en: {
    tagline: "Interior design studio",
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
    },
    about: {
      title: "About",
      // ✏️ EDIT: About — My story (heading + paragraphs). Translation — please review.
      storyTitle: "My story",
      story: [
        "I chose the path of an interior designer back in tenth grade. Even then I knew I wanted to create spaces, but only later did I understand why it mattered to me so much.",
        "Certain chapters of life led me to look more deeply at my profession and ask myself a question — what value am I truly creating for a person? That is when I realised that what always interested me most was not the interior itself, but the person who lives, works, creates and rests within it.",
        "This understanding deepened my connection to interior design even further. I chose a conscious path of constant growth — to keep learning and to seek solutions that create not only aesthetic value, but also improve a person's everyday experience. I believe that spaces affect us far more than we often notice, so I see every project as an opportunity to contribute to a better quality of life.",
      ],
      // ✏️ EDIT: About — INOA philosophy (heading + intro + paragraphs). Translation — please review.
      philosophyTitle: "INOA philosophy",
      philosophyIntro: "INOA is meaningful design for the rhythm of human life.",
      philosophy: [
        "I believe that a well-designed space can empower a person to act. It can help them rest after an intense day, focus on work or creativity, or become a place for meaningful gatherings and connection.",
        "For me, an interior is not merely a question of aesthetics. It is a system in which every decision affects how a person feels. Sometimes even a single poorly planned element can cause daily discomfort, while well-considered solutions can quietly create more comfort, clarity and calm.",
        "That is why, at the start of every project, I seek to know the person — their habits, routine, rituals, needs and way of life. Only by understanding how someone lives can you create a space that truly serves them.",
        "Carefully chosen materials, colours, light and functional solutions come together into a single whole that becomes an authentic reflection of a particular person or business.",
      ],
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
          { num: "01", title: "Consultation",   desc: "We get to know your needs, space and budget. We discuss stylistic directions and goals." },
          { num: "02", title: "Concept",        desc: "We develop a spatial concept: mood boards, floor plans, material and colour palette." },
          { num: "03", title: "Design project", desc: "We detail the solutions: furniture layout, lighting, materials and decorative elements." },
          { num: "04", title: "Implementation", desc: "We coordinate contractors and suppliers, oversee the work process and ensure quality." },
        ],
      },
    },
    contact: {
      title: "Contact",
      intro: "Have a question or want to start a project? Get in touch with us.",
      location: "LOCATION",
      locationLines: ["Vilnius, Lithuania", "Worldwide by arrangement"],
      detailsTitle: "CONTACT",
      contactName: "Airė Romaškevičiūtė",
      email: "inoa.aire@gmail.com",
      phone: "+370 672 59010",
      instagram: "inoa.interiors",
      instagramUrl: "https://www.instagram.com/inoa.interiors/",
      facebook: "INOA.interiors",
      facebookUrl: "https://www.facebook.com/profile.php?id=61575323777448",
      formTitle: "Send us a message",
      name: "Name",
      emailField: "Email",
      message: "Message",
      send: "Send →",
      sending: "Sending...",
      sent: "Sent ✓",
      error: "Error. Please try again or write to us directly by email.",
    },
    project: {
      back: "← Back to projects",
      description: "Description",
      viewProject: "View project",
      tapAgain: "Tap again",
    },
  },
};

/* ══════════════════════════════════════════════
   PROJECT DATA
   ✏️ EDIT: Fill in descriptions and add gallery images
   ══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "vonios-erdve-1",
    titleLt: "Vonios erdvė",
    titleEn: "Bathroom space",
    categoryLt: "GYVENAMASIS",
    categoryEn: "RESIDENTIAL",
    image: "/01.photo.jpg",
    gallery: ["/01.photo.jpg"],
    descLt: "Minimalistinė vonios erdvė, kurioje dominuoja natūralaus akmens tekstūros ir subtili šviesa. Projektas sukurtas siekiant suteikti ramybės ir prabangos jausmą kasdienėje aplinkoje.",
    descEn: "A minimalist bathroom where natural stone textures and subtle light dominate. The project was designed to bring a sense of calm and luxury to everyday surroundings.",
  },
  {
    id: "virtuves-erdve",
    titleLt: "Virtuvės erdvė",
    titleEn: "Kitchen space",
    categoryLt: "GYVENAMASIS",
    categoryEn: "RESIDENTIAL",
    image: "/02.photo.jpg",
    gallery: ["/02.photo.jpg"],
    descLt: "Atviros virtuvės dizainas, integruojantis funkcionalumą ir estetiką. Medžio ir betono derinys sukuria šiltą, tačiau modernų charakterį.",
    descEn: "An open kitchen design that integrates functionality and aesthetics. The combination of wood and concrete creates a warm yet modern character.",
  },
  {
    id: "miegamojo-erdve",
    titleLt: "Miegamojo erdvė",
    titleEn: "Bedroom space",
    categoryLt: "GYVENAMASIS",
    categoryEn: "RESIDENTIAL",
    image: "/03.photo.jpg",
    gallery: ["/03.photo.jpg"],
    descLt: "Ramios spalvų paletės miegamasis, sukurtas poilsiui ir atsipalaidavimui. Natūralūs audiniai ir minimalistiniai baldai formuoja harmoningą aplinką.",
    descEn: "A bedroom with a calm colour palette designed for rest and relaxation. Natural textiles and minimalist furniture create a harmonious environment.",
  },
  {
    id: "vonios-erdve-2",
    titleLt: "Vonios erdvė",
    titleEn: "Bathroom space",
    categoryLt: "GYVENAMASIS",
    categoryEn: "RESIDENTIAL",
    image: "/04.photo.jpg",
    gallery: ["/04.photo.jpg"],
    descLt: "Erdvi vonia su laisvai stovinčia vonia kaip centrine kompozicijos ašimi. Šviesūs tonai ir geometrinės plytelės suteikia erdvei klasikinį elegantiškumą.",
    descEn: "A spacious bathroom with a freestanding bath as the central compositional axis. Light tones and geometric tiles give the space a classic elegance.",
  },
  {
    id: "sienu-plyteles",
    titleLt: "Vonios sienų plytelės",
    titleEn: "Bathroom wall tiles",
    categoryLt: "ARTCRAFT Calce",
    categoryEn: "ARTCRAFT Calce",
    image: "/05.photo.jpg",
    gallery: ["/05.photo.jpg"],
    descLt: "Rankų darbo kalkių plytelės ARTCRAFT Calce kolekcijos. Subtili faktūra ir matinis paviršius sukuria tikrą ir gyvą plytelių charakterį.",
    descEn: "Hand-crafted lime tiles from the ARTCRAFT Calce collection. The subtle texture and matte surface create a genuinely alive tile character.",
  },
  {
    id: "grindų-plyteles",
    titleLt: "Vonios grindų plytelės",
    titleEn: "Bathroom floor tiles",
    categoryLt: "BITS&PIECES PEARL GRAY",
    categoryEn: "BITS&PIECES PEARL GRAY",
    image: "/06.photo.jpg",
    gallery: ["/06.photo.jpg"],
    descLt: "BITS&PIECES Pearl Gray grindų plytelės. Subtilus perlinis atspalvis ir mozaikinis raštas suteikia erdvei rafinuotą pojūtį.",
    descEn: "BITS&PIECES Pearl Gray floor tiles. The subtle pearlescent tone and mosaic pattern give the space a refined feel.",
  },
];

/* ══════════════════════════════════════════════
   SHARED SECTION WRAPPER (mobile scroll)
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
      <h2 className="text-2xl font-bold tracking-wide mb-6">{title}</h2>
      {children}
    </motion.section>
  );
}

/* ══════════════════════════════════════════════
   INSTAGRAM ICON — minimal line glyph, inherits text colour
   ══════════════════════════════════════════════ */
function InstagramIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   FACEBOOK ICON — minimal line glyph, matches Instagram style
   ══════════════════════════════════════════════ */
function FacebookIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M14 8.2h-1.3a1.7 1.7 0 0 0-1.7 1.7V16 M10.3 11.6h3.4" />
    </svg>
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
      <div className="px-6 md:px-10 pt-8 pb-4">
        <button onClick={onBack}
          className="text-sm font-normal tracking-wide hover:opacity-60 transition-opacity">
          {t.project.back}
        </button>
      </div>
      <div className="px-6 md:px-10 pb-6">
        <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-1">{lang === "lt" ? project.categoryLt : project.categoryEn}</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2">
        {project.gallery.map((img, i) => (
          <div key={i} className={`overflow-hidden ${project.gallery.length === 1 ? "md:col-span-2" : ""}`}>
            <img src={img} className="w-full h-[60vw] md:h-[50vh] object-cover" />
          </div>
        ))}
      </div>
      <div className="max-w-2xl px-6 md:px-10 py-10">
        <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-3">{t.project.description.toUpperCase()}</p>
        <p className="text-[#6A584C] text-sm md:text-base leading-relaxed">{desc}</p>
      </div>
      {/* ✏️ EDIT: Add more gallery images to project.gallery array in PROJECTS data above */}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MOBILE PROJECTS
   ══════════════════════════════════════════════ */
function MobileProjects({ projects, onSelect, lang, t }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleTap = (i) => {
    if (activeIndex === i) onSelect(projects[i]);
    else setActiveIndex(i);
  };
  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
      {projects.map((project, i) => (
        <div key={i}
          className="relative flex-shrink-0 w-[72vw] snap-start overflow-hidden cursor-pointer"
          onClick={() => handleTap(i)}
        >
          <img src={project.image}
            className={`w-full h-[90vw] object-cover transition-transform duration-700 ${activeIndex === i ? "scale-105" : "scale-100"}`} />
          <div className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}>
            <p className="text-[10px] opacity-70">{lang === "lt" ? project.categoryLt : project.categoryEn}</p>
            <p className="text-sm mb-1">{lang === "lt" ? project.titleLt : project.titleEn}</p>
            <p className="text-[10px] opacity-60 tracking-wide">{t.project.tapAgain} →</p>
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
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.img src="/main.jpeg" style={{ y }}
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3 }}
        className="absolute bottom-14 left-14 text-white"
      >
        {/* ✏️ EDIT: tagline text in T object above */}
        <p className="text-xs tracking-[0.35em] opacity-80 uppercase">{t.tagline}</p>
      </motion.div>
    </div>
  );
}

function DesktopAbout({ t }) {
  const a = t.about;
  return (
    // Opacity-only fade (no transform) so the sticky photo below keeps working.
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="h-full overflow-y-auto"
    >
      <div className="flex flex-row min-h-full">
        {/* Designer photo — left half, pinned in view while the text scrolls */}
        {/* ✏️ EDIT: designer photo is at public/designer.jpeg */}
        <div className="w-1/2 flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src="/designer.jpeg" alt="Designer"
              className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Right side — scrolling text */}
        <div className="w-1/2 px-12 pt-[100px] pb-24 flex flex-col gap-14">
          {/* Mano istorija */}
          <div>
            {/* ✏️ EDIT: story title + paragraphs in T object above */}
            <h2 className="text-3xl font-bold tracking-wide mb-6">{a.storyTitle}</h2>
            <div className="text-[#6A584C] text-base leading-relaxed space-y-4">
              {a.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* INOA filosofija */}
          <div>
            {/* ✏️ EDIT: philosophy title + intro + paragraphs in T object above */}
            <h2 className="text-3xl font-bold tracking-wide mb-6">{a.philosophyTitle}</h2>
            <p className="text-[#23140B] text-lg font-bold leading-relaxed mb-6">{a.philosophyIntro}</p>
            <div className="text-[#6A584C] text-base leading-relaxed space-y-4">
              {a.philosophy.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-5 text-sm border-t border-[#D8D3C9] pt-10">
            {/* ✏️ EDIT: stat blocks in T object above */}
            {a.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-1">{s.label}</p>
                <p className="font-normal">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopProjects({ projects, onSelect, lang, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="px-10 pt-10 pb-6">
        <h2 className="text-3xl font-bold tracking-wide">{lang === "lt" ? "Projektai" : "Projects"}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 pb-40">
        {projects.map((project, i) => (
          <div key={i}
            className="relative group overflow-hidden h-[70vh] cursor-pointer"
            onClick={() => onSelect(project)}
          >
            <img src={project.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
              <p className="text-[11px] tracking-[0.2em] opacity-70">{lang === "lt" ? project.categoryLt : project.categoryEn}</p>
              <p className="text-lg font-normal">{lang === "lt" ? project.titleLt : project.titleEn}</p>
              <p className="text-xs opacity-60 mt-1 tracking-wide">{t.project.viewProject} →</p>
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
      <h2 className="text-3xl font-bold tracking-wide pt-10 pb-4">{s.title}</h2>
      {/* ✏️ EDIT: services intro in T object above */}
      <p className="text-[#6A584C] text-sm mb-10 max-w-xl">{s.intro}</p>
      <div className="flex flex-col md:flex-row gap-12 pb-40">
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-6">{s.process.title.toUpperCase()}</p>
          <div className="space-y-8">
            {s.process.steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <span className="text-[10px] tracking-[0.2em] text-[#978A7E] mt-1 flex-shrink-0">{step.num}</span>
                <div>
                  <p className="text-sm font-normal mb-1">{step.title}</p>
                  {/* ✏️ EDIT: step descriptions in T object above */}
                  <p className="text-xs text-[#6A584C] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:min-w-[220px]">
          <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-6">{s.scope.title.toUpperCase()}</p>
          <ul className="space-y-3">
            {s.scope.items.map((item, i) => (
              // ✏️ EDIT: scope items in T object above
              <li key={i} className="text-sm text-[#6A584C] font-normal flex gap-2">
                <span className="text-[#978A7E] flex-shrink-0">—</span>{item}
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
      className="h-full flex flex-row"
    >
      {/* Left — contact info (top) + photo (bottom). Fixed height, no scroll. */}
      <div className="w-1/2 flex flex-col px-16 pt-16 pb-12 border-r border-[#D8D3C9] overflow-hidden">
        <div className="flex-shrink-0">
          <h2 className="text-3xl font-bold tracking-wide mb-6">{c.title}</h2>
          <p className="text-[#6A584C] text-sm mb-8 max-w-xs leading-relaxed">{c.intro}</p>

          <div className="flex flex-col gap-6 text-sm">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-2">{c.location}</p>
              {/* ✏️ EDIT: location lines in T object above */}
              {c.locationLines.map((l, i) => (
                <p key={i} className="text-[#6A584C] font-normal">{l}</p>
              ))}
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-2">{c.detailsTitle}</p>
              {/* ✏️ EDIT: name, email, phone, instagram, facebook in T object above */}
              <p className="text-[#6A584C] font-normal">{c.contactName}</p>
              <p className="text-[#6A584C] font-normal mt-1">{c.email}</p>
              <p className="text-[#6A584C] font-normal mt-1">{c.phone}</p>
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#6A584C] font-normal mt-1 hover:opacity-60 transition-opacity flex w-fit items-center gap-2">
                <InstagramIcon />
                {c.instagram}
              </a>
              <a href={c.facebookUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#6A584C] font-normal mt-1 hover:opacity-60 transition-opacity flex w-fit items-center gap-2">
                <FacebookIcon />
                {c.facebook}
              </a>
            </div>
          </div>
        </div>

        {/* Photo anchored bottom-left, aligned with the contact column */}
        {/* ✏️ EDIT: contact photo is at public/kontaktai.jpeg */}
        <div className="flex-1 min-h-0 flex items-end pt-10">
          <img src="/kontaktai.jpeg" alt=""
            className="w-full max-h-full object-cover" />
        </div>
      </div>

      {/* Right — form */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-16">
        <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-8">{c.formTitle.toUpperCase()}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
          <input type="text" placeholder={c.name} required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] focus:border-[#23140B] transition-colors" />
          <input type="email" placeholder={c.emailField} required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] focus:border-[#23140B] transition-colors" />
          <textarea placeholder={c.message} rows="4" required
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] resize-none focus:border-[#23140B] transition-colors" />
          <button type="submit"
            disabled={formStatus === "sending" || formStatus === "sent"}
            onClick={() => { if (formStatus === "error") setFormStatus(null); }}
            className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed">
            {formStatus === "sending" ? c.sending : formStatus === "sent" ? c.sent : c.send}
          </button>
          {formStatus === "error" && <p className="text-red-500 text-xs mt-1">{c.error}</p>}
        </form>
      </div>
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
  const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

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

  const activePage = desktopPage === "project-detail" ? "projects" : desktopPage;

  /* ────────────────────────────────────────────── */
  return (
    <div className="bg-[#E8E6E0] text-[#23140B] overflow-x-hidden">

      {/* ── SHARED HEADER ── */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-50 backdrop-blur bg-[#ECEAE4]/70">
        <a href="#" onClick={(e) => { e.preventDefault(); setDesktopPage("home"); setSelectedProject(null); }}>
          <img src="/logo.png" alt="INOA" className="h-12 md:h-14" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-10 text-sm lg:text-base font-normal tracking-[0.1em]">
            {desktopMenuItems.map((item) => (
              <button key={item.key}
                onClick={() => { setDesktopPage(item.key); setSelectedProject(null); }}
                className={`hover:opacity-60 transition-opacity duration-300 ${activePage === item.key ? "opacity-40" : ""}`}>
                {item.label}
              </button>
            ))}
          </nav>
          {/* Language toggle */}
          <div className="flex gap-2 text-xs tracking-[0.15em] font-normal border-l border-[#D8D3C9] pl-6">
            <button onClick={() => setLang("lt")} className={`transition-opacity ${lang === "lt" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>LT</button>
            <span className="text-[#978A7E]">|</span>
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
                className="text-white text-2xl font-normal tracking-wide">
                {item.label}
              </a>
            ))}
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
        {/* Header spacer removed so the home hero and About images reach the very top,
            behind the translucent header. Pages that should stay clear of the header
            below carry their own pt-[72px]. */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">

            {desktopPage === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <DesktopHero y={y} t={t} />
              </motion.div>
            )}

            {desktopPage === "about" && (
              <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <DesktopAbout t={t} />
              </motion.div>
            )}

            {desktopPage === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto pt-[72px]">
                <DesktopProjects projects={PROJECTS} onSelect={handleSelectProject} lang={lang} t={t} />
              </motion.div>
            )}

            {desktopPage === "project-detail" && selectedProject && (
              <motion.div key="project-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto pt-[72px]">
                <ProjectDetail project={selectedProject} onBack={handleBackToProjects} t={t} lang={lang} />
              </motion.div>
            )}

            {desktopPage === "services" && (
              <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 overflow-y-auto pt-[72px]">
                <DesktopServices t={t} />
              </motion.div>
            )}

            {desktopPage === "contact" && (
              <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 pt-[72px]">
                <DesktopContact t={t} formState={formState} setFormState={setFormState}
                  formStatus={formStatus} setFormStatus={setFormStatus} handleSubmit={handleSubmit} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        {/* No footer */}
      </div>

      {/* ════════════════════════════════════════════
          MOBILE — single scrollable page
          ════════════════════════════════════════════ */}
      <div className="md:hidden">

        {selectedProject ? (
          <div className="pt-[72px]">
            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} t={t} lang={lang} />
          </div>
        ) : (
          <>
            {/* Hero */}
            <section className="h-screen w-full relative overflow-hidden">
              {/* Pinned to top — no parallax so the image doesn't drift on first scroll */}
              <motion.img src="/main.jpeg"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.6 }}
                className="absolute bottom-8 pb-safe left-6 text-white">
                {/* ✏️ EDIT: tagline text in T object above */}
                <p className="text-[10px] tracking-[0.35em] opacity-80 uppercase">{t.tagline}</p>
              </motion.div>
            </section>

            {/* About */}
            <motion.section id="about"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto px-6 py-24">
              {/* Designer photo — full image visible on mobile */}
              {/* ✏️ EDIT: designer photo is at public/designer.jpeg */}
              <div className="w-full overflow-hidden mb-10">
                <img src="/designer.jpeg" alt="Designer" className="w-full h-auto object-contain" />
              </div>

              {/* Mano istorija */}
              {/* ✏️ EDIT: story title + paragraphs in T object above */}
              <h2 className="text-2xl font-bold tracking-wide mb-5">{t.about.storyTitle}</h2>
              <div className="text-[#6A584C] text-sm leading-relaxed space-y-4 mb-12">
                {t.about.story.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* INOA filosofija */}
              {/* ✏️ EDIT: philosophy title + intro + paragraphs in T object above */}
              <h2 className="text-2xl font-bold tracking-wide mb-5">{t.about.philosophyTitle}</h2>
              <p className="text-[#23140B] text-base font-bold leading-relaxed mb-5">{t.about.philosophyIntro}</p>
              <div className="text-[#6A584C] text-sm leading-relaxed space-y-4 mb-12">
                {t.about.philosophy.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-4 text-sm border-t border-[#D8D3C9] pt-8">
                {/* ✏️ EDIT: stat blocks in T object above */}
                {t.about.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-1">{s.label}</p>
                    <p className="font-normal">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Projects */}
            <section id="projects" className="py-24">
              <div className="px-6 mb-10">
                <h2 className="text-2xl font-bold tracking-wide">{t.nav.projects}</h2>
              </div>
              <MobileProjects projects={PROJECTS} onSelect={(p) => setSelectedProject(p)} lang={lang} t={t} />
            </section>

            {/* Services */}
            <Section id="services" title={t.services.title}>
              <p className="text-[#6A584C] text-sm mb-8 -mt-2">{t.services.intro}</p>
              <div className="space-y-6 mb-10">
                {t.services.process.steps.map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#978A7E] mt-1 flex-shrink-0">{step.num}</span>
                    <div>
                      <p className="text-sm font-normal mb-1">{step.title}</p>
                      <p className="text-xs text-[#6A584C] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-4">{t.services.scope.title.toUpperCase()}</p>
              <ul className="space-y-2">
                {t.services.scope.items.map((item, i) => (
                  <li key={i} className="text-sm text-[#6A584C] font-normal flex gap-2">
                    <span className="text-[#978A7E] flex-shrink-0">—</span>{item}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Contact */}
            <Section id="contact" title={t.contact.title}>
              <p className="text-[#6A584C] text-sm mb-10 -mt-2">{t.contact.intro}</p>

              {/* Contact details */}
              <div className="flex flex-col gap-6 mb-12 text-sm">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-2">{t.contact.location}</p>
                  {t.contact.locationLines.map((l, i) => (
                    <p key={i} className="text-[#6A584C] font-normal">{l}</p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-2">{t.contact.detailsTitle}</p>
                  {/* ✏️ EDIT: name, email, phone, instagram, facebook in T object above */}
                  <p className="text-[#6A584C] font-normal">{t.contact.contactName}</p>
                  <p className="text-[#6A584C] font-normal mt-1">{t.contact.email}</p>
                  <p className="text-[#6A584C] font-normal mt-1">{t.contact.phone}</p>
                  <a href={t.contact.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[#6A584C] font-normal mt-1 hover:opacity-60 transition-opacity flex w-fit items-center gap-2">
                    <InstagramIcon />
                    {t.contact.instagram}
                  </a>
                  <a href={t.contact.facebookUrl} target="_blank" rel="noopener noreferrer"
                    className="text-[#6A584C] font-normal mt-1 hover:opacity-60 transition-opacity flex w-fit items-center gap-2">
                    <FacebookIcon />
                    {t.contact.facebook}
                  </a>
                </div>
              </div>

              {/* Form */}
              <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-6">{t.contact.formTitle.toUpperCase()}</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
                <input type="text" placeholder={t.contact.name} required
                  value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] focus:border-[#23140B] transition-colors" />
                <input type="email" placeholder={t.contact.emailField} required
                  value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] focus:border-[#23140B] transition-colors" />
                <textarea placeholder={t.contact.message} rows="4" required
                  value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="border-b border-[#D8D3C9] bg-transparent py-2 text-sm outline-none placeholder:text-[#6A584C] resize-none focus:border-[#23140B] transition-colors" />
                <button type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  onClick={() => { if (formStatus === "error") setFormStatus(null); }}
                  className="text-sm mt-4 hover:opacity-60 transition-opacity text-left disabled:opacity-40 disabled:cursor-not-allowed">
                  {formStatus === "sending" ? t.contact.sending : formStatus === "sent" ? t.contact.sent : t.contact.send}
                </button>
                {formStatus === "error" && <p className="text-red-500 text-xs mt-1">{t.contact.error}</p>}
              </form>
            </Section>
          </>
        )}
      </div>

    </div>
  );
}
