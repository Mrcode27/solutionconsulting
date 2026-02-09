
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Diamond, Star, ShieldCheck, Map as MapIcon, X, Check, AlertTriangle } from 'lucide-react';
import { useSEO } from '../utils/seoHelmet';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useSEO({
    title: "Demander un Audit Gratuit | Solutions Consulting Cameroun",
    description: "Diagnostic stratégique gratuit pour votre entreprise. Contactez nos conseillers seniors. Confidentialité garantie.",
    keywords: "contact solutions consulting, audit gratuit, diagnostic stratégique, consultation PME",
    ogTitle: "Contact & Diagnostic Gratuit | Solutions Consulting",
    ogDescription: "Transformez votre entreprise avec un diagnostic gratuit",
    canonicalUrl: "https://solutionconsulting.biz/contact"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://solutionconsulting.biz/api/send_mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Audit gratuit demandé. Un de nos conseillers seniors vous contactera sous 12h pour fixer votre session de diagnostic.'
        });
        setFormState({ name: '', company: '', service: '', budget: '', message: '' });
      } else {
        setNotification({ type: 'error', message: 'Erreur lors de l\'envoi: ' + result.message });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ type: 'error', message: 'Une erreur est survenue lors de la connexion au serveur.' });
    } finally {
      setIsSubmitting(false);
    }
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
            Diagnostic Stratégique Gratuit
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-10 tracking-tighter">
            Prêt à transformer votre <span className="gold-text-gradient italic">entreprise</span> ?
          </h1>
          <p className="text-2xl text-gray-500 font-medium max-w-3xl mx-auto italic">
            Sollicitez votre premier diagnostic gratuit dès aujourd'hui. Confidentialité garantie. Votre demande est traitée par notre cellule stratégique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          {/* Contact Cards - Side */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-10">
              <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-tight">Conciergerie</h2>
              
              <div className="space-y-6">
                {[
                  { icon: <Phone />, label: "Téléphone", val: "+237 671894722" },
                  { icon: <Mail />, label: "Email", val: "info@solutionconsulting.biz" },
                  { icon: <MapPin />, label: "Siège Social", val: "Douala, Cameroun" }
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
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="text-green-500 mr-4 w-8 h-8"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.536 0 1.52 1.115 2.989 1.264 3.187.149.198 2.19 3.361 5.27 4.718 2.179.962 3.042.775 3.614.725.643-.055 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <h3 className="text-xl font-serif font-bold">Liaison Instantanée</h3>
              </div>
              <p className="text-gray-300 text-sm mb-10 leading-relaxed font-medium">
                Pour une consultation d'urgence ou un roadshow imminent, contacté nous sur WhatsApp .
              </p>
              <a 
                href="https://wa.me/+237671894722"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-4 border border-[#D4AF37] text-[#D4AF37] font-black uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Lancer la Connexion
              </a>
             
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
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Nom Complet *</label>
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
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Entreprise *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light"
                      placeholder="Nom de votre entreprise"
                      value={formState.company}
                      onChange={(e) => setFormState({...formState, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Service Souhaité *</label>
                    <select 
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light appearance-none cursor-pointer"
                      value={formState.service}
                      onChange={(e) => setFormState({...formState, service: e.target.value})}
                      required
                    >
                      <option className="bg-black" value="">Sélectionner un service</option>
                      <option className="bg-black" value="strategic">Accompagnement Stratégique</option>
                      <option className="bg-black" value="fundraising">Levée de Fonds</option>
                      <option className="bg-black" value="marketing">Gestion Marketing 360°</option>
                      <option className="bg-black" value="commercial">Performance Commerciale</option>
                      <option className="bg-black" value="operational">Gestion Opérationnelle & Juridique</option>
                      <option className="bg-black" value="representation">Représentation Étrangère</option>
                      <option className="bg-black" value="other">Autre</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Budget Estimatif</label>
                    <select 
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light appearance-none cursor-pointer"
                      value={formState.budget}
                      onChange={(e) => setFormState({...formState, budget: e.target.value})}
                    >
                      <option className="bg-black" value="">Sélectionner une fourchette</option>
                      <option className="bg-black" value="small">Moins de 5M XAF</option>
                      <option className="bg-black" value="medium">5 à 20M XAF</option>
                      <option className="bg-black" value="large">20 à 100M XAF</option>
                      <option className="bg-black" value="xlarge">Plus de 100M XAF</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Message / Brief *</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all text-xl font-light"
                    placeholder="Décrivez brièvement votre projet et vos enjeux..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="pt-10">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-8 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-black text-2xl uppercase tracking-[0.3em] transition-all duration-700 hover:bg-[#D4AF37] hover:text-black gold-glow flex items-center justify-center group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : "Demander l'Audit Gratuit"} 
                    {!isSubmitting && <Send className="ml-6 w-8 h-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />}
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
                <p className="text-gray-300 text-sm font-medium leading-relaxed">
                Situé dans l'un des quartiers les plus dynamiques du Littoral, notre siège accueille l'élite économique pour des sessions stratégiques privées.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setNotification(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(212,175,55,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setNotification(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border ${notification.type === 'success' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-red-900/10 border-red-500/30 text-red-500'}`}>
                  {notification.type === 'success' ? <Check className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                </div>
                
                <h3 className={`text-2xl font-serif font-bold mb-4 ${notification.type === 'success' ? 'text-white' : 'text-red-500'}`}>
                  {notification.type === 'success' ? 'Demande Reçue' : 'Erreur'}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-8">
                  {notification.message}
                </p>
                
                <button
                  onClick={() => setNotification(null)}
                  className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
