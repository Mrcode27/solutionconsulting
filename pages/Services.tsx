
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, TrendingUp, Users, CheckCircle2, ShieldCheck, Zap, Globe, Briefcase } from 'lucide-react';

const ServiceSection = ({ icon, title, services, color, index }: { icon: any, title: string, services: string[], color: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="glass-card rounded-none border-y border-white/5 overflow-hidden p-12 lg:p-24 mb-1 relative group"
  >
    <div className={`absolute top-0 right-0 p-20 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] ${color}`}>
      {icon}
    </div>
    <div className="flex flex-col lg:flex-row gap-20 relative z-10">
      <div className="lg:w-1/3">
        <div className={`mb-10 p-5 inline-block rounded-none border-l-2 ${color === 'gold' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-blue-600 bg-blue-600/5'}`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-12 h-12 ${color === 'gold' ? 'text-[#D4AF37]' : 'text-blue-500'}` })}
        </div>
        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-8 leading-tight">{title}</h2>
        <p className="text-gray-500 text-lg leading-relaxed font-light italic">
          Une ingénierie de précision pour les mandats les plus exigeants de la sous-région.
        </p>
      </div>
      <div className="lg:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10 }}
              className="flex items-start space-x-6 group/item"
            >
              <CheckCircle2 className={`w-6 h-6 shrink-0 mt-1 transition-colors ${color === 'gold' ? 'text-[#D4AF37]/40 group-hover/item:text-[#D4AF37]' : 'text-blue-500/40 group-hover/item:text-blue-500'}`} />
              <span className="text-xl text-gray-300 font-light group-hover/item:text-white transition-colors">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pt-24 pb-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-900/5 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-40 pt-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] font-bold tracking-[0.5em] uppercase text-xs mb-6 block"
          >
            Savoir-Faire Signature
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif font-bold text-white mb-10 tracking-tighter"
          >
            Nos <span className="gold-text-gradient">Sphères</span> d'Expertise
          </motion.h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
        </div>

        <ServiceSection 
          index={0}
          icon={<Scale />}
          color="gold"
          title="Pôle Conseils & Assistance"
          services={[
            "Ingénierie Juridique et Fiscale",
            "Accompagnement Stratégique M&A",
            "Levée de Fonds Souveraine",
            "Compliance & Normes OHADA",
            "Management Capital Humain"
          ]}
        />

        <ServiceSection 
          index={1}
          icon={<TrendingUp />}
          color="blue"
          title="Pôle Solutions Commerciales"
          services={[
            "Intelligence de Marché B2B",
            "Force de Vente Haute-Fidélité",
            "Optimisation de Portefeuille CRM",
            "Brokerage de Services Premium",
            "Audit de Performance de Vitesse"
          ]}
        />

        <ServiceSection 
          index={2}
          icon={<Briefcase />}
          color="gold"
          title="Pôle Solutions Marketing"
          services={[
            "Digital Growth Ecosystems",
            "Consumer Behavior Insights",
            "Branding d'Héritage & Prestige",
            "Trade Marketing Expérientiel",
            "Management de Réputation"
          ]}
        />
      </div>
    </div>
  );
};

export default Services;
