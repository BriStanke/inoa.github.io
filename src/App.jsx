import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* SECTION */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-6 md:px-10 py-24"
    >
      <h2 className="text-2xl md:text-3xl font-medium mb-6">
        {title}
      </h2>

      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {children}
      </p>
    </motion.section>
  );
}

export default function InteriorPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  useEffect(() => {
    if (!window.Lenis) return;

    const lenis = new window.Lenis({ lerp: 0.08, smooth: true });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const menuItems = [
    { name: "Pagrindinis", link: "#" },
    { name: "Apie", link: "#about" },
    { name: "Projektai", link: "#projects" },
    { name: "Siųsti užklausą", link: "#contact" },
  ];

  return (
    <div className="bg-[#F7F3F0] text-black overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 z-50 backdrop-blur bg-[#F4F2EE]/70">

        <img src="/logo.png" alt="INOA" className="h-12 md:h-14" />

        {/* DESKTOP MENU (FIXED) */}
        <nav className="hidden md:flex gap-12 text-base tracking-[0.2em] uppercase">
          {menuItems.map((item) => (
            <a key={item.name} href={item.link} className="hover:opacity-60">
              {item.name}
            </a>
          ))}
        </nav>

        {/* MOBILE BURGER */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-xl">
          ☰
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-center items-center gap-8 z-50"
          >
            <button
              className="absolute top-6 right-6 text-2xl text-white"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="h-screen w-full relative overflow-hidden">
        <motion.img
          src="/main.jpeg"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* ABOUT */}
      <Section id="about" title="Apie">
        Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo.
      </Section>

      {/* PROJECTS */}
      <section id="projects" className="py-24">

        <div className="max-w-4xl mx-auto px-6 md:px-10 mb-10">
          <h2 className="text-2xl md:text-3xl font-medium">
            Projektai
          </h2>
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden gap-5 overflow-x-auto px-6 pb-6">
          {projects.map((project) => (
            <div key={project.title} className="min-w-[200px]">
              <div className="relative group overflow-hidden">

                <img
                  src={project.image}
                  className="w-full h-[260px] object-cover"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 text-white">
                  <p className="text-[11px] opacity-70">
                    {project.category}
                  </p>
                  <p className="text-sm">
                    {project.title}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP → 3x2 FULL WIDTH */}
        <div className="hidden md:grid grid-cols-3 gap-6 px-10 max-w-[1400px] mx-auto">
          {projects.map((project) => (
            <div key={project.title} className="relative group overflow-hidden">

              <img
                src={project.image}
                className="w-full h-[420px] object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white">
                <p className="text-xs opacity-70">
                  {project.category}
                </p>
                <p className="text-base">
                  {project.title}
                </p>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* CONTACT */}
      <Section id="contact" title="Siųsti užklausą">
        <form className="flex flex-col gap-5 max-w-md mt-6">

          <input
            type="text"
            placeholder="Vardas"
            className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none"
          />

          <input
            type="email"
            placeholder="El. paštas"
            className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none"
          />

          <textarea
            placeholder="Žinutė"
            rows="4"
            className="border-b border-gray-300 bg-transparent py-2 text-sm outline-none"
          />

          <button className="text-sm mt-4 hover:opacity-60">
            Siųsti →
          </button>

        </form>
      </Section>

      {/* FULL FOOTER (RESTORED) */}
      <footer className="bg-[#F7F3F0] text-black px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="tracking-[0.25em] text-sm font-light">
            INOA STUDIO
            <p className="mt-4 text-xs text-gray-500 tracking-normal">
              Minimal interior design studio.
            </p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">LOCATION</p>
            <p className="text-gray-600">London, UK</p>
            <p className="text-gray-600">Available worldwide</p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">CONTACT</p>
            <p className="text-gray-600">hello@inoa.com</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-300 text-[10px] md:text-xs text-gray-400 flex justify-between tracking-[0.2em]">
          <span>© 2026 INOA. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

    </div>
  );
}

/* DATA */
const projects = [
  {
    title: "Vonios erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr6-2.xx.fbcdn.net/v/t51.82787-15/572029684_17867818608467882_4230653201519751878_n.jpg",
  },
  {
    title: "Virtuvės erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/529774988_122135004752844125_1346394103216306535_n.jpg",
  },
  {
    title: "Miegamojo erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/530767501_122135004878844125_8217486174292026629_n.jpg",
  },
  {
    title: "Vonios erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/547294817_122145991310844125_1441440643202851374_n.jpg",
  },
];
