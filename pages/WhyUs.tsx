
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Network, Rocket, Star, Diamond, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyUs: React.FC = () => {
  const advantages = [
    {
      icon: <Award />,
      title: "Ancrage Local & Vision Globale",
      desc: "Une maîtrise parfaite de l'écosystème africain alliée aux standards de gestion internationaux."
    },
    {
      icon: <Rocket />,
      title: "Approche Axée sur les Résultats",
      desc: "Nos rémunérations sont souvent indexées sur la réussite de vos projets (Success Fees). Votre succès est notre succès."
    },
    {
      icon: <Zap />,
      title: "Écosystème Digital",
      desc: "Synergie avec notre plateforme 'Solutions Services' pour une digitalisation rapide de vos offres de proximité."
    },
    {
      icon: <ShieldCheck />,
      title: "Expertise OHADA",
      desc: "Maîtrise approfondie de la législation OHADA et des régulations africaines pour une conformité garantie."
    },
    {
      icon: <Network />,
      title: "Réseau Panafricain",
      desc: "Présence stratégique au Cameroun et réseau étendu en Afrique Centrale et de l'Ouest."
    },
    {
      icon: <Crown />,
      title: "Partenaires de Confiance",
      desc: "Plus de 30 PME accompagnées avec succès. Rejoignez notre écosystème de champions économiques africains."
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-24 pb-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32 pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 border-2 border-[#D4AF37] mx-auto flex items-center justify-center mb-10 rotate-45"
          >
            <Diamond className="text-[#D4AF37] -rotate-45 w-8 h-8" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tighter">
            L'Écart de <span className="gold-text-gradient">Prestige.</span>
          </h1>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light italic">
            Dans un monde saturé de conseils, l'élite choisit l'expertise qui combine vision, exécution et influence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 pb-1 bg-white/5 border border-white/5">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black p-16 group hover:bg-[#080808] transition-all duration-700"
            >
              <div className="text-[#D4AF37] mb-10 transition-transform group-hover:scale-125 group-hover:rotate-6 duration-500">
                {React.cloneElement(adv.icon as React.ReactElement, { className: 'w-12 h-12 stroke-[1.5]' })}
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6 uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{adv.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-sm">{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-20 bg-gradient-to-br from-[#080808] to-blue-950/10 border border-[#D4AF37]/20 relative overflow-hidden text-center sapphire-glow"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] pointer-events-none"></div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Votre Héritage Mérite le Meilleur Strategiste.</h3>
          <p className="text-gray-400 text-xl mb-12 italic max-w-3xl mx-auto">
            "Le succès n'est jamais un accident ; c'est le résultat d'un effort intelligent dirigé par l'expérience."
          </p>
          <Link to="/contact" className="inline-block px-16 py-6 bg-[#D4AF37] text-black font-black text-lg tracking-widest uppercase hover:scale-105 transition-all gold-glow">
            Ouvrir un Dossier
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyUs;
