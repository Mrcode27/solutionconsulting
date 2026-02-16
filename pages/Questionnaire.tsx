import React, { useState } from 'react';
import { useSEO } from '../utils/seoHelmet';
import { Link } from 'react-router-dom';

// ------------------------------------------------------------
// Translation dictionaries
// ------------------------------------------------------------
const translations = {
  fr: {
    // General
    diagnostic_title: "Diagnostic Stratégique et Performance 360°",
    confidential: "CONFIDENTIEL",
    
    // Consent screen
    objective_text: "Ce diagnostic permet d'évaluer le niveau de structuration, de performance et de conformité de votre entreprise, afin d'identifier des leviers concrets d'amélioration et de croissance durable.",
    confidentiality_title: "Confidentialité & Consentement",
    confidentiality_text: "Les informations collectées dans ce diagnostic sont strictement confidentielles et utilisées uniquement pour analyser la situation de votre entreprise, produire une restitution personnalisée, et vous proposer des recommandations.\n\nLes données sont professionnelles uniquement, ne sont ni vendues ni transmises à des tiers non autorisés, et sont conservées pour la durée strictement nécessaire au traitement du diagnostic.\n\nVous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données.",
    consent_checkbox: "☑️ En poursuivant ce diagnostic, vous confirmez avoir lu ces informations et consentez au traitement de vos données.",
    start_button: "Commencer le diagnostic",
    
    // Navigation
    page: "Page",
    of: "/",
    previous: "← Précédent",
    next: "Suivant →",
    submit: "Obtenir le diagnostic DSP360™",
    footer_note: "* Diagnostic confidentiel – données anonymisées si le nom de l’entreprise n’est pas renseigné.",
    
    // Step titles
    step_A: "Informations générales",
    step_B: "Organisation & Gouvernance",
    step_C: "Marché, Clients & Positionnement",
    step_D: "Performance financière",
    step_E: "Digital & Sécurité",
    step_F: "Apprentissage & Croissance",
    step_G: "Sous-traitance & Conformité",
    step_final: "Contact & Diagnostic",
    
    // Step A
    A_title: "INFORMATIONS GÉNÉRALES",
    A1: "A1. Nom de l’entreprise",
    A2: "A2. Forme juridique *",
    A3: "A3. Secteur d'activité *",
    A4: "A4. Taille de l'entreprise *",
    A5: "A5. Fonction du répondant",
    
    // Legal form options
    legal_ei: "EI",
    legal_sarl: "SARL",
    legal_sa: "SA",
    legal_sas: "SAS",
    legal_gie: "GIE",
    legal_scs: "SCS",
    legal_snc: "SNC",
    legal_sep: "SEP",
    legal_scp: "SCP",
    legal_sci: "SCI",
    legal_sem: "SEM",
    legal_state: "Sociétés d'État",
    legal_other: "Autre",
    
    // Sector options
    sector_agro: "Agro-industrie",
    sector_industry: "Industrie",
    sector_btp: "BTP",
    sector_services: "Services",
    sector_telecom: "Télécoms",
    sector_finance: "Finance",
    sector_other: "Autre",
    
    // Size options
    size_tpe: "TPE (1–9)",
    size_small: "Petite (10–49)",
    size_medium: "Moyenne (50–199)",
    size_large: "Grande (200+)",
    
    // Function options
    function_founder: "Fondateur / Promoteur",
    function_ceo: "Dirigeant",
    function_cfo: "Direction financière",
    function_operations: "Direction opérations",
    function_sales: "Commercial",
    function_hr: "RH",
    function_legal: "Juridique",
    function_other: "Autre",
    
    // Step B
    B_title: "ORGANISATION, GOUVERNANCE & PROCESSUS",
    B1: "B1. Dans quelle mesure les processus clés de votre entreprise sont-ils formalisés et documentés ?",
    B2: "B2. L'entreprise peut-elle fonctionner efficacement sans l'intervention quotidienne du dirigeant ?",
    B3: "B3. Votre entreprise dispose-t-elle d'une stratégie claire formalisée et actualisée ?",
    
    // Step C
    C_title: "MARCHÉ, CLIENTS & POSITIONNEMENT",
    C1: "C1. Disposez-vous d'une stratégie d'acquisition de clients structurée et mesurée ?",
    C2: "C2. Comment gérez-vous la relation client et le suivi de la satisfaction ?",
    C3: "C3. Pilotez-vous les indicateurs de performance commerciale (CAC, rentabilité, rétention) ?",
    C4: "C4. Quel est votre niveau d'expérience et de maîtrise du secteur d'activité ?",
    C5: "C5. Comment maîtrisez-vous votre chaîne d'approvisionnement (fournisseurs amont) ?",
    C6: "C6. Quel est votre niveau de dépendance vis-à-vis de vos principaux clients ?",
    
    // Step D
    D_title: "PERFORMANCE FINANCIÈRE",
    D1: "D1. À quelle fréquence disposez-vous de tableaux de bord financiers fiables ?",
    D2: "D2. Avez-vous une visibilité sur votre trésorerie court et moyen terme ?",
    D3: "D3. Quelle est votre capacité d'autofinancement de votre croissance ?",
    
    // Step E
    E_title: "DIGITAL & SÉCURITÉ",
    E1: "E1. Disposez-vous d'outils digitaux internes pour optimiser vos processus ?",
    E2: "E2. Le digital contribue-t-il significativement à votre acquisition de clients ?",
    E3: "E3. Avez-vous mis en place une politique de cybersécurité et de continuité ?",
    
    // Step F
    F_title: "APPRENTISSAGE & CROISSANCE",
    F1: "F1. Avez-vous un plan structuré de développement des compétences ?",
    F2: "F2. Quel est votre niveau de dépendance vis-à-vis des leaders clés ?",
    F3: "F3. Avez-vous une culture structurée d'amélioration continue ?",
    
    // Step G
    G_title: "SOUS-TRAITANCE & CONFORMITÉ",
    G0: "G0. Statut sous-traitance",
    G0_none: "Aucun",
    G0_principal: "Donneur d’ordre",
    G0_subcontractor: "Sous‑traitant",
    G0_both: "Les deux",
    G1: "G1. Disposez-vous d'une politique formalisée de gouvernance de la sous-traitance (Donneur d'ordre) ?",
    G2: "G2. Êtes-vous conforme et éligible en tant que sous-traitant ?",
    G3: "G3. Êtes-vous préparée et structurée pour accéder à des appels d'offres en sous-traitance ?",
    
    // Step Final
    final_title: "FINALISATION",
    final_text: "Vous êtes sur le point de demander le diagnostic DSP360™ de votre entreprise. Pour recevoir le rapport du diagnostic et les recommandations prioritaires, renseignez vos coordonnées :",
    email: "Email professionnel *",
    phone: "Téléphone (optionnel)",
    consent_final: "☑️ J'accepte de recevoir le rapport du diagnostic DSP360™ par email (confidentialité garantie).",
    
    // Results screen
    results_title: "📊 Votre maturité DSP360™",
    score: "Score",
    analysis: "🧠 Analyse",
    plan_title: "📌 Plan 90j",
    level_basic: "Niveau de base",
    level_struct: "Structuration",
    level_perf: "Performance",
    level_excellence: "Excellence",
    send_report: "📧 Envoyer le rapport",
    sending: "Envoi...",
    support: "Accompagnement",
    modify: "Modifier",
    
    // Recommendations
    rec_stabilize: "🔴 Stabiliser : formaliser processus critiques, trésorerie 3 mois",
    rec_structure: "🔴 Structurer : stratégie commerciale, réduire dépendance",
    rec_compliance: "🔴 Conformité : veille loi 2025/010",
    rec_professionalize: "🟡 Professionnaliser : déployer CRM, piloter CAC",
    rec_digitalize: "🟡 Digitaliser : outils collaboratifs, cybersécurité",
    rec_anticipate: "🟡 Anticiper : plan compétences, formaliser sous‑traitance",
    rec_optimize: "🟢 Optimiser : automatisation, prévisions 12‑24 mois",
    rec_grow: "🟢 Croître : digital canal majeur, rentabilité client",
    rec_sustain: "🟢 Pérenniser : audit sécurité, politique sous‑traitance",
    rec_excellence: "⭐ Excellence : système intégré, data‑driven",
    rec_innovation: "⭐ Innovation : conformité NIS2/RGPD, diversification",
    rec_influence: "⭐ Rayonnement : leadership, appels d’offres",
  },
  en: {
    // General
    diagnostic_title: "Strategic & Performance Diagnosis 360°",
    confidential: "CONFIDENTIAL",
    
    // Consent screen
    objective_text: "This diagnostic assesses your company's level of structuring, performance, and compliance, to identify concrete levers for improvement and sustainable growth.",
    confidentiality_title: "Confidentiality & Consent",
    confidentiality_text: "The information collected in this diagnostic is strictly confidential and used only to analyze your company's situation, produce a personalized report, and provide recommendations.\n\nData is professional only, is neither sold nor transmitted to unauthorized third parties, and is retained only for the duration strictly necessary for diagnostic processing.\n\nYou may at any time request access, correction, or deletion of your data.",
    consent_checkbox: "☑️ By proceeding with this diagnostic, you confirm that you have read this information and consent to the processing of your data.",
    start_button: "Start the diagnostic",
    
    // Navigation
    page: "Page",
    of: "of",
    previous: "← Previous",
    next: "Next →",
    submit: "Get DSP360™ diagnosis",
    footer_note: "* Confidential diagnosis – data anonymized if company name is not provided.",
    
    // Step titles
    step_A: "General Information",
    step_B: "Organization & Governance",
    step_C: "Market, Clients & Positioning",
    step_D: "Financial Performance",
    step_E: "Digital & Security",
    step_F: "Learning & Growth",
    step_G: "Subcontracting & Compliance",
    step_final: "Contact & Diagnosis",
    
    // Step A
    A_title: "GENERAL INFORMATION",
    A1: "A1. Company name",
    A2: "A2. Legal form *",
    A3: "A3. Business sector *",
    A4: "A4. Company size *",
    A5: "A5. Respondent function",
    
    // Legal form options
    legal_ei: "Sole proprietorship",
    legal_sarl: "Ltd (SARL)",
    legal_sa: "Corporation (SA)",
    legal_sas: "SAS",
    legal_gie: "GIE",
    legal_scs: "SCS",
    legal_snc: "SNC",
    legal_sep: "SEP",
    legal_scp: "SCP",
    legal_sci: "SCI",
    legal_sem: "SEM",
    legal_state: "State-owned",
    legal_other: "Other",
    
    // Sector options
    sector_agro: "Agribusiness",
    sector_industry: "Industry",
    sector_btp: "Construction",
    sector_services: "Services",
    sector_telecom: "Telecoms",
    sector_finance: "Finance",
    sector_other: "Other",
    
    // Size options
    size_tpe: "Micro (1–9)",
    size_small: "Small (10–49)",
    size_medium: "Medium (50–199)",
    size_large: "Large (200+)",
    
    // Function options
    function_founder: "Founder / Promoter",
    function_ceo: "CEO / Director",
    function_cfo: "Finance Director",
    function_operations: "Operations Director",
    function_sales: "Sales",
    function_hr: "HR",
    function_legal: "Legal",
    function_other: "Other",
    
    // Step B
    B_title: "ORGANIZATION, GOVERNANCE & PROCESSES",
    B1: "B1. To what extent are your key business processes formalized and documented?",
    B2: "B2. Can the company operate effectively without the daily intervention of the leader?",
    B3: "B3. Does your company have a clear, formalized and updated strategy?",
    
    // Step C
    C_title: "MARKET, CLIENTS & POSITIONING",
    C1: "C1. Do you have a structured and measured customer acquisition strategy?",
    C2: "C2. How do you manage customer relationships and satisfaction tracking?",
    C3: "C3. Do you track commercial performance indicators (CAC, profitability, retention)?",
    C4: "C4. What is your level of experience and mastery of the business sector?",
    C5: "C5. How do you master your supply chain (upstream suppliers)?",
    C6: "C6. What is your level of dependence on your main customers?",
    
    // Step D
    D_title: "FINANCIAL PERFORMANCE",
    D1: "D1. How often do you have reliable financial dashboards?",
    D2: "D2. Do you have visibility on your short and medium-term cash flow?",
    D3: "D3. What is your capacity for self-financing your growth?",
    
    // Step E
    E_title: "DIGITAL & SECURITY",
    E1: "E1. Do you have internal digital tools to optimize your processes?",
    E2: "E2. Does digital contribute significantly to your customer acquisition?",
    E3: "E3. Have you implemented a cybersecurity and continuity policy?",
    
    // Step F
    F_title: "LEARNING & GROWTH",
    F1: "F1. Do you have a structured skills development plan?",
    F2: "F2. What is your level of dependence on key leaders?",
    F3: "F3. Do you have a structured culture of continuous improvement?",
    
    // Step G
    G_title: "SUBCONTRACTING & COMPLIANCE",
    G0: "G0. Subcontracting status",
    G0_none: "None",
    G0_principal: "Principal contractor",
    G0_subcontractor: "Subcontractor",
    G0_both: "Both",
    G1: "G1. Do you have a formalized subcontracting governance policy (as principal)?",
    G2: "G2. Are you compliant and eligible as a subcontractor?",
    G3: "G3. Are you prepared and structured to access subcontracting tenders?",
    
    // Step Final
    final_title: "FINALIZATION",
    final_text: "You are about to request the DSP360™ diagnosis for your company. To receive the diagnostic report and priority recommendations, provide your contact details:",
    email: "Professional email *",
    phone: "Phone (optional)",
    consent_final: "☑️ I agree to receive the DSP360™ diagnostic report by email (confidentiality guaranteed).",
    
    // Results screen
    results_title: "📊 Your DSP360™ maturity",
    score: "Score",
    analysis: "🧠 Analysis",
    plan_title: "📌 90-day plan",
    level_basic: "Basic level",
    level_struct: "Structuring",
    level_perf: "Performance",
    level_excellence: "Excellence",
    send_report: "📧 Send report",
    sending: "Sending...",
    support: "Support",
    modify: "Modify",
    
    // Recommendations
    rec_stabilize: "🔴 Stabilize: formalize critical processes, 3-month cash flow",
    rec_structure: "🔴 Structure: commercial strategy, reduce dependency",
    rec_compliance: "🔴 Compliance: monitor law 2025/010",
    rec_professionalize: "🟡 Professionalize: deploy CRM, track CAC",
    rec_digitalize: "🟡 Digitalize: collaborative tools, cybersecurity",
    rec_anticipate: "🟡 Anticipate: skills plan, formalize subcontracting",
    rec_optimize: "🟢 Optimize: automation, 12‑24 month forecasts",
    rec_grow: "🟢 Grow: digital as major channel, customer profitability",
    rec_sustain: "🟢 Sustain: security audit, subcontracting policy",
    rec_excellence: "⭐ Excellence: integrated system, data‑driven",
    rec_innovation: "⭐ Innovation: NIS2/GDPR compliance, diversification",
    rec_influence: "⭐ Influence: leadership, tenders",
  }
};

// ------------------------------------------------------------
// Question options with translations (same structure for both languages)
// ------------------------------------------------------------
const qOptsB1 = [
  { value: 0, labelFr: 'Aucun processus formalisé', labelEn: 'No formalized processes' },
  { value: 1, labelFr: 'Quelques procédures informelles', labelEn: 'Some informal procedures' },
  { value: 2, labelFr: 'Processus clés documentés et partagés', labelEn: 'Key processes documented and shared' },
  { value: 3, labelFr: 'Système complet avec contrôle et amélioration continue', labelEn: 'Complete system with control and continuous improvement' }
];

const qOptsB2 = [
  { value: 0, labelFr: 'Non, le dirigeant est indispensable au quotidien', labelEn: 'No, the leader is essential daily' },
  { value: 1, labelFr: 'Délégation limitée et non formalisée', labelEn: 'Limited and non-formalized delegation' },
  { value: 2, labelFr: 'Responsabilités définies avec reporting', labelEn: 'Defined responsibilities with reporting' },
  { value: 3, labelFr: 'Organisation autonome pilotée par indicateurs', labelEn: 'Autonomous organization driven by indicators' }
];

const qOptsB3 = [
  { value: 0, labelFr: 'Aucune stratégie formalisée', labelEn: 'No formalized strategy' },
  { value: 1, labelFr: 'Planification annuelle ponctuelle', labelEn: 'Occasional annual planning' },
  { value: 2, labelFr: 'Vision et objectifs à moyen terme (1–3 ans)', labelEn: 'Medium-term vision and objectives (1-3 years)' },
  { value: 3, labelFr: 'Stratégie claire à 3–5 ans avec suivi par KPI', labelEn: 'Clear 3-5 year strategy with KPI tracking' }
];

const qOptsC1 = [
  { value: 0, labelFr: 'Dépendance à quelques clients ou au bouche-à-oreille', labelEn: 'Dependence on few clients or word-of-mouth' },
  { value: 1, labelFr: 'Prospection ponctuelle non structurée', labelEn: 'Occasional unstructured prospecting' },
  { value: 2, labelFr: 'Prospection régulière avec canaux identifiés', labelEn: 'Regular prospecting with identified channels' },
  { value: 3, labelFr: 'Système d’acquisition structuré et mesuré', labelEn: 'Structured and measured acquisition system' }
];

const qOptsC2 = [
  { value: 0, labelFr: 'Aucun outil de suivi', labelEn: 'No tracking tools' },
  { value: 1, labelFr: 'Suivi basique (tableurs, outils simples)', labelEn: 'Basic tracking (spreadsheets, simple tools)' },
  { value: 2, labelFr: 'CRM opérationnel', labelEn: 'Operational CRM' },
  { value: 3, labelFr: 'CRM intégré ventes, marketing et service client', labelEn: 'Integrated CRM for sales, marketing and customer service' }
];

const qOptsC3 = [
  { value: 0, labelFr: 'Aucun indicateur suivi', labelEn: 'No indicators tracked' },
  { value: 1, labelFr: 'Suivi occasionnel et non structuré', labelEn: 'Occasional and unstructured tracking' },
  { value: 2, labelFr: 'Suivi régulier (mensuel ou trimestriel)', labelEn: 'Regular tracking (monthly or quarterly)' },
  { value: 3, labelFr: 'Pilotage data-driven (CAC, rentabilité client, rétention)', labelEn: 'Data-driven management (CAC, customer profitability, retention)' }
];

const qOptsC4 = [
  { value: 0, labelFr: 'Activité récente ou faible connaissance du secteur', labelEn: 'Recent activity or limited sector knowledge' },
  { value: 1, labelFr: 'Expérience partielle et compréhension incomplète', labelEn: 'Partial experience and incomplete understanding' },
  { value: 2, labelFr: 'Bonne connaissance des acteurs et règles du secteur', labelEn: 'Good knowledge of sector players and rules' },
  { value: 3, labelFr: 'Forte expérience et position reconnue dans le secteur', labelEn: 'Strong experience and recognized position in the sector' }
];

const qOptsC5 = [
  { value: 0, labelFr: 'Dépendance forte à un fournisseur unique', labelEn: 'High dependence on a single supplier' },
  { value: 1, labelFr: 'Dépendance à quelques fournisseurs sans alternative claire', labelEn: 'Dependence on few suppliers without clear alternative' },
  { value: 2, labelFr: 'Fournisseurs diversifiés avec solutions de repli', labelEn: 'Diversified suppliers with backup solutions' },
  { value: 3, labelFr: 'Fournisseurs multiples avec relations sécurisées', labelEn: 'Multiple suppliers with secured relationships' }
];

const qOptsC6 = [
  { value: 0, labelFr: 'Plus de 70–80 % du CA dépend d’un seul client', labelEn: 'More than 70-80% of revenue depends on a single client' },
  { value: 1, labelFr: 'Forte concentration sur 2–3 clients', labelEn: 'High concentration on 2-3 clients' },
  { value: 2, labelFr: 'Portefeuille clients diversifié', labelEn: 'Diversified client portfolio' },
  { value: 3, labelFr: 'Portefeuille très diversifié et équilibré', labelEn: 'Highly diversified and balanced portfolio' }
];

const qOptsD1 = [
  { value: 0, labelFr: 'Une fois par an uniquement', labelEn: 'Only once a year' },
  { value: 1, labelFr: 'Analyse ponctuelle', labelEn: 'Occasional analysis' },
  { value: 2, labelFr: 'Analyse mensuelle structurée', labelEn: 'Structured monthly analysis' },
  { value: 3, labelFr: 'Tableaux de bord financiers réguliers', labelEn: 'Regular financial dashboards' }
];

const qOptsD2 = [
  { value: 0, labelFr: 'Moins d’un mois', labelEn: 'Less than one month' },
  { value: 1, labelFr: 'Entre 1 et 3 mois', labelEn: 'Between 1 and 3 months' },
  { value: 2, labelFr: 'Entre 3 et 12 mois', labelEn: 'Between 3 and 12 months' },
  { value: 3, labelFr: 'Plus de 12 mois avec prévisions', labelEn: 'More than 12 months with forecasts' }
];

const qOptsD3 = [
  { value: 0, labelFr: 'Dépendance totale aux financements externes', labelEn: 'Total dependence on external financing' },
  { value: 1, labelFr: 'Autofinancement limité', labelEn: 'Limited self-financing' },
  { value: 2, labelFr: 'Capacité régulière d’investissement', labelEn: 'Regular investment capacity' },
  { value: 3, labelFr: 'Croissance majoritairement autofinancée', labelEn: 'Mostly self-financed growth' }
];

const qOptsE1 = [
  { value: 0, labelFr: 'Outils basiques uniquement', labelEn: 'Basic tools only' },
  { value: 1, labelFr: 'Bureautique numérique', labelEn: 'Digital office tools' },
  { value: 2, labelFr: 'Outils collaboratifs structurés', labelEn: 'Structured collaborative tools' },
  { value: 3, labelFr: 'Processus digitalisés et automatisés', labelEn: 'Digitalized and automated processes' }
];

const qOptsE2 = [
  { value: 0, labelFr: 'Aucune opportunité générée', labelEn: 'No opportunities generated' },
  { value: 1, labelFr: 'Opportunités occasionnelles', labelEn: 'Occasional opportunities' },
  { value: 2, labelFr: 'Génération régulière de leads', labelEn: 'Regular lead generation' },
  { value: 3, labelFr: 'Canal digital majeur de croissance', labelEn: 'Digital as major growth channel' }
];

const qOptsE3 = [
  { value: 0, labelFr: 'Aucun dispositif formalisé', labelEn: 'No formalized system' },
  { value: 1, labelFr: 'Mesures de base uniquement', labelEn: 'Basic measures only' },
  { value: 2, labelFr: 'Politique de sécurité formalisée', labelEn: 'Formalized security policy' },
  { value: 3, labelFr: 'Dispositif robuste et audité', labelEn: 'Robust and audited system' }
];

const qOptsF1 = [
  { value: 0, labelFr: 'Aucun dispositif', labelEn: 'No system' },
  { value: 1, labelFr: 'Formations ponctuelles', labelEn: 'Occasional training' },
  { value: 2, labelFr: 'Plan annuel structuré', labelEn: 'Structured annual plan' },
  { value: 3, labelFr: 'Gestion stratégique des compétences', labelEn: 'Strategic skills management' }
];

const qOptsF2 = [
  { value: 0, labelFr: 'Dépendance critique', labelEn: 'Critical dependence' },
  { value: 1, labelFr: 'Dépendance partielle', labelEn: 'Partial dependence' },
  { value: 2, labelFr: 'Équipe managériale structurée', labelEn: 'Structured management team' },
  { value: 3, labelFr: 'Leadership partagé et pérennité assurée', labelEn: 'Shared leadership and ensured sustainability' }
];

const qOptsF3 = [
  { value: 0, labelFr: 'Aucune capitalisation', labelEn: 'No capitalization' },
  { value: 1, labelFr: 'Ajustements informels', labelEn: 'Informal adjustments' },
  { value: 2, labelFr: 'Revues régulières et plans d’action', labelEn: 'Regular reviews and action plans' },
  { value: 3, labelFr: 'Culture structurée d’amélioration continue', labelEn: 'Structured continuous improvement culture' }
];

const qOptsG1 = [
  { value: 0, labelFr: 'Aucune politique', labelEn: 'No policy' },
  { value: 1, labelFr: 'Pratiques informelles', labelEn: 'Informal practices' },
  { value: 2, labelFr: 'Politique écrite', labelEn: 'Written policy' },
  { value: 3, labelFr: 'Politique validée et appliquée', labelEn: 'Validated and applied policy' }
];

const qOptsG2 = [
  { value: 0, labelFr: 'Non conforme', labelEn: 'Non-compliant' },
  { value: 1, labelFr: 'En cours de mise en conformité', labelEn: 'In compliance process' },
  { value: 2, labelFr: 'Conforme', labelEn: 'Compliant' },
  { value: 3, labelFr: 'Conforme et documentée', labelEn: 'Compliant and documented' }
];

const qOptsG3 = [
  { value: 0, labelFr: 'Pas préparée', labelEn: 'Not prepared' },
  { value: 1, labelFr: 'Préparation minimale', labelEn: 'Minimal preparation' },
  { value: 2, labelFr: 'Préparation partielle', labelEn: 'Partial preparation' },
  { value: 3, labelFr: 'Prête et structurée', labelEn: 'Ready and structured' }
];

// ------------------------------------------------------------
// Initial state basé sur le référentiel DSP360™ (9 pages)
// ------------------------------------------------------------
const initialAnswers = {
  // LANGUE
  language: 'fr',
  
  // A – INFORMATIONS GÉNÉRALES
  company_name: '',
  legal_form: '',
  sector: '',
  employees_size: '',
  respondent_function: '',
  
  // CONSENTEMENT INITIAL
  consent_initial: false,

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
  { id: 'A', titleKey: 'step_A' },
  { id: 'B', titleKey: 'step_B' },
  { id: 'C', titleKey: 'step_C' },
  { id: 'D', titleKey: 'step_D' },
  { id: 'E', titleKey: 'step_E' },
  { id: 'F', titleKey: 'step_F' },
  { id: 'G', titleKey: 'step_G' },
  { id: 'final', titleKey: 'step_final' },
];

const Questionnaire: React.FC = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [maxPossible, setMaxPossible] = useState<number | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const t = translations[answers.language as keyof typeof translations];

  useSEO({
    title: answers.language === 'fr' 
      ? 'Diagnostic DSP360 — Audit stratégique & conformité'
      : 'DSP360 Diagnosis — Strategic audit & compliance',
    description: answers.language === 'fr'
      ? 'Diagnostic paginé en 8 étapes : gouvernance, marché, finance, digital, sous-traitance. 8–12 min.'
      : 'Paged diagnosis in 8 steps: governance, market, finance, digital, subcontracting. 8–12 min.',
    keywords: answers.language === 'fr'
      ? 'DSP360, diagnostic PME, sous-traitance Cameroun, loi 2025/010'
      : 'DSP360, SME diagnosis, subcontracting Cameroon, law 2025/010',
    ogTitle: answers.language === 'fr' ? 'Diagnostic DSP360 | KNN Consulting' : 'DSP360 Diagnosis | KNN Consulting',
    ogDescription: answers.language === 'fr' 
      ? 'Auto‑évaluation confidentielle – 25 critères'
      : 'Confidential self‑assessment – 25 criteria',
    canonicalUrl: 'https://solutionconsulting.biz/#/questionnaire'
  });

  const handleChange = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // Clear error for this field if it exists
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: false }));
    }
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

  const recommendationsForScore = (pct: number, language: string) => {
    const t = translations[language as keyof typeof translations];
    if (pct < 30) return [t.rec_stabilize, t.rec_structure, t.rec_compliance];
    if (pct < 55) return [t.rec_professionalize, t.rec_digitalize, t.rec_anticipate];
    if (pct < 80) return [t.rec_optimize, t.rec_grow, t.rec_sustain];
    return [t.rec_excellence, t.rec_innovation, t.rec_influence];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Step Final fields
    const newErrors: Record<string, boolean> = {};
    if (!answers.email) newErrors.email = true;
    if (!answers.consent) newErrors.consent = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { total, max, percentage } = computeScore(answers);
    setScore(percentage);
    setMaxPossible(max);
    setSummary({
      totalScore: total,
      maxScore: max,
      recommendations: recommendationsForScore(percentage, answers.language),
    });
    setSubmitted(true);
  };

  const sendReport = async () => {
    if (!answers.consent) {
      return; // Should be handled by validation, but safety check
    }
    setSending(true);
    const payload = {
      to: answers.email,
      subject: answers.language === 'fr'
        ? `Rapport DSP360 — ${answers.company_name || 'Diagnostic'}`
        : `DSP360 Report — ${answers.company_name || 'Diagnosis'}`,
      message: answers.language === 'fr'
        ? `Score : ${score}% (${summary?.totalScore}/${summary?.maxScore})\nRecommandations :\n${summary?.recommendations.join('\n')}`
        : `Score : ${score}% (${summary?.totalScore}/${summary?.maxScore})\nRecommendations :\n${summary?.recommendations.join('\n')}`,
    };
    try {
      await fetch('/api/send_mail.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      alert(answers.language === 'fr' 
        ? 'Rapport envoyé (vérifiez vos spams).' 
        : 'Report sent (check your spam).');
    } catch {
      alert(answers.language === 'fr' 
        ? 'Erreur réseau.' 
        : 'Network error.');
    } finally {
      setSending(false);
    }
  };

  // Navigation
  const nextStep = () => {
    if (currentStep === 0) {
      const { legal_form, sector, employees_size } = answers;
      const newErrors: Record<string, boolean> = {};
      if (!legal_form) newErrors.legal_form = true;
      if (!sector) newErrors.sector = true;
      if (!employees_size) newErrors.employees_size = true;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // Handle consent acceptance and proceed to questionnaire
  const handleStartDiagnostic = () => {
    if (consentAccepted) {
      setCurrentStep(0);
    }
  };

  // --------------------------------------------------------
  // Rendu des étapes (chaque page retourne le contenu)
  // --------------------------------------------------------
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepA answers={answers} handleChange={handleChange} t={t} errors={errors} />;
      case 1: return <StepB answers={answers} handleChange={handleChange} t={t} />;
      case 2: return <StepC answers={answers} handleChange={handleChange} t={t} />;
      case 3: return <StepD answers={answers} handleChange={handleChange} t={t} />;
      case 4: return <StepE answers={answers} handleChange={handleChange} t={t} />;
      case 5: return <StepF answers={answers} handleChange={handleChange} t={t} />;
      case 6: return <StepG answers={answers} handleChange={handleChange} t={t} />;
      case 7: return <StepFinal answers={answers} handleChange={handleChange} t={t} errors={errors} />;
      default: return null;
    }
  };

  if (submitted) {
    // ---------- Écran résultat ----------
    const analysisText = score && score < 30 ? t.level_basic : score < 55 ? t.level_struct : score < 80 ? t.level_perf : t.level_excellence;
    
    return (
      <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0a0f1f] p-8 border border-[#D4AF37]/30 shadow-[0_0_25px_rgba(212,175,55,0.2)] rounded-lg space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">{t.results_title}</h2>
              <span className="bg-black px-3 py-1 border border-[#D4AF37]/50 text-[#D4AF37] text-xs">{t.confidential}</span>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="relative w-36 h-36 rounded-full border-4 border-[#D4AF37]/30 flex items-center justify-center bg-black shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                <span className="text-5xl font-black text-white">{score}<span className="text-xl text-[#D4AF37]">%</span></span>
              </div>
              <div className="flex-1">
                <div className="h-4 w-full bg-black/70 rounded-full overflow-hidden border border-blue-800">
                  <div className="h-full bg-[#D4AF37] transition-all duration-1000" style={{ width: `${score}%` }}></div>
                </div>
                <p className="text-sm text-blue-300 mt-2">{t.score} {summary?.totalScore}/{summary?.maxScore}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-black/60 p-5 border-l-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <h3 className="font-bold text-white mb-2">{t.analysis}</h3>
                <p className="text-gray-300 text-sm">{analysisText}</p>
              </div>
              <div className="bg-black/60 p-5 border-l-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <h3 className="font-bold text-white mb-2">{t.plan_title}</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {summary?.recommendations.map((r: string, i: number) => <li key={i} className="text-gray-200">{r}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-blue-900/30">
              <button onClick={sendReport} disabled={sending} className="px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                {sending ? t.sending : t.send_report}
              </button>
              <Link to="/contact" className="px-6 py-3 border border-white/20 hover:border-[#D4AF37]">{t.support}</Link>
              <button onClick={() => { setSubmitted(false); setScore(null); }} className="text-xs text-gray-500 ml-auto">{t.modify}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de consentement initial (bloque le questionnaire)
  if (!consentAccepted) {
    return (
      <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0f1f]/90 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-blue-800/50 shadow-[0_0_40px_rgba(0,100,255,0.2)]">
            <h1 className="text-4xl font-serif font-bold text-white flex items-center gap-3 mb-6">
              {t.diagnostic_title}
              <span className="bg-[#0a1a2f] text-[#D4AF37] text-sm px-3 py-1 rounded-sm border border-[#D4AF37]/30">DSP360™</span>
            </h1>
            
            {/* Sélecteur de langue */}
            <div className="mb-8 flex gap-3">
              <button 
                onClick={() => handleChange('language', 'fr')}
                className={`px-4 py-2 rounded ${answers.language === 'fr' ? 'bg-[#D4AF37] text-black font-bold' : 'border border-blue-700/60 text-blue-300'}`}
              >
                🇫🇷 Français
              </button>
              <button 
                onClick={() => handleChange('language', 'en')}
                className={`px-4 py-2 rounded ${answers.language === 'en' ? 'bg-[#D4AF37] text-black font-bold' : 'border border-blue-700/60 text-blue-300'}`}
              >
                en English
              </button>
            </div>

            {/* Objectif */}
            <div className="bg-blue-950/20 border border-blue-800/60 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.objective_text}
              </p>
            </div>

            {/* Confidentialité & Consentement */}
            <div className="bg-black/60 border border-blue-800/60 p-6 rounded-lg mb-6 space-y-4">
              <h3 className="font-bold text-white">{t.confidentiality_title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
                {t.confidentiality_text}
              </p>
            </div>

            {/* Case à cocher obligatoire */}
            <label className="flex items-start space-x-3 mb-8 cursor-pointer p-4 bg-blue-950/20 border border-blue-800/60 rounded">
              <input 
                type="checkbox" 
                checked={consentAccepted} 
                onChange={(e) => setConsentAccepted(e.target.checked)} 
                className="accent-[#D4AF37] w-5 h-5 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-300">
                {t.consent_checkbox}
              </span>
            </label>

            <button
              disabled={!consentAccepted}
              onClick={handleStartDiagnostic}
              className={`w-full px-8 py-3 font-bold uppercase ${
                consentAccepted
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_25px_rgba(212,175,55,0.5)] cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t.start_button}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 py-20 px-4 pt-32 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* En-tête document */}
        <div className="mb-4 pb-2 border-b border-blue-800/30 flex justify-between items-end text-xs uppercase tracking-wider text-gray-400">
          <span className="font-mono">{t.page} {currentStep + 1} {t.of} {STEPS.length}</span>
          <span className="text-[#D4AF37]">© 2026 KNN Consulting | MaholAfrica</span>
          <span className="text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded">{t.confidential}</span>
        </div>

        {/* Titre et progression */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-white flex items-center gap-3">
            {t.diagnostic_title}
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
            <span className="text-sm text-gray-400">{t[STEPS[currentStep].titleKey as keyof typeof t]}</span>
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
              {t.previous}
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-2 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                {t.next}
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                {t.submit}
              </button>
            )}
          </div>
        </form>

        <p className="text-[10px] text-gray-600 text-center mt-6">
          {t.footer_note}
        </p>
      </div>
    </div>
  );
};

export default Questionnaire;

// ============================================================
// COMPOSANTS D'ÉTAPE (chaque page)
// ============================================================

const StepA: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any; errors: any }> = ({ answers, handleChange, t, errors }) => (
  <div className="space-y-5">
    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-[#D4AF37]">A –</span> {t.A_title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <input 
        type="text" 
        placeholder={t.A1} 
        value={answers.company_name} 
        onChange={(e) => handleChange('company_name', e.target.value)} 
        className={`p-3 bg-black/70 border ${errors.company_name ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-blue-800/60 focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.3)]'} transition`}
      />
      <select 
        value={answers.legal_form} 
        onChange={(e) => handleChange('legal_form', e.target.value)} 
        className={`p-3 bg-black/70 border ${errors.legal_form ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-blue-800/60 focus:border-[#D4AF37]'} transition`}
      >
        <option value="">{t.A2}</option>
        <option>{t.legal_ei}</option><option>{t.legal_sarl}</option><option>{t.legal_sa}</option>
        <option>{t.legal_sas}</option><option>{t.legal_gie}</option><option>{t.legal_scs}</option>
        <option>{t.legal_snc}</option><option>{t.legal_sep}</option><option>{t.legal_scp}</option>
        <option>{t.legal_sci}</option><option>{t.legal_sem}</option><option>{t.legal_state}</option>
        <option>{t.legal_other}</option>
      </select>
      <select 
        value={answers.sector} 
        onChange={(e) => handleChange('sector', e.target.value)} 
        className={`p-3 bg-black/70 border ${errors.sector ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-blue-800/60 focus:border-[#D4AF37]'} transition`}
      >
        <option value="">{t.A3}</option>
        <option>{t.sector_agro}</option><option>{t.sector_industry}</option><option>{t.sector_btp}</option>
        <option>{t.sector_services}</option><option>{t.sector_telecom}</option><option>{t.sector_finance}</option>
        <option>{t.sector_other}</option>
      </select>
      <select 
        value={answers.employees_size} 
        onChange={(e) => handleChange('employees_size', e.target.value)} 
        className={`p-3 bg-black/70 border ${errors.employees_size ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-blue-800/60 focus:border-[#D4AF37]'} transition`}
      >
        <option value="">{t.A4}</option>
        <option>{t.size_tpe}</option><option>{t.size_small}</option><option>{t.size_medium}</option><option>{t.size_large}</option>
      </select>
      <select 
        value={answers.respondent_function} 
        onChange={(e) => handleChange('respondent_function', e.target.value)} 
        className="p-3 bg-black/70 border border-blue-800/60 md:col-span-2 focus:border-[#D4AF37] transition"
      >
        <option value="">{t.A5}</option>
        <option>{t.function_founder}</option><option>{t.function_ceo}</option><option>{t.function_cfo}</option>
        <option>{t.function_operations}</option><option>{t.function_sales}</option><option>{t.function_hr}</option>
        <option>{t.function_legal}</option><option>{t.function_other}</option>
      </select>
    </div>
  </div>
);

const StepB: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`B – ${t.B_title}`} t={t}>
    <QuestionSelect 
      label={t.B1} 
      value={answers.b1_formalisation} 
      onChange={(v) => handleChange('b1_formalisation', v)} 
      options={qOptsB1} 
      language={answers.language}
    />
    <QuestionSelect 
      label={t.B2} 
      value={answers.b2_autonomy} 
      onChange={(v) => handleChange('b2_autonomy', v)} 
      options={qOptsB2} 
      language={answers.language}
    />
    <QuestionSelect 
      label={t.B3} 
      value={answers.b3_strategic_planning} 
      onChange={(v) => handleChange('b3_strategic_planning', v)} 
      options={qOptsB3} 
      language={answers.language}
    />
  </StepSection>
);

const StepC: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`C – ${t.C_title}`} t={t}>
    <QuestionSelect label={t.C1} value={answers.c1_acquisition} onChange={(v) => handleChange('c1_acquisition', v)} options={qOptsC1} language={answers.language} />
    <QuestionSelect label={t.C2} value={answers.c2_crm} onChange={(v) => handleChange('c2_crm', v)} options={qOptsC2} language={answers.language} />
    <QuestionSelect label={t.C3} value={answers.c3_commercial_kpis} onChange={(v) => handleChange('c3_commercial_kpis', v)} options={qOptsC3} language={answers.language} />
    <QuestionSelect label={t.C4} value={answers.c4_sector_experience} onChange={(v) => handleChange('c4_sector_experience', v)} options={qOptsC4} language={answers.language} />
    <QuestionSelect label={t.C5} value={answers.c5_supplier_mastery} onChange={(v) => handleChange('c5_supplier_mastery', v)} options={qOptsC5} language={answers.language} />
    <QuestionSelect label={t.C6} value={answers.c6_client_mastery} onChange={(v) => handleChange('c6_client_mastery', v)} options={qOptsC6} language={answers.language} />
  </StepSection>
);

const StepD: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`D – ${t.D_title}`} t={t}>
    <QuestionSelect label={t.D1} value={answers.d1_finance_pilotage} onChange={(v) => handleChange('d1_finance_pilotage', v)} options={qOptsD1} language={answers.language} />
    <QuestionSelect label={t.D2} value={answers.d2_cash_visibility} onChange={(v) => handleChange('d2_cash_visibility', v)} options={qOptsD2} language={answers.language} />
    <QuestionSelect label={t.D3} value={answers.d3_autofinance} onChange={(v) => handleChange('d3_autofinance', v)} options={qOptsD3} language={answers.language} />
  </StepSection>
);

const StepE: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`E – ${t.E_title}`} t={t}>
    <QuestionSelect label={t.E1} value={answers.e1_digital_tools} onChange={(v) => handleChange('e1_digital_tools', v)} options={qOptsE1} language={answers.language} />
    <QuestionSelect label={t.E2} value={answers.e2_digital_performance} onChange={(v) => handleChange('e2_digital_performance', v)} options={qOptsE2} language={answers.language} />
    <QuestionSelect label={t.E3} value={answers.e3_cybersecurity} onChange={(v) => handleChange('e3_cybersecurity', v)} options={qOptsE3} language={answers.language} />
  </StepSection>
);

const StepF: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`F – ${t.F_title}`} t={t}>
    <QuestionSelect label={t.F1} value={answers.f1_skills_development} onChange={(v) => handleChange('f1_skills_development', v)} options={qOptsF1} language={answers.language} />
    <QuestionSelect label={t.F2} value={answers.f2_leadership_dependence} onChange={(v) => handleChange('f2_leadership_dependence', v)} options={qOptsF2} language={answers.language} />
    <QuestionSelect label={t.F3} value={answers.f3_continuous_improvement} onChange={(v) => handleChange('f3_continuous_improvement', v)} options={qOptsF3} language={answers.language} />
  </StepSection>
);

const StepG: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any }> = ({ answers, handleChange, t }) => (
  <StepSection title={`G – ${t.G_title}`} t={t}>
    <div className="space-y-4">
      <label className="block">
        <div className="text-sm text-gray-300 mb-2 font-medium">{t.G0}</div>
        <select value={answers.g0_subcontract_status} onChange={(e) => handleChange('g0_subcontract_status', e.target.value)} className="w-full p-3 bg-black/70 border border-blue-800/60">
          <option value="aucun">{t.G0_none}</option>
          <option value="donneur">{t.G0_principal}</option>
          <option value="sous-traitant">{t.G0_subcontractor}</option>
          <option value="both">{t.G0_both}</option>
        </select>
      </label>
      {(answers.g0_subcontract_status === 'donneur' || answers.g0_subcontract_status === 'both') && (
        <div className="pl-4 border-l-2 border-[#D4AF37] bg-blue-950/20 p-4 rounded-r">
          <QuestionSelect label={t.G1} value={answers.g1_gouvernance} onChange={(v) => handleChange('g1_gouvernance', v)} options={qOptsG1} language={answers.language} />
        </div>
      )}
      {(answers.g0_subcontract_status === 'sous-traitant' || answers.g0_subcontract_status === 'both') && (
        <div className="pl-4 border-l-2 border-blue-500 bg-blue-950/20 p-4 rounded-r">
          <QuestionSelect label={t.G2} value={answers.g2_conformity} onChange={(v) => handleChange('g2_conformity', v)} options={qOptsG2} language={answers.language} />
        </div>
      )}
      {answers.g0_subcontract_status === 'aucun' && (
        <div className="pl-4 border-l-2 border-gray-600 bg-gray-900/50 p-4 rounded-r">
          <QuestionSelect label={t.G3} value={answers.g3_preparation} onChange={(v) => handleChange('g3_preparation', v)} options={qOptsG3} language={answers.language} />
        </div>
      )}
    </div>
  </StepSection>
);

const StepFinal: React.FC<{ answers: any; handleChange: (k: string, v: any) => void; t: any; errors: any }> = ({ answers, handleChange, t, errors }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="text-[#D4AF37]">✓</span> {t.final_title}</h3>
    <div className="bg-blue-950/20 border border-blue-800/60 p-5 rounded-lg">
      <p className="text-sm text-blue-300 mb-4">{t.final_text}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="email" 
          placeholder={t.email} 
          value={answers.email} 
          onChange={(e) => handleChange('email', e.target.value)} 
          className={`p-3 bg-black/70 border ${errors.email ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-blue-800/60 focus:border-[#D4AF37]'} transition`}
          required 
        />
        <input 
          type="tel" 
          placeholder={t.phone} 
          value={answers.phone} 
          onChange={(e) => handleChange('phone', e.target.value)} 
          className="p-3 bg-black/70 border border-blue-800/60 focus:border-[#D4AF37] transition" 
        />
      </div>
      <label className={`flex items-center space-x-3 mt-4 p-2 rounded ${errors.consent ? 'border border-red-500 bg-red-900/10' : ''}`}>
        <input 
          type="checkbox" 
          checked={answers.consent} 
          onChange={(e) => handleChange('consent', e.target.checked)} 
          className="accent-[#D4AF37] w-4 h-4" 
        />
        <span className="text-xs text-gray-300">{t.consent_final}</span>
      </label>
    </div>
  </div>
);

// ------------------------------------------------------------
// Composants auxiliaires
// ------------------------------------------------------------
const StepSection: React.FC<{ title: string; children: React.ReactNode; t: any }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-white flex items-center gap-2">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const QuestionSelect: React.FC<{ 
  label: string; 
  value: number; 
  onChange: (val: number) => void; 
  options: { value: number; labelFr: string; labelEn: string }[];
  language: string;
}> = ({ label, value, onChange, options, language }) => (
  <label className="block">
    <div className="text-sm text-gray-300 mb-2 font-medium">{label}</div>
    <select 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))} 
      className="w-full p-3 bg-black/70 border border-blue-800/60 focus:border-[#D4AF37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)] transition"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {String.fromCharCode(97 + opt.value)} — {language === 'fr' ? opt.labelFr : opt.labelEn}
        </option>
      ))}
    </select>
  </label>
);
