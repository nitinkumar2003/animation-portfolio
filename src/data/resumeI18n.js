/**
 * Résumé localisation.
 *
 * Interface chrome, section headings and the professional summary are translated
 * for all ten interface languages. Achievement bullets and project detail stay in
 * English: they are dense technical prose built from the verified résumé, and
 * translating them would mean generating claims nobody can check against the source.
 * `technicalNote` tells the reader that explicitly in their own language.
 */

export const resumeLanguages = [
  { id: "en", code: "EN", name: "English", locale: "en-GB", dir: "ltr" },
  { id: "hi", code: "HI", name: "हिन्दी", locale: "hi-IN", dir: "ltr" },
  { id: "ar", code: "AR", name: "العربية", locale: "ar-AE", dir: "rtl" },
  { id: "es", code: "ES", name: "Español", locale: "es-ES", dir: "ltr" },
  { id: "fr", code: "FR", name: "Français", locale: "fr-FR", dir: "ltr" },
  { id: "de", code: "DE", name: "Deutsch", locale: "de-DE", dir: "ltr" },
  { id: "pt", code: "PT", name: "Português", locale: "pt-BR", dir: "ltr" },
  { id: "ja", code: "JA", name: "日本語", locale: "ja-JP", dir: "ltr" },
  { id: "ko", code: "KO", name: "한국어", locale: "ko-KR", dir: "ltr" },
  { id: "zh", code: "ZH", name: "中文", locale: "zh-CN", dir: "ltr" },
];

export const resumeStrings = {
  en: {
    resume: "Résumé", summary: "Summary", skills: "Skills", experience: "Experience",
    projects: "Selected projects", education: "Education", certification: "Certification",
    contact: "Contact", download: "Download PDF", print: "Print", language: "Language",
    appearance: "Appearance", dark: "Dark", light: "Light", present: "Present",
    role: "Full Stack Developer", years: "4+ years of experience", location: "Noida, Uttar Pradesh, India",
    availability: "Available for freelance, contract and remote work",
    technicalNote: "Technical detail is shown in English, as it appears on the verified résumé.",
    viewPdf: "Open the PDF version",
    profile: "Professional summary",
    tagline: "I build products that ship — from the first pixel to the production deploy.",
  },
  hi: {
    resume: "बायोडाटा", summary: "सारांश", skills: "कौशल", experience: "कार्य अनुभव",
    projects: "चुनिंदा प्रोजेक्ट", education: "शिक्षा", certification: "प्रमाणपत्र",
    contact: "संपर्क", download: "पीडीएफ डाउनलोड करें", print: "प्रिंट करें", language: "भाषा",
    appearance: "थीम", dark: "डार्क", light: "लाइट", present: "वर्तमान",
    role: "फुल स्टैक डेवलपर", years: "4+ वर्षों का अनुभव", location: "नोएडा, उत्तर प्रदेश, भारत",
    availability: "फ्रीलांस, कॉन्ट्रैक्ट और रिमोट काम के लिए उपलब्ध",
    technicalNote: "तकनीकी विवरण अंग्रेज़ी में दिखाया गया है, जैसा सत्यापित बायोडाटा में है।",
    viewPdf: "पीडीएफ संस्करण खोलें",
    profile: "पेशेवर परिचय",
    tagline: "मैं ऐसे प्रोडक्ट बनाता हूं जो वास्तव में लॉन्च होते हैं — पहले पिक्सल से प्रोडक्शन डिप्लॉय तक।",
  },
  ar: {
    resume: "السيرة الذاتية", summary: "الملخص", skills: "المهارات", experience: "الخبرة العملية",
    projects: "مشاريع مختارة", education: "التعليم", certification: "الشهادات",
    contact: "التواصل", download: "تحميل PDF", print: "طباعة", language: "اللغة",
    appearance: "المظهر", dark: "داكن", light: "فاتح", present: "حتى الآن",
    role: "مطور Full Stack", years: "خبرة أكثر من 4 سنوات", location: "نويدا، أوتار براديش، الهند",
    availability: "متاح للعمل الحر والتعاقد والعمل عن بُعد",
    technicalNote: "التفاصيل التقنية معروضة بالإنجليزية كما وردت في السيرة الذاتية الموثقة.",
    viewPdf: "فتح نسخة PDF",
    profile: "نبذة مهنية",
    tagline: "أبني منتجات تصل إلى الإطلاق فعلياً — من أول بكسل حتى النشر في الإنتاج.",
  },
  es: {
    resume: "Currículum", summary: "Resumen", skills: "Habilidades", experience: "Experiencia",
    projects: "Proyectos destacados", education: "Formación", certification: "Certificación",
    contact: "Contacto", download: "Descargar PDF", print: "Imprimir", language: "Idioma",
    appearance: "Apariencia", dark: "Oscuro", light: "Claro", present: "Actualidad",
    role: "Desarrollador Full Stack", years: "Más de 4 años de experiencia", location: "Noida, Uttar Pradesh, India",
    availability: "Disponible para trabajo freelance, por contrato y remoto",
    technicalNote: "El detalle técnico se muestra en inglés, tal como aparece en el currículum verificado.",
    viewPdf: "Abrir la versión PDF",
    profile: "Perfil profesional",
    tagline: "Construyo productos que llegan a producción — del primer píxel al despliegue.",
  },
  fr: {
    resume: "CV", summary: "Résumé", skills: "Compétences", experience: "Expérience",
    projects: "Projets sélectionnés", education: "Formation", certification: "Certification",
    contact: "Contact", download: "Télécharger le PDF", print: "Imprimer", language: "Langue",
    appearance: "Apparence", dark: "Sombre", light: "Clair", present: "Aujourd’hui",
    role: "Développeur Full Stack", years: "Plus de 4 ans d’expérience", location: "Noida, Uttar Pradesh, Inde",
    availability: "Disponible en freelance, en contrat et à distance",
    technicalNote: "Le détail technique est affiché en anglais, tel qu’il figure sur le CV vérifié.",
    viewPdf: "Ouvrir la version PDF",
    profile: "Profil professionnel",
    tagline: "Je construis des produits qui sortent vraiment — du premier pixel au déploiement.",
  },
  de: {
    resume: "Lebenslauf", summary: "Profil", skills: "Kenntnisse", experience: "Berufserfahrung",
    projects: "Ausgewählte Projekte", education: "Ausbildung", certification: "Zertifizierung",
    contact: "Kontakt", download: "PDF herunterladen", print: "Drucken", language: "Sprache",
    appearance: "Darstellung", dark: "Dunkel", light: "Hell", present: "Heute",
    role: "Full-Stack-Entwickler", years: "Über 4 Jahre Erfahrung", location: "Noida, Uttar Pradesh, Indien",
    availability: "Verfügbar für freiberufliche, vertragliche und Remote-Arbeit",
    technicalNote: "Technische Details erscheinen auf Englisch, wie im geprüften Lebenslauf.",
    viewPdf: "PDF-Version öffnen",
    profile: "Berufsprofil",
    tagline: "Ich baue Produkte, die wirklich live gehen — vom ersten Pixel bis zum Deployment.",
  },
  pt: {
    resume: "Currículo", summary: "Resumo", skills: "Competências", experience: "Experiência",
    projects: "Projetos selecionados", education: "Formação", certification: "Certificação",
    contact: "Contato", download: "Baixar PDF", print: "Imprimir", language: "Idioma",
    appearance: "Aparência", dark: "Escuro", light: "Claro", present: "Atual",
    role: "Desenvolvedor Full Stack", years: "Mais de 4 anos de experiência", location: "Noida, Uttar Pradesh, Índia",
    availability: "Disponível para freelance, contrato e trabalho remoto",
    technicalNote: "O detalhe técnico é exibido em inglês, como consta no currículo verificado.",
    viewPdf: "Abrir a versão PDF",
    profile: "Perfil profissional",
    tagline: "Construo produtos que realmente entram no ar — do primeiro pixel ao deploy.",
  },
  ja: {
    resume: "履歴書", summary: "概要", skills: "スキル", experience: "職務経歴",
    projects: "主なプロジェクト", education: "学歴", certification: "資格",
    contact: "連絡先", download: "PDFをダウンロード", print: "印刷", language: "言語",
    appearance: "外観", dark: "ダーク", light: "ライト", present: "現在",
    role: "フルスタック開発者", years: "4年以上の経験", location: "インド、ウッタル・プラデーシュ州ノイダ",
    availability: "フリーランス・契約・リモート勤務に対応可能",
    technicalNote: "技術的な詳細は、検証済み履歴書の記載どおり英語で表示しています。",
    viewPdf: "PDF版を開く",
    profile: "プロフィール",
    tagline: "実際にリリースされるプロダクトを作ります — 最初のピクセルから本番デプロイまで。",
  },
  ko: {
    resume: "이력서", summary: "요약", skills: "기술", experience: "경력",
    projects: "주요 프로젝트", education: "학력", certification: "자격증",
    contact: "연락처", download: "PDF 다운로드", print: "인쇄", language: "언어",
    appearance: "테마", dark: "다크", light: "라이트", present: "현재",
    role: "풀스택 개발자", years: "4년 이상의 경력", location: "인도 우타르프라데시주 노이다",
    availability: "프리랜스, 계약직, 원격 근무 가능",
    technicalNote: "기술 세부 내용은 검증된 이력서에 기재된 대로 영어로 표시됩니다.",
    viewPdf: "PDF 버전 열기",
    profile: "프로필",
    tagline: "실제로 출시되는 제품을 만듭니다 — 첫 픽셀부터 프로덕션 배포까지.",
  },
  zh: {
    resume: "简历", summary: "概述", skills: "技能", experience: "工作经历",
    projects: "精选项目", education: "教育背景", certification: "证书",
    contact: "联系方式", download: "下载 PDF", print: "打印", language: "语言",
    appearance: "外观", dark: "深色", light: "浅色", present: "至今",
    role: "全栈开发工程师", years: "4 年以上经验", location: "印度北方邦诺伊达",
    availability: "可接受自由职业、合同与远程工作",
    technicalNote: "技术细节以英文显示，与经核实的简历一致。",
    viewPdf: "打开 PDF 版本",
    profile: "个人简介",
    tagline: "我打造真正上线的产品 —— 从第一个像素到生产部署。",
  },
};

export const resumeText = (language, key) => resumeStrings[language]?.[key] || resumeStrings.en[key] || key;

export const resumeDirection = (language) => resumeLanguages.find((item) => item.id === language)?.dir || "ltr";

export const resumeLocale = (language) => resumeLanguages.find((item) => item.id === language)?.locale || "en-GB";
