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
        <nav className="hidden md:flex gap-10 text-sm lg:text-base font-light tracking-wide">
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
        Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.
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
        <div className="hidden md:grid grid-cols-3 gap-2">
          {projects.map((project) => (
            <div key={project.title} className="relative group overflow-hidden h-[70vh]">
        
              <img
                src={project.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
        
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
        
                <p className="text-[11px] tracking-[0.2em] opacity-70">
                  {project.category}
                </p>
        
                <p className="text-lg font-light">
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

      {/* FOOTER */}
      <footer className="bg-[#F7F3F0] text-black px-6 md:px-10 py-20">
        <div className="w-full max-w-none">

          <div className="tracking-[0.25em] text-sm font-light">
            INOA INTERJERO DIZAINO STUDIO
            <p className="mt-4 text-xs text-gray-500 tracking-normal">
              Minimalistinio interjero dizaino studija.
            </p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">VIETA</p>
            <p className="text-gray-600">VILNIUS, LIETUVA</p>
            <p className="text-gray-600">Visame pasaulyje pagal susitarimą</p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">KONTAKTAI</p>
            <p className="text-gray-600">inoa@gmail.com</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-300 text-[10px] md:text-xs text-gray-400 flex justify-between tracking-[0.2em]">
          <span>© 2026 INOA INTERJERO DIZAINO STUDIJA. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>

    </div>
  );
}

/* DATA */
const projects = [
  {
    title: "Vonios erdvė",
    category: "GYVENAMASIS",
    image: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/529774988_122135004752844125_1346394103216306535_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=Y3b64F2j1AAQ7kNvwGmgayz&_nc_oc=AdoFNqSF40uJDlMyw8OCv0_75tL250T7fTqk8VODJXYUkJ8DW-u80J42e4qD9nDYSPG5saQF_-DgVG4xVZ9GCbzt&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=2k2j9eSTGITEdO9DmROefw&_nc_ss=7a3a8&oh=00_Af1z0hIlhuj9uXQ1KRKPXCeJFgnuqY3fSKNaZUHgzekJCA&oe=69D5BD7F",
  },
  {
    title: "Virtuvės erdvė",
    category: "GYVENAMASIS",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/530767501_122135004878844125_8217486174292026629_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=8_rOeNOM1JYQ7kNvwHrTlGx&_nc_oc=AdpdQlftrAt3WARxqjtHUXn4RHZrkYh-RFHYoWzKnHC7xO9S9Gw5wiLr2tmrV7m8mKWQbdBURCGuA8TaQli9d27C&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=FBFBfxKyGVNl7BlWz3qDMQ&_nc_ss=7a3a8&oh=00_Af276VMaOKmxbvnj8i-4-dil1tW62phhemQPllJ98FcG9A&oe=69D5D8F5",
  },
  {
    title: "Miegamojo erdvė",
    category: "GYVENAMASIS",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/547294817_122145991310844125_1441440643202851374_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=GvBFzFVd0B4Q7kNvwE2wRyl&_nc_oc=Adqj-Hk8DU-99USdzfm2jSvy2hHnZ7N0SjbVhhxNPWDgm6wBcMJYQNUh0eMR1kAnkRztJ2DDDg4uMk9MXZV-e4ML&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=I8pFJVSdENOy_X40GvO1FA&_nc_ss=7a3a8&oh=00_Af0qZkRgD_xEYp4TXCbsLwgmhQhYXy7uUYEHldLIecuTjA&oe=69D5EB7D",
  },
  {
    title: "Vonios erdvė",
    category: "GYVENAMASIS",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/547294817_122145991310844125_1441440643202851374_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=GvBFzFVd0B4Q7kNvwE2wRyl&_nc_oc=Adqj-Hk8DU-99USdzfm2jSvy2hHnZ7N0SjbVhhxNPWDgm6wBcMJYQNUh0eMR1kAnkRztJ2DDDg4uMk9MXZV-e4ML&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=I8pFJVSdENOy_X40GvO1FA&_nc_ss=7a3a8&oh=00_Af0qZkRgD_xEYp4TXCbsLwgmhQhYXy7uUYEHldLIecuTjA&oe=69D5EB7D",
  },
];
