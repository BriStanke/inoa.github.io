import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function InteriorPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  // Smooth scroll
  useEffect(() => {
    if (!window.Lenis) return;

    const lenis = new window.Lenis({
      lerp: 0.08,
      smooth: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const menuItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="bg-[#f4f2ee] text-black font-sans overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 md:py-6 z-50 backdrop-blur bg-[#f4f2ee]/70">
        <div className="tracking-[0.2em] text-sm font-serif">
          MA SPACE
        </div>

        <button onClick={() => setMenuOpen(true)} className="text-2xl">
          ☰
        </button>
      </header>

      {/* MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex flex-col justify-center items-center gap-10 z-50"
          >
            <button
              className="absolute top-6 right-6 text-2xl text-white"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-white text-3xl tracking-widest"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">

        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[55%] max-w-[700px] object-cover"
        />

        {/* Vertical text */}
        <div
          className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-xs tracking-[0.4em] text-gray-500"
          style={{ writingMode: "vertical-rl" }}
        >
          THE SHAPE OF SPACE
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-10 text-xs tracking-[0.3em] text-gray-500">
          INTERIOR DESIGN STUDIO
        </div>

      </section>

      {/* ABOUT */}
      <Section id="about" title="About">
        We create calm, intentional interiors inspired by Japanese minimalism.
        Every space is reduced to its essence — light, texture, and balance.
      </Section>

      {/* PROJECTS (HORIZONTAL SCROLL) */}
      <section id="projects" className="py-24">

        <h2 className="font-serif text-3xl md:text-4xl px-6 md:px-10 mb-12">
          Projects
        </h2>

        <div className="overflow-x-auto flex gap-10 px-6 md:px-10 pb-10">

          {projects.map((project, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[420px] flex-shrink-0"
            >
              <div className="relative group">

                <img
                  src={project.image}
                  className="w-full h-[320px] object-cover"
                />

                {/* Bottom text */}
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs tracking-[0.3em] opacity-70">
                    {project.category}
                  </p>
                  <p className="text-lg font-serif">
                    {project.title}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT FORM */}
      <Section id="contact" title="Engraved Inquiry">

        <form
          action="https://formspree.io/f/your-id"
          method="POST"
          className="flex flex-col gap-6 max-w-md"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <button className="text-left tracking-[0.3em] text-sm mt-4">
            SEND →
          </button>

        </form>

      </Section>

      {/* FOOTER */}
      <footer className="text-center py-16 text-gray-500 text-sm">
        © 2026 Interior Design Studio
      </footer>

    </div>
  );
}

/* SECTION */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto px-6 md:px-10 py-24"
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">
        {title}
      </h2>

      <div className="text-gray-600 max-w-xl leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

/* DATA */
const projects = [
  {
    title: "Tokyo Minimal Apartment",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    title: "Kyoto Tea House",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    title: "Osaka Modern Living",
    category: "Interior",
    image: "https://www.bhg.com/thmb/wiidsHcxqmE7cYU7BV2Ie2PeoXo=/1000x0/filters:no_upscale():strip_icc()/Kinuta4472_low-7f79bad051a14f129ecb342e918529a8.jpg",
  },
  {
    title: "Zen Workspace",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  },
];
