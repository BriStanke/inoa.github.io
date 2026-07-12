import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    hero: {
      // ✏️ EDIT: Pagrindinis — didžioji eilutė po INOA užrašu
      line: "Prasmingas dizainas žmogaus gyvenimo ritmui.",
      // ✏️ EDIT: Pagrindinis — brėžinio pavadinimas virš plano
      planTitle: "Vienos dienos planas",
      // ✏️ EDIT: Pagrindinis — dienos ritmo etapai (laikas + užrašas po planu)
      dayparts: [
        { time: "07:00", label: "Rytas — virtuvė" },
        { time: "13:00", label: "Diena — darbo vieta" },
        { time: "19:00", label: "Vakaras — svetainė" },
        { time: "23:00", label: "Naktis — miegamasis" },
      ],
      // ✏️ EDIT: Pagrindinis — kambarių užrašai pačiame brėžinyje
      rooms: {
        kitchen: "Virtuvė",
        bath: "Vonia",
        desk: "Darbo vieta",
        living: "Svetainė",
        bedroom: "Miegamasis",
      },
      cta: "Žiūrėti projektus",
      // ✏️ EDIT: Pagrindinis — brėžinio kampinė lentelė (kaip ant tikrų brėžinių)
      titleBlock: {
        project: "Interjero projektas",
        place: "Vilnius",
        scale: "Mastelis 1:100",
        sheet: "Lapas 01 / 01",
      },
    },
    about: {
      title: "Apie",
      // ✏️ EDIT: About — dizainerės nuotraukos aprašymas (alt tekstas ekrano skaitytuvams / Google)
      photoAlt: "Interjero dizainerė Airė Romaškevičiūtė",
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
    },
    materials: {
      // ✏️ EDIT: Medžiagos — sekcijos pavadinimas ir įžanga
      title: "Medžiagos",
      intro: "Pavyzdžiai nuo darbo stalo — medis, akmuo ir firminės spalvos, iš kurių gimsta INOA erdvės.",
    },
    services: {
      intro: "Dirbame su gyvenamaisiais ir komerciniais objektais. Kiekvienas projektas yra individualus – nuo pirmosios konsultacijos iki galutinio rezultato.",
      packageTitle: "PILNAS INTERJERO PROJEKTAS",
      // ✏️ EDIT: full project stages (number, title, bullet points)
      stages: [
        {
          num: "01",
          title: "Interjero konceptas",
          items: [
            "Konsultacija",
            "Susipažįstame su Jūsų poreikiais, erdve ir biudžetu. Aptariame stilistines kryptis ir tikslus",
            "Interjero koncepcijos MOODBOARD",
            "2D baldų išdėstymo planas",
            "3D modelis su realistiškomis vizualizacijomis",
            "Objekto išmatavimas",
          ],
        },
        {
          num: "02",
          title: "Techninis darbo projektas (TDP)",
          items: [
            "Baldų išdėstymo planas",
            "Vizualizacijos",
            "Pertvarų planas",
            "Durų specifikacija",
            "Elektros planas su išklotinėmis",
            "Santechnikos planas su išklotinėmis",
            "Santechnikos prietaisų parinktys (žiniaraštis)",
            "Grindų dangų planas",
            "Sienų apdailos planas su išklotinėmis",
            "Lubų planas",
            "Apšvietimo planas su parinktimis",
            "Ventiliacijos taškų pririšimų derinimas su įmone atliekančia šiuos darbus (SVARBU: ventiliacijos taškai įtakoja lubų ir apšvietimo planą)",
          ],
        },
        {
          num: "03",
          title: "Baldų projektas",
          items: [
            "Projektuojami nestandartiniai užsakomi baldai, renkamos apdailos medžiagos.",
            "Renkami standartiniai baldai (kėdės, stalai, kavos staliukai, kilimai, paveikslai, lovos, sofos, užuolaidos, žaliuzės, veidrodžiai, kabyklos ir kt.). Pridedamos nuorodos kur galima įsigyti produktus.",
          ],
        },
        {
          num: "04",
          title: "Autorinė priežiūra",
          items: [
            "Statybų darbų priežiūra atvykstant į vietą ar nuotoliu.",
            "Intensyviai vykstant darbams rekomenduojama 1 vizitas per savaitę.",
            "Visuose projektuose atliekame derinimą su projekte dalyvaujančiais kitais projektuotojais – šildymo, vėdinimo, elektros, santechnikos, kompiuterijos ir kitais specialistais",
            "Autorinė priežiūra apima iškilusių klausimų sprendimą, reikiamų brėžinių paruošimą ir pakomentavimą meistrams.",
          ],
        },
      ],
    },
    contact: {
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
    hero: {
      // ✏️ EDIT: Home — the big line under the INOA wordmark. Translation — please review.
      line: "Meaningful design for the rhythm of human life.",
      // ✏️ EDIT: Home — drawing title above the plan. Translation — please review.
      planTitle: "Plan of one day",
      // ✏️ EDIT: Home — daily rhythm stages (time + caption under the plan). Translation — please review.
      dayparts: [
        { time: "07:00", label: "Morning — kitchen" },
        { time: "13:00", label: "Midday — workspace" },
        { time: "19:00", label: "Evening — living room" },
        { time: "23:00", label: "Night — bedroom" },
      ],
      // ✏️ EDIT: Home — room labels inside the drawing. Translation — please review.
      rooms: {
        kitchen: "Kitchen",
        bath: "Bath",
        desk: "Workspace",
        living: "Living room",
        bedroom: "Bedroom",
      },
      cta: "View projects",
      // ✏️ EDIT: Home — drawing title block (like on real architectural sheets). Translation — please review.
      titleBlock: {
        project: "Interior project",
        place: "Vilnius",
        scale: "Scale 1:100",
        sheet: "Sheet 01 / 01",
      },
    },
    about: {
      title: "About",
      // ✏️ EDIT: About — designer photo description (alt text for screen readers / Google)
      photoAlt: "Interior designer Airė Romaškevičiūtė",
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
    },
    materials: {
      // ✏️ EDIT: Materials — section title and intro. Translation — please review.
      title: "Materials",
      intro: "Samples from the working table — wood, stone and the brand colours that INOA spaces are built from.",
    },
    services: {
      intro: "We work with residential and commercial projects. Every project is individual — from the first consultation to the final result.",
      packageTitle: "FULL INTERIOR PROJECT",
      // ✏️ EDIT: full project stages. Translation — please review.
      stages: [
        {
          num: "01",
          title: "Interior concept",
          items: [
            "Consultation",
            "We get to know your needs, space and budget. We discuss stylistic directions and goals",
            "Interior concept MOODBOARD",
            "2D furniture layout plan",
            "3D model with realistic visualisations",
            "On-site measurement of the space",
          ],
        },
        {
          num: "02",
          title: "Technical working project (TDP)",
          items: [
            "Furniture layout plan",
            "Visualisations",
            "Partition plan",
            "Door specification",
            "Electrical plan with elevations",
            "Plumbing plan with elevations",
            "Plumbing fixture selection (schedule)",
            "Floor finishes plan",
            "Wall finishes plan with elevations",
            "Ceiling plan",
            "Lighting plan with options",
            "Coordination of ventilation point connections with the company carrying out these works (IMPORTANT: ventilation points affect the ceiling and lighting plan)",
          ],
        },
        {
          num: "03",
          title: "Furniture project",
          items: [
            "Design of custom, made-to-order furniture and selection of finishing materials.",
            "Selection of standard furniture (chairs, tables, coffee tables, rugs, artwork, beds, sofas, curtains, blinds, mirrors, coat racks, etc.). Links to where the products can be purchased are included.",
          ],
        },
        {
          num: "04",
          title: "Author's supervision",
          items: [
            "Supervision of construction works on site or remotely.",
            "During intensive works, one visit per week is recommended.",
            "On every project we coordinate with the other designers involved — heating, ventilation, electrical, plumbing, IT and other specialists",
            "Author's supervision covers resolving questions as they arise, preparing the necessary drawings and explaining them to the contractors.",
          ],
        },
      ],
    },
    contact: {
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
   MATERIAL SAMPLES — the "Medžiagos" strip.
   ✏️ EDIT: Each group is one palette of real samples.
   Every "img" is a photograph in public/materials/ —
   to swap a sample replace the jpg or change the path.
   If an img is missing the swatch falls back to its
   base "hex" colour. Keep labelLt/labelEn pairs together.
   Brand book colours: #E8E6E0, #E8ECEC, #E8E2D9, #D0DCE3, #23140B
   ══════════════════════════════════════════════ */
const MATERIALS = [
  {
    id: "wood",
    nameLt: "Medis",
    nameEn: "Wood", // Translation — please review
    swatches: [
      { hex: "#D9C9B2", img: "/materials/wood-light-oak.jpg",   labelLt: "Šviesus ąžuolas",     labelEn: "Light oak" },
      { hex: "#C2A382", img: "/materials/wood-natural-oak.jpg", labelLt: "Natūralus ąžuolas",   labelEn: "Natural oak" },
      { hex: "#A98A62", img: "/materials/wood-panelling.jpg",   labelLt: "Ąžuolo dailylentės",  labelEn: "Oak panelling" },
      { hex: "#5A4130", img: "/materials/wood-smoked-oak.jpg",  labelLt: "Rūkytas ąžuolas",     labelEn: "Smoked oak" },
      { hex: "#3E2B1E", img: "/materials/wood-dark-walnut.jpg", labelLt: "Tamsus riešutmedis",  labelEn: "Dark walnut" },
    ],
  },
  {
    id: "tiles-stone",
    nameLt: "Plytelės ir akmuo",
    nameEn: "Tiles & stone", // Translation — please review
    swatches: [
      { hex: "#CBBCA4", img: "/materials/tile-calce.jpg",       labelLt: "ARTCRAFT Calce",      labelEn: "ARTCRAFT Calce" },
      { hex: "#E3B896", img: "/materials/tile-terracotta.jpg",  labelLt: "Terakotos juostelės", labelEn: "Terracotta fingers" },
      { hex: "#D5CDBD", img: "/materials/tile-pearl-gray.jpg",  labelLt: "Pearl Gray mozaika",  labelEn: "Pearl Gray mosaic" },
      { hex: "#E9E6E1", img: "/materials/stone-arabescato.jpg", labelLt: "Arabescato marmuras", labelEn: "Arabescato marble" },
      { hex: "#BDBBB2", img: "/materials/stone-concrete.jpg",   labelLt: "Betonas",             labelEn: "Raw concrete" },
    ],
  },
  {
    id: "brand-colours",
    nameLt: "Spalvų palyginimas",
    nameEn: "Colour comparison", // Translation — please review
    swatches: [
      { hex: "#E8E6E0", labelLt: "Šilta balta",  labelEn: "Warm white" },
      { hex: "#E8ECEC", labelLt: "Vėsi balta",   labelEn: "Cool white" },
      { hex: "#E8E2D9", labelLt: "Popierius",    labelEn: "Paper" },
      { hex: "#D0DCE3", labelLt: "Rūko mėlyna",  labelEn: "Mist blue" },
      { hex: "#23140B", labelLt: "Tamsi ruda",   labelEn: "Dark umber" },
    ],
  },
];

/* ══════════════════════════════════════════════
   PAPER GRAIN — fine procedural noise laid over the
   whole site so everything sits on paper (brand book
   texture reference). No image file needed.
   ══════════════════════════════════════════════ */
const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")";

/* ══════════════════════════════════════════════
   FLOOR PLAN OF ONE DAY — the signature animation.

   An apartment plan draws itself on the sheet, line by
   line, like ink from a pen. Then a patch of daylight
   travels through the home on a looped day: 07:00 the
   kitchen, 13:00 the workspace, 19:00 the living room,
   23:00 the bedroom. The room in use brightens; the rest
   of the plan waits in half-tone. It is INOA's idea drawn
   literally — the space follows the rhythm of a person's
   day, not the other way around.

   Respects prefers-reduced-motion: the plan appears
   already drawn and the light rests on the living room.
   ══════════════════════════════════════════════ */

/* Where the daylight settles for each part of the day
   (kitchen table, desk, sofa, bed — plan coordinates) */
const DAY_STATIONS = [
  { x: 175, y: 138 },
  { x: 388, y: 252 },
  { x: 190, y: 338 },
  { x: 608, y: 352 },
];

const DAY_SEGMENT_MS = 6000; // one part of the day

/* Ink-on animation for one plan stroke */
function inkStroke(order, reduce) {
  if (reduce) return { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } };
  const delay = 0.2 + order * 0.09;
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 0.8, ease: "easeInOut" },
        opacity: { delay, duration: 0.01 },
      },
    },
  };
}

/* Late fade-in for text and dimension labels on the sheet */
function inkFade(delay, reduce) {
  if (reduce) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return { initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay, duration: 0.8 } } };
}

function FloorPlanDay({ t }) {
  const reduce = useReducedMotion();
  /* Reduced motion: hold the evening (living room) frame */
  const [day, setDay] = useState(reduce ? 2 : 0);
  /* This component renders twice (desktop + mobile layouts are both
     in the DOM) — the gradient id must be unique per instance, or
     url(#…) resolves into the hidden copy and the light won't paint. */
  const gradientId = `${useId().replace(/:/g, "")}-daylight`;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setDay((d) => (d + 1) % 4), DAY_SEGMENT_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const station = DAY_STATIONS[day];
  const rooms = t.hero.rooms;

  /* Room furniture groups keyed by daypart: 0 kitchen (+bath),
     1 workspace, 2 living, 3 bedroom. Inactive rooms rest in half-tone. */
  const roomOpacity = (i) => (day === i ? 1 : 0.38);

  const INK = "#23140B";
  const HALF = "#978A7E";

  return (
    <div className="w-full h-full flex flex-col">
      {/* Drawing title, like the label above a plan on a real sheet */}
      <motion.p {...inkFade(0.1, reduce)}
        className="text-[10px] tracking-[0.4em] uppercase text-[#978A7E] mb-3 text-center">
        {t.hero.planTitle}
      </motion.p>

      <div className="relative flex-1 min-h-0">
        <svg viewBox="0 0 720 520" className="w-full h-full" role="img" aria-label={t.hero.planTitle}
          style={{ overflow: "visible" }}>
          <defs>
            <radialGradient id={gradientId}>
              {/* Warm daylight — intentional exception to the six UI colours,
                  same warm-light value the brand's shadow reference uses */}
              <stop offset="0%"  stopColor="#F6EFE1" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#F6EFE1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F6EFE1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Daylight patch, travelling through the home ──
              cx/cy are animated as SVG attributes (viewBox units);
              transform-based x/y on SVG groups is unreliable. */}
          <motion.circle r="92" fill={`url(#${gradientId})`}
            initial={reduce
              ? { cx: station.x, cy: station.y, opacity: 1 }
              : { cx: DAY_STATIONS[0].x, cy: DAY_STATIONS[0].y, opacity: 0 }}
            animate={{ cx: station.x, cy: station.y, opacity: 1 }}
            transition={reduce ? { duration: 0 } : {
              cx: { duration: 2.4, ease: "easeInOut" },
              cy: { duration: 2.4, ease: "easeInOut" },
              opacity: { delay: 3.2, duration: 1.2 },
            }} />

          {/* ── Walls ── */}
          <g stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="square">
            {/* Outer wall */}
            <motion.path d="M40 40 H680 V480 H40 Z" {...inkStroke(0, reduce)} />
            {/* Kitchen wall with door opening */}
            <motion.path d="M40 210 H240" {...inkStroke(2, reduce)} strokeWidth="2" />
            {/* Bath walls with door opening */}
            <motion.path d="M540 40 V110 M540 160 V190 M540 190 H680" {...inkStroke(3, reduce)} strokeWidth="2" />
            {/* Bedroom walls with door opening */}
            <motion.path d="M430 190 H540 M430 190 V370 M430 430 V480" {...inkStroke(4, reduce)} strokeWidth="2" />
          </g>

          {/* ── Doors (leaf + swing arc, drawn like on a real plan) ── */}
          <g stroke={HALF} strokeWidth="1.2" fill="none">
            {/* Entry door, bottom wall */}
            <motion.path d="M250 480 V412" {...inkStroke(6, reduce)} />
            <motion.path d="M250 412 A68 68 0 0 1 318 480" {...inkStroke(6, reduce)} />
            {/* Bedroom door */}
            <motion.path d="M430 430 H372" {...inkStroke(7, reduce)} />
            <motion.path d="M372 430 A58 58 0 0 1 430 372" {...inkStroke(7, reduce)} />
            {/* Bath door */}
            <motion.path d="M540 110 L492 110" {...inkStroke(8, reduce)} />
            <motion.path d="M492 110 A48 48 0 0 1 540 158" {...inkStroke(8, reduce)} />
          </g>

          {/* ── Kitchen + bath (morning) ── */}
          <motion.g animate={{ opacity: roomOpacity(0) }} transition={{ duration: 1.2 }}
            stroke={INK} strokeWidth="1.4" fill="none">
            {/* Counter along the top wall */}
            <motion.rect x="50" y="50" width="250" height="42" {...inkStroke(9, reduce)} />
            {/* Sink */}
            <motion.rect x="118" y="58" width="42" height="26" rx="5" {...inkStroke(10, reduce)} />
            {/* Hob rings */}
            <motion.circle cx="228" cy="71" r="8" {...inkStroke(11, reduce)} />
            <motion.circle cx="258" cy="71" r="8" {...inkStroke(11, reduce)} />
            {/* Round dining table + chairs */}
            <motion.circle cx="175" cy="150" r="30" {...inkStroke(12, reduce)} />
            <motion.circle cx="128" cy="150" r="9" {...inkStroke(13, reduce)} />
            <motion.circle cx="222" cy="150" r="9" {...inkStroke(13, reduce)} />
            <motion.circle cx="175" cy="103" r="9" {...inkStroke(13, reduce)} />
            {/* Bath tub */}
            <motion.rect x="556" y="54" width="112" height="46" rx="22" {...inkStroke(14, reduce)} />
            <motion.rect x="566" y="62" width="92" height="30" rx="15" {...inkStroke(15, reduce)} strokeWidth="1" />
            {/* Basin */}
            <motion.circle cx="652" cy="152" r="14" {...inkStroke(16, reduce)} />
          </motion.g>

          {/* ── Workspace (midday) ── */}
          <motion.g animate={{ opacity: roomOpacity(1) }} transition={{ duration: 1.2 }}
            stroke={INK} strokeWidth="1.4" fill="none">
            {/* Desk */}
            <motion.rect x="348" y="228" width="84" height="36" rx="2" {...inkStroke(17, reduce)} />
            {/* Task lamp */}
            <motion.circle cx="362" cy="240" r="5" {...inkStroke(18, reduce)} />
            {/* Chair */}
            <motion.circle cx="390" cy="290" r="12" {...inkStroke(18, reduce)} />
          </motion.g>

          {/* ── Living room (evening) ── */}
          <motion.g animate={{ opacity: roomOpacity(2) }} transition={{ duration: 1.2 }}
            stroke={INK} strokeWidth="1.4" fill="none">
            {/* Rug */}
            <motion.rect x="78" y="292" width="268" height="104" rx="2"
              strokeDasharray="3 7" strokeWidth="1" {...inkStroke(19, reduce)} />
            {/* Sofa */}
            <motion.rect x="92" y="308" width="168" height="56" rx="10" {...inkStroke(20, reduce)} />
            <motion.path d="M148 308 V364 M204 308 V364" {...inkStroke(21, reduce)} strokeWidth="1" />
            {/* Coffee table */}
            <motion.circle cx="304" cy="336" r="25" {...inkStroke(22, reduce)} />
            {/* Plant in the corner */}
            <motion.circle cx="66" cy="454" r="13" {...inkStroke(23, reduce)} />
            <motion.path d="M66 454 L58 440 M66 454 L74 439 M66 454 L66 436" {...inkStroke(23, reduce)} strokeWidth="1" />
          </motion.g>

          {/* ── Bedroom (night) ── */}
          <motion.g animate={{ opacity: roomOpacity(3) }} transition={{ duration: 1.2 }}
            stroke={INK} strokeWidth="1.4" fill="none">
            {/* Wardrobe */}
            <motion.rect x="446" y="202" width="86" height="30" {...inkStroke(24, reduce)} />
            <motion.path d="M446 217 H532" {...inkStroke(24, reduce)} strokeWidth="1" />
            {/* Bed, head against the right wall */}
            <motion.rect x="548" y="282" width="122" height="150" rx="4" {...inkStroke(25, reduce)} />
            <motion.rect x="630" y="292" width="32" height="28" rx="5" {...inkStroke(26, reduce)} strokeWidth="1" />
            <motion.rect x="630" y="394" width="32" height="28" rx="5" {...inkStroke(26, reduce)} strokeWidth="1" />
            <motion.path d="M612 282 V432" {...inkStroke(26, reduce)} strokeWidth="1" />
            {/* Nightstand */}
            <motion.rect x="510" y="286" width="26" height="26" {...inkStroke(27, reduce)} strokeWidth="1" />
          </motion.g>

          {/* ── Room labels ── */}
          <motion.g {...inkFade(2.2, reduce)}
            fill={HALF} fontSize="9.5" letterSpacing="2.5" textAnchor="middle"
            style={{ textTransform: "uppercase", fontFamily: "inherit" }}>
            <text x="175" y="198">{rooms.kitchen}</text>
            <text x="610" y="128">{rooms.bath}</text>
            <text x="390" y="322">{rooms.desk}</text>
            <text x="176" y="392">{rooms.living}</text>
            <text x="556" y="462">{rooms.bedroom}</text>
          </motion.g>

          {/* ── Dimension lines, the surveyor's touch ── */}
          <g stroke={HALF} strokeWidth="1">
            <motion.path d="M40 18 V30 M40 24 H680 M680 18 V30" {...inkStroke(28, reduce)} />
            <motion.path d="M18 40 H30 M24 40 V480 M18 480 H30" {...inkStroke(28, reduce)} />
          </g>
          <motion.g {...inkFade(2.6, reduce)} fill={HALF} fontSize="9" letterSpacing="1.5">
            <text x="352" y="14" textAnchor="middle">6.40</text>
            <text x="12" y="264" textAnchor="middle" transform="rotate(-90 12 264)">4.40</text>
          </motion.g>
        </svg>
      </div>

      {/* Day caption — the clock beneath the plan */}
      <div className="h-6 mt-3 flex items-center justify-center overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={day}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#6A584C]">
            <span className="text-[#23140B]">{t.hero.dayparts[day].time}</span>
            <span className="mx-3 text-[#978A7E]">·</span>
            {t.hero.dayparts[day].label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TITLE BLOCK — the stamped corner table every real
   architectural sheet carries. Quiet wayfinding that
   tells you whose drawing this is.
   ══════════════════════════════════════════════ */
function TitleBlock({ t, className = "" }) {
  const b = t.hero.titleBlock;
  const cells = [
    `INOA — ${t.tagline}`,
    b.project,
    b.place,
    b.scale,
    b.sheet,
  ];
  return (
    <div className={`border-t border-[#23140B]/25 ${className}`}>
      <div className="flex flex-wrap">
        {cells.map((c, i) => (
          <p key={i}
            className={`text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#6A584C] px-4 md:px-6 py-3 ${i > 0 ? "border-l border-[#23140B]/15" : ""}`}>
            {c}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   STAGE MARK — the circled detail callout architects
   put on drawings: stage number above the line, the
   total sheet count below.
   ══════════════════════════════════════════════ */
function StageMark({ num, total = "04" }) {
  return (
    <svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true" className="flex-shrink-0">
      <circle cx="22" cy="22" r="20" fill="none" stroke="#23140B" strokeWidth="1.2" />
      <line x1="6" y1="22" x2="38" y2="22" stroke="#23140B" strokeWidth="1" />
      <text x="22" y="18" textAnchor="middle" fontSize="11" fill="#23140B" fontWeight="700" letterSpacing="1">{num}</text>
      <text x="22" y="34" textAnchor="middle" fontSize="8.5" fill="#978A7E" letterSpacing="1">{total}</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   MATERIAL STRIP — samples laid out on the table.
   ══════════════════════════════════════════════ */
function MaterialStrip({ lang, t }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.4em] text-[#978A7E] uppercase mb-2">{t.materials.title}</p>
      {/* ✏️ EDIT: materials intro in T object above */}
      <p className="text-[#6A584C] text-sm mb-10 max-w-xl">{t.materials.intro}</p>
      <div className="space-y-10">
        {MATERIALS.map((group) => (
          <div key={group.id}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#6A584C] mb-4">
              {lang === "lt" ? group.nameLt : group.nameEn}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 md:overflow-visible">
              {group.swatches.map((s) => (
                <figure key={s.labelEn} className="flex-shrink-0 w-24 md:w-auto md:flex-1">
                  <div className="aspect-square w-full border border-[#23140B]/10"
                    style={{ backgroundColor: s.hex }}>
                    {s.img && (
                      <img src={s.img} alt={lang === "lt" ? s.labelLt : s.labelEn}
                        loading="lazy" decoding="async"
                        className="w-full h-full object-cover" />
                    )}
                  </div>
                  <figcaption className="text-[9px] tracking-[0.15em] uppercase text-[#978A7E] mt-2 leading-relaxed">
                    {lang === "lt" ? s.labelLt : s.labelEn}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SHARED SECTION WRAPPER (mobile scroll)
   ══════════════════════════════════════════════ */
function Section({ id, title, num, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-6 py-24"
    >
      {num && <p className="text-[10px] tracking-[0.4em] text-[#978A7E] mb-2">{num}</p>}
      {title && <h2 className="text-3xl font-bold tracking-tight mb-6">{title}</h2>}
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
function ProjectDetail({ project, onBack, t, lang, index }) {
  const title = lang === "lt" ? project.titleLt : project.titleEn;
  const desc  = lang === "lt" ? project.descLt  : project.descEn;
  const num   = String(index + 1).padStart(2, "0");
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
      <div className="px-6 md:px-10 pb-6 flex items-baseline gap-4 border-b border-[#23140B]/15">
        <p className="text-[11px] tracking-[0.2em] text-[#978A7E]">P.{num}</p>
        <div className="pb-2">
          <p className="text-[10px] tracking-[0.3em] text-[#978A7E] mb-1">{lang === "lt" ? project.categoryLt : project.categoryEn}</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2 pt-2">
        {project.gallery.map((img, i) => (
          <div key={i} className={`overflow-hidden ${project.gallery.length === 1 ? "md:col-span-2" : ""}`}>
            <img src={img} alt={`${title} ${i + 1}`} loading="lazy" decoding="async"
              className="w-full h-[60vw] md:h-[52vh] object-cover" />
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
   MOBILE PROJECTS — snap-scroll strip; the drafting
   caption sits under each photo like a plate label.
   First tap raises the card, second tap opens it.
   ══════════════════════════════════════════════ */
function MobileProjects({ projects, onSelect, lang, t }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleTap = (i) => {
    if (activeIndex === i) onSelect(projects[i]);
    else setActiveIndex(i);
  };
  return (
    <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
      {projects.map((project, i) => (
        <div key={project.id}
          className="relative flex-shrink-0 w-[72vw] snap-start cursor-pointer"
          onClick={() => handleTap(i)}
        >
          <div className="relative overflow-hidden">
            <img src={project.image}
              alt={lang === "lt" ? project.titleLt : project.titleEn}
              loading="lazy" decoding="async"
              className={`w-full h-[90vw] object-cover transition-transform duration-700 ${activeIndex === i ? "scale-105" : "scale-100"}`} />
            <div className={`absolute inset-0 bg-[#23140B]/45 flex flex-col justify-end p-4 text-[#E8E6E0] transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}>
              <p className="text-[10px] opacity-70">{lang === "lt" ? project.categoryLt : project.categoryEn}</p>
              <p className="text-sm mb-1">{lang === "lt" ? project.titleLt : project.titleEn}</p>
              <p className="text-[10px] opacity-60 tracking-wide">{t.project.tapAgain} →</p>
            </div>
          </div>
          {/* Plate label under the photo */}
          <div className="flex items-baseline gap-3 pt-3 border-t border-[#23140B]/15 mt-3">
            <p className="text-[10px] tracking-[0.2em] text-[#978A7E]">P.{String(i + 1).padStart(2, "0")}</p>
            <p className="text-xs tracking-wide">{lang === "lt" ? project.titleLt : project.titleEn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   DESKTOP PAGES
   ══════════════════════════════════════════════ */

function DesktopHome({ t, onCta }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      className="h-full relative"
    >
      {/* Drafting sheet frame */}
      <div aria-hidden="true" className="absolute inset-4 border border-[#23140B]/20 pointer-events-none" />

      <div className="h-full flex flex-col pt-[88px] px-14 lg:px-20 pb-4">
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-10 items-center">
          {/* Left — the studio's name and its idea */}
          <div className="col-span-5">
            <h1 className="font-bold tracking-[0.28em] text-[#23140B] leading-none select-none"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}>
              INOA
            </h1>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#978A7E] mt-4">{t.tagline}</p>
            {/* ✏️ EDIT: hero line in T object above */}
            <p className="text-[#6A584C] text-lg lg:text-xl leading-relaxed mt-10 max-w-sm">
              {t.hero.line}
            </p>
            <button onClick={onCta}
              className="mt-10 text-sm tracking-[0.15em] border-b border-[#23140B] pb-1 hover:opacity-60 transition-opacity">
              {t.hero.cta} →
            </button>
          </div>

          {/* Right — the plan of one day, drawing itself */}
          <div className="col-span-7 h-full min-h-0 py-4">
            <FloorPlanDay t={t} />
          </div>
        </div>

        {/* The sheet's title block */}
        <TitleBlock t={t} className="mx-2" />
      </div>
    </motion.div>
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
            <img src="/designer.jpeg" alt={a.photoAlt}
              className="w-full h-full object-cover object-center" />
          </div>
        </div>

        {/* Right side — scrolling text */}
        <div className="w-1/2 px-12 lg:px-16 pt-[110px] pb-24 flex flex-col gap-16">
          {/* Mano istorija */}
          <div>
            {/* ✏️ EDIT: story title + paragraphs in T object above */}
            <h2 className="text-2xl font-bold tracking-tight mb-8">{a.storyTitle}</h2>
            <div className="text-[#6A584C] text-base leading-relaxed space-y-4">
              {a.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* INOA filosofija */}
          <div>
            {/* ✏️ EDIT: philosophy title + intro + paragraphs in T object above */}
            <h2 className="text-2xl font-bold tracking-tight mb-8">{a.philosophyTitle}</h2>
            <p className="text-[#23140B] text-lg font-bold leading-relaxed mb-6">{a.philosophyIntro}</p>
            <div className="text-[#6A584C] text-base leading-relaxed space-y-4">
              {a.philosophy.map((p, i) => <p key={i}>{p}</p>)}
            </div>
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
      <div className="px-10 lg:px-14 pt-10 pb-10 border-b border-[#23140B]/15">
        <h2 className="text-4xl font-bold tracking-tight">{t.nav.projects}</h2>
      </div>

      {/* Editorial rows — two plates per row, widths alternating,
          the second plate set lower for rhythm */}
      <div className="px-10 lg:px-14 pt-14 pb-20 space-y-20">
        {Array.from({ length: Math.ceil(projects.length / 2) }, (_, row) => {
          const a = projects[row * 2];
          const b = projects[row * 2 + 1];
          const wide = row % 2 === 0;
          return (
            <div key={a.id} className="grid grid-cols-12 gap-10">
              <ProjectPlate project={a} index={row * 2} onSelect={onSelect} lang={lang} t={t}
                className={wide ? "col-span-7" : "col-span-5"} />
              {b && (
                <ProjectPlate project={b} index={row * 2 + 1} onSelect={onSelect} lang={lang} t={t}
                  className={`${wide ? "col-span-5" : "col-span-7"} mt-24`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Samples from the table */}
      <div className="px-10 lg:px-14 pb-32 border-t border-[#23140B]/15 pt-14">
        <MaterialStrip lang={lang} t={t} />
      </div>
    </motion.div>
  );
}

/* One project "plate" — photo above, drafting label below */
function ProjectPlate({ project, index, onSelect, lang, t, className = "" }) {
  const title = lang === "lt" ? project.titleLt : project.titleEn;
  const cat   = lang === "lt" ? project.categoryLt : project.categoryEn;
  return (
    <div className={`group cursor-pointer ${className}`} onClick={() => onSelect(project)}>
      <div className="overflow-hidden">
        <img src={project.image} alt={title} loading="lazy" decoding="async"
          className="w-full h-[52vh] object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex items-baseline justify-between pt-4 mt-4 border-t border-[#23140B]/15">
        <div className="flex items-baseline gap-4">
          <p className="text-[11px] tracking-[0.2em] text-[#978A7E]">P.{String(index + 1).padStart(2, "0")}</p>
          <div>
            <p className="text-base font-bold tracking-tight">{title}</p>
            <p className="text-[10px] tracking-[0.25em] text-[#978A7E] mt-1">{cat}</p>
          </div>
        </div>
        <p className="text-xs text-[#6A584C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wide">
          {t.project.viewProject} →
        </p>
      </div>
    </div>
  );
}

function DesktopServices({ t }) {
  const s = t.services;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-10 w-full"
    >
      {/* ✏️ EDIT: services intro in T object above */}
      <p className="text-[#6A584C] text-sm pt-8 mb-10 max-w-xl">{s.intro}</p>

      {/* Full interior project package */}
      {/* ✏️ EDIT: package title + stages in T object above */}
      <p className="text-xs tracking-[0.3em] text-[#23140B] font-bold mb-10">{s.packageTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12 pb-16">
        {s.stages.map((stage) => (
          <div key={stage.num} className="flex gap-6">
            {/* The circled callout, like a detail reference on a drawing */}
            <StageMark num={stage.num} />
            <div>
              <h3 className="text-base font-bold tracking-tight mb-4 mt-2">{stage.title}</h3>
              <ul className="space-y-2">
                {stage.items.map((it, i) => (
                  <li key={i} className="text-xs text-[#6A584C] leading-relaxed flex gap-2">
                    <span className="text-[#978A7E] flex-shrink-0">—</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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
      {/* Left — contact info (top) + full-bleed photo (bottom). Fixed height, no scroll. */}
      <div className="w-1/2 flex flex-col border-r border-[#23140B]/15 overflow-hidden">
        <div className="flex-shrink-0 px-16 pt-8">
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

        {/* Photo — fills the bottom of the left half, edge to edge, down to the page bottom */}
        {/* ✏️ EDIT: contact photo is at public/kontaktai.jpeg */}
        <div className="flex-1 min-h-0 pt-10">
          <img src="/kontaktai.jpeg" alt=""
            className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right — form. The intro line sits above it, in place of the old "Parašykite mums" label. */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-16">
        {/* ✏️ EDIT: contact intro in T object above */}
        <p className="text-[#6A584C] text-sm leading-relaxed mb-8 max-w-md">{c.intro}</p>
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

  const t = T[lang];

  /* ── Keep <html lang> in sync with the language toggle (SEO + screen readers) ── */
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

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
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  /* ── Send form ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Until real EmailJS keys are in place, fall back to the visitor's own
       mail app instead of showing an error. This branch disables itself
       automatically once YOUR_PUBLIC_KEY is replaced with a real key. */
    if (!window.emailjs || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      window.location.href =
        `mailto:${t.contact.email}` +
        `?subject=${encodeURIComponent("INOA — " + formState.name)}` +
        `&body=${encodeURIComponent(formState.message + "\n\n" + formState.name + " · " + formState.email)}`;
      return;
    }
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

  /* ── Mobile: start project detail at the top (page swap otherwise keeps the old scroll position) ── */
  useEffect(() => { if (selectedProject) window.scrollTo(0, 0); }, [selectedProject]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setDesktopPage("project-detail");
  };
  const handleBackToProjects = () => {
    setSelectedProject(null);
    setDesktopPage("projects");
  };

  const selectedIndex = selectedProject ? PROJECTS.findIndex((p) => p.id === selectedProject.id) : -1;

  const desktopMenuItems = [
    { key: "home",     label: t.nav.home },
    { key: "about",    label: t.nav.about },
    { key: "projects", label: t.nav.projects },
    { key: "services", label: t.nav.services },
    { key: "contact",  label: t.nav.contact },
  ];

  const mobileMenuLinks = [
    { label: t.nav.home,      href: "#" },
    { label: t.nav.about,     href: "#about" },
    { label: t.nav.projects,  href: "#projects" },
    { label: t.nav.services,  href: "#services" },
    { label: t.nav.contact,   href: "#contact" },
  ];

  const activePage = desktopPage === "project-detail" ? "projects" : desktopPage;

  /* ────────────────────────────────────────────── */
  return (
    <div className="bg-[#E8E6E0] text-[#23140B] [overflow-x:clip]"
      style={{ backgroundImage: PAPER_GRAIN }}>
      {/* Subtle paper texture over the brand background — see inoa_paper reference */}

      {/* ── SHARED HEADER ── */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-50 backdrop-blur bg-[#ECEAE4]/70 border-b border-[#23140B]/10">
        <a href="#" onClick={(e) => { e.preventDefault(); setDesktopPage("home"); setSelectedProject(null); }}>
          <img src="/logo.png" alt="INOA" className="h-12 md:h-14" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-10 text-sm lg:text-base font-normal tracking-[0.1em]">
            {desktopMenuItems.map((item) => (
              <button key={item.key}
                onClick={() => { setDesktopPage(item.key); setSelectedProject(null); }}
                className={`relative hover:opacity-60 transition-opacity duration-300 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1.5 after:h-px after:bg-[#23140B] after:transition-all after:duration-300 ${activePage === item.key ? "after:w-5" : "after:w-0"}`}>
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
            className="fixed inset-0 bg-[#23140B]/90 backdrop-blur-md flex flex-col justify-center items-center gap-6 z-50"
          >
            <button className="absolute top-6 right-6 text-[#E8E6E0] p-1" aria-label="Close menu"
              onClick={() => setMenuOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="19" y1="1" x2="1"  y2="19" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            {mobileMenuLinks.map((item) => (
              <a key={item.label} href={item.href}
                onClick={(e) => {
                  /* If a project detail is open, the anchor targets aren't mounted —
                     close the detail first, then scroll once the sections render. */
                  e.preventDefault();
                  setMenuOpen(false);
                  setSelectedProject(null);
                  const id = item.href.replace("#", "");
                  setTimeout(() => {
                    if (!id) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }, 60);
                }}
                className="text-[#E8E6E0] text-2xl font-normal tracking-wide">
                {item.label}
              </a>
            ))}
            <div className="flex gap-4 text-[#E8E6E0] text-sm tracking-[0.15em] mt-2">
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
        {/* Pages that should stay clear of the header carry their own pt-[72px];
            the home hero manages its own spacing inside the sheet frame. */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">

            {desktopPage === "home" && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <DesktopHome t={t} onCta={() => setDesktopPage("projects")} />
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
                <ProjectDetail project={selectedProject} onBack={handleBackToProjects} t={t} lang={lang} index={selectedIndex} />
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

          {/* Vertical page label — quiet wayfinding on the right edge,
              a nod to Japanese vertical typesetting */}
          {activePage !== "home" && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#978A7E] [writing-mode:vertical-rl]">
                {{ about: t.nav.about, projects: t.nav.projects, services: t.nav.services, contact: t.nav.contact }[activePage]}
              </p>
            </div>
          )}
        </div>
        {/* No footer */}
      </div>

      {/* ════════════════════════════════════════════
          MOBILE — single scrollable page
          ════════════════════════════════════════════ */}
      <div className="md:hidden">

        {selectedProject ? (
          <div className="pt-[72px]">
            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} t={t} lang={lang} index={selectedIndex} />
          </div>
        ) : (
          <>
            {/* Hero — the plan of one day, in-flow, sized to the
                visible screen (100svh); the page scrolls past it */}
            <section className="h-[100svh] w-full relative overflow-hidden flex flex-col px-6 pt-[88px] pb-8">
              {/* Drafting sheet frame */}
              <div aria-hidden="true" className="absolute inset-3 border border-[#23140B]/20 pointer-events-none" />

              <div className="text-center mt-2">
                <h1 className="font-bold tracking-[0.3em] pl-[0.3em] text-[#23140B] leading-none text-5xl select-none">INOA</h1>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#978A7E] mt-3">{t.tagline}</p>
              </div>

              <div className="flex-1 min-h-0 py-6">
                <FloorPlanDay t={t} />
              </div>

              {/* ✏️ EDIT: hero line in T object above */}
              <p className="text-[#6A584C] text-sm leading-relaxed text-center max-w-xs mx-auto">
                {t.hero.line}
              </p>
            </section>

            {/* About */}
            <motion.section id="about"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto px-6 py-24">
              {/* Designer photo — full image visible on mobile */}
              {/* ✏️ EDIT: designer photo is at public/designer.jpeg */}
              <div className="w-full overflow-hidden mb-10">
                <img src="/designer.jpeg" alt={t.about.photoAlt} className="w-full h-auto object-contain" />
              </div>

              {/* Mano istorija */}
              {/* ✏️ EDIT: story title + paragraphs in T object above */}
              <h2 className="text-xl font-bold tracking-tight mb-6">{t.about.storyTitle}</h2>
              <div className="text-[#6A584C] text-sm leading-relaxed space-y-4 mb-12">
                {t.about.story.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* INOA filosofija */}
              {/* ✏️ EDIT: philosophy title + intro + paragraphs in T object above */}
              <h2 className="text-xl font-bold tracking-tight mb-6">{t.about.philosophyTitle}</h2>
              <p className="text-[#23140B] text-base font-bold leading-relaxed mb-5">{t.about.philosophyIntro}</p>
              <div className="text-[#6A584C] text-sm leading-relaxed space-y-4">
                {t.about.philosophy.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.section>

            {/* Projects */}
            <section id="projects" className="py-24">
              <div className="px-6 mb-10">
                <h2 className="text-3xl font-bold tracking-tight">{t.nav.projects}</h2>
              </div>
              <MobileProjects projects={PROJECTS} onSelect={(p) => setSelectedProject(p)} lang={lang} t={t} />

              {/* Samples from the table */}
              <div className="px-6 mt-20 border-t border-[#23140B]/15 pt-12">
                <MaterialStrip lang={lang} t={t} />
              </div>
            </section>

            {/* Services */}
            <Section id="services">
              <p className="text-[#6A584C] text-sm mb-10">{t.services.intro}</p>

              {/* Full interior project package */}
              {/* ✏️ EDIT: package title + stages in T object above */}
              <p className="text-xs tracking-[0.3em] text-[#23140B] font-bold mb-10">{t.services.packageTitle}</p>
              <div className="space-y-12">
                {t.services.stages.map((stage) => (
                  <div key={stage.num} className="flex gap-5">
                    <StageMark num={stage.num} />
                    <div>
                      <h3 className="text-sm font-bold tracking-tight mb-3 mt-2">{stage.title}</h3>
                      <ul className="space-y-2">
                        {stage.items.map((it, i) => (
                          <li key={i} className="text-xs text-[#6A584C] leading-relaxed flex gap-2">
                            <span className="text-[#978A7E] flex-shrink-0">—</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Contact */}
            <Section id="contact">
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

              {/* Form — the intro line sits above it, in place of the old "Parašykite mums" label */}
              {/* ✏️ EDIT: contact intro in T object above */}
              <p className="text-[#6A584C] text-sm leading-relaxed mb-6">{t.contact.intro}</p>
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

              {/* The sheet signs off — same title block as the drawing */}
              <TitleBlock t={t} className="mt-20" />
            </Section>
          </>
        )}
      </div>

      <SpeedInsights />
    </div>
  );
}
