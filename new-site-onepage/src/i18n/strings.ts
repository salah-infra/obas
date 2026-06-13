export type Strings = {
  dir: 'ltr' | 'rtl'
  nav: { capabilities: string; solutions: string; work: string; about: string; cta: string; langLabel: string; langHref: string }
  hero: { eyebrow: string; titleA: string; titleGrad: string; sub: string; ctaPrimary: string; ctaGhost: string; trust: string[] }
  bot: { eyebrow: string; title: string; steps: { word: string; note: string }[] }
  dragonise: { label: string; stages: string[] }
  capabilities: { eyebrow: string; title: string; items: { title: string; body: string }[] }
  solutions: { title: string; tabs: { id: string; label: string; heading: string; body: string }[] }
  work: { title: string; items: { eyebrow: string; title: string; img: string }[] }
  about: { title: string; metrics: { value: number; label: string }[]; cards: { title: string; body: string }[] }
  contact: { titleA: string; titleGrad: string; namePh: string; orgPh: string; emailPh: string; msgPh: string; submit: string }
}

export const en: Strings = {
  dir: 'ltr',
  nav: {
    capabilities: 'Capabilities',
    solutions: 'Solutions',
    work: 'Work',
    about: 'About',
    cta: 'Book a briefing',
    langLabel: 'عربي',
    langHref: '/ar',
  },
  hero: {
    eyebrow: 'Technology · Innovation · Development · Consulting',
    titleA: 'Driving',
    titleGrad: 'Digital Impact',
    sub: 'We don’t just guide transformation. We build it, operate it, and transfer a proven, scalable system.',
    ctaPrimary: 'Book a briefing',
    ctaGhost: 'Our model',
    trust: ['Government', 'FinTech', 'Telecom', 'Energy', 'Enterprise'],
  },
  bot: {
    eyebrow: 'Transformation, done right',
    title: 'BUILD · OPERATE · TRANSFER',
    steps: [
      { word: 'Build', note: 'with excellence' },
      { word: 'Operate', note: 'with accountability' },
      { word: 'Transform', note: 'across the organization' },
      { word: 'Transfer', note: 'a proven model' },
    ],
  },
  dragonise: {
    label: 'The DRAGONISE engagement model',
    stages: ['Design', 'Build', 'Transform', 'Operate (BOT)', 'Transfer'],
  },
  capabilities: {
    eyebrow: 'What we do',
    title: 'From strategy to working systems',
    items: [
      { title: 'Technology development', body: 'Custom platforms and scalable systems, built for real use.' },
      { title: 'Advisory & consulting', body: 'Strategic decisions aligned with execution realities.' },
      { title: 'AI', body: 'From concept to real business impact.' },
      { title: 'Innovation', body: 'New models, new revenues, new experiences.' },
      { title: 'Process restructuring', body: 'Fixing what actually slows the organization down.' },
      { title: 'BOT execution', body: 'We take ownership, not just responsibility.' },
    ],
  },
  solutions: {
    title: 'Solutions by industry',
    tabs: [
      {
        id: 'gov',
        label: 'Government',
        heading: 'Governmental transformation',
        body: 'Seamless citizen journeys, integrated digital platforms, data-driven governance, and operational excellence — delivered at national scale.',
      },
      {
        id: 'fin',
        label: 'Financial Services & FinTech',
        heading: 'Digital financial platforms',
        body: 'Digital wallets, payments & collection, ecosystem integrations, and scalable architecture that is secure, scalable, and customer-centric.',
      },
      {
        id: 'tel',
        label: 'Telecom & Digital Infrastructure',
        heading: 'Telecom & digital infrastructure',
        body: 'High-volume, real-time platforms and integration layers engineered for reliability and continuous service delivery.',
      },
      {
        id: 'enr',
        label: 'Energy & Utilities',
        heading: 'Energy & utilities',
        body: 'Operational digitalization, monitoring, and data-driven control for critical infrastructure environments.',
      },
      {
        id: 'ent',
        label: 'Enterprise & Industry',
        heading: 'Enterprise & industry',
        body: 'AI-driven decisions, process automation, and enhanced customer experiences — performance at scale, with governance built in.',
      },
    ],
  },
  work: {
    title: 'Proof points',
    items: [
      { eyebrow: 'Umrah sector · digital ecosystem', title: 'Qaboul Ya Haj & Way to Umrah', img: '/img/story-qaboul.jpg' },
      { eyebrow: 'Saudi Arabia · since 1994', title: 'National Hospitality Security Platform', img: '/img/story-security.jpg' },
      { eyebrow: 'Government booking ecosystem', title: 'MAQAM — Umrah Hospitality & Transport', img: '/img/story-maqam.jpg' },
      { eyebrow: 'FinTech · digital wallets', title: 'Digital Wallet & FinTech Ecosystem', img: '/img/story-wallet.jpg' },
    ],
  },
  about: {
    title: 'Why OBAS',
    metrics: [
      { value: 1994, label: 'National hospitality security platform live since' },
      { value: 3, label: 'National Hajj & Umrah ecosystems delivered' },
      { value: 5, label: 'Regulated sectors served end-to-end' },
    ],
    cards: [
      { title: 'Strategy execution', body: 'We turn strategy into working systems.' },
      { title: 'Built for regulated sectors', body: 'Governance and compliance are first-class.' },
      { title: 'Operate what we build', body: 'We don’t walk away — we run what we deliver.' },
      { title: 'Hybrid experience', body: 'Business, technology, and operations under one roof.' },
      { title: 'Speed with structure', body: 'Agile execution backed by governance.' },
      { title: 'One integrated model', body: 'A single accountable partner end-to-end.' },
    ],
  },
  contact: {
    titleA: 'Let’s build what others ',
    titleGrad: 'only plan.',
    namePh: 'Your full name',
    orgPh: 'Company or entity',
    emailPh: 'you@organization.com',
    msgPh: 'What are you trying to transform?',
    submit: 'Book a briefing',
  },
}

export const ar: Strings = {
  dir: 'rtl',
  nav: {
    capabilities: 'القدرات',
    solutions: 'الحلول',
    work: 'أعمالنا',
    about: 'من نحن',
    cta: 'احجز جلسة',
    langLabel: 'EN',
    langHref: '/',
  },
  hero: {
    eyebrow: 'تقنية · ابتكار · تطوير · استشارات',
    titleA: 'نصنع',
    titleGrad: 'الأثر الرقمي',
    sub: 'تجمع OBAS الاستشارات الاستراتيجية وتطوير التقنية والابتكار المدعوم بالذكاء الاصطناعي والتنفيذ التشغيلي في نموذج واحد مسؤول. وبينما تتوقف معظم الشركات عند الاستراتيجية ويتوقف المورّدون عند التسليم، نُغلق نحن الدائرة كاملةً — نبني الحل ونُشغّله ونُسلّم نظاماً مُثبتاً وقابلاً للتوسّع.',
    ctaPrimary: 'احجز جلسة تحوّل',
    ctaGhost: 'شاهد النتائج',
    trust: ['الحكومة', 'التقنية المالية', 'الاتصالات', 'الطاقة', 'المؤسسات'],
  },
  bot: {
    eyebrow: 'التحوّل كما يجب أن يكون',
    title: 'نبني · نُشغّل · نُسلّم',
    steps: [
      { word: 'نبني', note: 'بإتقان' },
      { word: 'نُشغّل', note: 'بمسؤولية' },
      { word: 'نُحوّل', note: 'عبر المؤسسة' },
      { word: 'نُسلّم', note: 'نموذجاً مُثبتاً' },
    ],
  },
  dragonise: {
    label: 'نموذج DRAGONISE للتعامل',
    stages: ['تصميم', 'بناء', 'تحوّل', 'تشغيل (BOT)', 'تسليم'],
  },
  capabilities: {
    eyebrow: 'ما نفعله',
    title: 'من الاستراتيجية إلى أنظمة تعمل فعلاً',
    items: [
      { title: 'تطوير التقنية', body: 'منصّات وأنظمة قابلة للتوسّع، مبنية للاستخدام الحقيقي.' },
      { title: 'الاستشارات', body: 'قرارات استراتيجية متوائمة مع واقع التنفيذ.' },
      { title: 'الذكاء الاصطناعي', body: 'من الفكرة إلى أثرٍ حقيقي في الأعمال.' },
      { title: 'الابتكار', body: 'نماذج جديدة، وإيرادات جديدة، وتجارب جديدة.' },
      { title: 'إعادة هيكلة العمليات', body: 'معالجة ما يُبطئ المؤسسة فعلاً.' },
      { title: 'تنفيذ BOT', body: 'نتحمّل الملكية، لا المسؤولية فقط.' },
    ],
  },
  solutions: {
    title: 'حلول حسب القطاع',
    tabs: [
      {
        id: 'gov',
        label: 'الحكومة',
        heading: 'التحوّل الحكومي',
        body: 'رحلات مواطن سلسة، ومنصّات رقمية متكاملة، وحوكمة قائمة على البيانات، وتميّز تشغيلي — على نطاق وطني.',
      },
      {
        id: 'fin',
        label: 'الخدمات المالية والتقنية المالية',
        heading: 'المنصّات المالية الرقمية',
        body: 'محافظ رقمية، ومدفوعات وتحصيل، وتكاملات منظومية، وبنية قابلة للتوسّع وآمنة ومتمحورة حول العميل.',
      },
      {
        id: 'tel',
        label: 'الاتصالات والبنية الرقمية',
        heading: 'الاتصالات والبنية الرقمية',
        body: 'منصّات فورية عالية الحجم وطبقات تكامل مصمّمة للموثوقية واستمرارية الخدمة.',
      },
      {
        id: 'enr',
        label: 'الطاقة والمرافق',
        heading: 'الطاقة والمرافق',
        body: 'رقمنة تشغيلية، ومراقبة، وتحكّم قائم على البيانات للبنى التحتية الحرجة.',
      },
      {
        id: 'ent',
        label: 'المؤسسات والصناعة',
        heading: 'المؤسسات والصناعة',
        body: 'قرارات مدعومة بالذكاء الاصطناعي، وأتمتة العمليات، وتجارب عملاء مُحسّنة — أداء على نطاق واسع مع حوكمة مدمجة.',
      },
    ],
  },
  work: {
    title: 'قصص نجاح',
    items: [
      { eyebrow: 'قطاع العمرة · منظومة رقمية', title: 'قبول يا حاج & طريقك للعمرة', img: '/img/story-qaboul.jpg' },
      { eyebrow: 'السعودية · منذ 1994', title: 'منصّة أمن الضيافة الوطنية', img: '/img/story-security.jpg' },
      { eyebrow: 'منظومة حجز حكومية', title: 'مقام — ضيافة ونقل العمرة', img: '/img/story-maqam.jpg' },
      { eyebrow: 'تقنية مالية · محافظ رقمية', title: 'منظومة المحفظة الرقمية والتقنية المالية', img: '/img/story-wallet.jpg' },
    ],
  },
  about: {
    title: 'لماذا OBAS',
    metrics: [
      { value: 1994, label: 'منصّة أمن الضيافة الوطنية تعمل منذ عام' },
      { value: 3, label: 'منظومات حج وعمرة رقمية وطنية' },
      { value: 5, label: 'قطاعات خاضعة للتنظيم نخدمها من البداية للنهاية' },
    ],
    cards: [
      { title: 'تنفيذ الاستراتيجية', body: 'نحوّل الاستراتيجية إلى أنظمة تعمل.' },
      { title: 'مبني للقطاعات المنظَّمة', body: 'الحوكمة والامتثال أولوية أساسية.' },
      { title: 'نُشغّل ما نبنيه', body: 'لا ننسحب — بل نُشغّل ما نُسلّمه.' },
      { title: 'خبرة هجينة', body: 'الأعمال والتقنية والعمليات تحت سقفٍ واحد.' },
      { title: 'سرعة بانضباط', body: 'تنفيذ مرن مدعوم بالحوكمة.' },
      { title: 'نموذج متكامل واحد', body: 'شريك واحد مسؤول من البداية إلى النهاية.' },
    ],
  },
  contact: {
    titleA: 'لنبنِ ما يكتفي الآخرون ',
    titleGrad: 'بالتخطيط له',
    namePh: 'اسمك الكامل',
    orgPh: 'الشركة أو الجهة',
    emailPh: 'you@organization.com',
    msgPh: 'ما الذي تسعى لتحويله؟',
    submit: 'أرسل الطلب',
  },
}
