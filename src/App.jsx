import React, { useMemo, useState } from "react";

const PALETTE = {
  bg: "#FCFAF2",
  paper: "#FFFDF8",
  ink: "#1E1B18",
  inkSoft: "#3B352E",
  muted: "#6C665E",
  line: "#D8D0C2",
  teal: "#2E5C6E",
  plum: "#622954",
  rust: "#A45A3D",
  gold: "#B88B4A",
  olive: "#6C7450",
  rose: "#A5626D",
  blue: "#557A95",
  green: "#2F6A55",
  red: "#A1462C",
  uber: "#111111",
  didi: "#FF6A2A",
  tencent: "#1976D2",
  alibaba: "#F57C00",
  baidu: "#C43C35",
  wechat: "#2DBE60",
  alipay: "#1677FF",
};

const ICON_PATHS = {
  globe: ["M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.6 0 3.1 2 4 5H8c.9-3 2.4-5 4-5zm-6 7H2.6a8 8 0 000 2H6a18 18 0 010-2zm10 0a18 18 0 010 2h3.4a8 8 0 000-2H16zm-8 4h8c-.9 3-2.4 5-4 5s-3.1-2-4-5zm-2 0a18 18 0 010 2H2.6a8 8 0 000-2H6zm10 0h3.4a8 8 0 01-2.2 4.4A12.7 12.7 0 0016 13z"],
  layers: ["M12 2l9 4.5-9 4.5-9-4.5L12 2zm-7.8 8.4L12 14.3l7.8-3.9M4.2 15.1L12 19l7.8-3.9"],
  book: ["M5 4.5A2.5 2.5 0 017.5 2H20v17H7.5A2.5 2.5 0 005 21V4.5zm0 0V19"],
  chart: ["M4 19h16M7 16V9M12 16V5M17 16v-3"],
  warning: ["M12 3l9 16H3L12 3zm0 5v4m0 4h.01"],
  bolt: ["M13 2L4 14h6l-1 8 9-12h-6l1-8z"],
  shield: ["M12 3l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6l7-3z"],
  route: ["M7 7a2 2 0 110-4 2 2 0 010 4zm10 14a2 2 0 110-4 2 2 0 010 4zM7 5c0 7 10 2 10 9"],
  users: ["M16 11a3 3 0 100-6 3 3 0 000 6zM8 13a3 3 0 100-6 3 3 0 000 6zm8 8v-1a4 4 0 00-4-4h-1a4 4 0 00-4 4v1m13 0v-1a4 4 0 00-3-3.9"],
  map: ["M3 6l6-2 6 2 6-2v12l-6 2-6-2-6 2V6zm6-2v12m6-10v12"],
  scales: ["M12 4v16M7 7h10M5 7l-3 5h6L5 7zm14 0l-3 5h6l-3-5zM8 20h8"],
  dollar: ["M12 3v18m4-14a3 3 0 00-3-2H11a3 3 0 000 6h2a3 3 0 010 6H11a3 3 0 01-3-2"],
  clock: ["M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"],
  menu: ["M4 7h16M4 12h16M4 17h16"],
  target: ["M12 5v14M5 12h14M12 8a4 4 0 100 8 4 4 0 000-8zm0-5a9 9 0 100 18 9 9 0 000-18z"],
  spark: ["M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"],
};

function Icon({ name, size = 18, stroke = 1.8, color = "currentColor", className = "" }) {
  const paths = ICON_PATHS[name] || [];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, idx) => (
        <path d={d} key={`${name}-${idx}`} />
      ))}
    </svg>
  );
}

function T({ mode, en, zh, as = "span", className = "" }) {
  const Tag = as;
  if (mode === "en") return <Tag className={className}>{en}</Tag>;
  if (mode === "zh") return <Tag className={className}>{zh}</Tag>;
  return (
    <Tag className={`${className} bilingual-copy`}>
      <span className="lang-en">{en}</span>
      <span className="lang-zh">{zh}</span>
    </Tag>
  );
}

function SectionHeading({ mode, id, icon, eyebrowEn, eyebrowZh, titleEn, titleZh, introEn, introZh }) {
  return (
    <div className="section-heading" id={id}>
      <div className="section-kicker">
        <Icon name={icon} size={16} color={PALETTE.teal} />
        <T mode={mode} as="span" en={eyebrowEn} zh={eyebrowZh} />
      </div>
      <T mode={mode} as="h2" className="section-title" en={titleEn} zh={titleZh} />
      {(introEn || introZh) && <T mode={mode} as="p" className="section-intro" en={introEn} zh={introZh} />}
    </div>
  );
}

function BrandChip({ label, tone, sublabel }) {
  const styles = {
    uber: { background: "#111111", color: "#ffffff", border: "#111111" },
    didi: { background: "#FFF2EC", color: PALETTE.didi, border: "#FFD3BF" },
    tencent: { background: "#EEF5FF", color: PALETTE.tencent, border: "#CFE3FF" },
    alibaba: { background: "#FFF4E6", color: PALETTE.alibaba, border: "#FFD9A8" },
    baidu: { background: "#FFF0EF", color: PALETTE.baidu, border: "#F0C2BE" },
    wechat: { background: "#F0FFF4", color: PALETTE.wechat, border: "#C9F1D6" },
    alipay: { background: "#EFF7FF", color: PALETTE.alipay, border: "#C8E0FF" },
    neutral: { background: PALETTE.paper, color: PALETTE.inkSoft, border: PALETTE.line },
  };
  const style = styles[tone] || styles.neutral;
  return (
    <div className="brand-chip" style={{ background: style.background, color: style.color, borderColor: style.border }}>
      <strong>{label}</strong>
      {sublabel ? <span>{sublabel}</span> : null}
    </div>
  );
}

function QualBar({ value, color }) {
  return (
    <div className="qual-bar">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ background: n <= value ? color : "#E6DED1" }} />
      ))}
    </div>
  );
}

function RevenueChart({ mode }) {
  const data = [
    { year: 2014, value: 0.4 },
    { year: 2015, value: 1.7 },
    { year: 2016, value: 5.0 },
    { year: 2017, value: 7.9 },
    { year: 2018, value: 11.3 },
    { year: 2019, value: 14.1 },
    { year: 2020, value: 11.1 },
    { year: 2021, value: 17.4 },
    { year: 2022, value: 31.8 },
  ];
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="figure-card">
      <div className="figure-head">
        <T mode={mode} as="h3" en="Uber revenue after the China exit" zh="退出大陸營運後的 Uber 營收走勢" />
        <T
          mode={mode}
          as="p"
          en="This is total company revenue, not mainland mobility revenue alone. It matters because it weakens the claim that direct operating control of the mainland market was necessary for survival."
          zh="這是 Uber 全公司營收，不是大陸地區 mobility 單一業務。重點在於，它削弱了「必須直接控制大陸市場才能存活」這個說法。"
        />
      </div>
      <svg viewBox="0 0 740 280" className="revenue-svg" role="img" aria-label="Uber revenue 2014 to 2022">
        <rect x="0" y="0" width="740" height="280" fill="transparent" />
        {[0, 8, 16, 24, 32].map((tick, idx) => {
          const y = 240 - (tick / 32) * 190;
          return (
            <g key={idx}>
              <line x1="56" x2="720" y1={y} y2={y} stroke="#E4DBCC" strokeWidth="1" />
              <text x="42" y={y + 4} fontSize="12" textAnchor="end" fill={PALETTE.muted}>
                {tick}
              </text>
            </g>
          );
        })}
        {data.map((d, idx) => {
          const barW = 52;
          const gap = 18;
          const x = 70 + idx * (barW + gap);
          const h = (d.value / max) * 190;
          const y = 240 - h;
          return (
            <g key={d.year}>
              <rect x={x} y={y} width={barW} height={h} rx="8" fill={idx === data.length - 1 ? PALETTE.plum : PALETTE.teal} opacity={idx === data.length - 1 ? 0.96 : 0.85} />
              <text x={x + barW / 2} y={258} fontSize="12" textAnchor="middle" fill={PALETTE.muted}>
                {String(d.year).slice(2)}
              </text>
              <text x={x + barW / 2} y={y - 8} fontSize="12" textAnchor="middle" fill={PALETTE.inkSoft}>
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="source-note">
        <T mode={mode} en="Source: More Uber Background, p. 1." zh="資料來源：More Uber Background，第 1 頁。" />
      </p>
    </div>
  );
}

function CityNetworkFigure({ mode }) {
  return (
    <div className="figure-card">
      <div className="figure-head">
        <T mode={mode} as="h3" en="Why global scale did not automatically solve the mainland fight" zh="為甚麼全球規模不會自動解決大陸戰場" />
        <T
          mode={mode}
          as="p"
          en="Ride hailing network effects are local. A rider in Chengdu needs nearby drivers in Chengdu. Global brand, capital, and software matter, but they do not eliminate the need to rebuild density city by city."
          zh="叫車平臺的網路效應是地方性的。成都乘客需要的是成都附近的司機。全球品牌、資本與軟體當然重要，但它們無法取代逐城重建密度這件事。"
        />
      </div>
      <svg viewBox="0 0 740 280" className="network-svg" role="img" aria-label="Local network effects diagram">
        <rect x="0" y="0" width="740" height="280" fill="transparent" />
        <rect x="36" y="70" width="170" height="140" rx="22" fill="#F7F2E7" stroke={PALETTE.line} />
        <text x="121" y="102" textAnchor="middle" fontSize="18" fontWeight="700" fill={PALETTE.ink}>Uber global</text>
        <text x="121" y="130" textAnchor="middle" fontSize="14" fill={PALETTE.muted}>capital</text>
        <text x="121" y="150" textAnchor="middle" fontSize="14" fill={PALETTE.muted}>software</text>
        <text x="121" y="170" textAnchor="middle" fontSize="14" fill={PALETTE.muted}>brand</text>
        <text x="121" y="190" textAnchor="middle" fontSize="14" fill={PALETTE.muted}>playbook</text>
        {[
          { city: "Beijing", x: 330, y: 70 },
          { city: "Shanghai", x: 500, y: 48 },
          { city: "Chengdu", x: 330, y: 162 },
          { city: "Guangzhou", x: 520, y: 164 },
        ].map((c) => (
          <g key={c.city}>
            <line x1="206" y1="140" x2={c.x} y2={c.y + 30} stroke="#C9BFAE" strokeWidth="2" strokeDasharray="6 6" />
            <rect x={c.x} y={c.y} width="168" height="76" rx="20" fill="#FFFDF8" stroke={PALETTE.line} />
            <text x={c.x + 16} y={c.y + 24} fontSize="16" fontWeight="700" fill={PALETTE.ink}>{c.city}</text>
            <circle cx={c.x + 28} cy={c.y + 48} r="10" fill={PALETTE.teal} opacity="0.9" />
            <circle cx={c.x + 54} cy={c.y + 48} r="10" fill={PALETTE.teal} opacity="0.65" />
            <circle cx={c.x + 108} cy={c.y + 48} r="10" fill={PALETTE.plum} opacity="0.85" />
            <circle cx={c.x + 134} cy={c.y + 48} r="10" fill={PALETTE.plum} opacity="0.65" />
            <text x={c.x + 72} y={c.y + 53} fontSize="12" fill={PALETTE.muted}>riders ⇄ drivers</text>
          </g>
        ))}
      </svg>
      <p className="source-note">
        <T
          mode={mode}
          en="Interpretive figure based on the HBS case and Boudreau's platform competition and value capture notes."
          zh="此圖為依據 HBS 個案與 Boudreau 平臺競爭、價值擷取講義所做的解釋型圖示。"
        />
      </p>
    </div>
  );
}


function BattlefieldAtlas({ mode }) {
  const [layer, setLayer] = useState("all");
  const [focus, setFocus] = useState("didi");

  const layerOptions = [
    { key: "all", en: "All channels", zh: "全部通道" },
    { key: "capital", en: "Capital", zh: "資本" },
    { key: "distribution", en: "Social distribution", zh: "社交流量" },
    { key: "payments", en: "Payments", zh: "支付" },
    { key: "maps", en: "Maps and search", zh: "地圖與搜尋" },
    { key: "regulation", en: "Regulation", zh: "監管" },
    { key: "alliances", en: "Alliances", zh: "聯盟" },
  ];

  const focusOptions = [
    { key: "uber", en: "Uber", zh: "Uber" },
    { key: "didi", en: "Didi-Kuaidi", zh: "滴滴快的" },
    { key: "tencent", en: "Tencent", zh: "騰訊" },
    { key: "alibaba", en: "Alibaba", zh: "阿里巴巴" },
    { key: "baidu", en: "Baidu", zh: "百度" },
  ];

  const nodes = {
    baidu: { x: 54, y: 56, w: 132, h: 52, tone: "baidu", labelEn: "Baidu", labelZh: "百度", subEn: "capital + search ally", subZh: "資本與搜尋盟友" },
    baidumaps: { x: 54, y: 132, w: 132, h: 52, tone: "baidu", labelEn: "Baidu Maps", labelZh: "百度地圖", subEn: "map layer", subZh: "地圖層" },
    uber: { x: 134, y: 248, w: 148, h: 58, tone: "uber", labelEn: "Uber", labelZh: "Uber", subEn: "global entrant", subZh: "全球進入者" },
    tencent: { x: 426, y: 56, w: 132, h: 52, tone: "tencent", labelEn: "Tencent", labelZh: "騰訊", subEn: "capital + platform power", subZh: "資本與平臺力量" },
    wechat: { x: 426, y: 132, w: 132, h: 52, tone: "wechat", labelEn: "WeChat", labelZh: "微信", subEn: "social distribution", subZh: "社交流量分發" },
    alibaba: { x: 616, y: 56, w: 132, h: 52, tone: "alibaba", labelEn: "Alibaba", labelZh: "阿里巴巴", subEn: "capital + commerce", subZh: "資本與電商" },
    alipay: { x: 616, y: 132, w: 132, h: 52, tone: "alipay", labelEn: "Alipay", labelZh: "支付寶", subEn: "payment rail", subZh: "支付通道" },
    didi: { x: 500, y: 248, w: 174, h: 58, tone: "didi", labelEn: "Didi-Kuaidi", labelZh: "滴滴快的", subEn: "local platform bloc", subZh: "本地平臺集團" },
    gov: { x: 292, y: 356, w: 200, h: 58, tone: "neutral", labelEn: "Local governments + taxi system", labelZh: "地方政府與計程車體系", subEn: "permits, enforcement, incumbency", subZh: "許可、執法、在位優勢" },
    alliance: { x: 556, y: 356, w: 192, h: 58, tone: "neutral", labelEn: "Lyft / Ola / Grab alliance", labelZh: "Lyft / Ola / Grab 聯盟", subEn: "external containment", subZh: "外部圍堵" },
  };

  const toneFill = {
    uber: PALETTE.uber,
    didi: PALETTE.didi,
    tencent: PALETTE.tencent,
    alibaba: PALETTE.alibaba,
    baidu: PALETTE.baidu,
    wechat: PALETTE.wechat,
    alipay: PALETTE.alipay,
    neutral: PALETTE.teal,
  };

  const nodeCenters = Object.fromEntries(
    Object.entries(nodes).map(([key, n]) => [key, { x: n.x + n.w / 2, y: n.y + n.h / 2 }])
  );

  const layerColors = {
    rivalry: PALETTE.inkSoft,
    capital: PALETTE.plum,
    distribution: PALETTE.green,
    payments: PALETTE.blue,
    maps: PALETTE.rust,
    regulation: PALETTE.red,
    alliances: PALETTE.gold,
  };

  const edges = [
    { from: "uber", to: "didi", type: "rivalry", labelEn: "core ride-hailing war", labelZh: "叫車主戰場", lx: 382, ly: 234, curveX: 0, curveY: -72 },
    { from: "baidu", to: "uber", type: "capital", labelEn: "$600M investment", labelZh: "6 億美元投資", lx: 140, ly: 198, curveX: 22, curveY: 46 },
    { from: "tencent", to: "didi", type: "capital", labelEn: "backing + reach", labelZh: "投資與流量", lx: 492, ly: 200, curveX: -8, curveY: 42 },
    { from: "alibaba", to: "didi", type: "capital", labelEn: "Kuaidi side backing", labelZh: "快的一側資本", lx: 668, ly: 204, curveX: -10, curveY: 48 },
    { from: "wechat", to: "didi", type: "distribution", labelEn: "native distribution", labelZh: "原生社交流量", lx: 486, ly: 236, curveX: 4, curveY: 36 },
    { from: "wechat", to: "uber", type: "distribution", labelEn: "blocked Uber accounts", labelZh: "封鎖 Uber 帳號", lx: 308, ly: 168, curveX: -86, curveY: -26, negative: true },
    { from: "alipay", to: "didi", type: "payments", labelEn: "payment convenience", labelZh: "支付便利", lx: 630, ly: 236, curveX: -18, curveY: 32 },
    { from: "alipay", to: "uber", type: "payments", labelEn: "Uber added it", labelZh: "Uber 後來接入", lx: 366, ly: 128, curveX: -138, curveY: -74, dashed: true },
    { from: "baidumaps", to: "uber", type: "maps", labelEn: "critical local map fix", labelZh: "修補地圖弱點", lx: 140, ly: 220, curveX: 12, curveY: 24 },
    { from: "baidumaps", to: "didi", type: "maps", labelEn: "available to locals too", labelZh: "本地對手也可用", lx: 356, ly: 118, curveX: 94, curveY: -96, dashed: true },
    { from: "gov", to: "didi", type: "regulation", labelEn: "permits + taxi embed", labelZh: "許可與體系嵌入", lx: 476, ly: 342, curveX: 42, curveY: -16 },
    { from: "gov", to: "uber", type: "regulation", labelEn: "raids + draft rules", labelZh: "查緝與法規草案", lx: 258, ly: 336, curveX: -30, curveY: -14, negative: true },
    { from: "didi", to: "alliance", type: "alliances", labelEn: "Lyft / Ola / Grab linkage", labelZh: "Lyft / Ola / Grab 串聯", lx: 664, ly: 332, curveX: 32, curveY: 8 },
  ];

  const layerSummary = {
    all: {
      en: "The asymmetry came from stacked channels. Didi sat closer to local density, social distribution, payment convenience, and regulatory legitimacy at the same time.",
      zh: "真正的不對稱，不是單一優勢，而是多條通道同時堆疊。滴滴同時更靠近地方密度、社交流量、支付便利與監管正當性。",
    },
    capital: {
      en: "Uber had meaningful capital support, but capital alone did not neutralize local incumbency once Didi and Kuaidi merged.",
      zh: "Uber 並非沒有資本支援，但當滴滴與快的合併後，資本本身已不足以抹平本地在位優勢。",
    },
    distribution: {
      en: "Super-app distribution mattered because ride hailing is frequent, local, and habit-forming. WeChat was not just media. It was a usage rail.",
      zh: "超級 App 分發很重要，因為叫車是高頻、地方性且會養成習慣的行為。微信不只是媒體，而是使用通道。",
    },
    payments: {
      en: "Payment friction shapes conversion and repeat use. Adding Alipay helped Uber, but native local payment embed still favored the local bloc.",
      zh: "支付摩擦會影響轉換與回流。Uber 接上支付寶當然有幫助，但原生支付嵌入仍偏向本地集團。",
    },
    maps: {
      en: "Maps were necessary for usability, but they were not exclusive enough to become Uber's decisive moat. Even this channel was contested.",
      zh: "地圖對可用性很關鍵，但它並不夠排他，無法成為 Uber 的決定性護城河。連這個通道本身也不是單邊壟斷。",
    },
    regulation: {
      en: "Draft rules and permit allocation could convert temporary lead into durable structure. Regulation was not backdrop. It was a competitive instrument.",
      zh: "法規草案與許可分配，可能把暫時優勢轉成長期結構。監管不是背景音，而是競爭工具。",
    },
    alliances: {
      en: "The mainland war was nested inside a broader anti-Uber geometry. Didi did not need to beat Uber everywhere by itself if it could help constrain Uber globally.",
      zh: "大陸戰場其實嵌在更大的反 Uber 幾何裡。只要能在全球幫忙牽制 Uber，滴滴就不必獨自到處正面決戰。",
    },
  };

  const focusDetails = {
    uber: {
      titleEn: "Uber",
      titleZh: "Uber",
      roleEn: "Serious entrant, but structurally thinner local system.",
      roleZh: "有實力的進入者，但本地系統仍較薄。",
      bulletsEn: [
        "Localized more than casual summaries admit: Alipay, Baidu Maps, local servers, People's Uber, and fast city expansion.",
        "Still entered with narrower service scope and weaker embed in local complements than Didi-Kuaidi.",
        "Could buy growth, but not instantly buy local legitimacy, taxi relationships, or policy alignment.",
      ],
      bulletsZh: [
        "在地化其實比很多人以為的多，包括支付寶、百度地圖、境內伺服器、人民優步與快速擴城。",
        "但相較滴滴快的，服務範圍仍較窄，對本地補充生態系的嵌入也較弱。",
        "可以花錢買成長，但不能立刻買到制度正當性、計程車關係與政策對位。",
      ],
    },
    didi: {
      titleEn: "Didi-Kuaidi",
      titleZh: "滴滴快的",
      roleEn: "Local bloc with density, breadth, and institutional embed.",
      roleZh: "同時掌握密度、廣度與制度嵌入的本地集團。",
      bulletsEn: [
        "The merger reduced local self-cannibalization and concentrated network density city by city.",
        "Started from licensed taxis, then expanded across broader service lines, making the product more locally complete.",
        "Its strongest advantage was not one feature. It was the bundle: density, complements, permits, and local familiarity together.",
      ],
      bulletsZh: [
        "合併把原本本地雙雄彼此內耗的問題壓下去，地方網路密度也因此集中。",
        "先從持照計程車起家，再擴張到更廣服務線，讓產品更完整地貼近本地需求。",
        "最強的地方不是單一功能，而是密度、補充資源、許可與在地熟悉度的整體組合。",
      ],
    },
    tencent: {
      titleEn: "Tencent",
      titleZh: "騰訊",
      roleEn: "Capital plus a habit rail through WeChat.",
      roleZh: "不只是資本，更透過微信掌握高頻使用通道。",
      bulletsEn: [
        "WeChat functioned as a distribution and payment environment, not merely an ad channel.",
        "Blocking Uber-related accounts mattered because discovery and convenient re-use are central in ride hailing.",
        "This is why the battle was partly a platform-on-platform war, not just car dispatch competition.",
      ],
      bulletsZh: [
        "微信不是單純廣告渠道，而是同時承載分發與支付的使用環境。",
        "封鎖 Uber 相關帳號之所以重要，是因為叫車高度依賴發現、轉換與再次使用。",
        "也因此，這場戰爭一部分其實是平臺對平臺，而不只是派車效率競爭。",
      ],
    },
    alibaba: {
      titleEn: "Alibaba",
      titleZh: "阿里巴巴",
      roleEn: "Payment power and backing on the Kuaidi side.",
      roleZh: "在快的一側提供資本與支付力量。",
      bulletsEn: [
        "Alipay mattered because payment convenience is part of value delivery, not a trivial back-office feature.",
        "The local bloc did not depend on one giant alone. It drew strength from multiple complements across the ecosystem.",
        "After merger, Alibaba's relevance remained because the payment rail still mattered for adoption and retention.",
      ],
      bulletsZh: [
        "支付寶之所以重要，是因為支付便利本身就是價值傳遞的一部分，不是後台小細節。",
        "本地集團不是只靠單一巨頭，而是同時吸收多種生態系補充資源。",
        "合併之後，阿里巴巴仍然重要，因為支付通道會直接影響採用與留存。",
      ],
    },
    baidu: {
      titleEn: "Baidu",
      titleZh: "百度",
      roleEn: "Meaningful ally for Uber, but not enough by itself.",
      roleZh: "對 Uber 很重要，但單靠它仍然不夠。",
      bulletsEn: [
        "Baidu gave Uber capital, search adjacency, and a local map fix at a moment when Google Maps was weak in the mainland.",
        "That support made Uber more viable, but it did not close the distribution and payment gap to the Tencent-Alibaba local bloc.",
        "This is exactly why maps alone should not be overstated into a decisive moat story.",
      ],
      bulletsZh: [
        "百度替 Uber 補上資本、搜尋相鄰性，以及 Google 地圖在大陸較弱時的本地地圖修補。",
        "這確實提升了 Uber 的可行性，但仍不足以補齊對騰訊與阿里本地集團的分發與支付差距。",
        "所以地圖不能被誇大解讀成決定性的單一護城河。",
      ],
    },
    gov: {
      titleEn: "Regulators and taxi incumbents",
      titleZh: "監管者與計程車在位體系",
      roleEn: "The channel that could harden local advantage into law.",
      roleZh: "最可能把本地優勢直接做成法律結構的通道。",
      bulletsEn: [
        "Permits, raids, labor treatment, pricing rules, and single-platform rules all shaped platform economics directly.",
        "Didi's local embed made regulation look less like neutral governance and more like competitive structure.",
        "In this case, law could freeze affiliation, pricing, and participation rules in ways harmful to Uber's core tactics.",
      ],
      bulletsZh: [
        "許可、查緝、勞動認定、價格規則與單一平臺規定，都會直接改變平臺經濟。",
        "滴滴較深的本地嵌入，使監管看起來不像中性治理，而更像競爭結構的一部分。",
        "在這個個案裡，法律可能直接把 Uber 最重要的戰術空間固定住。",
      ],
    },
    alliance: {
      titleEn: "Anti-Uber Alliance",
      titleZh: "反 Uber 聯盟",
      roleEn: "External geometry that raised Uber's strategic stakes.",
      roleZh: "把 Uber 戰略風險進一步放大的外部幾何。",
      bulletsEn: [
        "Didi's investments into Lyft, Ola, and Grab meant the mainland conflict also affected Uber's global category leadership story.",
        "The issue was not only local market share. It was also whether Uber would be boxed in across regions.",
        "That made China feel even more important at the case moment than later hindsight might suggest.",
      ],
      bulletsZh: [
        "滴滴投資 Lyft、Ola、Grab，代表大陸衝突也會反過來影響 Uber 的全球品類領導敘事。",
        "問題不只是本地市佔，而是 Uber 是否會在多個區域同時被圍堵。",
        "因此站在個案當下，大陸市場看起來會比後見之明下更加關鍵。",
      ],
    },
    wechat: {
      titleEn: "WeChat",
      titleZh: "微信",
      roleEn: "Habit channel for discovery, messaging, and reuse.",
      roleZh: "承接發現、溝通與再使用的習慣通道。",
      bulletsEn: ["Traffic inside a super app can be strategic infrastructure, not merely promotion.", "When the app rail is blocked, a rival loses more than impressions.", "This favored Didi because it sat closer to native local usage patterns."],
      bulletsZh: ["超級 App 內的流量，本質上可能是戰略基礎設施，不只是宣傳。", "當這條通道被封鎖，對手失去的不只是曝光。", "這讓更貼近本地使用習慣的滴滴受益。"],
    },
    alipay: {
      titleEn: "Alipay",
      titleZh: "支付寶",
      roleEn: "Conversion and retention rail through payment convenience.",
      roleZh: "透過支付便利影響轉換與留存的基礎通道。",
      bulletsEn: ["Payment is part of the product experience in ride hailing.", "Uber's addition of Alipay was necessary, but not the same as owning the native rail.", "The local bloc entered this layer with greater natural fit."],
      bulletsZh: ["支付本身就是叫車產品體驗的一部分。", "Uber 接入支付寶是必要，但不等於掌握原生支付通道。", "本地集團在這一層天生更貼近使用情境。"],
    },
    baidumaps: {
      titleEn: "Baidu Maps",
      titleZh: "百度地圖",
      roleEn: "Necessary local infrastructure, but not fully exclusive.",
      roleZh: "必要的本地基礎設施，但不具完全排他性。",
      bulletsEn: ["A local map layer was essential because Google Maps coverage was weak.", "This improved Uber's usability materially.", "But because local rivals also used Baidu Maps, this channel alone could not decide the war."],
      bulletsZh: ["由於 Google 地圖覆蓋較弱，本地地圖層是必要基礎。", "這確實實質改善了 Uber 的可用性。", "但因為本地對手也能用，單靠地圖仍不足以決定勝負。"],
    },
  };

  const majorMatrix = {
    uber: { capital: 5, distribution: 2, payments: 2, maps: 3, regulation: 1 },
    didi: { capital: 5, distribution: 5, payments: 5, maps: 4, regulation: 5 },
    tencent: { capital: 4, distribution: 5, payments: 2, maps: 1, regulation: 3 },
    alibaba: { capital: 4, distribution: 2, payments: 5, maps: 1, regulation: 3 },
    baidu: { capital: 3, distribution: 2, payments: 1, maps: 5, regulation: 1 },
  };

  const matrixColumns = [
    { key: "capital", en: "Capital", zh: "資本" },
    { key: "distribution", en: "Social", zh: "社交流量" },
    { key: "payments", en: "Payment", zh: "支付" },
    { key: "maps", en: "Maps", zh: "地圖" },
    { key: "regulation", en: "Regulatory", zh: "監管" },
  ];

  const matrixDescription = {
    en: "Interpretive heatmap. This is not a literal count of assets. It is a compact reading of relative strategic leverage in the case context.",
    zh: "這是解釋型熱圖，不是資產逐項點數。它只是把個案情境下的相對戰略槓桿壓縮成一張短表。",
  };

  const activeDetail = focusDetails[focus] || focusDetails.didi;

  const heat = (value) => ({
    background: `rgba(46, 92, 110, ${0.08 + value * 0.11})`,
    color: value >= 4 ? "#ffffff" : PALETTE.ink,
    borderColor: value >= 4 ? "rgba(46, 92, 110, 0.0)" : "rgba(46, 92, 110, 0.12)",
  });

  return (
    <div className="battle-atlas panel">
      <div className="battle-toolbar">
        <div className="battle-copy">
          <strong><T mode={mode} en="Interactive battlefield atlas" zh="互動戰場圖" /></strong>
          <p><T mode={mode} en={layerSummary[layer].en} zh={layerSummary[layer].zh} /></p>
        </div>
        <div className="battle-control-stack">
          <div>
            <div className="battle-label"><T mode={mode} en="Filter by channel" zh="依通道篩選" /></div>
            <div className="battle-layer-row">
              {layerOptions.map((opt) => (
                <button key={opt.key} className={`battle-pill ${layer === opt.key ? "active" : ""}`} onClick={() => setLayer(opt.key)}>
                  <T mode={mode} en={opt.en} zh={opt.zh} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="battle-label"><T mode={mode} en="Focus actor" zh="聚焦角色" /></div>
            <div className="battle-focus-row">
              {focusOptions.map((opt) => (
                <button key={opt.key} className={`battle-pill battle-focus-pill ${focus === opt.key ? "active" : ""}`} onClick={() => setFocus(opt.key)}>
                  <T mode={mode} en={opt.en} zh={opt.zh} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="battle-layout">
        <div className="battle-map-card">
          <svg viewBox="0 0 800 450" className="battle-svg" role="img" aria-label="Battlefield relationship map for Uber and Didi in the mainland market">
            <defs>
              <marker id="battle-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 z" fill="#8B8175" />
              </marker>
            </defs>
            <rect x="0" y="0" width="800" height="450" rx="24" fill="rgba(255,255,255,0.72)" />
            <text x="34" y="34" fontSize="14" fontWeight="700" fill={PALETTE.ink}>{mode === "zh" ? "通道地圖" : "Channel map"}</text>
            <text x="34" y="54" fontSize="12" fill={PALETTE.muted}>{mode === "zh" ? "可點擊節點查看。也可用篩選器單看某一條通道。" : "Click nodes to inspect. Use filters to isolate one channel."}</text>

            {edges.map((edge, idx) => {
              const from = nodeCenters[edge.from];
              const to = nodeCenters[edge.to];
              const visible = layer === "all" || edge.type === layer || edge.type === "rivalry";
              const focusHit = focus === edge.from || focus === edge.to;
              const stroke = edge.negative ? PALETTE.red : layerColors[edge.type];
              const opacity = !visible ? 0.08 : focusHit ? 0.95 : layer === "all" ? 0.62 : 0.78;
              const width = edge.type === "rivalry" ? 3.4 : focusHit ? 4.2 : 2.6;
              const dash = edge.dashed ? "6 7" : edge.negative ? "9 7" : undefined;
              const qx = (from.x + to.x) / 2 + (edge.curveX || 0);
              const qy = (from.y + to.y) / 2 + (edge.curveY || 0);
              const path = `M ${from.x} ${from.y} Q ${qx} ${qy} ${to.x} ${to.y}`;
              return (
                <g key={idx} opacity={opacity}>
                  <path d={path} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dash} markerEnd="url(#battle-arrow)" />
                  {visible ? (
                    <text x={edge.lx} y={edge.ly} fontSize="11" fontWeight="600" fill={stroke} textAnchor="middle">
                      {mode === "zh" ? edge.labelZh : edge.labelEn}
                    </text>
                  ) : null}
                </g>
              );
            })}

            {Object.entries(nodes).map(([key, node]) => {
              const fill = toneFill[node.tone] || PALETTE.teal;
              const isFocus = focus === key;
              const clickable = !!focusDetails[key];
              const isDimmed = clickable && focus !== key && ["uber","didi","tencent","alibaba","baidu"].includes(focus) && ["uber","didi","tencent","alibaba","baidu"].includes(key) === false ? false : false;
              return (
                <g key={key} onClick={() => clickable ? setFocus(key) : undefined} style={clickable ? { cursor: "pointer" } : undefined}>
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="18" fill={node.tone === "uber" ? fill : `${fill}18`} stroke={isFocus ? PALETTE.plum : fill} strokeWidth={isFocus ? 3 : 1.5} />
                  {node.tone !== "uber" ? <rect x={node.x + 12} y={node.y + 13} width="10" height="10" rx="3" fill={fill} /> : null}
                  <text x={node.tone === "uber" ? node.x + 18 : node.x + 30} y={node.y + 23} fontSize="14" fontWeight="800" fill={node.tone === "uber" ? "#ffffff" : PALETTE.ink}>{mode === "zh" ? node.labelZh : node.labelEn}</text>
                  <text x={node.tone === "uber" ? node.x + 18 : node.x + 30} y={node.y + 42} fontSize="11" fill={node.tone === "uber" ? "rgba(255,255,255,0.82)" : PALETTE.muted}>{mode === "zh" ? node.subZh : node.subEn}</text>
                </g>
              );
            })}
          </svg>

          <div className="battle-note-strip">
            <div>
              <strong><T mode={mode} en="How to read this" zh="閱讀方式" /></strong>
              <p><T mode={mode} en="The decisive issue was not whether Uber had one ally. It was whether its support stack was as complete as Didi's. It was not." zh="真正關鍵不在 Uber 有沒有單一盟友，而在它的支援堆疊是否像滴滴一樣完整。答案偏向不是。" /></p>
            </div>
            <div className="battle-legend">
              {[
                ["capital", PALETTE.plum],
                ["distribution", PALETTE.green],
                ["payments", PALETTE.blue],
                ["maps", PALETTE.rust],
                ["regulation", PALETTE.red],
                ["alliances", PALETTE.gold],
              ].map(([name, color]) => (
                <span key={name}><i style={{ background: color }} />{mode === "zh" ? {
                  capital: "資本",
                  distribution: "社交流量",
                  payments: "支付",
                  maps: "地圖與搜尋",
                  regulation: "監管",
                  alliances: "聯盟",
                }[name] : {
                  capital: "Capital",
                  distribution: "Social",
                  payments: "Payments",
                  maps: "Maps",
                  regulation: "Regulation",
                  alliances: "Alliances",
                }[name]}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="battle-side">
          <div className="battle-focus-card">
            <div className="battle-card-kicker"><T mode={mode} en="Selected actor" zh="目前焦點" /></div>
            <h3>{mode === "zh" ? activeDetail.titleZh : activeDetail.titleEn}</h3>
            <p className="battle-role">{mode === "zh" ? activeDetail.roleZh : activeDetail.roleEn}</p>
            <ul className="appendix-list">
              {(mode === "zh" ? activeDetail.bulletsZh : activeDetail.bulletsEn).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="battle-matrix-card">
            <div className="battle-card-kicker"><T mode={mode} en="Qualitative leverage matrix" zh="質性槓桿矩陣" /></div>
            <p className="battle-matrix-copy"><T mode={mode} en={matrixDescription.en} zh={matrixDescription.zh} /></p>
            <div className="battle-matrix-grid">
              <div className="battle-head-empty"></div>
              {matrixColumns.map((col) => (
                <div key={col.key} className="battle-col-head"><T mode={mode} en={col.en} zh={col.zh} /></div>
              ))}
              {focusOptions.map((actor) => (
                <React.Fragment key={actor.key}>
                  <div className={`battle-row-head ${focus === actor.key ? "active" : ""}`}>{mode === "zh" ? actor.zh : actor.en}</div>
                  {matrixColumns.map((col) => {
                    const value = majorMatrix[actor.key][col.key];
                    return <div key={`${actor.key}-${col.key}`} className={`battle-cell ${focus === actor.key ? "active" : ""}`} style={heat(value)}>{value}</div>;
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="source-note"><T mode={mode} en="Built from the HBS case's ecosystem facts, blocking event, local permit event, and alliance sequence. The matrix is interpretive. It compresses the case into a reader-friendly comparison rather than claiming literal measured scores." zh="本圖依據 HBS 個案中的生態系事實、微信封鎖事件、地方許可事件與聯盟擴張順序重建。矩陣部分屬解釋型視覺壓縮，用來幫助閱讀，不是在主張存在精確量測分數。" /></p>
    </div>
  );
}

function FloatingLanguageSwitch({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const labels = {
    en: "EN",
    zh: "中",
    bi: "雙",
  };
  return (
    <div className={`lang-switch ${open ? "open" : ""}`}>
      <button className="lang-main" onClick={() => setOpen((v) => !v)} aria-label="Switch language mode">
        <Icon name="globe" size={17} />
      </button>
      <div className="lang-menu">
        {[
          { key: "en", label: "EN" },
          { key: "zh", label: "繁" },
          { key: "bi", label: "雙" },
        ].map((opt) => (
          <button
            key={opt.key}
            className={mode === opt.key ? "active" : ""}
            onClick={() => {
              setMode(opt.key);
              setOpen(false);
            }}
            aria-label={labels[opt.key]}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function UberChinaMainlandInfrastructure() {
  const [mode, setMode] = useState("en");

  const marketStats = useMemo(
    () => [
      {
        valueEn: "~800M",
        valueZh: "約 8 億",
        labelEn: "urban transportation market",
        labelZh: "城市交通市場人口",
      },
      {
        valueEn: "2.62M",
        valueZh: "262 萬",
        labelEn: "licensed taxi drivers in major cities",
        labelZh: "主要城市持照計程車司機",
      },
      {
        valueEn: "18M → 45M",
        valueZh: "1,800 萬 → 4,500 萬",
        labelEn: "ride hailing app users, 2013 to late 2015",
        labelZh: "叫車 App 使用者，2013 到 2015 年底",
      },
      {
        valueEn: ">900M",
        valueZh: "逾 9 億",
        labelEn: "smartphone users",
        labelZh: "智慧型手機使用者",
      },
      {
        valueEn: "4 / 10",
        valueZh: "10 大中的 4 座",
        labelEn: "Uber's top global cities located in the mainland",
        labelZh: "Uber 全球前十大城市位於大陸地區",
      },
      {
        valueEn: "100 more",
        valueZh: "再進 100 城",
        labelEn: "cities Uber planned to enter in 2016",
        labelZh: "Uber 2016 年規劃新增城市",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        year: "2013",
        en: "Uber set up in Shanghai and treated the mainland as a major expansion bet rather than a small foreign outpost.",
        zh: "Uber 先在上海建立據點，從一開始就把大陸地區視為重大擴張戰場，不是小型海外試點。",
      },
      {
        year: "2014",
        en: "Limited launch in Shanghai, Guangzhou, Beijing, and Shenzhen. Uber added Alipay and later partnered with Baidu Maps. In August it launched People's Uber and waived the usual 20 percent commission.",
        zh: "先在上海、廣州、北京、深圳有限上線。Uber 加入支付寶，之後再與百度地圖合作。8 月推出人民優步，並免除慣常的 20% 抽成。",
      },
      {
        year: "Feb 2015",
        en: "Didi and Kuaidi merged, reducing fratricidal subsidy war between the two local leaders and concentrating local density.",
        zh: "滴滴與快的合併，結束本土雙雄彼此內耗的補貼戰，也讓地方網路密度更集中。",
      },
      {
        year: "2015",
        en: "Uber scaled aggressively. Chengdu became Uber's top city globally. Tencent blocked Uber-related WeChat accounts. Raids and legal friction intensified in several cities.",
        zh: "Uber 快速擴張，成都一度成為全球第一城。騰訊封鎖 Uber 相關微信帳號，多個城市的查緝與法律摩擦也同步升高。",
      },
      {
        year: "Oct 2015",
        en: "Didi received Shanghai's first iTNC permit, a legal and political signal that local legitimacy was becoming a strategic asset.",
        zh: "滴滴取得上海首張 iTNC 許可證。這不只是法規事件，也是制度正當性變成競爭資產的訊號。",
      },
      {
        year: "Late 2015 to 2016",
        en: "The Anti Uber Alliance expanded through Lyft, Ola, and Grab. Draft national rules threatened surge pricing, subsidies below cost, contractor flexibility, and multi homing.",
        zh: "反 Uber 聯盟延伸到 Lyft、Ola 與 Grab。全國草案則進一步威脅動態定價、低於成本補貼、承攬彈性與多棲供給。",
      },
      {
        year: "Post case",
        en: "Uber later exited direct mainland operations and held an economic interest in Didi instead."
          + "",
        zh: "個案之後，Uber 不再直接經營大陸業務，轉而持有滴滴的經濟利益。",
      },
    ],
    []
  );

  const advantageRows = useMemo(
    () => [
      {
        dimensionEn: "Local driver and rider density",
        dimensionZh: "地方司機與乘客密度",
        uber: 2,
        didi: 5,
        noteEn: "Local scale favored Didi city by city.",
        noteZh: "逐城市比較，地方規模明顯偏向滴滴。",
      },
      {
        dimensionEn: "Service breadth",
        dimensionZh: "服務廣度",
        uber: 2,
        didi: 5,
        noteEn: "Didi covered taxis, private cars, hitch, chauffeur, buses, and more.",
        noteZh: "滴滴涵蓋計程車、專車、拼車、代駕、巴士等，更完整。",
      },
      {
        dimensionEn: "Ecosystem complements",
        dimensionZh: "生態系補充資源",
        uber: 3,
        didi: 5,
        noteEn: "Uber had Baidu; Didi had stronger payment and social distribution support.",
        noteZh: "Uber 有百度，但滴滴握有更強的支付與社交流量支援。",
      },
      {
        dimensionEn: "Regulatory position",
        dimensionZh: "監管位置",
        uber: 1,
        didi: 5,
        noteEn: "Didi was closer to local governments and licensed taxi systems.",
        noteZh: "滴滴與地方政府、持照計程車體系關係更深。",
      },
      {
        dimensionEn: "Localization depth",
        dimensionZh: "在地化深度",
        uber: 3,
        didi: 5,
        noteEn: "Uber localized meaningfully, but Didi was born native.",
        noteZh: "Uber 的在地化不算少，但滴滴從一開始就是本地原生。",
      },
      {
        dimensionEn: "Ability to buy growth with subsidies",
        dimensionZh: "用補貼買成長的能力",
        uber: 4,
        didi: 4,
        noteEn: "Both could burn cash. That alone did not settle the war.",
        noteZh: "雙方都能燒錢，單靠補貼並不足以定勝負。",
      },
    ],
    []
  );

  const exhibitCards = useMemo(
    () => [
      {
        titleEn: "Exhibit 1: Funding",
        titleZh: "附件 1：融資",
        bodyEn: "Shows how much capital Uber could mobilize. It proves entry ability, not durable victory.",
        bodyZh: "顯示 Uber 的資本動員能力。它證明能進場，不代表能長期勝出。",
      },
      {
        titleEn: "Exhibit 3: Boston vs. Beijing pricing",
        titleZh: "附件 3：波士頓與北京價格對照",
        bodyEn: "People's Uber entered at materially lower price points. The low end push was deliberate, not incidental.",
        bodyZh: "人民優步是刻意往低價帶切入，不是偶然。",
      },
      {
        titleEn: "Exhibit 4: Products by city",
        titleZh: "附件 4：各城市產品組合",
        bodyEn: "Uber already had many product variants. The issue was not zero localization. The issue was whether the whole system was locally sufficient.",
        bodyZh: "Uber 其實已經有很多產品版本。問題不在完全沒在地化，而在整體系統是否夠貼近本地。",
      },
      {
        titleEn: "Exhibit 5: Global competition map",
        titleZh: "附件 5：全球競爭地圖",
        bodyEn: "The mainland was one of the heaviest strategic battlegrounds in a broader global platform war.",
        bodyZh: "大陸地區是全球平臺戰裡最重的戰區之一。",
      },
      {
        titleEn: "Exhibit 6: Draft national rules",
        titleZh: "附件 6：全國法規草案",
        bodyEn: "This is the single exhibit most likely to turn temporary local lead into an institutional moat.",
        bodyZh: "這是最可能把暫時性優勢變成制度護城河的一份附件。",
      },
    ],
    []
  );

  const appendices = useMemo(
    () => [
      {
        summaryEn: "Speaking ready answers",
        summaryZh: "可直接開口的答法",
        contentEn: (
          <div className="appendix-stack">
            <div>
              <h4>30 seconds</h4>
              <p>
                Uber could compete and clearly gained traction, but independent long run victory looked unlikely.
                Didi had stronger local density, broader services, deeper ecosystem integration, and a better
                regulatory position. Uber's subsidies accelerated growth, but also inflated fraud and did not clearly
                convert into a durable moat.
              </p>
            </div>
            <div>
              <h4>60 seconds</h4>
              <p>
                China mattered because it was the world's biggest urban mobility market and one of Uber's most
                important growth narratives. But ride hailing network effects are local, not global. Didi was ahead
                city by city, native to local maps, payments, and taxi relationships, and increasingly closer to the
                regulatory center of gravity. So Uber could fight, but independent victory was a much harder claim.
              </p>
            </div>
            <div>
              <h4>One paragraph</h4>
              <p>
                My view is that Uber was capable of competing in the mainland market and proved that with real user
                growth, real driver acquisition, and meaningful localization. But the weight of the evidence suggests
                that independent long run success was improbable because Didi-Kuaidi was stronger on the local
                positive feedback loop, ecosystem complements, service breadth, and regulatory legitimacy. Later Uber
                results also suggest that direct control of mainland operations was not necessary for the company's
                eventual survival.
              </p>
            </div>
          </div>
        ),
        contentZh: (
          <div className="appendix-stack">
            <div>
              <h4>30 秒</h4>
              <p>
                Uber 能競爭，而且確實有 traction，但若問能否獨立長期勝出，我會偏向不樂觀。滴滴在地方密度、
                服務廣度、生態系整合與監管位置都更強。Uber 的補貼讓成長變快，卻也放大詐欺，沒有穩穩變成護城河。
              </p>
            </div>
            <div>
              <h4>60 秒</h4>
              <p>
                大陸地區重要，因為它是全球最大都市移動市場，也是 Uber 全球敘事中最關鍵的戰場之一。但叫車平臺的網路效應是地方性的，
                不是全球性的。滴滴逐城市領先，又原生整合地圖、支付、計程車關係與制度正當性。所以 Uber 能打，但要獨立贏下來，論證難度很高。
              </p>
            </div>
            <div>
              <h4>一段完整版</h4>
              <p>
                我的判斷是，Uber 在大陸地區市場具備真實競爭能力，這點個案已經證明。它有真實成長、真實招募、也做了不少在地化。
                但證據整體仍較偏向「難以獨立長期勝出」，因為滴滴快的在地方正回饋循環、生態系補充資源、服務廣度與監管正當性上都更有利。
                後續資料也顯示，Uber 最終的存活，並不需要自己直接經營大陸地區營運。
              </p>
            </div>
          </div>
        ),
      },
      {
        summaryEn: "Interpretive choices that change the answer",
        summaryZh: "會改變答案的解讀前提",
        contentEn: (
          <ul className="appendix-list">
            <li><strong>Question 1 has two layers.</strong> "Could Uber compete?" is easier than "Could Uber independently win in the long run?"</li>
            <li><strong>Keep time layers separate.</strong> Case time analysis should be 2015 to early 2016. Later company performance belongs in a separate hindsight layer.</li>
            <li><strong>Use a portfolio lens.</strong> Network effects mattered, but so did value delivery, complements, incumbency, and regulation.</li>
          </ul>
        ),
        contentZh: (
          <ul className="appendix-list">
            <li><strong>第一題其實有兩層。</strong>「能不能競爭」比「能不能獨立長期勝出」容易回答。</li>
            <li><strong>時間層要分開。</strong> 個案主體應鎖定在 2015 到 2016 年初，後續公司表現應獨立處理。</li>
            <li><strong>最好用組合式鏡頭。</strong> 網路效應重要，但價值傳遞、補充資源、在位者優勢與監管同樣重要。</li>
          </ul>
        ),
      },
      {
        summaryEn: "Source basis and method",
        summaryZh: "資料基礎與方法",
        contentEn: (
          <ul className="appendix-list">
            <li>Primary case base: <em>Uber in China: Driving in the Gray Zone</em>, including narrative and Exhibits 1, 3, 4, 5, and 6.</li>
            <li>Supplementary background: revenue, users, operating income, cost structure, and later global footprint.</li>
            <li>Course framework base: Boudreau notes on value creation, market positioning, value delivery, value capture, and platform competition.</li>
            <li>Method: separate case facts, supplementary facts, strategic inference, and post case context to prevent hindsight leakage.</li>
          </ul>
        ),
        contentZh: (
          <ul className="appendix-list">
            <li>主要個案基礎：<em>Uber in China: Driving in the Gray Zone</em>，含正文與附件 1、3、4、5、6。</li>
            <li>補充背景：營收、活躍使用者、營業利益、成本結構，以及後續全球版圖。</li>
            <li>課程框架：Boudreau 關於價值創造、市場定位、價值傳遞、價值擷取與平臺競爭的講義。</li>
            <li>方法：刻意區分個案事實、補充事實、策略推論與個案後脈絡，避免後見之明污染答案。</li>
          </ul>
        ),
      },
    ],
    []
  );

  return (
    <div className="uber-case-root">
      <style>{`
        :root {
          color: ${PALETTE.ink};
          background: ${PALETTE.bg};
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${PALETTE.bg}; color: ${PALETTE.ink}; }
        .uber-case-root {
          min-height: 100vh;
          background: radial-gradient(circle at top, rgba(184,139,74,0.08), transparent 28%), ${PALETTE.bg};
          color: ${PALETTE.ink};
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          line-height: 1.55;
        }
        .page-shell {
          width: min(1400px, calc(100vw - 32px));
          margin: 0 auto;
          padding: 24px 0 80px;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
          color: ${PALETTE.muted};
          font-size: 13px;
        }
        .topbar .meta-row,
        .topbar .scope-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .meta-pill {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          background: rgba(255,255,255,0.68);
          border: 1px solid ${PALETTE.line};
          padding: 7px 10px;
          border-radius: 999px;
        }
        .hero {
          border: 1px solid ${PALETTE.line};
          background: linear-gradient(180deg, rgba(255,255,255,0.76), rgba(255,253,248,0.96));
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 24px 60px rgba(30,27,24,0.06);
          overflow: hidden;
          position: relative;
        }
        .hero::before,
        .hero::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: rgba(98,41,84,0.08);
          pointer-events: none;
        }
        .hero::before { width: 240px; height: 240px; right: -80px; top: -80px; }
        .hero::after { width: 180px; height: 180px; left: -60px; bottom: -80px; background: rgba(46,92,110,0.08); }
        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.9fr);
          gap: 22px;
          align-items: start;
        }
        .hero-title {
          margin: 6px 0 14px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.02;
          letter-spacing: -0.02em;
        }
        .hero-subtitle,
        .hero-note,
        .hero-copy,
        .section-intro,
        .body-copy,
        .compare-note,
        .appendix-list,
        .appendix-stack p,
        .source-note,
        .table-cell p,
        .figure-head p {
          color: ${PALETTE.inkSoft};
        }
        .hero-copy {
          max-width: 760px;
          font-size: 16px;
          margin: 0 0 18px;
        }
        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 14px;
        }
        .hero-badge {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: ${PALETTE.paper};
          border: 1px solid ${PALETTE.line};
          font-size: 13px;
          color: ${PALETTE.inkSoft};
        }
        .hero-right {
          display: grid;
          gap: 14px;
        }
        .summary-card,
        .metric-card,
        .panel,
        .compare-card,
        .table-card,
        .figure-card,
        details,
        .signal-card,
        .financial-card,
        .timeline-card,
        .lens-card,
        .appendix-card,
        .market-card {
          background: rgba(255,255,255,0.78);
          border: 1px solid ${PALETTE.line};
          border-radius: 22px;
          box-shadow: 0 10px 28px rgba(30,27,24,0.04);
        }
        .summary-card {
          padding: 18px 18px 16px;
        }
        .summary-card h3,
        .figure-head h3,
        .table-card h3,
        .compare-card h3,
        .financial-card h3,
        .panel h3,
        .signal-card h3,
        .market-card h3 {
          margin: 0 0 10px;
          font-size: 18px;
          line-height: 1.25;
        }
        .summary-card .verdict {
          margin-top: 12px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(46,92,110,0.08);
          color: ${PALETTE.teal};
          border: 1px solid rgba(46,92,110,0.18);
        }
        .section-nav {
          margin: 22px 0 24px;
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 6px;
        }
        .section-nav a {
          text-decoration: none;
          color: ${PALETTE.inkSoft};
          font-size: 13px;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.68);
          white-space: nowrap;
        }
        .sticky-summary {
          position: sticky;
          top: 14px;
          z-index: 4;
          margin: 0 0 24px;
          backdrop-filter: blur(12px);
          background: rgba(252,250,242,0.82);
          border: 1px solid ${PALETTE.line};
          border-radius: 22px;
          padding: 14px;
          box-shadow: 0 14px 30px rgba(30,27,24,0.05);
        }
        .sticky-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr 0.8fr;
          gap: 12px;
          align-items: stretch;
        }
        .sticky-cell {
          background: rgba(255,255,255,0.78);
          border: 1px solid ${PALETTE.line};
          border-radius: 16px;
          padding: 12px 13px;
        }
        .sticky-label {
          font-size: 12px;
          color: ${PALETTE.muted};
          margin-bottom: 6px;
          display: flex;
          gap: 7px;
          align-items: center;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .sticky-main {
          font-size: 15px;
          font-weight: 700;
          line-height: 1.35;
        }
        .sticky-sub {
          font-size: 13px;
          color: ${PALETTE.inkSoft};
          margin-top: 6px;
        }
        .content-grid {
          display: grid;
          gap: 24px;
        }
        .section-heading {
          margin-bottom: 14px;
        }
        .section-kicker {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          color: ${PALETTE.teal};
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .section-title {
          margin: 0 0 8px;
          font-size: clamp(24px, 3.2vw, 36px);
          line-height: 1.08;
          font-family: Georgia, "Times New Roman", serif;
        }
        .section-intro {
          margin: 0;
          max-width: 900px;
          font-size: 15px;
        }
        .three-col,
        .two-col,
        .four-col {
          display: grid;
          gap: 16px;
        }
        .two-col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .three-col { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .four-col { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
        }
        .metric-card {
          padding: 16px;
          min-height: 146px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .metric-value {
          font-size: 28px;
          line-height: 1;
          font-weight: 800;
          color: ${PALETTE.plum};
          letter-spacing: -0.02em;
        }
        .metric-label {
          font-size: 14px;
          color: ${PALETTE.inkSoft};
          margin-top: 8px;
        }
        .market-card,
        .signal-card,
        .financial-card,
        .panel,
        .compare-card,
        .table-card,
        .figure-card {
          padding: 18px;
        }
        .tags-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .tag-card {
          padding: 14px;
          border-radius: 18px;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.74);
        }
        .tag-card strong {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
        }
        .tag-card p {
          margin: 0;
          font-size: 13px;
          color: ${PALETTE.inkSoft};
        }
        .timeline-wrap {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 12px;
          align-items: stretch;
        }
        .timeline-card {
          padding: 14px;
          min-height: 188px;
          position: relative;
          overflow: hidden;
        }
        .timeline-card::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 4px;
          background: ${PALETTE.teal};
          opacity: 0.8;
        }
        .timeline-year {
          font-size: 12px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: ${PALETTE.teal};
          margin-bottom: 10px;
          font-weight: 800;
        }
        .timeline-card p,
        .panel p,
        .market-card p,
        .signal-card p,
        .financial-card p,
        .compare-card p,
        .table-card p,
        .figure-card p,
        li {
          margin: 0;
          font-size: 14px;
        }
        .chip-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .brand-chip {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid;
          min-width: 96px;
          max-width: 144px;
        }
        .brand-chip strong { font-size: 14px; line-height: 1.1; }
        .brand-chip span { font-size: 11px; line-height: 1.25; opacity: 0.88; }
        .ecosystem-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
        }
        .subhead {
          margin: 0 0 12px;
          font-size: 16px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .bullet-list,
        .appendix-list,
        .appendix-stack {
          display: grid;
          gap: 10px;
        }
        .bullet-list li,
        .appendix-list li {
          color: ${PALETTE.inkSoft};
          margin-left: 18px;
          padding-left: 4px;
        }
        .advantage-table {
          display: grid;
          gap: 10px;
        }
        .advantage-row {
          display: grid;
          grid-template-columns: 1.2fr 0.6fr 0.6fr 1fr;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          background: rgba(255,255,255,0.72);
          border: 1px solid ${PALETTE.line};
          align-items: center;
        }
        .advantage-row .label {
          font-weight: 700;
          font-size: 14px;
        }
        .qual-wrap {
          display: grid;
          gap: 6px;
        }
        .qual-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: ${PALETTE.muted};
        }
        .qual-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
        }
        .qual-bar span {
          height: 10px;
          border-radius: 999px;
        }
        .compare-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .compare-card {
          display: grid;
          gap: 10px;
        }
        .compare-card ul {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
        }
        .compare-card h3 { margin-bottom: 0; }
        .compare-note {
          font-size: 12px;
          padding-top: 2px;
        }
        .signal-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .signal-card {
          display: grid;
          gap: 10px;
        }
        .signal-card .impact {
          font-size: 12px;
          color: ${PALETTE.red};
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .financial-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .financial-card strong { display: block; font-size: 16px; margin-bottom: 8px; }
        .table-card,
        .figure-card { display: grid; gap: 12px; }
        .table-scroll { overflow-x: auto; }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        th,
        td {
          border-bottom: 1px solid ${PALETTE.line};
          padding: 12px 10px;
          text-align: left;
          vertical-align: top;
        }
        th {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: ${PALETTE.muted};
          background: rgba(46,92,110,0.05);
        }
        .figure-head { display: grid; gap: 8px; }
        .figure-head h3 { margin: 0; }
        .source-note {
          font-size: 12px;
          color: ${PALETTE.muted};
          border-top: 1px solid ${PALETTE.line};
          padding-top: 10px;
        }
        .network-svg,
        .revenue-svg {
          width: 100%;
          height: auto;
          display: block;
          background: rgba(255,255,255,0.55);
          border-radius: 18px;
          border: 1px solid ${PALETTE.line};
        }
        details {
          padding: 16px 18px;
        }
        details summary {
          cursor: pointer;
          list-style: none;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary { margin-bottom: 14px; }
        .details-arrow {
          flex: 0 0 auto;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${PALETTE.line};
          color: ${PALETTE.muted};
          transition: transform 0.2s ease;
        }
        details[open] .details-arrow { transform: rotate(90deg); }

        .battle-atlas {
          display: grid;
          gap: 16px;
        }
        .battle-toolbar {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .battle-copy {
          display: grid;
          gap: 6px;
          max-width: 520px;
        }
        .battle-copy strong {
          font-size: 16px;
        }
        .battle-copy p,
        .battle-matrix-copy,
        .battle-role,
        .battle-note-strip p {
          font-size: 14px;
          margin: 0;
        }
        .battle-control-stack {
          display: grid;
          gap: 10px;
          min-width: min(100%, 430px);
        }
        .battle-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${PALETTE.muted};
          margin-bottom: 8px;
          font-weight: 800;
        }
        .battle-layer-row,
        .battle-focus-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .battle-pill {
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.82);
          color: ${PALETTE.ink};
          padding: 9px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
        }
        .battle-pill:hover {
          transform: translateY(-1px);
          border-color: ${PALETTE.teal};
        }
        .battle-pill.active {
          background: ${PALETTE.teal};
          border-color: ${PALETTE.teal};
          color: #fff;
        }
        .battle-focus-pill.active {
          background: ${PALETTE.plum};
          border-color: ${PALETTE.plum};
        }
        .battle-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.18fr) minmax(320px, 0.82fr);
          gap: 16px;
        }
        .battle-map-card,
        .battle-side {
          display: grid;
          gap: 16px;
        }
        .battle-svg {
          width: 100%;
          height: auto;
          display: block;
          background: rgba(255,255,255,0.55);
          border-radius: 22px;
          border: 1px solid ${PALETTE.line};
        }
        .battle-note-strip,
        .battle-focus-card,
        .battle-matrix-card {
          display: grid;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.72);
        }
        .battle-card-kicker {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${PALETTE.muted};
          font-weight: 800;
        }
        .battle-focus-card h3 {
          margin: 0;
          font-size: 22px;
        }
        .battle-role {
          color: ${PALETTE.plum};
          font-weight: 700;
        }
        .battle-legend {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .battle-legend span {
          display: inline-flex;
          gap: 6px;
          align-items: center;
          font-size: 12px;
          border: 1px solid ${PALETTE.line};
          border-radius: 999px;
          padding: 6px 10px;
          background: rgba(255,255,255,0.8);
        }
        .battle-legend i {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
        }
        .battle-matrix-grid {
          display: grid;
          grid-template-columns: 1.1fr repeat(5, minmax(0, 1fr));
          gap: 6px;
          align-items: stretch;
        }
        .battle-head-empty {
          min-height: 38px;
        }
        .battle-col-head,
        .battle-row-head,
        .battle-cell {
          border-radius: 12px;
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          border: 1px solid transparent;
        }
        .battle-col-head {
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${PALETTE.muted};
          font-weight: 800;
          background: rgba(46,92,110,0.05);
          border-color: rgba(46,92,110,0.08);
        }
        .battle-row-head {
          justify-content: flex-start;
          font-size: 13px;
          font-weight: 700;
          color: ${PALETTE.ink};
          background: rgba(255,255,255,0.78);
          border-color: ${PALETTE.line};
        }
        .battle-row-head.active {
          border-color: ${PALETTE.plum};
          box-shadow: inset 0 0 0 1px ${PALETTE.plum};
        }
        .battle-cell {
          font-size: 13px;
          font-weight: 800;
          border-color: rgba(46,92,110,0.12);
        }
        .battle-cell.active {
          box-shadow: inset 0 0 0 1px ${PALETTE.plum};
        }

        .footer-note {
          margin-top: 28px;
          padding: 16px 18px;
          border: 1px solid ${PALETTE.line};
          border-radius: 20px;
          color: ${PALETTE.muted};
          font-size: 12px;
          background: rgba(255,255,255,0.62);
        }
        .lang-switch {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          display: grid;
          justify-items: end;
          gap: 8px;
        }
        .lang-main,
        .lang-menu button {
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.84);
          color: ${PALETTE.ink};
          box-shadow: 0 10px 28px rgba(30,27,24,0.06);
          cursor: pointer;
        }
        .lang-main {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.58;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .lang-main:hover { opacity: 1; transform: translateY(-1px); }
        .lang-menu {
          display: grid;
          gap: 6px;
          transform: translateY(6px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .lang-switch.open .lang-menu {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .lang-menu button {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          font-weight: 800;
        }
        .lang-menu button.active {
          background: ${PALETTE.teal};
          color: white;
          border-color: ${PALETTE.teal};
        }
        .bilingual-copy { display: grid; gap: 8px; }
        .lang-en { display: block; }
        .lang-zh { display: block; color: ${PALETTE.inkSoft}; }
        .appendix-stack h4 {
          margin: 0 0 6px;
          font-size: 14px;
        }
        @media (max-width: 1200px) {
          .hero-grid,
          .ecosystem-grid,
          .sticky-grid,
          .timeline-wrap,
          .metric-grid,
          .financial-grid,
          .signal-grid,
          .tags-grid,
          .three-col,
          .four-col,
          .two-col,
          .compare-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .advantage-row {
            grid-template-columns: 1.15fr 0.75fr 0.75fr;
          }
          .advantage-row .note { grid-column: 1 / -1; }
        }
        @media (max-width: 820px) {
          .page-shell { width: min(100vw - 18px, 100%); padding-top: 14px; }
          .hero { padding: 18px; border-radius: 22px; }
          .hero-grid,
          .sticky-grid,
          .ecosystem-grid,
          .timeline-wrap,
          .metric-grid,
          .financial-grid,
          .signal-grid,
          .tags-grid,
          .three-col,
          .four-col,
          .two-col,
          .compare-grid,
          .advantage-row {
            grid-template-columns: 1fr;
          }
          .topbar { flex-direction: column; align-items: stretch; }
          .sticky-summary { position: static; }
          .section-nav { margin-top: 16px; }
          .metric-card { min-height: 120px; }
          .timeline-card { min-height: auto; }
          .lang-switch { right: 12px; bottom: 12px; }
        }
      `}</style>

      <div className="page-shell">
        <div className="topbar">
          <div className="meta-row">
            <span className="meta-pill"><Icon name="book" size={14} color={PALETTE.teal} /><T mode={mode} en="Course: INNO6230 Platform Innovation" zh="課程：INNO6230 Platform Innovation" /></span>
            <span className="meta-pill"><Icon name="layers" size={14} color={PALETTE.teal} /><T mode={mode} en="Module III: Strategic Maneuvering in a Competitive Marketplace" zh="模組 III：競爭市場中的策略機動" /></span>
            <span className="meta-pill"><Icon name="target" size={14} color={PALETTE.teal} /><T mode={mode} en="Case: Uber in China: Driving in the Gray Zone" zh="個案：Uber in China: Driving in the Gray Zone" /></span>
          </div>
          <div className="scope-row">
            <span className="meta-pill"><Icon name="clock" size={14} color={PALETTE.plum} /><T mode={mode} en="Case facts mainly 2015 to early 2016" zh="個案事實主要落在 2015 至 2016 年初" /></span>
            <span className="meta-pill"><Icon name="chart" size={14} color={PALETTE.plum} /><T mode={mode} en="Later context separated on purpose" zh="後續脈絡刻意分開處理" /></span>
          </div>
        </div>

        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="hero-badges">
                <span className="hero-badge"><Icon name="globe" size={14} color={PALETTE.teal} /><T mode={mode} en="English first, Chinese optional" zh="以英文為主，中文可切換" /></span>
                <span className="hero-badge"><Icon name="warning" size={14} color={PALETTE.plum} /><T mode={mode} en="Reader facing, not presenter notes" zh="面向讀者，不是向內部匯報" /></span>
                <span className="hero-badge"><Icon name="spark" size={14} color={PALETTE.gold} /><T mode={mode} en="Rebuilt for clarity, hierarchy, and study value" zh="為清楚度、層級與學習效率重新設計" /></span>
              </div>
              <T mode={mode} as="h1" className="hero-title" en="Uber in the China Mainland Market" zh="Uber 在大陸地區市場" />
              <T
                mode={mode}
                as="p"
                className="hero-copy"
                en="This version separates case time facts, later background, and strategic inference. That matters. Many weak summaries blur these layers and accidentally let hindsight answer a 2015 to 2016 question. The page below keeps the chronology clean, upgrades the visual structure, and adds the pieces that most summaries still miss: battle geometry, uncertainty around share figures, the regulation mechanism, and what later Uber performance does and does not prove."
                zh="這個版本刻意把個案時點事實、後續背景與策略推論分開。這件事很重要。很多較弱的整理會把三者混在一起，等於讓後見之明偷偷替 2015 到 2016 的問題作答。以下頁面維持時間順序清楚，同時把視覺結構、閱讀層級與學習效率一起重建，也補進多數摘要仍然漏掉的幾個核心點：戰場幾何、市佔數字的不確定性、監管如何改變競爭，以及 Uber 後續表現究竟能證明甚麼、不能證明甚麼。"
              />
              <div className="section-nav" aria-label="Section navigation">
                {[
                  ["answers", "Answers", "結論"],
                  ["market", "Why China mattered", "市場重要性"],
                  ["battlefield", "Battlefield", "戰場"],
                  ["strengths", "Uber got right", "Uber 做對"],
                  ["gaps", "Structural gaps", "結構落差"],
                  ["didi", "Why Didi stronger", "滴滴較強"],
                  ["regulation", "Regulation", "監管"],
                  ["finance", "Financial picture", "財務"],
                  ["appendix", "Appendix", "附錄"],
                ].map(([id, en, zh]) => (
                  <a key={id} href={`#${id}`}>
                    <T mode={mode} en={en} zh={zh} />
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-right">
              <div className="summary-card">
                <h3><T mode={mode} en="Q1. Could Uber compete and succeed?" zh="Q1. Uber 能否在大陸市場競爭並成功？" /></h3>
                <T
                  mode={mode}
                  as="p"
                  en="Compete, yes. Win independently in the long run, probably not. Uber proved it could gain traction. The harder claim is durable victory against a rival with denser local networks, broader services, stronger complement ecosystems, and a better regulatory position."
                  zh="能競爭，答案是可以。若問能否獨立長期勝出，我會偏向不樂觀。Uber 已證明自己能拿到 traction，但真正較難成立的是，在對手擁有更密的地方網路、更廣的服務、更強的補充生態系與更有利的監管位置下，仍能持久反超。"
                />
                <div className="verdict"><Icon name="scales" size={14} color={PALETTE.teal} /><T mode={mode} en="Best short verdict: meaningful traction, weak odds of independent long run victory" zh="最穩短結論：有實質 traction，但獨立長期勝算偏弱" /></div>
              </div>
              <div className="summary-card">
                <h3><T mode={mode} en="Q2. Did Uber need China's scale?" zh="Q2. Uber 是否需要大陸市場的規模？" /></h3>
                <T
                  mode={mode}
                  as="p"
                  en="At the case moment, the mainland looked close to essential. It was the biggest urban mobility prize and a critical narrative asset in the global platform war. But later results weaken the stronger claim. Uber survived and grew without direct operating control of the mainland market."
                  zh="站在個案當下，大陸地區看起來幾乎接近不可或缺。它是全球最大都市移動獎品，也是全球平臺戰裡的重要敘事資產。但後續結果會削弱更強的說法：Uber 最終在沒有直接控制大陸營運的情況下，仍然存活且持續成長。"
                />
                <div className="verdict"><Icon name="chart" size={14} color={PALETTE.plum} /><T mode={mode} en="Best framing: strategically central at the time, not ultimately required for survival" zh="最穩定說法：當時策略上高度核心，但最終不是存活必要條件" /></div>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky-summary">
          <div className="sticky-grid">
            <div className="sticky-cell">
              <div className="sticky-label"><Icon name="layers" size={14} color={PALETTE.teal} /><T mode={mode} en="Time layers" zh="時間層" /></div>
              <div className="sticky-main"><T mode={mode} en="Case facts, supplementary facts, strategic inference, post case context" zh="個案事實、補充事實、策略推論、個案後脈絡" /></div>
              <div className="sticky-sub"><T mode={mode} en="Do not let later outcomes answer the earlier strategic question by accident." zh="不要讓後續結果不小心替前面那道策略題作答。" /></div>
            </div>
            <div className="sticky-cell">
              <div className="sticky-label"><Icon name="target" size={14} color={PALETTE.plum} /><T mode={mode} en="Core mechanism" zh="核心機制" /></div>
              <div className="sticky-main"><T mode={mode} en="Local network effects + ecosystem complements + regulation" zh="地方網路效應 + 生態系補充資源 + 監管" /></div>
              <div className="sticky-sub"><T mode={mode} en="This was not a pure product quality fight. It was a system fight." zh="這不是單純產品品質對決，而是整套系統對決。" /></div>
            </div>
            <div className="sticky-cell">
              <div className="sticky-label"><Icon name="warning" size={14} color={PALETTE.red} /><T mode={mode} en="What many summaries miss" zh="常被漏掉的點" /></div>
              <div className="sticky-main"><T mode={mode} en="Share estimates vary by segment. Subsidy numbers are not always defined the same way. Both issues change interpretation." zh="市佔估計受分母影響。補貼數字也未必採相同定義。這兩件事都會改變解讀。" /></div>
            </div>
          </div>
        </div>

        <main className="content-grid">
          <section id="answers">
            <SectionHeading
              mode={mode}
              icon="scales"
              eyebrowEn="Answers first"
              eyebrowZh="先講結論"
              titleEn="What the evidence most strongly supports"
              titleZh="證據最穩定支持的答案"
              introEn="This page intentionally answers the two study questions in a way that is precise about what Uber could do, what it probably could not do, and why the distinction matters."
              introZh="這裡刻意把兩道題目分開回答，並清楚界定 Uber 做得到甚麼、做不到甚麼，以及這個區別為甚麼重要。"
            />
            <div className="compare-grid">
              <div className="compare-card">
                <h3><T mode={mode} en="Short answer on competition" zh="關於競爭的短答案" /></h3>
                <ul>
                  <li><T mode={mode} en="Uber clearly could enter, localize, subsidize, recruit, and grow." zh="Uber 明確有能力進場、在地化、補貼、招募，並快速成長。" /></li>
                  <li><T mode={mode} en="That does not automatically imply a durable independent win." zh="但這不會自動推出它能獨立長期勝出。" /></li>
                  <li><T mode={mode} en="The stronger side of the evidence still favors Didi-Kuaidi on local density, complement power, service breadth, and local legitimacy." zh="若看證據整體權重，滴滴快的在地方密度、補充資源力量、服務廣度與本地正當性上仍較有利。" /></li>
                </ul>
                <p className="compare-note"><T mode={mode} en="Bottom line: Uber proved competitive viability, not decisive long run superiority." zh="底線：Uber 證明了可競爭性，但沒有穩穩證明長期優勢。" /></p>
              </div>
              <div className="compare-card">
                <h3><T mode={mode} en="Short answer on scale" zh="關於規模的短答案" /></h3>
                <ul>
                  <li><T mode={mode} en="At the time, the mainland market looked strategically central because of scale, data intensity, and investor narrative." zh="在當時，大陸市場因規模、數據密度與投資人敘事而顯得高度核心。" /></li>
                  <li><T mode={mode} en="Later evidence weakens the claim that direct mainland control was necessary for company survival." zh="但後續證據削弱了「必須直接控制大陸營運才有辦法存活」這種更強說法。" /></li>
                  <li><T mode={mode} en="A more careful answer is that China mattered enormously for ambition and positioning, but not necessarily for eventual survival." zh="更謹慎的答法是，大陸市場對野心與定位非常重要，但未必是最終存活的必要條件。" /></li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading
              mode={mode}
              icon="layers"
              eyebrowEn="Method"
              eyebrowZh="方法"
              titleEn="Evidence tags and why they matter"
              titleZh="證據標記，以及它們為甚麼重要"
              introEn="The most common analytical mistake in this case is mixing raw case facts, later company outcomes, and strategic judgment as if they were all the same kind of evidence."
              introZh="這個個案最常見的分析錯誤，就是把個案原始事實、後續公司結果與策略判斷混在一起，當成同一種證據來用。"
            />
            <div className="tags-grid">
              {[
                {
                  nameEn: "[CASE FACT]",
                  nameZh: "[CASE FACT]",
                  bodyEn: "Explicitly stated in the HBS case. Mostly 2015 to early 2016.",
                  bodyZh: "HBS 個案內明文陳述，主要落在 2015 到 2016 年初。",
                },
                {
                  nameEn: "[SUPPLEMENTARY FACT]",
                  nameZh: "[SUPPLEMENTARY FACT]",
                  bodyEn: "From the background packet on later revenue, users, costs, and global footprint.",
                  bodyZh: "來自後續背景檔，主要補足營收、使用者、成本與全球版圖。",
                },
                {
                  nameEn: "[STRATEGIC INFERENCE]",
                  nameZh: "[STRATEGIC INFERENCE]",
                  bodyEn: "A reasoned judgment using the facts plus Boudreau's platform frameworks.",
                  bodyZh: "根據事實並結合 Boudreau 平臺框架所做的推論。",
                },
                {
                  nameEn: "[POST CASE]",
                  nameZh: "[POST CASE]",
                  bodyEn: "Later events that help with hindsight, but should not be allowed to rewrite the original decision context.",
                  bodyZh: "個案之後發生的事，可作為後見之明背景，但不該直接改寫原本決策時點。",
                },
              ].map((tag) => (
                <div className="tag-card" key={tag.nameEn}>
                  <strong><T mode={mode} en={tag.nameEn} zh={tag.nameZh} /></strong>
                  <p><T mode={mode} en={tag.bodyEn} zh={tag.bodyZh} /></p>
                </div>
              ))}
            </div>
          </section>

          <section id="market">
            <SectionHeading
              mode={mode}
              icon="globe"
              eyebrowEn="Scale of opportunity"
              eyebrowZh="市場規模"
              titleEn="Why the mainland market mattered so much"
              titleZh="為甚麼大陸市場這麼重要"
              introEn="This was not just another foreign expansion. It was the largest urban mobility test in the world, and therefore a major exam of whether Uber's platform model could survive the hardest local platform war."
              introZh="這不是普通海外擴張，而是全球最大的都市移動測試場。也因此，它成為 Uber 平臺模式能否撐過最艱難地方平臺戰的重要考場。"
            />
            <div className="metric-grid">
              {marketStats.map((s) => (
                <div className="metric-card" key={s.labelEn}>
                  <div className="metric-value"><T mode={mode} en={s.valueEn} zh={s.valueZh} /></div>
                  <div className="metric-label"><T mode={mode} en={s.labelEn} zh={s.labelZh} /></div>
                </div>
              ))}
            </div>
            <p className="source-note"><T mode={mode} en="Source: HBS case narrative and setup pages. These are case time scale signals, not later hindsight data." zh="資料來源：HBS 個案開場與正文敘述。這些都是個案時點的規模訊號，不是後見之明資料。" /></p>
          </section>

          <section>
            <SectionHeading
              mode={mode}
              icon="clock"
              eyebrowEn="Chronology"
              eyebrowZh="時間線"
              titleEn="What changed, in what order"
              titleZh="關鍵變化是依甚麼順序發生的"
              introEn="The timing matters because Uber's challenge was not static. Local consolidation, ecosystem blocking, and regulatory tightening kept raising the bar while Uber was still trying to scale."
              introZh="時間順序很重要，因為 Uber 面對的不是靜態局面。當它還在擴張時，本土整併、流量封鎖與監管收緊都在同步拉高門檻。"
            />
            <div className="timeline-wrap">
              {timeline.map((item) => (
                <div className="timeline-card" key={item.year}>
                  <div className="timeline-year">{item.year}</div>
                  <p><T mode={mode} en={item.en} zh={item.zh} /></p>
                </div>
              ))}
            </div>
          </section>

          <section id="battlefield">
            <SectionHeading
              mode={mode}
              icon="map"
              eyebrowEn="Battlefield geometry"
              eyebrowZh="戰場幾何"
              titleEn="A denser battlefield map: who was connected to whom, and through what channel"
              titleZh="更高密度的戰場圖：誰與誰相連，又是透過哪一條通道"
              introEn="The most common weakness in case summaries is under-drawing the system. Uber was not just facing a rival app. It was facing a locally denser platform bloc wired into capital, traffic, payments, maps, and regulation at the same time."
              introZh="個案摘要最常見的弱點，就是把整個系統畫得太薄。Uber 對上的不是單一競品 App，而是一個同時連上資本、流量、支付、地圖與監管的本地高密度平臺集團。"
            />
            <BattlefieldAtlas mode={mode} />
            <div className="two-col" style={{ marginTop: 16 }}>
              <div className="panel">
                <h3 className="subhead"><Icon name="layers" size={16} color={PALETTE.teal} /><T mode={mode} en="How to read the battle correctly" zh="如何正確讀這場戰爭" /></h3>
                <ul className="bullet-list">
                  <li><T mode={mode} en="Do not reduce the story to subsidies alone. Subsidies accelerated takeoff, but the war was decided by whether activity could harden into durable structure." zh="不要把故事縮成補貼而已。補貼確實能加速起飛，但勝負其實取決於活動能否沉澱成耐久結構。" /></li>
                  <li><T mode={mode} en="Do not treat maps, payments, and traffic as cosmetic complements. In ride hailing they are part of value delivery and adoption friction." zh="不要把地圖、支付與流量視為裝飾性補充資源。在叫車場景裡，它們本來就是價值傳遞與採用摩擦的一部分。" /></li>
                  <li><T mode={mode} en="Do not treat regulation as external background. In this case it functioned as a mechanism that could freeze local incumbency into law." zh="也不要把監管當成外部背景音。在這個個案裡，它更像是一個能把本地在位優勢直接鎖進法律裡的機制。" /></li>
                </ul>
              </div>
              <CityNetworkFigure mode={mode} />
            </div>
          </section>
          <section id="strengths">
            <SectionHeading
              mode={mode}
              icon="spark"
              eyebrowEn="What Uber got right"
              eyebrowZh="Uber 做對的地方"
              titleEn="Uber localized more seriously than casual summaries admit"
              titleZh="Uber 的在地化比一般簡化說法更扎實"
              introEn="A stronger analysis should not reduce Uber to a naive foreign entrant. The company did several difficult things well. The problem is that doing some hard things right is not the same as building a fully sufficient local system."
              introZh="較好的分析不該把 Uber 簡化成天真的外商闖入者。它其實做對了不少難事。只是，做對若干難事，仍然不等於已經建好一套對大陸地區足夠完整的本地系統。"
            />
            <div className="two-col">
              <div className="panel">
                <h3><T mode={mode} en="Operational moves that mattered" zh="有意義的營運動作" /></h3>
                <ul className="bullet-list">
                  <li><T mode={mode} en="Entered in 2013 and piloted before broader launch. This was not an impulsive one week entry." zh="2013 年就先進場與試點，不是一時衝動的短線進入。" /></li>
                  <li><T mode={mode} en="Added Alipay and replaced weak Google Maps coverage with a Baidu Maps partnership." zh="加入支付寶，並把覆蓋不足的 Google 地圖換成百度地圖合作。" /></li>
                  <li><T mode={mode} en="Placed servers inside the mainland, which matters for responsiveness and compliance." zh="把伺服器設在大陸境內，這對反應速度與合規都重要。" /></li>
                  <li><T mode={mode} en="Launched People's Uber, cut commissions, and used local language cues to reduce foreignness." zh="推出人民優步、免抽成，並使用在地化語言包裝來降低外來感。" /></li>
                  <li><T mode={mode} en="Built meaningful local traction in cities such as Chengdu and Guangzhou." zh="在成都、廣州等城市拿到相當實質的本地 traction。" /></li>
                </ul>
              </div>
              <div className="panel">
                <h3><T mode={mode} en="But the core limitation remained" zh="但核心限制仍然存在" /></h3>
                <ul className="bullet-list">
                  <li><T mode={mode} en="The localization looked city by city and tactical, not yet like a fully coherent mainland operating system." zh="這些在地化更像逐城市、逐問題修補，而不是一套完整一致的大陸營運系統。" /></li>
                  <li><T mode={mode} en="Uber still had narrower service scope and thinner local complement power." zh="Uber 的服務線仍較窄，本地補充資源力量也較薄。" /></li>
                  <li><T mode={mode} en="The company could buy activity, but not instantly buy legitimacy, deep taxi ties, or institutional trust." zh="它可以花錢買活動，但不能立刻買到制度正當性、深度計程車關係或制度信任。" /></li>
                </ul>
              </div>
            </div>
          </section>

          <section id="gaps">
            <SectionHeading
              mode={mode}
              icon="route"
              eyebrowEn="Structural weakness"
              eyebrowZh="結構弱點"
              titleEn="Where Uber was still structurally weaker"
              titleZh="Uber 結構上仍然較弱的地方"
              introEn="Using Boudreau's logic, the weakness was not just demand. It was value delivery and value capture. Several pieces that seemed routine in the U.S. did not transfer cleanly into the mainland environment."
              introZh="用 Boudreau 的邏輯來看，弱點不只是需求端，而是價值傳遞與價值擷取。很多在美國看似理所當然的做法，到了大陸環境就無法順暢轉移。"
            />
            <div className="signal-grid">
              <div className="signal-card">
                <h3><T mode={mode} en="1. Value delivery gap" zh="1. 價值傳遞落差" /></h3>
                <p><T mode={mode} en="Credit card usage was less universal, Google Maps was weak, and the market already expected broader service coverage. This made Uber's original operating model less natural than in the U.S." zh="信用卡普及度不足、Google 地圖弱、而且市場本來就期待更廣的服務範圍。這使 Uber 原本的營運模型在大陸地區不像在美國那樣自然。" /></p>
                <div className="impact"><T mode={mode} en="Effect: product quality alone could not close the gap" zh="效果：只靠產品品質難以補齊缺口" /></div>
              </div>
              <div className="signal-card">
                <h3><T mode={mode} en="2. Local network effects" zh="2. 地方性網路效應" /></h3>
                <p><T mode={mode} en="Drivers in Chengdu do not shorten wait times in Shanghai. Global app scale helps funding and learning, but match quality is still won or lost city by city." zh="成都的司機不會縮短上海的等待時間。全球規模可以幫助融資與學習，但配對品質仍是逐城市決勝。" /></p>
                <div className="impact"><T mode={mode} en="Effect: global scale was supportive, not decisive" zh="效果：全球規模是支援因素，不是決定因素" /></div>
              </div>
              <div className="signal-card">
                <h3><T mode={mode} en="3. Subsidies distorted the signal" zh="3. 補貼扭曲訊號" /></h3>
                <p><T mode={mode} en="Subsidies accelerated takeoff, but reported activity was partially corrupted by fake trips and gaming. Apparent volume therefore overstated true platform strength." zh="補貼確實加速起飛，但部份活動被假行程與作弊污染，因此表面量體會高估真正的平臺實力。" /></p>
                <div className="impact"><T mode={mode} en="Effect: growth quality became harder to read" zh="效果：成長品質更難判讀" /></div>
              </div>
            </div>
          </section>

          <section id="didi">
            <SectionHeading
              mode={mode}
              icon="shield"
              eyebrowEn="Relative advantage"
              eyebrowZh="相對優勢"
              titleEn="Why Didi-Kuaidi still looked stronger"
              titleZh="為甚麼滴滴快的整體仍然較強"
              introEn="The best way to organize this is not a vague statement that Didi was just more local. A more disciplined answer is that Didi had a stronger portfolio of advantages across local scale, incumbency, complements, and native operating design."
              introZh="較好的整理方式，不是籠統說滴滴只是比較本土，而是更有紀律地指出：它在地方規模、在位者優勢、補充資源，以及原生營運設計上，都握有較強的優勢組合。"
            />
            <div className="table-card">
              <h3><T mode={mode} en="Evidence weighted comparison, qualitative not numeric" zh="證據權重式比較，屬質性而非精算" /></h3>
              <div className="advantage-table">
                {advantageRows.map((row) => (
                  <div className="advantage-row" key={row.dimensionEn}>
                    <div className="label"><T mode={mode} en={row.dimensionEn} zh={row.dimensionZh} /></div>
                    <div className="qual-wrap">
                      <div className="qual-title">Uber</div>
                      <QualBar value={row.uber} color={PALETTE.teal} />
                    </div>
                    <div className="qual-wrap">
                      <div className="qual-title">Didi</div>
                      <QualBar value={row.didi} color={PALETTE.didi} />
                    </div>
                    <div className="note"><p><T mode={mode} en={row.noteEn} zh={row.noteZh} /></p></div>
                  </div>
                ))}
              </div>
              <p className="source-note"><T mode={mode} en="Interpretive comparison based on the HBS case plus Boudreau's value capture taxonomy: positive feedback, incumbency, and strategic agility." zh="此比較依據 HBS 個案，並結合 Boudreau 對正回饋、在位者優勢與策略彈性的價值擷取框架。" /></p>
            </div>
          </section>

          <section id="regulation">
            <SectionHeading
              mode={mode}
              icon="warning"
              eyebrowEn="Regulation as a weapon"
              eyebrowZh="監管作為武器"
              titleEn="The draft rules threatened Uber's main instruments of competition"
              titleZh="法規草案直接打向 Uber 最重要的競爭工具"
              introEn="This is the section that often deserves more weight than it gets. The draft rules did not merely create generic uncertainty. They targeted the exact mechanisms Uber relied on most."
              introZh="這一段通常應該比一般整理得到更高權重。草案不是只帶來抽象不確定性，而是直接瞄準 Uber 最依賴的競爭機制。"
            />
            <div className="three-col">
              <div className="signal-card">
                <h3><T mode={mode} en="Pricing" zh="定價" /></h3>
                <p><T mode={mode} en="The draft required explicit fares and prohibited below cost competition. That strikes at surge pricing flexibility and extreme subsidy warfare." zh="草案要求明確費率，並禁止低於成本競爭。這會直接壓縮動態定價彈性與極端補貼戰。" /></p>
                <div className="impact"><T mode={mode} en="Translation: Uber loses one of its fastest tactical levers" zh="換句話說：Uber 失去一項最快速的戰術槓桿" /></div>
              </div>
              <div className="signal-card">
                <h3><T mode={mode} en="Labor model" zh="勞動模式" /></h3>
                <p><T mode={mode} en="The rules pointed toward formal contracts, training, and insurance obligations. That weakens the contractor style flexibility that helped Uber scale." zh="草案要求正式合同、培訓與保險義務，會削弱 Uber 原本依賴的承攬式彈性。" /></p>
                <div className="impact"><T mode={mode} en="Translation: the model gets heavier and less flexible" zh="換句話說：模式更重、更不靈活" /></div>
              </div>
              <div className="signal-card">
                <h3><T mode={mode} en="Multi homing" zh="多棲" /></h3>
                <p><T mode={mode} en="A one platform vehicle rule would freeze supply affiliation. If drivers cannot multi home, local incumbency becomes much harder to dislodge." zh="單一平臺車輛規定會把供給歸屬固定下來。若司機不能多棲，地方在位者優勢就更難被打破。" /></p>
                <div className="impact"><T mode={mode} en="Translation: local lead can harden into institutional moat" zh="換句話說：地方領先有機會硬化為制度護城河" /></div>
              </div>
            </div>
          </section>

          <section id="finance">
            <SectionHeading
              mode={mode}
              icon="dollar"
              eyebrowEn="Financial view"
              eyebrowZh="財務視角"
              titleEn="What later numbers change, and what they do not change"
              titleZh="後續數字會改變甚麼，又不會改變甚麼"
              introEn="Later financial data are useful, but only if used carefully. They do not erase the original intensity of the mainland battle. They do, however, change how strong a claim we can make about China being necessary for Uber's survival."
              introZh="後續財務資料有用，但必須小心使用。它們不會抹去大陸戰役原本的強度，卻會改變我們對「大陸市場是否為 Uber 生存必要條件」的判斷強度。"
            />
            <div className="two-col">
              <RevenueChart mode={mode} />
              <div className="financial-grid">
                <div className="financial-card">
                  <strong><T mode={mode} en="Case time burn" zh="個案時點燒錢" /></strong>
                  <p><T mode={mode} en="Kalanick acknowledged more than $1B in annual mainland losses. Didi was also losing heavily. This was a concentrated platform war, not a cheap experiment." zh="Kalanick 承認 Uber 在大陸一年虧損超過 10 億美元。滴滴也同樣大幅虧損。這是高度集中的平臺戰，不是低成本試驗。" /></p>
                </div>
                <div className="financial-card">
                  <strong><T mode={mode} en="Operating milestone" zh="營業里程碑" /></strong>
                  <p><T mode={mode} en="Uber later reported about $326M of operating income in Q2 2023. That does not prove China never mattered. It does show direct mainland control was not required for eventual operating profitability." zh="Uber 後來在 2023 年 Q2 出現約 3.26 億美元營業利益。這不代表大陸市場從來不重要，但的確顯示直接控制大陸營運並非最終營業獲利的必要條件。" /></p>
                </div>
                <div className="financial-card">
                  <strong><T mode={mode} en="Cost structure lesson" zh="成本結構啟示" /></strong>
                  <p><T mode={mode} en="Later profitability improvement appears more related to lower sales and marketing and R&D ratios than to lower cost of goods sold. The lesson is discipline and leverage, not a magical low marginal cost story." zh="後續獲利改善，看起來更像是 S&M 與 R&D 佔比下降，而不是 COGS 自動變低。關鍵是紀律與營運槓桿，不是神奇的低邊際成本故事。" /></p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading
              mode={mode}
              icon="warning"
              eyebrowEn="Common misreads"
              eyebrowZh="常見誤讀"
              titleEn="What was missing or still too loose in the original draft"
              titleZh="原始版本裡仍然偏鬆或偏缺的地方"
              introEn="The original writeup was already strong. The main upgrade was not to replace it, but to tighten a few places where ambiguity or missing structure could still mislead the reader."
              introZh="原本的整理其實已經很強。真正需要升級的，不是推翻重寫，而是把幾個仍可能誤導讀者的模糊點與結構缺口補齊。"
            />
            <div className="three-col">
              <div className="market-card">
                <h3><T mode={mode} en="1. Share figures needed a warning label" zh="1. 市佔數字需要警示標籤" /></h3>
                <p><T mode={mode} en="Didi's 80 percent claim, Uber's 30 percent optimism, and outside estimates around 11.5 percent may refer to different market slices. A reader needs to know that these numbers are not directly interchangeable." zh="滴滴的 80%、Uber 樂觀估計的 30%，以及外部約 11.5% 的估計，可能對應不同市場切片。讀者需要知道，這些數字不能直接互換。" /></p>
              </div>
              <div className="market-card">
                <h3><T mode={mode} en="2. Subsidy figures needed interpretive care" zh="2. 補貼數字需要更細的解讀" /></h3>
                <p><T mode={mode} en="The phrase 'three times the fare' and the phrase '130 percent subsidy' are related but not identical claims. A stronger version explains that the measurement base and the campaign moment likely differ." zh="「司機可拿到車資三倍」與「補貼高達車資 130%」是相關但不同的說法。更好的版本應主動提醒，計算基礎與促銷時點可能不同。" /></p>
              </div>
              <div className="market-card">
                <h3><T mode={mode} en="3. Later success required separation, not silence" zh="3. 後續成功不是不能提，而是要分層處理" /></h3>
                <p><T mode={mode} en="Later Uber growth is useful because it changes the second question. The fix was to separate it cleanly from the case time logic, not to delete it." zh="Uber 後續成長其實很有用，因為它會改變第二題答案。真正的修正方式不是刪掉，而是與個案時點邏輯清楚分層。" /></p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading
              mode={mode}
              icon="book"
              eyebrowEn="Exhibit anchors"
              eyebrowZh="附件錨點"
              titleEn="Which exhibits do the most work"
              titleZh="真正最有用的附件在哪裡"
              introEn="A better study page should not just summarize. It should tell the reader where to look when they want to pressure test a claim."
              introZh="較好的學習頁面，不只是在做摘要，也要告訴讀者若要檢驗說法，應該回看哪些附件。"
            />
            <div className="three-col">
              {exhibitCards.map((card) => (
                <div className="market-card" key={card.titleEn}>
                  <h3><T mode={mode} en={card.titleEn} zh={card.titleZh} /></h3>
                  <p><T mode={mode} en={card.bodyEn} zh={card.bodyZh} /></p>
                </div>
              ))}
            </div>
          </section>

          <section id="appendix">
            <SectionHeading
              mode={mode}
              icon="book"
              eyebrowEn="Appendix"
              eyebrowZh="附錄"
              titleEn="Reader tools kept compact"
              titleZh="保留內容，但用更輕的方式收起來"
              introEn="The original content included useful oral answers and framing notes. Instead of deleting them, they are kept below in collapsible form so the main page stays readable."
              introZh="原始內容裡有幾個很有用的口頭答法與框架提醒。這裡不是刪掉它們，而是把它們收進可展開區塊，讓主頁面更好讀。"
            />
            {appendices.map((item) => (
              <details key={item.summaryEn} className="appendix-card">
                <summary>
                  <T mode={mode} en={item.summaryEn} zh={item.summaryZh} />
                  <span className="details-arrow">›</span>
                </summary>
                {mode === "en" ? item.contentEn : mode === "zh" ? item.contentZh : (
                  <div className="appendix-stack">
                    <div>{item.contentEn}</div>
                    <div>{item.contentZh}</div>
                  </div>
                )}
              </details>
            ))}
          </section>
        </main>

        <div className="footer-note">
          <T
            mode={mode}
            en="Source basis used to build this page: HBS case, More Uber Background, and Boudreau course notes on value creation, value delivery, value capture, and platform competition. Post case context is included only where it changes the interpretation of the second study question."
            zh="本頁主要依據：HBS 個案、More Uber Background，以及 Boudreau 關於價值創造、價值傳遞、價值擷取與平臺競爭的講義。個案後脈絡只在會改變第二題解讀時才納入。"
          />
        </div>
      </div>

      <FloatingLanguageSwitch mode={mode} setMode={setMode} />
    </div>
  );
}
