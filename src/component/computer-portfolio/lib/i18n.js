import { personalDataObj } from "../../../data/data";

const translations = {
  en: {
    file: "File", system: "System", connect: "Connect", search: "Search this computer", available: "AVAILABLE", featured: "FEATURED BUILD", openProject: "Open project", systemCapacity: "SYSTEM CAPACITY", projects: "projects", years: "years", layers: "layers",
    settings: "Settings", recycleBin: "Recycle Bin", rename: "Rename", delete: "Move to Recycle Bin", restore: "Restore", restoreAll: "Restore all", emptyBin: "Recycle Bin is empty", quickAccess: "QUICK ACCESS", matched: "MATCHED ON THIS COMPUTER", noResults: "No files or technologies found.",
    controlCenter: "CONTROL CENTER", network: "Network", connected: "Connected", focus: "Focus", sound: "Sound", display: "Display", on: "On", off: "Off", muted: "Muted", allOperational: "All systems operational",
    heroTitle: "I turn product ideas into fast, scalable web software.", heroCopy: personalDataObj.about, contactTitle: "Let’s build something people remember and products can scale on.", openSettings: "Open full settings",
  },
  hi: {
    file: "फाइल", system: "सिस्टम", connect: "संपर्क", search: "इस कंप्यूटर में खोजें", available: "काम के लिए उपलब्ध", featured: "प्रमुख प्रोजेक्ट", openProject: "प्रोजेक्ट खोलें", systemCapacity: "सिस्टम क्षमता", projects: "प्रोजेक्ट", years: "वर्ष", layers: "लेयर",
    settings: "सेटिंग्स", recycleBin: "रीसायकल बिन", rename: "नाम बदलें", delete: "रीसायकल बिन में भेजें", restore: "वापस लाएं", restoreAll: "सभी वापस लाएं", emptyBin: "रीसायकल बिन खाली है", quickAccess: "त्वरित पहुंच", matched: "इस कंप्यूटर में मिले परिणाम", noResults: "कोई फाइल या तकनीक नहीं मिली।",
    controlCenter: "कंट्रोल सेंटर", network: "नेटवर्क", connected: "कनेक्टेड", focus: "फोकस", sound: "आवाज", display: "डिस्प्ले", on: "चालू", off: "बंद", muted: "म्यूट", allOperational: "सभी सिस्टम सही काम कर रहे हैं",
    heroTitle: "मैं प्रोडक्ट आइडिया को तेज और स्केलेबल वेब सॉफ्टवेयर में बदलता हूं।", heroCopy: "मैं 4+ वर्षों के अनुभव वाला फुल स्टैक डेवलपर हूं। React.js, Next.js, Node.js और AI इंटीग्रेशन के साथ आधुनिक, स्केलेबल और उपयोगी प्रोडक्ट बनाता हूं।", contactTitle: "आइए ऐसा प्रोडक्ट बनाएं जिसे लोग याद रखें और जो आसानी से स्केल हो।", openSettings: "पूरी सेटिंग्स खोलें",
  },
  ar: {
    file: "ملف", system: "النظام", connect: "تواصل", search: "ابحث في هذا الكمبيوتر", available: "متاح للعمل", featured: "مشروع مميز", openProject: "افتح المشروع", systemCapacity: "قدرة النظام", projects: "مشاريع", years: "سنوات", layers: "طبقات",
    settings: "الإعدادات", recycleBin: "سلة المحذوفات", rename: "إعادة تسمية", delete: "نقل إلى سلة المحذوفات", restore: "استعادة", restoreAll: "استعادة الكل", emptyBin: "سلة المحذوفات فارغة", quickAccess: "وصول سريع", matched: "نتائج على هذا الكمبيوتر", noResults: "لم يتم العثور على ملفات أو تقنيات.",
    controlCenter: "مركز التحكم", network: "الشبكة", connected: "متصل", focus: "التركيز", sound: "الصوت", display: "الشاشة", on: "تشغيل", off: "إيقاف", muted: "صامت", allOperational: "جميع الأنظمة تعمل",
    heroTitle: "أحوّل أفكار المنتجات إلى برمجيات ويب سريعة وقابلة للتوسع.", heroCopy: "أنا مطور Full Stack بخبرة تزيد عن أربع سنوات في بناء تطبيقات حديثة وقابلة للتوسع باستخدام React وNext.js وNode.js وتكاملات الذكاء الاصطناعي.", contactTitle: "لنبنِ منتجاً يتذكره الناس ويمكنه التوسع بثقة.", openSettings: "فتح الإعدادات الكاملة",
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
  es: { available: "DISPONIBLE", featured: "PROYECTO DESTACADO", allOperational: "Todos los sistemas operativos", heroTitle: "Convierto ideas de producto en software web rápido y escalable.", heroCopy: "Soy desarrollador Full Stack con más de 4 años creando productos modernos con React, Next.js, Node.js e integraciones de IA.", contactTitle: "Construyamos un producto que la gente recuerde y que pueda crecer." },
  fr: { available: "DISPONIBLE", featured: "PROJET VEDETTE", allOperational: "Tous les systèmes sont opérationnels", heroTitle: "Je transforme les idées produit en logiciels web rapides et évolutifs.", heroCopy: "Développeur Full Stack avec plus de 4 ans d’expérience sur React, Next.js, Node.js et les intégrations IA.", contactTitle: "Construisons un produit mémorable, conçu pour évoluer." },
  de: { available: "VERFÜGBAR", featured: "AUSGEWÄHLTES PROJEKT", allOperational: "Alle Systeme betriebsbereit", heroTitle: "Ich verwandle Produktideen in schnelle, skalierbare Websoftware.", heroCopy: "Full-Stack-Entwickler mit über 4 Jahren Erfahrung in React, Next.js, Node.js und KI-Integrationen.", contactTitle: "Lassen Sie uns ein Produkt bauen, das Menschen in Erinnerung bleibt und mitwächst." },
  pt: { available: "DISPONÍVEL", featured: "PROJETO EM DESTAQUE", allOperational: "Todos os sistemas operacionais", heroTitle: "Transformo ideias de produto em software web rápido e escalável.", heroCopy: "Desenvolvedor Full Stack com mais de 4 anos criando produtos com React, Next.js, Node.js e integrações de IA.", contactTitle: "Vamos criar um produto memorável e pronto para crescer." },
  ja: { available: "対応可能", featured: "注目プロジェクト", allOperational: "すべてのシステムが正常です", heroTitle: "プロダクトのアイデアを、高速で拡張可能なWebソフトウェアに変えます。", heroCopy: "React、Next.js、Node.js、AI統合を使ったプロダクト開発に4年以上携わるフルスタック開発者です。", contactTitle: "記憶に残り、成長できるプロダクトを一緒に作りましょう。" },
  ko: { available: "작업 가능", featured: "주요 프로젝트", allOperational: "모든 시스템이 정상 작동 중입니다", heroTitle: "제품 아이디어를 빠르고 확장 가능한 웹 소프트웨어로 만듭니다.", heroCopy: "React, Next.js, Node.js와 AI 통합으로 4년 이상 제품을 개발한 풀스택 개발자입니다.", contactTitle: "사람들이 기억하고 자신 있게 확장할 수 있는 제품을 함께 만들어요." },
  zh: { available: "可接受合作", featured: "精选项目", allOperational: "所有系统运行正常", heroTitle: "我把产品创意转化为快速、可扩展的Web软件。", heroCopy: "我是一名拥有4年以上经验的全栈开发者，专注于React、Next.js、Node.js和AI集成。", contactTitle: "让我们一起打造令人难忘、能够持续扩展的产品。" },
};

export const translate = (language, key) => interfaceTranslations[language]?.[key]
  || contentTranslations[language]?.[key]
  || translations[language]?.[key]
  || interfaceTranslations.en[key]
  || translations.en[key]
  || key;
