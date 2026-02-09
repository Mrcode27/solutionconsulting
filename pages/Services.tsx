
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, TrendingUp, Users, CheckCircle2, Briefcase, BarChart3, Globe, DollarSign, Building2 } from 'lucide-react';
import { useSEO } from '../utils/seoHelmet';

const ServiceSection = ({ icon, title, description, services, color, index }: { icon: any, title: string, description: string, services: string[], color: string, index: number }) => (
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
        <p className="text-gray-300 text-lg leading-relaxed font-light italic">
          {description}
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
  useSEO({
    title: "Services Conseil Stratégique, Financement & Marketing | Solutions Consulting",
    description: "Découvrez nos services : conseil stratégique PME, levée de fonds, gestion marketing 360°, optimisation commerciale et gestion opérationnelle OHADA.",
    keywords: "services conseil, levée de fonds, marketing digital, gestion commerciale, conseil OHADA, stratégie PME",
    ogTitle: "Nos Services | Solutions Consulting Sarl",
    ogDescription: "Cinq sphères d'expertise pour transformer votre entreprise",
    canonicalUrl: "https://solutionconsulting.biz/#/services"
  });

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
          title="Accompagnement & Conseil Stratégique des PME"
          description="Nous aidons les dirigeants de PME à sortir de l'opérationnel pour piloter leur stratégie."
          services={[
            "Diagnostic organisationnel et restructuration",
            "Élaboration de Business Plans bancables",
            "Ingénierie juridique et fiscale (Conseil OHADA)",
            "Stratégie de croissance et transformation digitale",
            "Gestion du changement organisationnel"
          ]}
        />

        <ServiceSection 
          index={1}
          icon={<DollarSign />}
          color="blue"
          title="Recherche de Financements Extérieurs (Levée de Fonds)"
          description="Accédez aux capitaux nécessaires pour changer d'échelle."
          services={[
            "Intermédiation financière auprès de banques locales et internationales",
            "Préparation des dossiers d'investissement (Pitch Deck, Modélisation Financière)",
            "Accès aux fonds de Capital-Investissement (Private Equity) et Business Angels",
            "Structuration des tours de financement",
            "Négociation des termes de financement"
          ]}
        />

        <ServiceSection 
          index={2}
          icon={<BarChart3 />}
          color="gold"
          title="Gestion Marketing à 360°"
          description="Une visibilité maximale pour un impact réel."
          services={[
            "Stratégie de marque (Branding) et Identité Visuelle",
            "Marketing Digital & Social Media Management",
            "Études de marché et tests de produits sur le terrain",
            "Positionnement stratégique et communication",
            "Campagnes marketing intégrées"
          ]}
        />

        <ServiceSection 
          index={3}
          icon={<TrendingUp />}
          color="blue"
          title="Gestion Commerciale à 360° (Performance Commerciale)"
          description="Nous ne nous contentons pas de conseiller, nous vendons pour vous."
          services={[
            "Externalisation de la force de vente (Sales Outsourcing)",
            "Prospection terrain B2B et B2C",
            "Mise en place de systèmes de suivi de performance (CRM)",
            "Formation et encadrement des équipes commerciales",
            "Développement de stratégies de vente et de partenariats"
          ]}
        />

        <ServiceSection 
          index={4}
          icon={<Building2 />}
          color="gold"
          title="Gestion Opérationnelle & Juridique"
          description="Un accompagnement 360° pour structurer, sécuriser et optimiser votre entreprise. De la constitution juridique à la gestion patrimoniale, nous sommes le socle de votre pérennité."
          services={[
            "Création & Constitution de Société (Clé en main)",
            "Secrétariat Juridique & Conformité OHADA",
            "Gestion Administrative & Externalisation Back-office",
            "Audit Organisationnel & Optimisation des Processus",
            "Gestion Patrimoniale & Protection des Actifs",
            "Services Financiers & Recherche de Subventions",
            "Rédaction de Contrats & Compliance",
            "Formalités Administratives & Fiscales",
            "Assistance aux appels d'offres & Marchés Publics"
          ]}
        />
      </div>
    </div>
  );
};

export default Services;
