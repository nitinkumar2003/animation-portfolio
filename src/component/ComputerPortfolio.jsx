import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiBatteryCharging,
  FiBell,
  FiBriefcase,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiCode,
  FiCompass,
  FiCommand,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiFile,
  FiFileText,
  FiFolder,
  FiGithub,
  FiGlobe,
  FiGrid,
  FiHardDrive,
  FiHome,
  FiImage,
  FiLayers,
  FiLock,
  FiMail,
  FiMapPin,
  FiMaximize2,
  FiMenu,
  FiMinimize2,
  FiMonitor,
  FiMoon,
  FiPower,
  FiPrinter,
  FiRefreshCw,
  FiRotateCcw,
  FiSave,
  FiSearch,
  FiServer,
  FiSettings,
  FiSun,
  FiTerminal,
  FiTrash2,
  FiUploadCloud,
  FiUser,
  FiVolume2,
  FiVolumeX,
  FiWifi,
  FiX,
  FiZap,
} from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { personalDataObj } from "../data/data";
import resumePDF from "../assets/Resume.pdf";
import profileImg from "../assets/image_01.jpg";
import circuitWallpaper from "../assets/nkos-wallpaper.jpg";

const bootSteps = [
  { label: "CPU", detail: "Developer core online" },
  { label: "MEM", detail: "4+ years indexed" },
  { label: "DRIVE", detail: "15 projects mounted" },
  { label: "NETWORK", detail: "Professional links connected" },
  { label: "SHELL", detail: "Nitin OS workspace ready" },
];

const stackGroups = [
  {
    title: "Interface Layer",
    icon: FiMonitor,
    color: "#45e6b0",
    summary: "Fast, responsive product interfaces",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
  },
  {
    title: "Service Layer",
    icon: FiServer,
    color: "#5bbcff",
    summary: "Scalable APIs and realtime systems",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "Socket.io", "JWT / Auth"],
  },
  {
    title: "Data Layer",
    icon: FiDatabase,
    color: "#ffc857",
    summary: "Reliable product data and state",
    items: ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Redis", "SQL"],
  },
  {
    title: "Intelligence Layer",
    icon: FiActivity,
    color: "#ff6b6b",
    summary: "AI workflows, SaaS and payments",
    items: ["OpenAI", "Gemini", "Groq", "AI SaaS", "Stripe", "Razorpay"],
  },
];

const projectFilters = ["All", "Full Stack", "AI / SaaS", "Dashboard", "Frontend"];

const appCatalog = [
  { id: "about", label: "About Nitin", file: "README.md", icon: FiUser, color: "#45e6b0", keywords: "profile bio full stack developer" },
  { id: "projects", label: "Project Explorer", file: "Projects", icon: FiFolder, color: "#ffc857", keywords: "work case studies apps code client" },
  { id: "stack", label: "System Architecture", file: "Tech Stack.app", icon: FiLayers, color: "#5bbcff", keywords: "skills react next node typescript ai database" },
  { id: "journey", label: "Career Timeline", file: "Experience.log", icon: FiBriefcase, color: "#ff8f70", keywords: "experience education career ibyte ideahelix" },
  { id: "terminal", label: "Developer Terminal", file: "Terminal", icon: FiTerminal, color: "#b9a7ff", keywords: "command line console cli" },
  { id: "editor", label: "Code & Notes Editor", file: "Workspace.nk", icon: FiEdit3, color: "#7fe0c2", keywords: "edit notes text file code workspace save" },
  { id: "browser", label: "Nitin Browser", file: "Browser.app", icon: FiCompass, color: "#65c7ff", keywords: "browser web internet search google navigation" },
  { id: "resume", label: "Resume", file: "Nitin_Kumar.pdf", icon: FiFileText, color: "#ff6b6b", keywords: "cv resume download pdf" },
  { id: "contact", label: "Contact", file: "Connect.link", icon: FiMail, color: "#62d7ff", keywords: "email linkedin github hire collaboration" },
  { id: "settings", label: "Settings", file: "Settings.app", icon: FiSettings, color: "#8fa5ad", keywords: "wallpaper timezone region date time language preferences" },
  { id: "bin", label: "Recycle Bin", file: "Recycle Bin", icon: FiTrash2, color: "#d7e3e7", keywords: "deleted files restore trash bin" },
];

const protectedDesktopIds = new Set(["editor", "browser", "settings", "bin"]);
const nonEditableDesktopIds = new Set(["browser", "settings", "bin"]);

const windowOffsets = {
  about: { x: 90, y: 52 },
  projects: { x: 52, y: 28 },
  stack: { x: 120, y: 42 },
  journey: { x: 145, y: 34 },
  terminal: { x: 180, y: 80 },
  editor: { x: 118, y: 48 },
  browser: { x: 58, y: 22 },
  resume: { x: 135, y: 24 },
  contact: { x: 200, y: 74 },
  settings: { x: 110, y: 38 },
  bin: { x: 170, y: 58 },
};

const regions = {
  IN: { code: "IN", name: "India", locale: "en-IN", zones: ["Asia/Kolkata"] },
  AU: { code: "AU", name: "Australia", locale: "en-AU", zones: ["Australia/Sydney", "Australia/Brisbane", "Australia/Perth"] },
  GB: { code: "UK", name: "United Kingdom", locale: "en-GB", zones: ["Europe/London"] },
  US: { code: "US", name: "United States", locale: "en-US", zones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"] },
  AE: { code: "UAE", name: "United Arab Emirates", locale: "en-AE", zones: ["Asia/Dubai"] },
  CA: { code: "CA", name: "Canada", locale: "en-CA", zones: ["America/Toronto", "America/Vancouver"] },
  SG: { code: "SG", name: "Singapore", locale: "en-SG", zones: ["Asia/Singapore"] },
  JP: { code: "JP", name: "Japan", locale: "ja-JP", zones: ["Asia/Tokyo"] },
  DE: { code: "DE", name: "Germany", locale: "de-DE", zones: ["Europe/Berlin"] },
  NZ: { code: "NZ", name: "New Zealand", locale: "en-NZ", zones: ["Pacific/Auckland"] },
};

const timezoneOptions = Object.entries(regions).flatMap(([region, profile]) => (
  profile.zones.map((timezone) => ({ region, timezone, label: `${profile.name} · ${timezone.replace("_", " ")}` }))
));

const languages = [
  { id: "en", code: "EN", name: "English", locale: "en-GB" },
  { id: "hi", code: "HI", name: "हिन्दी", locale: "hi-IN" },
  { id: "ar", code: "AR", name: "العربية", locale: "ar-AE" },
  { id: "es", code: "ES", name: "Español", locale: "es-ES" },
  { id: "fr", code: "FR", name: "Français", locale: "fr-FR" },
  { id: "de", code: "DE", name: "Deutsch", locale: "de-DE" },
  { id: "pt", code: "PT", name: "Português", locale: "pt-BR" },
  { id: "ja", code: "JA", name: "日本語", locale: "ja-JP" },
  { id: "ko", code: "KO", name: "한국어", locale: "ko-KR" },
  { id: "zh", code: "ZH", name: "中文", locale: "zh-CN" },
];

const wallpapers = [
  { id: "circuit", name: "Circuit Architecture", image: circuitWallpaper },
  { id: "project", name: "Alysei Lab", image: personalDataObj.projects[13].img },
  { id: "grid", name: "Midnight Grid", image: null },
];

const defaultPreferences = {
  wallpaper: "circuit",
  region: "IN",
  timezone: "Asia/Kolkata",
  hourCycle: "12",
  dateStyle: "long",
  language: "en",
  customWallpaper: "",
};

const translations = {
  en: {
    file: "File",
    system: "System",
    connect: "Connect",
    search: "Search this computer",
    available: "AVAILABLE",
    featured: "FEATURED BUILD",
    openProject: "Open project",
    systemCapacity: "SYSTEM CAPACITY",
    projects: "projects",
    years: "years",
    layers: "layers",
    settings: "Settings",
    recycleBin: "Recycle Bin",
    rename: "Rename",
    delete: "Move to Recycle Bin",
    restore: "Restore",
    restoreAll: "Restore all",
    emptyBin: "Recycle Bin is empty",
    quickAccess: "QUICK ACCESS",
    matched: "MATCHED ON THIS COMPUTER",
    noResults: "No files or technologies found.",
    controlCenter: "CONTROL CENTER",
    network: "Network",
    connected: "Connected",
    focus: "Focus",
    sound: "Sound",
    display: "Display",
    on: "On",
    off: "Off",
    muted: "Muted",
    allOperational: "All systems operational",
    heroTitle: "I turn product ideas into fast, scalable web software.",
    heroCopy: personalDataObj.about,
    contactTitle: "Let’s build something people remember and products can scale on.",
    openSettings: "Open full settings",
  },
  hi: {
    file: "फाइल",
    system: "सिस्टम",
    connect: "संपर्क",
    search: "इस कंप्यूटर में खोजें",
    available: "काम के लिए उपलब्ध",
    featured: "प्रमुख प्रोजेक्ट",
    openProject: "प्रोजेक्ट खोलें",
    systemCapacity: "सिस्टम क्षमता",
    projects: "प्रोजेक्ट",
    years: "वर्ष",
    layers: "लेयर",
    settings: "सेटिंग्स",
    recycleBin: "रीसायकल बिन",
    rename: "नाम बदलें",
    delete: "रीसायकल बिन में भेजें",
    restore: "वापस लाएं",
    restoreAll: "सभी वापस लाएं",
    emptyBin: "रीसायकल बिन खाली है",
    quickAccess: "त्वरित पहुंच",
    matched: "इस कंप्यूटर में मिले परिणाम",
    noResults: "कोई फाइल या तकनीक नहीं मिली।",
    controlCenter: "कंट्रोल सेंटर",
    network: "नेटवर्क",
    connected: "कनेक्टेड",
    focus: "फोकस",
    sound: "आवाज",
    display: "डिस्प्ले",
    on: "चालू",
    off: "बंद",
    muted: "म्यूट",
    allOperational: "सभी सिस्टम सही काम कर रहे हैं",
    heroTitle: "मैं प्रोडक्ट आइडिया को तेज और स्केलेबल वेब सॉफ्टवेयर में बदलता हूं।",
    heroCopy: "मैं 4+ वर्षों के अनुभव वाला फुल स्टैक डेवलपर हूं। React.js, Next.js, Node.js और AI इंटीग्रेशन के साथ आधुनिक, स्केलेबल और उपयोगी प्रोडक्ट बनाता हूं।",
    contactTitle: "आइए ऐसा प्रोडक्ट बनाएं जिसे लोग याद रखें और जो आसानी से स्केल हो।",
    openSettings: "पूरी सेटिंग्स खोलें",
  },
  ar: {
    file: "ملف",
    system: "النظام",
    connect: "تواصل",
    search: "ابحث في هذا الكمبيوتر",
    available: "متاح للعمل",
    featured: "مشروع مميز",
    openProject: "افتح المشروع",
    systemCapacity: "قدرة النظام",
    projects: "مشاريع",
    years: "سنوات",
    layers: "طبقات",
    settings: "الإعدادات",
    recycleBin: "سلة المحذوفات",
    rename: "إعادة تسمية",
    delete: "نقل إلى سلة المحذوفات",
    restore: "استعادة",
    restoreAll: "استعادة الكل",
    emptyBin: "سلة المحذوفات فارغة",
    quickAccess: "وصول سريع",
    matched: "نتائج على هذا الكمبيوتر",
    noResults: "لم يتم العثور على ملفات أو تقنيات.",
    controlCenter: "مركز التحكم",
    network: "الشبكة",
    connected: "متصل",
    focus: "التركيز",
    sound: "الصوت",
    display: "الشاشة",
    on: "تشغيل",
    off: "إيقاف",
    muted: "صامت",
    allOperational: "جميع الأنظمة تعمل",
    heroTitle: "أحوّل أفكار المنتجات إلى برمجيات ويب سريعة وقابلة للتوسع.",
    heroCopy: "أنا مطور Full Stack بخبرة تزيد عن أربع سنوات في بناء تطبيقات حديثة وقابلة للتوسع باستخدام React وNext.js وNode.js وتكاملات الذكاء الاصطناعي.",
    contactTitle: "لنبنِ منتجاً يتذكره الناس ويمكنه التوسع بثقة.",
    openSettings: "فتح الإعدادات الكاملة",
  },
};

const interfaceTranslations = {
  en: {
    open: "Open", edit: "Edit file", save: "Save", cancel: "Cancel", personalize: "Personalize this workstation.", autoSave: "Preferences save automatically.",
    wallpaper: "Wallpaper", chooseWallpaper: "Choose the desktop background.", uploadWallpaper: "Upload your wallpaper", uploadCopy: "Choose any image from this device. It is optimized and saved locally.", removeUpload: "Remove upload",
    regionTimezone: "Region and timezone", regionCopy: "10 regional profiles and 16 live timezone choices.", timezone: "Timezone", dateTime: "Date and time", clock: "Clock", date: "Date",
    language: "Language", languageCopy: "10 interface languages with localized dates and reading direction.", deletedItems: "deleted items", name: "Name", deleted: "Deleted", action: "Action", binCopy: "Deleted desktop files appear here and can be restored.",
  },
  hi: {
    open: "खोलें", edit: "फाइल एडिट करें", save: "सेव करें", cancel: "रद्द करें", personalize: "इस वर्कस्टेशन को अपने अनुसार बनाएं।", autoSave: "सेटिंग्स अपने आप सेव होती हैं।",
    wallpaper: "वॉलपेपर", chooseWallpaper: "डेस्कटॉप बैकग्राउंड चुनें।", uploadWallpaper: "अपना वॉलपेपर अपलोड करें", uploadCopy: "इस डिवाइस से कोई भी इमेज चुनें। यह ऑप्टिमाइज होकर यहीं सेव होगी।", removeUpload: "अपलोड हटाएं",
    regionTimezone: "क्षेत्र और समय क्षेत्र", regionCopy: "10 क्षेत्रीय प्रोफाइल और 16 लाइव टाइमजोन विकल्प।", timezone: "टाइमजोन", dateTime: "तारीख और समय", clock: "घड़ी", date: "तारीख",
    language: "भाषा", languageCopy: "स्थानीय तारीख और पढ़ने की दिशा के साथ 10 इंटरफेस भाषाएं।", deletedItems: "डिलीट की गई फाइलें", name: "नाम", deleted: "डिलीट समय", action: "कार्रवाई", binCopy: "डिलीट की गई डेस्कटॉप फाइलें यहां दिखेंगी और वापस लाई जा सकती हैं।",
  },
  ar: {
    open: "فتح", edit: "تحرير الملف", save: "حفظ", cancel: "إلغاء", personalize: "خصص محطة العمل حسب تفضيلاتك.", autoSave: "يتم حفظ التفضيلات تلقائياً.",
    wallpaper: "خلفية سطح المكتب", chooseWallpaper: "اختر خلفية سطح المكتب.", uploadWallpaper: "ارفع خلفيتك", uploadCopy: "اختر أي صورة من هذا الجهاز ليتم تحسينها وحفظها محلياً.", removeUpload: "إزالة الصورة",
    regionTimezone: "المنطقة والتوقيت", regionCopy: "10 ملفات إقليمية و16 خياراً للتوقيت المباشر.", timezone: "المنطقة الزمنية", dateTime: "التاريخ والوقت", clock: "الساعة", date: "التاريخ",
    language: "اللغة", languageCopy: "10 لغات للواجهة مع تواريخ واتجاه قراءة محلي.", deletedItems: "عناصر محذوفة", name: "الاسم", deleted: "تاريخ الحذف", action: "الإجراء", binCopy: "تظهر ملفات سطح المكتب المحذوفة هنا ويمكن استعادتها.",
  },
  es: {
    file: "Archivo", system: "Sistema", connect: "Contacto", search: "Buscar en este equipo", settings: "Ajustes", recycleBin: "Papelera", rename: "Renombrar", delete: "Mover a la papelera", restore: "Restaurar", restoreAll: "Restaurar todo", emptyBin: "La papelera está vacía",
    open: "Abrir", edit: "Editar archivo", save: "Guardar", cancel: "Cancelar", personalize: "Personaliza esta estación de trabajo.", autoSave: "Las preferencias se guardan automáticamente.", wallpaper: "Fondo de pantalla", chooseWallpaper: "Elige el fondo del escritorio.", uploadWallpaper: "Sube tu fondo", uploadCopy: "Elige cualquier imagen del dispositivo; se optimiza y guarda localmente.", removeUpload: "Eliminar carga", regionTimezone: "Región y zona horaria", regionCopy: "10 perfiles regionales y 16 zonas horarias.", timezone: "Zona horaria", dateTime: "Fecha y hora", clock: "Reloj", date: "Fecha", language: "Idioma", languageCopy: "10 idiomas con fechas y dirección de lectura localizadas.",
  },
  fr: {
    file: "Fichier", system: "Système", connect: "Contact", search: "Rechercher sur cet ordinateur", settings: "Réglages", recycleBin: "Corbeille", rename: "Renommer", delete: "Déplacer vers la corbeille", restore: "Restaurer", restoreAll: "Tout restaurer", emptyBin: "La corbeille est vide",
    open: "Ouvrir", edit: "Modifier le fichier", save: "Enregistrer", cancel: "Annuler", personalize: "Personnalisez ce poste de travail.", autoSave: "Les préférences sont enregistrées automatiquement.", wallpaper: "Fond d’écran", chooseWallpaper: "Choisissez l’arrière-plan du bureau.", uploadWallpaper: "Importer votre fond", uploadCopy: "Choisissez une image de l’appareil; elle sera optimisée et enregistrée localement.", removeUpload: "Supprimer l’image", regionTimezone: "Région et fuseau horaire", regionCopy: "10 profils régionaux et 16 fuseaux horaires.", timezone: "Fuseau horaire", dateTime: "Date et heure", clock: "Horloge", date: "Date", language: "Langue", languageCopy: "10 langues avec dates et sens de lecture localisés.",
  },
  de: {
    file: "Datei", system: "System", connect: "Kontakt", search: "Diesen Computer durchsuchen", settings: "Einstellungen", recycleBin: "Papierkorb", rename: "Umbenennen", delete: "In den Papierkorb", restore: "Wiederherstellen", restoreAll: "Alle wiederherstellen", emptyBin: "Der Papierkorb ist leer",
    open: "Öffnen", edit: "Datei bearbeiten", save: "Speichern", cancel: "Abbrechen", personalize: "Diese Workstation personalisieren.", autoSave: "Einstellungen werden automatisch gespeichert.", wallpaper: "Hintergrund", chooseWallpaper: "Desktop-Hintergrund auswählen.", uploadWallpaper: "Eigenes Bild hochladen", uploadCopy: "Ein Bild vom Gerät auswählen; es wird optimiert und lokal gespeichert.", removeUpload: "Upload entfernen", regionTimezone: "Region und Zeitzone", regionCopy: "10 Regionsprofile und 16 Zeitzonen.", timezone: "Zeitzone", dateTime: "Datum und Uhrzeit", clock: "Uhr", date: "Datum", language: "Sprache", languageCopy: "10 Sprachen mit lokalisiertem Datum und Leserichtung.",
  },
  pt: {
    file: "Arquivo", system: "Sistema", connect: "Contato", search: "Pesquisar neste computador", settings: "Configurações", recycleBin: "Lixeira", rename: "Renomear", delete: "Mover para a lixeira", restore: "Restaurar", restoreAll: "Restaurar tudo", emptyBin: "A lixeira está vazia",
    open: "Abrir", edit: "Editar arquivo", save: "Salvar", cancel: "Cancelar", personalize: "Personalize esta estação de trabalho.", autoSave: "As preferências são salvas automaticamente.", wallpaper: "Papel de parede", chooseWallpaper: "Escolha o fundo da área de trabalho.", uploadWallpaper: "Enviar seu papel de parede", uploadCopy: "Escolha uma imagem do dispositivo; ela será otimizada e salva localmente.", removeUpload: "Remover imagem", regionTimezone: "Região e fuso horário", regionCopy: "10 perfis regionais e 16 fusos horários.", timezone: "Fuso horário", dateTime: "Data e hora", clock: "Relógio", date: "Data", language: "Idioma", languageCopy: "10 idiomas com datas e direção de leitura localizadas.",
  },
  ja: {
    file: "ファイル", system: "システム", connect: "連絡", search: "このコンピューターを検索", settings: "設定", recycleBin: "ごみ箱", rename: "名前を変更", delete: "ごみ箱へ移動", restore: "復元", restoreAll: "すべて復元", emptyBin: "ごみ箱は空です",
    open: "開く", edit: "ファイルを編集", save: "保存", cancel: "キャンセル", personalize: "このワークステーションをカスタマイズします。", autoSave: "設定は自動的に保存されます。", wallpaper: "壁紙", chooseWallpaper: "デスクトップ背景を選択します。", uploadWallpaper: "壁紙をアップロード", uploadCopy: "端末から画像を選択すると、最適化してローカルに保存します。", removeUpload: "画像を削除", regionTimezone: "地域とタイムゾーン", regionCopy: "10の地域プロファイルと16のタイムゾーン。", timezone: "タイムゾーン", dateTime: "日付と時刻", clock: "時計", date: "日付", language: "言語", languageCopy: "ローカライズされた日付と表示方向を持つ10言語。",
  },
  ko: {
    file: "파일", system: "시스템", connect: "연락처", search: "이 컴퓨터 검색", settings: "설정", recycleBin: "휴지통", rename: "이름 바꾸기", delete: "휴지통으로 이동", restore: "복원", restoreAll: "모두 복원", emptyBin: "휴지통이 비어 있습니다",
    open: "열기", edit: "파일 편집", save: "저장", cancel: "취소", personalize: "이 워크스테이션을 사용자화하세요.", autoSave: "환경설정은 자동으로 저장됩니다.", wallpaper: "배경화면", chooseWallpaper: "데스크톱 배경을 선택하세요.", uploadWallpaper: "배경화면 업로드", uploadCopy: "기기에서 이미지를 선택하면 최적화하여 로컬에 저장합니다.", removeUpload: "업로드 제거", regionTimezone: "지역 및 시간대", regionCopy: "10개 지역 프로필과 16개 시간대.", timezone: "시간대", dateTime: "날짜 및 시간", clock: "시계", date: "날짜", language: "언어", languageCopy: "현지화된 날짜와 읽기 방향을 지원하는 10개 언어.",
  },
  zh: {
    file: "文件", system: "系统", connect: "联系", search: "搜索此电脑", settings: "设置", recycleBin: "回收站", rename: "重命名", delete: "移到回收站", restore: "还原", restoreAll: "全部还原", emptyBin: "回收站为空",
    open: "打开", edit: "编辑文件", save: "保存", cancel: "取消", personalize: "个性化此工作站。", autoSave: "偏好设置会自动保存。", wallpaper: "壁纸", chooseWallpaper: "选择桌面背景。", uploadWallpaper: "上传壁纸", uploadCopy: "从设备选择图片，系统会优化并保存在本地。", removeUpload: "移除图片", regionTimezone: "地区和时区", regionCopy: "10个地区配置和16个实时时区。", timezone: "时区", dateTime: "日期和时间", clock: "时钟", date: "日期", language: "语言", languageCopy: "支持本地化日期和阅读方向的10种界面语言。",
  },
};

const contentTranslations = {
  es: {
    available: "DISPONIBLE", featured: "PROYECTO DESTACADO", allOperational: "Todos los sistemas operativos",
    heroTitle: "Convierto ideas de producto en software web rápido y escalable.",
    heroCopy: "Soy desarrollador Full Stack con más de 4 años creando productos modernos con React, Next.js, Node.js e integraciones de IA.",
    contactTitle: "Construyamos un producto que la gente recuerde y que pueda crecer.",
  },
  fr: {
    available: "DISPONIBLE", featured: "PROJET VEDETTE", allOperational: "Tous les systèmes sont opérationnels",
    heroTitle: "Je transforme les idées produit en logiciels web rapides et évolutifs.",
    heroCopy: "Développeur Full Stack avec plus de 4 ans d’expérience sur React, Next.js, Node.js et les intégrations IA.",
    contactTitle: "Construisons un produit mémorable, conçu pour évoluer.",
  },
  de: {
    available: "VERFÜGBAR", featured: "AUSGEWÄHLTES PROJEKT", allOperational: "Alle Systeme betriebsbereit",
    heroTitle: "Ich verwandle Produktideen in schnelle, skalierbare Websoftware.",
    heroCopy: "Full-Stack-Entwickler mit über 4 Jahren Erfahrung in React, Next.js, Node.js und KI-Integrationen.",
    contactTitle: "Lassen Sie uns ein Produkt bauen, das Menschen in Erinnerung bleibt und mitwächst.",
  },
  pt: {
    available: "DISPONÍVEL", featured: "PROJETO EM DESTAQUE", allOperational: "Todos os sistemas operacionais",
    heroTitle: "Transformo ideias de produto em software web rápido e escalável.",
    heroCopy: "Desenvolvedor Full Stack com mais de 4 anos criando produtos com React, Next.js, Node.js e integrações de IA.",
    contactTitle: "Vamos criar um produto memorável e pronto para crescer.",
  },
  ja: {
    available: "対応可能", featured: "注目プロジェクト", allOperational: "すべてのシステムが正常です",
    heroTitle: "プロダクトのアイデアを、高速で拡張可能なWebソフトウェアに変えます。",
    heroCopy: "React、Next.js、Node.js、AI統合を使ったプロダクト開発に4年以上携わるフルスタック開発者です。",
    contactTitle: "記憶に残り、成長できるプロダクトを一緒に作りましょう。",
  },
  ko: {
    available: "작업 가능", featured: "주요 프로젝트", allOperational: "모든 시스템이 정상 작동 중입니다",
    heroTitle: "제품 아이디어를 빠르고 확장 가능한 웹 소프트웨어로 만듭니다.",
    heroCopy: "React, Next.js, Node.js와 AI 통합으로 4년 이상 제품을 개발한 풀스택 개발자입니다.",
    contactTitle: "사람들이 기억하고 자신 있게 확장할 수 있는 제품을 함께 만들어요.",
  },
  zh: {
    available: "可接受合作", featured: "精选项目", allOperational: "所有系统运行正常",
    heroTitle: "我把产品创意转化为快速、可扩展的Web软件。",
    heroCopy: "我是一名拥有4年以上经验的全栈开发者，专注于React、Next.js、Node.js和AI集成。",
    contactTitle: "让我们一起打造令人难忘、能够持续扩展的产品。",
  },
};

const translate = (language, key) => interfaceTranslations[language]?.[key]
  || contentTranslations[language]?.[key]
  || translations[language]?.[key]
  || interfaceTranslations.en[key]
  || translations.en[key]
  || key;

const initialFileContents = {
  about: `# Nitin Kumar\n\nFull Stack Developer with 4+ years of experience building modern, scalable web products.\n\nCore stack: React.js, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL and AI integrations.`,
  projects: personalDataObj.projects.map((project, index) => `${String(index + 1).padStart(2, "0")}. ${project.title} | ${project.category} | ${project.tech.join(", ")}`).join("\n"),
  stack: stackGroups.map((group) => `${group.title}\n${group.items.join(" · ")}`).join("\n\n"),
  journey: personalDataObj.experience.map((item) => `${item.time} | ${item.profile} at ${item.company}\n${item.description}`).join("\n\n"),
  terminal: "# Terminal profile\nUse `help` inside Terminal to inspect available commands.",
  editor: "# Workspace Notes\n\nSelect any portfolio file, open its context menu and choose Edit file.\n\nChanges are saved inside this browser and remain available after reload.",
  resume: "Nitin Kumar — Full Stack Developer\nOpen this file normally to view the complete live resume and save it as PDF.",
  contact: `Nitin Kumar\nNoida, Uttar Pradesh, India\n${personalDataObj.email}\n${personalDataObj.github}\n${personalDataObj.linkedin}`,
};

const loadStoredValue = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const optimizeWallpaper = (file) => new Promise((resolve, reject) => {
  if (!file.type.startsWith("image/")) {
    reject(new Error("Please choose an image file."));
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => reject(new Error("This image could not be read."));
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => reject(new Error("This image format is not supported."));
    image.onload = () => {
      const maxWidth = 1600;
      const maxHeight = 1000;
      const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

const useClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
};

const useCompactLayout = () => {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 760px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setCompact(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
};

const getLocale = (preferences) => {
  const language = languages.find((item) => item.id === preferences.language);
  return preferences.language === "en"
    ? regions[preferences.region]?.locale || "en-IN"
    : language?.locale || regions[preferences.region]?.locale || "en-IN";
};

const formatTime = (date, preferences = defaultPreferences) => date.toLocaleTimeString(getLocale(preferences), {
  timeZone: preferences.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: preferences.hourCycle === "12",
});

const formatDate = (date, preferences = defaultPreferences) => {
  if (preferences.dateStyle === "iso") {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: preferences.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  const options = preferences.dateStyle === "short"
    ? { timeZone: preferences.timezone, year: "2-digit", month: "2-digit", day: "2-digit" }
    : { timeZone: preferences.timezone, weekday: "long", year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString(getLocale(preferences), options);
};

const StatusTag = ({ children, tone = "green" }) => (
  <span className={`nkos-tag nkos-tag-${tone}`}>{children}</span>
);

const PowerScreen = ({ onPower }) => (
  <motion.section className="nkos-power-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="nkos-hardware-label">
      <span>NK / 03</span>
      <span>FULL STACK WORKSTATION</span>
    </div>
    <div className="nkos-power-center">
      <div className="nkos-power-identity">
        <span>NITIN</span>
        <strong>OS</strong>
      </div>
      <p>React · Next.js · Node.js · AI</p>
      <button type="button" className="nkos-power-button" onClick={onPower} aria-label="Power on Nitin OS">
        <FiPower />
      </button>
      <button type="button" className="nkos-power-copy" onClick={onPower}>Power on portfolio</button>
    </div>
    <div className="nkos-power-footer">
      <span>NOIDA, INDIA</span>
      <span>BUILD 2026.08</span>
    </div>
  </motion.section>
);

const BootScreen = ({ bootIndex, onSkip }) => {
  const progress = Math.min(((bootIndex + 1) / bootSteps.length) * 100, 100);

  return (
    <motion.section className="nkos-boot-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="nkos-boot-brand">
        <span>NK</span>
        <div>
          <strong>Nitin OS</strong>
          <small>Developer workstation firmware</small>
        </div>
      </div>

      <div className="nkos-boot-console">
        <div className="nkos-boot-console-head">
          <span>POST / PROFESSIONAL OPERATING SYSTEM TEST</span>
          <span>{String(Math.round(progress)).padStart(3, "0")}%</span>
        </div>
        <div className="nkos-boot-log">
          {bootSteps.map((step, index) => (
            <motion.div
              key={step.label}
              className={index <= bootIndex ? "ready" : "pending"}
              initial={false}
              animate={{ opacity: index <= bootIndex ? 1 : 0.25 }}
            >
              <span>[{step.label}]</span>
              <b>{step.detail}</b>
              <small>{index <= bootIndex ? "OK" : "WAIT"}</small>
            </motion.div>
          ))}
        </div>
        <div className="nkos-progress-track"><motion.span animate={{ width: `${progress}%` }} /></div>
      </div>

      <div className="nkos-boot-specs">
        <span><FiCpu /> React / Next.js</span>
        <span><FiHardDrive /> Node / Databases</span>
        <span><FiZap /> AI integrations</span>
      </div>
      <button type="button" className="nkos-skip" onClick={onSkip}>Skip boot</button>
    </motion.section>
  );
};

const LoginScreen = ({ now, preferences, onEnter, onPowerOff }) => (
  <motion.section className="nkos-login-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="nkos-login-top">
      <span>NITIN OS</span>
      <button type="button" onClick={onPowerOff} aria-label="Power off"><FiPower /></button>
    </div>
    <div className="nkos-lock-time">
      <strong>{formatTime(now, preferences)}</strong>
      <span>{formatDate(now, preferences)}</span>
    </div>
    <div className="nkos-login-card">
      <img src={profileImg} alt="Nitin Kumar" />
      <div>
        <StatusTag>Available for work</StatusTag>
        <h1>{personalDataObj.name}</h1>
        <p>{personalDataObj.role} · Noida, India</p>
      </div>
      <button type="button" className="nkos-enter-button" onClick={onEnter}>
        Enter workspace <FiArrowRight />
      </button>
    </div>
    <div className="nkos-login-network"><FiWifi /> Secure professional network connected</div>
  </motion.section>
);

const WindowFrame = ({
  app,
  children,
  active,
  index,
  minimized,
  maximized,
  compact,
  workspaceRef,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
}) => {
  const Icon = app.icon;
  const offset = windowOffsets[app.id] || { x: 80, y: 40 };
  const dragControls = useDragControls();

  if (minimized) return null;

  return (
    <motion.section
      className={`nkos-window nkos-window-${app.id} ${active ? "active" : ""} ${maximized ? "maximized" : ""}`}
      style={{
        zIndex: 20 + index,
        left: maximized || compact ? undefined : offset.x,
        top: maximized || compact ? undefined : offset.y,
        "--app-color": app.color,
      }}
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      drag={!maximized && !compact}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={workspaceRef}
      dragMomentum={false}
      dragElastic={0.04}
      onMouseDown={onFocus}
    >
      <header
        className="nkos-window-bar"
        onPointerDown={(event) => {
          if (!maximized && !compact) dragControls.start(event);
        }}
      >
        <div className="nkos-window-controls" onPointerDown={(event) => event.stopPropagation()}>
          <button type="button" className="close" onClick={onClose} aria-label={`Close ${app.label}`}><FiX /></button>
          <button type="button" className="minimize" onClick={onMinimize} aria-label={`Minimize ${app.label}`}><FiMinimize2 /></button>
          <button type="button" className="maximize" onClick={onMaximize} aria-label={`Maximize ${app.label}`}><FiMaximize2 /></button>
        </div>
        <div className="nkos-window-name"><Icon /><span>{app.file}</span></div>
        <div className="nkos-window-state"><span className="nkos-live-dot" /> LIVE</div>
      </header>
      <div className="nkos-window-content">{children}</div>
    </motion.section>
  );
};

const AboutApp = ({ onOpenProjects, t }) => (
  <div className="nkos-about-app">
    <aside className="nkos-app-sidebar">
      <div className="nkos-sidebar-label">FAVORITES</div>
      <button type="button" className="active"><FiHome /> Home</button>
      <button type="button"><FiUser /> Profile</button>
      <button type="button"><FiActivity /> Availability</button>
      <div className="nkos-sidebar-label">LOCATION</div>
      <span><FiHardDrive /> Noida, India</span>
    </aside>
    <article className="nkos-readme">
      <div className="nkos-readme-path"><FiFileText /> Nitin / Profile / README.md</div>
      <div className="nkos-profile-hero">
        <div className="nkos-profile-photo">
          <img src={profileImg} alt="Nitin Kumar" />
          <span>NK</span>
        </div>
        <div>
          <StatusTag>{t("available")}</StatusTag>
          <p className="nkos-kicker">FULL STACK DEVELOPER · 4+ YEARS</p>
          <h1>{t("heroTitle")}</h1>
          <p className="nkos-about-copy">{t("heroCopy")}</p>
          <div className="nkos-action-row">
            <button type="button" className="nkos-primary-action" onClick={onOpenProjects}><FiFolder /> Explore work</button>
            <a href={`mailto:${personalDataObj.email}`} className="nkos-secondary-action"><FiMail /> Contact</a>
          </div>
        </div>
      </div>
      <div className="nkos-proof-strip">
        <div><strong>15</strong><span>Project systems</span></div>
        <div><strong>4+</strong><span>Years building</span></div>
        <div><strong>2</strong><span>Companies</span></div>
        <div><strong>Full</strong><span>Product ownership</span></div>
      </div>
      <div className="nkos-capability-line">
        <span>PRODUCT UI</span><FiChevronRight /><span>API ARCHITECTURE</span><FiChevronRight /><span>DATA</span><FiChevronRight /><span>AI WORKFLOWS</span>
      </div>
    </article>
  </div>
);

const ProjectsApp = ({ selectedProject, setSelectedProject }) => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return personalDataObj.projects.filter((project) => {
      const matchesCategory = filter === "All" || project.category === filter;
      const searchable = `${project.title} ${project.category} ${project.tech.join(" ")} ${project.features.join(" ")}`.toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [filter, query]);

  useEffect(() => {
    if (selectedProject && filteredProjects.some((project) => project.id === selectedProject.id)) return;
    if (filteredProjects.length) setSelectedProject(filteredProjects[0]);
  }, [filter, query]);

  const project = selectedProject || personalDataObj.projects[13];

  return (
    <div className="nkos-project-app">
      <div className="nkos-explorer-toolbar">
        <div><FiArrowLeft /><FiArrowRight /></div>
        <div className="nkos-address-bar"><FiFolder /> Nitin / Work / Projects</div>
        <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search files" /></label>
      </div>
      <aside className="nkos-project-folders">
        <div className="nkos-sidebar-label">PROJECTS</div>
        {projectFilters.map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            <FiFolder /> {item}<span>{item === "All" ? personalDataObj.projects.length : personalDataObj.projects.filter((projectItem) => projectItem.category === item).length}</span>
          </button>
        ))}
      </aside>
      <div className="nkos-project-files">
        <div className="nkos-files-head"><span>NAME</span><span>TYPE</span></div>
        {filteredProjects.map((projectItem) => (
          <button
            type="button"
            key={projectItem.id}
            className={project.id === projectItem.id ? "active" : ""}
            onClick={() => setSelectedProject(projectItem)}
          >
            <img src={projectItem.img} alt="" />
            <span><b>{projectItem.title}</b><small>{projectItem.shortDesc}</small></span>
            <em>{projectItem.category}</em>
          </button>
        ))}
        {!filteredProjects.length && <div className="nkos-empty-state"><FiSearch /><p>No project files matched.</p></div>}
      </div>
      <AnimatePresence mode="wait">
        <motion.article
          key={project.id}
          className="nkos-project-preview"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18 }}
        >
          <div className="nkos-project-cover"><img src={project.img} alt={project.title} /><span>{String(project.id).padStart(2, "0")}</span></div>
          <div className="nkos-project-title-row">
            <div><p>{project.type}</p><h2>{project.title}</h2></div>
            <StatusTag tone={project.category === "AI / SaaS" ? "red" : "blue"}>{project.category}</StatusTag>
          </div>
          <p className="nkos-project-description">{project.desc}</p>
          <div className="nkos-project-facts">
            <div><span>ROLE</span><b>{project.role}</b></div>
            <div><span>DURATION</span><b>{project.duration}</b></div>
            <div><span>OWNERSHIP</span><b>{project.contribution}%</b></div>
            <div><span>TEAM</span><b>{project.teamSize}</b></div>
          </div>
          <div className="nkos-detail-block"><span>STACK</span><div>{project.tech.map((tech) => <em key={tech}>{tech}</em>)}</div></div>
          <div className="nkos-detail-block"><span>SHIPPED</span><ul>{project.features.map((feature) => <li key={feature}><FiCheck /> {feature}</li>)}</ul></div>
          {(project.link !== "#" || project.git !== "#") && (
            <div className="nkos-action-row">
              {project.link !== "#" && <a href={project.link} target="_blank" rel="noreferrer" className="nkos-primary-action"><FiExternalLink /> Live product</a>}
              {project.git !== "#" && <a href={project.git} target="_blank" rel="noreferrer" className="nkos-secondary-action"><FiGithub /> Source</a>}
            </div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  );
};

const StackApp = () => (
  <div className="nkos-stack-app">
    <div className="nkos-architecture-head">
      <div>
        <p>SYSTEM ARCHITECTURE / CAPABILITIES</p>
        <h2>From interface to infrastructure.</h2>
      </div>
      <div className="nkos-system-score"><FiActivity /><strong>4</strong><span>production layers</span></div>
    </div>
    <div className="nkos-architecture-grid">
      {stackGroups.map((group, index) => {
        const Icon = group.icon;
        return (
          <motion.article key={group.title} style={{ "--layer-color": group.color }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
            <div className="nkos-layer-index">0{index + 1}</div>
            <Icon />
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
            <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        );
      })}
    </div>
    <div className="nkos-build-pipeline">
      <span><FiCode /> PRODUCT IDEA</span><i /><span><FiMonitor /> UI SYSTEM</span><i /><span><FiServer /> API</span><i /><span><FiDatabase /> DATA</span><i /><span><FiZap /> SHIP</span>
    </div>
  </div>
);

const JourneyApp = () => (
  <div className="nkos-journey-app">
    <header><p>CAREER_TIMELINE.LOG</p><h2>Building across product teams since 2022.</h2></header>
    <div className="nkos-timeline">
      {personalDataObj.experience.map((item, index) => (
        <article key={`${item.company}-${item.time}`} className="nkos-timeline-entry">
          <div className="nkos-timeline-marker"><span>{index + 1}</span></div>
          <div className="nkos-timeline-date">{item.time}</div>
          <div className="nkos-timeline-copy">
            <StatusTag>{index === 0 ? "CURRENT" : "COMPLETED"}</StatusTag>
            <h3>{item.profile}</h3>
            <h4>{item.company}</h4>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
      {personalDataObj.education.map((item, index) => (
        <article key={`${item.college}-${item.time}`} className="nkos-timeline-entry education">
          <div className="nkos-timeline-marker"><span>{index + personalDataObj.experience.length + 1}</span></div>
          <div className="nkos-timeline-date">{item.time}</div>
          <div className="nkos-timeline-copy"><StatusTag tone="blue">EDUCATION</StatusTag><h3>{item.course}</h3><h4>{item.college}</h4><p>{item.description}</p></div>
        </article>
      ))}
    </div>
  </div>
);

const TerminalApp = ({ openApp }) => {
  const [lines, setLines] = useState([
    { type: "system", value: "Nitin OS Terminal v4.2.0" },
    { type: "output", value: "Type 'help' to inspect this workstation." },
  ]);
  const [command, setCommand] = useState("");
  const terminalRef = useRef(null);

  const runCommand = (event) => {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;
    const normalized = input.toLowerCase();
    const nextLines = [...lines, { type: "command", value: input }];

    if (normalized === "clear") {
      setLines([]);
      setCommand("");
      return;
    }

    const responses = {
      help: "Commands: whoami, stack, projects, experience, contact, open <app>, clear",
      whoami: "Nitin Kumar — Full Stack Developer building React, Next.js, Node.js and AI products.",
      stack: "Frontend: React/Next/TS | Backend: Node/Nest/Express | Data: Mongo/Postgres/Supabase | AI: OpenAI/Gemini",
      projects: "15 project systems indexed. Run: open projects",
      experience: "4+ years | iByte Infomatics + Ideahelix Pvt. Ltd.",
      contact: `Email: ${personalDataObj.email}`,
    };

    if (normalized.startsWith("open ")) {
      const target = normalized.replace("open ", "").trim();
      const matched = appCatalog.find((app) => app.id === target || app.label.toLowerCase().includes(target));
      if (matched) {
        openApp(matched.id);
        nextLines.push({ type: "success", value: `Opening ${matched.label}...` });
      } else {
        nextLines.push({ type: "error", value: `App '${target}' was not found.` });
      }
    } else {
      nextLines.push({ type: responses[normalized] ? "output" : "error", value: responses[normalized] || `Command not found: ${input}` });
    }

    setLines(nextLines);
    setCommand("");
    window.setTimeout(() => terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" }), 0);
  };

  return (
    <div className="nkos-terminal-app" ref={terminalRef}>
      <div className="nkos-terminal-banner"><span>nitin@portfolio</span><span>zsh</span></div>
      {lines.map((line, index) => (
        <div key={`${line.value}-${index}`} className={`nkos-terminal-row ${line.type}`}>
          {line.type === "command" ? <><span>nitin@os ~ %</span><b>{line.value}</b></> : <p>{line.value}</p>}
        </div>
      ))}
      <form onSubmit={runCommand} className="nkos-terminal-input">
        <span>nitin@os ~ %</span>
        <input value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Terminal command" autoFocus autoComplete="off" spellCheck="false" />
      </form>
    </div>
  );
};

const EditorApp = ({ item, onSave, t }) => {
  const [draft, setDraft] = useState(item?.content || "");
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    setDraft(item?.content || "");
    setSavedAt("");
  }, [item?.id, item?.content]);

  const save = () => {
    if (!item) return;
    onSave(item.id, draft);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  useEffect(() => {
    const handleSaveShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  });

  return (
    <div className="nkos-editor-app">
      <header>
        <div><FiFileText /><span><b>{item?.name || "Workspace.nk"}</b><small>LOCAL FILE · UTF-8</small></span></div>
        <div><span>{draft.length} characters</span>{savedAt && <em>Saved {savedAt}</em>}<button type="button" onClick={save}><FiSave /> {t("save")}</button></div>
      </header>
      <div className="nkos-editor-workspace">
        <aside>{draft.split("\n").map((_, index) => <span key={index}>{index + 1}</span>)}</aside>
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} aria-label={`Edit ${item?.name || "file"}`} spellCheck="true" />
      </div>
      <footer><span><FiCheck /> Browser-local persistence</span><span>Markdown / Plain text</span><span>Ln {draft.split("\n").length}, Col 1</span></footer>
    </div>
  );
};

const BrowserApp = ({ onOpenApp }) => {
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [address, setAddress] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const activeUrl = history[historyIndex] || "";

  useEffect(() => setAddress(activeUrl), [activeUrl]);

  const normalizeAddress = (value) => {
    const input = value.trim();
    if (!input) return "";
    if (/^https?:\/\//i.test(input)) return input;
    if (/^(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(input)) return `http://${input}`;
    if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/i.test(input)) return `https://${input}`;
    return `https://www.google.com/search?igu=1&q=${encodeURIComponent(input)}`;
  };

  const visit = (value) => {
    const nextUrl = normalizeAddress(value);
    const nextHistory = [...history.slice(0, historyIndex + 1), nextUrl];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setLoading(Boolean(nextUrl));
  };

  const submitAddress = (event) => {
    event.preventDefault();
    visit(address);
  };

  const goBack = () => historyIndex > 0 && setHistoryIndex((index) => index - 1);
  const goForward = () => historyIndex < history.length - 1 && setHistoryIndex((index) => index + 1);

  return (
    <div className="nkos-browser-app">
      <header className="nkos-browser-toolbar">
        <nav>
          <button type="button" onClick={goBack} disabled={historyIndex === 0} aria-label="Back"><FiArrowLeft /></button>
          <button type="button" onClick={goForward} disabled={historyIndex >= history.length - 1} aria-label="Forward"><FiArrowRight /></button>
          <button type="button" onClick={() => { setReloadKey((key) => key + 1); setLoading(Boolean(activeUrl)); }} disabled={!activeUrl} aria-label="Reload"><FiRefreshCw /></button>
          <button type="button" onClick={() => visit("")} aria-label="Browser home"><FiHome /></button>
        </nav>
        <form onSubmit={submitAddress}>
          {activeUrl ? <FiLock /> : <FiSearch />}
          <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Search anything or enter a web address" aria-label="Browser address and search" />
        </form>
        <a href={activeUrl || "https://www.google.com"} target="_blank" rel="noreferrer" aria-label="Open current page in a new browser tab" title="Open externally"><FiExternalLink /></a>
      </header>

      <div className="nkos-browser-viewport">
        {activeUrl ? (
          <>
            {loading && <div className="nkos-browser-loading"><span /></div>}
            <iframe
              key={`${activeUrl}-${reloadKey}`}
              title="Nitin Browser web view"
              src={activeUrl}
              onLoad={() => setLoading(false)}
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            />
          </>
        ) : (
          <div className="nkos-browser-home">
            <div className="nkos-browser-mark"><FiCompass /><span>NK</span></div>
            <p>NITIN BROWSER</p>
            <h2>Search the web without leaving the portfolio.</h2>
            <form onSubmit={submitAddress}><FiSearch /><input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="What do you want to explore?" autoFocus /><button type="submit"><FiArrowRight /></button></form>
            <div className="nkos-browser-quick">
              <button type="button" onClick={() => onOpenApp("projects")}><FiFolder /><span><b>Portfolio projects</b><small>Open inside Nitin OS</small></span></button>
              <button type="button" onClick={() => visit("latest full stack development trends")}><FiActivity /><span><b>Tech trends</b><small>Search the open web</small></span></button>
              <button type="button" onClick={() => visit(personalDataObj.github)}><FiGithub /><span><b>GitHub profile</b><small>Repositories and code</small></span></button>
              <button type="button" onClick={() => visit("Noida Uttar Pradesh India map")}><FiMapPin /><span><b>Noida map</b><small>Location and directions</small></span></button>
            </div>
          </div>
        )}
      </div>
      <footer><span><i className={loading ? "loading" : ""} /> {loading ? "Loading secure web view" : "Ready"}</span><span>Some websites block embedded viewing. Use <FiExternalLink /> to open them directly.</span></footer>
    </div>
  );
};

const ResumeApp = () => (
  <div className="nkos-resume-app">
    <div className="nkos-document-toolbar">
      <span><FiFileText /> Nitin_Kumar_Live_Resume</span>
      <div>
        <button type="button" onClick={() => window.print()}><FiPrinter /> Print / Save PDF</button>
        <a href={resumePDF} download><FiDownload /> Original PDF</a>
      </div>
    </div>
    <article className="nkos-live-resume">
      <header>
        <div><p>FULL STACK DEVELOPER</p><h1>{personalDataObj.name}</h1><span>{personalDataObj.about}</span></div>
        <aside>
          <a href={`mailto:${personalDataObj.email}`}>{personalDataObj.email}</a>
          <span>{personalDataObj.phone}</span>
          <span>{personalDataObj.location}</span>
          <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
          <a href={personalDataObj.github} target="_blank" rel="noreferrer">GitHub portfolio</a>
        </aside>
      </header>

      <section className="nkos-resume-section">
        <h2>Core Engineering Stack</h2>
        <div className="nkos-resume-stack">
          {stackGroups.map((group) => <div key={group.title}><b>{group.title}</b><p>{group.items.join(" · ")}</p></div>)}
        </div>
      </section>

      <section className="nkos-resume-section">
        <h2>Professional Experience</h2>
        {personalDataObj.experience.map((item) => (
          <div className="nkos-resume-entry" key={`${item.company}-${item.time}`}>
            <div><b>{item.profile}</b><span>{item.company}</span></div>
            <time>{item.time}</time>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className="nkos-resume-section">
        <h2>Project Portfolio · {personalDataObj.projects.length} Systems</h2>
        <div className="nkos-resume-project-grid">
          {personalDataObj.projects.map((project) => (
            <div key={project.id}>
              <span>{String(project.id).padStart(2, "0")}</span>
              <b>{project.title}</b>
              <small>{project.category} · {project.role} · {project.contribution}% ownership</small>
              <p>{project.tech.join(" / ")}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="nkos-resume-bottom-grid">
        <section className="nkos-resume-section">
          <h2>Education</h2>
          {personalDataObj.education.map((item) => <div className="nkos-resume-entry compact" key={item.course}><div><b>{item.course}</b><span>{item.college}</span></div><time>{item.time}</time></div>)}
        </section>
        <section className="nkos-resume-section">
          <h2>Certification</h2>
          {personalDataObj.certificate.map((item) => <div className="nkos-resume-entry compact" key={item.cerName}><div><b>{item.cerName}</b><span>{item.institute}</span></div><time>{item.time}</time></div>)}
        </section>
      </div>
    </article>
  </div>
);

const ContactApp = ({ t }) => (
  <div className="nkos-contact-app">
    <div className="nkos-contact-intro">
      <StatusTag>CHANNEL OPEN</StatusTag>
      <p>CONNECT.EXE</p>
      <h2>{t("contactTitle")}</h2>
      <span>Available for full stack roles, product builds, dashboards, SaaS and AI integrations.</span>
      <a className="nkos-mail-action" href={`mailto:${personalDataObj.email}`}><FiMail /> {personalDataObj.email}<FiArrowUpRight /></a>
    </div>
    <div className="nkos-contact-directory">
      <a href={personalDataObj.github} target="_blank" rel="noreferrer"><FiGithub /><span><b>GitHub</b><small>Inspect repositories</small></span><FiArrowUpRight /></a>
      <a href={personalDataObj.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /><span><b>LinkedIn</b><small>Professional profile</small></span><FiArrowUpRight /></a>
      <a href={personalDataObj.leetcode} target="_blank" rel="noreferrer"><SiLeetcode /><span><b>LeetCode</b><small>Problem solving</small></span><FiArrowUpRight /></a>
      <div className="nkos-contact-location"><FiWifi /><span><b>Noida, India</b><small>Open to remote collaboration</small></span><StatusTag>ONLINE</StatusTag></div>
    </div>
    <div className="nkos-map-card">
      <iframe
        title="Noida, India map"
        loading="lazy"
        src="https://www.google.com/maps?q=Noida%2C%20Uttar%20Pradesh%2C%20India&output=embed"
      />
      <div>
        <span><FiMapPin /><b>Noida, Uttar Pradesh, India</b><small>Current professional location</small></span>
        <a href="https://www.google.com/maps/dir/?api=1&destination=Noida%2C%20Uttar%20Pradesh%2C%20India" target="_blank" rel="noreferrer">Get directions <FiArrowUpRight /></a>
      </div>
    </div>
  </div>
);

const SettingsApp = ({ preferences, setPreferences, now, t }) => {
  const wallpaperInputRef = useRef(null);
  const [uploadState, setUploadState] = useState("");
  const update = (changes) => setPreferences((current) => ({ ...current, ...changes }));
  const wallpaperChoices = preferences.customWallpaper
    ? [...wallpapers, { id: "custom", name: "My Upload", image: preferences.customWallpaper }]
    : wallpapers;

  const handleWallpaperUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setUploadState("Choose an image smaller than 20 MB.");
      return;
    }

    setUploadState("Optimizing wallpaper...");
    try {
      const customWallpaper = await optimizeWallpaper(file);
      update({ customWallpaper, wallpaper: "custom" });
      setUploadState(`${file.name} is now your desktop wallpaper.`);
    } catch (error) {
      setUploadState(error.message);
    }
  };

  const handleTimezoneChange = (event) => {
    const selected = timezoneOptions.find((item) => item.timezone === event.target.value);
    update({ timezone: event.target.value, region: selected?.region || preferences.region });
  };

  return (
    <div className="nkos-settings-app">
      <aside>
        <div className="nkos-settings-icon"><FiSettings /></div>
        <h2>{t("settings")}</h2>
        <p>{t("personalize")}</p>
        <span>{t("autoSave")}</span>
      </aside>
      <div className="nkos-settings-content">
        <section>
          <header><FiImage /><div><h3>{t("wallpaper")}</h3><p>{t("chooseWallpaper")}</p></div></header>
          <div className="nkos-wallpaper-options">
            {wallpaperChoices.map((wallpaper) => (
              <button type="button" key={wallpaper.id} className={preferences.wallpaper === wallpaper.id ? "active" : ""} onClick={() => update({ wallpaper: wallpaper.id })}>
                <span style={wallpaper.image ? { backgroundImage: `url(${wallpaper.image})` } : undefined} className={!wallpaper.image ? "grid-preview" : ""}>{preferences.wallpaper === wallpaper.id && <FiCheck />}</span>
                <b>{wallpaper.name}</b>
              </button>
            ))}
          </div>
          <div className="nkos-wallpaper-upload">
            <input ref={wallpaperInputRef} type="file" accept="image/*" onChange={handleWallpaperUpload} />
            <button type="button" onClick={() => wallpaperInputRef.current?.click()}><FiUploadCloud /><span><b>{t("uploadWallpaper")}</b><small>{t("uploadCopy")}</small></span></button>
            {preferences.customWallpaper && <button type="button" className="remove" onClick={() => update({ customWallpaper: "", wallpaper: preferences.wallpaper === "custom" ? "circuit" : preferences.wallpaper })}><FiTrash2 /> {t("removeUpload")}</button>}
            {uploadState && <p>{uploadState}</p>}
          </div>
        </section>

        <section>
          <header><FiGlobe /><div><h3>{t("regionTimezone")}</h3><p>{t("regionCopy")}</p></div></header>
          <div className="nkos-region-options">
            {Object.entries(regions).map(([regionKey, region]) => (
              <button
                type="button"
                key={region.name}
                className={preferences.region === regionKey ? "active" : ""}
                onClick={() => update({ region: regionKey, timezone: region.zones[0] })}
              >
                <span>{region.code}</span><b>{region.name}</b>
              </button>
            ))}
          </div>
          <label className="nkos-settings-select">{t("timezone")}<select value={preferences.timezone} onChange={handleTimezoneChange}>{timezoneOptions.map((option) => <option key={option.timezone} value={option.timezone}>{option.label}</option>)}</select></label>
        </section>

        <section>
          <header><FiClock /><div><h3>{t("dateTime")}</h3><p>{formatDate(now, preferences)} · {formatTime(now, preferences)}</p></div></header>
          <div className="nkos-setting-controls">
            <div><span>{t("clock")}</span>{["12", "24"].map((value) => <button type="button" key={value} className={preferences.hourCycle === value ? "active" : ""} onClick={() => update({ hourCycle: value })}>{value}-hour</button>)}</div>
            <div><span>{t("date")}</span>{["short", "long", "iso"].map((value) => <button type="button" key={value} className={preferences.dateStyle === value ? "active" : ""} onClick={() => update({ dateStyle: value })}>{value.toUpperCase()}</button>)}</div>
          </div>
        </section>

        <section>
          <header><FiGlobe /><div><h3>{t("language")}</h3><p>{t("languageCopy")}</p></div></header>
          <div className="nkos-language-options">
            {languages.map((language) => (
              <button type="button" key={language.id} className={preferences.language === language.id ? "active" : ""} onClick={() => update({ language: language.id })}><span>{language.code}</span><b>{language.name}</b></button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const BinApp = ({ deletedItems, onRestore, onRestoreAll, preferences, t }) => (
  <div className="nkos-bin-app">
    <header><div><FiTrash2 /><span><b>{t("recycleBin")}</b><small>{deletedItems.length} {t("deletedItems")}</small></span></div>{deletedItems.length > 0 && <button type="button" onClick={onRestoreAll}><FiRotateCcw /> {t("restoreAll")}</button>}</header>
    {deletedItems.length ? (
      <div className="nkos-bin-list">
        <div className="nkos-bin-head"><span>{t("name")}</span><span>{t("deleted")}</span><span>{t("action")}</span></div>
        {deletedItems.map((item) => {
          const app = appCatalog.find((entry) => entry.id === item.id);
          const Icon = app?.icon || FiFile;
          return <div key={item.id}><span className="nkos-bin-file" style={{ "--app-color": app?.color }}><Icon /></span><span><b>{item.name}</b><small>{app?.label}</small></span><time>{new Date(item.deletedAt).toLocaleString(getLocale(preferences), { timeZone: preferences.timezone })}</time><button type="button" onClick={() => onRestore(item.id)}><FiRotateCcw /> {t("restore")}</button></div>;
        })}
      </div>
    ) : <div className="nkos-bin-empty"><FiTrash2 /><h3>{t("emptyBin")}</h3><p>{t("binCopy")}</p></div>}
  </div>
);

const RenameDialog = ({ item, onChange, onCancel, onSave, t }) => (
  <motion.div className="nkos-dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onCancel}>
    <motion.form className="nkos-rename-dialog" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onMouseDown={(event) => event.stopPropagation()} onSubmit={onSave}>
      <span><FiEdit3 /></span><div><h3>{t("rename")}</h3><p>Enter a new desktop file name.</p></div>
      <input value={item.value} onChange={(event) => onChange({ ...item, value: event.target.value })} autoFocus maxLength={32} aria-label="New file name" />
      <footer><button type="button" onClick={onCancel}>{t("cancel")}</button><button type="submit"><FiSave /> {t("save")}</button></footer>
    </motion.form>
  </motion.div>
);

const SearchPanel = ({ query, setQuery, results, onSelect, onClose, t }) => (
  <motion.div className="nkos-search-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
    <motion.div className="nkos-search-panel" data-testid="global-search" initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}>
      <label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search")} autoFocus /><span>ESC</span></label>
      <div className="nkos-search-results">
        <div className="nkos-search-label">{query ? t("matched") : t("quickAccess")}</div>
        {results.slice(0, 8).map((item) => {
          const Icon = item.icon;
          return (
            <button type="button" key={item.key} onClick={() => onSelect(item)}>
              <span className="nkos-result-icon" style={{ "--result-color": item.color }}><Icon /></span>
              <span><b>{item.label}</b><small>{item.detail}</small></span>
              <em>{item.kind}</em>
              <FiChevronRight />
            </button>
          );
        })}
        {!results.length && <div className="nkos-empty-state"><FiSearch /><p>{t("noResults")}</p></div>}
      </div>
      <footer><span><b>↵</b> Open</span><span><b>ESC</b> Close</span><span>{personalDataObj.projects.length + appCatalog.length} items indexed</span></footer>
    </motion.div>
  </motion.div>
);

const StartMenu = ({ onOpen, onClose, now, preferences }) => (
  <motion.div className="nkos-start-menu" data-testid="start-menu" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }}>
    <div className="nkos-start-profile"><img src={profileImg} alt="" /><span><b>Nitin Kumar</b><small>Full Stack Developer</small></span><button type="button" onClick={onClose} aria-label="Close menu"><FiX /></button></div>
    <div className="nkos-start-heading"><span>PINNED</span><small>{formatTime(now, preferences)}</small></div>
    <div className="nkos-start-grid">
      {appCatalog.map((app) => {
        const Icon = app.icon;
        return <button type="button" key={app.id} onClick={() => onOpen(app.id)}><span style={{ "--app-color": app.color }}><Icon /></span><small>{app.label}</small></button>;
      })}
    </div>
    <div className="nkos-start-recent"><span>FEATURED WORK</span>{personalDataObj.projects.slice(13, 15).map((project) => <button type="button" key={project.id} onClick={() => onOpen("projects", project)}><img src={project.img} alt="" /><span><b>{project.title}</b><small>{project.category}</small></span><FiChevronRight /></button>)}</div>
  </motion.div>
);

const QuickSettings = ({ focusMode, setFocusMode, soundOn, setSoundOn, onOpenSettings, t }) => (
  <motion.div className="nkos-quick-settings" data-testid="quick-settings" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
    <header><span>{t("controlCenter")}</span><button type="button" onClick={onOpenSettings} aria-label={t("openSettings")}><FiSettings /></button></header>
    <div className="nkos-toggle-grid">
      <button type="button" className="active"><FiWifi /><span><b>{t("network")}</b><small>{t("connected")}</small></span></button>
      <button type="button" className={focusMode ? "active" : ""} onClick={() => setFocusMode((value) => !value)}><FiMoon /><span><b>{t("focus")}</b><small>{focusMode ? t("on") : t("off")}</small></span></button>
      <button type="button" className={soundOn ? "active" : ""} onClick={() => setSoundOn((value) => !value)}>{soundOn ? <FiVolume2 /> : <FiVolumeX />}<span><b>{t("sound")}</b><small>{soundOn ? t("on") : t("muted")}</small></span></button>
      <button type="button" className="active"><FiSun /><span><b>{t("display")}</b><small>100%</small></span></button>
    </div>
    <div className="nkos-control-slider"><FiSun /><span><i /></span><b>82%</b></div>
    <div className="nkos-system-ready"><FiCheck /><span><b>{t("allOperational")}</b><small>Portfolio build 2026.08</small></span></div>
  </motion.div>
);

const Desktop = ({ now, preferences, setPreferences, onPowerOff }) => {
  const workspaceRef = useRef(null);
  const compact = useCompactLayout();
  const t = (key) => translate(preferences.language, key);
  const [openWindows, setOpenWindows] = useState(["about"]);
  const [activeWindow, setActiveWindow] = useState("about");
  const [windowState, setWindowState] = useState({});
  const [selectedProject, setSelectedProject] = useState(personalDataObj.projects[13]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startOpen, setStartOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [notification, setNotification] = useState("Workspace ready · 15 project files indexed");
  const [contextMenu, setContextMenu] = useState(null);
  const [renameItem, setRenameItem] = useState(null);
  const [editorTargetId, setEditorTargetId] = useState("editor");
  const [desktopItems, setDesktopItems] = useState(() => {
    const storedItems = loadStoredValue("nkos-desktop-items", []);
    return appCatalog.map((app) => {
      const stored = storedItems.find((item) => item.id === app.id);
      return stored
        ? { ...stored, name: stored.name || app.file, content: stored.content ?? initialFileContents[app.id] ?? "" }
        : { id: app.id, name: app.file, content: initialFileContents[app.id] ?? "", deleted: false, deletedAt: null };
    });
  });

  const activeWallpaper = preferences.wallpaper === "custom" && preferences.customWallpaper
    ? { id: "custom", name: "My Upload", image: preferences.customWallpaper }
    : wallpapers.find((wallpaper) => wallpaper.id === preferences.wallpaper) || wallpapers[0];
  const deletedItems = desktopItems.filter((item) => item.deleted);

  useEffect(() => {
    try {
      window.localStorage.setItem("nkos-desktop-items", JSON.stringify(desktopItems));
    } catch {
      pushNotification("Local storage is full. Remove a custom wallpaper and try again.");
    }
  }, [desktopItems]);

  const pushNotification = (message) => setNotification(message);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = window.setTimeout(() => setNotification(""), 3600);
    return () => window.clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        setStartOpen(false);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setStartOpen(false);
        setQuickOpen(false);
        setContextMenu(null);
        setRenameItem(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const openApp = (id, project) => {
    if (project) setSelectedProject(project);
    setOpenWindows((current) => [...current.filter((item) => item !== id), id]);
    setWindowState((current) => ({ ...current, [id]: { ...current[id], minimized: false } }));
    setActiveWindow(id);
    setStartOpen(false);
    setSearchOpen(false);
    setContextMenu(null);
  };

  const closeApp = (id) => {
    setOpenWindows((current) => current.filter((item) => item !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter((item) => item !== id);
      setActiveWindow(remaining[remaining.length - 1] || "");
    }
  };

  const focusApp = (id) => {
    setOpenWindows((current) => [...current.filter((item) => item !== id), id]);
    setActiveWindow(id);
  };

  const minimizeApp = (id) => {
    setWindowState((current) => ({ ...current, [id]: { ...current[id], minimized: true } }));
    const remaining = openWindows.filter((item) => item !== id && !windowState[item]?.minimized);
    setActiveWindow(remaining[remaining.length - 1] || "");
  };

  const toggleMaximize = (id) => {
    setWindowState((current) => ({ ...current, [id]: { ...current[id], maximized: !current[id]?.maximized } }));
    focusApp(id);
  };

  const deleteDesktopItem = (id) => {
    if (protectedDesktopIds.has(id)) return;
    const item = desktopItems.find((entry) => entry.id === id);
    setDesktopItems((current) => current.map((entry) => entry.id === id ? { ...entry, deleted: true, deletedAt: new Date().toISOString() } : entry));
    closeApp(id);
    setContextMenu(null);
    pushNotification(`${item?.name || "File"} moved to Recycle Bin`);
  };

  const restoreDesktopItem = (id) => {
    const item = desktopItems.find((entry) => entry.id === id);
    setDesktopItems((current) => current.map((entry) => entry.id === id ? { ...entry, deleted: false, deletedAt: null } : entry));
    pushNotification(`${item?.name || "File"} restored to desktop`);
  };

  const restoreAllDesktopItems = () => {
    setDesktopItems((current) => current.map((entry) => ({ ...entry, deleted: false, deletedAt: null })));
    pushNotification("All deleted files restored to desktop");
  };

  const saveRenamedItem = (event) => {
    event.preventDefault();
    const nextName = renameItem?.value.trim();
    if (!nextName) return;
    setDesktopItems((current) => current.map((entry) => entry.id === renameItem.id ? { ...entry, name: nextName } : entry));
    setRenameItem(null);
    pushNotification(`File renamed to ${nextName}`);
  };

  const saveFileContent = (id, content) => {
    const item = desktopItems.find((entry) => entry.id === id);
    setDesktopItems((current) => current.map((entry) => entry.id === id ? { ...entry, content } : entry));
    pushNotification(`${item?.name || "File"} saved locally`);
  };

  const openEditor = (id) => {
    setEditorTargetId(id);
    openApp("editor");
  };

  const searchResults = useMemo(() => {
    const normalized = searchQuery.toLowerCase().trim();
    const apps = appCatalog.map((app) => {
      const desktopItem = desktopItems.find((item) => item.id === app.id);
      return { key: `app-${app.id}`, kind: "APP", label: app.label, detail: desktopItem?.name || app.file, icon: app.icon, color: app.color, app: app.id, search: `${app.label} ${desktopItem?.name || app.file} ${app.keywords}`.toLowerCase() };
    });
    const projects = personalDataObj.projects.map((project) => ({ key: `project-${project.id}`, kind: "PROJECT", label: project.title, detail: `${project.category} · ${project.tech.slice(0, 3).join(" / ")}`, icon: FiFile, color: project.category === "AI / SaaS" ? "#ff6b6b" : "#ffc857", app: "projects", project, search: `${project.title} ${project.category} ${project.tech.join(" ")} ${project.features.join(" ")}`.toLowerCase() }));
    const all = [...apps, ...projects];
    return normalized ? all.filter((item) => item.search.includes(normalized)) : [...apps.slice(0, 5), ...projects.slice(13, 15)];
  }, [searchQuery, desktopItems, preferences.language]);

  const renderApp = (id) => {
    const apps = {
      about: <AboutApp onOpenProjects={() => openApp("projects")} t={t} />,
      projects: <ProjectsApp selectedProject={selectedProject} setSelectedProject={setSelectedProject} />,
      stack: <StackApp />,
      journey: <JourneyApp />,
      terminal: <TerminalApp openApp={openApp} />,
      editor: <EditorApp item={desktopItems.find((item) => item.id === editorTargetId)} onSave={saveFileContent} t={t} />,
      browser: <BrowserApp onOpenApp={openApp} />,
      resume: <ResumeApp />,
      contact: <ContactApp t={t} />,
      settings: <SettingsApp preferences={preferences} setPreferences={setPreferences} now={now} t={t} />,
      bin: <BinApp deletedItems={deletedItems} onRestore={restoreDesktopItem} onRestoreAll={restoreAllDesktopItems} preferences={preferences} t={t} />,
    };
    return apps[id];
  };

  const handleDesktopContext = (event) => {
    event.preventDefault();
    setContextMenu({ type: "desktop", x: Math.min(event.clientX, window.innerWidth - 210), y: Math.min(event.clientY, window.innerHeight - 220) });
    setStartOpen(false);
    setQuickOpen(false);
  };

  const handleFileContext = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({ type: "file", id, x: Math.min(event.clientX, window.innerWidth - 220), y: Math.min(event.clientY, window.innerHeight - 230) });
    setStartOpen(false);
    setQuickOpen(false);
  };

  return (
    <motion.section
      className={`nkos-desktop wallpaper-${activeWallpaper.id} ${activeWallpaper.image ? "has-wallpaper" : ""} ${focusMode ? "focus-mode" : ""}`}
      style={activeWallpaper.image ? { "--nkos-wallpaper": `url(${activeWallpaper.image})` } : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setContextMenu(null)}
      onContextMenu={handleDesktopContext}
    >
      <header className="nkos-menu-bar">
        <div className="nkos-menu-left">
          <button type="button" className="nkos-brand-button" onClick={() => setStartOpen((value) => !value)} aria-label="Open Nitin OS menu"><span>NK</span></button>
          <b>Nitin OS</b>
          <button type="button" onClick={() => openApp("projects")}>{t("file")}</button>
          <button type="button" onClick={() => openApp("stack")}>{t("system")}</button>
          <button type="button" onClick={() => openApp("contact")}>{t("connect")}</button>
        </div>
        <button type="button" className="nkos-menu-search" onClick={() => setSearchOpen(true)}><FiSearch /><span>{t("search")}</span><kbd>⌘ K</kbd></button>
        <div className="nkos-menu-right">
          <button type="button" aria-label="Notifications" onClick={() => pushNotification("No pending notifications · system is clear")}><FiBell /></button>
          <button type="button" className="nkos-system-tray" onClick={() => setQuickOpen((value) => !value)} aria-label="Open quick settings"><FiWifi /><FiVolume2 /><FiBatteryCharging /></button>
          <button type="button" className="nkos-clock" onClick={() => setQuickOpen((value) => !value)} title={`${formatDate(now, preferences)} · ${preferences.timezone}`}><b>{formatTime(now, preferences)}</b><span>{formatDate(now, { ...preferences, dateStyle: preferences.dateStyle === "long" ? "short" : preferences.dateStyle })}</span></button>
        </div>
      </header>

      <div className="nkos-workspace" ref={workspaceRef}>
        <nav className="nkos-desktop-files" aria-label="Desktop files">
          {appCatalog.filter((app) => !desktopItems.find((item) => item.id === app.id)?.deleted).map((app) => {
            const Icon = app.icon;
            const desktopItem = desktopItems.find((item) => item.id === app.id);
            return (
              <button type="button" key={app.id} onClick={() => openApp(app.id)} onContextMenu={(event) => handleFileContext(event, app.id)} title={`Open ${app.label}`}>
                <span className="nkos-file-icon" style={{ "--app-color": app.color }}><Icon />{app.id === "bin" && deletedItems.length > 0 && <b>{deletedItems.length}</b>}</span>
                <small>{desktopItem?.name || app.file}</small>
              </button>
            );
          })}
        </nav>

        <aside className="nkos-desktop-widgets">
          <div className="nkos-role-widget">
            <div><span className="nkos-live-dot" /> {t("available")}</div>
            <h1>Full Stack<br />Developer</h1>
            <p>React · Next.js · Node.js · AI</p>
          </div>
          <button type="button" className="nkos-featured-widget" onClick={() => openApp("projects", personalDataObj.projects[13])}>
            <img src={personalDataObj.projects[13].img} alt="" />
            <span><small>{t("featured")}</small><b>{personalDataObj.projects[13].title}</b><em>{t("openProject")} <FiArrowUpRight /></em></span>
          </button>
          <div className="nkos-metrics-widget"><span><FiActivity /> {t("systemCapacity")}</span><div><b>15</b><small>{t("projects")}</small></div><div><b>4+</b><small>{t("years")}</small></div><div><b>4</b><small>{t("layers")}</small></div></div>
        </aside>

        <AnimatePresence>
          {openWindows.map((id, index) => {
            const baseApp = appCatalog.find((item) => item.id === id);
            const desktopItem = desktopItems.find((item) => item.id === id);
            const app = baseApp ? { ...baseApp, file: desktopItem?.name || baseApp.file } : null;
            if (!app) return null;
            return (
              <WindowFrame
                key={id}
                app={app}
                active={activeWindow === id}
                index={index}
                minimized={windowState[id]?.minimized}
                maximized={windowState[id]?.maximized}
                compact={compact}
                workspaceRef={workspaceRef}
                onFocus={() => focusApp(id)}
                onClose={() => closeApp(id)}
                onMinimize={() => minimizeApp(id)}
                onMaximize={() => toggleMaximize(id)}
              >
                {renderApp(id)}
              </WindowFrame>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {searchOpen && <SearchPanel query={searchQuery} setQuery={setSearchQuery} results={searchResults} onSelect={(item) => openApp(item.app, item.project)} onClose={() => setSearchOpen(false)} t={t} />}
        {startOpen && <StartMenu onOpen={openApp} onClose={() => setStartOpen(false)} now={now} preferences={preferences} />}
        {quickOpen && <QuickSettings focusMode={focusMode} setFocusMode={setFocusMode} soundOn={soundOn} setSoundOn={setSoundOn} onOpenSettings={() => openApp("settings")} t={t} />}
        {notification && <motion.div className="nkos-notification" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><span><FiCheck /></span><div><b>Nitin OS</b><p>{notification}</p></div><button type="button" onClick={() => setNotification("")} aria-label="Dismiss notification"><FiX /></button></motion.div>}
        {contextMenu && (
          <motion.div className="nkos-context-menu" style={{ left: contextMenu.x, top: contextMenu.y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
            {contextMenu.type === "file" ? (
              <>
                <button type="button" onClick={() => openApp(contextMenu.id)}><FiFolder /> {t("open")}</button>
                {!nonEditableDesktopIds.has(contextMenu.id) && <button type="button" onClick={() => openEditor(contextMenu.id)}><FiEdit3 /> {t("edit")}</button>}
                {!protectedDesktopIds.has(contextMenu.id) && <button type="button" onClick={() => { const item = desktopItems.find((entry) => entry.id === contextMenu.id); setRenameItem({ id: contextMenu.id, value: item?.name || "" }); setContextMenu(null); }}><FiEdit3 /> {t("rename")}</button>}
                {!protectedDesktopIds.has(contextMenu.id) && <button type="button" className="danger" onClick={() => deleteDesktopItem(contextMenu.id)}><FiTrash2 /> {t("delete")}</button>}
              </>
            ) : (
              <>
                <button type="button" onClick={() => openApp("about")}><FiUser /> Open profile</button>
                <button type="button" onClick={() => openApp("terminal")}><FiTerminal /> Open terminal</button>
                <button type="button" onClick={() => openApp("settings")}><FiSettings /> {t("settings")}</button>
                <button type="button" onClick={() => { pushNotification("Desktop refreshed · all files are current"); setContextMenu(null); }}><FiRefreshCw /> Refresh</button>
                <span />
                <button type="button" onClick={onPowerOff}><FiPower /> Power off</button>
              </>
            )}
          </motion.div>
        )}
        {renameItem && <RenameDialog item={renameItem} onChange={setRenameItem} onCancel={() => setRenameItem(null)} onSave={saveRenamedItem} t={t} />}
      </AnimatePresence>

      <nav className="nkos-dock" aria-label="Running apps">
        <button type="button" className={`nkos-launcher ${startOpen ? "active" : ""}`} onClick={() => setStartOpen((value) => !value)} aria-label="Open app launcher"><FiGrid /></button>
        <i />
        {appCatalog.map((app) => {
          const Icon = app.icon;
          const isOpen = openWindows.includes(app.id);
          return (
            <button type="button" key={app.id} className={`${activeWindow === app.id ? "active" : ""} ${isOpen ? "running" : ""}`} onClick={() => openApp(app.id)} title={app.label} aria-label={app.label} style={{ "--app-color": app.color }}>
              <Icon />
              <span>{app.id === "settings" ? t("settings") : app.id === "bin" ? t("recycleBin") : app.label}</span>
            </button>
          );
        })}
        <i />
        <button type="button" onClick={onPowerOff} aria-label="Power off" title="Power off"><FiPower /></button>
      </nav>
    </motion.section>
  );
};

const ComputerPortfolio = () => {
  const [stage, setStage] = useState("power");
  const [bootIndex, setBootIndex] = useState(0);
  const [preferences, setPreferences] = useState(() => ({ ...defaultPreferences, ...loadStoredValue("nkos-preferences", {}) }));
  const now = useClock();

  useEffect(() => {
    window.localStorage.setItem("nkos-preferences", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (stage !== "boot") return undefined;
    setBootIndex(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setBootIndex(index);
      if (index >= bootSteps.length - 1) {
        window.clearInterval(timer);
        window.setTimeout(() => setStage("login"), 650);
      }
    }, 430);
    return () => window.clearInterval(timer);
  }, [stage]);

  return (
    <main className="nkos-root" lang={preferences.language} dir={preferences.language === "ar" ? "rtl" : "ltr"}>
      <AnimatePresence mode="wait">
        {stage === "power" && <PowerScreen key="power" onPower={() => setStage("boot")} />}
        {stage === "boot" && <BootScreen key="boot" bootIndex={bootIndex} onSkip={() => setStage("login")} />}
        {stage === "login" && <LoginScreen key="login" now={now} preferences={preferences} onEnter={() => setStage("desktop")} onPowerOff={() => setStage("power")} />}
        {stage === "desktop" && <Desktop key="desktop" now={now} preferences={preferences} setPreferences={setPreferences} onPowerOff={() => setStage("power")} />}
      </AnimatePresence>
    </main>
  );
};

export default ComputerPortfolio;
