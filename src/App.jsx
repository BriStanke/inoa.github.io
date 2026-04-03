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

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const menuItems = [
    { name: "Pagrindinis", link: "#" },
    { name: "Apie", link: "#about" },
    { name: "Projektai", link: "#projects" },
    { name: "Kontaktai", link: "#contact" },
  ];

  return (
    <div className="bg-[#F7F3F0] text-black font-sans overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-4 md:py-6 z-50 backdrop-blur bg-[#F4F2EE]/70">
        <div className="tracking-[0.3em] text-lg md:text-lg font-serif">
          INOA
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
          src="https://scontent-lhr6-2.xx.fbcdn.net/v/t51.82787-15/559287397_17865311022467882_1521011291223335657_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=h6LS_RkLiEcQ7kNvwFLTdQ1&_nc_oc=AdqTr0R0RfoPTYQ7VgluF008fhyYKjah9C3Y1fj3qEczdiTYzQ_RBdorDRY81QrxDqecbKi14fqg8haNC0Xi3eJs&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=HGxSJP9NUnrbigXA6exkww&_nc_ss=7a3a8&oh=00_Af1Dtvz58g2VCtoh5hSyguOnea4oi4JutSLSAyyBZ0f1Ag&oe=69D5B60A"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[70%] max-w-[700px] object-cover"
        />

        <div
          className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-sm md:text-base tracking-[0.4em] text-gray-500"
          style={{ writingMode: "vertical-rl" }}
        >
          ERDVĖS FORMA
        </div>

        <div className="absolute bottom-10 text-xs tracking-[0.3em] text-gray-500">
          INTERJERO DIZAINO STUDIJA
        </div>

      </section>

      {/* ABOUT */}
      <Section id="about" title="Apie">
        Kuriame ramius, apgalvotus interjerus, įkvėptus japoniško minimalizmo.
        Kiekviena erdvė sutelkta į savo esmę – šviesą, tekstūrą ir pusiausvyrą.
      </Section>

      {/* PROJECTS */}
      <section id="projects" className="py-24">

        <h2 className="font-serif text-3xl md:text-4xl px-6 md:px-10 mb-12">
          Projektai
        </h2>
      
        <div className="flex gap-8 px-6 md:px-10 overflow-x-auto pb-10">
      
          {projects.map((project, i) => (
            <div
              key={i}
              className="w-[260px] md:w-[320px] flex-shrink-0 group"
            >
              <div className="relative overflow-hidden">
      
                {/* Smaller, controlled image */}
                <div className="w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={project.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
      
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
      
                  <p className="text-xs tracking-[0.3em] opacity-70">
                    {project.category}
                  </p>
      
                  <p className="text-base font-serif">
                    {project.title}
                  </p>
      
                </div>
      
              </div>
            </div>
          ))}
      
        </div>
      </section>

      {/* CONTACT */}
      <Section id="contact" title="Siųsti užklausą">

        <form
          action="https://formspree.io/f/your-id"
          method="POST"
          className="flex flex-col gap-6 max-w-md"
        >

          <input
            type="text"
            name="name"
            placeholder="Vardas"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="El. paštas"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <textarea
            name="message"
            placeholder="Žinutė"
            rows="4"
            required
            className="border-b border-gray-400 bg-transparent py-2 outline-none"
          />

          <button className="text-left tracking-[0.3em] text-sm mt-4">
            SIŲSTI →
          </button>

        </form>

      </Section>

      {/* FOOTER */}
      <footer className="bg-[#F7F3F0] text-black px-6 md:px-10 py-16">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      
          {/* Brand */}
          <div className="font-serif text-lg tracking-[0.2em]">
            INOA STUDIJA
            <p className="mt-4 text-sm text-gray-600 tracking-normal">
              Tyčinė tuštuma
            </p>
          </div>
      
          {/* Location */}
          <div className="text-sm">
            <p className="tracking-[0.2em] mb-4">VIETA</p>
            <p className="text-gray-600">Vilnius, Lietuva</p>
            <p className="text-gray-600">Visame pasaulyje pagal susitarimą</p>
          </div>
      
          {/* Connect */}
          <div className="text-sm">
            <p className="tracking-[0.2em] mb-4">SUSISIEKITE</p>
            <p className="text-gray-600">inoa@gmail.com</p>
          </div>
      
        </div>
      
        {/* Bottom line */}
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-300 text-xs text-gray-500 flex justify-between">
          <span>© 2026 INOA STUDIJA</span>
          <span>VISOS TEISĖS SAUGOMOS</span>
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
