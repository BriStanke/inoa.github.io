import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function InteriorPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  useEffect(() => {
    if (!window.Lenis) return;

    const lenis = new window.Lenis({
      lerp: 0.08,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const menuItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="bg-[#f4f2ee] text-black font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 sm:py-6 z-50 backdrop-blur bg-[#f4f2ee]/70">
        <div className="tracking-[0.2em] text-sm font-serif">
          MA SPACE
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>
      </header>

      {/* Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex flex-col justify-center items-center gap-10 z-50"
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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-white text-2xl sm:text-3xl tracking-widest"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="min-h-[90vh] flex items-center justify-center relative px-4 sm:px-6 md:px-10">

        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[85%] sm:w-[70%] md:w-[45%] max-w-[520px] object-cover"
        />
      
        {/* Floating text (DESKTOP ONLY) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="hidden md:block absolute right-[8%] top-[55%] -translate-y-1/2 text-xs tracking-[0.4em] text-gray-500"
        >
          THE SHAPE<br />OF SPACE
        </motion.div>
      
      </section>

      {/* ABOUT */}
      <Section id="about" title="About">
        We create calm, intentional interiors inspired by Japanese minimalism.
        Every space is reduced to its essence — light, texture, and balance.
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto">

          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${i % 2 !== 0 ? "md:mt-20" : ""}`}  // offset every second image
            >
              <div className="h-[200px] sm:h-[260px] md:h-[320px] overflow-hidden">
                <motion.img
                  src={src}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        Email: hello@interiordesign.com
      </Section>

      {/* FOOTER */}
      <footer className="text-center py-12 sm:py-16 text-gray-500 text-sm">
        © 2026 Interior Design Studio
      </footer>
    </div>
  );
}

/* SECTION COMPONENT */
function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-36"
    >
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-8 tracking-wide">
        {title}
      </h2>

      <div className="text-gray-600 max-w-xl leading-relaxed text-sm sm:text-base md:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

/* IMAGES */
const images = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
];
