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
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>
    
      <button onClick={() => setMenuOpen(true)} className="text-xl md:text-2xl">
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
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex flex-col justify-center items-center gap-12 z-50"
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
                className="text-white text-2xl md:text-3xl tracking-[0.25em] font-light"
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
          src="https://scontent-lhr6-2.xx.fbcdn.net/v/t51.82787-15/559287397_17865311022467882_1521011291223335657_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=h6LS_RkLiEcQ7kNvwFLTdQ1&_nc_oc=AdqTr0R0RfoPTYQ7VgluF008fhyYKjah9C3Y1fj3qEczdiTYzQ_RBdorDRY81QrxDqecbKi14fqg8haNC0Xi3eJs&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=HGxSJP9NUnrbigXA6exkww&_nc_ss=7a3a8&oh=00_Af1Dtvz58g2VCtoh5hSyguOnea4oi4JutSLSAyyBZ0f1Ag&oe=69D5B60A"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[65%] max-w-[680px] object-cover"
        />

        <div
          className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-xs md:text-sm tracking-[0.4em] text-gray-400 font-light"
          style={{ writingMode: "vertical-rl" }}
        >
          ERDVĖS FORMA
        </div>

        <div className="absolute bottom-10 text-[10px] md:text-xs tracking-[0.35em] text-gray-400">
          INTERJERO DIZAINO STUDIJA
        </div>

      </section>

      {/* SECTION COMPONENT */}
      <Section id="about" title="Apie">
        Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo.
        Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.
      </Section>

      {/* PROJECTS */}
      <section id="projects" className="py-32">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight px-6 md:px-10 mb-12">
          Projektai
        </h2>

        <div className="flex gap-8 px-6 md:px-10 overflow-x-auto pb-10">
          {projects.map((project, i) => (
            <div key={i} className="w-[240px] md:w-[280px] flex-shrink-0 group">
              <div className="w-full aspect-[4/5] overflow-hidden">

                <img
                  src={project.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

              </div>

              <div className="mt-3">
                <p className="text-[10px] tracking-[0.3em] text-gray-500">
                  {project.category}
                </p>
                <p className="text-sm font-light">
                  {project.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <Section id="contact" title="Siųsti užklausą">
        <form className="flex flex-col gap-6 max-w-md">

          <input
            type="text"
            placeholder="Vardas"
            className="border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400"
          />

          <input
            type="email"
            placeholder="El. paštas"
            className="border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400"
          />

          <textarea
            placeholder="Žinutė"
            rows="4"
            className="border-b border-gray-300 bg-transparent py-3 text-sm outline-none placeholder-gray-400"
          />

          <button className="text-left tracking-[0.3em] text-xs mt-4">
            SIŲSTI →
          </button>

        </form>
      </Section>

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

/* DATA */
const projects = [
  {
    title: "Vonios erdvė",
    category: "Gyvenamasis",
    image: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/529774988_122135004752844125_1346394103216306535_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=Y3b64F2j1AAQ7kNvwGmgayz&_nc_oc=AdoFNqSF40uJDlMyw8OCv0_75tL250T7fTqk8VODJXYUkJ8DW-u80J42e4qD9nDYSPG5saQF_-DgVG4xVZ9GCbzt&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=2k2j9eSTGITEdO9DmROefw&_nc_ss=7a3a8&oh=00_Af1z0hIlhuj9uXQ1KRKPXCeJFgnuqY3fSKNaZUHgzekJCA&oe=69D5BD7F",
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
