/* ==========================================================================
   NIC ROBOTICS — Produktkatalog / Product catalogue
   Single source of truth. Neue Produkte und Kategorien hier ergänzen.
   Add new products and categories here — pages are generated from this file.
   ========================================================================== */

window.NIC = window.NIC || {};

/* --------------------------------------------------------------------------
   KATEGORIEN
   "status": "live"   = Produkte vorhanden
             "soon"   = Kategorie angelegt, Produkte folgen
   -------------------------------------------------------------------------- */
NIC.categories = [
  {
    id: "vierbeiner",
    slug: "vierbeiner",
    status: "live",
    order: 1,
    name: { de: "Vierbeiner-Roboter", en: "Quadruped Robots", zh: "四足机器人" },
    short: { de: "Vierbeiner", en: "Quadrupeds", zh: "四足" },
    tagline: {
      de: "Laufroboter für Gelände, in dem Räder aufgeben.",
      en: "Legged robots for terrain where wheels give up.",
      zh: "为轮式车辆无法通过的地形而生的足式机器人。"
    },
    intro: {
      de: "Vier Beine, 12 bis 16 Freiheitsgrade, volle Kraftregelung. Vierbeiner steigen Treppen, queren Schutt, Schnee und Schlamm und halten die Nutzlast dabei waagerecht. Unser Kernsortiment — von der Forschungsplattform bis zur IP67-Industrieeinheit.",
      en: "Four legs, 12 to 16 degrees of freedom, full force control. Quadrupeds climb stairs, cross rubble, snow and mud while keeping the payload level. Our core range — from research platform to IP67 industrial unit.",
      zh: "四条腿、12 至 16 个自由度、全力控技术。四足机器人能上下楼梯，能穿越废墟、积雪与泥泞，同时保持负载平稳。这是我们的核心产品线——从科研平台到 IP67 工业机型。"
    },
    image: "x30-main",
    scene: "x30-climb"
  },
  {
    id: "radbein",
    slug: "radbein",
    status: "live",
    order: 2,
    name: { de: "Rad-Bein-Roboter", en: "Wheel-Legged Robots", zh: "轮足机器人" },
    short: { de: "Rad-Bein", en: "Wheel-Legged", zh: "轮足" },
    tagline: {
      de: "Radgeschwindigkeit auf der Strecke, Beinbeweglichkeit im Gelände.",
      en: "Wheel speed on the route, leg agility off it.",
      zh: "路面上有轮子的速度，越野时有腿的灵活。"
    },
    intro: {
      de: "Die Hybridform: angetriebene Räder an vollbeweglichen Beinen. Bis 9 m/s auf befestigtem Untergrund, Stufen bis 30 cm im Beinmodus, symmetrischer Aufbau ohne Vorn und Hinten — Richtungswechsel in unter einer Sekunde, ohne zu wenden.",
      en: "The hybrid form: driven wheels on fully articulated legs. Up to 9 m/s on hard ground, steps up to 30 cm in leg mode, a symmetrical body with no front or rear — direction reverses in under a second with no turning space.",
      zh: "轮腿混合形态：全自由度腿部搭配驱动轮。硬质路面最高 9 m/s，腿部模式可跨越 30 cm 台阶，机身前后对称——换向耗时不到一秒，无需掉头。"
    },
    image: "lynx-m20-main",
    scene: "m20-desert"
  },
  {
    id: "humanoid",
    slug: "humanoid",
    status: "soon",
    order: 3,
    name: { de: "Humanoide Roboter", en: "Humanoid Robots", zh: "人形机器人" },
    short: { de: "Humanoide", en: "Humanoids", zh: "人形" },
    tagline: {
      de: "Zweibeinige Plattformen für menschliche Arbeitsumgebungen.",
      en: "Bipedal platforms for environments built around people.",
      zh: "面向人类工作环境的双足平台。"
    },
    intro: {
      de: "Zweibeinige Ganzkörperplattformen mit Greifarmen — für Arbeitsplätze, Werkzeuge und Wege, die für Menschen gebaut wurden. Modelle für Forschung und für den industriellen Einsatz sind in der Aufnahme. Sprechen Sie uns auf Verfügbarkeit und Pilotprojekte an.",
      en: "Bipedal whole-body platforms with manipulator arms — for workstations, tools and routes designed for people. Models for research and for industrial duty are being added. Talk to us about availability and pilot projects.",
      zh: "带机械臂的双足全身平台——适用于为人设计的工位、工具与通道。科研型与工业型号正在引进中。如需了解供货情况与试点项目，欢迎与我们联系。"
    },
    image: null,
    scene: null
  },
  {
    id: "pflege",
    slug: "pflege",
    status: "soon",
    order: 4,
    name: { de: "Pflege- & Servicerobotik", en: "Care & Service Robotics", zh: "养老与服务机器人" },
    short: { de: "Pflege & Service", en: "Care & Service", zh: "养老与服务" },
    tagline: {
      de: "Assistenz für Pflegeeinrichtungen und betreutes Wohnen.",
      en: "Assistance for care homes and assisted living.",
      zh: "为养老机构与辅助生活设施提供协助。"
    },
    intro: {
      de: "Transport, Erinnerungsfunktionen, Begleitung und Telepräsenz für Pflegeheime, Kliniken und betreutes Wohnen. Der Pflegenotstand in Europa ist rechnerisch nicht mehr durch Personal allein zu decken — Robotik übernimmt Wege und Routinen, damit Fachkräfte Zeit für Menschen haben.",
      en: "Transport, reminders, companionship and telepresence for care homes, clinics and assisted living. Europe's care shortfall can no longer be closed by staffing alone — robotics absorbs the walking and the routines so trained people have time for people.",
      zh: "面向养老院、医院与辅助生活机构的运送、提醒、陪伴与远程呈现功能。欧洲的护理人力缺口在数字上已无法单靠增加人员弥补——机器人接手跑腿与例行事务，让专业人员有时间面对人。"
    },
    image: null,
    scene: null
  },
  {
    id: "reinigung",
    slug: "reinigung",
    status: "soon",
    order: 5,
    name: { de: "Gewerbliche Gewerbliche Reinigungsrobotik", en: "Commercial Commercial cleaning Robotics", zh: "商用清洁机器人" },
    short: { de: "Reinigung", en: "Cleaning", zh: "清洁" },
    tagline: {
      de: "Scheuersaug-, Kehr- und Fassadenrobotik für große Flächen.",
      en: "Scrubbing, sweeping and façade robotics for large floorplates.",
      zh: "面向大面积场所的洗地、扫地与幕墙清洁机器人。"
    },
    intro: {
      de: "Autonome Scheuersaugmaschinen, Kehrroboter und Fassadenreinigung für Logistikhallen, Einkaufszentren, Flughäfen und Bürotürme. Nachtbetrieb ohne Aufsicht, dokumentierte Flächenleistung, Anbindung an Ihr Facility-Management.",
      en: "Autonomous scrubber-dryers, sweepers and façade cleaning for logistics halls, shopping centres, airports and office towers. Unattended night shifts, documented area performance, integration with your facility management.",
      zh: "面向物流仓库、购物中心、机场与写字楼的自主洗地机、扫地机与幕墙清洁设备。无人值守夜班作业、可追溯的清洁面积记录、可对接贵司设施管理系统。"
    },
    image: null,
    scene: null
  },
  {
    id: "ersatzteile",
    slug: "ersatzteile",
    status: "soon",
    order: 6,
    name: { de: "Ersatzteile & Zubehör", en: "Spare Parts & Accessories", zh: "配件与备件" },
    short: { de: "Ersatzteile", en: "Spare Parts", zh: "备件" },
    tagline: {
      de: "Gelenkmodule, Akkus, Füße, Sensorik — ab Lager Deutschland.",
      en: "Joint modules, batteries, feet, sensors — ex stock Germany.",
      zh: "关节模块、电池、脚垫、传感器——德国仓库现货。"
    },
    intro: {
      de: "Verschleißteile und Austauschmodule, die Sie selbst tauschen können, ohne das Gerät einzuschicken. Gelenkaktuatoren, Akkupacks, Gummifüße, Schutzgitter, Ladestationen und Sensorbaugruppen.",
      en: "Wear parts and exchange modules you can swap yourself without shipping the unit. Joint actuators, battery packs, rubber feet, guards, charging docks and sensor assemblies.",
      zh: "可由您自行更换、无需返厂的易损件与更换模块。包括关节执行器、电池组、橡胶脚垫、防护格栅、充电桩与传感器组件。"
    },
    image: null,
    scene: null
  }
];

/* --------------------------------------------------------------------------
   PRODUKTE
   price: Netto-Listenpreis in EUR (vorläufig — bitte vor Launch prüfen)
   -------------------------------------------------------------------------- */
NIC.products = [

  /* ===================== X30 ===================== */
  {
    id: "x30",
    slug: "x30",
    sku: "NIC-QD-X30",
    category: "vierbeiner",
    brand: "NIC Robotics",
    order: 1,
    name: "X30",
    family: { de: "Industrie-Vierbeiner", en: "Industrial Quadruped", zh: "工业四足机器人" },
    price: 5000,
    badge: { de: "Flaggschiff", en: "Flagship", zh: "旗舰机型" },
    tagline: {
      de: "Der Allwetter-Arbeiter. IP67, −20 °C bis 55 °C, vier Stunden Schicht.",
      en: "The all-weather worker. IP67, −20 °C to 55 °C, a four-hour shift.",
      zh: "全天候作业机型。IP67，−20 °C 至 55 °C，单班四小时。"
    },
    summary: {
      de: "Der X30 ist für Anlagen gebaut, die nicht stillstehen: Umspannwerke, Chemieparks, Bergwerke, Tunnel. Er läuft autonom eine hinterlegte Route, steigt Treppen und Industrieleitern-Stufen, erkennt Hotspots per Wärmebild, misst Gase und Teilentladungen und fährt selbstständig in die Ladestation zurück. Schutzart IP67, Dauerbetrieb von −20 °C bis 55 °C, Explosionsschutz-Varianten auf Anfrage.",
      en: "The X30 is built for plants that never stop: substations, chemical parks, mines, tunnels. It walks a stored route autonomously, climbs stairs and industrial step heights, finds hotspots by thermal imaging, measures gases and partial discharge, and returns to its dock on its own. IP67, continuous duty from −20 °C to 55 °C, explosion-protected variants on request.",
      zh: "X30 是为不能停转的设施而造的：变电站、化工园区、矿井、隧道。它可自主执行预设路线，能上下楼梯和工业踏步，通过热成像识别发热点，检测气体与局部放电，并自行返回充电桩。防护等级 IP67，可在 −20 °C 至 55 °C 下持续作业，防爆版本可按需定制。"
    },
    highlights: [
      { de: "IP67 — staubdicht und gegen zeitweiliges Untertauchen geschützt", en: "IP67 — dust-tight and protected against temporary immersion", zh: "IP67——完全防尘，可承受短时浸水" },
      { de: "Betriebstemperatur −20 °C bis 55 °C, geprüft im Dauerlauf", en: "Operating temperature −20 °C to 55 °C, verified in endurance running", zh: "工作温度 −20 °C 至 55 °C，经持续运行验证" },
      { de: "Stufen bis 20 cm, Steigungen bis 45° unter Last", en: "Steps up to 20 cm, gradients to 45° under load", zh: "负载状态下可跨越 20 cm 台阶、攀爬 45° 坡度" },
      { de: "Autonome Navigation mit 3D-LiDAR-SLAM, kein GPS nötig", en: "Autonomous navigation on 3D LiDAR SLAM, no GPS required", zh: "基于三维激光雷达 SLAM 的自主导航，无需 GPS" },
      { de: "Selbstständiges Laden — 7×24-h-Betrieb ohne Bedienpersonal", en: "Self-docking charge — 7×24 h duty with no operator on site", zh: "自主充电——7×24 小时无人值守运行" },
      { de: "Nutzlastschnittstellen für Wärmebild, Gassensorik, Ultraschall und Akustik", en: "Payload interfaces for thermal, gas, ultrasonic and acoustic sensing", zh: "预留热成像、气体传感、超声与声学检测的负载接口" }
    ],
    specs: [
      { group: { de: "Körper", en: "Body", zh: "机体" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "1000 × 470 × 695 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "≤ 60 kg" },
        { k: { de: "Freiheitsgrade", en: "Degrees of freedom", zh: "自由度" }, v: "12 (3 / Bein · 3 per leg)" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP67" },
        { k: { de: "Umgebungstemperatur", en: "Ambient temperature", zh: "环境温度" }, v: "−20 °C … 55 °C" }
      ]},
      { group: { de: "Leistung", en: "Performance", zh: "性能" }, rows: [
        { k: { de: "Max. Geschwindigkeit", en: "Max. speed", zh: "最大行进速度" }, v: "4 m/s" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: "30° (Treppe bis 45° · stairs to 45°)" },
        { k: { de: "Stufenhöhe", en: "Step height", zh: "台阶高度" }, v: "20 cm" },
        { k: { de: "Nutzlast (dauerhaft)", en: "Payload (continuous)", zh: "持续负载" }, v: "20 kg" },
        { k: { de: "Nutzlast (maximal)", en: "Payload (maximum)", zh: "最大负载" }, v: "85 kg" },
        { k: { de: "Laufzeit ohne Last", en: "Runtime unloaded", zh: "空载续航时间" }, v: "≥ 4 h" },
        { k: { de: "Laufzeit mit 20 kg", en: "Runtime with 20 kg", zh: "20 kg 负载续航时间" }, v: "≥ 2,5 h" },
        { k: { de: "Reichweite ohne Last", en: "Range unloaded", zh: "空载续航里程" }, v: "≥ 15 km" },
        { k: { de: "Reichweite mit 20 kg", en: "Range with 20 kg", zh: "20 kg 负载续航里程" }, v: "≥ 10 km" }
      ]},
      { group: { de: "Wahrnehmung & Rechner", en: "Perception & computing", zh: "感知与算力" }, rows: [
        { k: { de: "LiDAR", en: "LiDAR", zh: "激光雷达" }, v: "3D, 360°" },
        { k: { de: "Kameras", en: "Cameras", zh: "相机" }, v: { de: "Weitwinkel, Tiefenkamera", en: "Wide-angle, depth camera", zh: "广角相机、深度相机" } },
        { k: { de: "Navigation", en: "Navigation", zh: "导航" }, v: { de: "SLAM-Kartierung, Routen, Rundum-Hindernisvermeidung", en: "SLAM mapping, routes, omnidirectional obstacle avoidance", zh: "SLAM 建图、路线规划、全向避障" } },
        { k: { de: "Laden", en: "Charging", zh: "充电" }, v: { de: "Autonome Rückkehr zur Ladestation", en: "Autonomous return to dock", zh: "自主返回充电桩" } }
      ]},
      { group: { de: "Schutzfunktionen", en: "Protective functions", zh: "保护功能" }, rows: [
        { k: { de: "Sturz", en: "Fall", zh: "跌倒" }, v: { de: "Selbstverriegelung, Ein-Tasten-Aufstehen mit Richtungswahl", en: "Self-locking, one-touch stand-up with chosen direction", zh: "自锁保护，一键起立并可选择起立方向" } },
        { k: { de: "Weitere", en: "Further", zh: "其他" }, v: { de: "Unterspannungs- und Übertemperaturschutz", en: "Low-voltage and over-temperature protection", zh: "低电压保护与过温保护" } },
        { k: { de: "Füße", en: "Feet", zh: "足底" }, v: { de: "Vollgummi, verschleiß- und flammfest, sensorlos", en: "Solid rubber, wear- and flame-resistant, sensorless", zh: "实心橡胶，耐磨阻燃，无传感器" } }
      ]},
      { group: { de: "Entwicklung", en: "Development", zh: "二次开发" }, rows: [
        { k: { de: "SDK", en: "SDK", zh: "SDK" }, v: { de: "Bewegungssteuerung und Wahrnehmung, C++ / Python, Beispielcode", en: "Motion control and perception, C++ / Python, example code", zh: "运动控制与感知接口，C++ / Python，含示例代码" } },
        { k: { de: "ROS", en: "ROS", zh: "ROS" }, v: { de: "ROS / ROS 2 Bridge", en: "ROS / ROS 2 bridge", zh: "ROS / ROS 2 接口" } }
      ]}
    ],
    gallery: ["x30-main", "x30-side"],
    scenes: ["x30-climb", "x30-substation", "x30-rain", "x30-dark"],
    hero: "x30-climb",
    useCases: ["industrie", "energie", "feuerwehr", "forschung"]
  },

  /* ===================== LYNX M20 S ===================== */
  {
    id: "lynx-m20s",
    slug: "lynx-m20s",
    sku: "NIC-WL-M20S",
    category: "radbein",
    brand: "NIC Robotics",
    order: 1,
    name: "Lynx M20 S",
    family: { de: "Rad-Bein-Roboter", en: "Wheel-Legged Robot", zh: "轮足机器人" },
    price: 5000,
    badge: { de: "Neu", en: "New", zh: "新品" },
    tagline: {
      de: "9 m/s. 35 kg Nutzlast. IP67. Tragkraft gleich Eigengewicht.",
      en: "9 m/s. 35 kg payload. IP67. Carries its own weight.",
      zh: "9 m/s。35 kg 负载。IP67。载重等于自重。"
    },
    summary: {
      de: "Die zweite Generation der Lynx-Reihe und derzeit der fähigste Rad-Bein-Roboter im Programm. Bei 35 kg Eigengewicht trägt der M20 S bis zu 35 kg Nutzlast — ein Verhältnis von 1:1, das sonst kein Gerät dieser Größe erreicht. Schutzart IP67 erlaubt zeitweiliges vollständiges Untertauchen, der Betriebsbereich reicht von −30 °C bis 55 °C, und das Geräuschniveau bleibt unter 55 dB.",
      en: "The second generation of the Lynx line and currently the most capable wheel-legged robot in the range. At 35 kg of its own, the M20 S carries up to 35 kg of payload — a 1:1 ratio nothing else this size matches. IP67 allows temporary full submersion, the operating window runs from −30 °C to 55 °C, and system noise stays under 55 dB.",
      zh: "Lynx 系列第二代，也是目前我们产品线中性能最强的轮足机器人。自重 35 kg，却能承载最高 35 kg 负载——1:1 的载重自重比，同尺寸机型中无出其右。IP67 防护允许短时完全浸水，工作温度范围 −30 °C 至 55 °C，整机噪音低于 55 dB。"
    },
    highlights: [
      { de: "Nutzlast 35 kg auf Normaluntergrund, 25 kg in jedem Gelände", en: "35 kg payload on standard terrain, 25 kg across any terrain", zh: "常规路面负载 35 kg，任意地形负载 25 kg" },
      { de: "IP67 — kurzzeitiges vollständiges Untertauchen zulässig", en: "IP67 — temporary full submersion permitted", zh: "IP67——允许短时完全浸入水中" },
      { de: "−30 °C bis 55 °C, Systemgeräusch ≤ 55 dB", en: "−30 °C to 55 °C, system noise ≤ 55 dB", zh: "−30 °C 至 55 °C，系统噪音 ≤ 55 dB" },
      { de: "Spitze 9 m/s, Dauerbetrieb 3,5 bis 5 Stunden ohne Last", en: "9 m/s peak, 3.5 to 5 hours continuous unloaded", zh: "峰值 9 m/s，空载持续运行 3.5 至 5 小时" },
      { de: "Stufen bis 30 cm im Dauerlauf, Steigungen bis 45°", en: "Continuous steps to 30 cm, gradients to 45°", zh: "可连续跨越 30 cm 台阶，攀爬 45° 坡度" },
      { de: "Kopf und Heck symmetrisch — Richtungswechsel in unter 1 s ohne Wenden", en: "Symmetrical head and tail — direction reverses in under 1 s with no turning", zh: "头尾对称——换向耗时不到 1 秒，无需掉头" },
      { de: "Heißwechselbares Doppelakkusystem, Betrieb ohne Abschalten", en: "Hot-swappable dual battery system, no shutdown to change packs", zh: "热插拔双电池系统，换电无需关机" }
    ],
    specs: [
      { group: { de: "Körper", en: "Body", zh: "机体" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "820 × 430 × 570 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "35 kg" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: { de: "IP67 (zeitweiliges Untertauchen)", en: "IP67 (temporary submersion)", zh: "IP67（可短时浸水）" } },
        { k: { de: "Umgebungstemperatur", en: "Ambient temperature", zh: "环境温度" }, v: "−30 °C … 55 °C" },
        { k: { de: "Geräusch", en: "Noise", zh: "噪音" }, v: "≤ 55 dB" },
        { k: { de: "Richtungswechsel", en: "Direction reversal", zh: "换向" }, v: { de: "≤ 1 s, kopf-/heckidentisch", en: "≤ 1 s, head/tail identical", zh: "≤ 1 秒，头尾结构一致" } }
      ]},
      { group: { de: "Leistung", en: "Performance", zh: "性能" }, rows: [
        { k: { de: "Nutzlast (Normaluntergrund)", en: "Payload (standard terrain)", zh: "负载（常规路面）" }, v: "35 kg" },
        { k: { de: "Nutzlast (jedes Gelände)", en: "Payload (all terrain)", zh: "负载（任意地形）" }, v: "25 kg" },
        { k: { de: "Max. Geschwindigkeit (Prüfstand)", en: "Max. speed (lab)", zh: "最高速度（实验室实测）" }, v: { de: "9 m/s — Serie auf 3 m/s begrenzt", en: "9 m/s — series limited to 3 m/s", zh: "9 m/s——量产机限速 3 m/s" } },
        { k: { de: "Arbeitsgeschwindigkeit", en: "Field operating speed", zh: "作业速度" }, v: "2 m/s" },
        { k: { de: "Stufenhöhe (durchgehend)", en: "Continuous step height", zh: "台阶高度（可连续跨越）" }, v: "30 cm" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: "45°" },
        { k: { de: "Laufzeit / Reichweite ohne Last", en: "Runtime / range unloaded", zh: "空载续航时间 / 里程" }, v: "3,5–5 h / 16–20 km" },
        { k: { de: "Laufzeit / Reichweite mit Last", en: "Runtime / range loaded", zh: "负载续航时间 / 里程" }, v: "2,5–3,5 h / 12–15 km" }
      ]},
      { group: { de: "Wahrnehmung & Rechner", en: "Perception & computing", zh: "感知与算力" }, rows: [
        { k: { de: "Rechenleistung", en: "Computing", zh: "算力" }, v: { de: "3 × Octa-Core-64-Bit-Industrieprozessor (16 GB + 128 GB)", en: "3 × octa-core 64-bit industrial processor (16 GB + 128 GB)", zh: "3 × 八核 64 位工业级处理器（16 GB + 128 GB）" } },
        { k: { de: "LiDAR", en: "LiDAR", zh: "激光雷达" }, v: "2 ×" },
        { k: { de: "Weitwinkelkameras", en: "Wide-angle cameras", zh: "广角相机" }, v: "2 ×" },
        { k: { de: "SLAM & Navigation", en: "SLAM & navigation", zh: "SLAM 与导航" }, v: { de: "serienmäßig", en: "standard", zh: "标配" } },
        { k: { de: "Rundum-Hindernisvermeidung", en: "Omnidirectional obstacle avoidance", zh: "全向避障" }, v: { de: "serienmäßig", en: "standard", zh: "标配" } },
        { k: { de: "Funk-Videoübertragung", en: "RF video transmission", zh: "无线图传" }, v: { de: "serienmäßig", en: "standard", zh: "标配" } },
        { k: { de: "Autonomes Laden", en: "Autonomous charging", zh: "自主充电" }, v: { de: "optional", en: "optional", zh: "选配" } }
      ]},
      { group: { de: "Schnittstellen", en: "Interfaces", zh: "接口" }, rows: [
        { k: { de: "Stromeingang", en: "Power input", zh: "电源输入" }, v: "24 V / 72 V" },
        { k: { de: "Daten", en: "Data", zh: "数据接口" }, v: { de: "Gigabit-Ethernet, USB, GMSL", en: "Gigabit Ethernet, USB, GMSL", zh: "千兆以太网、USB、GMSL" } },
        { k: { de: "Akku", en: "Battery", zh: "电池" }, v: { de: "Doppelakku, heißwechselbar", en: "Dual pack, hot-swappable", zh: "双电池，支持热插拔" } }
      ]}
    ],
    gallery: ["lynx-m20-main", "lynx-m20-alt"],
    scenes: ["m20s-snow", "m20s-dust", "m20s-water", "m20s-sand", "m20s-forest"],
    hero: "m20s-dust",
    video: true,
    useCases: ["energie", "sicherheit", "feuerwehr", "logistik", "forschung"]
  },

  /* ===================== LYNX M20 PRO ===================== */
  {
    id: "lynx-m20-pro",
    slug: "lynx-m20-pro",
    sku: "NIC-WL-M20P",
    category: "radbein",
    brand: "NIC Robotics",
    order: 2,
    name: "Lynx M20 Pro",
    family: { de: "Rad-Bein-Roboter", en: "Wheel-Legged Robot", zh: "轮足机器人" },
    price: 5000,
    tagline: {
      de: "Die Ausbaustufe mit dreifachem Rechner und autonomem Laden.",
      en: "The build-out tier: triple compute and autonomous charging.",
      zh: "配备三倍算力与自主充电的进阶版本。"
    },
    summary: {
      de: "Der M20 Pro ist die Entwicklungsvariante der ersten Lynx-Generation: dreifacher Octa-Core-Industrierechner, USB-3.0-Schnittstelle neben Gigabit-Ethernet und optionales autonomes Laden. Für Teams, die eigene Wahrnehmung und Autonomie auf dem Gerät rechnen lassen wollen, statt nur fertige Funktionen abzurufen.",
      en: "The M20 Pro is the development tier of the first Lynx generation: triple octa-core industrial compute, USB 3.0 alongside gigabit Ethernet, and optional autonomous charging. For teams that want to run their own perception and autonomy on the machine rather than only call finished functions.",
      zh: "M20 Pro 是第一代 Lynx 的开发型版本：三组八核工业级处理器，在千兆以太网之外增加 USB 3.0 接口，并可选配自主充电。适合希望在机身上运行自研感知与自主算法、而不只是调用现成功能的团队。"
    },
    highlights: [
      { de: "3 × Octa-Core-64-Bit-Industrieprozessor für eigene Autonomie-Stacks", en: "3 × octa-core 64-bit industrial processors for your own autonomy stack", zh: "3 × 八核 64 位工业级处理器，可运行自研自主算法" },
      { de: "SLAM-Kartierung und Navigation serienmäßig", en: "SLAM mapping and navigation as standard", zh: "标配 SLAM 建图与导航" },
      { de: "Autonomes Laden optional — Dauerbetrieb ohne Bedienung", en: "Autonomous charging optional — unattended continuous duty", zh: "可选配自主充电——无人值守持续作业" },
      { de: "IP66, −20 °C bis 55 °C, Front- und Heckbeleuchtung", en: "IP66, −20 °C to 55 °C, front and rear lighting", zh: "IP66，−20 °C 至 55 °C，配备前后照明" },
      { de: "Durchfährt Engstellen ab 50 cm Breite", en: "Passes gaps from 50 cm wide", zh: "可通过最窄 50 cm 的狭窄通道" },
      { de: "Heißwechselakku, Nutzlast 15 kg", en: "Hot-swap battery, 15 kg payload", zh: "热插拔电池，负载 15 kg" }
    ],
    specs: [
      { group: { de: "Körper", en: "Body", zh: "机体" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "820 × 430 × 570 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "33 kg" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP66" },
        { k: { de: "Umgebungstemperatur", en: "Ambient temperature", zh: "环境温度" }, v: "−20 °C … 55 °C" },
        { k: { de: "Engstellen", en: "Narrow passages", zh: "狭窄通道" }, v: { de: "ab 50 cm Breite", en: "from 50 cm wide", zh: "最窄 50 cm" } }
      ]},
      { group: { de: "Leistung", en: "Performance", zh: "性能" }, rows: [
        { k: { de: "Nutzlast", en: "Payload", zh: "负载" }, v: "15 kg" },
        { k: { de: "Max. Geschwindigkeit (Prüfstand)", en: "Max. speed (lab)", zh: "最高速度（实验室实测）" }, v: { de: "5 m/s — Serie auf 3 m/s begrenzt", en: "5 m/s — series limited to 3 m/s", zh: "5 m/s——量产机限速 3 m/s" } },
        { k: { de: "Arbeitsgeschwindigkeit", en: "Field operating speed", zh: "作业速度" }, v: "2 m/s" },
        { k: { de: "Stufenhöhe", en: "Step height", zh: "台阶高度" }, v: "25 cm" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: "45°" },
        { k: { de: "Laufzeit / Reichweite ohne Last", en: "Runtime / range unloaded", zh: "空载续航时间 / 里程" }, v: "3 h / 15 km" },
        { k: { de: "Laufzeit / Reichweite mit Last", en: "Runtime / range loaded", zh: "负载续航时间 / 里程" }, v: "2,5 h / 12 km" }
      ]},
      { group: { de: "Wahrnehmung & Rechner", en: "Perception & computing", zh: "感知与算力" }, rows: [
        { k: { de: "Rechenleistung", en: "Computing", zh: "算力" }, v: { de: "3 × Octa-Core-64-Bit-Industrieprozessor (16 GB + 128 GB)", en: "3 × octa-core 64-bit industrial processor (16 GB + 128 GB)", zh: "3 × 八核 64 位工业级处理器（16 GB + 128 GB）" } },
        { k: { de: "LiDAR", en: "LiDAR", zh: "激光雷达" }, v: "2 ×" },
        { k: { de: "Weitwinkelkameras", en: "Wide-angle cameras", zh: "广角相机" }, v: "2 ×" },
        { k: { de: "SLAM & Navigation", en: "SLAM & navigation", zh: "SLAM 与导航" }, v: { de: "serienmäßig", en: "standard", zh: "标配" } },
        { k: { de: "Autonomes Laden", en: "Autonomous charging", zh: "自主充电" }, v: { de: "optional", en: "optional", zh: "选配" } }
      ]},
      { group: { de: "Schnittstellen", en: "Interfaces", zh: "接口" }, rows: [
        { k: { de: "Stromeingang", en: "Power input", zh: "电源输入" }, v: "24 V / 72 V" },
        { k: { de: "Daten", en: "Data", zh: "数据接口" }, v: { de: "Gigabit-Ethernet, USB 3.0", en: "Gigabit Ethernet, USB 3.0", zh: "千兆以太网、USB 3.0" } }
      ]}
    ],
    gallery: ["lynx-m20-alt", "lynx-m20-main"],
    scenes: ["m20-desert", "m20-forest", "m20-substation", "m20-dune"],
    hero: "m20-desert",
    useCases: ["energie", "logistik", "forschung", "sicherheit"]
  },

  /* ===================== LYNX M20 ===================== */
  {
    id: "lynx-m20",
    slug: "lynx-m20",
    sku: "NIC-WL-M20",
    category: "radbein",
    brand: "NIC Robotics",
    order: 3,
    name: "Lynx M20",
    family: { de: "Rad-Bein-Roboter", en: "Wheel-Legged Robot", zh: "轮足机器人" },
    price: 5000,
    tagline: {
      de: "Der Einstieg in die Rad-Bein-Bauform.",
      en: "The entry point into the wheel-legged form.",
      zh: "轮足形态的入门机型。"
    },
    summary: {
      de: "Die Basisvariante der Lynx-Reihe mit derselben Mechanik, demselben Gehäuse und derselben Geländeleistung wie die Pro-Version — mit doppeltem statt dreifachem Rechner und ohne autonomes Laden. Für Einsätze, bei denen der Roboter gesteuert oder auf fester Route fährt und die Autonomie nicht an Bord gerechnet werden muss.",
      en: "The base variant of the Lynx line: the same mechanics, the same shell and the same terrain performance as the Pro, with dual rather than triple compute and no autonomous charging. For duties where the robot is driven or follows a fixed route and the autonomy need not be computed on board.",
      zh: "Lynx 系列的基础版本，机械结构、外壳与越野性能与 Pro 版完全相同——算力为双核心组而非三组，且不含自主充电。适用于由人遥控或沿固定路线行驶、无需在机身上运算自主算法的场景。"
    },
    highlights: [
      { de: "Gleiche Mechanik und Geländeleistung wie der M20 Pro", en: "Identical mechanics and terrain performance to the M20 Pro", zh: "机械结构与越野性能与 M20 Pro 完全相同" },
      { de: "IP66, −20 °C bis 55 °C", en: "IP66, −20 °C to 55 °C", zh: "IP66，−20 °C 至 55 °C" },
      { de: "Doppelter Octa-Core-64-Bit-Industrierechner", en: "Dual octa-core 64-bit industrial compute", zh: "双组八核 64 位工业级处理器" },
      { de: "Heißwechselakku, Nachtbeleuchtung vorn und hinten", en: "Hot-swap battery, night lighting front and rear", zh: "热插拔电池，前后夜间照明" },
      { de: "Durchfährt Engstellen ab 50 cm Breite", en: "Passes gaps from 50 cm wide", zh: "可通过最窄 50 cm 的狭窄通道" }
    ],
    specs: [
      { group: { de: "Körper", en: "Body", zh: "机体" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "820 × 430 × 570 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "33 kg" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP66" },
        { k: { de: "Umgebungstemperatur", en: "Ambient temperature", zh: "环境温度" }, v: "−20 °C … 55 °C" }
      ]},
      { group: { de: "Leistung", en: "Performance", zh: "性能" }, rows: [
        { k: { de: "Nutzlast", en: "Payload", zh: "负载" }, v: "15 kg" },
        { k: { de: "Max. Geschwindigkeit (Prüfstand)", en: "Max. speed (lab)", zh: "最高速度（实验室实测）" }, v: { de: "5 m/s — Serie auf 3 m/s begrenzt", en: "5 m/s — series limited to 3 m/s", zh: "5 m/s——量产机限速 3 m/s" } },
        { k: { de: "Arbeitsgeschwindigkeit", en: "Field operating speed", zh: "作业速度" }, v: "2 m/s" },
        { k: { de: "Stufenhöhe", en: "Step height", zh: "台阶高度" }, v: "25 cm" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: "45°" },
        { k: { de: "Laufzeit / Reichweite ohne Last", en: "Runtime / range unloaded", zh: "空载续航时间 / 里程" }, v: "3 h / 15 km" },
        { k: { de: "Laufzeit / Reichweite mit Last", en: "Runtime / range loaded", zh: "负载续航时间 / 里程" }, v: "2,5 h / 12 km" }
      ]},
      { group: { de: "Wahrnehmung & Rechner", en: "Perception & computing", zh: "感知与算力" }, rows: [
        { k: { de: "Rechenleistung", en: "Computing", zh: "算力" }, v: { de: "2 × Octa-Core-64-Bit-Industrieprozessor (16 GB + 128 GB)", en: "2 × octa-core 64-bit industrial processor (16 GB + 128 GB)", zh: "2 × 八核 64 位工业级处理器（16 GB + 128 GB）" } },
        { k: { de: "LiDAR", en: "LiDAR", zh: "激光雷达" }, v: "2 ×" },
        { k: { de: "Weitwinkelkameras", en: "Wide-angle cameras", zh: "广角相机" }, v: "2 ×" },
        { k: { de: "SLAM & Navigation", en: "SLAM & navigation", zh: "SLAM 与导航" }, v: { de: "nicht enthalten", en: "not included", zh: "不含" } }
      ]},
      { group: { de: "Schnittstellen", en: "Interfaces", zh: "接口" }, rows: [
        { k: { de: "Stromeingang", en: "Power input", zh: "电源输入" }, v: "72 V" },
        { k: { de: "Daten", en: "Data", zh: "数据接口" }, v: { de: "Gigabit-Ethernet", en: "Gigabit Ethernet", zh: "千兆以太网" } }
      ]}
    ],
    gallery: ["lynx-m20-main", "lynx-m20-alt"],
    scenes: ["m20-forest2", "m20-river", "m20-substation"],
    hero: "m20-forest2",
    useCases: ["energie", "logistik", "forschung"]
  },

  /* ===================== LITE 3 ===================== */
  {
    id: "lite3",
    slug: "lite3",
    sku: "NIC-QD-LITE3",
    category: "vierbeiner",
    brand: "NIC Robotics",
    order: 2,
    name: "Lite3",
    family: { de: "Forschungs- & Bildungsplattform", en: "Research & Education Platform", zh: "科研与教学平台" },
    price: 5000,
    badge: { de: "Für Hochschulen", en: "For universities", zh: "面向高校" },
    tagline: {
      de: "Offene Plattform, 12 kg, vier Ausbaustufen — vom Seminar bis zum Labor.",
      en: "Open platform, 12 kg, four build levels — from seminar to laboratory.",
      zh: "开放平台，12 kg，四种配置——从课堂到实验室。"
    },
    summary: {
      de: "Der Lite3 ist die Lehr- und Forschungsplattform der Reihe: leicht genug, um ihn allein zu tragen, offen genug, um eigene Regler darauf laufen zu lassen. Modelle, Bewegungs-SDK, APIs und Wahrnehmungsschnittstellen liegen mit Beispielcode bei. Vier Ausbaustufen von BASIC bis LIDAR, nachrüstbar.",
      en: "The Lite3 is the teaching and research platform of the range: light enough to carry alone, open enough to run your own controllers on. Models, motion SDK, APIs and perception interfaces ship with example code. Four build levels from BASIC to LIDAR, upgradeable.",
      zh: "Lite3 是本系列的教学与科研平台：轻到一个人就能搬动，开放到可以在上面运行自研控制器。随机提供模型文件、运动控制 SDK、API 与感知接口，并附示例代码。从 BASIC 到 LIDAR 共四种配置，支持后期加装升级。"
    },
    highlights: [
      { de: "Vier Ausbaustufen: BASIC, VENTURE, PRO, LIDAR", en: "Four build levels: BASIC, VENTURE, PRO, LIDAR", zh: "四种配置：BASIC、VENTURE、PRO、LIDAR" },
      { de: "Laufzeit 1,5 bis 2 Stunden, bis 5 km Reichweite", en: "1.5 to 2 hours of running, up to 5 km of range", zh: "续航 1.5 至 2 小时，最远 5 km" },
      { de: "Stufen bis 18 cm — Spitzenwert in dieser Gewichtsklasse", en: "Steps to 18 cm — best in this weight class", zh: "可跨越 18 cm 台阶——同重量级中的顶尖水平" },
      { de: "Industrie-IMU und echtzeitfähiger Kernel, Regelung bis 1 kHz", en: "Industrial IMU and real-time kernel, control loop to 1 kHz", zh: "工业级 IMU 与实时内核，控制频率达 1 kHz" },
      { de: "Modularer Aufbau für eigene Sensorik und Nutzlasten", en: "Modular build for your own sensors and payloads", zh: "模块化结构，可加装自有传感器与负载" },
      { de: "Bewegungs-SDK, APIs, Wahrnehmungsschnittstellen und Beispielcode", en: "Motion SDK, APIs, perception interfaces and example code", zh: "运动控制 SDK、API、感知接口与示例代码" },
      { de: "Sprachsteuerung, Gestenrepertoire, Gruppenchoreografie, Hi-Fi-Lautsprecher", en: "Voice control, gesture repertoire, group choreography, hi-fi speaker", zh: "语音控制、手势动作库、多机编队表演、内置高保真扬声器" }
    ],
    variantTable: {
      caption: { de: "Ausbaustufen im Vergleich", en: "Build levels compared", zh: "各配置版本对比" },
      cols: ["BASIC", "VENTURE", "PRO", "LIDAR"],
      rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: ["610 × 370 × 406 mm", "610 × 370 × 445 mm", "610 × 370 × 450 mm", "610 × 370 × 496 mm"] },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: ["12 kg", "12,2 kg", "12,9 kg", "13,5 kg"] },
        { k: { de: "Laufzeit", en: "Runtime", zh: "续航时间" }, v: ["1,5–2 h", "1,5–2 h", "1,5–2 h", "1,5–2 h"] },
        { k: { de: "Reichweite", en: "Range", zh: "续航里程" }, v: ["5 km", "4 km", "3,4 km", "2,7 km"] },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: ["40°", "40°", "40°", "40°"] },
        { k: { de: "Stufenhöhe", en: "Step height", zh: "台阶高度" }, v: ["18 cm", "18 cm", "18 cm", "18 cm"] },
        { k: { de: "Nutzlast", en: "Payload", zh: "负载" }, v: ["5 kg", "4,5 kg", "4 kg", "2,5 kg"] },
        { k: { de: "Hindernis-Stopp vorn/hinten", en: "Front/rear obstacle stop", zh: "前后障碍物停障" }, v: [true, true, true, true] },
        { k: { de: "Visuelles Folgen", en: "Visual following", zh: "视觉跟随" }, v: [true, true, true, true] },
        { k: { de: "Hindernisvermeidung vorwärts", en: "Forward obstacle avoidance", zh: "前向主动避障" }, v: [false, false, true, true] },
        { k: { de: "Autonome Navigation", en: "Autonomous navigation", zh: "自主导航" }, v: [false, false, false, true] },
        { k: { de: "Ethernet", en: "Ethernet", zh: "以太网" }, v: [false, "2 ×", true, true] },
        { k: { de: "USB 3.0 / HDMI", en: "USB 3.0 / HDMI", zh: "USB 3.0 / HDMI" }, v: [false, false, true, true] },
        { k: { de: "Externer Stromeingang", en: "External power input", zh: "外部电源输入" }, v: [false, "24 / 12 / 5 V", "24 / 12 / 5 V", "24 / 12 / 5 V"] }
      ]
    },
    specs: [
      { group: { de: "Antrieb & Regelung", en: "Drive & control", zh: "驱动与控制" }, rows: [
        { k: { de: "Aktuatoren", en: "Actuators", zh: "执行器" }, v: { de: "Hohe Drehmomentdichte, hohe Rückwärtstreibbarkeit", en: "High torque density, high back-drivability", zh: "高扭矩密度，高反驱性能" } },
        { k: { de: "Regelfrequenz", en: "Control frequency", zh: "控制频率" }, v: { de: "bis 1 kHz", en: "up to 1 kHz", zh: "最高 1 kHz" } },
        { k: { de: "IMU", en: "IMU", zh: "惯性测量单元" }, v: { de: "Industrieausführung", en: "Industrial grade", zh: "工业级" } },
        { k: { de: "Betriebssystem", en: "Operating system", zh: "操作系统" }, v: { de: "Echtzeitfähiger Linux-Kernel", en: "Real-time Linux kernel", zh: "实时 Linux 内核" } }
      ]},
      { group: { de: "Interaktion", en: "Interaction", zh: "人机交互" }, rows: [
        { k: { de: "Bewegungsrepertoire", en: "Motion repertoire", zh: "动作库" }, v: { de: "Handstand, Aufrichten, Verbeugung, Moonwalk, Herzgeste", en: "Handstand, upright balance, bow, moonwalk, heart sign", zh: "倒立、直立行走、鞠躬、太空步、比心手势" } },
        { k: { de: "Sprache", en: "Voice", zh: "语音" }, v: { de: "Sprachsteuerung für Bewegung und Vorführungen", en: "Voice control for motion and performances", zh: "可用语音指令控制运动与表演" } },
        { k: { de: "Licht", en: "Light", zh: "灯光" }, v: { de: "Lichtkommunikationssystem, programmierbare Effekte", en: "Light communication system, programmable effects", zh: "灯光通信系统，可编程灯效" } },
        { k: { de: "Audio", en: "Audio", zh: "音频" }, v: { de: "Hi-Fi-Lautsprecher integriert", en: "Integrated hi-fi speaker", zh: "内置高保真扬声器" } },
        { k: { de: "Gruppenbetrieb", en: "Group operation", zh: "多机协同" }, v: { de: "Choreografie mehrerer Einheiten mit Lichtsequenzen", en: "Multi-unit choreography with light sequences", zh: "多台设备编队表演，含灯光序列" } }
      ]},
      { group: { de: "Entwicklung", en: "Development", zh: "二次开发" }, rows: [
        { k: { de: "SDK", en: "SDK", zh: "SDK" }, v: { de: "Bewegungssteuerung, APIs, Beispielcode", en: "Motion control, APIs, example code", zh: "运动控制、API、示例代码" } },
        { k: { de: "Wahrnehmung", en: "Perception", zh: "感知" }, v: { de: "Visuelle Lokalisierung, Umgebungsrekonstruktion", en: "Visual localisation, environment reconstruction", zh: "视觉定位、环境重建" } },
        { k: { de: "Modelle", en: "Models", zh: "模型文件" }, v: { de: "URDF und Simulationsmodelle", en: "URDF and simulation models", zh: "URDF 与仿真模型" } },
        { k: { de: "Updates", en: "Updates", zh: "升级" }, v: { de: "OTA", en: "OTA", zh: "OTA 在线升级" } }
      ]}
    ],
    gallery: ["lite3-main", "lite3-leap"],
    scenes: ["lite3-hero"],
    hero: "lite3-hero",
    useCases: ["forschung", "museum"]
  },

  /* ===================== PATROL ===================== */
  {
    id: "patrol-m20",
    slug: "streifenroboter-m20",
    sku: "NIC-WL-PATROL",
    category: "radbein",
    brand: "NIC Robotics",
    order: 4,
    name: "Streifenroboter M20",
    title: { de: "Streifenroboter M20", en: "Patrol Robot M20", zh: "巡逻机器人 M20" },
    family: { de: "Einsatzkonfiguration · Sicherheit", en: "Mission configuration · Security", zh: "任务配置 · 安防" },
    price: 5000,
    badge: { de: "Komplettsystem", en: "Turnkey", zh: "整套系统" },
    tagline: {
      de: "Streife rund um die Uhr: Doppeloptik-Gimbal, 5G, Lautsprecher, Selbstladung.",
      en: "Round-the-clock patrol: dual-optic gimbal, 5G, hailer, self-charging.",
      zh: "全天候巡逻：双光云台、5G、喊话器、自主回充。"
    },
    summary: {
      de: "Eine fertig aufgebaute Einsatzkonfiguration auf Basis des Lynx M20 für Streifen- und Objektschutzdienst. Doppeloptik-Gimbal mit 33-fachem Zoom und Wärmebild, RTK-Ortung mit unter 3 cm Fehler, 5G-Rückübertragung, Vier-in-eins-Lautsprecher mit Rot-Blau-Blitzlicht und Personenfolgemodus über Einhandfernbedienung. Fährt selbstständig in die Ladestation und hält so einen 7×24-Stunden-Dienst.",
      en: "A fully built mission configuration on the Lynx M20 platform for patrol and asset protection. Dual-optic gimbal with 33× zoom and thermal imaging, RTK positioning under 3 cm of error, 5G backhaul, a four-in-one hailer with red/blue strobe, and a person-following mode on a single-hand remote. It docks itself, sustaining a 7×24-hour watch.",
      zh: "基于 Lynx M20 平台整装配置的巡逻与要害部位防护系统。配备 33 倍变焦与热成像的双光云台、误差小于 3 cm 的 RTK 定位、5G 实时回传、带红蓝爆闪的四合一喊话器，以及通过单手遥控器实现的人机跟随模式。可自主回到充电桩，从而维持 7×24 小时不间断值守。"
    },
    highlights: [
      { de: "Doppeloptik-Gimbal, 360° drehbar: 33-fach-Zoom am Tag, Wärmebild bei Nacht", en: "Dual-optic gimbal, 360° rotation: 33× zoom by day, thermal by night", zh: "双光云台 360° 旋转：白天 33 倍变焦，夜间热成像" },
      { de: "KI-Erkennung von Personen, Fahrzeugen, auffälligem Verhalten, Rauch und Feuer", en: "AI detection of people, vehicles, anomalous behaviour, smoke and fire", zh: "AI 识别人员、车辆、异常行为、烟雾与火情" },
      { de: "5G-Rückübertragung von Video, Position und Messdaten in die Leitstelle", en: "5G backhaul of video, position and measurements to the control room", zh: "通过 5G 将视频、定位与检测数据回传指挥中心" },
      { de: "RTK-Ortung mit absolutem Fehler unter 3 cm", en: "RTK positioning with absolute error under 3 cm", zh: "RTK 定位，绝对误差小于 3 cm" },
      { de: "Sprachdurchsagen und Rot-Blau-Blitzlicht zur Ansprache vor Ort", en: "Voice announcements and red/blue strobe for on-site challenge", zh: "现场语音喊话与红蓝爆闪警示" },
      { de: "Personenfolgemodus 360° ohne toten Winkel, 0,8 bis 5 m einstellbar", en: "Person-following 360° with no blind spot, adjustable 0.8 to 5 m", zh: "360° 无盲区人员跟随，跟随距离 0.8 至 5 m 可调" },
      { de: "Autonome Rückkehr zur Ladestation — ununterbrochener 7×24-h-Dienst", en: "Autonomous return to dock — uninterrupted 7×24 h duty", zh: "自主回充——7×24 小时不间断值守" }
    ],
    specs: [
      { group: { de: "Plattform", en: "Platform", zh: "平台" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "≤ 820 × 430 × 570 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "≤ 35 kg" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP66" },
        { k: { de: "Umgebungstemperatur", en: "Ambient temperature", zh: "环境温度" }, v: "−20 °C … 55 °C" },
        { k: { de: "Freiheitsgrade", en: "Degrees of freedom", zh: "自由度" }, v: { de: "16 gesamt, 4 pro Bein", en: "16 total, 4 per leg", zh: "整机 16 个，单腿 4 个" } },
        { k: { de: "Max. Geschwindigkeit", en: "Max. speed", zh: "最大行进速度" }, v: "≥ 5 m/s" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: "45°" },
        { k: { de: "Nutzlast / Maximallast", en: "Payload / maximum load", zh: "有效负载 / 最大负载" }, v: "≥ 15 kg / ≥ 50 kg" },
        { k: { de: "Laufzeit ohne / mit 15 kg", en: "Runtime unloaded / with 15 kg", zh: "空载 / 15 kg 负载续航时间" }, v: "≥ 3 h / ≥ 2,5 h" },
        { k: { de: "Reichweite ohne / mit 15 kg", en: "Range unloaded / with 15 kg", zh: "空载 / 15 kg 负载续航里程" }, v: "≥ 15 km / ≥ 12 km" },
        { k: { de: "Treppen", en: "Stairs", zh: "楼梯" }, v: { de: "über 25 cm Stufenhöhe, bis 45°", en: "over 25 cm step height, to 45°", zh: "台阶高度超过 25 cm，坡度最大 45°" } }
      ]},
      { group: { de: "Doppeloptik-Gimbal", en: "Dual-optic gimbal", zh: "双光云台" }, rows: [
        { k: { de: "Bildsensor (sichtbar)", en: "Visible sensor", zh: "可见光图像传感器" }, v: "1/2,7″ Progressive Scan CMOS" },
        { k: { de: "Auflösung (sichtbar)", en: "Visible resolution", zh: "可见光分辨率" }, v: "2688 × 1520" },
        { k: { de: "Optischer Zoom", en: "Optical zoom", zh: "光学变焦" }, v: "33 ×" },
        { k: { de: "Mindestbeleuchtung", en: "Minimum illumination", zh: "最低照度" }, v: "0,003 lx / F1.65 (Farbe) · 0,0021 lx / F1.65 (s/w)" },
        { k: { de: "Wärmebildauflösung", en: "Thermal resolution", zh: "热成像分辨率" }, v: "640 × 384" },
        { k: { de: "Wellenlänge", en: "Wavelength", zh: "工作波长" }, v: "8–14 µm" },
        { k: { de: "Pixelgröße", en: "Pixel pitch", zh: "像元尺寸" }, v: "12 µm" },
        { k: { de: "Messgenauigkeit", en: "Measurement accuracy", zh: "测温精度" }, v: "± 2 °C" },
        { k: { de: "Messbereich", en: "Measurement range", zh: "测温范围" }, v: "−20 °C … +650 °C" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP66" }
      ]},
      { group: { de: "Ortung", en: "Positioning", zh: "定位模块" }, rows: [
        { k: { de: "Absoluter Fehler", en: "Absolute error", zh: "定位绝对误差" }, v: "< 3 cm" },
        { k: { de: "Driftfehler", en: "Cumulative drift", zh: "累积漂移误差" }, v: "< 1 %" },
        { k: { de: "Satellitensysteme", en: "Constellations", zh: "支持卫星系统" }, v: "GPS L1/L2/L5 · BDS B1/B2 · GLONASS G1/G2 · Galileo E1/E5 · QZSS L1/L2/L5 · NAVIC L5" },
        { k: { de: "Funkreichweite", en: "Radio range", zh: "通信距离" }, v: { de: "≤ 2 km im freien Feld", en: "≤ 2 km in open field", zh: "≤ 2 km（空旷场景）" } },
        { k: { de: "Arbeitsspeicher", en: "RAM", zh: "内存" }, v: "2 GB" }
      ]},
      { group: { de: "Mobilfunk & Netzwerk", en: "Cellular & network", zh: "移动通信与网络" }, rows: [
        { k: { de: "5G NR", en: "5G NR", zh: "5G NR" }, v: "NSA 2,2 Gbit/s ↓ / 575 Mbit/s ↑ · SA 2 Gbit/s ↓ / 1 Gbit/s ↑" },
        { k: { de: "4G LTE", en: "4G LTE", zh: "4G LTE" }, v: "600 Mbit/s ↓ / 150 Mbit/s ↑" },
        { k: { de: "5G-Bänder", en: "5G bands", zh: "5G 频段" }, v: "n1 / n20 / n28 / n41 / n77 / n78 / n79" },
        { k: { de: "LTE-Bänder", en: "LTE bands", zh: "LTE 频段" }, v: "B1 / B2 / B3 / B4 / B5 / B7 / B8 / B20 / B26 / B28 / B34 / B38 / B39 / B40 / B41" },
        { k: { de: "WLAN", en: "Wi-Fi", zh: "Wi-Fi" }, v: "802.11 b/g/n" },
        { k: { de: "Ethernet", en: "Ethernet", zh: "以太网" }, v: { de: "2 × 10/100/1000 Mbit/s (RJ45)", en: "2 × 10/100/1000 Mbit/s (RJ45)", zh: "2 × 10/100/1000 Mbit/s（RJ45）" } },
        { k: { de: "SIM", en: "SIM", zh: "SIM 卡槽" }, v: "1 × Micro-SIM" }
      ]},
      { group: { de: "Vier-in-eins-Lautsprecher", en: "Four-in-one hailer", zh: "四合一喊话器" }, rows: [
        { k: { de: "Lautstärke", en: "Volume", zh: "音量" }, v: "100–110 dB @ 1 m" },
        { k: { de: "Scheinwerfer", en: "Floodlight", zh: "照明灯" }, v: { de: "Streulicht nach vorn, kein Spot", en: "Forward flood, no spot", zh: "泛光向前照射，无聚光" } },
        { k: { de: "Blitzlicht", en: "Strobe", zh: "爆闪灯" }, v: { de: "Rot/Blau umschaltbar", en: "Red/blue switchable", zh: "红蓝可切换" } },
        { k: { de: "Mikrofone", en: "Microphones", zh: "收音麦克风" }, v: { de: "8 ×, wasserdicht, Reichweite 5–10 m", en: "8 ×, waterproof, 5–10 m pickup", zh: "8 麦，防水，收音距离 5–10 m" } }
      ]},
      { group: { de: "Folgemodul", en: "Following module", zh: "跟随模块" }, rows: [
        { k: { de: "Bedienung", en: "Control", zh: "控制方式" }, v: { de: "Einhandfernbedienung, Umschaltung Folgen / Manuell per Taste", en: "Single-hand remote, one-key switch between follow and manual", zh: "集成式单手遥控器，一键切换跟随与手动模式" } },
        { k: { de: "Folgewinkel", en: "Following angle", zh: "跟随角度" }, v: { de: "360°, kein toter Winkel", en: "360°, no blind spot", zh: "360°，无盲区" } },
        { k: { de: "Reichweite", en: "Range", zh: "续航里程" }, v: { de: "manuell ≥ 200 m · Folgeabstand 0,8–5 m einstellbar", en: "manual ≥ 200 m · follow distance adjustable 0.8–5 m", zh: "手动控制最远 ≥ 200 m · 跟随距离 0.8–5 m 可调" } },
        { k: { de: "Folgegeschwindigkeit", en: "Following speed", zh: "跟随速度" }, v: "≥ 1,5 m/s" },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP66" },
        { k: { de: "Gewicht Fernbedienung", en: "Remote weight", zh: "遥控器重量" }, v: "100 g" }
      ]}
    ],
    gallery: ["patrol-main"],
    scenes: ["patrol-dark"],
    hero: "patrol-dark",
    useCases: ["sicherheit", "museum", "industrie"]
  },

  /* ===================== FIRE CANNON ===================== */
  {
    id: "fire-cannon",
    slug: "loeschroboter-x30",
    sku: "NIC-QD-FIRE",
    category: "vierbeiner",
    brand: "NIC Robotics",
    order: 3,
    name: "Löschroboter X30-SP",
    title: { de: "Löschroboter X30-SP", en: "Fire Monitor Robot X30-SP", zh: "消防水炮机器人 X30-SP" },
    family: { de: "Einsatzkonfiguration · Brandbekämpfung", en: "Mission configuration · Firefighting", zh: "任务配置 · 消防灭火" },
    price: 5000,
    tagline: {
      de: "60 m Wurfweite, Vollstrahl oder Sprühnebel, mit eigener Kühlung.",
      en: "60 m throw, jet or fog, with its own cooling shroud.",
      zh: "射程 60 m，直流或喷雾，自带降温喷淋。"
    },
    summary: {
      de: "Ein Löschroboter für Brandstellen, die für Einsatzkräfte zu gefährlich oder zu eng sind. Der intelligente Wasserwerfer wirft bis 60 Meter weit, schaltet zwischen Vollstrahl und Sprühnebel um und arbeitet in drei Durchflussstufen. Eine doppelte Sprühkühlung schützt den Roboter selbst; die Schlauchkupplung lässt sich per Knopfdruck automatisch lösen. Im A/B-Punkt-Modus pendelt der Werfer selbstständig zwischen zwei Zielpunkten.",
      en: "A monitor robot for fire grounds too dangerous or too confined for crews. The intelligent water cannon throws up to 60 metres, switches between solid jet and fog, and runs three flow settings. A twin cooling spray protects the robot itself; the hose coupling releases automatically at the press of a button. In A/B point mode the monitor oscillates between two aim points on its own.",
      zh: "面向对消防员而言过于危险或过于狭窄的火场的灭火机器人。智能水炮射程可达 60 米，可在直流与喷雾之间自由切换，具备三档流量调节。双层降温喷淋可对机器人本体进行保护；水带接口支持一键自动脱带。在 A/B 点模式下，水炮可在两个目标点之间自动摆动喷射。"
    },
    highlights: [
      { de: "Wurfweite bis 60 m, drei Durchflussstufen", en: "Throw up to 60 m, three flow settings", zh: "水炮射程可达 60 m，三档流量可调" },
      { de: "Vollstrahl und Sprühnebel frei umschaltbar", en: "Solid jet and fog freely switchable", zh: "直流与喷雾两种模式自由切换" },
      { de: "Automatisches Lösen der Schlauchkupplung per Knopfdruck", en: "One-button automatic hose release", zh: "一键自动脱开水带接口" },
      { de: "Doppelte Sprühkühlung schützt den Roboterkörper", en: "Twin cooling spray shields the robot body", zh: "双层降温喷淋保护机器狗本体" },
      { de: "A/B-Punkt-Pendelbetrieb des Werfers", en: "A/B point oscillation of the monitor", zh: "水炮支持 A/B 点自摆功能" },
      { de: "Fern- und Handsteuerung, Geländegängigkeit des X30", en: "Remote and manual control, X30 terrain capability", zh: "远程与手动双操控模式，具备 X30 的全地形通行能力" }
    ],
    specs: [
      { group: { de: "Plattform", en: "Platform", zh: "平台" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "≤ 1000 × 470 × 695 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "≤ 60 kg" },
        { k: { de: "Max. Geschwindigkeit", en: "Max. speed", zh: "最大行进速度" }, v: "≥ 4 m/s" },
        { k: { de: "Max. Steigung", en: "Max. gradient", zh: "最大爬坡角度" }, v: { de: "30° (Treppe bis 45°)", en: "30° (stairs to 45°)", zh: "30°（楼梯最大 45°）" } },
        { k: { de: "Schutzart", en: "Ingress protection", zh: "防护等级" }, v: "IP67" },
        { k: { de: "Nutzlast / Maximallast", en: "Payload / maximum load", zh: "有效负载 / 最大负载" }, v: "≥ 20 kg / ≥ 85 kg" },
        { k: { de: "Laufzeit ohne / mit 20 kg", en: "Runtime unloaded / with 20 kg", zh: "空载 / 20 kg 负载续航时间" }, v: "≥ 4 h / ≥ 2,5 h" },
        { k: { de: "Reichweite ohne / mit 20 kg", en: "Range unloaded / with 20 kg", zh: "空载 / 20 kg 负载续航里程" }, v: "≥ 15 km / ≥ 10 km" },
        { k: { de: "Treppen", en: "Stairs", zh: "楼梯" }, v: { de: "ohne Last über 20 cm Stufenhöhe, bis 45°", en: "unloaded over 20 cm step height, to 45°", zh: "空载可攀爬超过 20 cm 高的台阶，坡度最大 45°" } }
      ]},
      { group: { de: "Wasserwerfer", en: "Water monitor", zh: "智能水炮" }, rows: [
        { k: { de: "Wurfweite", en: "Throw distance", zh: "射程" }, v: { de: "bis 60 m", en: "up to 60 m", zh: "最远 60 m" } },
        { k: { de: "Durchflussstufen", en: "Flow settings", zh: "流量档位" }, v: "3" },
        { k: { de: "Strahlarten", en: "Stream patterns", zh: "喷射模式" }, v: { de: "Vollstrahl / Sprühnebel", en: "Solid jet / fog", zh: "直流 / 喷雾" } },
        { k: { de: "Schlauchkupplung", en: "Hose coupling", zh: "水带接口" }, v: { de: "Automatisches Lösen per Knopfdruck", en: "One-button automatic release", zh: "一键自动脱带" } },
        { k: { de: "Eigenkühlung", en: "Self-cooling", zh: "本体降温" }, v: { de: "Doppelte Sprühkühlung des Roboterkörpers", en: "Twin cooling spray over the robot body", zh: "对机器人本体的双层降温喷淋" } },
        { k: { de: "Zielmodus", en: "Aiming mode", zh: "瞄准模式" }, v: { de: "A/B-Punkt-Pendelbetrieb", en: "A/B point oscillation", zh: "A/B 点自动摆动" } }
      ]},
      { group: { de: "Bewegung & Schutz", en: "Motion & protection", zh: "运动与保护" }, rows: [
        { k: { de: "Gangarten", en: "Gaits", zh: "运动方式" }, v: { de: "Gehen, Laufen, Kriechen; Aufstehen nach Sturz mit Richtungswahl", en: "Walk, run, crawl; stand up after a fall in a chosen direction", zh: "行走、跑步、匍匐；摔倒后可自主起立并选择起立方向" } },
        { k: { de: "Schutzfunktionen", en: "Protective functions", zh: "保护功能" }, v: { de: "Sturzselbstverriegelung, Unterspannungs- und Übertemperaturschutz, Ein-Tasten-Aufstehen", en: "Fall self-locking, low-voltage and over-temperature protection, one-touch stand-up", zh: "摔倒自锁保护、低电量保护、过温保护与一键起立" } }
      ]}
    ],
    gallery: ["firecannon-main"],
    scenes: ["firecannon-dark", "x30-rain"],
    hero: "firecannon-dark",
    useCases: ["feuerwehr", "industrie"]
  },

  /* ===================== FIRE RECON ===================== */
  {
    id: "fire-recon",
    slug: "erkundungsroboter-m20",
    sku: "NIC-WL-RECON",
    category: "radbein",
    brand: "NIC Robotics",
    order: 5,
    name: "Erkundungsroboter M20",
    title: { de: "Erkundungsroboter M20", en: "Reconnaissance Robot M20", zh: "消防侦察机器人 M20" },
    family: { de: "Einsatzkonfiguration · Erkundung", en: "Mission configuration · Reconnaissance", zh: "任务配置 · 侦察" },
    price: 5000,
    tagline: {
      de: "Vorerkundung im Rauch: Wärmebild, sechs Gase, Mesh-Funk, Gegensprechen.",
      en: "Recon in the smoke: thermal, six gases, mesh radio, two-way voice.",
      zh: "烟雾中的先期侦察：热成像、六种气体、Mesh 自组网、双向语音。"
    },
    summary: {
      de: "Der Erkundungsroboter geht vor der Mannschaft hinein. Er überträgt Live-Bilder aus dem Rauch, erkennt Brandherde und eingeschlossene Personen, misst sechs Gase samt Temperatur und Feuchte und baut dabei über Mesh-Funk eine eigene Kommunikationsstrecke auf — auch dort, wo kein Netz mehr steht. Zwei-Wege-Sprechverbindung erlaubt den direkten Kontakt zu Eingeschlossenen. Die symmetrische Rad-Bein-Bauform ohne Vorn und Hinten macht ihn in Trümmern, U-Bahn-Tunneln und Leitungsgängen wendig.",
      en: "The reconnaissance robot goes in ahead of the crew. It streams live images out of the smoke, identifies seats of fire and trapped people, measures six gases along with temperature and humidity, and builds its own communications path over mesh radio — including where no network is left standing. Two-way voice puts rescuers in direct contact with those trapped. The symmetrical wheel-legged body, with no front or rear, keeps it agile in rubble, metro tunnels and utility corridors.",
      zh: "侦察机器人先于人员进入现场。它从烟雾中实时回传画面，识别火点与被困人员，检测六种气体及温湿度，并通过 Mesh 自组网建立起自己的通信链路——即使现场网络已经瘫痪。双向语音通信可让救援人员与被困者直接对话。轮足形态头尾对称、不分前后，使其在建筑废墟、地铁隧道与地下管廊中行动灵活。"
    },
    highlights: [
      { de: "Wärmebild-Temperaturmessung auf 20 m: −20 °C bis 150 °C und 0 °C bis 550 °C", en: "Thermal measurement at 20 m: −20 °C to 150 °C and 0 °C to 550 °C", zh: "20 m 距离热成像测温：−20 °C 至 150 °C 及 0 °C 至 550 °C" },
      { de: "4 Megapixel im sichtbaren Spektrum", en: "4 megapixels in the visible spectrum", zh: "可见光 400 万像素" },
      { de: "Sechs Gase sowie Temperatur und Luftfeuchte", en: "Six gases plus temperature and humidity", zh: "可检测六种气体及温度、湿度" },
      { de: "Mesh-Eigenfunknetz, 4G/5G und Glasfaser", en: "Self-forming mesh radio, 4G/5G and fibre", zh: "Mesh 自组网、4G/5G 与光纤网络" },
      { de: "Kopf und Heck symmetrisch, Richtungswechsel in ≤ 1 s", en: "Symmetrical head and tail, direction reverses in ≤ 1 s", zh: "头尾对称，换向耗时 ≤ 1 秒" },
      { de: "Heißwechselakku für Dauerbetrieb im Extremfall", en: "Hot-swap battery for sustained operation in the extreme", zh: "热插拔快速换电，保障极端环境下持续作战" },
      { de: "Steigt vorwärts Stufen ab 80 cm Höhe unter 15 kg Last", en: "Climbs forward over steps from 80 cm under a 15 kg load", zh: "15 kg 负载下可正向上下 80 cm 以上的台阶" }
    ],
    specs: [
      { group: { de: "Plattform", en: "Platform", zh: "平台" }, rows: [
        { k: { de: "Maße (stehend)", en: "Dimensions (standing)", zh: "外形尺寸（站立）" }, v: "≤ 820 × 430 × 565 mm" },
        { k: { de: "Gewicht inkl. Akku", en: "Weight incl. battery", zh: "整机重量（含电池）" }, v: "≤ 35 kg" },
        { k: { de: "Nutzlast / Maximallast", en: "Payload / maximum load", zh: "有效负载 / 最大负载" }, v: "15 kg / 50 kg" },
        { k: { de: "Arbeitsgeschwindigkeit", en: "Operating speed", zh: "作业速度" }, v: { de: "≥ 2 m/s unter Normallast, Spitze ≥ 5 m/s", en: "≥ 2 m/s at rated load, ≥ 5 m/s peak", zh: "标准负载下工作速度 ≥ 2 m/s，极限速度 ≥ 5 m/s" } },
        { k: { de: "Steigung", en: "Gradient", zh: "爬坡能力" }, v: "≥ 45°" },
        { k: { de: "Treppen unter Last", en: "Stairs under load", zh: "负载状态下的楼梯攀爬" }, v: { de: "durchgehend ≥ 25 cm bei ≥ 45°", en: "continuous ≥ 25 cm at ≥ 45°", zh: "连续跨越 ≥ 25 cm，坡度 ≥ 45°" } },
        { k: { de: "Stufen vorwärts unter Last", en: "Forward steps under load", zh: "负载状态下正向跨越台阶" }, v: "≥ 80 cm" },
        { k: { de: "Laufzeit ohne / mit 15 kg", en: "Runtime unloaded / with 15 kg", zh: "空载 / 15 kg 负载续航时间" }, v: "≥ 3 h / ≥ 2,5 h" },
        { k: { de: "Reichweite ohne / mit 15 kg", en: "Range unloaded / with 15 kg", zh: "空载 / 15 kg 负载续航里程" }, v: "≥ 15 km / ≥ 12 km" },
        { k: { de: "Richtungswechsel", en: "Direction reversal", zh: "换向" }, v: { de: "≤ 1 s, X-Beinkonfiguration, Richtungsanzeige per Leuchtband", en: "≤ 1 s, X leg configuration, direction shown by light strip", zh: "≤ 1 秒，腿部 X 构型，通过指示灯带显示当前正方向" } }
      ]},
      { group: { de: "Sensorik", en: "Sensing", zh: "传感器" }, rows: [
        { k: { de: "Wärmebild — Messabstand", en: "Thermal — measuring distance", zh: "热成像——测温距离" }, v: "20 m" },
        { k: { de: "Wärmebild — Messbereich", en: "Thermal — range", zh: "热成像——测温范围" }, v: { de: "Tieftemperatur −20 °C … 150 °C · Hochtemperatur 0 °C … 550 °C", en: "Low range −20 °C … 150 °C · high range 0 °C … 550 °C", zh: "低温段 −20 °C … 150 °C · 高温段 0 °C … 550 °C" } },
        { k: { de: "Sichtbares Spektrum", en: "Visible spectrum", zh: "可见光" }, v: { de: "4 Megapixel", en: "4 megapixels", zh: "400 万像素" } },
        { k: { de: "Gasmessung", en: "Gas detection", zh: "气体检测" }, v: { de: "6 Gase, Temperatur, Luftfeuchte", en: "6 gases, temperature, humidity", zh: "6 种气体、温度、湿度" } }
      ]},
      { group: { de: "Kommunikation", en: "Communications", zh: "通信" }, rows: [
        { k: { de: "Mesh", en: "Mesh", zh: "Mesh 自组网" }, v: { de: "Selbstorganisierendes Funknetz", en: "Self-forming radio network", zh: "自组织无线网络" } },
        { k: { de: "Mobilfunk", en: "Cellular", zh: "移动网络" }, v: "4G / 5G" },
        { k: { de: "Kabel", en: "Wired", zh: "有线" }, v: { de: "Glasfaser", en: "Fibre optic", zh: "光纤" } },
        { k: { de: "Sprache", en: "Voice", zh: "语音" }, v: { de: "Zwei-Wege-Gegensprechen", en: "Two-way intercom", zh: "双向语音对讲" } }
      ]},
      { group: { de: "Betrieb", en: "Operation", zh: "运行" }, rows: [
        { k: { de: "Akku", en: "Battery", zh: "电池" }, v: { de: "Heißwechselbar, Tausch ohne Abschalten", en: "Hot-swappable, change without shutdown", zh: "热插拔，换电无需关机" } },
        { k: { de: "Hindernisvermeidung", en: "Obstacle avoidance", zh: "避障" }, v: { de: "Rundum-Stopp auch mit aufgebauter Nutzlast", en: "Omnidirectional stop, also with payload fitted", zh: "装载上装后仍具备全向停障能力" } }
      ]}
    ],
    gallery: ["firerecon-main"],
    scenes: ["firerecon-dark"],
    hero: "firerecon-dark",
    useCases: ["feuerwehr", "industrie", "sicherheit"]
  }
];

/* --------------------------------------------------------------------------
   EINSATZBEREICHE / APPLICATION SCENARIOS
   -------------------------------------------------------------------------- */
NIC.useCases = [
  {
    id: "industrie",
    slug: "industrieinspektion",
    order: 1,
    name: { de: "Industrie- und Anlageninspektion", en: "Industrial & Plant Inspection", zh: "工业与设备巡检" },
    kicker: { de: "Rundgang", en: "The round", zh: "巡检" },
    tagline: {
      de: "Der Rundgang, der nie ausfällt.",
      en: "The round that never gets skipped.",
      zh: "永远不会被跳过的那趟巡检。"
    },
    body: {
      de: "Jede Anlage hat eine Checkliste, die zweimal pro Schicht abgelaufen werden müsste — und die in der Realität bei Personalmangel als Erstes gestrichen wird. Ein Vierbeiner läuft dieselbe Route jede Stunde, nachts wie am Wochenende, und liefert jedes Mal denselben Datensatz: Wärmebild jedes Lagers, Manometerstand als abgelesene Zahl, Gaskonzentration, Körperschall. Abweichungen gehen als Meldung heraus, bevor sie zum Stillstand werden.",
      en: "Every plant has a checklist that ought to be walked twice a shift — and that, when staffing is tight, is the first thing to be dropped. A quadruped walks the same route every hour, at night and at weekends, and returns the same dataset each time: a thermal image of every bearing, a gauge reading as a number, gas concentration, structure-borne sound. Deviations leave as an alert before they become a shutdown.",
      zh: "每座工厂都有一份本该每班走两遍的检查清单——而现实中一旦人手紧张，它就是第一个被砍掉的。四足机器人每小时走同一条路线，夜间和周末照走不误，每次都交出同样的一组数据：每个轴承的热成像、压力表读数的具体数字、气体浓度、结构噪声。异常会在演变成停机之前以告警的形式发出来。"
    },
    points: [
      { de: "Wärmebild von Lagern, Schaltanlagen und Rohrleitungen", en: "Thermal imaging of bearings, switchgear and pipework", zh: "轴承、配电柜与管路的热成像检测" },
      { de: "Automatisches Ablesen analoger Anzeigen und Zählerstände", en: "Automatic reading of analogue gauges and meters", zh: "自动读取指针式仪表与计数器读数" },
      { de: "Gasmessung in Bereichen ohne feste Sensorik", en: "Gas measurement in areas without fixed sensors", zh: "在没有固定传感器的区域进行气体检测" },
      { de: "Lückenlose Dokumentation für Audit und Versicherung", en: "Gap-free documentation for audit and insurance", zh: "可用于审计与保险的完整记录" }
    ],
    facts: [
      { v: "24/7", de: "Inspektion bei jedem Wetter", en: "All-weather inspection", zh: "全天候巡检" },
      { v: "IP67", de: "Schutzart", en: "Ingress protection", zh: "防护等级" },
      { v: "4 h", de: "Laufzeit", en: "Runtime", zh: "续航" }
    ],
    scene: "x30-dark",
    products: ["x30", "patrol-m20", "lynx-m20-pro"]
  },
  {
    id: "energie",
    slug: "energie-und-netze",
    order: 2,
    name: { de: "Energieversorgung und Netze", en: "Energy & Utility Networks", zh: "电力与管网" },
    kicker: { de: "Netz", en: "The grid", zh: "电网" },
    tagline: {
      de: "Umspannwerke, Kabeltunnel, Kraftwerksblöcke.",
      en: "Substations, cable tunnels, generating blocks.",
      zh: "变电站、电缆隧道、发电机组。"
    },
    body: {
      de: "Umspannwerke stehen allein, oft kilometerweit vom nächsten Stützpunkt, und ein Teilentladungsfehler kündigt sich wochenlang an, bevor er ausfällt — wenn jemand hinhört. Ein stationierter Vierbeiner hört jede Stunde hin. Er misst Teilentladung akustisch und per UHF, prüft Anschlussklemmen thermisch, erkennt Ölaustritt optisch und fährt dabei durch Gelände, auf dem ein Fahrroboter an der ersten Kabelrinne hängenbleibt.",
      en: "Substations stand alone, often kilometres from the nearest depot, and a partial-discharge fault announces itself for weeks before it fails — if anyone is listening. A stationed quadruped listens every hour. It measures partial discharge acoustically and by UHF, checks terminals thermally, spots oil leaks optically, and does it across ground where a wheeled robot hangs up on the first cable tray.",
      zh: "变电站往往独立运行，离最近的运维点常有数公里之遥，而局部放电故障在真正失效前会持续数周发出征兆——前提是有人在听。一台驻站的四足机器人每小时都在听。它通过声学与特高频检测局部放电，对接线端子做热成像检查，用视觉识别渗油，并能通过轮式机器人在第一条电缆沟就会卡住的地形。"
    },
    points: [
      { de: "Teilentladungsmessung akustisch und per UHF", en: "Partial-discharge measurement, acoustic and UHF", zh: "声学与特高频局部放电检测" },
      { de: "Thermografie an Klemmen, Trennern und Transformatoren", en: "Thermography of terminals, isolators and transformers", zh: "端子、隔离开关与变压器的热成像检测" },
      { de: "Kabeltunnel und Leitungsgänge ohne Mobilfunkempfang", en: "Cable tunnels and utility corridors with no cellular coverage", zh: "无移动信号覆盖的电缆隧道与管廊" },
      { de: "Unbemannte Station mit autonomer Ladung", en: "Unmanned station with autonomous charging", zh: "配备自主充电的无人值守驻站" }
    ],
    facts: [
      { v: "IP67", de: "Schutzart", en: "Ingress protection", zh: "防护等级" },
      { v: "45°", de: "Treppenneigung", en: "Stair gradient", zh: "楼梯坡度" },
      { v: "15 km", de: "Reichweite", en: "Range", zh: "续航里程" }
    ],
    scene: "m20-substation",
    products: ["x30", "lynx-m20s", "lynx-m20-pro"]
  },
  {
    id: "feuerwehr",
    slug: "feuerwehr-und-rettung",
    order: 3,
    name: { de: "Feuerwehr und Rettungsdienst", en: "Fire & Rescue", zh: "消防与救援" },
    kicker: { de: "Einsatz", en: "The call", zh: "出警" },
    tagline: {
      de: "Erst der Roboter, dann der Mensch.",
      en: "The robot first, then the person.",
      zh: "先上机器人，再上人。"
    },
    body: {
      de: "Die gefährlichsten Minuten eines Einsatzes sind die ersten, in denen niemand weiß, was hinter der Tür liegt. Ein Erkundungsroboter geht hinein, bevor jemand die Atemschutzflasche aufsetzt: Wärmebild durch den Rauch, Gasmessung in Echtzeit, Gegensprechverbindung zu Eingeschlossenen und ein Mesh-Funknetz, das auch dann noch steht, wenn die Gebäudetechnik längst ausgefallen ist. Der Löschroboter übernimmt danach die Position, an der ein Strahlrohr keinen Menschen mehr halten darf.",
      en: "The most dangerous minutes of a call are the first ones, when nobody knows what lies behind the door. A reconnaissance robot goes in before anyone dons a breathing set: thermal through the smoke, gas readings in real time, two-way voice to those trapped, and a mesh radio network that stays up long after the building's own systems are gone. The monitor robot then takes the position where no human should be holding a branch.",
      zh: "一次出警中最危险的是最初那几分钟，没人知道门后面是什么。侦察机器人在有人背上空气呼吸器之前就先进去：穿透烟雾的热成像、实时气体检测、与被困者的双向语音，以及在楼宇系统早已瘫痪后仍然可用的 Mesh 自组网。随后灭火机器人接管那个不该再由人握着水枪的位置。"
    },
    points: [
      { de: "Vorerkundung in Rauch, Trümmern und engen Räumen", en: "Advance reconnaissance in smoke, rubble and confined spaces", zh: "在烟雾、废墟与狭窄空间中先期侦察" },
      { de: "Brandherd- und Personenerkennung per Wärmebild", en: "Seat-of-fire and casualty detection by thermal imaging", zh: "通过热成像识别火点与被困人员" },
      { de: "Gasmessung und Temperaturüberwachung aus sicherer Entfernung", en: "Gas and temperature monitoring from a safe distance", zh: "在安全距离外进行气体检测与温度监控" },
      { de: "Löschangriff aus 60 m Entfernung ohne Personal in der Gefahrenzone", en: "Attack from 60 m with no crew in the danger zone", zh: "从 60 m 外发起灭火，危险区内无需人员" },
      { de: "Eigene Funkstrecke, wenn kein Netz mehr steht", en: "Its own radio path when no network is left", zh: "现场网络瘫痪时自建通信链路" }
    ],
    facts: [
      { v: "60 m", de: "Wurfweite", en: "Monitor throw", zh: "水炮射程" },
      { v: "0", de: "Personen in der Gefahrenzone", en: "Crew in the danger zone", zh: "危险区人员" },
      { v: "IP67", de: "Schutzart", en: "Ingress protection", zh: "防护等级" }
    ],
    scene: "feuerwehr-einsatz",
    products: ["fire-recon", "fire-cannon", "x30"]
  },
  {
    id: "sicherheit",
    slug: "objektschutz",
    order: 4,
    name: { de: "Objektschutz und Streifendienst", en: "Security & Patrol", zh: "安防与巡逻" },
    kicker: { de: "Streife", en: "The patrol", zh: "巡逻" },
    tagline: {
      de: "Die Runde um drei Uhr nachts, jede Nacht gleich gründlich.",
      en: "The three-a.m. round, equally thorough every night.",
      zh: "凌晨三点那一趟，每晚都一样认真。"
    },
    body: {
      de: "Festinstallierte Kameras sehen, was im Bildausschnitt liegt. Ein Streifenroboter geht dorthin, wo keine Kamera hängt: hinter den Container, in die Tiefgarage, auf die Rückseite der Halle. Er erkennt Personen und Fahrzeuge selbstständig, spricht sie über den Lautsprecher an, setzt Rot-Blau-Blitzlicht ein und überträgt alles per 5G in die Leitstelle — und fährt danach allein in die Ladestation zurück.",
      en: "Fixed cameras see what falls inside the frame. A patrol robot goes where no camera hangs: behind the container, into the underground car park, around the back of the hall. It recognises people and vehicles on its own, challenges them over the hailer, deploys a red/blue strobe, and backhauls everything to the control room over 5G — then docks itself afterwards.",
      zh: "固定摄像头只能看到画面框里的东西。巡逻机器人去的是没有摄像头的地方：集装箱背后、地下车库、厂房后侧。它自动识别人员与车辆，通过喊话器喊话，启动红蓝爆闪，并把全过程经 5G 传回指挥中心——然后自己回到充电桩。"
    },
    points: [
      { de: "Streife auf Gelände, in dem Fahrroboter an Stufen scheitern", en: "Patrol across sites where wheeled robots fail at the first step", zh: "在轮式机器人会被台阶挡住的场地执行巡逻" },
      { de: "KI-Erkennung von Personen, Fahrzeugen, Rauch und Feuer", en: "AI detection of people, vehicles, smoke and fire", zh: "AI 识别人员、车辆、烟雾与火情" },
      { de: "Ansprache per Lautsprecher und Rot-Blau-Blitzlicht", en: "Hailer challenge and red/blue strobe", zh: "喊话器语音警示与红蓝爆闪" },
      { de: "Personenfolgemodus als Begleitung für Wachpersonal", en: "Person-following mode as an escort for guards", zh: "人机跟随模式，可随行陪同安保人员" },
      { de: "7×24-h-Dienst durch autonomes Laden", en: "7×24 h duty through autonomous charging", zh: "依靠自主充电实现 7×24 小时值守" }
    ],
    facts: [
      { v: "7×24", de: "Stunden im Dienst", en: "Hours on duty", zh: "小时值守" },
      { v: "5 m/s", de: "Geschwindigkeit", en: "Speed", zh: "行进速度" },
      { v: "45°", de: "Treppen", en: "Stairs", zh: "楼梯坡度" }
    ],
    scene: "patrol-dark",
    products: ["patrol-m20", "x30", "lynx-m20s"]
  },
  {
    id: "museum",
    slug: "museum-und-besucherfuehrung",
    order: 5,
    name: { de: "Museum und Besucherführung", en: "Museums & Visitor Guidance", zh: "博物馆与参观导览" },
    kicker: { de: "Führung", en: "The tour", zh: "导览" },
    tagline: {
      de: "Ein Guide, der nie müde wird und zwölf Sprachen spricht.",
      en: "A guide that never tires and speaks twelve languages.",
      zh: "一个永不疲倦、会说十二种语言的讲解员。"
    },
    body: {
      de: "In Museen, Science Centern und Unternehmensforen ist der Roboter zugleich Exponat und Vermittler. Er führt eine Gruppe über eine hinterlegte Route, hält an jeder Station, spricht in der Sprache der Besucher und beantwortet Fragen — und zieht dabei Menschen an, die an einem Bildschirm vorbeigelaufen wären. Die Begeisterung über die Form ist der Einstieg in den Inhalt.",
      en: "In museums, science centres and corporate forums the robot is both exhibit and interpreter. It walks a group along a stored route, stops at every station, speaks in the visitors' language and answers questions — and draws in people who would have walked straight past a screen. Delight at the form is the way into the content.",
      zh: "在博物馆、科技馆与企业展厅里，机器人既是展品也是讲解者。它带着一组参观者沿预设路线行进，在每个展位停下，用参观者的语言讲解并回答提问——同时还能吸引住那些本来会径直走过屏幕的人。对形态的好奇，正是进入内容的入口。"
    },
    points: [
      { de: "Routenführung mit Halt an jeder Station", en: "Route guidance with a stop at every station", zh: "按预设路线导览，每个展位自动停留" },
      { de: "Mehrsprachige Ansprache und Fragenbeantwortung", en: "Multilingual narration and question answering", zh: "多语言讲解与问答" },
      { de: "Gruppenchoreografie mehrerer Einheiten für Veranstaltungen", en: "Multi-unit choreography for events", zh: "活动场合可多台设备编队表演" },
      { de: "Hohe Aufmerksamkeit — messbar mehr Verweildauer", en: "High attention — measurably longer dwell time", zh: "关注度高——可量化地延长停留时间" }
    ],
    facts: [
      { v: "12", de: "Sprachen", en: "Languages", zh: "种语言" },
      { v: "0", de: "Pausen", en: "Breaks", zh: "次休息" }
    ],
    scene: "m20-dune",
    products: ["lite3", "patrol-m20"]
  },
  {
    id: "forschung",
    slug: "forschung-und-lehre",
    order: 6,
    name: { de: "Forschung und Lehre", en: "Research & Teaching", zh: "科研与教学" },
    kicker: { de: "Labor", en: "The lab", zh: "实验室" },
    tagline: {
      de: "Offene Plattformen statt geschlossener Produkte.",
      en: "Open platforms, not closed products.",
      zh: "开放平台，而不是封闭产品。"
    },
    body: {
      de: "Für Lehrstühle und Forschungsgruppen zählt nicht, was der Roboter ab Werk kann, sondern was sich auf ihm ersetzen lässt. Unsere Plattformen liefern URDF-Modelle, Bewegungs-SDK, APIs und Wahrnehmungsschnittstellen mit Beispielcode — Regelung bis 1 kHz, ROS- und ROS-2-Anbindung, dokumentierte Hardwareschnittstellen für eigene Sensorik. Wir liefern an europäische Hochschulen mit Rechnung und Angebot für Beschaffungsverfahren.",
      en: "For chairs and research groups what counts is not what the robot does out of the box, but what can be replaced on it. Our platforms ship URDF models, motion SDK, APIs and perception interfaces with example code — control loops to 1 kHz, ROS and ROS 2 bridges, documented hardware interfaces for your own sensors. We supply European universities with invoices and quotations suited to procurement procedures.",
      zh: "对院系与课题组来说，重要的不是机器人出厂时能做什么，而是上面有多少东西可以被替换。我们的平台提供 URDF 模型、运动控制 SDK、API 与感知接口及示例代码——控制频率达 1 kHz，支持 ROS 与 ROS 2，硬件接口文档齐全，可加装自有传感器。我们可向欧洲高校供货，并提供符合采购流程要求的报价与发票。"
    },
    points: [
      { de: "URDF- und Simulationsmodelle, Bewegungs-SDK, APIs", en: "URDF and simulation models, motion SDK, APIs", zh: "URDF 与仿真模型、运动控制 SDK、API" },
      { de: "ROS- und ROS-2-Anbindung, Regelung bis 1 kHz", en: "ROS and ROS 2 bridges, control loops to 1 kHz", zh: "支持 ROS 与 ROS 2，控制频率达 1 kHz" },
      { de: "Dokumentierte Schnittstellen für eigene Nutzlasten", en: "Documented interfaces for your own payloads", zh: "接口文档齐全，可加装自有负载" },
      { de: "Angebote und Rechnungen für Beschaffungsverfahren", en: "Quotations and invoices fit for procurement", zh: "符合采购流程要求的报价与发票" },
      { de: "Staffelpreise für Mehrfachbeschaffung und Lehrflotten", en: "Tiered pricing for multiple units and teaching fleets", zh: "批量采购与教学机队享阶梯价" }
    ],
    facts: [
      { v: "1 kHz", de: "Regelfrequenz", en: "Control rate", zh: "控制频率" },
      { v: "ROS 2", de: "Schnittstelle", en: "Interface", zh: "接口" },
      { v: "SDK", de: "Offene APIs", en: "Open APIs", zh: "开放接口" }
    ],
    scene: "lite3-hero",
    products: ["lite3", "x30", "lynx-m20-pro"]
  },
  {
    id: "pflege",
    slug: "pflege-und-begleitung",
    order: 7,
    name: { de: "Pflege und Begleitung", en: "Care & Companionship", zh: "养老与陪伴" },
    kicker: { de: "Alltag", en: "Daily life", zh: "日常" },
    tagline: {
      de: "Wege abnehmen, damit Zeit für Menschen bleibt.",
      en: "Take over the walking so there is time for people.",
      zh: "把跑腿的路接过来，把时间留给人。"
    },
    body: {
      de: "Pflegekräfte verbringen einen erheblichen Teil ihrer Schicht mit Transportwegen: Wäsche, Mahlzeiten, Material, Proben. Serviceroboter übernehmen diese Wege, erinnern an Medikamente, stellen auf Zuruf eine Videoverbindung zu Angehörigen her und melden Stürze. Das Ziel ist nicht, Menschen zu ersetzen, sondern den Anteil der Schicht zu vergrößern, der tatsächlich am Menschen stattfindet.",
      en: "Care staff spend a substantial share of a shift on transport: laundry, meals, supplies, samples. Service robots take over those trips, prompt medication, open a video call to relatives on request, and report falls. The aim is not to replace people but to enlarge the part of the shift that is actually spent with people.",
      zh: "护理人员的相当一部分工时花在运送上：被服、餐食、物资、样本。服务机器人接手这些路程，提醒用药，按需接通与家属的视频，并在发生跌倒时报警。目标不是取代人，而是让一个班次中真正花在人身上的比例变大。"
    },
    points: [
      { de: "Transport von Wäsche, Mahlzeiten, Material und Proben", en: "Transport of laundry, meals, supplies and samples", zh: "运送被服、餐食、物资与样本" },
      { de: "Medikamenten- und Terminerinnerung", en: "Medication and appointment reminders", zh: "用药与日程提醒" },
      { de: "Telepräsenz zu Angehörigen und Ärzten", en: "Telepresence to relatives and physicians", zh: "与家属、医生的远程视频" },
      { de: "Sturzerkennung und Alarmierung", en: "Fall detection and alerting", zh: "跌倒检测与报警" }
    ],
    scene: null,
    status: "soon",
    products: []
  },
  {
    id: "logistik",
    slug: "logistik-und-transport",
    order: 8,
    name: { de: "Logistik und Transport", en: "Logistics & Transport", zh: "物流与运输" },
    kicker: { de: "Weg", en: "The route", zh: "路段" },
    tagline: {
      de: "Die letzten hundert Meter, die kein Fahrzeug fährt.",
      en: "The last hundred metres no vehicle drives.",
      zh: "没有车能跑的最后一百米。"
    },
    body: {
      de: "Zwischen Rampe und Einsatzort liegen oft Treppen, Schotter, Baustellenwege oder ein Hang — genau die Strecke, die ein Flurförderzeug nicht schafft und ein Mensch zu Fuß zurücklegt. Rad-Bein-Roboter tragen dort bis 35 kg, fahren auf befestigtem Untergrund mit Radgeschwindigkeit und steigen am Ende der Strecke in den Beinmodus.",
      en: "Between the ramp and the point of use there are often stairs, gravel, site tracks or a slope — precisely the stretch an industrial truck cannot manage and a person covers on foot. Wheel-legged robots carry up to 35 kg there, run at wheel speed on hard ground, and shift into leg mode at the end of the route.",
      zh: "从卸货平台到使用地点之间，常常隔着楼梯、碎石、工地便道或一道坡——正是叉车过不去、只能靠人走过去的那一段。轮足机器人在这里可承载最高 35 kg，在硬质路面上以轮速行进，遇到障碍时切换为腿部模式。"
    },
    points: [
      { de: "Bis 35 kg Nutzlast bei 35 kg Eigengewicht", en: "Up to 35 kg of payload at 35 kg of its own weight", zh: "自重 35 kg，可承载最高 35 kg 负载" },
      { de: "Radgeschwindigkeit auf der Strecke, Beinmodus am Hindernis", en: "Wheel speed on the route, leg mode at the obstacle", zh: "路面上用轮速行进，遇障碍切换腿部模式" },
      { de: "Treppen und Stufen bis 30 cm unter Last", en: "Stairs and steps to 30 cm under load", zh: "负载状态下可跨越 30 cm 的楼梯与台阶" },
      { de: "Heißwechselakku für durchgehenden Schichtbetrieb", en: "Hot-swap battery for continuous shift operation", zh: "热插拔电池，支持连续轮班作业" }
    ],
    facts: [
      { v: "35 kg", de: "Nutzlast", en: "Payload", zh: "负载" },
      { v: "30 cm", de: "Stufen unter Last", en: "Steps under load", zh: "负载跨台阶" },
      { v: "2 m/s", de: "Arbeitstempo", en: "Working speed", zh: "作业速度" }
    ],
    scene: "m20-forest",
    products: ["lynx-m20s", "lynx-m20-pro", "lynx-m20"]
  }
];

/* --------------------------------------------------------------------------
   Hilfsfunktionen
   -------------------------------------------------------------------------- */
NIC.byId = function (list, id) { return list.filter(function (x) { return x.id === id; })[0]; };
NIC.productsIn = function (catId) {
  return NIC.products.filter(function (p) { return p.category === catId; })
    .sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
};

/* ---- Einsatzbereiche: Stand nach den sechs Branchenlösungen der Herstellerpartner (2026) ---- */
(function (D) {
  NIC.useCases.forEach(function (u) { if (D[u.id]) Object.keys(D[u.id]).forEach(function (k) { u[k] = D[u.id][k]; }); });
})({
 "energie": {
  "order": 1,
  "name": {
   "de": "Energie & Stromnetz",
   "en": "Energy & power grid",
   "zh": "能源电力"
  },
  "tagline": {
   "de": "Autonome Inspektion entlang der ganzen Kette — von der Erzeugung bis zum Verbrauch.",
   "en": "Autonomous inspection along the entire chain — from generation to consumption.",
   "zh": "从发电到用电，全链路自主巡检。"
  },
  "pains": [
   {
    "de": "Umspannwerke stehen dicht bestückt, Gänge sind eng; ein manueller Rundgang dauert zwei bis drei Stunden",
    "en": "Substations are densely packed with narrow aisles; a manual round takes two to three hours",
    "zh": "变电站设备密集、通道狭窄，人工巡检一次通常需要 2–3 小时"
   },
   {
    "de": "Hochspannung, Absturzgefahr und Nachtschichten gefährden das Personal",
    "en": "High voltage, fall hazards and night shifts put staff at risk",
    "zh": "高压触电、跌落和夜间作业带来人身安全风险"
   },
   {
    "de": "Kabeltunnel und Anlagen in Wüste oder Gebirge liegen weit vom nächsten Stützpunkt",
    "en": "Cable tunnels and sites in desert or mountains lie far from the nearest depot",
    "zh": "电缆隧道以及戈壁、山区站点离运维点很远"
   }
  ],
  "solution": [
   {
    "de": "Durchgängige Inspektion über Erzeugung, Übertragung, Umspannung, Verteilung und Verbrauch",
    "en": "Continuous inspection across generation, transmission, substations, distribution and consumption",
    "zh": "覆盖发电、输电、变电、配电、用电全链路的自动化巡检"
   },
   {
    "de": "Automatisches Ablesen von Zeiger-, Digital- und Zustandsanzeigen, Meldeleuchten und Infrarot-Temperatur",
    "en": "Automatic reading of analogue, digital and status gauges, indicator lights and infrared temperature",
    "zh": "自动识别指针表、数字表、状态表、指示灯和红外温度"
   },
   {
    "de": "Vierbeiner X30 für enge Gänge und Treppen, Rad-Bein-Roboter M20 für schnelle Runden — im Verbund ohne tote Winkel",
    "en": "X30 quadruped for tight aisles and stairs, M20 wheel-legged robot for fast rounds — together with no blind spots",
    "zh": "X30 四足机器人深入狭窄通道和楼梯，山猫 M20 轮足机器人快速巡检，协同作业消除视野盲区"
   },
   {
    "de": "Autonomes Laden: Der Roboter erkennt den Akkustand und fährt selbst zur Ladestation",
    "en": "Autonomous charging: the robot checks its battery and docks itself",
    "zh": "自主充电：机器人判断电量后自行前往充电桩"
   },
   {
    "de": "Bei Funkabbruch setzt er die Runde autonom fort und kehrt selbst zurück",
    "en": "If the link drops, it completes the round and returns on its own",
    "zh": "网络中断时仍可自主完成巡检并自动返航"
   }
  ],
  "proof": [
   {
    "de": "Über 100 Umspannwerke in China mit vollautonomer Inspektion",
    "en": "Over 100 substations in China with fully autonomous inspection",
    "zh": "已在国内超过 100 座变电站实现全自主巡检"
   },
   {
    "de": "Singapur: X30 inspiziert Stromtunnel — 480 Stunden Personalaufwand pro Tunnel und Jahr gespart",
    "en": "Singapore: X30 inspects power tunnels — 480 staff hours saved per tunnel per year",
    "zh": "新加坡电力隧道：X30 自主巡检，单条隧道每年节省 480 小时人工"
   },
   {
    "de": "Im Einsatz in Windpark-Umspannwerken in der Wüste und in einem europäischen Kernkraftwerk",
    "en": "Deployed at desert wind-farm substations and in a European nuclear power plant",
    "zh": "已部署于戈壁风电场升压站和欧洲核电站"
   }
  ],
  "coming": [
   {
    "de": "Humanoider Roboter DR02 — Feldtest im Umspannwerk abgeschlossen",
    "en": "DR02 humanoid — substation field test completed",
    "zh": "DR02 人形机器人——已完成变电站现场作业测试"
   }
  ],
  "facts": [
   {
    "v": "96,5 %",
    "de": "Erkennungsgenauigkeit",
    "en": "Recognition accuracy",
    "zh": "识别准确率"
   },
   {
    "v": ">1000 h",
    "de": "Laufzeit ohne Störung (MTBF)",
    "en": "Mean time between failures",
    "zh": "平均无故障时间"
   },
   {
    "v": "480 h",
    "de": "Personalzeit gespart pro Tunnel und Jahr",
    "en": "Staff hours saved per tunnel per year",
    "zh": "单隧道年省人工"
   }
  ],
  "products": [
   "x30",
   "lynx-m20",
   "lynx-m20-pro"
  ],
  "points": [
   {
    "de": "Durchgängige Inspektion über Erzeugung, Übertragung, Umspannung, Verteilung und Verbrauch",
    "en": "Continuous inspection across generation, transmission, substations, distribution and consumption",
    "zh": "覆盖发电、输电、变电、配电、用电全链路的自动化巡检"
   },
   {
    "de": "Automatisches Ablesen von Zeiger-, Digital- und Zustandsanzeigen, Meldeleuchten und Infrarot-Temperatur",
    "en": "Automatic reading of analogue, digital and status gauges, indicator lights and infrared temperature",
    "zh": "自动识别指针表、数字表、状态表、指示灯和红外温度"
   },
   {
    "de": "Vierbeiner X30 für enge Gänge und Treppen, Rad-Bein-Roboter M20 für schnelle Runden — im Verbund ohne tote Winkel",
    "en": "X30 quadruped for tight aisles and stairs, M20 wheel-legged robot for fast rounds — together with no blind spots",
    "zh": "X30 四足机器人深入狭窄通道和楼梯，山猫 M20 轮足机器人快速巡检，协同作业消除视野盲区"
   },
   {
    "de": "Autonomes Laden: Der Roboter erkennt den Akkustand und fährt selbst zur Ladestation",
    "en": "Autonomous charging: the robot checks its battery and docks itself",
    "zh": "自主充电：机器人判断电量后自行前往充电桩"
   },
   {
    "de": "Bei Funkabbruch setzt er die Runde autonom fort und kehrt selbst zurück",
    "en": "If the link drops, it completes the round and returns on its own",
    "zh": "网络中断时仍可自主完成巡检并自动返航"
   }
  ]
 },
 "industrie": {
  "order": 2,
  "name": {
   "de": "Industrielle Instandhaltung",
   "en": "Industrial operations & maintenance",
   "zh": "工业运维"
  },
  "tagline": {
   "de": "Hitze, Staub, giftige Gase — der Roboter geht zuerst.",
   "en": "Heat, dust, toxic gas — send the robot in first.",
   "zh": "高温、粉尘、有毒气体——让机器人先去。"
  },
  "pains": [
   {
    "de": "Hohe Temperaturen, Staub und giftige Gase in Chemie-, Stahl- und Kraftwerksanlagen",
    "en": "High temperatures, dust and toxic gases in chemical, steel and power plants",
    "zh": "化工、钢铁、电厂等场所存在高温、粉尘和有毒气体"
   },
   {
    "de": "Rohrleitungsgänge, Treppen und Gitterroste, an denen Fahrroboter scheitern",
    "en": "Pipe galleries, stairs and grating where wheeled robots fail",
    "zh": "管廊、楼梯、格栅地面，轮式机器人难以通行"
   },
   {
    "de": "Rundgänge fallen aus oder werden lückenhaft dokumentiert",
    "en": "Rounds get skipped or are poorly documented",
    "zh": "人工巡检容易漏检，记录不完整"
   }
  ],
  "solution": [
   {
    "de": "Anlageninspektion mit Kamera-Schwenkkopf und Wärmebild",
    "en": "Equipment inspection with pan-tilt camera and thermal imaging",
    "zh": "搭载云台相机和红外热像仪进行设备巡检"
   },
   {
    "de": "Gefahrenerkennung: Übertemperatur, Leckagen, ungewöhnliche Geräusche",
    "en": "Hazard detection: overheating, leaks, unusual noises",
    "zh": "隐患识别：过热、泄漏、异常声音"
   },
   {
    "de": "Automatisches Ablesen von Messgeräten und Gaskonzentration",
    "en": "Automatic gauge reading and gas concentration measurement",
    "zh": "仪表读数自动识别与气体浓度检测"
   },
   {
    "de": "Treppen bis 45°, schmale Gänge und Gitterroste ohne Umbau der Anlage",
    "en": "Stairs up to 45°, narrow aisles and grating without modifying the plant",
    "zh": "可爬 45° 楼梯，通过狭窄通道和格栅地面，无需改造现场"
   },
   {
    "de": "Berichte und Alarme direkt an Ihr Leitsystem",
    "en": "Reports and alarms straight into your control system",
    "zh": "巡检报告与告警直接推送到您的控制系统"
   }
  ],
  "proof": [
   {
    "de": "X30 hat Einsätze in engen Räumen eines Kernkraftwerks ausgeführt",
    "en": "X30 has carried out confined-space missions in a nuclear power plant",
    "zh": "X30 已执行核电站密闭空间作业任务"
   },
   {
    "de": "Schutzart IP67, Einsatz von −20 °C bis 55 °C",
    "en": "IP67 protection, operation from −20 °C to 55 °C",
    "zh": "IP67 防护，可在 −20 °C 至 55 °C 环境中工作"
   }
  ],
  "coming": [],
  "facts": [
   {
    "v": "24/7",
    "de": "Rundgang",
    "en": "Inspection rounds",
    "zh": "全天候巡检"
   },
   {
    "v": "IP67",
    "de": "Schutzart",
    "en": "Ingress protection",
    "zh": "防护等级"
   },
   {
    "v": "45°",
    "de": "Treppen",
    "en": "Stairs",
    "zh": "楼梯坡度"
   }
  ],
  "products": [
   "x30",
   "lynx-m20-pro",
   "lynx-m20s"
  ],
  "points": [
   {
    "de": "Anlageninspektion mit Kamera-Schwenkkopf und Wärmebild",
    "en": "Equipment inspection with pan-tilt camera and thermal imaging",
    "zh": "搭载云台相机和红外热像仪进行设备巡检"
   },
   {
    "de": "Gefahrenerkennung: Übertemperatur, Leckagen, ungewöhnliche Geräusche",
    "en": "Hazard detection: overheating, leaks, unusual noises",
    "zh": "隐患识别：过热、泄漏、异常声音"
   },
   {
    "de": "Automatisches Ablesen von Messgeräten und Gaskonzentration",
    "en": "Automatic gauge reading and gas concentration measurement",
    "zh": "仪表读数自动识别与气体浓度检测"
   },
   {
    "de": "Treppen bis 45°, schmale Gänge und Gitterroste ohne Umbau der Anlage",
    "en": "Stairs up to 45°, narrow aisles and grating without modifying the plant",
    "zh": "可爬 45° 楼梯，通过狭窄通道和格栅地面，无需改造现场"
   },
   {
    "de": "Berichte und Alarme direkt an Ihr Leitsystem",
    "en": "Reports and alarms straight into your control system",
    "zh": "巡检报告与告警直接推送到您的控制系统"
   }
  ]
 },
 "feuerwehr": {
  "order": 3,
  "name": {
   "de": "Brandschutz & Rettung",
   "en": "Firefighting & rescue",
   "zh": "应急消防"
  },
  "tagline": {
   "de": "Erkunden, löschen, verbinden, transportieren — erst der Roboter, dann der Mensch.",
   "en": "Scout, extinguish, connect, transport — the robot goes in first, people follow.",
   "zh": "侦察、灭火、通信、运输——机器人先上，人后上。"
  },
  "pains": [
   {
    "de": "In den ersten Minuten weiß niemand, was hinter der Tür liegt",
    "en": "In the first minutes nobody knows what is behind the door",
    "zh": "救援最初几分钟，没人知道门后是什么情况"
   },
   {
    "de": "Rauch, Einsturzgefahr und Hitze gefährden die Einsatzkräfte",
    "en": "Smoke, collapse risk and heat endanger the crews",
    "zh": "浓烟、坍塌和高温直接威胁救援人员"
   },
   {
    "de": "In Tunneln und Bergwerken fällt der Funk aus",
    "en": "Radio fails in tunnels and mines",
    "zh": "隧道、矿井内通信信号中断"
   }
  ],
  "solution": [
   {
    "de": "Erkundungsroboter: Wärmebild durch Rauch, Gasmessung in Echtzeit, Sprechverbindung zu Eingeschlossenen",
    "en": "Reconnaissance robot: thermal imaging through smoke, real-time gas measurement, voice link to trapped people",
    "zh": "侦察机器人：穿透浓烟的热成像、实时气体检测、与被困人员双向通话"
   },
   {
    "de": "Löschroboter mit Wasserwerfer übernimmt die Position, an der kein Mensch mehr stehen darf",
    "en": "Firefighting robot with water monitor takes the position no person should hold",
    "zh": "消防灭火机器人搭载水炮，顶替人员进入最危险的位置"
   },
   {
    "de": "Mesh-Funknetz für die Verbindung zur Einsatzleitung",
    "en": "Mesh radio network back to incident command",
    "zh": "建立自组网应急通信，与指挥中心保持连接"
   },
   {
    "de": "Transport von Material und Ausrüstung in die Gefahrenzone",
    "en": "Transport of material and equipment into the danger zone",
    "zh": "向危险区域运送物资和装备"
   }
  ],
  "proof": [
   {
    "de": "Ein abgestimmtes System aus Erkundung, Brandbekämpfung, Kommunikation und Transport",
    "en": "One coordinated system for reconnaissance, firefighting, communication and transport",
    "zh": "侦察、灭火、通信、运输一体化系统"
   },
   {
    "de": "Humanoider DR02 hat Brandschutz-Übungen im Freien absolviert",
    "en": "DR02 humanoid has completed outdoor fire-rescue drills",
    "zh": "DR02 人形机器人已完成户外消防救援演练"
   }
  ],
  "coming": [
   {
    "de": "Lynx S10 — unter 20 kg, von einer Person tragbar, für Erkundung in Trümmern",
    "en": "Lynx S10 — under 20 kg, one-person portable, for scouting in rubble",
    "zh": "山猫 S10——含电池不到 20 kg，单人携行，用于废墟侦察"
   },
   {
    "de": "Erkundungs- und Kommunikationsroboter für Bergwerke und Tunnel: Lageerkundung, Notfunknetz, Lebenszeichen-Ortung",
    "en": "Reconnaissance & communication robot for mines and tunnels: scouting, emergency network, life detection",
    "zh": "矿山、隧道密闭空间侦察通信机器人：超前侦察、应急组网、生命探测"
   }
  ],
  "products": [
   "fire-recon",
   "fire-cannon",
   "x30"
  ],
  "points": [
   {
    "de": "Erkundungsroboter: Wärmebild durch Rauch, Gasmessung in Echtzeit, Sprechverbindung zu Eingeschlossenen",
    "en": "Reconnaissance robot: thermal imaging through smoke, real-time gas measurement, voice link to trapped people",
    "zh": "侦察机器人：穿透浓烟的热成像、实时气体检测、与被困人员双向通话"
   },
   {
    "de": "Löschroboter mit Wasserwerfer übernimmt die Position, an der kein Mensch mehr stehen darf",
    "en": "Firefighting robot with water monitor takes the position no person should hold",
    "zh": "消防灭火机器人搭载水炮，顶替人员进入最危险的位置"
   },
   {
    "de": "Mesh-Funknetz für die Verbindung zur Einsatzleitung",
    "en": "Mesh radio network back to incident command",
    "zh": "建立自组网应急通信，与指挥中心保持连接"
   },
   {
    "de": "Transport von Material und Ausrüstung in die Gefahrenzone",
    "en": "Transport of material and equipment into the danger zone",
    "zh": "向危险区域运送物资和装备"
   }
  ]
 },
 "sicherheit": {
  "order": 4,
  "name": {
   "de": "Sicherheit & Streife",
   "en": "Security & patrol",
   "zh": "安防巡逻"
  },
  "tagline": {
   "de": "Rund um die Uhr auf Streife — jede Nacht gleich gründlich.",
   "en": "On patrol around the clock — equally thorough every night.",
   "zh": "7×24 小时自主巡逻，每一晚都一样认真。"
  },
  "pains": [
   {
    "de": "Große Gelände, lange Nächte, wenig Personal",
    "en": "Large sites, long nights, few staff",
    "zh": "园区面积大、夜班时间长、人手不足"
   },
   {
    "de": "Streifengänge werden ausgelassen oder verkürzt",
    "en": "Patrols get skipped or shortened",
    "zh": "巡逻容易漏走、走短"
   },
   {
    "de": "Vorfälle sind im Nachhinein schwer zu belegen",
    "en": "Incidents are hard to prove afterwards",
    "zh": "事后难以取证"
   }
  ],
  "solution": [
   {
    "de": "Autonome Streife rund um die Uhr auf festgelegten oder wechselnden Routen",
    "en": "Autonomous 24/7 patrol on fixed or changing routes",
    "zh": "按固定或随机路线 7×24 小时自主巡逻"
   },
   {
    "de": "Mensch-Maschine-Zusammenarbeit: Leitstelle sieht live mit und greift ein",
    "en": "Human-machine teamwork: the control room watches live and steps in",
    "zh": "人机协同：监控中心实时查看画面并可远程介入"
   },
   {
    "de": "Gefahrenprüfung: offene Türen, Brandherde, Hindernisse",
    "en": "Hazard checks: open doors, fire sources, obstructions",
    "zh": "隐患排查：未关门窗、火情、通道堵塞"
   },
   {
    "de": "Personenerkennung und Lagebild für die Einsatzkräfte",
    "en": "Person detection and situational awareness for responders",
    "zh": "人员识别与态势感知"
   },
   {
    "de": "Beweissicherung mit Video, Zeitstempel und Position",
    "en": "Evidence capture with video, timestamp and position",
    "zh": "视频取证，带时间和位置标记"
   }
  ],
  "proof": [
   {
    "de": "Streifenroboter mit Lautsprecher, Warnlicht und Kamera für Tag und Nacht",
    "en": "Patrol robot with loudspeaker, warning light and day/night camera",
    "zh": "巡逻机器人配有喊话器、警示灯和昼夜摄像头"
   }
  ],
  "coming": [],
  "products": [
   "patrol-m20",
   "lynx-m20s",
   "x30"
  ],
  "points": [
   {
    "de": "Autonome Streife rund um die Uhr auf festgelegten oder wechselnden Routen",
    "en": "Autonomous 24/7 patrol on fixed or changing routes",
    "zh": "按固定或随机路线 7×24 小时自主巡逻"
   },
   {
    "de": "Mensch-Maschine-Zusammenarbeit: Leitstelle sieht live mit und greift ein",
    "en": "Human-machine teamwork: the control room watches live and steps in",
    "zh": "人机协同：监控中心实时查看画面并可远程介入"
   },
   {
    "de": "Gefahrenprüfung: offene Türen, Brandherde, Hindernisse",
    "en": "Hazard checks: open doors, fire sources, obstructions",
    "zh": "隐患排查：未关门窗、火情、通道堵塞"
   },
   {
    "de": "Personenerkennung und Lagebild für die Einsatzkräfte",
    "en": "Person detection and situational awareness for responders",
    "zh": "人员识别与态势感知"
   },
   {
    "de": "Beweissicherung mit Video, Zeitstempel und Position",
    "en": "Evidence capture with video, timestamp and position",
    "zh": "视频取证，带时间和位置标记"
   }
  ]
 },
 "museum": {
  "order": 5,
  "name": {
   "de": "Öffentliche Dienste & Veranstaltungsorte",
   "en": "Public services & venues",
   "zh": "民生服务与场馆"
  },
  "tagline": {
   "de": "Tragen, filmen, führen — bei Stadtfesten, Messen und im Museum.",
   "en": "Carry, film, guide — at city events, trade fairs and museums.",
   "zh": "搬运、跟拍、导览——城市服务、大型活动和博物馆都用得上。"
  },
  "pains": [
   {
    "de": "Großveranstaltungen brauchen Material an festen Punkten — schnell und wiederholt",
    "en": "Large events need material at fixed points — fast and repeatedly",
    "zh": "大型活动需要把物资反复、快速送到指定位置"
   },
   {
    "de": "Bilder und Livestreams aus Perspektiven, die eine Kamera auf Stativ nicht erreicht",
    "en": "Footage and live streams from angles a tripod camera cannot reach",
    "zh": "需要固定机位拍不到的画面和直播视角"
   },
   {
    "de": "Besucherführung in mehreren Sprachen, Tag für Tag",
    "en": "Visitor guidance in several languages, day after day",
    "zh": "每天都需要多语种讲解接待"
   }
  ],
  "solution": [
   {
    "de": "Materialtransport zu festen Punkten mit bis zu 35 kg Nutzlast",
    "en": "Material transport to fixed points with up to 35 kg payload",
    "zh": "定点物资搬运，最大负载 35 kg"
   },
   {
    "de": "Intelligentes Mitfahren und Filmen mit stabilisierter Kamera",
    "en": "Smart follow-shooting with stabilised camera",
    "zh": "智能跟拍，画面稳定"
   },
   {
    "de": "360°-Livestream von Veranstaltungen",
    "en": "360° live streaming of events",
    "zh": "全景直播"
   },
   {
    "de": "Führung und Erklärung im Museum, mehrsprachig",
    "en": "Guided tours and explanations in museums, multilingual",
    "zh": "博物馆导览讲解，支持多语种"
   }
  ],
  "proof": [
   {
    "de": "Robust für draußen: IP67, Regen und Staub",
    "en": "Built for outdoors: IP67, rain and dust",
    "zh": "适合户外：IP67 防护，不惧风雨粉尘"
   }
  ],
  "coming": [],
  "facts": [
   {
    "v": "35 kg",
    "de": "Nutzlast",
    "en": "Payload",
    "zh": "负载"
   },
   {
    "v": "80 cm",
    "de": "Sprung auf Podest",
    "en": "Jump onto platform",
    "zh": "跳上高台"
   },
   {
    "v": "IP67",
    "de": "Schutzart",
    "en": "Ingress protection",
    "zh": "防护等级"
   }
  ],
  "products": [
   "lynx-m20s",
   "lite3",
   "patrol-m20"
  ],
  "points": [
   {
    "de": "Materialtransport zu festen Punkten mit bis zu 35 kg Nutzlast",
    "en": "Material transport to fixed points with up to 35 kg payload",
    "zh": "定点物资搬运，最大负载 35 kg"
   },
   {
    "de": "Intelligentes Mitfahren und Filmen mit stabilisierter Kamera",
    "en": "Smart follow-shooting with stabilised camera",
    "zh": "智能跟拍，画面稳定"
   },
   {
    "de": "360°-Livestream von Veranstaltungen",
    "en": "360° live streaming of events",
    "zh": "全景直播"
   },
   {
    "de": "Führung und Erklärung im Museum, mehrsprachig",
    "en": "Guided tours and explanations in museums, multilingual",
    "zh": "博物馆导览讲解，支持多语种"
   }
  ]
 },
 "forschung": {
  "order": 6,
  "name": {
   "de": "Bildung & Forschung",
   "en": "Education & research",
   "zh": "教育科研"
  },
  "tagline": {
   "de": "Von der Hardware-Plattform bis zum Lehrplan — alles aus einer Hand.",
   "en": "From hardware platform to curriculum — delivered from a single source.",
   "zh": "从硬件平台到课程体系，一站式交付。"
  },
  "pains": [
   {
    "de": "Eigene Laufroboter-Plattformen sind teuer und zeitaufwendig",
    "en": "Building your own legged platform is expensive and slow",
    "zh": "自研足式机器人平台成本高、周期长"
   },
   {
    "de": "Lehrende brauchen Kursmaterial, nicht nur Hardware",
    "en": "Lecturers need course material, not just hardware",
    "zh": "老师需要的不只是硬件，还有课程内容"
   },
   {
    "de": "Geschlossene Systeme bremsen die Forschung",
    "en": "Closed systems slow research down",
    "zh": "封闭系统限制科研深度"
   }
  ],
  "solution": [
   {
    "de": "Komplettpaket: Hardware-Plattform, Lehrplan und Übungen",
    "en": "Complete package: hardware platform, curriculum and exercises",
    "zh": "完整方案：硬件平台 + 课程体系 + 实训内容"
   },
   {
    "de": "Lite3 in mehreren Ausführungen — vom Einstieg bis zur Lidar-Version",
    "en": "Lite3 in several editions — from entry level to the lidar version",
    "zh": "Lite3 多个版本：体验版、探索版、专业版、激光版"
   },
   {
    "de": "Offene SDKs und ROS-2-Schnittstelle für eigene Algorithmen",
    "en": "Open SDKs and ROS 2 interface for your own algorithms",
    "zh": "开放 SDK 和 ROS 2 接口，便于二次开发"
   },
   {
    "de": "X30 und M20 als Plattformen für anspruchsvolle Feldforschung",
    "en": "X30 and M20 as platforms for demanding field research",
    "zh": "X30 与山猫 M20 可作为高端科研平台"
   }
  ],
  "proof": [
   {
    "de": "Lite3: bis 7,5 kg Nutzlast, 5 km Reichweite, 18 cm Stufen",
    "en": "Lite3: up to 7.5 kg payload, 5 km range, 18 cm steps",
    "zh": "Lite3：最大负载 7.5 kg，续航 5 km，可跨越 18 cm 台阶"
   }
  ],
  "coming": [],
  "products": [
   "lite3",
   "x30",
   "lynx-m20"
  ],
  "points": [
   {
    "de": "Komplettpaket: Hardware-Plattform, Lehrplan und Übungen",
    "en": "Complete package: hardware platform, curriculum and exercises",
    "zh": "完整方案：硬件平台 + 课程体系 + 实训内容"
   },
   {
    "de": "Lite3 in mehreren Ausführungen — vom Einstieg bis zur Lidar-Version",
    "en": "Lite3 in several editions — from entry level to the lidar version",
    "zh": "Lite3 多个版本：体验版、探索版、专业版、激光版"
   },
   {
    "de": "Offene SDKs und ROS-2-Schnittstelle für eigene Algorithmen",
    "en": "Open SDKs and ROS 2 interface for your own algorithms",
    "zh": "开放 SDK 和 ROS 2 接口，便于二次开发"
   },
   {
    "de": "X30 und M20 als Plattformen für anspruchsvolle Feldforschung",
    "en": "X30 and M20 as platforms for demanding field research",
    "zh": "X30 与山猫 M20 可作为高端科研平台"
   }
  ]
 },
 "logistik": {
  "order": 7,
  "name": {
   "de": "Logistik & Zustellung",
   "en": "Logistics & delivery",
   "zh": "物流配送"
  },
  "tagline": {
   "de": "Die letzten hundert Meter, die kein Fahrzeug fährt.",
   "en": "The last hundred metres no vehicle can drive.",
   "zh": "没有车能跑的最后一百米。"
  },
  "pains": [
   {
    "de": "Treppen, Bordsteine und unbefestigte Wege stoppen Transportwagen und FTS",
    "en": "Stairs, kerbs and unpaved paths stop carts and AGVs",
    "zh": "楼梯、路沿、非铺装路面让推车和 AGV 寸步难行"
   },
   {
    "de": "Wiederholte Wege zwischen Lager, Baustelle und Werkhalle binden Personal",
    "en": "Repeated trips between store, site and workshop tie up staff",
    "zh": "仓库、工地、车间之间反复搬运占用人手"
   }
  ],
  "solution": [
   {
    "de": "Rad-Bein-Roboter: schnell auf Rädern, Stufen und Hindernisse auf Beinen",
    "en": "Wheel-legged robot: fast on wheels, steps and obstacles on legs",
    "zh": "轮足机器人：平路用轮子快跑，遇台阶障碍用腿跨越"
   },
   {
    "de": "Bis 35 kg Nutzlast, Akkutausch im laufenden Betrieb",
    "en": "Up to 35 kg payload, hot-swappable batteries",
    "zh": "最大负载 35 kg，支持热插拔换电"
   },
   {
    "de": "Routenfahrt zwischen festen Stationen, auch im Außenbereich",
    "en": "Route runs between fixed stations, outdoors too",
    "zh": "在固定站点之间按路线往返，室外也可以"
   }
  ],
  "proof": [
   {
    "de": "Lynx M20 S: IP67, Sprung auf 80-cm-Podest, bis 9 m/s",
    "en": "Lynx M20 S: IP67, jumps onto an 80 cm platform, up to 9 m/s",
    "zh": "山猫 M20S：IP67，可跃上 80 cm 高台，最高 9 m/s"
   }
  ],
  "coming": [],
  "facts": [
   {
    "v": "35 kg",
    "de": "Nutzlast",
    "en": "Payload",
    "zh": "负载"
   },
   {
    "v": "80 cm",
    "de": "Sprung auf Podest",
    "en": "Jump onto platform",
    "zh": "跳上高台"
   },
   {
    "v": "9 m/s",
    "de": "Höchstgeschwindigkeit",
    "en": "Top speed",
    "zh": "最高速度"
   }
  ],
  "products": [
   "lynx-m20s",
   "lynx-m20-pro",
   "lynx-m20"
  ],
  "points": [
   {
    "de": "Rad-Bein-Roboter: schnell auf Rädern, Stufen und Hindernisse auf Beinen",
    "en": "Wheel-legged robot: fast on wheels, steps and obstacles on legs",
    "zh": "轮足机器人：平路用轮子快跑，遇台阶障碍用腿跨越"
   },
   {
    "de": "Bis 35 kg Nutzlast, Akkutausch im laufenden Betrieb",
    "en": "Up to 35 kg payload, hot-swappable batteries",
    "zh": "最大负载 35 kg，支持热插拔换电"
   },
   {
    "de": "Routenfahrt zwischen festen Stationen, auch im Außenbereich",
    "en": "Route runs between fixed stations, outdoors too",
    "zh": "在固定站点之间按路线往返，室外也可以"
   }
  ]
 },
 "pflege": {
  "order": 8,
  "name": {
   "de": "Pflege & Begleitung",
   "en": "Care & companionship",
   "zh": "养老陪伴"
  },
  "pains": [],
  "solution": [],
  "proof": [],
  "coming": []
 }
});

/* ---- v15: neue Modelle, Ergänzungen aus der Herstellerpräsentation, Referenzen ---- */
(function (A) {
  A.newProducts.forEach(function (p) { if (!NIC.products.some(function (x) { return x.id === p.id; })) NIC.products.push(p); });
  NIC.products.forEach(function (p) { if (A.extra[p.id]) A.extra[p.id].forEach(function (h) { if (!p.highlights.some(function (x) { return x.de === h.de; })) p.highlights.push(h); }); p.brand = 'NIC Robotics'; });
  NIC.categories.forEach(function (c) { if (c.id === 'humanoid') { c.status = 'live'; c.image = 'dr02-main'; c.intro = A.humanoidIntro; } });
  NIC.cases = A.cases; NIC.caseGallery = A.gallery; NIC.partner = A.partner;
  /* DR02 und Lynx S10 sind jetzt im Programm: aus „Bald verfügbar“ in die Modellliste */
  NIC.useCases.forEach(function (u) {
    (u.coming || []).slice().forEach(function (c) {
      var id = /DR02/.test(c.de) ? 'dr02' : /S10/.test(c.de) ? 'lynx-s10' : null;
      if (!id) return;
      u.coming = u.coming.filter(function (x) { return x !== c; });
      if (u.products.indexOf(id) === -1) u.products.push(id);
    });
  });
})({"newProducts": [{"id": "dr02", "slug": "humanoid-dr02", "sku": "NIC-HU-DR02", "category": "humanoid", "brand": "NIC Robotics", "order": 1, "name": "DR02", "family": {"de": "Industrieller Humanoid", "en": "Industrial Humanoid", "zh": "工业级人形机器人"}, "price": 5000, "badge": {"de": "Weltpremiere", "en": "World first", "zh": "全球首款"}, "photo": true, "tagline": {"de": "Der erste industrielle Humanoid für jedes Wetter. IP66, −20 °C bis 55 °C.", "en": "The first industrial humanoid built for any weather. IP66, −20 °C to 55 °C.", "zh": "全球首款行业级全天候人形机器人。IP66，−20 °C 至 55 °C。"}, "summary": {"de": "Der DR02 bringt die Menschengestalt dorthin, wo bisher nur Menschen arbeiten konnten: an Schalttafeln, Treppen und Werkzeuge, die für Hände und Beine gebaut sind — und das draußen, bei Regen, Staub, Frost und Hitze. Er hat Feldtests im Umspannwerk und Brandschutz-Übungen im Freien absolviert und ist für Einsätze mit hohem Risiko und hoher Belastung ausgelegt.", "en": "The DR02 brings the human form to places only people could work until now: control panels, stairs and tools built for hands and legs — outdoors, in rain, dust, frost and heat. It has completed substation field tests and outdoor fire-rescue drills, and is designed for high-risk, high-intensity work.", "zh": "DR02 把人的形态带到过去只有人能干活的地方：为人手和人腿设计的控制柜、楼梯和工具——而且是在户外，风雨、粉尘、严寒、酷暑都能作业。它已完成变电站现场作业测试和户外消防救援演练，面向高危、高强度任务设计。"}, "highlights": [{"de": "Ganzkörper wasser- und staubdicht nach IP66 — für Einsätze im Freien rund ums Jahr", "en": "Full-body IP66 water and dust protection — for outdoor work all year round", "zh": "整机 IP66 防水防尘，满足全天候户外作业"}, {"de": "Arbeitsbereich −20 °C bis 55 °C", "en": "Operating range −20 °C to 55 °C", "zh": "工作温度 −20 °C 至 55 °C"}, {"de": "Gehen 1,5 m/s, Spitze 4 m/s", "en": "Walking 1.5 m/s, peak 4 m/s", "zh": "行走速度 1,5 m/s，极限速度 4 m/s"}, {"de": "Treppenstufen bis 25 cm, Steigungen bis 20°", "en": "Stairs up to 25 cm, slopes up to 20°", "zh": "可上 25 cm 台阶，爬 20° 斜坡"}, {"de": "275 TOPS Rechenleistung serienmäßig, optional 2.070 TOPS", "en": "275 TOPS computing as standard, 2,070 TOPS optional", "zh": "标配 275 TOPS 算力，可选配 2070 TOPS"}, {"de": "Sensorfusion aus Lidar, Tiefenkamera und Weitwinkelkameras", "en": "Sensor fusion of lidar, depth camera and wide-angle cameras", "zh": "激光雷达 + 深度相机 + 广角相机多传感器融合"}, {"de": "Feldtest im Umspannwerk und Brandschutz-Übung im Freien abgeschlossen", "en": "Substation field test and outdoor fire-rescue drill completed", "zh": "已完成变电站现场作业测试与户外消防救援演练"}], "specs": [{"group": {"de": "Körper", "en": "Body", "zh": "机体"}, "rows": [{"k": {"de": "Schutzart", "en": "Ingress protection", "zh": "防护等级"}, "v": "IP66"}, {"k": {"de": "Umgebungstemperatur", "en": "Ambient temperature", "zh": "环境温度"}, "v": "−20 °C … 55 °C"}]}, {"group": {"de": "Bewegung", "en": "Motion", "zh": "运动性能"}, "rows": [{"k": {"de": "Gehgeschwindigkeit", "en": "Walking speed", "zh": "行走速度"}, "v": "1,5 m/s"}, {"k": {"de": "Höchstgeschwindigkeit", "en": "Top speed", "zh": "极限速度"}, "v": "4 m/s"}, {"k": {"de": "Treppenstufe", "en": "Stair height", "zh": "楼梯高度"}, "v": "25 cm"}, {"k": {"de": "Steigung", "en": "Slope", "zh": "斜坡角度"}, "v": "20°"}]}, {"group": {"de": "Wahrnehmung & Rechner", "en": "Perception & compute", "zh": "感知与算力"}, "rows": [{"k": {"de": "Rechenleistung", "en": "Computing power", "zh": "算力"}, "v": {"de": "275 TOPS (optional 2.070 TOPS)", "en": "275 TOPS (2,070 TOPS optional)", "zh": "275 TOPS（可选 2070 TOPS）"}}, {"k": {"de": "Sensoren", "en": "Sensors", "zh": "传感器"}, "v": {"de": "Lidar, Tiefenkamera, Weitwinkelkameras", "en": "Lidar, depth camera, wide-angle cameras", "zh": "激光雷达、深度相机、广角相机"}}]}], "gallery": ["dr02-main"], "scenes": [], "hero": "x30-control", "useCases": ["energie", "feuerwehr", "industrie"]}, {"id": "lynx-s10", "slug": "lynx-s10", "sku": "NIC-WL-S10", "category": "radbein", "brand": "NIC Robotics", "order": 0, "name": "Lynx S10", "family": {"de": "Kompakter Rad-Bein-Roboter", "en": "Compact Wheel-Legged Robot", "zh": "小型轮足机器人"}, "price": 5000, "badge": {"de": "Neu", "en": "New", "zh": "新品"}, "photo": true, "tagline": {"de": "Unter 20 kg, von einer Person tragbar, über 8 m/s.", "en": "Under 20 kg, one-person portable, over 8 m/s.", "zh": "含电池不到 20 kg，单人可携，极速超 8 m/s。"}, "summary": {"de": "Der Lynx S10 ist der kleine Rad-Bein-Roboter für Einsätze, bei denen jede Minute zählt: Eine Person trägt ihn aus dem Fahrzeug und setzt ihn sofort ab. Er schlüpft durch enge Gänge und Trümmerspalten, steht auf zwei Beinen und gleitet vorwärts wie rückwärts — gedacht für Rettung, Erkundung und Inspektion auf engem Raum.", "en": "The Lynx S10 is the small wheel-legged robot for jobs where every minute counts: one person carries it from the vehicle and deploys it immediately. It slips through narrow passages and rubble gaps, stands on two legs and glides forwards and backwards — built for rescue, reconnaissance and inspection in tight spaces.", "zh": "山猫 S10 是为分秒必争的任务打造的小型轮足机器人：一个人就能从车上搬下来、立即投入使用。它能穿过狭窄通道和废墟缝隙，可双足站立、正反向滑行——专为救援侦察和狭小空间巡检设计。"}, "highlights": [{"de": "Gewicht inklusive Akku unter 20 kg — Einsatz durch eine Person", "en": "Under 20 kg including battery — deployed by one person", "zh": "含电池整机不到 20 kg，单人即可部署"}, {"de": "Höchstgeschwindigkeit über 8 m/s", "en": "Top speed over 8 m/s", "zh": "极限速度超过 8 m/s"}, {"de": "Zweibeiniger Stand, Vorwärts- und Rückwärtsgleiten", "en": "Bipedal stance, forward and reverse gliding", "zh": "支持双足站立、正反向滑行等极限动作"}, {"de": "Vier Weitwinkelkameras, Lidar vorn und hinten, hardwaresynchronisiert", "en": "Four wide-angle cameras, front and rear lidar, hardware-synchronised", "zh": "四向广角相机 + 前后双激光雷达，硬件级时间同步"}, {"de": "IP66 — staubdicht und gegen Starkregen geschützt", "en": "IP66 — dust-tight and protected against heavy rain", "zh": "IP66 防护，防尘防暴雨"}, {"de": "Arbeitsbereich −20 °C bis 55 °C, ganzjährig in jedem Gelände", "en": "Operating range −20 °C to 55 °C, all year, any terrain", "zh": "−20 °C 至 55 °C 宽温作业，全天候全地形"}], "specs": [{"group": {"de": "Körper", "en": "Body", "zh": "机体"}, "rows": [{"k": {"de": "Gewicht inkl. Akku", "en": "Weight incl. battery", "zh": "整机重量（含电池）"}, "v": "< 20 kg"}, {"k": {"de": "Schutzart", "en": "Ingress protection", "zh": "防护等级"}, "v": "IP66"}, {"k": {"de": "Umgebungstemperatur", "en": "Ambient temperature", "zh": "环境温度"}, "v": "−20 °C … 55 °C"}]}, {"group": {"de": "Leistung", "en": "Performance", "zh": "性能"}, "rows": [{"k": {"de": "Höchstgeschwindigkeit", "en": "Top speed", "zh": "极限速度"}, "v": "> 8 m/s"}, {"k": {"de": "Sonderbewegungen", "en": "Special motions", "zh": "特技动作"}, "v": {"de": "Zweibeiniger Stand, Gleiten vorwärts/rückwärts", "en": "Bipedal stance, forward/reverse gliding", "zh": "双足站立、正反滑行"}}]}, {"group": {"de": "Wahrnehmung", "en": "Perception", "zh": "感知"}, "rows": [{"k": {"de": "Kameras", "en": "Cameras", "zh": "相机"}, "v": {"de": "4 × Weitwinkel, rundum", "en": "4 × wide-angle, all-round", "zh": "四向广角"}}, {"k": {"de": "Lidar", "en": "Lidar", "zh": "激光雷达"}, "v": {"de": "vorn und hinten", "en": "front and rear", "zh": "前后双雷达"}}]}], "gallery": ["s10-main"], "scenes": [], "hero": "m20s-dust", "useCases": ["feuerwehr", "sicherheit", "industrie"]}], "extra": {"x30": [{"de": "Freitragende Industrie-Gittertreppen bis 45° auf- und abwärts", "en": "Open-riser industrial grating stairs up to 45°, up and down", "zh": "可灵活上下 45° 工业镂空楼梯"}, {"de": "Autonome Navigation auch bei Dunkelheit, Gegenlicht und Flackerlicht", "en": "Autonomous navigation in darkness, glare and flickering light", "zh": "在昏暗、强光、闪烁甚至无光环境下自主导航作业"}, {"de": "25 % mehr Laufzeit unter Last, Akkutausch direkt vor Ort", "en": "25 % more runtime under load, battery swap on site", "zh": "负载续航提升 25%，电池支持现场快速拆换"}], "lite3": [{"de": "Nutzlast beim Gehen bis 7,5 kg (+40 %), 90 Minuten Dauerbetrieb", "en": "Walking payload up to 7.5 kg (+40 %), 90 minutes continuous operation", "zh": "极限行走负载提升 40% 至 7.5 kg，持续运动 90 分钟"}, {"de": "Rund dreifache Rechenleistung, Funktionen per OTA-Update", "en": "Around three times the computing power, features via OTA updates", "zh": "整体算力提升近 3 倍，支持 OTA 升级持续进化"}]}, "cases": [{"id": "sg-tunnel", "img": "sg-tunnel", "region": "intl", "ind": "energie", "featured": true, "product": "x30", "place": {"de": "Singapur", "en": "Singapore", "zh": "新加坡"}, "client": {"de": "SP Group (Singapore Power)", "en": "SP Group (Singapore Power)", "zh": "新加坡能源集团（SP Group）"}, "title": {"de": "Unterirdische Stromtunnel — der erste Einsatz eines chinesischen Industrie-Vierbeiners in einem ausländischen Stromnetz", "en": "Underground power tunnels — the first deployment of a Chinese industrial quadruped in a foreign power grid", "zh": "地下电力隧道——首台在海外电力系统落地的国产行业级四足机器人"}, "pain": {"de": "Techniker liefen für jede Kontrolle bis zu 6 km durch den Kabeltunnel — zwei bis drei Stunden pro Rundgang, in engen, warmen Röhren.", "en": "Technicians walked up to 6 km through the cable tunnel for every check — two to three hours per round, in narrow, warm tubes.", "zh": "技术人员每次巡检要在电缆隧道里步行最长 6 公里，每轮耗时 2–3 小时，环境狭窄闷热。"}, "sol": {"de": "Ein X30 mit Kamera und Wärmebild läuft Abschnitte des rund 40 km langen Tunnelnetzes autonom ab, erkennt Risse, Feuchtigkeit und Anomalien und liefert nach jeder Runde einen Bericht. Im Notfall geht er als Erster hinein und meldet die Lage live. Sensorik, Erkennung und Navigation wurden an die Tunnelbauweise vor Ort angepasst.", "en": "An X30 with camera and thermal imaging autonomously patrols sections of the roughly 40 km tunnel network, detects cracks, damp and anomalies, and delivers a report after every round. In an emergency it goes in first and reports the situation live. Sensors, recognition and navigation were adapted to the local tunnel design.", "zh": "X30 搭载高清相机与红外热像仪，在约 40 公里的隧道网络中自主巡检，识别裂缝、渗水等异常，每轮结束自动生成报告。紧急情况下可作为\"先遣员\"进入隧道实时回传现场情况。传感器、识别算法与导航逻辑均针对当地隧道结构做了定制。"}, "result": [["480 h", {"de": "Personalzeit pro Jahr gespart", "en": "Staff hours saved per year", "zh": "每年节省人工巡检"}], ["40 km", {"de": "Tunnelnetz", "en": "Tunnel network", "zh": "隧道网络"}], ["#1", {"de": "erster Auslandseinsatz im Stromnetz", "en": "first overseas grid deployment", "zh": "首个海外电力落地"}]]}, {"id": "eu-nuclear", "img": "eu-nuclear", "region": "intl", "ind": "energie", "featured": true, "product": "x30", "place": {"de": "Leibstadt, Schweiz — direkt an der deutschen Grenze", "en": "Leibstadt, Switzerland — right on the German border", "zh": "瑞士莱布施塔特——紧邻德国边境"}, "client": {"de": "Kernkraftwerk Leibstadt (KKL)", "en": "Leibstadt Nuclear Power Plant (KKL)", "zh": "莱布施塔特核电站（KKL）"}, "title": {"de": "Digitale Instandhaltung in einem der leistungsstärksten Kernkraftwerke der Schweiz", "en": "Digital maintenance at one of Switzerland’s most powerful nuclear plants", "zh": "瑞士发电量最大的核电站之一，推进数字化运维"}, "pain": {"de": "Das KKL deckt rund ein Siebtel des Schweizer Strombedarfs. Rundgänge in kontrollierten Bereichen sollen kürzer werden, die Aufenthaltszeit des Personals sinken — ohne dass Anlagedaten das Werk verlassen.", "en": "KKL covers about one seventh of Swiss electricity demand. Rounds in controlled areas should get shorter and staff exposure time lower — without plant data leaving the site.", "zh": "KKL 承担瑞士约七分之一的用电需求。电站希望缩短受控区域内的人工巡检、减少人员停留时间，同时确保电站数据不出厂。"}, "sol": {"de": "Vierbeiner-Inspektion mit Geländegängigkeit und multimodaler Sensorik. Alle Daten laufen in ein lokales Managementsystem im gesicherten Werksnetz — automatische Alarme und Fernsteuerung ausschließlich unter der IT-Hoheit des Kraftwerks, ohne Datenübertragung nach außen.", "en": "Quadruped inspection with all-terrain mobility and multimodal sensing. All data flows into a local management system inside the secured plant network — automatic alerts and remote dispatch strictly under the plant’s own IT governance, with no external data transfer.", "zh": "四足机器人凭借复杂地形通行与多模态感知开展巡检。所有数据同步到电站安全内网中的本地管理系统，自动告警与远程调度完全在电站自己的 IT 管控下运行，不向外部传输任何数据。"}, "result": [["1/7", {"de": "des Schweizer Stroms", "en": "of Swiss electricity", "zh": "瑞士用电量"}], ["0", {"de": "Daten nach außen", "en": "data leaves the site", "zh": "数据外传"}], ["EU", {"de": "Datenhoheit gewahrt", "en": "data sovereignty kept", "zh": "数据主权合规"}]]}, {"id": "worldcup", "img": "worldcup", "region": "intl", "ind": "sicherheit", "featured": true, "product": "lynx-m20", "place": {"de": "Monterrey, Mexiko", "en": "Monterrey, Mexico", "zh": "墨西哥蒙特雷"}, "client": {"de": "FIFA-Weltmeisterschaft 2026, Estadio Monterrey", "en": "FIFA World Cup 2026, Monterrey Stadium", "zh": "2026 美加墨世界杯·蒙特雷体育场"}, "title": {"de": "Sicherheitsstreife bei der Fußball-WM 2026", "en": "Security patrol at the 2026 FIFA World Cup", "zh": "2026 世界杯赛场安防巡逻"}, "pain": {"de": "Rund 53.000 Zuschauer, etwa 125.000 m² Fläche: Manuelle Streifen sind langsam, haben tote Winkel und melden Vorfälle zu spät.", "en": "Some 53,000 spectators and about 125,000 m² of floor area: manual patrols are slow, leave blind spots and report incidents too late.", "zh": "约 5.3 万名观众、约 12.5 万平方米场地：人工巡逻效率低、盲区多、上报慢。"}, "sol": {"de": "Eine Staffel Lynx M20 streift innen und außen um das Stadion: autonome Routen, Ausweichen vor Personen und Fahrzeugen, Treppen und enge Durchgänge. Rundumkameras übertragen live; die Auswertung an Bord erkennt Menschenansammlungen und Auffälligkeiten an Anlagen und warnt sofort per Durchsage.", "en": "A squad of Lynx M20 patrols inside and outside the stadium: autonomous routes, avoiding people and vehicles, stairs and narrow passages. All-round cameras stream live; on-board analysis spots abnormal crowds and facility issues and warns instantly by loudspeaker.", "zh": "山猫 M20 组成巡逻小队，在体育场内外按预设路线自主巡逻，避让行人车辆，上下楼梯、穿越狭窄通道。全景相机实时回传画面，端侧智能分析识别人群异常聚集和设施异常，立即语音告警。"}, "result": [["53.000", {"de": "Zuschauerkapazität", "en": "spectator capacity", "zh": "观众容量"}], ["125.000 m²", {"de": "Fläche überwacht", "en": "area covered", "zh": "覆盖面积"}], ["24/7", {"de": "Streife ohne Lücken", "en": "gap-free patrol", "zh": "全天候巡逻"}]]}, {"id": "sg-park", "img": "sg-park", "region": "intl", "ind": "sicherheit", "product": "x30", "place": {"de": "Singapur", "en": "Singapore", "zh": "新加坡"}, "client": {"de": "Sicherheitsdienstleister Certis — Industriepark", "en": "Security provider Certis — industrial park", "zh": "Certis 安保集团·产业园区"}, "title": {"de": "Werkschutz mit Treppen, Kies und Brandschutzzonen", "en": "Site security across stairs, gravel and fire lanes", "zh": "园区安防：楼梯、碎石路、消防通道全覆盖"}, "pain": {"de": "Große Gelände mit Treppen und Grünflächen, viele tote Winkel, Verstöße werden selten belegbar dokumentiert.", "en": "Large sites with stairs and green areas, many blind spots, violations rarely documented in a provable way.", "zh": "园区大、楼梯和绿化带多，盲区多，违规行为难以留证。"}, "sol": {"de": "Der X30 läuft Treppen und Kieswege, erkennt Fußgängerüberwege, prüft Personen, Fahrzeuge und den Zustand von Anlagen wie Ladesäulen. Ein Falschparker in der Feuerwehrzufahrt wird mit Position automatisch an die Leitstelle gemeldet.", "en": "The X30 climbs stairs and gravel paths, recognises crosswalks, and checks people, vehicles and the status of assets such as charging points. A car parked in a fire lane is reported automatically to the control room with its exact position.", "zh": "X30 稳定上下楼梯、穿越碎石路，识别人行横道，实时检查人员、车辆和充电桩等设施状态。发现消防通道违停时自动上报并记录精确坐标。"}, "result": [["100 %", {"de": "Route lückenlos", "en": "route covered", "zh": "路线全覆盖"}], ["GPS", {"de": "Verstoß mit Position belegt", "en": "violations geo-tagged", "zh": "违规带坐标留证"}]]}, {"id": "na-delivery", "img": "na-delivery", "region": "intl", "ind": "logistik", "product": "lynx-m20s", "place": {"de": "Nordamerika", "en": "North America", "zh": "北美"}, "client": {"de": "Weltweit bekannter Onlinehändler", "en": "Well-known global e-commerce company", "zh": "全球知名电商企业"}, "title": {"de": "Zustellung bis an die Haustür — Stufen inklusive", "en": "Delivery to the front door — steps included", "zh": "包裹送到家门口——台阶也不怕"}, "pain": {"de": "Die letzten Meter enden oft an Stufen, Bordsteinen und Rasen — dort scheitern Lieferroboter auf Rädern.", "en": "The last few metres often end at steps, kerbs and lawns — where wheeled delivery robots fail.", "zh": "最后几米常常是台阶、路沿和草坪，轮式配送机器人到不了。"}, "sol": {"de": "Rad-Bein-Roboter fahren auf dem Gehweg schnell auf Rädern und steigen an der Haustür die Stufen hinauf — mit Paket auf dem Rücken.", "en": "Wheel-legged robots drive fast along the pavement on wheels and climb the steps at the door — parcel on their back.", "zh": "轮足机器人在人行道上用轮子快速行驶，到门口直接迈上台阶，把包裹送到门前。"}, "result": [["35 kg", {"de": "Nutzlast", "en": "payload", "zh": "负载"}], ["30 cm", {"de": "Stufen unter Last", "en": "steps under load", "zh": "负载跨台阶"}]]}, {"id": "na-warehouse", "img": "na-warehouse", "region": "intl", "ind": "industrie", "product": "x30", "place": {"de": "Nordamerika", "en": "North America", "zh": "北美"}, "client": {"de": "Produktions- und Lagerstandorte", "en": "Manufacturing and warehouse sites", "zh": "制造与仓储园区"}, "title": {"de": "Lager- und Werksinspektion mit Manipulator", "en": "Warehouse and plant inspection with manipulator arm", "zh": "搭载机械臂的仓储与工厂巡检"}, "pain": {"de": "Weitläufige Hallen und Außenflächen — die Kontrollgänge binden viel Personal.", "en": "Extensive halls and outdoor areas — inspection rounds tie up a lot of staff.", "zh": "厂房和室外区域面积大，巡检占用大量人手。"}, "sol": {"de": "Ein X30 mit Greifarm und Sensorpaket kontrolliert Hallen, Tore und Außenanlagen — und kann einfache Handgriffe selbst ausführen.", "en": "An X30 with gripper arm and sensor package checks halls, doors and outdoor assets — and can carry out simple manual tasks itself.", "zh": "X30 搭载机械臂和传感器组件，巡查厂房、出入口和室外设施，还能完成简单的操作动作。"}, "result": [["24/7", {"de": "Inspektion", "en": "inspection", "zh": "巡检"}], ["IP67", {"de": "drinnen und draußen", "en": "indoors and out", "zh": "室内外通用"}]]}, {"id": "sa-factory", "img": "sa-factory", "region": "intl", "ind": "industrie", "product": "x30", "place": {"de": "Südamerika", "en": "South America", "zh": "南美"}, "client": {"de": "Pipeline- und Werksanlagen", "en": "Pipeline and plant facilities", "zh": "管线与工厂设施"}, "title": {"de": "Inspektion an Rohrleitungen und Armaturen", "en": "Inspection of pipelines and valves", "zh": "管线与阀门巡检"}, "pain": {"de": "Ventile, Rohrleitungen und Messstellen verteilt über weite Außenflächen, bei Hitze und wechselndem Wetter.", "en": "Valves, pipelines and measuring points spread over large outdoor areas, in heat and changing weather.", "zh": "阀门、管线和测点分布在大面积室外区域，高温和天气多变。"}, "sol": {"de": "Vierbeiner mit Kamera- und Gassensorik laufen feste Routen, lesen Anzeigen ab und melden Leckagen oder Übertemperatur.", "en": "Quadrupeds with camera and gas sensing walk fixed routes, read gauges and report leaks or overheating.", "zh": "四足机器人搭载相机和气体传感器按固定路线巡检，读取仪表，发现泄漏或过温立即告警。"}, "result": [["−20…55 °C", {"de": "Einsatzbereich", "en": "operating range", "zh": "工作温度"}], ["IP67", {"de": "Schutzart", "en": "protection", "zh": "防护等级"}]]}, {"id": "substations", "img": "hz-substation", "region": "cn", "ind": "energie", "featured": true, "product": "x30", "place": {"de": "China — über 100 Standorte", "en": "China — more than 100 sites", "zh": "中国——超过 100 座站点"}, "client": {"de": "State Grid, China Southern Power Grid u. a.", "en": "State Grid, China Southern Power Grid and others", "zh": "国家电网、南方电网等"}, "title": {"de": "Vollautonome Umspannwerk-Inspektion — als Erste weltweit", "en": "Fully autonomous substation inspection — first in the world", "zh": "全球首个实现变电站全自主巡检的四足机器人"}, "pain": {"de": "Ein manueller Rundgang dauert 2–3 Stunden, mit Stromschlag- und Absturzgefahr; Messwerte werden unterschiedlich abgelesen.", "en": "A manual round takes 2–3 hours, with electrocution and fall hazards; readings vary from person to person.", "zh": "人工巡检一次 2–3 小时，存在触电、跌落风险，读数因人而异。"}, "sol": {"de": "Vierbeiner lesen Zeiger-, Digital- und Zustandsanzeigen, Meldeleuchten und Infrarot-Temperaturen automatisch ab, laden selbst und kehren bei Funkabbruch autonom zurück. Im Einsatz u. a. in Konverterstationen in Zhejiang, im 110-kV-Netz in Xinjiang und an Windpark-Umspannwerken in der Wüste von Ningxia.", "en": "Quadrupeds automatically read analogue, digital and status gauges, indicator lights and infrared temperatures, charge themselves and return autonomously if the link drops. In use at converter stations in Zhejiang, on the 110 kV grid in Xinjiang and at desert wind-farm substations in Ningxia, among others.", "zh": "四足机器人自动识别指针表、数字表、状态表、指示灯和红外温度，自主充电，断网也能自主返航。已在浙江换流站、新疆 110kV 变电站、宁夏戈壁风电场升压站等地投用。"}, "result": [["100+", {"de": "Umspannwerke", "en": "substations", "zh": "变电站"}], ["96,5 %", {"de": "Erkennungsgenauigkeit", "en": "recognition accuracy", "zh": "识别准确率"}], [">1000 h", {"de": "ohne Störung (MTBF)", "en": "MTBF", "zh": "平均无故障"}]]}, {"id": "ningbo-steel", "img": "ningbo-steel", "region": "cn", "ind": "industrie", "featured": true, "product": "x30", "place": {"de": "Ningbo, China", "en": "Ningbo, China", "zh": "中国宁波"}, "client": {"de": "Ningbo Iron & Steel", "en": "Ningbo Iron & Steel", "zh": "宁波钢铁"}, "title": {"de": "Hochofen-Inspektion bei 50 °C", "en": "Blast-furnace inspection at 50 °C", "zh": "50 °C 高炉区智能巡检"}, "pain": {"de": "Hochofenvorplatz, Windformbühne, Kohle- und Brennstoffförderung: heiß, staubig, gefährlich — und doch täglich zu kontrollieren.", "en": "Blast-furnace front, tuyere platform, coal and fuel conveying: hot, dusty, dangerous — yet checked daily.", "zh": "高炉炉前区域、风口平台、输煤与燃料系统：高温、粉尘、危险，却必须每天巡查。"}, "sol": {"de": "Ein X30 läuft die Routen täglich über acht Stunden ab, überträgt Bilder und Messwerte in die Leitwarte und digitalisiert den gesamten Inspektionsablauf.", "en": "An X30 walks the routes for over eight hours a day, transmits images and readings to the control room and digitises the entire inspection process.", "zh": "X30 每天巡检超过 8 小时，图像和数据实时回传控制室，实现关键生产区域巡检流程的自动化和数字化。"}, "result": [[">8 h", {"de": "Inspektion pro Tag", "en": "inspection per day", "zh": "每天巡检时长"}], [">95 %", {"de": "Störungserkennung", "en": "fault recognition", "zh": "故障识别率"}], ["50 °C", {"de": "Umgebung auf der Route", "en": "ambient on route", "zh": "巡检环境温度"}]]}, {"id": "nanchang-police", "img": "nanchang-police", "region": "cn", "ind": "sicherheit", "product": "x30", "place": {"de": "Nanchang, China", "en": "Nanchang, China", "zh": "中国南昌"}, "client": {"de": "Polizei Nanchang", "en": "Nanchang police", "zh": "南昌公安"}, "title": {"de": "Intelligente Straßenstreife mit der Polizei", "en": "Smart street patrol alongside the police", "zh": "与警队协同的街面智能巡逻"}, "pain": {"de": "Zu wenig Personal für die Zahl der Streifen; Verstöße und Auffälligkeiten werden übersehen.", "en": "Too few officers for the number of patrols; violations and unusual behaviour get missed.", "zh": "警力不足，巡逻班次排不过来，违规和异常行为容易漏看。"}, "sol": {"de": "Vierbeiner streifen viermal täglich mit, erkennen Regelverstöße und auffälliges Verhalten und informieren Passanten per Lautsprecher. Weitere Aufgaben: Nachtstreife, Verkehrslenkung, Schutz öffentlicher Einrichtungen, Lagehilfe bei Notfällen.", "en": "Quadrupeds join the patrol four times a day, recognise rule violations and unusual behaviour, and inform passers-by over the loudspeaker. Further tasks: night patrol, traffic guidance, protection of public facilities, support in emergencies.", "zh": "机器狗每天参与 4 次巡逻，识别违章和异常行为，并通过喇叭开展安全宣教。拓展任务包括夜间防控、交通疏导、公共设施保护和突发应急支援。"}, "result": [["4×", {"de": "Streifen pro Tag", "en": "patrols per day", "zh": "每日巡逻"}], ["95 %", {"de": "Erkennung von Verstößen", "en": "violation recognition", "zh": "违章识别率"}], ["−80 %", {"de": "manuelle Streifenschichten", "en": "manual patrol shifts", "zh": "人工巡逻班次"}]]}, {"id": "flood-warrior", "img": "flood-warrior", "region": "cn", "ind": "feuerwehr", "featured": true, "product": "lynx-m20-pro", "place": {"de": "Zhejiang, China", "en": "Zhejiang, China", "zh": "中国浙江"}, "client": {"de": "Notfallmanagement-Behörde der Provinz Zhejiang", "en": "Zhejiang Provincial Department of Emergency Management", "zh": "浙江省应急管理厅"}, "title": {"de": "„KI-Hochwasserhelfer“ — der erste verkörperte KI-Roboter für Hochwasser- und Taifunschutz", "en": "“AI Flood Warrior” — the first embodied-AI robot for flood and typhoon protection", "zh": "\"AI 防汛勇士\"——全国首个防汛防台具身智能机器人"}, "pain": {"de": "Deiche, Hänge und überflutete Wege müssen bei Sturm kontrolliert werden — genau dann, wenn es für Menschen am gefährlichsten ist.", "en": "Dykes, slopes and flooded paths need checking during storms — exactly when it is most dangerous for people.", "zh": "台风暴雨时最需要巡查堤坝、山坡和积水道路，而这正是人员最危险的时候。"}, "sol": {"de": "Auf Basis des Lynx M20: KI-Großmodell und Zwei-Spektrum-Kamerakopf, durchquert schwieriges Gelände und 40 cm tiefes Wasser, erkennt Gefahrenstellen selbstständig und gibt abgestufte Warnungen aus. Übernimmt Kontrollgänge, Erkundung und Suche.", "en": "Based on the Lynx M20: AI large model and dual-spectrum camera head, crosses rough terrain and 40 cm deep water, identifies hazards on its own and issues graded warnings. Takes over patrols, reconnaissance and search.", "zh": "以山猫 M20 为平台，集成大模型与双光谱吊舱，可通行复杂地形、涉水 40 cm，独立完成隐患识别与分级预警，代替人工执行巡查、侦察与搜救。"}, "result": [["40 cm", {"de": "Wattiefe", "en": "wading depth", "zh": "涉水深度"}], ["#1", {"de": "erster seiner Art in China", "en": "first of its kind in China", "zh": "全国首个"}]]}, {"id": "confined-space", "img": "confined-space", "region": "cn", "ind": "feuerwehr", "product": "lynx-m20-pro", "place": {"de": "Zhejiang, China", "en": "Zhejiang, China", "zh": "中国浙江"}, "client": {"de": "Katastrophenschutzbehörde der Provinz", "en": "Provincial emergency management authority", "zh": "浙江省应急管理厅"}, "title": {"de": "Erkundung und Funk in Bergwerken und Tunneln", "en": "Reconnaissance and communications in mines and tunnels", "zh": "矿山与隧道密闭空间侦察通信"}, "pain": {"de": "In engen Räumen unter Tage: schlechte Sicht, kein Funk, hohe Gefahr für Rettungskräfte.", "en": "In confined spaces underground: poor visibility, no radio signal, high risk for rescuers.", "zh": "地下密闭空间能见度低、信号被屏蔽、救援人员风险极高。"}, "sol": {"de": "Auf Basis des Lynx M20 mit Edge-Cloud-KI, 5G- und Satellitenfunk sowie Lebenszeichen-Detektor: geht vor den Rettern hinein, erkundet die Lage, baut ein Notfunknetz auf und sucht nach Verschütteten.", "en": "Based on the Lynx M20 with edge-cloud AI, 5G and satellite communications and a life detector: goes in ahead of rescuers, assesses the situation, sets up an emergency network and searches for trapped people.", "zh": "以山猫 M20 为平台，融合端云协同 AI 与 5G + 卫星通信，搭载生命探测仪，先于救援人员进入，超前侦察、态势研判、应急组网并搜寻被困人员。"}, "result": [["5G + Sat", {"de": "Funk unter Tage", "en": "comms underground", "zh": "井下通信"}], ["#1", {"de": "erster Branchenroboter dieser Art", "en": "first industry robot of its kind", "zh": "行业首个"}]]}, {"id": "kekexili", "img": "kekexili", "region": "cn", "ind": "museum", "product": "x30", "place": {"de": "Hoh Xil, Tibet-Hochebene", "en": "Hoh Xil, Tibetan Plateau", "zh": "可可西里"}, "client": {"de": "Naturschutzgebiet", "en": "Nature reserve", "zh": "自然保护区"}, "title": {"de": "Der „Roboter-Tibetantilope“ — Wildtierbeobachtung ohne Störung", "en": "The “robot Tibetan antelope” — wildlife observation without disturbance", "zh": "\"机器藏羚羊\"——零打扰观测野生动物"}, "pain": {"de": "Scheue Wildtiere lassen sich mit herkömmlichen Mitteln weder lange noch aus der Nähe beobachten.", "en": "Shy wild animals cannot be observed for long or up close with conventional methods.", "zh": "敏感野生动物用传统手段难以长时间、近距离观测。"}, "sol": {"de": "Ein als Antilope verkleideter X30 mischt sich unter die Herde und zeichnet Wanderung und Fortpflanzung aus nächster Nähe auf — wertvolle Rohdaten für die Forschung, weniger Störung im Lebensraum.", "en": "An X30 disguised as an antelope joins the herd and records migration and breeding at close range — valuable raw data for research, less disturbance of the habitat.", "zh": "X30 化身\"藏羚羊\"融入羊群，以\"同伴\"视角近距离记录迁徙、繁殖等行为，为科研提供一手数据，同时减少对栖息地的干扰。"}, "result": [["4.600 m", {"de": "Höhe", "en": "altitude", "zh": "海拔"}], ["#1", {"de": "weltweit erste Roboter-Antilope", "en": "world’s first robot antelope", "zh": "全球首只"}]]}], "gallery": {"energie": [["hz-substation", {"de": "Umspannwerk, Hangzhou", "en": "Substation, Hangzhou", "zh": "杭州某变电站"}], ["ningxia-gobi", {"de": "Wüsten-Umspannwerk, Ningxia", "en": "Desert substation, Ningxia", "zh": "宁夏戈壁滩"}], ["xinjiang-110kv", {"de": "110-kV-Station, Xinjiang", "en": "110 kV station, Xinjiang", "zh": "新疆 110kV 变电站"}], ["zj-converter", {"de": "Konverterstation, Zhejiang", "en": "Converter station, Zhejiang", "zh": "浙江某换流站"}], ["sx-converter", {"de": "Konverterstation, Shaoxing", "en": "Converter station, Shaoxing", "zh": "绍兴换流站"}], ["datengxia", {"de": "Wasserkraft Datengxia", "en": "Datengxia hydro project", "zh": "大藤峡水利枢纽"}], ["hz-thermal", {"de": "Wärmekraftwerk, Hangzhou", "en": "Thermal power plant, Hangzhou", "zh": "杭州某火电厂"}], ["eu-nuclear", {"de": "Kernkraftwerk, Europa", "en": "Nuclear power plant, Europe", "zh": "欧洲核电站"}]], "feuerwehr": [["mission-2026", {"de": "Übung „Mission 2026“", "en": "Drill “Mission 2026”", "zh": "应急使命·2026"}], ["changsha-fire", {"de": "Feuerwehr Changsha", "en": "Changsha fire brigade", "zh": "长沙消防"}], ["xihu-forest", {"de": "Waldbrandschutz West Lake", "en": "West Lake forest fire service", "zh": "西湖森林消防"}], ["zj-forest", {"de": "Waldbrandschutz Zhejiang", "en": "Zhejiang forest fire service", "zh": "浙江森林消防"}], ["hz-fire", {"de": "Feuerwehr Hangzhou", "en": "Hangzhou fire brigade", "zh": "杭州消防支队"}], ["shanxi-forest", {"de": "Forstübung Shanxi", "en": "Forestry drill, Shanxi", "zh": "山西林草局演练"}], ["henan-highrise", {"de": "Hochhaus-Übung, Henan", "en": "High-rise drill, Henan", "zh": "河南超高层实战演练"}], ["yulin-chem", {"de": "Chemie-Notfall, Yulin", "en": "Chemical emergency, Yulin", "zh": "榆林化学应急救援"}]], "sicherheit": [["games-venue", {"de": "Nationale Spiele", "en": "National Games venue", "zh": "全运会场馆"}], ["sh-police", {"de": "Straßenstreife der Polizei Shanghai", "en": "Shanghai police street patrol", "zh": "上海公安街面巡逻"}], ["bj-patrol", {"de": "Streife Beijing E-Town", "en": "Beijing E-Town patrol", "zh": "北京经开区巡逻"}], ["cd-police", {"de": "Straßenstreife der Polizei Chengdu", "en": "Chengdu police street patrol", "zh": "成都公安街面巡逻"}], ["hz-police", {"de": "Revierstreife der Polizei Hangzhou", "en": "Hangzhou police district patrol", "zh": "杭州公安辖区巡逻"}], ["yiwu-market", {"de": "Großmarkt Yiwu", "en": "Yiwu trade market", "zh": "义乌国际商贸城"}], ["sg-park", {"de": "Industriepark, Singapur", "en": "Industrial park, Singapore", "zh": "新加坡园区巡逻"}], ["worldcup", {"de": "WM 2026, Monterrey", "en": "World Cup 2026, Monterrey", "zh": "美加墨世界杯"}]], "industrie": [["faw-mould", {"de": "Werkzeugbau FAW", "en": "FAW tooling plant", "zh": "一汽模具厂"}], ["js-water", {"de": "Wasserwerk, Jiangsu", "en": "Waterworks, Jiangsu", "zh": "江苏某自来水厂"}], ["reservoir", {"de": "Stausee Süd-Nord-Kanal", "en": "South–North Water reservoir", "zh": "南水北调某水库"}], ["hz-construction", {"de": "Baustelle, Hangzhou", "en": "Construction site, Hangzhou", "zh": "杭州某建筑工地"}], ["zz-water", {"de": "Wasserwerk, Zhengzhou", "en": "Waterworks, Zhengzhou", "zh": "郑州某自来水厂"}], ["tangshan-port", {"de": "Förderband, Hafen Tangshan", "en": "Conveyor, Tangshan port", "zh": "唐山港口皮带机"}], ["sa-factory", {"de": "Werk, Südamerika", "en": "Plant, South America", "zh": "南美工厂"}], ["na-warehouse", {"de": "Lager, Nordamerika", "en": "Warehouse, North America", "zh": "北美仓储"}]], "museum": [["na-delivery", {"de": "Zustellung, Nordamerika", "en": "Delivery, North America", "zh": "北美物流配送"}], ["scenic-transport", {"de": "Materialtransport im Ausflugsgebiet", "en": "Transport in a scenic area", "zh": "景区物资搬运"}], ["bayberry", {"de": "Erntehilfe Pappelbeere", "en": "Bayberry harvest help", "zh": "仙居杨梅助收"}], ["longjing-tea", {"de": "Erntehilfe Longjing-Tee", "en": "Longjing tea harvest help", "zh": "西湖龙井茶助收"}], ["suchao-live", {"de": "Live-Übertragung Fußballliga", "en": "Football league live broadcast", "zh": "苏超赛事直播"}]], "forschung": [["shu", {"de": "Universität Shanghai — Lehre", "en": "Shanghai University — teaching", "zh": "上海大学 智能机器人教学研究"}], ["xjtu", {"de": "Xi’an Jiaotong — Datenerfassung", "en": "Xi’an Jiaotong — data collection", "zh": "西安交通大学 智能数据采集"}], ["zjut", {"de": "Zhejiang Univ. of Technology — Labor", "en": "Zhejiang Univ. of Technology — lab", "zh": "浙江工业大学 联合实验室"}], ["cjlu", {"de": "China Jiliang Univ. — Wahrnehmung", "en": "China Jiliang Univ. — perception", "zh": "中国计量大学 感知实验室"}], ["xust", {"de": "Xi’an Univ. of Sci. & Tech. — Campusstreife", "en": "Xi’an Univ. of Sci. & Tech. — campus patrol", "zh": "西安科技大学 校园巡检"}], ["huzhou", {"de": "Berufskolleg Huzhou — Ausbildung", "en": "Huzhou Vocational — training", "zh": "湖州职业技术学院 实训基地"}]]}, "partner": {"ranks": [["#1", {"de": "weltweit bei Vierbeinern im Industrieeinsatz", "en": "worldwide in industrial quadruped applications", "zh": "全球四足机器人行业应用第一"}], ["#2", {"de": "weltweit bei Vierbeiner-Robotern insgesamt", "en": "worldwide in quadruped robots overall", "zh": "全球四足机器人第二"}], ["#4", {"de": "weltweit bei verkörperter KI-Robotik", "en": "worldwide in embodied-AI robotics", "zh": "全球具身智能机器人第四"}]], "numbers": [["200+", {"de": "Patentanmeldungen", "en": "patent applications", "zh": "专利申请"}], ["130+", {"de": "erteilte Patente", "en": "granted patents", "zh": "专利授权"}], ["36", {"de": "Erfindungspatente", "en": "invention patents", "zh": "发明授权"}], ["8", {"de": "nationale & Verbandsnormen", "en": "national & industry standards", "zh": "国家级与团体标准"}], ["45", {"de": "Länder und Regionen", "en": "countries and regions", "zh": "国家和地区"}], ["1.200+", {"de": "reale Einsatzszenarien", "en": "real deployment scenarios", "zh": "真实落地场景"}]], "firsts": [["2021", {"de": "Weltweit erster Vierbeiner mit vollautonomer Umspannwerk-Inspektion", "en": "World’s first quadruped to inspect a substation fully autonomously", "zh": "全球首个实现变电站全自主巡检的四足机器人"}], ["2022", {"de": "Weltweit erste Brandschutz- und Rettungslösung mit Vierbeinern", "en": "World’s first emergency firefighting solution built on quadrupeds", "zh": "全球首个推出应急消防解决方案的四足机器人"}], ["2024", {"de": "Erster chinesischer Industrie-Vierbeiner im Stromnetz im Ausland (Singapur)", "en": "First Chinese industrial quadruped in a foreign power grid (Singapore)", "zh": "国产四足机器人首次海外行业应用（新加坡电网）"}], ["2025", {"de": "Weltweit erster industrieller Humanoid für jedes Wetter (IP66)", "en": "World’s first all-weather industrial humanoid (IP66)", "zh": "全球首款行业级全天候人形机器人（IP66）"}]], "standards": [{"de": "Sicherheitsanforderungen für Inspektionsroboter (national)", "en": "Safety requirements for inspection robots (national)", "zh": "巡检机器人安全要求（国家标准）"}, {"de": "Leistung und Prüfverfahren integrierter Robotergelenke (national)", "en": "Performance and test methods for integrated robot joints (national)", "zh": "机器人一体化关节性能及试验方法（国家标准）"}, {"de": "Allgemeine Technik für Industrie-Inspektionsvierbeiner", "en": "General specification for industrial inspection quadrupeds", "zh": "工业巡检四足机器人通用技术条件"}, {"de": "Beinroboter-Inspektion in Kraftwerken und Umspannwerken", "en": "Legged-robot inspection in power plants and substations", "zh": "电力厂站足式机器人巡检"}]}, "humanoidIntro": {"de": "Zweibeinige Ganzkörperplattformen für Arbeitsplätze, Werkzeuge und Wege, die für Menschen gebaut wurden. Den Anfang macht der DR02 — der erste industrielle Humanoid, der nach IP66 bei jedem Wetter draußen arbeitet.", "en": "Bipedal whole-body platforms for workstations, tools and routes built for people. First up is the DR02 — the first industrial humanoid that works outdoors in any weather to IP66.", "zh": "面向为人设计的工位、工具与通道的双足全身平台。首发型号 DR02——首款可在户外全天候作业（IP66）的行业级人形机器人。"}});

/* ---- v18: WM-2026-Referenz nach Pressemitteilung vom 23.06.2026 ---- */
(function () {
  const c = NIC.cases.find((x) => x.id === 'worldcup');
  if (!c) return;
  c.title = {
    de: 'Fußball-WM 2026: Roboterstreife im K.-o.-Stadion',
    en: '2026 FIFA World Cup: robot patrol at a knockout venue',
    zh: '2026 世界杯淘汰赛主场：机器人巡逻队'
  };
  c.client = {
    de: 'FIFA-WM 2026, Estadio Monterrey · mit lokalem Partner TICSA',
    en: 'FIFA World Cup 2026, Monterrey Stadium · with local partner TICSA',
    zh: '2026 美加墨世界杯·蒙特雷体育场 · 联合墨西哥本地伙伴 TICSA'
  };
  c.pain = {
    de: 'Monterrey ist unter den drei mexikanischen Stadien der Hauptspielort für K.-o.-Spiele — rund 53.000 Zuschauer auf etwa 125.000 m². Manuelle Streifen auf so großer, verwinkelter Fläche sind ineffizient, haben tote Winkel und reagieren zu langsam. Das Sichtfeld der Sicherheitskräfte ist begrenzt, Informationen kommen verzögert an — und der Andrang von Fans und Personal verschärft beides.',
    en: 'Of Mexico’s three host stadiums, Monterrey is the main venue for knockout matches — some 53,000 spectators on about 125,000 m². Manual patrols over such a large, complex area are inefficient, leave blind spots and respond too slowly. Security staff have a limited field of view, information arrives late — and crowds of fans and staff make both worse.',
    zh: '蒙特雷体育场是墨西哥三座世界杯球场中承办淘汰赛的主场，约 5.3 万名观众、约 12.5 万平方米场地。在这么大、这么复杂的区域里，人工巡逻效率低、盲区多、应急响应慢；安保人员视野有限，信息传递滞后，大量球迷和工作人员的人流又让这些问题更加突出。'
  };
  c.sol = {
    de: 'Eine Staffel rad-beiniger Lynx M20 streift innen und außen — Außengelände und Umläufe inklusive — autonom auf festgelegten Routen. Sie weicht Personen und Fahrzeugen aus, fährt Treppen, passt durch enge Durchgänge und erreicht Bereiche, in die kein Personal kommt. Rundumkameras übertragen live; die Auswertung an Bord schließt den Kreis „Erkennen – Bewerten – Reagieren“: Menschenansammlungen und Auffälligkeiten an Anlagen werden erkannt und sofort per Lautsprecher gemeldet. Zusätzlich unterstützt die Staffel bei Anlagenkontrollen.',
    en: 'A squad of wheel-legged Lynx M20 patrols inside and outside — exterior grounds and concourses included — autonomously on preset routes. They avoid people and vehicles, take stairs, fit through narrow passages and reach areas staff cannot. All-round cameras stream live; on-board analysis closes the “detect – assess – respond” loop: abnormal crowding and facility issues are spotted and announced immediately by loudspeaker. The squad also assists with facility inspections.',
    zh: '轮足式山猫 M20 组成巡逻小队，覆盖体育场内外，包括外围和大厅通道，按预设路线自主巡逻：精准避让行人和车辆，上下楼梯、穿越狭窄通道，进入人员到不了的区域。全景相机实时回传画面，端侧智能分析形成“发现—研判—处置”闭环，识别人群异常聚集和设施异常后立即预警并语音广播；同时协助安保人员做设施巡检和状态监测。'
  };
  c.gain = {
    de: 'Lückenlose Streife rund um die Uhr statt toter Winkel; Warnungen kommen direkt vom Ort des Geschehens statt über Funkketten — der Hersteller nennt Reaktionszeiten im Millisekundenbereich. Sicherheitskräfte konzentrieren sich auf den Einsatz statt aufs Ablaufen. Nebenbei wurden die Roboter in den Pausen zum Publikumsmagneten für Fans aus aller Welt.',
    en: 'Gap-free, round-the-clock patrol instead of blind spots; alerts come straight from the scene rather than through radio chains — the manufacturer cites millisecond-level response. Security staff focus on intervening instead of walking rounds. And during breaks the robots became a crowd magnet for fans from all over the world.',
    zh: '实现全天候、无盲区巡逻；告警从现场直接发出，不再经过层层对讲转达，厂商称可实现毫秒级智能响应。安保人员从“走巡逻”转为专注处置。比赛间隙，机器人还成了各国球迷围观合影的“科技大使”。'
  };
  c.result = [
    ['53.000', { de: 'Zuschauer im Stadion', en: 'spectators', zh: '观众容量' }],
    ['125.000 m²', { de: 'Fläche innen & außen', en: 'area inside & out', zh: '场内外覆盖面积' }],
    ['24/7', { de: 'Streife ohne tote Winkel', en: 'patrol without blind spots', zh: '全天候无盲区巡逻' }]
  ];
})();

/* ---- v22: Heimroboter (Q1, T1) — Kategorie „pflege" wird „heim" ---- */
(function () {
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  var c = NIC.categories.find(function (x) { return x.id === 'pflege'; });
  if (c) {
    c.id = 'heim'; c.slug = 'heimroboter'; c.status = 'live'; c.order = 4;
    c.page = 'produkte/heimroboter.html';
    c.name = L('Heimroboter', 'Home Robots', '家庭机器人');
    c.short = L('Heimroboter', 'Home robots', '家庭机器人');
    c.tagline = L('Begleiter für Familie, Kinder und Großeltern.', 'Companions for families, children and grandparents.', '陪伴家人、孩子和长辈的家庭伙伴。');
    c.intro = L(
      'Roboter, die zu Hause mitleben: Sie unterhalten sich, spielen, lernen mit den Kindern, begleiten die Großeltern beim Spaziergang und tragen Kleinigkeiten. Zwei Modelle — der zweibeinige Q1 und der wandelbare T1.',
      'Robots that live with you: they talk, play, learn with the children, walk with the grandparents and carry small things. Two models — the bipedal Q1 and the transforming T1.',
      '真正住进家里的机器人：能聊天、能玩、陪孩子学习、陪长辈散步，还能帮忙拿点小东西。两款机型——双足人形 Q1 与可变形的 T1。');
    c.image = 't1-main';
  }

  var Q1 = {
    id: 'q1', slug: 'heimroboter-q1', sku: 'NIC-HR-Q1', category: 'heim', brand: 'NIC Robotics', order: 1,
    name: 'Q1', price: null, photo: true,
    family: L('Persönlicher Humanoid', 'Personal humanoid', '个人人形机器人'),
    badge: L('Neu', 'New', '新品'),
    tagline: L('88 cm, 22 Gelenke, ein Gedächtnis — der kleine Humanoid für Gespräch, Spiel und Lernen.',
               '88 cm, 22 joints, a memory — the small humanoid for conversation, play and learning.',
               '88 厘米、22 个关节、会记事——陪聊、陪玩、陪学习的小个子人形机器人。'),
    summary: L(
      'Der Q1 ist so groß wie ein Kindergartenkind und bewegt sich mit 22 Gelenken erstaunlich menschlich: Er tanzt ganze Choreografien, gestikuliert beim Erzählen und lernt neue Bewegungen, wenn man ihm die Arme führt. Er sieht, hört und fühlt Berührungen, erkennt Gesichter, merkt sich Vorlieben und spricht von sich aus an. Mit Werkzeugen für Aussehen, Charakter und Bewegung wird jeder Q1 zum eigenen; die Explorer-Version öffnet SDK, HDK und Hardware-Schnittstellen für Entwickler.',
      'The Q1 is the height of a kindergarten child and moves with 22 joints in a strikingly human way: it dances full choreographies, gestures while telling a story and learns new moves when you guide its arms. It sees, hears and feels touch, recognises faces, remembers preferences and starts conversations on its own. Tools for appearance, character and motion make every Q1 your own; the Explorer edition opens SDK, HDK and hardware interfaces for developers.',
      'Q1 和幼儿园的孩子差不多高，22 个关节让它动起来格外像人：能跳完整的舞，讲故事时会配手势，你握着它的手臂带一遍，它就能学会新动作。它能看、能听、能感知触摸，认得出家人，记得住喜好，还会主动搭话。配套的外观、人设与动作创作工具，让每台 Q1 都独一无二；探索版另外开放 SDK/HDK 与硬件接口，供开发者二次开发。'),
    highlights: [
      L('22 Freiheitsgrade: Arme 2 × 4, Beine 2 × 6, Hüfte 2', '22 degrees of freedom: arms 2 × 4, legs 2 × 6, waist 2', '22 个自由度：双臂各 4、双腿各 6、腰部 2'),
      L('QDD-Gelenkmodule: 260 g, Spitzendrehmomentdichte 85 N·m/kg', 'QDD joint modules: 260 g, peak torque density 85 N·m/kg', 'QDD 准直驱关节：单关节 260 g，峰值扭矩密度 85 N·m/kg'),
      L('Multimodal: Sprache, Sehen, Berührung, Gesichtserkennung, Langzeitgedächtnis', 'Multimodal: speech, vision, touch, face recognition, long-term memory', '多模态交互：语音、视觉、触摸、人脸识别、长期记忆'),
      L('Tanzt, spielt Sprachspiele, lernt Bewegungen durch Vormachen', 'Dances, plays word games, learns moves by demonstration', '全身舞蹈、语言互动游戏、手把手动作示教'),
      L('Lernen: KI-Grundkurs, grafisches Programmieren, Englisch-Sprechtraining', 'Learning: AI basics course, graphical programming, spoken-English practice', '学习：AI 启蒙课程、图形化编程、英语口语陪练'),
      L('3 h gemischter Betrieb, Laden in ≤ 1,5 h, Akku wechselbar', '3 h mixed use, charging in ≤ 1.5 h, swappable battery', '综合续航 3 小时，≤1.5 小时充满，支持换电'),
      L('Explorer: SDK/HDK, USB-A, USB-C, RJ45, 12 V/5 A', 'Explorer: SDK/HDK, USB-A, USB-C, RJ45, 12 V/5 A', '探索版：SDK/HDK、USB-A、USB-C、RJ45、12 V/5 A 供电口')
    ],
    specs: [
      { group: L('Körper', 'Body', '机体'), rows: [
        { k: L('Höhe', 'Height', '身高'), v: '88 cm' },
        { k: L('Gewicht inkl. Akku', 'Weight incl. battery', '含电池重量'), v: L('ca. 16 kg', 'approx. 16 kg', '约 16 kg') },
        { k: L('Freiheitsgrade', 'Degrees of freedom', '自由度'), v: L('22 (Arme 2 × 4, Beine 2 × 6, Hüfte 2)', '22 (arms 2 × 4, legs 2 × 6, waist 2)', '22（臂 4×2 + 腿 6×2 + 腰 2）') },
        { k: L('Farben', 'Colours', '颜色'), v: L('Sternengrau, Sternweiß, Kirschblütenrosa', 'Star grey, star white, blossom pink', '星空灰、星皎白、樱漫粉') }
      ]},
      { group: L('Bewegung', 'Motion', '运动性能'), rows: [
        { k: L('Gehgeschwindigkeit (Alltag, max.)', 'Walking speed (daily, max.)', '日常最高速度'), v: '1 m/s' },
        { k: L('Gelenkantrieb', 'Joint drive', '关节驱动'), v: L('QDD, 260 g je Modul, hohle Kabelführung 2,5 mm', 'QDD, 260 g per module, 2.5 mm hollow cabling', 'QDD 准直驱，单关节 260 g，2.5 mm 中空走线') },
        { k: L('Steuerung', 'Control', '运动控制'), v: L('Hybride Reinforcement-Learning-Regelung', 'Hybrid reinforcement-learning control', '混合强化学习运动控制') }
      ]},
      { group: L('Energie', 'Power', '能源'), rows: [
        { k: L('Akku', 'Battery', '电池能量'), v: '215 Wh' },
        { k: L('Laufzeit (gemischt)', 'Runtime (mixed)', '综合续航'), v: '3 h' },
        { k: L('Standby (stehend)', 'Standby (standing)', '站立待机'), v: '4 h' },
        { k: L('Ladezeit 5–95 %', 'Charging 5–95 %', '充电 5%–95%'), v: L('≤ 1,5 h, direkt oder per Akkuwechsel', '≤ 1.5 h, direct or by battery swap', '≤1.5 小时，直充或换电') }
      ]},
      { group: L('Sensorik & Rechner', 'Sensors & computing', '感知与计算'), rows: [
        { k: L('Kamera', 'Camera', '摄像头'), v: L('Monokamera', 'Monocular', '单目') },
        { k: L('Audio', 'Audio', '音频'), v: L('Ringmikrofon, Lautsprecher', 'Ring microphone, speaker', '环形麦克风、扬声器') },
        { k: L('Interaktion', 'Interaction', '交互'), v: L('Ausdrucksdisplay, Berührungssensoren', 'Expression display, touch sensors', '表情屏、触摸传感器') },
        { k: L('Prozessor', 'Processor', '处理器'), v: L('8-Kern-Hochleistungsprozessor', '8-core high-performance processor', '8 核高性能处理器') }
      ]},
      { group: L('Verbindung & Software', 'Connectivity & software', '连接与软件'), rows: [
        { k: L('Funk', 'Wireless', '通信'), v: L('WLAN, Bluetooth', 'Wi-Fi, Bluetooth', 'Wi-Fi、蓝牙') },
        { k: L('Bedienung', 'Control', '操控'), v: L('Sprache, Berührung, Smartphone-App, immersive Fernsteuerung', 'Voice, touch, smartphone app, immersive remote control', '语音、触摸、手机 APP、沉浸式遥控') },
        { k: L('Gestaltung', 'Creation tools', '创作工具'), v: L('Aussehen, Charakter und Bewegungen selbst gestalten', 'Design appearance, character and moves yourself', '外观 AI 设计、人设创作、动作创作') }
      ]},
      { group: L('Zubehör (optional)', 'Accessories (optional)', '选配'), rows: [
        { k: L('Transport', 'Transport', '携行'), v: L('Tragekoffer, Tragetasche', 'Carry case, carry bag', '携行箱、携行包') },
        { k: L('Angekündigt', 'Announced', '待上市'), v: L('Mobiler Akku 99 Wh, leise Schuhüberzüge', '99 Wh portable battery, silent shoe covers', '99 Wh 便携电池、静音鞋套') }
      ]}
    ],
    variantTable: {
      caption: L('Q1 oder Q1 Explorer — für die Familie oder für Entwickler.', 'Q1 or Q1 Explorer — for the family or for developers.', 'Q1 还是 Q1 探索版——给家庭，还是给开发者。'),
      cols: ['Q1', 'Q1 Explorer'],
      rows: [
        { k: L('Gespräch, Spiel, Tanz, Lernen', 'Conversation, play, dance, learning', '聊天、游戏、舞蹈、学习'), v: [true, true] },
        { k: L('Gesichtserkennung & Gedächtnis', 'Face recognition & memory', '人脸识别与记忆'), v: [true, true] },
        { k: L('Gestaltungswerkzeuge', 'Creation tools', '外观/人设/动作创作'), v: [true, true] },
        { k: L('SDK / HDK', 'SDK / HDK', '二次开发 SDK/HDK'), v: [false, true] },
        { k: L('Plattform für eigene Skills', 'Platform for your own skills', '技能开发与分享平台'), v: [false, true] },
        { k: L('Hardware-Schnittstellen', 'Hardware interfaces', '拓展接口'), v: [false, 'USB-A · USB-C · RJ45 · 12 V/5 A'] }
      ]
    },
    gallery: ['q1-main', 'q1-colors', 'q1-size', 'q1-detail', 'q1-joint'],
    scenes: ['q1-living', 'q1-party', 'q1-draw', 'q1-garden'],
    hero: 'q1-living',
    useCases: ['pflege', 'forschung']
  };

  var T1 = {
    id: 't1', slug: 'heimroboter-t1', sku: 'NIC-HR-T1', category: 'heim', brand: 'NIC Robotics', order: 2,
    name: 'T1', price: null,
    family: L('Wandelbarer Begleitroboter', 'Transforming companion robot', '轮足变形陪伴机器人'),
    badge: L('Neu', 'New', '新品'),
    tagline: L('Aufrecht ein Rad-Bein-Humanoid, geduckt ein Vierbeiner — bei Ihnen zu Hause, im Garten und unterwegs.',
               'Upright a wheel-legged humanoid, crouched a quadruped — with you at home, in the garden and on the road.',
               '站起来是轮足人形，趴下来是四足——陪你在家、在院子、在路上。'),
    summary: L(
      'Der T1 wechselt die Form: Aufrecht rollt er auf zwei Rad-Beinen auf Augenhöhe mit Kindern neben der Familie her, als Vierbeiner läuft er schneller und sicherer über Wege und Wiesen. Er lässt sich an der Hand führen, leuchtet abends den Weg aus, unterhält sich, erklärt, spielt Musik und lernt mit den Kindern. Die Pro-Version sieht rundum, folgt selbstständig, verwandelt sich an der Treppe von allein und trägt im Korb bis zu 3 kg mit.',
      'The T1 changes shape: upright it rolls on two wheel-legs at a child’s eye level beside the family; as a quadruped it moves faster and steadier over paths and lawns. It can be led by the hand, lights the way in the evening, talks, explains, plays music and learns with the children. The Pro edition sees all around, follows on its own, transforms by itself at the stairs and carries up to 3 kg in its basket.',
      'T1 会变形：站立时用两条轮足滑行，和孩子差不多高，跟在家人身边；趴下变成四足，走路更快、更稳，草地小路都能去。它可以牵着手一起走，晚上打开探照灯照亮回家的路，会聊天、会讲解、会放音乐，也能陪孩子学习。Pro 版全向感知，可自主跟随，遇到楼梯自动变形跟上，载物筐里还能装 3 kg 东西。'),
    highlights: [
      L('Zwei Formen: Rad-Bein 2,5 m/s, Vierbeiner 3 m/s', 'Two forms: wheel-legged 2.5 m/s, quadruped 3 m/s', '双形态：轮足 2.5 m/s，四足 3 m/s'),
      L('Hand-in-Hand-Begleitung; Pro folgt selbstständig, auch Treppen hinauf und hinunter', 'Hand-in-hand walking; Pro follows on its own, up and down stairs too', '牵手随行；Pro 可自主跟随，并自动变形跟随上下楼梯'),
      L('Korb bis 3 kg — Pro folgt mit Last', 'Basket up to 3 kg — Pro follows with load', '载物筐负载 ≤3 kg，Pro 可跟随载物'),
      L('Hindernisvermeidung vorne (T1) bzw. rundum (Pro: 5 ToF, Stereo + 2 Fisheye, Orin Nano)', 'Obstacle avoidance ahead (T1) or all-round (Pro: 5 ToF, stereo + 2 fisheye, Orin Nano)', '前向避障（T1）/全向避障（Pro：5 个 ToF、双目 + 2 鱼眼、Orin Nano）'),
      L('Gespräch, Wissen, visuelles Verstehen, Gedächtnis, aktive Ansprache', 'Conversation, knowledge, visual understanding, memory, proactive interaction', '语音闲聊、知识百科、视觉理解、记忆能力、主动交互'),
      L('Scheinwerfer, 6-Mikrofon-Array, Bluetooth-Lautsprecher, Musik', 'Searchlight, 6-microphone array, Bluetooth speaker, music', '探照灯、六阵列麦克风、蓝牙音响、音乐'),
      L('WLAN, Bluetooth und Mobilfunk an Bord', 'Wi-Fi, Bluetooth and cellular on board', '支持 Wi-Fi、蓝牙与蜂窝网络')
    ],
    specs: [
      { group: L('Körper', 'Body', '机体'), rows: [
        { k: L('Höhe (aufrecht)', 'Height (upright)', '身高（站立）'), v: '100 cm' },
        { k: L('Gewicht inkl. Akku', 'Weight incl. battery', '含电池重量'), v: L('T1 ca. 16,3 kg · Pro ca. 16,8 kg', 'T1 approx. 16.3 kg · Pro approx. 16.8 kg', 'T1 约 16.3 kg · Pro 约 16.8 kg') },
        { k: L('Nutzlast', 'Payload', '载荷'), v: '≤ 3 kg' },
        { k: L('Farben', 'Colours', '颜色'), v: L('T1: Sternweiß · Pro: Mondgrau, Fliederlila, Kirschblütenrosa, Triebgrün', 'T1: star white · Pro: moon grey, lilac, blossom pink, sprout green', 'T1：星皎白 · Pro：月影灰、槿芽紫、樱漫粉、松芽绿') }
      ]},
      { group: L('Bewegung', 'Motion', '运动性能'), rows: [
        { k: L('Höchstgeschwindigkeit Vierbeiner', 'Top speed quadruped', '四足最高速度'), v: '3 m/s' },
        { k: L('Höchstgeschwindigkeit Rad-Bein', 'Top speed wheel-legged', '轮足最高速度'), v: '2,5 m/s' },
        { k: L('Hindernishöhe', 'Obstacle height', '越障高度'), v: '15 cm' },
        { k: L('Steigung', 'Slope', '爬坡'), v: '30°' }
      ]},
      { group: L('Energie', 'Power', '能源'), rows: [
        { k: L('Laufzeit (gemischt)', 'Runtime (mixed)', '综合续航'), v: '2–3 h' },
        { k: L('Standby', 'Standby', '待机'), v: '4 h' },
        { k: L('Ladezeit 5–95 %', 'Charging 5–95 %', '充电 5%–95%'), v: L('ca. 1,5 h', 'approx. 1.5 h', '约 1.5 小时') }
      ]},
      { group: L('Sensorik & Rechner', 'Sensors & computing', '感知与计算'), rows: [
        { k: L('Kameras', 'Cameras', '摄像头'), v: L('T1: Mono · Pro: Stereo + 2 Fisheye', 'T1: mono · Pro: stereo + 2 fisheye', 'T1：单目 · Pro：双目 + 2 个鱼眼') },
        { k: L('ToF-Tiefensensoren', 'ToF depth sensors', 'ToF 深度传感器'), v: L('T1: 2 · Pro: 5 (je 120° × 90°)', 'T1: 2 · Pro: 5 (120° × 90° each)', 'T1：2 个 · Pro：5 个（单个 120°×90°）') },
        { k: L('Prozessor', 'Processor', '处理器'), v: L('8-Kern; Pro zusätzlich NVIDIA Orin Nano', '8-core; Pro adds NVIDIA Orin Nano', '8 核；Pro 另配 Orin Nano') },
        { k: L('Weitere', 'Other', '其他'), v: L('6-Mikrofon-Array, Lautsprecher, Ausdrucksdisplay, 2 Berührungssensoren, Scheinwerfer', '6-mic array, speaker, expression display, 2 touch sensors, searchlight', '六阵列麦克风、扬声器、表情屏、2 个触摸传感器、探照灯') }
      ]},
      { group: L('Verbindung', 'Connectivity', '连接'), rows: [
        { k: L('Funk', 'Wireless', '通信'), v: L('WLAN, Bluetooth, Mobilfunk', 'Wi-Fi, Bluetooth, cellular', 'Wi-Fi、蓝牙、蜂窝网络') },
        { k: L('Speicher', 'Storage', '存储'), v: L('microSD-Steckplatz', 'microSD slot', 'Micro SD 卡槽') }
      ]},
      { group: L('Zubehör (optional)', 'Accessories (optional)', '选配'), rows: [
        { k: L('Tragen', 'Carrying', '载物'), v: L('Erweiterungs-Rückenplatte, Lastkorb', 'Expansion back plate, load basket', '拓展背板、载物筐') },
        { k: L('Filmen', 'Filming', '拍摄'), v: L('Kamera-Halterung und -Griff für externe Kamera', 'Mount and grip for an external camera', '相机拓展组件与手柄') }
      ]}
    ],
    variantTable: {
      caption: L('T1 oder T1 Pro — was der Unterschied im Alltag bedeutet.', 'T1 or T1 Pro — what the difference means day to day.', 'T1 还是 T1 Pro——日常用起来差在哪。'),
      cols: ['T1', 'T1 Pro'],
      rows: [
        { k: L('Gespräch, Wissen, Spiel, Musik, Lernen', 'Conversation, knowledge, play, music, learning', '聊天、百科、游戏、音乐、学习'), v: [true, true] },
        { k: L('Hand-in-Hand-Begleitung', 'Hand-in-hand walking', '牵手随行'), v: [true, true] },
        { k: L('Hindernisvermeidung', 'Obstacle avoidance', '移动避障'), v: [L('vorne', 'front', '前向'), L('rundum', 'all-round', '全向')] },
        { k: L('Selbstständig folgen', 'Autonomous following', '移动跟随'), v: [false, true] },
        { k: L('Automatisch verwandeln an der Treppe', 'Auto-transform to follow stairs', '自动变形跟随上下楼梯'), v: [false, true] },
        { k: L('Folgen mit Last (Korb)', 'Follow with load (basket)', '跟随载物'), v: [false, true] },
        { k: L('Externe Kamera: Sprachsteuerung / Kamerafahrt', 'External camera: voice control / camera moves', '外挂相机：语音拍摄 / 运镜拍摄'), v: [L('Sprache', 'voice', '语音拍摄'), L('Sprache + Fahrt', 'voice + moves', '语音 + 运镜')] },
        { k: L('Erinnerungen & Videoanrufe *', 'Reminders & video calls *', '定时提醒、远程音视频通话 *'), v: ['Update', 'Update'] },
        { k: L('Sprachruf, Indoor-Navigation, Auto-Laden *', 'Voice summon, indoor navigation, auto-docking *', '语音召唤、室内导航、自主回充 *'), v: [false, 'Update'] },
        { k: L('SDK', 'SDK', '二次开发 SDK'), v: [false, true] }
      ]
    },
    gallery: ['t1-main', 't1-quad', 't1-morph', 't1-forms', 't1-face'],
    scenes: ['home-family', 'home-hand', 'home-stairs', 'home-camp', 'home-study'],
    hero: 'home-family',
    useCases: ['pflege']
  };
  NIC.products.push(Q1, T1);

  var u = NIC.useCases.find(function (x) { return x.id === 'pflege'; });
  if (u) {
    u.slug = 'zuhause-und-familie'; u.status = 'live'; u.scene = 'home-family';
    u.name = L('Zuhause & Familie', 'Home & family', '家庭陪伴');
    u.kicker = L('Alltag', 'Daily life', '日常');
    u.tagline = L('Mehr Gesellschaft im Alltag — für Kinder und Großeltern.', 'More company in everyday life — for children and grandparents.', '让日常多一份陪伴——给孩子，也给长辈。');
    u.body = L(
      'Viele ältere Menschen sind tagsüber allein, viele Kinder warten nach der Schule auf die Eltern. Ein Heimroboter füllt keine Lücke in der Familie, aber er bringt Bewegung in den Tag: Er spricht an, erzählt, spielt Musik, lernt Englisch mit den Kindern, begleitet beim Spaziergang und leuchtet abends den Weg aus. Bedienung per Sprache und Berührung — ohne Smartphone.',
      'Many older people spend the day alone; many children wait for their parents after school. A home robot does not fill a gap in the family, but it brings life into the day: it starts conversations, tells stories, plays music, practises English with the children, walks along and lights the way in the evening. Operated by voice and touch — no smartphone needed.',
      '很多老人白天独自在家，很多孩子放学后等着父母回来。家庭机器人替代不了家人，但能让一天热闹一些：主动搭话、讲故事、放音乐、陪孩子练英语、陪着散步、晚上照亮回家的路。用语音和触摸就能操作，不需要会用手机。');
    u.points = [
      L('Gespräch, Musik und Spiele — der Roboter spricht von sich aus an', 'Conversation, music and games — the robot starts the conversation', '聊天、音乐、游戏——机器人会主动搭话'),
      L('Lernen mit Kindern: Englisch, Programmieren, Wissensfragen', 'Learning with children: English, programming, quiz', '陪孩子学习：英语、编程、知识问答'),
      L('Begleitung beim Spaziergang, Licht am Abend, Korb bis 3 kg', 'Company on walks, light in the evening, basket up to 3 kg', '散步陪伴、夜间照明、载物 3 kg'),
      L('Bedienung per Sprache und Berührung', 'Voice and touch control', '语音、触摸即可操作')
    ];
    u.facts = [
      { v: '22', de: 'Gelenke (Q1)', en: 'Joints (Q1)', zh: '个关节（Q1）' },
      { v: '2 in 1', de: 'Formen (T1)', en: 'Forms (T1)', zh: '形态（T1）' },
      { v: '3 kg', de: 'Korb (T1)', en: 'Basket (T1)', zh: '载物（T1）' }
    ];
    u.products = ['t1', 'q1'];
    u.pains = [
      L('Großeltern sind tagsüber oft allein und haben wenig Gesprächspartner', 'Grandparents are often alone during the day with few people to talk to', '长辈白天常常独自在家，没人说话'),
      L('Smartphones und Apps sind für viele Ältere eine Hürde', 'Smartphones and apps are a hurdle for many older people', '手机和 APP 对很多老人来说太难用'),
      L('Kinder brauchen Übung und Anregung — Eltern haben nicht immer Zeit', 'Children need practice and stimulation — parents are not always free', '孩子需要练习和启发，父母却不总有时间')
    ];
    u.solution = u.points;
    u.proof = [
      L('T1 Pro folgt selbstständig — und verwandelt sich an der Treppe von allein', 'T1 Pro follows on its own — and transforms by itself at the stairs', 'T1 Pro 可自主跟随，遇到楼梯自动变形跟上'),
      L('Q1 erkennt die Familie am Gesicht und merkt sich Vorlieben', 'Q1 recognises the family by face and remembers preferences', 'Q1 认得出家人，记得住喜好'),
      L('Begleiter, kein Pflege- oder Notrufgerät — Details auf der Heimroboter-Seite', 'A companion, not a care or emergency device — details on the home robots page', '定位是陪伴，不是护理或急救设备——详见家庭机器人页面')
    ];
    u.coming = [];
  }
})();

/* ---- v24: Gewerbliche Reinigung — C5 ---- */
(function () {
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  var c = NIC.categories.find(function (x) { return x.id === 'reinigung'; });
  if (c) {
    c.status = 'live'; c.page = 'produkte/reinigungsroboter.html'; c.image = 'c5-main';
    c.name = L('Gewerbliche Reinigungsroboter', 'Commercial Cleaning Robots', '商用清洁机器人');
    c.short = L('Reinigung', 'Cleaning', '商用清洁');
    c.tagline = L('Kehren, Scheuern und Wischen auf großen Flächen — autonom.', 'Sweeping, scrubbing and mopping on large floors — autonomously.', '大面积扫地、洗地、尘推——全自动完成。');
    c.intro = L(
      'Autonome Bodenreinigung für Supermärkte, Einkaufszentren, Verkehrsknoten, Industriehallen, Kliniken und Bürogebäude — von einem der führenden Hersteller für Embodied-AI-Robotik. Der Roboter plant die Fläche selbst, reinigt nach Zeitplan, fährt mit dem Aufzug und versorgt sich an seiner Station mit Strom und Wasser.',
      'Autonomous floor cleaning for supermarkets, shopping centres, transport hubs, industrial halls, clinics and office buildings — from one of the leading makers of embodied-AI robotics. The robot plans the area itself, cleans on schedule, rides the lift and resupplies power and water at its station.',
      '面向超市、商场、交通枢纽、工业厂房、医院与写字楼的全自动地面清洁——出自全球领先的具身智能机器人厂商。机器人自主规划区域、按计划清扫、自行乘坐电梯，并在工作站自动补电补水。');
  }
  NIC.products.push({
    id: 'c5', slug: 'reinigungsroboter-c5', sku: 'NIC-CL-C5', category: 'reinigung', brand: 'NIC Robotics', order: 1,
    name: 'C5', price: null,
    family: L('Reinigungsroboter für große Flächen', 'Cleaning robot for large areas', '中大型场景清洁机器人'),
    badge: L('Foto folgt', 'Photo coming', '实拍图待更新'),
    tagline: L('Kehren, Scheuern, Wischen in einem Durchgang — bis zu 1.920 m² pro Stunde.', 'Sweeping, scrubbing, mopping in one pass — up to 1,920 m² per hour.', '扫地、洗地、尘推一次完成——每小时最高 1,920 m²。'),
    summary: L(
      'Der C5 vereint Kehrmaschine, Scheuersaugmaschine und Trockenwischer in einem autonomen Gerät. Zwei Seitenbürsten und zwei Walzenbürsten mit 25 kg Anpressdruck lösen auch hartnäckige Verschmutzungen in einem Durchgang; Lidar, Tiefen- und Fisheye-Kamera erkennen Personen und Hindernisse in Echtzeit. Nach dem Einsatz findet er allein zur Station: Akku laden, Frischwasser auffüllen, Schmutzwasser ablassen, Schmutzwassertank in vier Minuten selbst ausspülen.',
      'The C5 combines a sweeper, a scrubber-dryer and a dust mop in one autonomous machine. Two side brushes and two roller brushes with 25 kg down pressure remove even stubborn soiling in a single pass; lidar, depth and fisheye cameras recognise people and obstacles in real time. Afterwards it finds its own way to the station: charge the battery, refill fresh water, drain dirty water, rinse the dirty-water tank itself in four minutes.',
      'C5 把扫地机、洗地吸干机和尘推合为一台全自动设备。双边刷加双滚刷，配合 25 kg 对地压力，重度污渍一遍就能洗净；激光雷达、深度相机和鱼眼相机实时识别行人与障碍物。作业结束后它自己回到工作站：充电、加清水、排污水，4 分钟自动冲洗污水箱。'),
    highlights: [
      L('Kehren, Scheuern und Trockenwischen in einem Gerät', 'Sweeping, scrubbing and dust mopping in one machine', '扫地、洗地、尘推三合一'),
      L('550 mm Arbeitsbreite (840 mm mit Seitenbürsten), Randreinigung bis 0 cm', '550 mm working width (840 mm with side brushes), edge cleaning to 0 cm', '洗地宽度 550 mm（含边刷 840 mm），贴边 0 cm'),
      L('25 kg Anpressdruck, über 95 % Schmutzentfernung', '25 kg down pressure, over 95 % soil removal', '25 kg 对地压力，去污率 95% 以上'),
      L('Bis zu 1.920 m²/h Flächenleistung', 'Up to 1,920 m²/h area performance', '最高清洁效率 1,920 m²/h'),
      L('3 h Nassreinigung oder 8 h Trockenwischen, Laden in 1,5 h', '3 h wet scrubbing or 8 h dust mopping, charging in 1.5 h', '洗地续航 3 小时、尘推 8 小时，充电 1.5 小时'),
      L('Station: Laden, Wasser auffüllen und ablassen, Tank-Selbstreinigung in 4 min', 'Station: charging, water refill and drain, tank self-rinse in 4 min', '工作站：自动充电、加排水，4 分钟污水箱自洁'),
      L('Aufzugs- und Zutrittsanbindung, Lückenerkennung mit Nachreinigung, Reinigungsberichte', 'Lift and access-control integration, gap detection with re-cleaning, cleaning reports', '联动电梯与门禁，漏扫自动补扫，自动生成清洁报告')
    ],
    specs: [
      { group: L('Abmessungen & Gewicht', 'Dimensions & weight', '尺寸重量'), rows: [
        { k: L('L × B × H', 'L × W × H', '长 × 宽 × 高'), v: '820 × 680 × 1.130 mm' },
        { k: L('Gesamtgewicht', 'Gross weight', '整机重量'), v: '215 kg' },
        { k: L('Mindestdurchgang', 'Minimum passage', '最小通过宽度'), v: '800 mm' },
        { k: L('Wenderadius', 'Turning radius', '最小转弯半径'), v: '1.720 mm' }
      ]},
      { group: L('Reinigung', 'Cleaning', '清洁性能'), rows: [
        { k: L('Funktionen', 'Functions', '清洁功能'), v: L('Kehren, Scheuern, Trockenwischen', 'Sweeping, scrubbing, dust mopping', '扫地、洗地、尘推') },
        { k: L('Arbeitsbreite', 'Working width', '洗地宽度'), v: L('550 mm · mit Seitenbürsten 840 mm', '550 mm · with side brushes 840 mm', '550 mm · 含边刷 840 mm') },
        { k: L('Flächenleistung max.', 'Max. area performance', '最大清洁效率'), v: '1.920 m²/h' },
        { k: L('Anpressdruck', 'Down pressure', '对地压力'), v: '25 kg' },
        { k: L('Bürsten', 'Brushes', '刷盘'), v: L('2 Seitenbürsten, 2 Walzenbürsten (2 × 400 W)', '2 side brushes, 2 roller brushes (2 × 400 W)', '双边刷、双滚刷（2 × 400 W）') },
        { k: L('Saugleistung', 'Suction', '吸力'), v: '18,18 kPa' },
        { k: L('Tanks', 'Tanks', '水箱'), v: L('Frischwasser 45 L, Schmutzwasser 45 L', 'Fresh water 45 L, dirty water 45 L', '清水 45 L、污水 45 L') },
        { k: L('Saugleiste', 'Squeegee', '吸水趴'), v: '730 mm' }
      ]},
      { group: L('Energie', 'Power', '能源'), rows: [
        { k: L('Akku', 'Battery', '电池'), v: '24 V, 80 Ah' },
        { k: L('Laufzeit', 'Runtime', '续航'), v: L('Scheuern 3 h · Trockenwischen 8 h', 'Scrubbing 3 h · dust mopping 8 h', '洗地 3 小时 · 尘推 8 小时') },
        { k: L('Ladezeit', 'Charging time', '充电时间'), v: '1,5 h' }
      ]},
      { group: L('Fahren & Sensorik', 'Driving & sensors', '行驶与感知'), rows: [
        { k: L('Geschwindigkeit max.', 'Max. speed', '最高速度'), v: '1,0 m/s' },
        { k: L('Schwelle / Steigung', 'Threshold / slope', '越障 / 爬坡'), v: '15 mm · ≤ 2 %' },
        { k: L('Sensoren', 'Sensors', '传感器'), v: L('Lidar, Tiefenkamera, Fisheye-Kamera, IMU, Kantensensoren', 'Lidar, depth camera, fisheye camera, IMU, edge sensors', '激光雷达、深度相机、鱼眼相机、IMU、防跌落传感器') },
        { k: L('Geräusch', 'Noise', '噪音'), v: '≤ 70 dB(A)' }
      ]},
      { group: L('Station', 'Workstation', '工作站'), rows: [
        { k: L('Funktionen', 'Functions', '功能'), v: L('Laden, Frischwasser, Ablassen, Tank-Selbstreinigung (4 min)', 'Charging, fresh water, draining, tank self-rinse (4 min)', '自动充电、加水、排水、污水箱自洁（4 分钟）') },
        { k: L('Anschluss', 'Supply', '供电'), v: '200–240 V, max. 1.800 W' },
        { k: L('Ohne Wasseranschluss', 'Without plumbing', '无水路改造'), v: L('mobiler Wassertank optional', 'mobile water tank optional', '可选移动水箱') }
      ]},
      { group: L('Einsatzbedingungen', 'Operating conditions', '使用条件'), rows: [
        { k: L('Umgebung', 'Environment', '环境'), v: L('Innenbereich, 0–40 °C', 'Indoors, 0–40 °C', '室内，0–40 °C') },
        { k: L('Schutzart', 'Ingress protection', '防护等级'), v: 'IPX3' },
        { k: L('Böden', 'Floors', '适用地面'), v: L('Beton, Marmor, Epoxid, PVC, Hartstoffestrich', 'Concrete, marble, epoxy, PVC, hard-aggregate screed', '水泥、大理石、环氧、PVC、金刚砂地坪') },
        { k: L('Bedienung', 'Operation', '操控'), v: L('am Gerät, per App und über die Cloud', 'on the machine, via app and via cloud', '本机、手机端、云端三端控制') }
      ]}
    ],
    gallery: ['c5-main'], scenes: [], hero: 'm20s-dust',
    useCases: ['logistik', 'museum']
  });
})();

/* ---- v24: Ranglisten präzisiert (Frost & Sullivan, Umsatz 2025, laut Börsenprospekt) ---- */
(function () {
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  NIC.partner.ranks = [
    ['#1', L('Weltweit Nr. 1 beim Umsatz mit Industrie-Vierbeinern', 'World no. 1 by revenue in industrial quadrupeds', '全球四足机器人行业应用收入第一'),
           L('Umsatz 2025 mit Vierbeinern für Branchenkunden wie Energie, Brandschutz und Sicherheit — weltweit der höchste. Platz 2 und 3: Unitree und Boston Dynamics.', '2025 revenue from quadrupeds sold to industry customers in power, firefighting and security — the highest worldwide. Places 2 and 3: Unitree and Boston Dynamics.', '2025 年面向电力、消防、安防等行业客户的四足机器人销售收入，全球最高；第二、三名为宇树和波士顿动力。')],
    ['#2', L('Weltweit Nr. 2 beim Umsatz mit Vierbeinern insgesamt', 'World no. 2 by total quadruped revenue', '全球四足机器人总收入第二'),
           L('Gesamter Vierbeiner-Umsatz 2025 (Industrie, Forschung, Bildung und Verbraucher zusammen) — weltweit Platz zwei.', 'Total quadruped revenue in 2025 (industry, research, education and consumer combined) — ranked second worldwide.', '2025 年全部四足机器人收入（行业、科研、教育、消费合计），全球排名第二。')],
    ['#4', L('Weltweit Nr. 4 beim Umsatz mit Embodied-AI-Robotern', 'World no. 4 by embodied-AI robot revenue', '全球具身智能机器人收入第四'),
           L('Umsatz 2025 unter allen Herstellern verkörperter KI-Roboter — Humanoide, Vierbeiner, Rad-Bein-Roboter und mehr — weltweit Platz vier.', '2025 revenue among all embodied-AI robot makers — humanoid, quadruped, wheel-legged and more — ranked fourth worldwide.', '2025 年在人形、四足、轮足等全部具身智能机器人厂商中，收入排名全球第四。')]
  ];
})();

/* ---- v25: Reinigung — Bilder, C4 ---- */
(function () {
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  var c5 = NIC.products.find(function (p) { return p.id === 'c5'; });
  c5.badge = null;
  c5.gallery = ['c5-main', 'c5-set', 'c5-station', 'c5-room', 'c5-lift', 'c5-brush', 'c5-nav'];
  c5.scenes = ['c5-room', 'clean-mall', 'c5-lift', 'clean-supermarket', 'clean-airport', 'clean-factory'];
  c5.hero = 'c5-room';
  c5.tagline = L('Kehren, Scheuern, Wischen in einem Durchgang — für große Hallen und Märkte.', 'Sweeping, scrubbing, mopping in one pass — for large halls and stores.', '扫地、洗地、尘推一次完成——专为大卖场与大厅打造。');
  c5.highlights[3] = L('Bis zu 1.980 m²/h theoretische Flächenleistung', 'Up to 1,980 m²/h theoretical area performance', '理论清洁效率最高 1,980 m²/h');
  c5.specs[1].rows[2] = { k: L('Flächenleistung (theoretisch)', 'Area performance (theoretical)', '理论清洁效率'), v: L('bis 1.980 m²/h', 'up to 1,980 m²/h', '最高 1,980 m²/h') };
  c5.specs[1].rows.push({ k: L('Sprühmenge max.', 'Max. spray rate', '最大喷水量'), v: '800 ml/min' });
  c5.specs[1].rows.push({ k: L('Gebläse-Lebensdauer', 'Fan lifetime', '风机寿命'), v: '10.000 h' });

  NIC.products.push({
    id: 'c4', slug: 'reinigungsroboter-c4', sku: 'NIC-CL-C4', category: 'reinigung', brand: 'NIC Robotics', order: 2,
    name: 'C4', price: null, photo: true,
    family: L('Kompakter Reinigungsroboter für enge Wege', 'Compact cleaning robot for narrow routes', '窄通道商用清洁机器人'),
    badge: L('Neu', 'New', '新品'),
    tagline: L('Kommt durch 600 mm, wendet auf 80 cm — Kehren, Scheuern und Wischen zwischen Regalen und in Fluren.', 'Fits through 600 mm, turns in 80 cm — sweeping, scrubbing and mopping between shelves and in corridors.', '600 mm 就能通过，80 cm 即可掉头——货架间、走廊里扫洗推一机完成。'),
    summary: L(
      'Der C4 ist die schmale Variante für Wege, an denen große Maschinen scheitern: Gänge zwischen Regalen, Flure in Klinik und Büro, Verbindungsgänge im Einkaufszentrum. Vorne kehrt er, hinten scheuert er — Trocken- und Nassbereich sind getrennt, das Schmutzwasser wird vorgefiltert. Mehrlinien-Lidar und Kamera erkennen die Umgebung und aktualisieren die Karte von selbst, wenn Regale oder Möbel umgestellt werden. Aufzug und Türen bindet er an; der Akku lässt sich in Sekunden tauschen und getrennt laden.',
      'The C4 is the slim model for routes where large machines fail: aisles between shelves, corridors in clinics and offices, connecting walkways in shopping centres. It sweeps at the front and scrubs at the back — dry and wet zones are separated, dirty water is pre-filtered. Multi-line lidar and camera read the surroundings and update the map automatically when shelves or furniture move. It integrates lifts and doors; the battery swaps in seconds and charges separately.',
      'C4 是为大机器进不去的地方准备的窄身款：货架间通道、医院和写字楼走廊、商场连廊。前扫后洗、干湿分离，污水前置过滤。多线激光融合视觉感知环境，货架或家具挪动后地图自动更新。支持联动电梯和门禁；电池快拆，可分体充电。'),
    highlights: [
      L('Mindestdurchgang 600 mm, Wenden auf 80 cm', 'Minimum passage 600 mm, turns within 80 cm', '最小通过宽度 600 mm，80 cm 可掉头'),
      L('Kehren, Scheuern und Wischen — vorne kehren, hinten scheuern, trocken/nass getrennt', 'Sweeping, scrubbing and mopping — sweep front, scrub rear, dry/wet separated', '扫、洗、尘推三合一——前扫后洗、干湿分离'),
      L('Bis zu 1.400 m²/h theoretische Flächenleistung', 'Up to 1,400 m²/h theoretical area performance', '理论清洁效率最高 1,400 m²/h'),
      L('3 h Laufzeit, Laden in 1,5 h, Akku schnell tauschbar und getrennt ladbar', '3 h runtime, 1.5 h charging, quick-swap battery that charges separately', '续航 3 小时、充电 1.5 小时，电池快拆可分体充电'),
      L('Wassersparendes Scheuern, Schmutzwasser-Vorfilter gegen Verstopfung', 'Water-saving scrubbing, dirty-water pre-filter against clogging', '锁水洗地，污水前置过滤防堵塞'),
      L('Station: Laden, Wasser auffüllen und ablassen; Bürsten, Saugleiste und Tank reinigen sich selbst', 'Station: charging, water refill and drain; brushes, squeegee and tank self-clean', '工作站自动充电、加排水；滚刷、吸水扒、污水箱自清洁'),
      L('Lidar + Kamera, Karte aktualisiert sich selbst; Aufzug und Zutritt anbindbar', 'Lidar + camera, self-updating map; lift and access control integration', '多线激光融合视觉，地图自动更新；联动电梯与门禁')
    ],
    specs: [
      { group: L('Abmessungen', 'Dimensions', '尺寸'), rows: [
        { k: L('L × B × H', 'L × W × H', '长 × 宽 × 高'), v: '680 × 510 × 1.015 mm' },
        { k: L('Mindestdurchgang', 'Minimum passage', '最小通过宽度'), v: '600 mm' },
        { k: L('Wenderadius', 'Turning radius', '转弯半径'), v: '800 mm' }
      ]},
      { group: L('Reinigung', 'Cleaning', '清洁性能'), rows: [
        { k: L('Funktionen', 'Functions', '清洁功能'), v: L('Kehren, Scheuern, Trockenwischen', 'Sweeping, scrubbing, dust mopping', '扫地、洗地、尘推') },
        { k: L('Scheuerbreite', 'Scrubbing width', '洗地宽度'), v: '380 mm' },
        { k: L('Kehrbreite mit Seitenbürste', 'Sweeping width with side brush', '边刷清洁宽度'), v: '600 mm' },
        { k: L('Flächenleistung (theoretisch)', 'Area performance (theoretical)', '理论清洁效率'), v: L('bis 1.400 m²/h', 'up to 1,400 m²/h', '最高 1,400 m²/h') },
        { k: L('Schmutzaufnahme', 'Debris pick-up', '垃圾清扫率'), v: '95 %' },
        { k: L('Tanks', 'Tanks', '水箱'), v: L('Frischwasser 25 L, Schmutzwasser 25 L', 'Fresh water 25 L, dirty water 25 L', '清水 25 L、污水 25 L') },
        { k: L('Schmutzbehälter', 'Debris box', '垃圾盒'), v: '1,6 L' },
        { k: L('Saugleiste', 'Squeegee', '吸水扒'), v: '540 mm' }
      ]},
      { group: L('Energie', 'Power', '能源'), rows: [
        { k: L('Akku', 'Battery', '电池'), v: L('24 V, 60 Ah — schnell tauschbar', '24 V, 60 Ah — quick-swap', '24 V、60 Ah，快拆') },
        { k: L('Laufzeit', 'Runtime', '续航'), v: '3 h' },
        { k: L('Ladezeit', 'Charging time', '充电时间'), v: '1,5 h' }
      ]},
      { group: L('Navigation & Station', 'Navigation & station', '导航与工作站'), rows: [
        { k: L('Sensorik', 'Sensors', '感知'), v: L('Mehrlinien-Lidar mit Kamerafusion', 'Multi-line lidar fused with camera', '多线激光融合视觉') },
        { k: L('Karte', 'Map', '地图'), v: L('automatische Zonen, Routen und Aktualisierung', 'automatic zoning, routing and updates', '自动分区、路线规划、地图自动更新') },
        { k: L('Gebäude', 'Building', '楼宇联动'), v: L('Aufzug und Zutrittskontrolle', 'Lift and access control', '电梯、门禁联动') },
        { k: L('Station', 'Station', '工作站'), v: L('Laden, Wasser auffüllen/ablassen, Selbstreinigung von Bürsten, Saugleiste und Tank', 'Charging, water refill/drain, self-cleaning of brushes, squeegee and tank', '自动充电、加排水；滚刷、吸水扒、污水箱自清洁') },
        { k: L('Fehler-Selbstdiagnose', 'Fault self-diagnosis', '故障自诊断'), v: L('über 90 % der Fehler', 'over 90 % of faults', '90% 以上') }
      ]}
    ],
    gallery: ['c4-main', 'c4-studio', 'c4-dark', 'c4-side', 'c4-white', 'c4-flow'],
    scenes: ['c4-hero', 'clean-supermarket', 'clean-hospital', 'clean-office', 'clean-mall'],
    hero: 'c4-hero',
    useCases: ['logistik', 'museum']
  });
})();

/* v31 · Platzhalterpreise (5.000 €) entfernt — bis zur Freigabe echter
   Listenpreise gilt für alle Modelle „Preis auf Anfrage“. */
(function () {
  var N = (typeof window !== 'undefined' ? window : globalThis).NIC;
  if (!N || !N.products) return;
  N.products.forEach(function (p) { if (p.price === 5000) p.price = null; });
})();

/* v38 · Einsatzbereiche: kürzere Leitsätze; Bildung & Forschung ohne Lehrplan-Versprechen
   (wir liefern die offene Hardware-Plattform, keine Kurse). */
(function () {
  var N = (typeof window !== 'undefined' ? window : globalThis).NIC;
  if (!N || !N.useCases) return;
  var T = {
    energie:    ['Netzinspektion. Vollautonom.', 'Grid inspection. Fully autonomous.', '电力巡检，全程自主。'],
    industrie:  ['Gefahr? Der Roboter geht zuerst.', 'Hazard ahead? The robot goes first.', '危险环境，机器人先去。'],
    feuerwehr:  ['Erst der Roboter. Dann der Mensch.', 'Robots first. People safer.', '机器人先上，人更安全。'],
    sicherheit: ['Rund um die Uhr auf Streife.', 'On patrol around the clock.', '全天候巡逻，从不松懈。'],
    museum:     ['Tragen, filmen, führen.', 'Carry, film, guide.', '搬运、跟拍、导览，一机多用。'],
    forschung:  ['Offene Plattform für Lehre und Forschung.', 'An open platform for teaching and research.', '开放平台，助力教学与科研。'],
    logistik:   ['Die letzten hundert Meter.', 'The last hundred metres, delivered.', '最后一百米，机器人送达。'],
    pflege:     ['Mehr Gesellschaft im Alltag.', 'More company at home.', '家里多一份陪伴。']
  };
  N.useCases.forEach(function (u) {
    var x = T[u.id];
    if (x) u.tagline = { de: x[0], en: x[1], zh: x[2] };
    if (u.id === 'forschung') {
      var sol = { de: 'Offene Hardware-Plattform für Lehre, Versuche und Eigenentwicklung', en: 'Open hardware platform for teaching, experiments and custom development', zh: '开放硬件平台：支持教学演示、实验与二次开发' };
      var pain = { de: 'Lehre und Forschung brauchen eine zuverlässige, gut dokumentierte Plattform', en: 'Teaching and research need a reliable, well-documented platform', zh: '教学与科研需要可靠、文档齐全的平台' };
      if (u.points && u.points.length) u.points[0] = sol;
      if (u.solution && u.solution.length) u.solution[0] = sol;
      if (u.pains && u.pains.length > 1) u.pains[1] = pain;
    }
  });
})();

/* v42 · Forschung: Lite3-Angaben präzisiert (Nennwerte statt Werbeformeln),
   ROS-2-Umfang als „vom Hersteller zu bestätigen“ markiert; Plattform vs.
   Branchenkonfiguration; Entwicklungsfähigkeiten und Unterlagen je Modell. */
(function () {
  var N = (typeof window !== 'undefined' ? window : globalThis).NIC;
  if (!N || !N.products) return;
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  var TBC = L('vom Hersteller zu bestätigen', 'to be confirmed by the manufacturer', '待厂家确认');

  var lite = N.products.filter(function (p) { return p.id === 'lite3'; })[0];
  if (lite) {
    lite.highlights = (lite.highlights || []).map(function (h) {
      var d = (h && h.de) || '';
      if (/1 kHz/.test(d)) return L('Industrie-IMU und Echtzeit-Kernel; Low-Level-Regelung bis 1 kHz (über die Nutzer-Schnittstelle verfügbare Frequenz vom Hersteller zu bestätigen)', 'Industrial IMU and real-time kernel; low-level control up to 1 kHz (frequency available through the user interface to be confirmed by the manufacturer)', '工业级 IMU 与实时内核；底层控制频率最高 1 kHz（用户接口可用频率待厂家确认）');
      if (/7[,.]5 kg/.test(d) || /40/.test(d)) return L('Extremlast beim Gehen 7,5 kg laut Hersteller (Prüfbedingungen zu bestätigen); Nennlast je Version siehe Versionstabelle', 'Extreme walking load 7.5 kg per manufacturer (test conditions to be confirmed); rated payload per version in the version table', '极限行走负载 7.5 kg 为厂家标称值（测试条件待确认）；各版本额定负载见版本表');
      if (/18 cm/.test(d)) return L('Stufen bis 18 cm', 'Steps up to 18 cm', '可跨越 18 cm 台阶');
      if (/drei|3 ?×|3 ?倍|three/i.test(d + (h.zh || '') + (h.en || ''))) return L('Software-Updates per OTA', 'Software updates over the air (OTA)', '支持 OTA 在线升级');
      return h;
    });
    (lite.specs || []).forEach(function (g) {
      (g.rows || []).forEach(function (r) {
        if (r.k && r.k.de === 'Regelfrequenz') r.v = L('bis 1 kHz (Low-Level; Nutzer-Schnittstelle zu bestätigen)', 'up to 1 kHz (low level; user interface to be confirmed)', '最高 1 kHz（底层；用户接口待确认）');
      });
    });
    if (lite.variantTable) lite.variantTable.rows.forEach(function (r) {
      if (r.k && r.k.de === 'Nutzlast') r.k = L('Nennlast', 'Rated payload', '额定负载');
    });
  }

  /* Plattform oder fertige Branchenkonfiguration */
  var CONFIG = { 'patrol-m20': 'lynx-m20', 'fire-cannon': 'x30', 'fire-recon': 'lynx-m20' };
  N.products.forEach(function (p) {
    p.kind = CONFIG[p.id] ? 'config' : 'platform';
    if (CONFIG[p.id]) p.basedOn = CONFIG[p.id];
  });

  /* Entwicklungsfähigkeiten — nur was im Datenblatt steht; alles andere offen. */
  var DEV = {
    lite3: [
      [L('Bewegungs-SDK und API', 'Motion SDK and API', '运动控制 SDK 与 API'), L('laut Datenblatt enthalten, mit Beispielcode', 'included per datasheet, with sample code', '数据表列明，含示例代码'), 'ok'],
      [L('URDF- und Simulationsmodell', 'URDF and simulation model', 'URDF 与仿真模型'), L('laut Datenblatt verfügbar', 'available per datasheet', '数据表列明'), 'ok'],
      [L('Wahrnehmungs-Schnittstelle', 'Perception interface', '感知接口'), L('visuelle Lokalisierung, Umgebungsrekonstruktion', 'visual localisation, environment reconstruction', '视觉定位、环境重建'), 'ok'],
      [L('Low-Level-Regelfrequenz', 'Low-level control rate', '底层控制频率'), L('bis 1 kHz; über die Nutzer-Schnittstelle verfügbare Frequenz offen', 'up to 1 kHz; frequency available to users open', '最高 1 kHz；用户可用频率待确认'), 'part'],
      [L('ROS / ROS 2', 'ROS / ROS 2', 'ROS / ROS 2'), L('Version und Umfang der Unterstützung vom Hersteller zu bestätigen', 'version and scope of support to be confirmed by the manufacturer', '版本与支持范围待厂家确认'), 'tbc'],
      [L('Gelenkebene (Drehmoment / Position)', 'Joint level (torque / position)', '关节级控制（力矩 / 位置）'), TBC, 'tbc'],
      [L('Eigene Rechner und Sensoren', 'Own computers and sensors', '加装自有计算单元与传感器'), L('Ethernet, USB 3.0/HDMI und 24/12/5 V ab VENTURE bzw. PRO (siehe Versionstabelle)', 'Ethernet, USB 3.0/HDMI and 24/12/5 V from VENTURE or PRO (see version table)', '以太网、USB 3.0/HDMI 与 24/12/5 V 外部供电，VENTURE / PRO 起提供（见版本表）'), 'ok'],
      [L('Software-Updates', 'Software updates', '软件升级'), L('OTA laut Datenblatt', 'OTA per datasheet', '数据表列明支持 OTA'), 'ok']
    ]
  };
  var GENERIC = [
    [L('SDK / API', 'SDK / API', 'SDK / API'), TBC, 'tbc'],
    [L('ROS / ROS 2', 'ROS / ROS 2', 'ROS / ROS 2'), TBC, 'tbc'],
    [L('Nutzlast-Schnittstellen', 'Payload interfaces', '负载接口'), L('siehe technische Daten', 'see specifications', '见技术参数'), 'part'],
    [L('URDF / Simulation', 'URDF / simulation', 'URDF / 仿真模型'), TBC, 'tbc']
  ];
  DEV.x30 = [
    [L('SDK', 'SDK', 'SDK'), L('Bewegungs- und Wahrnehmungs-Schnittstellen, C++ / Python, Beispielcode (laut Datenblatt)', 'Motion and perception interfaces, C++ / Python, sample code (per datasheet)', '运动控制与感知接口，C++ / Python，含示例代码（数据表列明）'), 'ok'],
    [L('ROS / ROS 2', 'ROS / ROS 2', 'ROS / ROS 2'), L('im Datenblatt genannt; Version und Umfang offen', 'named in the datasheet; version and scope open', '数据表列明接口；版本与支持范围待确认'), 'part'],
    [L('Nutzlast-Schnittstellen', 'Payload interfaces', '负载接口'), L('für Wärmebild, Gassensorik, Ultraschall, Akustik (siehe technische Daten)', 'for thermal, gas, ultrasound, acoustics (see specifications)', '可接热成像、气体、超声、声学等负载（见技术参数）'), 'ok'],
    [L('URDF / Simulation', 'URDF / simulation', 'URDF / 仿真模型'), TBC, 'tbc'],
    [L('Gelenkebene (Drehmoment / Position)', 'Joint level (torque / position)', '关节级控制（力矩 / 位置）'), TBC, 'tbc']
  ];
  ['lynx-m20s', 'lynx-m20-pro', 'lynx-m20'].forEach(function (id) {
    var pr = N.products.filter(function (x) { return x.id === id; })[0];
    var io = null;
    (pr && pr.specs || []).forEach(function (g) { (g.rows || []).forEach(function (r) { if (r.k && r.k.zh === '数据接口') io = r.v; }); });
    DEV[id] = [
      [L('Datenschnittstellen', 'Data interfaces', '数据接口'), io || L('siehe technische Daten', 'see specifications', '见技术参数'), io ? 'ok' : 'part'],
      [L('SDK / API', 'SDK / API', 'SDK / API'), TBC, 'tbc'],
      [L('ROS / ROS 2', 'ROS / ROS 2', 'ROS / ROS 2'), TBC, 'tbc'],
      [L('URDF / Simulation', 'URDF / simulation', 'URDF / 仿真模型'), TBC, 'tbc']
    ];
  });
  N.products.forEach(function (p) {
    if (DEV[p.id]) p.dev = DEV[p.id];
    else if ((p.useCases || []).indexOf('forschung') >= 0 && p.category !== 'heim') p.dev = GENERIC;
    var docs = [
      [L('Produktdatenblatt', 'Product datasheet', '产品数据表'), 'PDF'],
      [L('Bedienungsanleitung', 'User manual', '用户手册'), 'PDF']
    ];
    if (p.id === 'lite3') docs.push(
      [L('SDK-Dokumentation und Beispielcode', 'SDK documentation and sample code', 'SDK 文档与示例代码'), 'SDK'],
      [L('URDF- und Simulationsmodell', 'URDF and simulation model', 'URDF 与仿真模型'), 'URDF']);
    else if (p.dev) docs.push([L('Schnittstellen-Dokumentation', 'Interface documentation', '接口文档'), 'DOC']);
    if (p.kind === 'config') docs.push([L('Konfigurationsübersicht', 'Configuration overview', '配置清单'), 'PDF']);
    p.docs = docs;
  });

  /* Einsatzbereich Forschung: keine Herstellerreihennamen, keine ungeklärten Werte */
  var u = (N.useCases || []).filter(function (x) { return x.id === 'forschung'; })[0];
  if (u) {
    var ed = L('Lite3 in vier Versionen — BASIC, VENTURE, PRO, LIDAR', 'Lite3 in four versions — BASIC, VENTURE, PRO, LIDAR', 'Lite3 四个版本：BASIC、VENTURE、PRO、LIDAR');
    var sdk = L('Offenes SDK; ROS-/ROS-2-Umfang vom Hersteller zu bestätigen', 'Open SDK; ROS / ROS 2 scope to be confirmed by the manufacturer', '开放 SDK；ROS / ROS 2 支持范围待厂家确认');
    var fix = function (arr) { return (arr || []).map(function (x) {
      var d = (x && x.de) || '';
      if (/Ausführungen|Versionen/.test(d)) return ed;
      if (/ROS/.test(d)) return sdk;
      return x; }); };
    u.points = fix(u.points); u.solution = fix(u.solution);
    u.proof = [L('Lite3: Nennlast 2,5–5 kg je Version, Reichweite bis 5 km, Stufen bis 18 cm', 'Lite3: rated payload 2.5–5 kg by version, range up to 5 km, steps up to 18 cm', 'Lite3：额定负载 2.5–5 kg（按版本），续航最远 5 km，可跨越 18 cm 台阶')];
    u.facts = [
      { v: '4', de: 'Versionen', en: 'Versions', zh: '配置版本' },
      { v: 'SDK', de: 'Offene Schnittstelle', en: 'Open interface', zh: '开放接口' },
      { v: 'URDF', de: 'Simulationsmodell', en: 'Simulation model', zh: '仿真模型' }
    ];
    u.body = L(
      'Für Lehrstühle und Forschungsgruppen zählt, was sich auf dem Roboter ersetzen lässt. Lite3 bringt laut Datenblatt Bewegungs-SDK, API, Wahrnehmungs-Schnittstelle, Beispielcode sowie URDF- und Simulationsmodell mit; ab VENTURE und PRO lassen sich eigene Rechner und Sensoren anschließen. Den Umfang der ROS-/ROS-2-Unterstützung bestätigen wir vor dem Angebot mit dem Hersteller. Wir liefern an europäische Hochschulen mit Angebot und Rechnung, die den Beschaffungsregeln entsprechen.',
      'For chairs and research groups what counts is what can be replaced on the robot. Per datasheet Lite3 ships a motion SDK, API, perception interface, sample code and a URDF and simulation model; from VENTURE and PRO you can attach your own computers and sensors. We confirm the scope of ROS / ROS 2 support with the manufacturer before quoting. We supply European universities with quotes and invoices that fit procurement rules.',
      '对院系与课题组来说，重要的是机器人上有多少东西可以被替换。根据数据表，Lite3 提供运动控制 SDK、API、感知接口、示例代码以及 URDF 与仿真模型；VENTURE 与 PRO 版本起可加装自有计算单元和传感器。ROS / ROS 2 的支持范围，我们会在报价前与厂家确认。我们可向欧洲高校供货，并提供符合采购流程要求的报价与发票。');
  }
})();

/* v43 · Neuer Schwerlast-Vierbeiner X50 / X50 Pro (Werte laut Datenblatt des Herstellers) */
(function () {
  var N = (typeof window !== 'undefined' ? window : globalThis).NIC;
  if (!N || !N.products) return;
  var L = function (de, en, zh) { return { de: de, en: en, zh: zh }; };
  var TBC = L('vom Hersteller zu bestätigen', 'to be confirmed by the manufacturer', '待厂家确认');
  if (N.products.some(function (p) { return p.id === 'x50'; })) return;
  N.products.push({
    id: 'x50', slug: 'x50', sku: 'NIC-QD-X50', category: 'vierbeiner', brand: 'NIC Robotics', order: 1.5,
    name: 'X50',
    family: L('Schwerlast-Vierbeiner', 'Heavy-Duty Quadruped', '重载四足机器人'),
    price: null,
    badge: L('Neu', 'New', '新品'),
    tagline: L('50 kg Nutzlast, IP67, 3 m/s Dauerlauf — mehr tragen, weiter kommen.', '50 kg payload, IP67, 3 m/s sustained — carry more, go further.', '50 kg 负载，IP67，3 m/s 持续奔跑——载得更多，走得更远。'),
    summary: L(
      'Der X50 ist der Lastenträger unter den Industrie-Vierbeinern: Bei gleicher Baugröße trägt er dauerhaft 50 kg — Löschtechnik, Messgeräte oder Ausrüstung — und läuft damit 2 km am Stück mit 3 m/s. Er setzt die Füße vorausschauend, steigt auch offene Gitter- und Hohltreppen unter Last und hält die Körperlage bei Stößen stabil. Vier Lidar-Sensoren und eine Weitwinkelkamera erkennen Hindernisse, bei niedrigem Akku fährt er selbst in die Ladestation. Die Pro-Version ergänzt SLAM-Kartierung, autonome Navigation und einen dritten Rechner.',
      'The X50 is the load carrier among industrial quadrupeds: in the same body size it carries 50 kg continuously — firefighting gear, instruments or equipment — and runs 2 km in one go at 3 m/s. It places its feet with foresight, climbs open grating and hollow stairs under load and keeps its body stable when pushed. Four lidar sensors and a wide-angle camera detect obstacles, and on low battery it returns to its dock by itself. The Pro version adds SLAM mapping, autonomous navigation and a third computer.',
      'X50 是工业四足机器人中的“扛重型”：同样的机身尺寸，可持续承载 50 kg——消防装备、检测仪器或其他设备——并以 3 m/s 连续奔跑 2 km。它能预判落脚点，负载状态下也能攀爬镂空楼梯，受到冲击时保持机身姿态稳定。4 颗激光雷达与 1 个广角相机感知障碍物，电量不足时自动返回充电桩。Pro 版另增 SLAM 建图、自主导航和第三台计算单元。'),
    highlights: [
      L('50 kg Dauerlast bei gleicher Baugröße; Standlast bis 200 kg (Extremwert, nicht für den Regelbetrieb)', '50 kg continuous payload in the same body size; standing load up to 200 kg (extreme value, not for routine use)', '同尺寸下持续负载 50 kg；站立极限负载 200 kg（极限值，非常规使用）'),
      L('Dauerlauf mit 3 m/s über 2 km — mit 50 kg Nutzlast', 'Sustained running at 3 m/s over 2 km — with 50 kg payload', '满载 50 kg 以 3 m/s 持续奔跑 2 km'),
      L('Laufzeit 2 h mit 50 kg, 3,5 h mit 20 kg', 'Runtime 2 h with 50 kg, 3.5 h with 20 kg', '续航：50 kg 负载 2 小时，20 kg 负载 3.5 小时'),
      L('IP67, Betrieb von −20 °C bis 55 °C', 'IP67, operation from −20 °C to 55 °C', 'IP67，工作温度 −20 °C 至 55 °C'),
      L('Stufen bis 25 cm, Steigungen bis 35°, offene Gittertreppen auch unter Last', 'Steps up to 25 cm, gradients up to 35°, open grating stairs even under load', '可连续跨越 25 cm 台阶、爬 35° 坡，负载也能上下镂空楼梯'),
      L('Vorausschauende Fußsetzung und aktive Lageregelung bei Störungen', 'Predictive foot placement and active attitude control under disturbance', '预判落脚点，受扰动时主动调整姿态保持稳定'),
      L('4 Lidar-Sensoren und Weitwinkelkamera für Hinderniserkennung und -vermeidung', '4 lidar sensors and wide-angle camera for obstacle detection and avoidance', '4 颗激光雷达 + 广角相机，多模态感知自主避障'),
      L('Selbstständiges Laden für Dauerstreifen; separater Not-Aus-Taster; Statusleuchten für Betrieb, Alarm und Laden', 'Self-docking charge for continuous patrols; separate emergency-stop button; status lights for running, alarm and charging', '自主回充支持连续巡检；独立物理急停按钮；运行、告警、充电状态灯')
    ],
    variantTable: {
      caption: L('X50 und X50 Pro im Vergleich', 'X50 and X50 Pro compared', 'X50 与 X50 Pro 对比'),
      cols: ['X50', 'X50 Pro'],
      rows: [
        { k: L('Maße (stehend)', 'Dimensions (standing)', '站立尺寸'), v: [L('ca. 990 × 455 × 685 mm', 'approx. 990 × 455 × 685 mm', '约 990 × 455 × 685 mm'), L('ca. 990 × 455 × 705 mm', 'approx. 990 × 455 × 705 mm', '约 990 × 455 × 705 mm')] },
        { k: L('Gewicht inkl. Akku', 'Weight incl. battery', '整机重量（含电池）'), v: [L('ca. 57,5 kg', 'approx. 57.5 kg', '约 57.5 kg'), L('ca. 60 kg', 'approx. 60 kg', '约 60 kg')] },
        { k: L('Rechner', 'Computing', '计算单元'), v: [L('2 × Octa-Core', '2 × octa-core', '2 × 八核'), L('3 × Octa-Core', '3 × octa-core', '3 × 八核')] },
        { k: L('SLAM-Kartierung und Navigation', 'SLAM mapping and navigation', 'SLAM 建图与导航'), v: [false, true] },
        { k: L('Autonome Navigation', 'Autonomous navigation', '自主导航'), v: [false, true] },
        { k: L('Autonomes Laden', 'Autonomous charging', '自主回充'), v: [true, true] },
        { k: L('Sekundärentwicklung', 'Secondary development', '二次开发'), v: [true, true] },
        { k: L('OTA-Updates', 'OTA updates', 'OTA 升级'), v: [true, true] },
        { k: L('Hardware-Schnittstellen', 'Hardware interfaces', '硬件接口'), v: [L('72-V-Akkuanschluss, Ethernet / WLAN', '72 V battery port, Ethernet / Wi-Fi', '72V 电池接口，以太网 / WiFi'), L('5 / 12 / 24 V, USB 2.0 / 3.0, Ethernet / WLAN', '5 / 12 / 24 V, USB 2.0 / 3.0, Ethernet / Wi-Fi', '5V / 12V / 24V，USB 2.0 / 3.0，以太网 / WiFi')] }
      ]
    },
    specs: [
      { group: L('Last und Laufzeit', 'Payload and runtime', '负载与续航'), rows: [
        { k: L('Nutzlast (dauerhaft)', 'Payload (continuous)', '持续负载'), v: '50 kg' },
        { k: L('Standlast (Extremwert)', 'Standing load (extreme value)', '站立极限负载'), v: L('200 kg — nicht für den Regelbetrieb', '200 kg — not for routine use', '200 kg（非常规使用）') },
        { k: L('Laufzeit', 'Runtime', '续航时间'), v: L('2 h mit 50 kg · 3,5 h mit 20 kg', '2 h with 50 kg · 3.5 h with 20 kg', '50 kg 负载 2 h · 20 kg 负载 3.5 h') }
      ]},
      { group: L('Bewegung', 'Motion', '运动性能'), rows: [
        { k: L('Arbeitsgeschwindigkeit (Gehen)', 'Working speed (walking)', '最大作业行走速度'), v: '1,5 m/s' },
        { k: L('Dauerlauf', 'Sustained running', '最大持续奔跑速度'), v: L('3 m/s über 2 km (mit 50 kg)', '3 m/s over 2 km (with 50 kg)', '3 m/s，持续 2 km（50 kg 负载）') },
        { k: L('Höchstgeschwindigkeit', 'Top speed', '最大速度'), v: L('4,5 m/s (Laborwert unter Prüfbedingungen; aus Sicherheitsgründen nicht freigegeben)', '4.5 m/s (lab value under test conditions; not released for safety reasons)', '4.5 m/s（特定条件下实验室测得，出于安全考虑未对外开放）') },
        { k: L('Stufenhöhe (fortlaufend)', 'Step height (continuous)', '最大连续台阶高度'), v: '25 cm' },
        { k: L('Steigung', 'Gradient', '爬坡能力'), v: L('35° (abhängig vom Untergrund)', '35° (depends on surface)', '35°（随地面材质变化）') }
      ]},
      { group: L('Umgebung', 'Environment', '环境适应'), rows: [
        { k: L('Schutzart', 'Ingress protection', '防护等级'), v: 'IP67' },
        { k: L('Umgebungstemperatur', 'Ambient temperature', '工作温度'), v: L('−20 °C … 55 °C (Leistung bei Extremtemperaturen ggf. reduziert)', '−20 °C … 55 °C (performance may drop at extreme temperatures)', '−20 °C 至 55 °C（极端温度下性能可能下降）') }
      ]},
      { group: L('Wahrnehmung und Sicherheit', 'Perception and safety', '感知与安全'), rows: [
        { k: L('Lidar', 'Lidar', '激光雷达'), v: '4' },
        { k: L('Weitwinkelkamera', 'Wide-angle camera', '广角相机'), v: '1' },
        { k: L('Hindernisvermeidung', 'Obstacle avoidance', '避障'), v: L('autonom, multimodale Wahrnehmung', 'autonomous, multimodal perception', '多模态感知自主避障') },
        { k: L('Not-Aus', 'Emergency stop', '急停'), v: L('separater physischer Taster, blockiert die Maschine', 'separate physical button, locks the machine', '独立物理急停按钮，一键锁止') },
        { k: L('Statusanzeige', 'Status display', '状态灯'), v: L('Farbleuchten für Betrieb, Alarm, Laden', 'Coloured lights for running, alarm, charging', '运行、告警、充电多色灯效') }
      ]}
    ],
    gallery: ['x50-main'],
    scenes: [],
    hero: 'hero-poster',
    useCases: ['energie', 'feuerwehr', 'sicherheit', 'forschung'],
    kind: 'platform',
    dev: [
      [L('Sekundärentwicklung', 'Secondary development', '二次开发'), L('laut Datenblatt unterstützt; Umfang von SDK / API vom Hersteller zu bestätigen', 'supported per datasheet; SDK / API scope to be confirmed by the manufacturer', '数据表列明支持；SDK / API 范围待厂家确认'), 'part'],
      [L('Hardware-Schnittstellen', 'Hardware interfaces', '硬件接口'), L('Pro: 5 / 12 / 24 V, USB 2.0 / 3.0, Ethernet / WLAN; Standard: 72-V-Akkuanschluss, Ethernet / WLAN', 'Pro: 5 / 12 / 24 V, USB 2.0 / 3.0, Ethernet / Wi-Fi; standard: 72 V battery port, Ethernet / Wi-Fi', 'Pro：5V/12V/24V、USB 2.0/3.0、以太网/WiFi；标准版：72V 电池接口、以太网/WiFi'), 'ok'],
      [L('SLAM und autonome Navigation', 'SLAM and autonomous navigation', 'SLAM 与自主导航'), L('nur X50 Pro (laut Datenblatt)', 'X50 Pro only (per datasheet)', '仅 X50 Pro（数据表列明）'), 'ok'],
      [L('ROS / ROS 2', 'ROS / ROS 2', 'ROS / ROS 2'), TBC, 'tbc'],
      [L('URDF / Simulation', 'URDF / simulation', 'URDF / 仿真模型'), TBC, 'tbc'],
      [L('Software-Updates', 'Software updates', '软件升级'), L('OTA laut Datenblatt', 'OTA per datasheet', '数据表列明支持 OTA'), 'ok']
    ],
    docs: [
      [L('Produktdatenblatt', 'Product datasheet', '产品数据表'), 'PDF'],
      [L('Bedienungsanleitung', 'User manual', '用户手册'), 'PDF'],
      [L('Schnittstellen-Dokumentation', 'Interface documentation', '接口文档'), 'DOC']
    ]
  });
  (N.useCases || []).forEach(function (u) {
    if (['energie', 'feuerwehr', 'sicherheit'].indexOf(u.id) >= 0 && u.products && u.products.indexOf('x50') < 0) u.products.push('x50');
  });
})();
