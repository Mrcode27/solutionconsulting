
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Eye, Globe, Users, Building2, TrendingUp, Zap } from 'lucide-react';

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
            Expansion Internationale
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tighter">
            Représentation d'Entreprises <span className="gold-text-gradient italic">Étrangères</span>.
          </h1>
          <p className="text-2xl text-gray-500 font-light max-w-4xl mx-auto leading-relaxed italic border-x border-[#D4AF37]/20 px-10">
            Votre porte d'entrée en Afrique Francophone. Vous êtes une entreprise étrangère souhaitant conquérir le marché camerounais ou la zone CEMAC/CEDEAO ? Solutions Consulting Sarl agit comme votre antenne locale.
          </p>
        </div>

        {/* Solutions de Représentation */}
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
                <Users className="w-12 h-12 text-[#D4AF37] mb-6" />
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Portage Salarial & Recrutement</h2>
                <div className="inline-block px-4 py-2 bg-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black tracking-widest uppercase">
                  Gestion Flexible
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Gérez vos équipes locales sans structure juridique propre au départ. Solutions Consulting Sarl vous permet de recruter et gérer des talents locaux en toute conformité OHADA.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Points Forts</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" /> Conformité légale garantie</li>
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" /> Déploiement rapide d'équipes</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Avantages</h4>
                    <p className="text-white text-lg font-light">Réduisez les risques juridiques et concentrez-vous sur votre cœur de métier.</p>
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
            <div className="flex flex-col lg:flex-row-reverse gap-16 text-left lg:text-left">
              <div className="lg:w-1/3 text-left">
                <Building2 className="w-12 h-12 text-blue-500 mb-6" />
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Bureau de Représentation & Succursale</h2>
                <div className="inline-block px-4 py-2 bg-blue-600/5 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase">
                  Installation Complète
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8 text-left">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Nous gérons l'installation physique et administrative de votre marque sur le marché camerounais et CEMAC/CEDEAO.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Services Inclus</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><Zap className="w-4 h-4 mr-3 text-blue-500" /> Enregistrement légal et fiscal</li>
                      <li className="flex items-center"><Zap className="w-4 h-4 mr-3 text-blue-500" /> Localisation de bureaux</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Infrastructure</h4>
                    <p className="text-white text-lg font-bold gold-text-gradient">Installation clés en main avec support administratif complet.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-card p-16 rounded-none relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-700"
          >
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <Eye className="w-12 h-12 text-[#D4AF37] mb-6" />
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Veille Stratégique</h2>
                <div className="inline-block px-4 py-2 bg-[#D4AF37]/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-black tracking-widest uppercase">
                  Intelligence de Marché
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Analyse en temps réel des opportunités de marché et de la réglementation locale pour adapter votre stratégie.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Monitorage</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" /> Surveillance réglementaire</li>
                      <li className="flex items-center"><ShieldCheck className="w-4 h-4 mr-3 text-[#D4AF37]" /> Analyse des tendances</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[#D4AF37] text-xs font-black tracking-[0.3em] uppercase">Rapports</h4>
                    <p className="text-white text-lg font-light">Rapports périodiques pour une prise de décision optimisée.</p>
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
            <div className="flex flex-col lg:flex-row-reverse gap-16 text-left lg:text-left">
              <div className="lg:w-1/3 text-left">
                <TrendingUp className="w-12 h-12 text-blue-500 mb-6" />
                <h2 className="text-4xl font-serif font-bold mb-6 text-white uppercase tracking-tight">Logistique et Distribution</h2>
                <div className="inline-block px-4 py-2 bg-blue-600/5 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase">
                  Mise en Marché
                </div>
              </div>
              <div className="lg:w-2/3 space-y-8 text-left">
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Coordination de vos flux logistiques et introduction auprès des réseaux de distribution clés dans la région.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Coordination</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                      <li className="flex items-center"><Zap className="w-4 h-4 mr-3 text-blue-500" /> Gestion de la chaîne logistique</li>
                      <li className="flex items-center"><Zap className="w-4 h-4 mr-3 text-blue-500" /> Négociation distributeurs</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase">Réseaux</h4>
                    <p className="text-white text-lg font-bold gold-text-gradient">Accès à nos partenaires de distribution éprouvés.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Benefits Section */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          <div className="p-20 bg-black hover:bg-[#050505] transition-colors group">
            <Globe className="w-16 h-16 text-[#D4AF37] mb-10 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-serif font-bold mb-6 tracking-tight uppercase">Présence Régionale</h4>
            <p className="text-gray-500 font-light leading-relaxed text-sm italic">
              Nous couvrons la zone CEMAC et CEDEAO avec une équipe locale expérimentée et des contacts clés dans tous les secteurs.
            </p>
          </div>
          <div className="p-20 bg-black hover:bg-[#050505] transition-colors group">
            <Briefcase className="w-16 h-16 text-blue-500 mb-10 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-serif font-bold mb-6 tracking-tight uppercase">Expertise Métier</h4>
            <p className="text-gray-500 font-light leading-relaxed text-sm italic">
              Nos consultants combinent la compréhension profonde des marchés africains avec l'expérience internationale.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Methodology;
