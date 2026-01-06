
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Map, Globe, Shield, Star, Diamond } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase mb-8">
            Notre Héritage
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-10 leading-tight">
            L'Architecture de <br />
            <span className="gold-text-gradient italic">Votre Succès.</span>
          </h1>
          <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-3xl border-l-2 border-[#D4AF37]/30 pl-10 italic">
            Solutions Consulting Sarl n'est pas un simple cabinet conseil. C'est un sanctuaire stratégique où les ambitions africaines rencontrent les standards de l'élite mondiale.
          </p>
        </motion.div>
      </section>

      {/* Deep Vision Section */}
      <section className="py-32 bg-[#050505] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-16 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
              <Target className="w-14 h-14 text-[#D4AF37] mb-8" />
              <h2 className="text-3xl font-serif font-bold mb-6">Mission Souveraine</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Nous orchestrons la levée des verrous structurels — juridiques, fiscaux et commerciaux — pour permettre aux champions économiques d'Afrique centrale et de l'ouest d'atteindre leur pleine puissance.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-16 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#1e3a8a] to-transparent"></div>
              <Eye className="w-14 h-14 text-blue-500 mb-8" />
              <h2 className="text-3xl font-serif font-bold mb-6">Vision Elite 2030</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Redéfinir le conseil en Afrique en devenant la passerelle incontournable entre les capitaux internationaux et les opportunités locales de haute voltige.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Luxury Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Nos Valeurs Cardinales</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-40"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Intégrité", icon: <Shield />, desc: "La discrétion d'un confident, la rigueur d'un expert." },
              { title: "Excellence", icon: <Star />, desc: "Chaque détail est une signature de perfection." },
              { title: "Innovation", icon: <Diamond />, desc: "Anticiper les mutations du marché mondial." },
              { title: "Impact", icon: <Globe />, desc: "Des résultats mesurables sur votre capital." }
            ].map((val, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="text-center p-10 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 bg-[#080808]"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
                  {React.cloneElement(val.icon as React.ReactElement, { className: 'w-8 h-8' })}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-white">{val.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Futuristic */}
      <section className="py-40 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="flex-1 space-y-12">
              <h2 className="text-5xl font-serif font-bold mb-8">Rayonnement <br /><span className="gold-text-gradient italic">Sans Frontières.</span></h2>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Basés à Douala, le poumon économique du Cameroun, nous opérons sur les axes stratégiques de la zone CEMAC et de l'UEMOA, avec des antennes connectées aux hubs financiers mondiaux.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {/* Fixed unescaped single quote in array of strings */}
                {["Cameroun", "Afrique Centrale", "Afrique de l'Ouest", "Diaspora Europe"].map((region, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 sapphire-glow text-sm font-bold tracking-widest uppercase">
                    <Map className="text-[#D4AF37] w-5 h-5" />
                    <span>{region}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-900/10 rounded-full animate-pulse blur-3xl"></div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-dashed border-[#D4AF37]/20 rounded-full"
                ></motion.div>
                <div className="text-6xl font-serif font-black text-white/10 absolute tracking-[0.5em]">AFRICA</div>
                <div className="relative z-10 text-center">
                   <div className="text-8xl md:text-[10rem] font-serif font-black gold-text-gradient opacity-80">精英</div>
                   <p className="text-[#D4AF37] tracking-[0.8em] font-black uppercase text-xs mt-4">Pôle Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
