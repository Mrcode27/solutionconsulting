import React, { useState } from 'react';
import { useSEO } from '../utils/seoHelmet';
import { Link } from 'react-router-dom';

// ------------------------------------------------------------
// Initial state basé sur le référentiel DSP360™ (9 pages)
// ------------------------------------------------------------
const initialAnswers = {
  // A – INFORMATIONS GÉNÉRALES
  company_name: '',
  legal_form: '',
  sector: '',
  employees_size: '',
  respondent_function: '',

  // B – ORGANISATION, GOUVERNANCE & PROCESSUS
  b1_formalisation: 0,
  b2_autonomy: 0,
  b3_strategic_planning: 0,

  // C – MARCHÉ, CLIENTS & POSITIONNEMENT
  c1_acquisition: 0,
  c2_crm: 0,
  c3_commercial_kpis: 0,
  c4_sector_experience: 0,
  c5_supplier_mastery: 0,
  c6_client_mastery: 0,

  // D – PERFORMANCE FINANCIÈRE
  d1_finance_pilotage: 0,
  d2_cash_visibility: 0,
  d3_autofinance: 0,

  // E – DIGITAL & SÉCURITÉ
  e1_digital_tools: 0,
  e2_digital_performance: 0,
  e3_cybersecurity: 0,

  // F – APPRENTISSAGE & CROISSANCE
  f1_skills_development: 0,
  f2_leadership_dependence: 0,
  f3_continuous_improvement: 0,

  // G – SOUS-TRAITANCE & CONFORMITÉ
  g0_subcontract_status: 'aucun',
  g1_gouvernance: 0,
  g2_conformity: 0,
  g3_preparation: 0,

  // CONTACT & CONSENTEMENT
  email: '',
  phone: '',
  consent: false,
};

// ------------------------------------------------------------
// Définition des étapes (pagination)
// ------------------------------------------------------------
const STEPS = [
  { id: 'A', title: 'Informations générales' },
  { id: 'B', title: 'Organisation & Gouvernance' },
  { id: 'C', title: 'Marché, Clients & Positionnement' },
  { id: 'D', title: 'Performance financière' },
  { id: 'E', title: 'Digital & Sécurité' },
  { id: 'F', title: 'Apprentissage & Croissance' },
  { id: 'G', title: 'Sous-traitance & Conformité' },
  { id: 'final', title: 'Contact & Diagnostic' },
];

const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [maxPossible, setMaxPossible] = useState<number | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [sending, setSending] = useState(false);

  useSEO({
    title: 'Diagnostic DSP360 — Audit stratégique & conformité',
    description: 'Diagnostic paginé en 8 étapes : gouvernance, marché, finance, digital, sous-traitance. 8–12 min.',
    keywords: 'DSP360, diagnostic PME, sous-traitance Cameroun, loi 2025/010',
    ogTitle: 'Diagnostic DSP360 | KNN Consulting',
    ogDescription: 'Auto‑évaluation confidentielle – 25 critères',
    canonicalUrl: 'https://solutionconsulting.biz/#/questionnaire'
  });

  const handleChange = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // --------------------------------------------------------
  // Calcul du score total (règle 0-3)
  // --------------------------------------------------------
  const computeScore = (ans: typeof initialAnswers) => {
    const b = [ans.b1_formalisation, ans.b2_autonomy, ans.b3_strategic_planning];
    const c = [
      ans.c1_acquisition,
      ans.c2_crm,
      ans.c3_commercial_kpis,
      ans.c4_sector_experience,
      ans.c5_supplier_mastery,
      ans.c6_client_mastery,
    ];
    const d = [ans.d1_finance_pilotage, ans.d2_cash_visibility, ans.d3_autofinance];
    const e = [ans.e1_digital_tools, ans.e2_digital_performance, ans.e3_cybersecurity];
    const f = [ans.f1_skills_development, ans.f2_leadership_dependence, ans.f3_continuous_improvement];

    let total = 0;
    [...b, ...c, ...d, ...e, ...f].forEach(v => (total += Number(v)));

    let gMax = 0;
    if (ans.g0_subcontract_status === 'donneur' || ans.g0_subcontract_status === 'both') {
      total += Number(ans.g1_gouvernance);
      gMax += 3;
    }
    if (ans.g0_subcontract_status === 'sous-traitant' || ans.g0_subcontract_status === 'both') {
      total += Number(ans.g2_conformity);
      gMax += 3;
    }
    if (ans.g0_subcontract_status === 'aucun') {
      total += Number(ans.g3_preparation);
      gMax += 3;
    }

    const baseMax = 54;
    const overallMax = baseMax + gMax;
    const percentage = Math.round((total / overallMax) * 100);
    return { total, max: overallMax, percentage };
  };

  const recommendationsForScore = (pct: number) => {
    if (pct < 30) return ['🔴 Stabiliser : formaliser processus critiques, trésorerie 3 mois', '🔴 Structurer : stratégie commerciale, réduire dépendance', '🔴 Conformité : veille loi 2025/010'];
    if (pct < 55) return ['🟡 Professionnaliser : déployer CRM, piloter CAC', '🟡 Digitaliser : outils collaboratifs, cybersécurité', '🟡 Anticiper : plan compétences, formaliser sous‑traitance'];
    if (pct < 80) return ['🟢 Optimiser : automatisation, prévisions 12‑24 mois', '🟢 Croître : digital canal majeur, rentabilité client', '🟢 Pérenniser : audit sécurité, politique sous‑traitance'];
    return ['⭐ Excellence : système intégré, data‑driven', '⭐ Innovation : conformité NIS2/RGPD, diversification', '⭐ Rayonnement : leadership, appels d’offres'];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { total, max, percentage } = computeScore(answers);
    setScore(percentage);
    setMaxPossible(max);
    setSummary({
      totalScore: total,
      maxScore: max,
      recommendations: recommendationsForScore(percentage),
    });
    setSubmitted(true);
  };

  const sendReport = async () => {
    if (!answers.consent) return alert('Veuillez accepter de recevoir le rapport.');
    setSending(true);
    const payload = {
      to: answers.email,
      subject: `Rapport DSP360 — ${answers.company_name || 'Diagnostic'}`,
      message: `Score : ${score}% (${summary?.totalScore}/${summary?.maxScore})\nRecommandations :\n${summary?.recommendations.join('\n')}`,
    };
    try {
      await fetch('/api/send_mail.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      alert('Rapport envoyé (vérifiez vos spams).');
    } catch {
      alert('Erreur réseau.');
    } finally {
      setSending(false);
    }
  };

  // Navigation
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // --------------------------------------------------------
  // Rendu des étapes (chaque page retourne le contenu)
  // --------------------------------------------------------
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepA answers={answers} handleChange={handleChange} />;
      case 1: return <StepB answers={answers} handleChange={handleChange} />;
      case 2: return <StepC answers={answers} handleChange={handleChange} />;
      case 3: return <StepD answers={answers} handleChange={handleChange} />;
      case 4: return <StepE answers={answers} handleChange={handleChange} />;
      case 5: return <StepF answers={answers} handleChange={handleChange} />;
      case 6: return <StepG answers={answers} handleChange={handleChange} />;
      case 7: return <StepFinal answers={answers} handleChange={handleChange} handleSubmit={handleSubmit} />;
      default: return null;
    }
  };

  if (submitted) {
    // ---------- Écran résultat (identique, avec glow) ----------
    return (
      <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0a0f1f] p-8 border border-[#D4AF37]/30 shadow-[0_0_25px_rgba(212,175,55,0.2)] rounded-lg space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">📊 Votre maturité DSP360™</h2>
              <span className="bg-black px-3 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-xs">CONFIDENTIEL</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="relative w-36 h-36 rounded-full border-4 border-[#D4AF37]/30 flex items-center justify-center bg-black shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <span className="text-5xl font-black text-white">{score}<span className="text-xl text-[#D4AF37]">%</span></span>
              </div>
              <div className="flex-1">
                <div className="h-4 w-full bg-black/70 rounded-full overflow-hidden border border-blue-800">
                  <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: `${score}%` }}></div>
                </div>
                <p className="text-sm text-blue-300 mt-2">Score {summary?.totalScore}/{summary?.maxScore}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-black/60 p-5 border-l-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <h3 className="font-bold text-white mb-2">🧠 Analyse</h3>
                <p className="text-gray-300 text-sm">{score && score < 30 ? 'Niveau de base' : score < 55 ? 'Structuration' : score < 80 ? 'Performance' : 'Excellence'}</p>
              </div>
              <div className="bg-black/60 p-5 border-l-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <h3 className="font-bold text-white mb-2">📌 Plan 90j</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {summary?.recommendations.map((r: string, i: number) => <li key={i} className="text-gray-200">{r}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-blue-900/30">
              <button onClick={sendReport} disabled={sending} className="px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                {sending ? 'Envoi...' : '📧 Envoyer le rapport'}
              </button>
              <Link to="/contact" className="px-6 py-3 border border-white/20 hover:border-[#D4AF37]">Accompagnement</Link>
              <button onClick={() => { setSubmitted(false); setScore(null); }} className="text-xs text-gray-500 ml-auto">Modifier</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // Formulaire paginé avec effet glow
  // --------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* En-tête document */}
        <div className="mb-4 pb-2 border-b border-blue-800/30 flex justify-between items-end text-xs uppercase tracking-wider text-gray-400">
          <span className="font-mono">Page {currentStep + 1} / {STEPS.length}</span>
          <span className="text-[#D4AF37]">© 2026 KNN Consulting | MaholAfrica</span>
          <span className="text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded">CONFIDENTIEL</span>
        </div>

        {/* Titre et progression */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-white flex items-center gap-3">
            Diagnostic Stratégique et Performance 360°
            <span className="bg-[#0a1a2f] text-[#D4AF37] text-sm px-3 py-1 rounded-sm border border-[#D4AF37]/30">DSP360™</span>
          </h1>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-1">
              {STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-10 rounded-full transition-all ${idx <= currentStep ? 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.7)]' : 'bg-gray-700'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">{STEPS[currentStep].title}</span>
          </div>
        </div>

        {/* Carte principale avec effet glow */}
        <form onSubmit={handleSubmit} className="bg-[#0a0f1f]/90 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-blue-800/50 shadow-[0_0_40px_rgba(0,100,255,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-shadow duration-500">
          {renderStep()}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-blue-900/40">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-blue-700/60 text-blue-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-900/20 transition"
            >
              ← Précédent
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                Suivant →
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                Obtenir mon diagnostic
              </button>
            )}
          </div>
        </form>

        <p className="text-[10px] text-gray-600 text-center mt-6">
          * Diagnostic confidentiel – données anonymisées si le nom de l’entreprise n’est pas renseigné.
        </p>
      </div>
    </div>
  );
};

export default Questionnaire;

// ============================================================
// COMPOSANTS D'ÉTAPE (chaque page)
// ============================================================

const StepA: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-[#D4AF37]">A –</span> INFORMATIONS GÉNÉRALES</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input type="text" placeholder="A1. Nom de l’entreprise" value={answers.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition" />
      <select value={answers.legal_form} onChange={(e) => handleChange('legal_form', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60 focus:border-[#D4AF37]">
        <option value="">A2. Forme juridique</option>
        <option>EI</option><option>SARL</option><option>SA</option><option>SAS</option><option>GIE</option><option>SCS</option><option>SNC</option><option>SEP</option><option>SCP</option><option>SCI</option><option>SEM</option><option>Sociétés d'État</option><option>Autre</option>
      </select>
      <select value={answers.sector} onChange={(e) => handleChange('sector', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60">
        <option value="">A3. Secteur d’activité</option>
        <option>Agro-industrie</option><option>Industrie</option><option>BTP</option><option>Services</option><option>Télécoms</option><option>Finance</option><option>Autre</option>
      </select>
      <select value={answers.employees_size} onChange={(e) => handleChange('employees_size', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60">
        <option value="">A4. Taille de l’entreprise</option>
        <option>TPE (1–9)</option><option>Petite (10–49)</option><option>Moyenne (50–199)</option><option>Grande (200+)</option>
      </select>
      <select value={answers.respondent_function} onChange={(e) => handleChange('respondent_function', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60 md:col-span-2">
        <option value="">A4 (bis). Fonction du répondant</option>
        <option>Dirigeant</option><option>Direction financière</option><option>Direction opérations</option><option>Commercial</option><option>RH</option><option>Juridique</option><option>Autre</option>
      </select>
    </div>
  </div>
);

const StepB: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="B – ORGANISATION, GOUVERNANCE & PROCESSUS" subtitle="BSC – Processus internes">
    <QuestionSelect label="B1. Formalisation des processus" value={answers.b1_formalisation} onChange={(v) => handleChange('b1_formalisation', v)} options={qOptsB1} />
    <QuestionSelect label="B2. Autonomie organisationnelle" value={answers.b2_autonomy} onChange={(v) => handleChange('b2_autonomy', v)} options={qOptsB2} />
    <QuestionSelect label="B3. Planification stratégique" value={answers.b3_strategic_planning} onChange={(v) => handleChange('b3_strategic_planning', v)} options={qOptsB3} />
  </StepSection>
);

const StepC: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="C – MARCHÉ, CLIENTS & POSITIONNEMENT" subtitle="BSC – Client / Financier">
    <QuestionSelect label="C1. Acquisition de clients" value={answers.c1_acquisition} onChange={(v) => handleChange('c1_acquisition', v)} options={qOptsC1} />
    <QuestionSelect label="C2. Gestion de la relation client" value={answers.c2_crm} onChange={(v) => handleChange('c2_crm', v)} options={qOptsC2} />
    <QuestionSelect label="C3. Pilotage performance commerciale" value={answers.c3_commercial_kpis} onChange={(v) => handleChange('c3_commercial_kpis', v)} options={qOptsC3} />
    <QuestionSelect label="C4. Expérience sectorielle" value={answers.c4_sector_experience} onChange={(v) => handleChange('c4_sector_experience', v)} options={qOptsC4} />
    <QuestionSelect label="C5. Maîtrise des fournisseurs (amont)" value={answers.c5_supplier_mastery} onChange={(v) => handleChange('c5_supplier_mastery', v)} options={qOptsC5} />
    <QuestionSelect label="C6. Maîtrise des clients et débouchés (aval)" value={answers.c6_client_mastery} onChange={(v) => handleChange('c6_client_mastery', v)} options={qOptsC6} />
  </StepSection>
);

const StepD: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="D – PERFORMANCE FINANCIÈRE" subtitle="BSC – Financier">
    <QuestionSelect label="D1. Pilotage financier" value={answers.d1_finance_pilotage} onChange={(v) => handleChange('d1_finance_pilotage', v)} options={qOptsD1} />
    <QuestionSelect label="D2. Visibilité de trésorerie" value={answers.d2_cash_visibility} onChange={(v) => handleChange('d2_cash_visibility', v)} options={qOptsD2} />
    <QuestionSelect label="D3. Capacité d’autofinancement" value={answers.d3_autofinance} onChange={(v) => handleChange('d3_autofinance', v)} options={qOptsD3} />
  </StepSection>
);

const StepE: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="E – DIGITAL & SÉCURITÉ" subtitle="BSC – Processus / Client">
    <QuestionSelect label="E1. Outils digitaux internes" value={answers.e1_digital_tools} onChange={(v) => handleChange('e1_digital_tools', v)} options={qOptsE1} />
    <QuestionSelect label="E2. Performance digitale" value={answers.e2_digital_performance} onChange={(v) => handleChange('e2_digital_performance', v)} options={qOptsE2} />
    <QuestionSelect label="E3. Cybersécurité et continuité" value={answers.e3_cybersecurity} onChange={(v) => handleChange('e3_cybersecurity', v)} options={qOptsE3} />
  </StepSection>
);

const StepF: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="F – APPRENTISSAGE & CROISSANCE" subtitle="BSC – Apprentissage & Croissance">
    <QuestionSelect label="F1. Développement des compétences" value={answers.f1_skills_development} onChange={(v) => handleChange('f1_skills_development', v)} options={qOptsF1} />
    <QuestionSelect label="F2. Leadership et dépendance humaine" value={answers.f2_leadership_dependence} onChange={(v) => handleChange('f2_leadership_dependence', v)} options={qOptsF2} />
    <QuestionSelect label="F3. Amélioration continue" value={answers.f3_continuous_improvement} onChange={(v) => handleChange('f3_continuous_improvement', v)} options={qOptsF3} />
  </StepSection>
);

const StepG: React.FC<{ answers: any; handleChange: (k: string, v: any) => void }> = ({ answers, handleChange }) => (
  <StepSection title="G – SOUS-TRAITANCE & CONFORMITÉ" subtitle="Loi 2025/010">
    <div className="space-y-4">
      <label className="block">
        <div className="text-sm text-gray-300 mb-2 font-medium">G0. Statut sous-traitance</div>
        <select value={answers.g0_subcontract_status} onChange={(e) => handleChange('g0_subcontract_status', e.target.value)} className="w-full p-3 bg-black/70 border border-blue-800/60">
          <option value="aucun">Aucun</option>
          <option value="donneur">Donneur d’ordre</option>
          <option value="sous-traitant">Sous‑traitant</option>
          <option value="both">Les deux</option>
        </select>
      </label>
      {(answers.g0_subcontract_status === 'donneur' || answers.g0_subcontract_status === 'both') && (
        <div className="pl-4 border-l-2 border-[#D4AF37] bg-blue-950/20 p-4 rounded-r">
          <QuestionSelect label="G1. Gouvernance de la sous-traitance (Donneur)" value={answers.g1_gouvernance} onChange={(v) => handleChange('g1_gouvernance', v)} options={qOptsG1} />
        </div>
      )}
      {(answers.g0_subcontract_status === 'sous-traitant' || answers.g0_subcontract_status === 'both') && (
        <div className="pl-4 border-l-2 border-blue-500 bg-blue-950/20 p-4 rounded-r">
          <QuestionSelect label="G2. Conformité et éligibilité (Sous-traitant)" value={answers.g2_conformity} onChange={(v) => handleChange('g2_conformity', v)} options={qOptsG2} />
        </div>
      )}
      {answers.g0_subcontract_status === 'aucun' && (
        <div className="pl-4 border-l-2 border-gray-600 bg-gray-900/50 p-4 rounded-r">
          <QuestionSelect label="G3. Préparation future à la sous-traitance" value={answers.g3_preparation} onChange={(v) => handleChange('g3_preparation', v)} options={qOptsG3} />
        </div>
      )}
    </div>
  </StepSection>
);

const StepFinal: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; handleSubmit: (e: any) => void }> = ({ answers, handleChange, handleSubmit }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-[#D4AF37]">✓</span> FINALISATION</h3>
    <div className="bg-blue-950/20 border border-blue-800/60 p-5 rounded-lg">
      <p className="text-sm text-blue-300 mb-4">Vous êtes sur le point de générer votre diagnostic DSP360™. Pour recevoir le rapport complet, renseignez vos coordonnées :</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" placeholder="Email professionnel *" value={answers.email} onChange={(e) => handleChange('email', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60" required />
        <input type="tel" placeholder="Téléphone (optionnel)" value={answers.phone} onChange={(e) => handleChange('phone', e.target.value)} className="p-3 bg-black/70 border border-blue-800/60" />
      </div>
      <label className="flex items-center space-x-3 mt-4">
        <input type="checkbox" checked={answers.consent} onChange={(e) => handleChange('consent', e.target.checked)} className="accent-[#D4AF37] w-4 h-4" />
        <span className="text-xs text-gray-300">J’accepte de recevoir le rapport détaillé par email (confidentialité garantie).</span>
      </label>
    </div>
  </div>
);

// ------------------------------------------------------------
// Composants auxiliaires
// ------------------------------------------------------------
const StepSection: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-[#D4AF37]">{title.split(' ')[0]}</span> {title.replace(/^.\s–\s/, '')}</h3>
    {subtitle && <p className="text-xs text-blue-400 -mt-2">{subtitle}</p>}
    <div className="space-y-4">{children}</div>
  </div>
);

const QuestionSelect: React.FC<{ label: string; value: number; onChange: (val: number) => void; options: { value: number; label: string }[] }> = ({ label, value, onChange, options }) => (
  <label className="block">
    <div className="text-sm text-gray-300 mb-2 font-medium">{label}</div>
    <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full p-3 bg-black/70 border border-blue-800/60 focus:border-[#D4AF37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)] transition">
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.value} — {opt.label}</option>)}
    </select>
  </label>
);

// ------------------------------------------------------------
// Options de réponse (identiques au référentiel)
// ------------------------------------------------------------
const qOptsB1 = [ { value: 0, label: 'Aucun processus formalisé' }, { value: 1, label: 'Quelques procédures informelles' }, { value: 2, label: 'Processus clés documentés et partagés' }, { value: 3, label: 'Système complet avec contrôle et amélioration continue' } ];
const qOptsB2 = [ { value: 0, label: 'Non, le dirigeant est indispensable au quotidien' }, { value: 1, label: 'Délégation limitée et non formalisée' }, { value: 2, label: 'Responsabilités définies avec reporting' }, { value: 3, label: 'Organisation autonome pilotée par indicateurs' } ];
const qOptsB3 = [ { value: 0, label: 'Aucune stratégie formalisée' }, { value: 1, label: 'Planification annuelle ponctuelle' }, { value: 2, label: 'Vision et objectifs à moyen terme (1–3 ans)' }, { value: 3, label: 'Stratégie claire à 3–5 ans avec suivi par KPI' } ];
const qOptsC1 = [ { value: 0, label: 'Dépendance à quelques clients ou au bouche-à-oreille' }, { value: 1, label: 'Prospection ponctuelle non structurée' }, { value: 2, label: 'Prospection régulière avec canaux identifiés' }, { value: 3, label: 'Système d’acquisition structuré et mesuré' } ];
const qOptsC2 = [ { value: 0, label: 'Aucun outil de suivi' }, { value: 1, label: 'Suivi basique (tableurs, outils simples)' }, { value: 2, label: 'CRM opérationnel' }, { value: 3, label: 'CRM intégré ventes, marketing et service client' } ];
const qOptsC3 = [ { value: 0, label: 'Aucun indicateur suivi' }, { value: 1, label: 'Suivi occasionnel et non structuré' }, { value: 2, label: 'Suivi régulier (mensuel ou trimestriel)' }, { value: 3, label: 'Pilotage data-driven (CAC, rentabilité client, rétention)' } ];
const qOptsC4 = [ { value: 0, label: 'Activité récente ou faible connaissance du secteur' }, { value: 1, label: 'Expérience partielle et compréhension incomplète' }, { value: 2, label: 'Bonne connaissance des acteurs et règles du secteur' }, { value: 3, label: 'Forte expérience et position reconnue dans le secteur' } ];
const qOptsC5 = [ { value: 0, label: 'Dépendance forte à un fournisseur unique' }, { value: 1, label: 'Dépendance à quelques fournisseurs sans alternative claire' }, { value: 2, label: 'Fournisseurs diversifiés avec solutions de repli' }, { value: 3, label: 'Fournisseurs multiples avec relations sécurisées' } ];
const qOptsC6 = [ { value: 0, label: 'Plus de 70–80 % du CA dépend d’un seul client' }, { value: 1, label: 'Forte concentration sur 2–3 clients' }, { value: 2, label: 'Portefeuille clients diversifié' }, { value: 3, label: 'Portefeuille très diversifié et équilibré' } ];
const qOptsD1 = [ { value: 0, label: 'Une fois par an uniquement' }, { value: 1, label: 'Analyse ponctuelle' }, { value: 2, label: 'Analyse mensuelle structurée' }, { value: 3, label: 'Tableaux de bord financiers réguliers' } ];
const qOptsD2 = [ { value: 0, label: 'Moins d’un mois' }, { value: 1, label: 'Entre 1 et 3 mois' }, { value: 2, label: 'Entre 3 et 12 mois' }, { value: 3, label: 'Plus de 12 mois avec prévisions' } ];
const qOptsD3 = [ { value: 0, label: 'Dépendance totale aux financements externes' }, { value: 1, label: 'Autofinancement limité' }, { value: 2, label: 'Capacité régulière d’investissement' }, { value: 3, label: 'Croissance majoritairement autofinancée' } ];
const qOptsE1 = [ { value: 0, label: 'Outils basiques uniquement' }, { value: 1, label: 'Bureautique numérique' }, { value: 2, label: 'Outils collaboratifs structurés' }, { value: 3, label: 'Processus digitalisés et automatisés' } ];
const qOptsE2 = [ { value: 0, label: 'Aucune opportunité générée' }, { value: 1, label: 'Opportunités occasionnelles' }, { value: 2, label: 'Génération régulière de leads' }, { value: 3, label: 'Canal digital majeur de croissance' } ];
const qOptsE3 = [ { value: 0, label: 'Aucun dispositif formalisé' }, { value: 1, label: 'Mesures de base uniquement' }, { value: 2, label: 'Politique de sécurité formalisée' }, { value: 3, label: 'Dispositif robuste et audité' } ];
const qOptsF1 = [ { value: 0, label: 'Aucun dispositif' }, { value: 1, label: 'Formations ponctuelles' }, { value: 2, label: 'Plan annuel structuré' }, { value: 3, label: 'Gestion stratégique des compétences' } ];
const qOptsF2 = [ { value: 0, label: 'Dépendance critique' }, { value: 1, label: 'Dépendance partielle' }, { value: 2, label: 'Équipe managériale structurée' }, { value: 3, label: 'Leadership partagé et pérennité assurée' } ];
const qOptsF3 = [ { value: 0, label: 'Aucune capitalisation' }, { value: 1, label: 'Ajustements informels' }, { value: 2, label: 'Revues régulières et plans d’action' }, { value: 3, label: 'Culture structurée d’amélioration continue' } ];
const qOptsG1 = [ { value: 0, label: 'Aucune politique' }, { value: 1, label: 'Pratiques informelles' }, { value: 2, label: 'Politique écrite' }, { value: 3, label: 'Politique validée et appliquée' } ];
const qOptsG2 = [ { value: 0, label: 'Non conforme' }, { value: 1, label: 'En cours de mise en conformité' }, { value: 2, label: 'Conforme' }, { value: 3, label: 'Conforme et documentée' } ];
const qOptsG3 = [ { value: 0, label: 'Pas préparée' }, { value: 1, label: 'Préparation minimale' }, { value: 2, label: 'Préparation partielle' }, { value: 3, label: 'Prête et structurée' } ];
