
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileText, PieChart, Briefcase, Zap, ShieldCheck, Diamond, Star } from 'lucide-react';

const Methodology: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-40 relative">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-[#D4AF37]/5 blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-40 pt-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] font-bold tracking-[0.5em] uppercase text-xs mb-6 block"
          >
            Le Protocole d'Excellence
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tighter">
            Méthode & <span className="gold-text-gradient italic">Ingénierie.</span>
          </h1>
          <p className="text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed italic border-x border-[#D4AF37]/20 px-10">
            Une architecture de travail millimétrée, conçue pour transformer la complexité en leviers de croissance.
          </p>
        </div>

        {/* Timeline Approach */}
        <div className="space-y-4 mb-32 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-[#D4AF37] via-blue-900 to-transparent opacity-30 hidden lg:block"></div>

          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-card p-16 rounded-none relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-700"
          >
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <div className="text-7xl font-serif font-black gold-text-gradient opacity-20 mb-6 italic">01</div>
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Immersion Strategique</h2>
                <div className="inline-block px-4 py-2 bg-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black tracking-widest uppercase">
                  Durée : 2 à 4 semaines
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Cette phase cruciale définit le socle de l'intervention. Nous réalisons une radiographie complète de vos actifs et de vos risques.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Livrables Elite</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><Star className="w-3 h-3 mr-3 text-[#D4AF37]" /> Business Plan Haute-Fidélité</li>
                      <li className="flex items-center"><Star className="w-3 h-3 mr-3 text-[#D4AF37]" /> Structuration Juridique Optimisée</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Honoraires</h4>
                    <p className="text-white text-lg font-light">Forfait fixe de démarrage, garantissant une immersion totale sans compromis.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-card p-16 rounded-none relative overflow-hidden group hover:border-blue-500/40 transition-all duration-700 bg-black/40"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-16 text-right lg:text-left">
              <div className="lg:w-1/3 text-left">
                <div className="text-7xl font-serif font-black text-blue-500/20 mb-6 italic">02</div>
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Roadshow & Closing</h2>
                <div className="inline-block px-4 py-2 bg-blue-600/5 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase">
                  Durée : 3 à 8 mois
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8 text-left">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Activation de nos réseaux de capitaux et négociation des mandats de levée de fonds ou de déploiement commercial.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Mise en Œuvre</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><Zap className="w-3 h-3 mr-3 text-blue-500" /> Négociations Institutionnelles</li>
                      <li className="flex items-center"><Zap className="w-3 h-3 mr-3 text-blue-500" /> Due Diligence & Finalisation</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Partage de Succès</h4>
                    <p className="text-white text-lg font-bold gold-text-gradient">Success Fee indexé sur l'impact généré.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Protection */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          <div className="p-20 bg-black hover:bg-[#050505] transition-colors group">
            <ShieldCheck className="w-16 h-16 text-[#D4AF37] mb-10 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-serif font-bold mb-6 tracking-tight uppercase">Confidentialité Absolue</h4>
            <p className="text-gray-500 font-light leading-relaxed text-sm italic">
              "Le silence est l'allié du pouvoir." Toutes nos missions sont protégées par des accords de non-divulgation (NDA) de standard diplomatique.
            </p>
          </div>
          <div className="p-20 bg-black hover:bg-[#050505] transition-colors group">
            <Diamond className="w-16 h-16 text-blue-500 mb-10 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-serif font-bold mb-6 tracking-tight uppercase">Exclusivité Elite</h4>
            <p className="text-gray-500 font-light leading-relaxed text-sm italic">
              Nous n'acceptons qu'un nombre limité de mandats par pôle pour garantir une concentration totale et une réactivité instantanée.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Methodology;
