import type { Locale } from "./config";
import type { PluralForms } from "./format";

/**
 * Marketing copy in both languages.
 *
 * English is the source of truth for the shape: `Dictionary` is derived from it,
 * so a key added here without a Thai counterpart is a type error rather than a
 * blank space on the page.
 *
 * Only the marketing sections live here. The dashboard is a separate
 * deployment with its own copy, and shipping its strings to someone reading the
 * marketing page would send them a bundle they never use.
 */

const en = {
  nav: {
    home: "Home",
    how: "How it works",
    copiers: "For copiers",
    providers: "For providers",
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    getStarted: "Get started",
    dashboard: "Dashboard",
    openMenu: "Open menu",
    toggleTheme: "Toggle theme",
    language: "Language",
  },

  hero: {
    badge: "MetaTrader 4 & MetaTrader 5 — copy and publish",
    titleLead: "Copy trades from the cloud.",
    titleAccent: "Or get paid to publish them.",
    body: "Connect your MT4 or MT5 account, choose a strategy and set your own risk — no VPS to rent, no EA to install, no terminal left running. Trading your own edge? Apply as a signal provider and earn from every member who copies you.",
    ctaPrimary: "Start copying free",
    ctaSecondary: "Become a signal provider",
    pointTerminal: "Runs while your terminal is closed",
    pointCredentials: "Credentials encrypted, never shown again",
    pointExecution: "Every copy sized, risk-checked and recorded with its own latency",
  },

  console: {
    title: "Copy engine",
    titleIllustrative: "Copy engine — illustrative example",
    copying: "COPYING",
    latency: "Copy latency",
    latencyHint: "master → your account, median of the last 30 days",
    latencyPending: "Illustrative — measured on every real copy",
    copies: "Copies executed",
    copiesHint: "last 30 days",
    copiesPending: "Illustrative — every copy recorded with its result",
    risk: "Risk guard",
    riskValue: "Armed",
    riskHint: "drawdown + lot caps",
    feed: "Copy feed",
    feedIllustrative: "Illustration",
    feedDelayed: "Delayed 24h",
    live: "Live",
    still: "Static",
    chartLabel: "Animated candlestick chart illustrating copied trades",
    previewAlt: "The dashboard as a member sees it",
  },

  marquee: [
    "MetaTrader 4",
    "MetaTrader 5",
    "Hedging accounts",
    "Netting accounts",
    "Forex",
    "Metals",
    "Indices",
    "Broker symbol mapping",
    "Fixed lot",
    "Multiplier",
    "Balance ratio",
    "Risk percent",
  ],

  how: {
    eyebrow: "How it works",
    title: "Three steps, then nothing to maintain",
    description:
      "Your terminal never has to be open. The strategy runs on the provider's side; execution runs on ours.",
    steps: [
      {
        title: "Connect your account",
        body: "Add your MT4 or MT5 login. Credentials are encrypted with AES-256-GCM before they touch the database, and are never displayed again.",
      },
      {
        title: "Pick a strategy and your risk",
        body: "Choose fixed lot, a multiplier, balance ratio or risk percent. Set max lot, max open trades, daily loss and drawdown limits — they are yours, not the provider's.",
      },
      {
        title: "Trades copy themselves",
        body: "The provider's master EA publishes each trade to our servers; our workers place it on your account and keep stops, closes and partial closes in sync.",
      },
    ],
  },

  audiences: {
    eyebrow: "Two sides, one platform",
    title: "Copy a strategy — or become the strategy",
    description:
      "Every member starts as a copier. Members with a track record can apply to publish, and keep trading their own account exactly as before.",
    copierLabel: "For copiers",
    copierTitle: "Follow a strategy on your terms",
    copierBody: "The provider decides what to trade. You decide how much of it reaches your account.",
    copierCta: "Create a free account",
    copierPoints: [
      "MT4 and MT5, hedging or netting accounts",
      "Four lot modes: fixed, multiplier, balance ratio, risk percent",
      "Daily loss and drawdown limits that pause copying automatically",
      "Symbol mapping for broker suffixes such as XAUUSD.a or GOLD",
      "Every copy recorded with latency, provider response and error code",
    ],
    providerLabel: "For signal providers",
    providerTitle: "Turn your trading into income",
    providerBody: "Apply once, get reviewed by our team, then publish strategies members can subscribe to.",
    providerCta: "Apply as a provider",
    providerPoints: [
      "Publish from your own MT4 or MT5 master account",
      "Set a performance fee, a monthly price, or publish for free",
      "Your own signed API key per strategy — revocable, never shared",
      "Subscriber count and strategy performance in one dashboard",
      "Pause a strategy and choose whether open positions stay or close",
    ],
  },

  journey: {
    eyebrow: "Provider program",
    titleLead: "From application to",
    titleAccent: "first subscriber",
    description:
      "Providers keep full control of their strategy. The platform handles distribution, risk enforcement on the copier side, execution and record keeping.",
    stages: [
      {
        title: "Apply",
        body: "Tell us who you trade for, how the strategy works, and what you want to charge. Takes a few minutes.",
      },
      {
        title: "Get reviewed",
        body: "An admin reviews every application. You are told the outcome and, if it is not approved, exactly why — and you can reapply.",
      },
      {
        title: "Connect your master account",
        body: "Register the MT4 or MT5 account you trade from. Each strategy gets its own signed key for its master EA.",
      },
      {
        title: "Publish and earn",
        body: "Your strategy appears in the marketplace. Members subscribe with their own risk settings; your fee applies to each of them.",
      },
    ],
  },

  features: {
    eyebrow: "Built for real money",
    title: "The parts that matter when an order is live",
    description:
      "Copy trading is easy to demo and hard to get right. These are the mechanics that decide whether a copied trade is correct.",
    items: [
      {
        title: "Position mapping that survives edits",
        body: "Each master ticket is mapped to your ticket, so a later stop-loss change or partial close lands on the right position — including MT4's ticket remap on partial close.",
      },
      {
        title: "Risk limits that actually stop trading",
        body: "Daily loss, drawdown, max open trades, max lot and an allowed-symbol list. Breaching a limit pauses copying instead of quietly continuing.",
      },
      {
        title: "Retries that cannot double-open",
        body: "Failed orders retry with exponential backoff, but every retry re-checks live positions first. A duplicate event is rejected by a database constraint, not by hope.",
      },
      {
        title: "Signed master events",
        body: "Trade events require an API key, an HMAC signature over the raw body, a fresh timestamp and a unique event id. A replayed request is refused.",
      },
      {
        title: "Every attempt on the record",
        body: "Copy history stores master and member ticket, both lots and prices, latency, status and error code. HTTP 200 is never treated as a fill.",
      },
      {
        title: "Performance you can audit",
        body: "Equity curve, daily and monthly profit, drawdown, win rate and profit factor — computed from your own copy results, with an empty state until there is data.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Start free, upgrade when you add accounts",
    description:
      "Plans limit how many trading accounts and strategies you run at once. Provider fees are set by each provider and shown before you subscribe.",
    emptyTitle: "Plans are not published yet",
    emptyBody: "Subscription plans appear here once they are configured.",
    popular: "Most popular",
    free: "Free",
    perMonth: "/mo",
    cta: "Get started",
    accounts: { one: "{n} trading account", other: "{n} trading accounts" } as PluralForms,
    strategies: { one: "{n} strategy at a time", other: "{n} strategies at a time" } as PluralForms,
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions worth asking first",
    items: [
      {
        q: "Do I need a VPS or an EA on my computer?",
        a: "No. The strategy runs on the provider's master account and publishes its trades to our servers. Execution on your account happens in our infrastructure, so your terminal can stay closed.",
      },
      {
        q: "Does this work with MT4, or only MT5?",
        a: "Both. The platform is your account's property, not a separate product — an MT5 master can be copied to MT4 members and the other way around. Broker symbol names and lot steps are mapped per account.",
      },
      {
        q: "What happens to my password?",
        a: "It is encrypted with AES-256-GCM before storage, decrypted only in memory when a connection is established, and never logged, returned by the API, or displayed again.",
      },
      {
        q: "Can a provider blow up my account?",
        a: "Your risk settings belong to you. Max lot, max open trades, allowed symbols, daily loss and maximum drawdown are enforced on your side, and copying pauses when a limit is breached.",
      },
      {
        q: "Who can become a signal provider?",
        a: "Any member can apply. Applications are reviewed by an admin, and only approved providers can publish a live strategy. If your application is rejected you are told why and can apply again.",
      },
      {
        q: "How do providers get paid?",
        a: "A provider sets a performance fee, a monthly subscription price, or both — and can publish for free. Members see the terms before subscribing, and provider earnings are recorded per period.",
      },
    ],
  },

  cta: {
    titleLead: "Copy a strategy, or",
    titleAccent: "publish your own",
    body: "Creating an account is free and takes a minute. Connect an MT4 or MT5 account when you are ready — or apply to publish signals and set your own terms.",
    primary: "Create free account",
    secondary: "Apply as a provider",
  },

  footer: {
    blurb:
      "Cloud copy trading for MetaTrader 4 and MetaTrader 5, with a marketplace for members who want to publish their own signals.",
    platform: "Platform",
    linkHow: "How it works",
    linkFeatures: "Features",
    linkPricing: "Pricing",
    linkStatus: "System status",
    providers: "Providers",
    linkProgram: "Provider program",
    linkApply: "Apply",
    linkProviderSignIn: "Provider sign in",
    account: "Account",
    linkCreate: "Create account",
    linkSignIn: "Sign in",
    rights: "All rights reserved.",
    risk: "Trading leveraged products carries a high level of risk and can result in the loss of your capital. Past performance does not guarantee future results.",
  },
};

export type Dictionary = typeof en;

const th: Dictionary = {
  nav: {
    home: "หน้าแรก",
    how: "วิธีใช้งาน",
    copiers: "สำหรับผู้ก๊อป",
    providers: "สำหรับผู้ให้สัญญาณ",
    pricing: "ราคา",
    faq: "คำถามที่พบบ่อย",
    signIn: "เข้าสู่ระบบ",
    getStarted: "เริ่มใช้งาน",
    dashboard: "แดชบอร์ด",
    openMenu: "เปิดเมนู",
    toggleTheme: "สลับธีม",
    language: "ภาษา",
  },

  hero: {
    badge: "MetaTrader 4 และ MetaTrader 5 — ก๊อปและปล่อยสัญญาณ",
    titleLead: "ก๊อปการเทรดจากคลาวด์",
    titleAccent: "หรือปล่อยสัญญาณเพื่อรับรายได้",
    body: "เชื่อมบัญชี MT4 หรือ MT5 ของคุณ เลือกกลยุทธ์ แล้วตั้งความเสี่ยงเอง — ไม่ต้องเช่า VPS ไม่ต้องติดตั้ง EA ไม่ต้องเปิดเทอร์มินัลทิ้งไว้ ถ้าคุณมีระบบเทรดของตัวเอง สมัครเป็นผู้ให้สัญญาณแล้วรับรายได้จากสมาชิกทุกคนที่ก๊อปคุณ",
    ctaPrimary: "เริ่มก๊อปฟรี",
    ctaSecondary: "สมัครเป็นผู้ให้สัญญาณ",
    pointTerminal: "ทำงานต่อแม้ปิดเทอร์มินัลแล้ว",
    pointCredentials: "รหัสผ่านเข้ารหัสไว้ ไม่แสดงซ้ำอีก",
    pointExecution: "ทุกไม้คำนวณขนาด ตรวจความเสี่ยง และบันทึกดีเลย์ของตัวเอง",
  },

  console: {
    title: "ระบบก๊อปเทรด",
    titleIllustrative: "ระบบก๊อปเทรด — ภาพตัวอย่าง",
    copying: "กำลังก๊อป",
    latency: "ดีเลย์การก๊อป",
    latencyHint: "จากบัญชีต้นทาง → บัญชีคุณ ค่ามัธยฐาน 30 วันล่าสุด",
    latencyPending: "ภาพประกอบ — ของจริงบันทึกทุกไม้",
    copies: "จำนวนไม้ที่ก๊อป",
    copiesHint: "30 วันล่าสุด",
    copiesPending: "ภาพประกอบ — ของจริงบันทึกพร้อมผลลัพธ์",
    risk: "ระบบคุมความเสี่ยง",
    riskValue: "พร้อมทำงาน",
    riskHint: "จำกัด drawdown และขนาดล็อต",
    feed: "รายการที่ก๊อป",
    feedIllustrative: "ภาพประกอบ",
    feedDelayed: "หน่วง 24 ชม.",
    live: "สด",
    still: "หยุดนิ่ง",
    chartLabel: "กราฟแท่งเทียนเคลื่อนไหวแสดงตัวอย่างการก๊อปเทรด",
    previewAlt: "หน้าแดชบอร์ดที่สมาชิกเห็นจริง",
  },

  marquee: [
    "MetaTrader 4",
    "MetaTrader 5",
    "บัญชี Hedging",
    "บัญชี Netting",
    "ฟอเร็กซ์",
    "โลหะมีค่า",
    "ดัชนี",
    "แม็ปชื่อสัญลักษณ์ตามโบรกเกอร์",
    "ล็อตคงที่",
    "ตัวคูณล็อต",
    "สัดส่วนตามยอดเงิน",
    "เปอร์เซ็นต์ความเสี่ยง",
  ],

  how: {
    eyebrow: "วิธีใช้งาน",
    title: "แค่สามขั้นตอน จากนั้นไม่ต้องดูแลอะไรอีก",
    description:
      "คุณไม่ต้องเปิดเทอร์มินัลค้างไว้เลย กลยุทธ์ทำงานอยู่ฝั่งผู้ให้สัญญาณ ส่วนการส่งคำสั่งทำงานอยู่ฝั่งเรา",
    steps: [
      {
        title: "เชื่อมบัญชีของคุณ",
        body: "ใส่ล็อกอิน MT4 หรือ MT5 ของคุณ ข้อมูลจะถูกเข้ารหัสด้วย AES-256-GCM ก่อนบันทึกลงฐานข้อมูล และจะไม่ถูกแสดงให้เห็นอีกเลย",
      },
      {
        title: "เลือกกลยุทธ์และความเสี่ยงของคุณ",
        body: "เลือกได้ทั้งล็อตคงที่ ตัวคูณ สัดส่วนตามยอดเงิน หรือเปอร์เซ็นต์ความเสี่ยง ตั้งเพดานล็อต จำนวนออเดอร์ ขาดทุนต่อวัน และ drawdown ได้เอง — ทั้งหมดเป็นของคุณ ไม่ใช่ของผู้ให้สัญญาณ",
      },
      {
        title: "ออเดอร์ก๊อปตัวเอง",
        body: "EA ฝั่งต้นทางส่งทุกออเดอร์มาที่เซิร์ฟเวอร์เรา ระบบของเราจะเปิดคำสั่งในบัญชีคุณ พร้อมซิงก์ทั้ง SL/TP การปิด และการปิดบางส่วนให้ตรงกันตลอด",
      },
    ],
  },

  audiences: {
    eyebrow: "สองบทบาท บนแพลตฟอร์มเดียว",
    title: "จะก๊อปกลยุทธ์ — หรือเป็นเจ้าของกลยุทธ์เองก็ได้",
    description:
      "สมาชิกทุกคนเริ่มจากการเป็นผู้ก๊อป ใครที่มีผลงานสม่ำเสมอสามารถสมัครเป็นผู้ให้สัญญาณได้ โดยยังเทรดบัญชีตัวเองได้เหมือนเดิมทุกอย่าง",
    copierLabel: "สำหรับผู้ก๊อป",
    copierTitle: "ตามกลยุทธ์ในเงื่อนไขที่คุณกำหนดเอง",
    copierBody: "ผู้ให้สัญญาณเป็นคนตัดสินใจว่าจะเทรดอะไร ส่วนคุณเป็นคนกำหนดว่าจะให้เข้าบัญชีคุณมากแค่ไหน",
    copierCta: "สมัครบัญชีฟรี",
    copierPoints: [
      "รองรับทั้ง MT4 และ MT5 ทั้งบัญชี Hedging และ Netting",
      "โหมดล็อต 4 แบบ: คงที่ ตัวคูณ สัดส่วนยอดเงิน และเปอร์เซ็นต์ความเสี่ยง",
      "จำกัดขาดทุนต่อวันและ drawdown โดยหยุดก๊อปให้อัตโนมัติ",
      "แม็ปชื่อสัญลักษณ์ให้ตรงกับโบรกเกอร์ เช่น XAUUSD.a หรือ GOLD",
      "บันทึกทุกการก๊อป พร้อมดีเลย์ คำตอบจากต้นทาง และรหัสข้อผิดพลาด",
    ],
    providerLabel: "สำหรับผู้ให้สัญญาณ",
    providerTitle: "เปลี่ยนการเทรดของคุณให้เป็นรายได้",
    providerBody: "สมัครครั้งเดียว รอทีมงานตรวจสอบ แล้วปล่อยกลยุทธ์ให้สมาชิกมาสมัครติดตามได้เลย",
    providerCta: "สมัครเป็นผู้ให้สัญญาณ",
    providerPoints: [
      "ปล่อยสัญญาณจากบัญชี MT4 หรือ MT5 ของคุณเอง",
      "ตั้งค่าธรรมเนียมตามผลงาน ค่าบริการรายเดือน หรือจะปล่อยฟรีก็ได้",
      "แต่ละกลยุทธ์มี API key ที่เซ็นกำกับของตัวเอง เพิกถอนได้ ไม่ใช้ร่วมกัน",
      "ดูจำนวนผู้ติดตามและผลงานของกลยุทธ์ได้ในแดชบอร์ดเดียว",
      "หยุดกลยุทธ์ได้ พร้อมเลือกว่าจะให้ออเดอร์ที่ค้างอยู่คงไว้หรือปิด",
    ],
  },

  journey: {
    eyebrow: "โครงการผู้ให้สัญญาณ",
    titleLead: "ตั้งแต่วันสมัคร จนถึง",
    titleAccent: "ผู้ติดตามคนแรก",
    description:
      "ผู้ให้สัญญาณยังคุมกลยุทธ์ของตัวเองได้เต็มที่ ส่วนแพลตฟอร์มดูแลเรื่องการกระจายสัญญาณ การบังคับกฎความเสี่ยงฝั่งผู้ก๊อป การส่งคำสั่ง และการเก็บบันทึกทั้งหมด",
    stages: [
      {
        title: "สมัคร",
        body: "บอกเราว่าคุณเทรดให้ใคร กลยุทธ์ทำงานอย่างไร และอยากคิดค่าบริการเท่าไหร่ ใช้เวลาไม่กี่นาที",
      },
      {
        title: "รอตรวจสอบ",
        body: "แอดมินตรวจทุกใบสมัคร เราจะแจ้งผลให้ทราบ และถ้าไม่ผ่านจะบอกเหตุผลชัดเจน พร้อมให้สมัครใหม่ได้",
      },
      {
        title: "เชื่อมบัญชีต้นทาง",
        body: "ลงทะเบียนบัญชี MT4 หรือ MT5 ที่คุณใช้เทรดจริง แต่ละกลยุทธ์จะได้คีย์ที่เซ็นกำกับของตัวเองไว้ใช้กับ EA ต้นทาง",
      },
      {
        title: "ปล่อยสัญญาณและรับรายได้",
        body: "กลยุทธ์ของคุณจะขึ้นในมาร์เก็ตเพลส สมาชิกสมัครติดตามพร้อมตั้งความเสี่ยงของตัวเอง และค่าธรรมเนียมของคุณคิดกับสมาชิกทุกคน",
      },
    ],
  },

  features: {
    eyebrow: "ออกแบบมาเพื่อเงินจริง",
    title: "ส่วนที่สำคัญจริงตอนที่ออเดอร์กำลังวิ่ง",
    description:
      "ระบบก๊อปเทรดทำเดโมให้ดูง่าย แต่ทำให้ถูกต้องยาก นี่คือกลไกที่ตัดสินว่าออเดอร์ที่ก๊อปมานั้นถูกต้องหรือไม่",
    items: [
      {
        title: "การจับคู่ออเดอร์ที่ไม่หลุดแม้มีการแก้ไข",
        body: "ทุกตั๋วจากต้นทางถูกจับคู่กับตั๋วของคุณ การแก้ SL หรือปิดบางส่วนภายหลังจึงลงที่ออเดอร์ที่ถูกต้อง รวมถึงกรณี MT4 เปลี่ยนเลขตั๋วตอนปิดบางส่วนด้วย",
      },
      {
        title: "ลิมิตความเสี่ยงที่หยุดเทรดได้จริง",
        body: "ทั้งขาดทุนต่อวัน drawdown จำนวนออเดอร์ เพดานล็อต และรายการสัญลักษณ์ที่อนุญาต เมื่อชนลิมิตระบบจะหยุดก๊อป ไม่ใช่แอบเทรดต่อเงียบๆ",
      },
      {
        title: "ลองใหม่ได้โดยไม่เปิดซ้ำ",
        body: "ออเดอร์ที่ล้มเหลวจะลองใหม่แบบถอยเวลาเพิ่มขึ้น แต่ทุกครั้งจะเช็คสถานะออเดอร์จริงก่อนเสมอ และอีเวนต์ซ้ำถูกปฏิเสธด้วยเงื่อนไขระดับฐานข้อมูล ไม่ใช่ด้วยการเดา",
      },
      {
        title: "อีเวนต์จากต้นทางมีลายเซ็นกำกับ",
        body: "ทุกอีเวนต์ต้องมี API key ลายเซ็น HMAC ของเนื้อหาดิบ เวลาที่ยังไม่หมดอายุ และรหัสอีเวนต์ที่ไม่ซ้ำ คำขอที่ถูกส่งซ้ำจะถูกปฏิเสธ",
      },
      {
        title: "บันทึกทุกครั้งที่พยายามส่งคำสั่ง",
        body: "ประวัติการก๊อปเก็บทั้งเลขตั๋วต้นทางและของสมาชิก ล็อตและราคาทั้งสองฝั่ง ดีเลย์ สถานะ และรหัสข้อผิดพลาด และไม่เคยถือว่า HTTP 200 คือออเดอร์เข้าแล้ว",
      },
      {
        title: "ผลงานที่ตรวจย้อนหลังได้",
        body: "กราฟการเติบโตของทุน กำไรรายวันและรายเดือน drawdown อัตราชนะ และ profit factor คำนวณจากผลการก๊อปของคุณเอง และแสดงสถานะว่างจนกว่าจะมีข้อมูลจริง",
      },
    ],
  },

  pricing: {
    eyebrow: "ราคา",
    title: "เริ่มฟรี แล้วค่อยอัปเกรดตอนเพิ่มบัญชี",
    description:
      "แพ็กเกจกำหนดว่าคุณใช้บัญชีเทรดและกลยุทธ์พร้อมกันได้กี่รายการ ส่วนค่าธรรมเนียมของผู้ให้สัญญาณแต่ละรายกำหนดเอง และแสดงให้เห็นก่อนสมัครติดตามเสมอ",
    emptyTitle: "ยังไม่มีแพ็กเกจเผยแพร่",
    emptyBody: "แพ็กเกจจะแสดงที่นี่เมื่อตั้งค่าเรียบร้อยแล้ว",
    popular: "ยอดนิยม",
    free: "ฟรี",
    perMonth: "/เดือน",
    cta: "เริ่มใช้งาน",
    accounts: { one: "{n} บัญชีเทรด", other: "{n} บัญชีเทรด" },
    strategies: { one: "{n} กลยุทธ์พร้อมกัน", other: "{n} กลยุทธ์พร้อมกัน" },
  },

  faq: {
    eyebrow: "คำถามที่พบบ่อย",
    title: "คำถามที่ควรถามก่อนเริ่ม",
    items: [
      {
        q: "ต้องมี VPS หรือติดตั้ง EA ในเครื่องไหม?",
        a: "ไม่ต้องครับ กลยุทธ์ทำงานอยู่ที่บัญชีต้นทางของผู้ให้สัญญาณ แล้วส่งออเดอร์มาที่เซิร์ฟเวอร์เรา ส่วนการเปิดคำสั่งในบัญชีคุณเกิดขึ้นบนระบบของเรา คุณจึงปิดเทอร์มินัลได้เลย",
      },
      {
        q: "ใช้กับ MT4 ได้ไหม หรือรองรับแค่ MT5?",
        a: "ได้ทั้งสองอย่างครับ บัญชีต้นทางที่เป็น MT5 ก๊อปไปยังสมาชิกที่ใช้ MT4 ได้ และในทางกลับกันก็ได้เช่นกัน ระบบจะแม็ปชื่อสัญลักษณ์และขั้นล็อตให้ตรงกับแต่ละบัญชี",
      },
      {
        q: "รหัสผ่านของผมจะเป็นอย่างไร?",
        a: "ถูกเข้ารหัสด้วย AES-256-GCM ก่อนบันทึก และถอดรหัสเฉพาะในหน่วยความจำตอนเชื่อมต่อเท่านั้น ไม่มีการเขียนลง log ไม่ส่งกลับผ่าน API และไม่แสดงให้เห็นอีก",
      },
      {
        q: "ผู้ให้สัญญาณทำให้บัญชีผมล้างพอร์ตได้ไหม?",
        a: "การตั้งค่าความเสี่ยงเป็นของคุณ ทั้งเพดานล็อต จำนวนออเดอร์ สัญลักษณ์ที่อนุญาต ขาดทุนต่อวัน และ drawdown สูงสุด ถูกบังคับใช้ที่ฝั่งคุณ และระบบจะหยุดก๊อปทันทีเมื่อชนลิมิต",
      },
      {
        q: "ใครสมัครเป็นผู้ให้สัญญาณได้บ้าง?",
        a: "สมาชิกทุกคนสมัครได้ ใบสมัครจะถูกตรวจโดยแอดมิน และเฉพาะผู้ที่ผ่านการอนุมัติเท่านั้นที่ปล่อยกลยุทธ์จริงได้ ถ้าไม่ผ่านเราจะแจ้งเหตุผลและสมัครใหม่ได้",
      },
      {
        q: "ผู้ให้สัญญาณได้รับเงินอย่างไร?",
        a: "ผู้ให้สัญญาณตั้งได้ทั้งค่าธรรมเนียมตามผลงาน ค่าบริการรายเดือน หรือทั้งสองอย่าง และจะปล่อยฟรีก็ได้ สมาชิกเห็นเงื่อนไขก่อนสมัครติดตาม และรายได้ถูกบันทึกแยกตามรอบ",
      },
    ],
  },

  cta: {
    titleLead: "ก๊อปกลยุทธ์ของคนอื่น หรือ",
    titleAccent: "ปล่อยกลยุทธ์ของคุณเอง",
    body: "สมัครบัญชีฟรีและใช้เวลาไม่ถึงนาที เชื่อมบัญชี MT4 หรือ MT5 ตอนไหนก็ได้เมื่อคุณพร้อม — หรือจะสมัครเป็นผู้ให้สัญญาณแล้วกำหนดเงื่อนไขเองก็ได้",
    primary: "สมัครบัญชีฟรี",
    secondary: "สมัครเป็นผู้ให้สัญญาณ",
  },

  footer: {
    blurb:
      "ระบบก๊อปเทรดบนคลาวด์สำหรับ MetaTrader 4 และ MetaTrader 5 พร้อมมาร์เก็ตเพลสสำหรับสมาชิกที่อยากปล่อยสัญญาณของตัวเอง",
    platform: "แพลตฟอร์ม",
    linkHow: "วิธีใช้งาน",
    linkFeatures: "ความสามารถ",
    linkPricing: "ราคา",
    linkStatus: "สถานะระบบ",
    providers: "ผู้ให้สัญญาณ",
    linkProgram: "โครงการผู้ให้สัญญาณ",
    linkApply: "สมัคร",
    linkProviderSignIn: "เข้าสู่ระบบผู้ให้สัญญาณ",
    account: "บัญชี",
    linkCreate: "สมัครบัญชี",
    linkSignIn: "เข้าสู่ระบบ",
    rights: "สงวนลิขสิทธิ์",
    risk: "การเทรดผลิตภัณฑ์ที่มีเลเวอเรจมีความเสี่ยงสูงและอาจทำให้สูญเสียเงินลงทุนทั้งหมด ผลงานในอดีตไม่ได้รับประกันผลลัพธ์ในอนาคต",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, th };
