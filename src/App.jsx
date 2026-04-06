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



function BattlefieldControlPanel({ mode }) {
  const [layer, setLayer] = useState("all");
  const [focus, setFocus] = useState("didi");
  const [lens, setLens] = useState("overview");
  const [eventIdx, setEventIdx] = useState(3);

  const layerOptions = [
    { key: "all", en: "All channels", zh: "全部通道" },
    { key: "capital", en: "Capital", zh: "資本" },
    { key: "distribution", en: "Social distribution", zh: "社交流量" },
    { key: "payments", en: "Payments", zh: "支付" },
    { key: "maps", en: "Maps and search", zh: "地圖與搜尋" },
    { key: "regulation", en: "Regulation", zh: "監管" },
    { key: "alliances", en: "Alliances", zh: "聯盟" },
  ];

  const lensOptions = [
    { key: "overview", en: "Overview", zh: "總覽" },
    { key: "timeline", en: "Timeline", zh: "時間線" },
    { key: "regulation", en: "Draft rules", zh: "法規草案" },
    { key: "subsidies", en: "Subsidies and fraud", zh: "補貼與詐欺" },
    { key: "share", en: "Market share", zh: "市佔率" },
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
    { from: "uber", to: "didi", type: "rivalry", labelEn: "core ride hailing war", labelZh: "叫車主戰場", lx: 382, ly: 234, curveX: 0, curveY: -72 },
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

  const focusDetails = {
    uber: {
      titleEn: "Uber",
      titleZh: "Uber",
      roleEn: "Serious entrant, but structurally thinner local system.",
      roleZh: "有實力的進入者，但本地系統仍較薄。",
      bulletsEn: [
        "Localized meaningfully: Alipay, Baidu Maps, local servers, People's Uber, and fast city expansion.",
        "Still narrower than Didi on service breadth and local ecosystem embed.",
        "Could buy activity faster than it could buy legitimacy or policy alignment.",
      ],
      bulletsZh: [
        "在地化其實不弱，包括支付寶、百度地圖、境內伺服器、人民優步與快速擴城。",
        "但在服務廣度與本地生態系嵌入上，仍然比滴滴更薄。",
        "可以較快買到活動量，但買不到同速度的制度正當性與政策對位。",
      ],
    },
    didi: {
      titleEn: "Didi-Kuaidi",
      titleZh: "滴滴快的",
      roleEn: "Local bloc with density, breadth, and institutional embed.",
      roleZh: "同時掌握密度、廣度與制度嵌入的本地集團。",
      bulletsEn: [
        "The merger reduced local self-cannibalization and concentrated density city by city.",
        "The service stack was broader and more locally complete from the start.",
        "Its edge was bundled, not singular: density, complements, permits, and familiarity together.",
      ],
      bulletsZh: [
        "合併把原先本地雙雄彼此內耗的問題壓下去，也讓地方密度更集中。",
        "服務堆疊一開始就更廣，也更完整地貼近本地需求。",
        "它的優勢不是單點，而是密度、補充資源、許可與熟悉度一起形成的組合。",
      ],
    },
    tencent: {
      titleEn: "Tencent",
      titleZh: "騰訊",
      roleEn: "Capital plus a habit rail through WeChat.",
      roleZh: "不只是資本，更透過微信掌握高頻使用通道。",
      bulletsEn: [
        "WeChat was a distribution rail, not just a media channel.",
        "Blocking Uber-related accounts mattered because discovery and repeat use matter in ride hailing.",
        "This is why the contest was partly platform versus platform.",
      ],
      bulletsZh: [
        "微信是使用通道，不只是宣傳媒體。",
        "封鎖 Uber 相關帳號會有感，因為叫車高度依賴發現、轉換與再次使用。",
        "也因此，這場戰爭一部分其實是平臺對平臺。",
      ],
    },
    alibaba: {
      titleEn: "Alibaba",
      titleZh: "阿里巴巴",
      roleEn: "Payment power and backing on the Kuaidi side.",
      roleZh: "在快的一側提供資本與支付力量。",
      bulletsEn: [
        "Payment convenience is part of value delivery, not a trivial back-office feature.",
        "The local bloc drew strength from more than one giant, which made it harder to dislodge.",
        "Even after the merger, the payment rail still shaped adoption and retention.",
      ],
      bulletsZh: [
        "支付便利本身就是價值傳遞的一部分，不是後台小細節。",
        "本地集團不是只靠單一巨頭，這讓外部挑戰更難。",
        "即使合併之後，支付通道仍然直接影響採用與留存。",
      ],
    },
    baidu: {
      titleEn: "Baidu",
      titleZh: "百度",
      roleEn: "Meaningful ally for Uber, but not enough by itself.",
      roleZh: "對 Uber 很重要，但單靠它仍然不夠。",
      bulletsEn: [
        "Baidu gave Uber capital, search adjacency, and a local map fix when Google Maps was weak.",
        "That helped viability, but did not close the distribution and payment gap to the local bloc.",
        "This is why maps should not be overstated into a decisive moat story.",
      ],
      bulletsZh: [
        "百度替 Uber 補上資本、搜尋相鄰性，以及在 Google 地圖較弱時的本地地圖修補。",
        "這提高了可行性，但仍不足以補齊分發與支付的落差。",
        "所以地圖不能被誇大成單一決定性護城河。",
      ],
    },
  };

  const timelineEvents = [
    {
      dateEn: "2013",
      dateZh: "2013 年",
      titleEn: "Uber established its Shanghai base",
      titleZh: "Uber 在上海建立據點",
      bodyEn: "This was a serious commitment signal. Uber treated the mainland as a major strategic expansion, not a token foreign outpost.",
      bodyZh: "這是明確的投入訊號。Uber 把大陸地區當成重大戰略擴張，而不是象徵性的海外據點。",
      chipsEn: ["entry", "capital"],
      chipsZh: ["進場", "資本"],
      impactEn: "Starting early helped, but early entry alone did not create durable local density.",
      impactZh: "提早進場有幫助，但早進場本身不會自動變成耐久的地方密度。",
    },
    {
      dateEn: "2014",
      dateZh: "2014 年",
      titleEn: "Uber localized the interface",
      titleZh: "Uber 開始補強在地介面",
      bodyEn: "Limited launch expanded to major cities. Uber added Alipay, later partnered with Baidu Maps, and introduced People's Uber with aggressive pricing support.",
      bodyZh: "有限度上線後擴到主要城市。Uber 加入支付寶，之後與百度地圖合作，並推出人民優步與積極價格支援。",
      chipsEn: ["payments", "maps", "product"],
      chipsZh: ["支付", "地圖", "產品"],
      impactEn: "This narrowed a delivery gap. It did not yet produce a fully local operating system.",
      impactZh: "這確實縮小了價值傳遞落差，但還不足以形成完整的本地營運系統。",
    },
    {
      dateEn: "Feb 2015",
      dateZh: "2015 年 2 月",
      titleEn: "Didi and Kuaidi merged",
      titleZh: "滴滴與快的合併",
      bodyEn: "The merger mattered because it ended wasteful local overlap and concentrated the strongest local network positions into one bloc.",
      bodyZh: "這個合併的關鍵，在於它終止本地雙雄重複燒錢，並把最強的地方網路位置集中到同一集團。",
      chipsEn: ["density", "scale"],
      chipsZh: ["密度", "規模"],
      impactEn: "This raised the bar faster than Uber could comfortably catch up city by city.",
      impactZh: "它把門檻拉高的速度，已經快過 Uber 能夠舒適追趕的速度。",
    },
    {
      dateEn: "Mar to Oct 2015",
      dateZh: "2015 年 3 月到 10 月",
      titleEn: "The ecosystem hardened against Uber",
      titleZh: "生態系開始對 Uber 收緊",
      bodyEn: "Tencent blocked Uber-related WeChat accounts. Chengdu became Uber's top global city, yet Shanghai gave Didi the first iTNC permit. Commercial traction and institutional legitimacy moved in different directions.",
      bodyZh: "騰訊封鎖 Uber 相關微信帳號。成都雖成為 Uber 全球第一城，但上海首張 iTNC 許可證卻給了滴滴。商業 traction 與制度正當性開始往不同方向移動。",
      chipsEn: ["distribution", "permits", "legitimacy"],
      chipsZh: ["流量", "許可", "正當性"],
      impactEn: "This is the pivot point. Uber still had growth, but the structure of the battlefield was turning against it.",
      impactZh: "這是轉折點。Uber 仍有成長，但戰場結構已開始往對它不利的方向轉。",
    },
    {
      dateEn: "Late 2015",
      dateZh: "2015 年底",
      titleEn: "The anti-Uber geometry widened",
      titleZh: "反 Uber 幾何進一步擴大",
      bodyEn: "Didi linked with Lyft, Ola, and Grab. The mainland fight became part of a larger global containment story rather than a local market alone.",
      bodyZh: "滴滴與 Lyft、Ola、Grab 串聯。大陸戰場不再只是地方市場，而成為更大範圍全球圍堵故事的一部分。",
      chipsEn: ["alliances", "global stakes"],
      chipsZh: ["聯盟", "全球賭注"],
      impactEn: "This made losing China feel more dangerous at the time than later hindsight may suggest.",
      impactZh: "這讓當時失去大陸市場看起來比後見之明下更危險。",
    },
    {
      dateEn: "2015 draft rules",
      dateZh: "2015 年法規草案",
      titleEn: "Draft national rules threatened Uber's core tactics",
      titleZh: "全國法規草案直接威脅 Uber 的核心戰術",
      bodyEn: "The draft rules targeted below-cost subsidies, contractor flexibility, surge-like pricing freedom, and multi-homing. These were not side issues. They were core levers of takeoff.",
      bodyZh: "草案直接打到低於成本補貼、承攬彈性、接近動態定價的自由，以及多棲供給。這不是旁支問題，而是起飛期核心槓桿。",
      chipsEn: ["regulation", "pricing", "multi-homing"],
      chipsZh: ["監管", "定價", "多棲"],
      impactEn: "If those rules hardened, Didi's local lead could become law-backed structure.",
      impactZh: "若這些規則落地，滴滴的地方領先就可能直接變成法律支撐的結構。",
    },
    {
      dateEn: "Post case",
      dateZh: "個案之後",
      titleEn: "Uber later kept economics, not operations",
      titleZh: "Uber 後來保留經濟利益，而非直接營運",
      bodyEn: "Uber exited direct mainland operations and held an equity position in Didi instead. Later company revenue still climbed to $31.8B in 2022.",
      bodyZh: "Uber 後來退出直接營運，改持有滴滴股權。之後公司營收仍在 2022 年升至 318 億美元。",
      chipsEn: ["hindsight", "survival"],
      chipsZh: ["後見之明", "存活"],
      impactEn: "This weakens the claim that direct mainland operating control was necessary for survival.",
      impactZh: "這會削弱「必須直接控制大陸營運才能存活」的說法。",
    },
  ];

  const regulationRows = [
    {
      article: "Art. 18",
      ruleEn: "Drivers must hold legal qualifications, receive training, and sign labor contracts.",
      ruleZh: "司機須有合法資格、接受訓練，並簽勞動合同。",
      uberEn: "Hits the contractor model and raises the cost of rapid flexible scaling.",
      uberZh: "直接打到承攬模式，也提高快速彈性擴張的成本。",
      didiEn: "Favors a player already closer to formal local transport relationships.",
      didiZh: "更有利於本來就更靠近本地正式運輸關係的玩家。",
    },
    {
      article: "Art. 20",
      ruleEn: "Prices must be explicit. Below-cost competition is prohibited. Promotions require advance notice.",
      ruleZh: "費率須明確。禁止低於成本競爭。促銷需提前公告。",
      uberEn: "Directly compresses Uber's subsidy weapon and reduces tactical pricing flexibility.",
      uberZh: "直接壓縮 Uber 的補貼武器，也削弱價格戰術彈性。",
      didiEn: "Still painful for everyone, but less painful for the local incumbent with denser network footing.",
      didiZh: "對所有人都痛，但對已具較強地方網路基礎的在位者相對沒那麼痛。",
    },
    {
      article: "Art. 21",
      ruleEn: "Platforms may not hold a dominant market position.",
      ruleZh: "不得形成市場支配地位。",
      uberEn: "Looks neutral on paper, but in practice can constrain late aggressive catch-up once one player is already locally ahead.",
      uberZh: "紙面上中性，但在一方已地方領先時，會限制後進者用激進手段追趕。",
      didiEn: "A complicated article. It could check Didi too, but if enforcement is selective the incumbent may still benefit overall.",
      didiZh: "這條比較複雜，理論上也可能約束滴滴，但若執法不對稱，整體仍可能偏向在位者。",
    },
    {
      article: "Art. 23",
      ruleEn: "A vehicle may affiliate with only one platform.",
      ruleZh: "車輛限單一平臺。",
      uberEn: "This may be the sharpest blow because multi-homing had been helping Uber access supply it did not own.",
      uberZh: "這可能是最致命的一條，因為多棲原本正是 Uber 取得供給的重要方式。",
      didiEn: "Strongly favors the denser incumbent by freezing affiliation around the local leader.",
      didiZh: "會明顯偏向密度更高的在位者，把司機歸屬固定在地方領先者周圍。",
    },
    {
      article: "Art. 24",
      ruleEn: "Drivers must be insured.",
      ruleZh: "司機須有保險。",
      uberEn: "Raises formal compliance cost and reduces the appeal of ultra-fast loose entry.",
      uberZh: "提高正式合規成本，也降低超高速鬆散進場的吸引力。",
      didiEn: "Again easier for the player already closer to formal local structures.",
      didiZh: "對已較接近正式本地結構的玩家來說，同樣更容易承受。",
    },
    {
      article: "Art. 48",
      ruleEn: "Nonprofit carpooling is treated separately.",
      ruleZh: "非營利共乘另行處理。",
      uberEn: "Limits room to hide a commercial model inside a softer ride-sharing label.",
      uberZh: "壓縮把商業模式包裝進較柔性共乘標籤的空間。",
      didiEn: "Helps clarify the regulatory boundary in a way that still favors formalized incumbents.",
      didiZh: "有助於釐清監管邊界，而這種釐清通常仍偏向較制度化的在位者。",
    },
  ];

  const shareViews = [
    {
      labelEn: "Didi claim",
      labelZh: "滴滴主張",
      value: 80,
      tone: PALETTE.didi,
      numberEn: "~80%",
      numberZh: "約 80%",
      noteEn: "This is the strongest local-incumbent framing and likely reflects a broad market definition favorable to Didi.",
      noteZh: "這是最有利於本地在位者的說法，分母大概較廣，也較偏向滴滴的市場定義。",
    },
    {
      labelEn: "Uber optimistic self-view",
      labelZh: "Uber 最樂觀自述",
      value: 30,
      tone: PALETTE.uber,
      numberEn: "~30%",
      numberZh: "約 30%",
      noteEn: "This was not total ride hailing. It was an optimistic private-car ride-hailing framing.",
      noteZh: "這不是整體叫車市場，而是較偏向私家車叫車的樂觀口徑。",
    },
    {
      labelEn: "External estimate",
      labelZh: "外部估計",
      value: 11.5,
      tone: PALETTE.teal,
      numberEn: "~11.5%",
      numberZh: "約 11.5%",
      noteEn: "This is the most conservative figure in the case ecosystem and likely uses a broader denominator.",
      noteZh: "這是個案周邊最保守的數字，也很可能採用更廣的分母。",
    },
  ];

  const overviewMatrix = {
    uber: { density: 2, breadth: 2, complements: 3, regulation: 1, global: 5 },
    didi: { density: 5, breadth: 5, complements: 5, regulation: 5, global: 3 },
    tencent: { density: 2, breadth: 2, complements: 5, regulation: 4, global: 2 },
    alibaba: { density: 2, breadth: 2, complements: 4, regulation: 3, global: 2 },
    baidu: { density: 1, breadth: 1, complements: 3, regulation: 2, global: 2 },
  };

  const matrixColumns = [
    { key: "density", en: "Local density", zh: "地方密度" },
    { key: "breadth", en: "Service breadth", zh: "服務廣度" },
    { key: "complements", en: "Complements", zh: "補充資源" },
    { key: "regulation", en: "Regulatory position", zh: "監管位置" },
    { key: "global", en: "Global leverage", zh: "全球槓桿" },
  ];

  const layerSummary = {
    all: {
      en: "Didi's edge came from stacked channels, not a single magic feature.",
      zh: "滴滴的優勢來自多條通道堆疊，不是單一神奇功能。",
    },
    capital: {
      en: "Capital mattered, but capital alone could not erase local incumbency after consolidation.",
      zh: "資本重要，但整併後單靠資本已不足以抹平本地在位優勢。",
    },
    distribution: {
      en: "WeChat was a usage rail. Blocking mattered because ride hailing is high-frequency and habit-based.",
      zh: "微信是使用通道。封鎖之所以重要，是因為叫車高度高頻且會形成習慣。",
    },
    payments: {
      en: "Payment friction changes conversion and repeat use. Native rails still favored the local bloc.",
      zh: "支付摩擦會改變轉換與回流。原生支付通道仍偏向本地集團。",
    },
    maps: {
      en: "Maps were necessary for usability, but not exclusive enough to become Uber's decisive moat.",
      zh: "地圖對可用性必要，但不夠排他，無法成為 Uber 的決定性護城河。",
    },
    regulation: {
      en: "Regulation could convert temporary lead into durable structure.",
      zh: "監管有可能把暫時領先直接變成耐久結構。",
    },
    alliances: {
      en: "The mainland war sat inside a broader anti-Uber geometry.",
      zh: "大陸戰場其實嵌在更大的反 Uber 幾何裡。",
    },
  };

  const lensSummary = {
    overview: {
      en: "Use the map first, then the matrix. The goal is to see the stacked asymmetry in one glance.",
      zh: "先看地圖，再看矩陣。目標是在一眼內看出疊加後的不對稱。",
    },
    timeline: {
      en: "The order matters. Uber faced a moving target, not a fixed market snapshot.",
      zh: "順序很重要。Uber 面對的是移動中的目標，不是靜態市場快照。",
    },
    regulation: {
      en: "These rules mattered because they threatened Uber's actual operating levers, not symbolic issues.",
      zh: "這些條文重要，是因為它們打到 Uber 的實際操作槓桿，不是象徵性問題。",
    },
    subsidies: {
      en: "Subsidies helped takeoff, but fraud made measured activity harder to trust as proof of durable strength.",
      zh: "補貼有助起飛，但詐欺讓量化活動更難被當成耐久實力的證據。",
    },
    share: {
      en: "The market share story is only readable once you stop pretending all three percentages use the same denominator.",
      zh: "市佔率故事只有在你不再假設三個百分比共用同一個分母時，才真正看得懂。",
    },
  };

  const activeEvent = timelineEvents[eventIdx];
  const activeDetail = focusDetails[focus] || focusDetails.didi;

  const heat = (value) => {
    const alpha = 0.14 + value * 0.12;
    return { background: `rgba(46,92,110,${alpha})`, color: value >= 4 ? "#ffffff" : PALETTE.ink };
  };

  const renderOverview = () => (
    <div className="battle-bottom-card">
      <div className="battle-bottom-head">
        <div>
          <strong><T mode={mode} en="Control room summary" zh="控制台總覽" /></strong>
          <p><T mode={mode} en="The cleanest reading is that Didi's advantage was cumulative. Density, complements, and regulation reinforced one another." zh="最乾淨的讀法是：滴滴的優勢是累積性的。密度、補充資源與監管彼此加強。" /></p>
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
              maps: "地圖",
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
      <div className="battle-matrix-grid control-matrix-grid">
        <div className="battle-head-empty"></div>
        {matrixColumns.map((col) => (
          <div key={col.key} className="battle-col-head"><T mode={mode} en={col.en} zh={col.zh} /></div>
        ))}
        {focusOptions.map((actor) => (
          <React.Fragment key={actor.key}>
            <div className={`battle-row-head ${focus === actor.key ? "active" : ""}`}>{mode === "zh" ? actor.zh : actor.en}</div>
            {matrixColumns.map((col) => {
              const value = overviewMatrix[actor.key][col.key];
              return <div key={`${actor.key}-${col.key}`} className={`battle-cell ${focus === actor.key ? "active" : ""}`} style={heat(value)}>{value}</div>;
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="warning-box">
        <strong><T mode={mode} en="Reader caution" zh="讀者提醒" /></strong>
        <p><T mode={mode} en="Do not collapse the case into one word like network effects. Network density mattered, but so did service scope, complement control, and regulation." zh="不要把這個個案壓成單一詞，例如網路效應。地方密度固然重要，但服務範圍、補充資源控制與監管同樣重要。" /></p>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="battle-bottom-card">
      <div className="battle-bottom-head">
        <div>
          <strong><T mode={mode} en="Strategic timeline" zh="戰略時間線" /></strong>
          <p><T mode={mode} en="Click through the sequence. The battlefield worsened for Uber while Uber was still trying to prove local takeoff." zh="逐步點開順序。當 Uber 還在證明本地起飛時，戰場本身已在同步惡化。" /></p>
        </div>
      </div>
      <div className="event-scrubber">
        {timelineEvents.map((event, idx) => (
          <button key={event.dateEn + event.titleEn} className={`event-pill ${eventIdx === idx ? "active" : ""}`} onClick={() => setEventIdx(idx)}>
            <span>{mode === "zh" ? event.dateZh : event.dateEn}</span>
            <strong>{mode === "zh" ? event.titleZh : event.titleEn}</strong>
          </button>
        ))}
      </div>
      <div className="battle-detail-grid">
        <div className="battle-note-strip">
          <div className="battle-card-kicker"><T mode={mode} en="Selected event" zh="目前事件" /></div>
          <h3>{mode === "zh" ? activeEvent.titleZh : activeEvent.titleEn}</h3>
          <p>{mode === "zh" ? activeEvent.bodyZh : activeEvent.bodyEn}</p>
        </div>
        <div className="battle-note-strip">
          <div className="battle-card-kicker"><T mode={mode} en="Why it changed the battle" zh="它如何改變戰場" /></div>
          <p>{mode === "zh" ? activeEvent.impactZh : activeEvent.impactEn}</p>
          <div className="impact-chip-row">
            {(mode === "zh" ? activeEvent.chipsZh : activeEvent.chipsEn).map((chip) => (
              <span className="impact-chip" key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegulation = () => (
    <div className="battle-bottom-card">
      <div className="battle-bottom-head">
        <div>
          <strong><T mode={mode} en="Draft rules as a competitive mechanism" zh="法規草案如何變成競爭機制" /></strong>
          <p><T mode={mode} en="The key point is not that regulation existed. The key point is where the pressure landed. It landed on Uber's scaling levers." zh="關鍵不只是監管存在，而是壓力落在哪裡。它落在 Uber 的擴張槓桿上。" /></p>
        </div>
      </div>
      <div className="reg-grid">
        {regulationRows.map((row) => (
          <div className="reg-card" key={row.article}>
            <div className="reg-article">{row.article}</div>
            <h4>{mode === "zh" ? row.ruleZh : row.ruleEn}</h4>
            <div className="reg-sides">
              <div>
                <strong>Uber</strong>
                <p>{mode === "zh" ? row.uberZh : row.uberEn}</p>
              </div>
              <div>
                <strong>{mode === "zh" ? "滴滴" : "Didi"}</strong>
                <p>{mode === "zh" ? row.didiZh : row.didiEn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubsidies = () => (
    <div className="battle-bottom-card">
      <div className="battle-bottom-head">
        <div>
          <strong><T mode={mode} en="Subsidies, fake rides, and distorted signals" zh="補貼、假行程與失真的訊號" /></strong>
          <p><T mode={mode} en="The case does not say subsidies were useless. It says they created a measurement problem as well as a growth engine." zh="個案不是說補貼沒用，而是說補貼同時創造了成長引擎與量測問題。" /></p>
        </div>
      </div>
      <div className="mini-kpi-grid">
        <div className="mini-kpi">
          <div className="kpi-num">3x</div>
          <p><T mode={mode} en="One case statement says drivers could earn three times the rider-paid amount on a trip." zh="個案一處寫到，司機單趟收入可達乘客支付金額的三倍。" /></p>
        </div>
        <div className="mini-kpi">
          <div className="kpi-num">130%</div>
          <p><T mode={mode} en="Another passage says Uber offered driver subsidies up to 130% of fare. That implies about 2.3x including fare itself." zh="另一處則寫 Uber 對司機補貼最高達車資的 130%。若加回原車資，約為 2.3 倍。" /></p>
        </div>
        <div className="mini-kpi danger">
          <div className="kpi-num">30 to 40%</div>
          <p><T mode={mode} en="An investor said roughly 30 to 40% of billed Uber China rides were fake. That is the key reason scale signals require caution." zh="有投資人稱，約 30 到 40% 的 Uber China 帳單行程是假的。這正是規模訊號必須謹慎閱讀的原因。" /></p>
        </div>
      </div>
      <div className="battle-detail-grid">
        <div className="warning-box">
          <strong><T mode={mode} en="Interpretation" zh="解讀" /></strong>
          <p><T mode={mode} en="Subsidies can still be rational during takeoff. The problem is that multi-homing, fraud, and regulation together make it much harder for bought activity to become a moat." zh="補貼在起飛期仍可能是理性的。真正問題是，多棲、詐欺與監管一起存在時，花錢買來的活動更難沉澱成護城河。" /></p>
        </div>
        <div className="warning-box subtle">
          <strong><T mode={mode} en="Why the number mismatch matters" zh="數字不一致為何重要" /></strong>
          <p><T mode={mode} en="Three times fare and 130% subsidy are not identical statements. The safer reading is that Uber ran very aggressive promotions, but the exact economics varied by context and moment." zh="三倍車資與 130% 補貼不是同一句話。較穩的讀法是：Uber 確實做了非常激進的促銷，但具體經濟條件會隨情境與時點變動。" /></p>
        </div>
      </div>
    </div>
  );

  const renderShare = () => (
    <div className="battle-bottom-card">
      <div className="battle-bottom-head">
        <div>
          <strong><T mode={mode} en="Market share only makes sense once denominators are separated" zh="先拆開分母，市佔率才有意義" /></strong>
          <p><T mode={mode} en="Many summaries casually compare 80%, 30%, and 11.5% as if they were one consistent series. They were not." zh="很多摘要會把 80%、30%、11.5% 隨手並排，好像它們是一條一致時間序列。其實不是。" /></p>
        </div>
      </div>
      <div className="share-grid">
        {shareViews.map((item) => (
          <div className="share-card" key={item.labelEn}>
            <div className="share-head">
              <strong>{mode === "zh" ? item.labelZh : item.labelEn}</strong>
              <span>{mode === "zh" ? item.numberZh : item.numberEn}</span>
            </div>
            <div className="share-bar-track"><div className="share-bar" style={{ width: `${item.value}%`, background: item.tone }} /></div>
            <p>{mode === "zh" ? item.noteZh : item.noteEn}</p>
          </div>
        ))}
      </div>
      <div className="warning-box">
        <strong><T mode={mode} en="How to say this in class" zh="課堂上可以怎麼說" /></strong>
        <p><T mode={mode} en="The share evidence points in the same direction even though the percentages do not share one denominator. Didi was ahead. The debate is about how far ahead, in which slice of the market, and under whose framing." zh="這些市佔證據雖然分母不同，但方向一致，都是滴滴領先。真正有爭議的是：到底領先多少、是在哪個市場切片下，以及是用誰的口徑在看。" /></p>
      </div>
    </div>
  );

  const renderLens = () => {
    if (lens === "timeline") return renderTimeline();
    if (lens === "regulation") return renderRegulation();
    if (lens === "subsidies") return renderSubsidies();
    if (lens === "share") return renderShare();
    return renderOverview();
  };

  return (
    <div className="battle-atlas battle-control-panel">
      <div className="battle-toolbar">
        <div className="battle-copy">
          <strong><T mode={mode} en="Interactive battlefield control panel" zh="互動戰場控制台" /></strong>
          <p><T mode={mode} en="One panel now holds the battle map, chronology, draft law, subsidy distortion, and market share denominator problem. Use the channel filter, actor focus, and lens switch together." zh="現在同一個面板內整合戰場圖、時間線、法規草案、補貼失真，以及市佔率分母問題。可把通道篩選、角色聚焦與鏡頭切換一起搭配使用。" /></p>
          <p><T mode={mode} en={layerSummary[layer].en + " " + lensSummary[lens].en} zh={layerSummary[layer].zh + " " + lensSummary[lens].zh} /></p>
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
          <div>
            <div className="battle-label"><T mode={mode} en="Open lens" zh="打開鏡頭" /></div>
            <div className="battle-lens-row">
              {lensOptions.map((opt) => (
                <button key={opt.key} className={`battle-pill battle-lens-pill ${lens === opt.key ? "active" : ""}`} onClick={() => setLens(opt.key)}>
                  <T mode={mode} en={opt.en} zh={opt.zh} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="battle-layout battle-layout-v3">
        <div className="battle-map-card">
          <svg viewBox="0 0 800 450" className="battle-svg" role="img" aria-label="Battlefield relationship map for Uber and Didi in the mainland market">
            <defs>
              <marker id="battle-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8 z" fill="#8B8175" />
              </marker>
            </defs>
            <rect x="0" y="0" width="800" height="450" rx="24" fill="rgba(255,255,255,0.72)" />
            <text x="34" y="34" fontSize="14" fontWeight="700" fill={PALETTE.ink}>{mode === "zh" ? "戰場關係圖" : "Battle map"}</text>
            <text x="34" y="54" fontSize="12" fill={PALETTE.muted}>{mode === "zh" ? "先看誰與誰相連，再看控制台下方的鏡頭面板。" : "Read who connects to whom first, then use the lens panel below."}</text>
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
          <div className="battle-note-strip compact-note">
            <div className="battle-card-kicker"><T mode={mode} en="Current lens" zh="目前鏡頭" /></div>
            <p><T mode={mode} en={lensSummary[lens].en} zh={lensSummary[lens].zh} /></p>
          </div>
          <div className="battle-note-strip compact-note">
            <div className="battle-card-kicker"><T mode={mode} en="Source hygiene" zh="資料分層" /></div>
            <p><T mode={mode} en="Case-time facts and later hindsight are intentionally separated. This avoids letting 2022 or 2023 performance answer a 2015 or 2016 strategic question." zh="個案時點事實與後續背景刻意分開。這是為了避免讓 2022 或 2023 的結果，倒過來替 2015 或 2016 的策略題作答。" /></p>
          </div>
        </div>
      </div>

      {renderLens()}

      <p className="source-note"><T mode={mode} en="Built from the HBS case's ecosystem facts, market share discussion, fraud discussion, draft-law exhibit, permit event, and later Uber background charts. The comparative matrix and interpretive text are explanatory compression for readers rather than literal measured scores." zh="本控制台依據 HBS 個案中的生態系事實、市佔率討論、假行程討論、法規草案附件、地方許可事件，以及後續 Uber 背景圖表重建。矩陣與解釋文字屬於面向讀者的視覺壓縮，不是在主張存在精確量測分數。" /></p>
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
          line-height: 1.5;
        }
        .page-shell {
          width: min(1360px, calc(100vw - 28px));
          margin: 0 auto;
          padding: 20px 0 72px;
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
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
          font-size: clamp(32px, 4.6vw, 54px);
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
          max-width: 690px;
          font-size: 15.5px;
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
          margin: 18px 0 20px;
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
          top: 10px;
          z-index: 4;
          margin: 0 0 24px;
          backdrop-filter: blur(12px);
          background: rgba(252,250,242,0.82);
          border: 1px solid ${PALETTE.line};
          border-radius: 20px;
          padding: 12px;
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
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
        }
        .sticky-sub {
          font-size: 12.5px;
          color: ${PALETTE.inkSoft};
          margin-top: 5px;
        }
        .content-grid {
          display: grid;
          gap: 20px;
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
          gap: 14px;
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
          padding: 16px;
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
          gap: 14px;
        }
        .subhead {
          margin: 0 0 12px;
          font-size: 15.5px;
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
          gap: 14px;
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
          gap: 14px;
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
          gap: 14px;
        }
        .financial-card strong { display: block; font-size: 15.5px; margin-bottom: 8px; }
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
          padding: 10px 8px;
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
          padding: 14px 16px;
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
          gap: 14px;
        }
        .battle-toolbar {
          display: flex;
          gap: 14px;
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
          font-size: 15.5px;
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
          gap: 14px;
        }
        .battle-map-card,
        .battle-side {
          display: grid;
          gap: 14px;
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

        .battle-layout-v3 {
          align-items: start;
        }
        .battle-lens-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .battle-lens-pill.active {
          background: ${PALETTE.rust};
          border-color: ${PALETTE.rust};
          color: #fff;
        }
        .battle-bottom-card {
          display: grid;
          gap: 14px;
          padding: 16px;
          border-radius: 20px;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.76);
          box-shadow: 0 10px 28px rgba(30,27,24,0.04);
        }
        .battle-bottom-head {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .battle-bottom-head strong {
          display: block;
          font-size: 16px;
          line-height: 1.25;
          margin-bottom: 4px;
        }
        .battle-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .compact-note {
          padding: 12px 14px;
        }
        .event-scrubber {
          display: grid;
          grid-template-columns: repeat(7, minmax(120px, 1fr));
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .event-pill {
          text-align: left;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.84);
          border-radius: 16px;
          padding: 10px 11px;
          display: grid;
          gap: 4px;
          min-height: 96px;
          cursor: pointer;
        }
        .event-pill span {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: ${PALETTE.muted};
          font-weight: 800;
        }
        .event-pill strong {
          font-size: 13px;
          line-height: 1.35;
          color: ${PALETTE.ink};
        }
        .event-pill.active {
          border-color: ${PALETTE.plum};
          box-shadow: inset 0 0 0 1px ${PALETTE.plum};
          background: rgba(98,41,84,0.06);
        }
        .impact-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .impact-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid ${PALETTE.line};
          background: rgba(255,255,255,0.82);
          font-size: 12px;
          color: ${PALETTE.inkSoft};
        }
        .mini-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .mini-kpi {
          border: 1px solid ${PALETTE.line};
          border-radius: 18px;
          padding: 14px;
          background: rgba(255,255,255,0.8);
          display: grid;
          gap: 8px;
        }
        .mini-kpi.danger {
          background: rgba(161,70,44,0.06);
          border-color: rgba(161,70,44,0.22);
        }
        .kpi-num {
          font-size: 28px;
          line-height: 1;
          font-weight: 800;
          color: ${PALETTE.plum};
          letter-spacing: -0.03em;
        }
        .mini-kpi.danger .kpi-num {
          color: ${PALETTE.red};
        }
        .reg-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .reg-card {
          border: 1px solid ${PALETTE.line};
          border-radius: 18px;
          padding: 14px;
          background: rgba(255,255,255,0.84);
          display: grid;
          gap: 10px;
        }
        .reg-article {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          min-width: 66px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(164,90,61,0.10);
          color: ${PALETTE.rust};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .reg-card h4 {
          margin: 0;
          font-size: 15px;
          line-height: 1.4;
        }
        .reg-sides {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .reg-sides strong,
        .share-head strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
        }
        .share-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .share-card {
          border: 1px solid ${PALETTE.line};
          border-radius: 18px;
          padding: 14px;
          background: rgba(255,255,255,0.82);
          display: grid;
          gap: 10px;
        }
        .share-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
        }
        .share-head span {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: ${PALETTE.ink};
        }
        .share-bar-track {
          height: 10px;
          border-radius: 999px;
          background: #E7DFD2;
          overflow: hidden;
        }
        .share-bar {
          height: 100%;
          border-radius: 999px;
        }
        .warning-box {
          border-radius: 18px;
          border: 1px solid rgba(184,139,74,0.24);
          background: rgba(184,139,74,0.08);
          padding: 13px 14px;
          display: grid;
          gap: 6px;
        }
        .warning-box.subtle {
          background: rgba(46,92,110,0.06);
          border-color: rgba(46,92,110,0.18);
        }
        .warning-box strong {
          font-size: 13px;
        }

        .footer-note {
          margin-top: 28px;
          padding: 14px 16px;
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
          .page-shell { width: min(100vw - 18px, 100%); padding-top: 10px; }
          .hero { padding: 16px; border-radius: 22px; }
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
          .section-nav { margin-top: 12px; }
          .battle-detail-grid,
          .mini-kpi-grid,
          .share-grid,
          .reg-grid,
          .reg-sides {
            grid-template-columns: 1fr;
          }
          .event-scrubber {
            grid-template-columns: repeat(7, minmax(168px, 1fr));
          }
          .battle-bottom-card {
            padding: 14px;
            border-radius: 18px;
          }
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
            <BattlefieldControlPanel mode={mode} />
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
