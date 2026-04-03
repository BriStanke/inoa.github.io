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
      className="max-w-5xl mx-auto px-6 md:px-10 py-32"
    >
      <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-10">
        {title}
      </h2>

      <div className="text-gray-600 max-w-xl leading-relaxed text-base md:text-lg">
        {children}
      </div>
    </motion.section>
  );
}

/* PROJECT CARD */
function ProjectCard({ project }) {
  return (
    <div className="group">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          src={project.image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
          <p className="text-[10px] tracking-[0.3em] opacity-70">
            {project.category}
          </p>

          <p className="text-sm font-light">
            {project.title}
          </p>
        </div>
      </div>
    </div>
  );
}

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
    <div className="bg-[#F7F3F0] text-black font-sans overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-5 z-50 backdrop-blur bg-[#F4F2EE]/70">

        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="INOA"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>

        <nav className="hidden md:flex gap-10 text-xs tracking-[0.25em]">
          {menuItems.map((item) => (
            <a key={item.name} href={item.link} className="hover:opacity-60 transition">
              {item.name}
            </a>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(true)} className="md:hidden text-xl">
          ☰
        </button>
      </header>

      {/* HERO */}
      <section className="h-screen w-full relative overflow-hidden">

        <motion.img
          src="/main.jpeg"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
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
      <section id="projects" className="py-32">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight px-6 md:px-10 mb-12">
          Projektai
        </h2>

        <div className="hidden md:grid grid-cols-2 gap-10 px-10 max-w-6xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#F7F3F0] text-black px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="tracking-[0.25em] text-sm font-light">
            MA-SPACE STUDIOS
            <p className="mt-4 text-xs text-gray-500 tracking-normal">
              The intentional void.
            </p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">LOCATION</p>
            <p className="text-gray-600">Tokyo, Japan</p>
            <p className="text-gray-600">Worldwide by appointment</p>
          </div>

          <div className="text-xs md:text-sm">
            <p className="tracking-[0.25em] mb-4">CONNECT</p>
            <p className="text-gray-600">studio@maspace.jp</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-300 text-[10px] md:text-xs text-gray-400 flex justify-between tracking-[0.2em]">
          <span>© 2026 MA-SPACE STUDIOS. ALL RIGHTS RESERVED.</span>
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
    image: "https://scontent-lhr6-2.xx.fbcdn.net/v/t51.82787-15/572029684_17867818608467882_4230653201519751878_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=2NBk7kBjeD0Q7kNvwGlbyHF&_nc_oc=AdoyHI4GQ7oDWxoSD8PDfaNtml2dOKX1O11TX08WA4LBGmX66a_W7zHbgkeVJILOb7F3p_hC_VWWxPfppBy3_U_e&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=XBLSuj0BpQHy7CDnaXzSDA&_nc_ss=7a3a8&oh=00_Af2Yv1aA7fGrCknf2H4AYTfXNYW-tlPX6PYvUZ2I8AMVSg&oe=69D5D006",
  },
  {
    title: "Virtuvės erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/529774988_122135004752844125_1346394103216306535_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=Y3b64F2j1AAQ7kNvwGmgayz&_nc_oc=AdoFNqSF40uJDlMyw8OCv0_75tL250T7fTqk8VODJXYUkJ8DW-u80J42e4qD9nDYSPG5saQF_-DgVG4xVZ9GCbzt&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=2k2j9eSTGITEdO9DmROefw&_nc_ss=7a3a8&oh=00_Af1z0hIlhuj9uXQ1KRKPXCeJFgnuqY3fSKNaZUHgzekJCA&oe=69D5BD7F",
  },
  {
    title: "Miegamojo erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/530767501_122135004878844125_8217486174292026629_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=8_rOeNOM1JYQ7kNvwHrTlGx&_nc_oc=AdpdQlftrAt3WARxqjtHUXn4RHZrkYh-RFHYoWzKnHC7xO9S9Gw5wiLr2tmrV7m8mKWQbdBURCGuA8TaQli9d27C&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=FBFBfxKyGVNl7BlWz3qDMQ&_nc_ss=7a3a8&oh=00_Af276VMaOKmxbvnj8i-4-dil1tW62phhemQPllJ98FcG9A&oe=69D5D8F5",
  },
  { 
    title: "Vonios erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-6/547294817_122145991310844125_1441440643202851374_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=GvBFzFVd0B4Q7kNvwE2wRyl&_nc_oc=Adqj-Hk8DU-99USdzfm2jSvy2hHnZ7N0SjbVhhxNPWDgm6wBcMJYQNUh0eMR1kAnkRztJ2DDDg4uMk9MXZV-e4ML&_nc_zt=23&_nc_ht=scontent-lhr6-1.xx&_nc_gid=I8pFJVSdENOy_X40GvO1FA&_nc_ss=7a3a8&oh=00_Af0qZkRgD_xEYp4TXCbsLwgmhQhYXy7uUYEHldLIecuTjA&oe=69D5EB7D",
  },
];
