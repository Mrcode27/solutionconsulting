import React, { useState } from 'react';
import { useSEO } from '../utils/seoHelmet';
import { Link } from 'react-router-dom';

const initialAnswers = {
  org_processes: 1,
  team_autonomy: 3,
  strategic_planning: 1,
  acquisition_split: 'passive',
  crm_level: 1,
  commercial_kpis: 1,
  finance_frequency: 1,
  cash_visibility: 1,
  autofinance: 1,
  collaboration_tools: 1,
  digital_performance: 1,
  cybersecurity: 1,
  company_name: '',
  sector: '',
  employees: '',
  revenue: '',
  email: '',
  phone: '',
  consent: false,
};

const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState(initialAnswers as any);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [sending, setSending] = useState(false);
  useSEO({
    title: 'Diagnostic Stratégique — Audit Performance 360°',
    description: 'Évaluez votre maturité stratégique, performance commerciale, santé financière et transformation digitale en 5–7 minutes.',
    keywords: 'diagnostic stratégique, audit performance, auto-évaluation, questionnaire entreprise, PME',
    ogTitle: 'Diagnostic Stratégique | Solutions Consulting',
    ogDescription: 'Audit Performance 360° - Auto-évaluation gratuite pour dirigeants',
    canonicalUrl: 'https://solutionconsulting.biz/#/questionnaire'
  });

  const handleChange = (k: string, v: any) => setAnswers((s: any) => ({ ...s, [k]: v }));

  const computeScore = (a: any) => {
    // Simple weighting: each question 0-100 normalized then averaged
    const mapLevel = (val: any, max = 4) => {
      const n = Number(val) || 1;
      return Math.max(0, Math.min(max, n));
    };

    const scores = [] as number[];
    // AXE 1
    scores.push((mapLevel(a.org_processes,4) / 4) * 100);
    scores.push(((Number(a.team_autonomy) - 1) / 4) * 100);
    scores.push(((mapLevel(a.strategic_planning,3) - 1) / 2) * 100);
    // AXE 2
    const acqScore = a.acquisition_split === 'passive' ? 25 : a.acquisition_split === 'mix' ? 60 : 100;
    scores.push(acqScore);
    scores.push((mapLevel(a.crm_level,4) / 4) * 100);
    scores.push((mapLevel(a.commercial_kpis,3) / 3) * 100);
    // AXE 3
    scores.push((mapLevel(a.finance_frequency,4) / 4) * 100);
    scores.push((mapLevel(a.cash_visibility,3) / 3) * 100);
    scores.push((mapLevel(a.autofinance,3) / 3) * 100);
    // AXE 4
    scores.push((mapLevel(a.collaboration_tools,4) / 4) * 100);
    scores.push((mapLevel(a.digital_performance,4) / 4) * 100);
    scores.push((mapLevel(a.cybersecurity,4) / 4) * 100);

    const avg = Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
    return { avg, scores };
  };

  const recommendationsForScore = (s: number) => {
    const recs: string[] = [];
    if (s < 40) {
      recs.push('Priorité 1: Documenter processus critiques et sécuriser trésorerie.');
      recs.push('Priorité 2: Mettre en place CRM basique et suivi CAC.');
      recs.push('Priorité 3: Plan de trésorerie 3–6 mois.');
    } else if (s < 70) {
      recs.push('Priorité 1: Structurer plan stratégique 3 ans et KPIs.');
      recs.push('Priorité 2: Automatiser workflows et améliorer acquisition numérique.');
      recs.push('Priorité 3: Renforcer sauvegardes et MFA.');
    } else {
      recs.push('Priorité 1: Déployer plateforme intégrée CRM/Marketing et attribution multi-canal.');
      recs.push('Priorité 2: Scénarios financiers 12–24 mois et pilotage hebdo.');
      recs.push('Priorité 3: Audits de pentest et conformité RGPD/NIS2 si applicable.');
    }
    return recs;
  };

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    const { avg } = computeScore(answers);
    setScore(avg);
    setSummary({ recommendations: recommendationsForScore(avg) });
    setSubmitted(true);
  };

  const sendReport = async () => {
    if (!answers.consent) return alert('Consentement requis pour envoi.');
    setSending(true);
    const payload = {
      to: answers.email,
      subject: `Rapport Diagnostic — ${answers.company_name || 'Entreprise'}`,
      message: `Score global: ${score}\nSecteur: ${answers.sector}\nRecommandations:\n- ${summary.recommendations.join('\n- ')}`,
    };
    try {
      await fetch('/api/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      alert('Rapport envoyé à l\'email renseigné (vérifier le dossier de réception).');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'envoi.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-white mb-4">Diagnostic Stratégique — Audit Performance 360°</h1>
        <p className="text-gray-400 mb-8">Formulaire d'auto-évaluation rapide pour dirigeants. Durée estimée: 5–7 minutes. Vos réponses sont anonymisées si vous le souhaitez.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8 bg-[#0a0f1f] p-8 border border-white/10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">Axe 1 — Organisation & Gouvernance</h3>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">1.1 Formalisation des processus</div>
                <select value={answers.org_processes} onChange={(e) => handleChange('org_processes', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Niveau 1 — Aucune documentation</option>
                  <option value={2}>Niveau 2 — Procédures partielles</option>
                  <option value={3}>Niveau 3 — Manuel opérationnel</option>
                  <option value={4}>Niveau 4 — Système intégré</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">1.2 Autonomie des équipes (1 à 5)</div>
                <input type="range" min={1} max={5} value={answers.team_autonomy} onChange={(e) => handleChange('team_autonomy', Number(e.target.value))} />
                <div className="text-xs text-gray-400 mt-1">Valeur: {answers.team_autonomy}</div>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">1.3 Planification stratégique</div>
                <select value={answers.strategic_planning} onChange={(e) => handleChange('strategic_planning', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Réactif — Pas de vision écrite</option>
                  <option value={2}>Planifié — Feuille de route 1–3 ans</option>
                  <option value={3}>Proactif — Stratégie 3–5 ans</option>
                </select>
              </label>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">Axe 2 — Performance commerciale & Relation client</h3>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">2.1 Acquisition client — répartition</div>
                <select value={answers.acquisition_split} onChange={(e) => handleChange('acquisition_split', e.target.value)} className="w-full bg-black/60 p-3">
                  <option value={'passive'}>&gt;80% passif</option>
                  <option value={'mix'}>Mix 50/50</option>
                  <option value={'proactive'}>&gt;80% proactif</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">2.2 Gestion de la relation client</div>
                <select value={answers.crm_level} onChange={(e) => handleChange('crm_level', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Niveau 1 — Suivi manuel</option>
                  <option value={2}>Niveau 2 — CRM basique</option>
                  <option value={3}>Niveau 3 — CRM avancé</option>
                  <option value={4}>Niveau 4 — Plateforme intégrée</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">2.3 Connaissance des indicateurs clés commerciaux</div>
                <select value={answers.commercial_kpis} onChange={(e) => handleChange('commercial_kpis', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>CAC inconnu</option>
                  <option value={2}>CAC estimé</option>
                  <option value={3}>CAC & LTV maîtrisés</option>
                </select>
              </label>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">Axe 3 — Santé financière & Pilotage</h3>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">3.1 Fréquence de pilotage financier</div>
                <select value={answers.finance_frequency} onChange={(e) => handleChange('finance_frequency', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Annuel</option>
                  <option value={2}>Trimestriel</option>
                  <option value={3}>Mensuel</option>
                  <option value={4}>Hebdo/Quotidien</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">3.2 Visibilité de trésorerie</div>
                <select value={answers.cash_visibility} onChange={(e) => handleChange('cash_visibility', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Réactive &lt;1 mois</option>
                  <option value={2}>Prévisionnelle 3–6 mois</option>
                  <option value={3}>Stratégique 12–24 mois</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">3.3 Capacité d'autofinancement</div>
                <select value={answers.autofinance} onChange={(e) => handleChange('autofinance', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Faible</option>
                  <option value={2}>Modérée</option>
                  <option value={3}>Forte</option>
                </select>
              </label>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold text-white">Axe 4 — Transformation digitale & Cybersécurité</h3>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">4.1 Outils de collaboration & productivité</div>
                <select value={answers.collaboration_tools} onChange={(e) => handleChange('collaboration_tools', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Traditionnels</option>
                  <option value={2}>Numérisés</option>
                  <option value={3}>Collaboratifs</option>
                  <option value={4}>Automatisés</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">4.2 Performance digitale & génération de leads</div>
                <select value={answers.digital_performance} onChange={(e) => handleChange('digital_performance', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Vitrine</option>
                  <option value={2}>Actif</option>
                  <option value={3}>Stratégique</option>
                  <option value={4}>Leader</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-gray-300 mb-2">4.3 Maturité cybersécurité</div>
                <select value={answers.cybersecurity} onChange={(e) => handleChange('cybersecurity', Number(e.target.value))} className="w-full bg-black/60 p-3">
                  <option value={1}>Débutant</option>
                  <option value={2}>Interne</option>
                  <option value={3}>Avancé</option>
                  <option value={4}>Robuste</option>
                </select>
              </label>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-white">Informations entreprise (optionnel pour anonymisé)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Nom de l'entreprise" value={answers.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="p-3 bg-black/60" />
                <input placeholder="Secteur d'activité" value={answers.sector} onChange={(e) => handleChange('sector', e.target.value)} className="p-3 bg-black/60" />
                <select value={answers.employees} onChange={(e) => handleChange('employees', e.target.value)} className="p-3 bg-black/60">
                  <option value="">Effectif</option>
                  <option value="1-9">1–9</option>
                  <option value="10-49">10–49</option>
                  <option value="50-249">50–249</option>
                  <option value="250+">250+</option>
                </select>
                <input placeholder="CA annuel (estimation)" value={answers.revenue} onChange={(e) => handleChange('revenue', e.target.value)} className="p-3 bg-black/60" />
                <input placeholder="Email professionnel" value={answers.email} onChange={(e) => handleChange('email', e.target.value)} className="p-3 bg-black/60" />
                <input placeholder="Téléphone" value={answers.phone} onChange={(e) => handleChange('phone', e.target.value)} className="p-3 bg-black/60" />
              </div>

              <label className="flex items-center space-x-3 mt-4">
                <input type="checkbox" checked={answers.consent} onChange={(e) => handleChange('consent', e.target.checked)} />
                <span className="text-xs text-gray-400">J'accepte de recevoir le rapport à l'email renseigné</span>
              </label>
            </section>

            <div className="flex items-center justify-between">
              <button type="submit" className="px-8 py-3 bg-[#D4AF37] text-black font-bold">Obtenir mon diagnostic</button>
              <Link to="/" className="text-sm text-gray-400">Retour</Link>
            </div>
          </form>
        ) : (
          <div className="bg-[#070707] p-8 border border-white/5 space-y-6">
            <h2 className="text-2xl font-bold">Votre résultat</h2>
            <div className="text-6xl font-serif font-black text-white">{score}%</div>
            <p className="text-gray-400">Analyse comparative: <span className="text-[#D4AF37]">Segment et benchmarking en cours</span></p>

            <div>
              <h3 className="font-bold">Plan d'action priorisé (90 jours)</h3>
              <ul className="list-disc ml-6 mt-3 text-gray-300">
                {summary.recommendations.map((r: string, idx: number) => (
                  <li key={idx} className="mb-2">{r}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={sendReport} disabled={sending} className="px-6 py-3 bg-[#D4AF37] text-black font-bold">Envoyer le rapport</button>
              <Link to="/contact" className="px-6 py-3 border border-white/10">Demander un accompagnement</Link>
            </div>

            <div className="text-xs text-gray-500">En soumettant, vous acceptez la confidentialité mentionnée. Données anonymisées si nom non renseigné.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
