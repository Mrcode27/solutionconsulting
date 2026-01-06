
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Diamond, Star, ShieldCheck, Map as MapIcon } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Conseil Juridique & Fiscal',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mandat reçu. Un de nos conseillers seniors vous contactera via canal sécurisé sous 12h.');
    setFormState({ name: '', email: '', subject: 'Conseil Juridique & Fiscal', message: '' });
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-40 relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-blue-900/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32 pt-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#D4AF37] font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block"
          >
            Ligne Directe Elite
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 tracking-tighter">
            Initiez la <span className="gold-text-gradient italic">Mutation.</span>
          </h1>
          <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto italic">
            Confidentialité garantie. Votre demande est traitée par notre cellule stratégique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          {/* Contact Cards - Side */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-10">
              <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Conciergerie</h2>
              
              <div className="space-y-6">
                {[
                  { icon: <Phone />, label: "Canal Vocal", val: "+237 6XX XXX XXX" },
                  { icon: <Mail />, label: "Cryptage Mail", val: "elite@solutions-consulting.cm" },
                  { icon: <MapPin />, label: "Siège Global", val: "Bonamoussadi, Douala - Cameroun" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center p-8 bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 group">
                    <div className="w-14 h-14 bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mr-8 group-hover:bg-[#D4AF37]/10 transition-colors">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6 text-[#D4AF37]' })}
                    </div>
                    <div>
                      <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-white font-serif text-lg">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 bg-gradient-to-br from-blue-950/20 to-black border border-blue-900/30 sapphire-glow">
              <div className="flex items-center mb-8">
                <MessageSquare className="text-blue-500 mr-4 w-8 h-8" />
                <h3 className="text-xl font-serif font-bold">Liaison Instantanée</h3>
              </div>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed font-light">
                Pour une consultation d'urgence ou un roadshow imminent, activez notre canal WhatsApp Premium.
              </p>
              <button className="w-full py-4 border border-[#D4AF37] text-[#D4AF37] font-black uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-all">
                Lancer la Connexion
              </button>
            </div>
          </div>

          {/* Contact Form - Main */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-12 lg:p-20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <ShieldCheck className="w-32 h-32 text-[#D4AF37]" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Identité Complète</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light"
                      placeholder="M. / Mme Nom Prénom"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Email Institutionnel</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light"
                      placeholder="direction@votre-groupe.com"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Nature du Mandat</label>
                  <select 
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light appearance-none cursor-pointer"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  >
                    <option className="bg-black">Conseil Juridique & Fiscal Luxe</option>
                    <option className="bg-black">Levée de Fonds Souveraine</option>
                    <option className="bg-black">Externalisation Commerciale Elite</option>
                    <option className="bg-black">Marketing de Prestige</option>
                    <option className="bg-black">Audit de Gouvernance</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Détails du Projet</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light"
                    placeholder="Brief succinct de vos ambitions..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="pt-10">
                  <button 
                    type="submit"
                    className="w-full py-8 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-black text-2xl uppercase tracking-[0.3em] transition-all duration-700 hover:bg-[#D4AF37] hover:text-black gold-glow flex items-center justify-center group"
                  >
                    Envoyer le Mandat <Send className="ml-6 w-8 h-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
                  </button>
                  <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.4em] font-bold">
                    Toutes les données sont cryptées en AES-256
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Location Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white uppercase tracking-widest mb-4 flex items-center justify-center">
              <MapIcon className="mr-4 text-[#D4AF37]" /> Localisation de Prestige
            </h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-40"></div>
          </div>
          
          <div className="glass-card p-2 sapphire-glow overflow-hidden relative group">
            {/* Elegant Map Overlay for the premium feel */}
            <div className="absolute inset-0 border-2 border-[#D4AF37]/10 pointer-events-none z-10 group-hover:border-[#D4AF37]/30 transition-all duration-1000"></div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31837.26040854403!2d9.72895245!3d4.07590815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d7a64197995%3A0xe7585292455913f0!2sBonamoussadi%2C%20Douala!5e0!3m2!1sen!2scm!4v1715600000000!5m2!1sen!2scm" 
              width="100%" 
              height="600" 
              style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(90%) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-1000 opacity-80 group-hover:opacity-100"
            ></iframe>
            
            <div className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-80 p-8 glass-card sapphire-glow bg-black/80 z-20">
              <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-4">Quartier d'Affaires</h4>
              <p className="text-white font-serif text-xl mb-4">Bonamoussadi, Douala</p>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Situé dans l'un des quartiers les plus dynamiques du Littoral, notre siège accueille l'élite économique pour des sessions stratégiques privées.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
