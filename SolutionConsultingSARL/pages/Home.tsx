
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, ShieldCheck, Zap, Globe, BarChart3, 
  Users, Scale, Star, Diamond, Quote, Award, 
  TrendingUp, Briefcase, MousePointer2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920", // Modern Office
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920", // Architecture
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"  // Tech/Futuristic
];

const partnerLogos = [
  { name: "Finance Global", url: "https://cdn-icons-png.flaticon.com/512/3616/3616335.png" },
  { name: "Empire Corp", url: "https://cdn-icons-png.flaticon.com/512/3616/3616338.png" },
  { name: "Stratégie Plus", url: "https://cdn-icons-png.flaticon.com/512/3616/3616340.png" },
  { name: "Luxury Invest", url: "https://cdn-icons-png.flaticon.com/512/3616/3616345.png" },
  { name: "Tech Elite", url: "https://cdn-icons-png.flaticon.com/512/3616/3616350.png" },
  { name: "Africa Reach", url: "https://cdn-icons-png.flaticon.com/512/3616/3616352.png" },
];

const testimonials = [
  {
    quote: "Solutions Consulting a transformé notre vision en une réalité financière. Leur maîtrise du droit OHADA est inégalée.",
    author: "M. Bakary T.",
    role: "CEO, Panafrican Energy Group",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Un accompagnement d'orfèvre pour notre levée de fonds. Discrétion, précision et résultats au-delà des attentes.",
    author: "Elena R.",
    role: "Directrice d'Investissement, Global Bridge",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "La force de vente externalisée par Solutions Consulting nous a permis de doubler nos parts de marché en 18 mois.",
    author: "Jean-Pierre N.",
    role: "Directeur Commercial, CFAO Retail",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

const ImpactFigure = ({ number, label, suffix = "" }: { number: string, label: string, suffix?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center group"
  >
    <div className="text-5xl md:text-6xl font-serif font-black gold-text-gradient mb-2 transition-transform group-hover:scale-110 duration-500">
      {number}{suffix}
    </div>
    <div className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">{label}</div>
  </motion.div>
);

const PartnersSlider = () => (
  <div className="py-24 bg-black overflow-hidden border-y border-white/5 relative">
    <div className="flex relative">
      <motion.div 
        className="flex space-x-24 items-center whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, idx) => (
          <div key={idx} className="flex-shrink-0 group">
            <img 
              src={partner.url} 
              alt={partner.name}
              className="h-12 md:h-16 w-auto opacity-30 grayscale brightness-200 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
          </div>
        ))}
      </motion.div>
    </div>
    <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
  </div>
);

const Home: React.FC = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const titleWords = "L'Art de la Haute Stratégie.".split(" ");

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Cinematic Hero Slider */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImg}
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImages[currentImg]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div style={{ opacity }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center text-[#D4AF37]/50">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Défiler</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mb-10 flex items-center"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/610/610120.png" 
                alt="Logo" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain filter invert drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] mr-6"
              />
              <div className="h-10 w-[1px] bg-white/20 mx-6"></div>
              <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs">Depuis 2015</span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 leading-[0.95] tracking-tighter">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                  className={`inline-block mr-6 ${i >= 3 ? 'gold-text-gradient' : ''}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.8 }}
              className="text-xl md:text-3xl text-gray-300 mb-14 leading-tight max-w-3xl font-light"
            >
              Solutions Consulting Sarl orchestre votre croissance avec la précision de l'orfèvre et l'audace des visionnaires.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10"
            >
              <Link to="/contact" className="relative group px-14 py-6 rounded-none overflow-hidden bg-[#D4AF37] text-black font-black text-lg transition-all hover:scale-105 active:scale-95 gold-glow flex items-center justify-center">
                <span className="relative z-10 flex items-center uppercase tracking-widest text-sm">
                  Consultation de Luxe
                  <ChevronRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link to="/services" className="px-14 py-6 rounded-none border border-white/20 text-white font-bold text-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center flex items-center justify-center group">
                <span className="uppercase tracking-widest text-sm">Notre Héritage</span>
                <div className="w-0 group-hover:w-6 h-[1px] bg-[#D4AF37] ml-0 group-hover:ml-4 transition-all"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Figures Section */}
      <section className="py-24 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <ImpactFigure number="250" suffix="+" label="Projets Stratégiques" />
            <ImpactFigure number="50" suffix="M€" label="Fonds Levés" />
            <ImpactFigure number="12" suffix="" label="Pays d'Intervention" />
            <ImpactFigure number="98" suffix="%" label="Taux de Rétention" />
          </div>
        </div>
      </section>

      <PartnersSlider />

      {/* Synthesis Section */}
      <section className="py-40 relative border-t border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-1000"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r-2 border-b-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-1000"></div>
              <div className="overflow-hidden rounded-sm sapphire-glow">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" 
                  alt="Executive Boardroom" 
                  className="w-full grayscale hover:grayscale-0 scale-110 hover:scale-100 transition-all duration-[2s] object-cover h-[600px]"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="inline-block px-4 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase">Manifeste</div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1]">
                L'Expansion <br /> 
                <span className="italic gold-text-gradient">Sans Compromis</span>.
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed font-light">
                Solutions Consulting Sarl fusionne la rigueur analytique occidentale à la fluidité des marchés africains. Nous ne conseillons pas seulement ; nous bâtissons les fondations de votre souveraineté économique.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 flex items-center justify-center mr-6 group-hover:border-[#D4AF37] transition-all">
                    <Award className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2 tracking-tight">Standard de Gouvernance Elite</h4>
                    <p className="text-gray-500 text-sm font-light">Audit de conformité OHADA et structuration offshore pour une optimisation optimale.</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 flex items-center justify-center mr-6 group-hover:border-[#D4AF37] transition-all">
                    <Globe className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2 tracking-tight">Intelligence Diplomatique</h4>
                    <p className="text-gray-500 text-sm font-light">Accès privilégié aux cercles décisionnels et aux régulateurs régionaux (CEMAC/UEMOA).</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Protocol Section (The New "Extensive" Part) */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <span className="text-[#D4AF37] font-bold tracking-[0.5em] uppercase text-xs mb-6 block">Méthodologie</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white">Le Protocole Saphir</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-8 opacity-40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Diagnostic Immersif", desc: "Immersion totale dans votre écosystème pour identifier les gisements de croissance cachés." },
              { step: "02", title: "Ingénierie Sur-Mesure", desc: "Conception d'une architecture stratégique unique, alliant droit, finance et marketing." },
              { step: "03", title: "Exécution Chirurgicale", desc: "Mise en œuvre millimétrée avec nos équipes de terrain et nos conseillers experts." },
              { step: "04", title: "Succession & Pérennité", desc: "Accompagnement post-mandat pour garantir la stabilité de l'expansion sur le long terme." }
            ].map((p, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 bg-[#0a0a0a] border border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="text-4xl font-serif italic text-white/10 group-hover:text-[#D4AF37]/20 mb-6 transition-colors">{p.step}</div>
                <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Testimonials Section */}
      <section className="py-40 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-[#D4AF37] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Paroles d'Élite</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight">Ils façonnent l'avenir avec nous.</h2>
            </div>
            <div className="flex space-x-6 pb-2">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer">
                <ChevronRight className="rotate-180" />
              </div>
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all cursor-pointer">
                <ChevronRight />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-12 bg-black/50 border border-white/5 relative group hover:bg-[#0a0a10] transition-all duration-700"
              >
                <Quote className="absolute top-10 right-10 w-12 h-12 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/20 transition-all" />
                <p className="text-gray-300 text-lg font-light leading-relaxed italic mb-12 relative z-10">"{t.quote}"</p>
                <div className="flex items-center">
                  <img src={t.image} alt={t.author} className="w-14 h-14 rounded-full grayscale group-hover:grayscale-0 transition-all mr-6 border border-white/10" />
                  <div>
                    <h5 className="text-white font-bold">{t.author}</h5>
                    <p className="text-[#D4AF37] text-[10px] font-black tracking-widest uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Pillars (Simplified for better flow) */}
      <section className="py-40 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Rayonnement</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Piliers d'Expansion</h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border border-white/5">
            {[
              {
                icon: <Scale className="w-10 h-10 text-[#D4AF37]" />,
                title: "Conseils & Assistance",
                desc: "Ingénierie juridique luxe et levée de fonds souveraine."
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-[#D4AF37]" />,
                title: "Solutions Commerciales",
                desc: "Performance de vente externalisée et CRM haute-fidélité."
              },
              {
                icon: <Users className="w-10 h-10 text-[#D4AF37]" />,
                title: "Solutions Marketing",
                desc: "Branding de prestige et positionnement digital d'élite."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                className="p-20 bg-[#050505] transition-all flex flex-col items-center text-center group"
              >
                <div className="mb-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-6 tracking-tight">{pillar.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-10 text-sm">{pillar.desc}</p>
                <Link to="/services" className="text-[10px] font-black tracking-[0.4em] uppercase text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 hover:border-[#D4AF37] transition-all">
                  Expertise →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold CTA */}
      <section className="py-48 bg-black overflow-hidden relative border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 blur-[200px] pointer-events-none rounded-full"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-16"
          >
            <Diamond className="w-16 h-16 text-[#D4AF37] mx-auto animate-pulse" />
            <h2 className="text-6xl md:text-9xl font-serif font-bold text-white leading-none tracking-tighter">
              Le Prochain Chapitre de <br />
              <span className="gold-text-gradient italic">Votre Empire</span>.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed italic">
              "La fortune sourit aux audacieux, mais elle se construit avec les stratèges."
            </p>
            <div className="pt-10">
              <Link to="/contact" className="inline-block px-20 py-8 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-black text-2xl hover:bg-[#D4AF37] hover:text-black transition-all duration-700 gold-glow uppercase tracking-[0.2em]">
                Initier le Mandat
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
