export type SiteKey = 'home' | 'office' | 'retail';

export interface Load {
  name: string;
  kw: number;
  priority: 'Critical' | 'Flexible' | 'Non-critical';
  mode: string;
}

export interface Decision {
  text: string;
  conf: number;
  tag: string;
}

export interface Alert {
  level: 'good' | 'warn' | 'bad' | 'info';
  issue: string;
  cost: string;
  fix: string;
  conf: string;
}

export interface Tariff {
  w: string;
  r: string;
  s: string;
}

export interface SavingsBreakdown {
  opt: string;
  impact: string;
  notes: string;
}

export interface BillSim {
  p: string;
  base: string;
  ai: string;
  saved: string;
}

export interface Anomaly {
  status: 'good' | 'warn' | 'bad' | 'info';
  issue: string;
  impact: string;
  fix: string;
  conf: string;
}

export interface SiteData {
  name: string;
  tariff: string;
  currency: string;
  powerKw: number;
  peakTodayKw: number;
  peakLimitKw: number;
  todayCost: number;
  todaySaved: number;
  month: {
    savedMoney: number;
    savedPct: number;
    savedKwh: number;
    savedCo2Kg: number;
    peakReducedKw: number;
    peakReducedMoney: number;
  };
  loads: Load[];
  decisions: Decision[];
  alerts: Alert[];
  tariffs: Tariff[];
  savingsBreakdown: SavingsBreakdown[];
  billSim: BillSim[];
  anomalies: Anomaly[];
}

export const mockState: Record<SiteKey, SiteData> = {
  home: {
    name: "Home — Villa",
    tariff: "TOU (Peak/Off-Peak)",
    currency: "TND",
    powerKw: 4.8,
    peakTodayKw: 6.2,
    peakLimitKw: 7.0,
    todayCost: 6.9,
    todaySaved: 1.4,
    month: {
      savedMoney: 118,
      savedPct: 18,
      savedKwh: 210,
      savedCo2Kg: 95,
      peakReducedKw: 1.1,
      peakReducedMoney: 42,
    },
    loads: [
      { name: "HVAC", kw: 2.1, priority: "Flexible", mode: "AI Auto" },
      { name: "Water Heater", kw: 1.0, priority: "Flexible", mode: "Shifted (Off-Peak)" },
      { name: "EV Charger", kw: 0.8, priority: "Non-critical", mode: "Paused (Peak)" },
      { name: "Lighting", kw: 0.5, priority: "Critical", mode: "Steady" },
      { name: "Other", kw: 0.4, priority: "Flexible", mode: "Optimized" },
    ],
    decisions: [
      { text: "Delayed EV charging to avoid peak tariff window.", conf: 0.86, tag: "Peak Avoidance" },
      { text: "Pre-heated water during off-peak to reduce evening load.", conf: 0.79, tag: "Load Shifting" },
      { text: "Adjusted HVAC setpoint +1°C within comfort limits.", conf: 0.74, tag: "Comfort Bound" },
    ],
    alerts: [
      { level: "warn", issue: "Water heater cycling more than usual", cost: "~0.6 TND/day", fix: "Check thermostat / insulation", conf: "0.71" },
    ],
    tariffs: [
      { w: "Off-Peak (00:00–08:00)", r: "Low", s: "Shift flexible loads" },
      { w: "Mid (08:00–18:00)", r: "Medium", s: "Optimize HVAC & standby" },
      { w: "Peak (18:00–22:00)", r: "High", s: "Shed non-critical loads" },
      { w: "Mid (22:00–00:00)", r: "Medium", s: "Prepare next day" },
    ],
    savingsBreakdown: [
      { opt: "Load shifting (EV/heater)", impact: "48%", notes: "Moved to off-peak windows" },
      { opt: "HVAC optimization", impact: "34%", notes: "Setpoint & runtime tuning" },
      { opt: "Standby / lighting tuning", impact: "18%", notes: "Auto-dimming + idle cuts" },
    ],
    billSim: [
      { p: "This month", base: "655 TND", ai: "537 TND", saved: "118 TND" },
      { p: "Last 30 days", base: "702 TND", ai: "574 TND", saved: "128 TND" },
      { p: "Today", base: "8.3 TND", ai: "6.9 TND", saved: "1.4 TND" },
    ],
    anomalies: [
      { status: "warn", issue: "Water heater short cycling", impact: "~18 TND/month", fix: "Inspect thermostat/valve; improve insulation", conf: "71%" },
      { status: "info", issue: "EV charging during peak (prevented)", impact: "~9 TND/month avoided", fix: "Keep schedule; enable DR", conf: "84%" },
    ],
  },

  office: {
    name: "Office — 3 Floors",
    tariff: "Demand + TOU",
    currency: "TND",
    powerKw: 32.5,
    peakTodayKw: 44.0,
    peakLimitKw: 50.0,
    todayCost: 118,
    todaySaved: 19,
    month: {
      savedMoney: 1430,
      savedPct: 14,
      savedKwh: 3200,
      savedCo2Kg: 1450,
      peakReducedKw: 6.8,
      peakReducedMoney: 520,
    },
    loads: [
      { name: "HVAC (AHU/Chillers)", kw: 15.8, priority: "Flexible", mode: "AI Auto" },
      { name: "Elevators", kw: 2.2, priority: "Critical", mode: "Steady" },
      { name: "Server Room", kw: 3.5, priority: "Critical", mode: "Steady" },
      { name: "Lighting", kw: 5.1, priority: "Flexible", mode: "Occupancy-based" },
      { name: "Pumps/Fans", kw: 5.9, priority: "Flexible", mode: "Optimized" },
    ],
    decisions: [
      { text: "Pre-cooled floors before peak to reduce demand charges.", conf: 0.82, tag: "Demand Charges" },
      { text: "Reduced ventilation slightly in low-occupancy zones.", conf: 0.77, tag: "Occupancy" },
      { text: "Staggered pump startups to avoid spikes.", conf: 0.74, tag: "Smoothing" },
    ],
    alerts: [
      { level: "bad", issue: "AHU-2 consuming 22% above baseline", cost: "~180 TND/month", fix: "Filter clogged / sensor drift", conf: "0.83" },
      { level: "warn", issue: "Lighting on after hours (Floor 2)", cost: "~30 TND/month", fix: "Check schedule & occupancy sensors", conf: "0.76" },
    ],
    tariffs: [
      { w: "Off-Peak", r: "Low", s: "Pre-cool & charge batteries" },
      { w: "Mid", r: "Medium", s: "Optimize comfort & ventilation" },
      { w: "Peak", r: "High + Demand", s: "Cap peaks; shed non-critical" },
    ],
    savingsBreakdown: [
      { opt: "Demand peak capping", impact: "45%", notes: "Reduced demand charges" },
      { opt: "HVAC optimization", impact: "40%", notes: "Occupancy & setpoints" },
      { opt: "After-hours controls", impact: "15%", notes: "Lighting & standby" },
    ],
    billSim: [
      { p: "This month", base: "10,230 TND", ai: "8,800 TND", saved: "1,430 TND" },
      { p: "Last 30 days", base: "9,980 TND", ai: "8,610 TND", saved: "1,370 TND" },
      { p: "Today", base: "137 TND", ai: "118 TND", saved: "19 TND" },
    ],
    anomalies: [
      { status: "bad", issue: "AHU-2 overconsumption", impact: "~180 TND/month", fix: "Service filters; recalibrate sensors", conf: "83%" },
      { status: "warn", issue: "After-hours lighting usage", impact: "~30 TND/month", fix: "Adjust schedules; validate sensors", conf: "76%" },
      { status: "info", issue: "Peak spike prevented", impact: "~520 TND/month avoided", fix: "Keep peak cap enabled", conf: "88%" },
    ],
  },

  retail: {
    name: "Retail — 2 Stores",
    tariff: "TOU",
    currency: "TND",
    powerKw: 18.2,
    peakTodayKw: 26.1,
    peakLimitKw: 30.0,
    todayCost: 62,
    todaySaved: 9,
    month: {
      savedMoney: 640,
      savedPct: 16,
      savedKwh: 1500,
      savedCo2Kg: 690,
      peakReducedKw: 3.4,
      peakReducedMoney: 190,
    },
    loads: [
      { name: "Refrigeration", kw: 7.6, priority: "Critical", mode: "AI Auto (safe band)" },
      { name: "HVAC", kw: 5.2, priority: "Flexible", mode: "AI Auto" },
      { name: "Lighting", kw: 3.1, priority: "Flexible", mode: "Daylight dimming" },
      { name: "POS/IT", kw: 0.9, priority: "Critical", mode: "Steady" },
      { name: "Other", kw: 1.4, priority: "Flexible", mode: "Optimized" },
    ],
    decisions: [
      { text: "Adjusted refrigeration defrost timing to off-peak.", conf: 0.81, tag: "Scheduling" },
      { text: "Enabled daylight-based lighting dimming.", conf: 0.76, tag: "Lighting" },
      { text: "Softened HVAC ramp at opening time.", conf: 0.72, tag: "Smoothing" },
    ],
    alerts: [
      { level: "warn", issue: "Store #2 refrigeration runtime increasing", cost: "~55 TND/month", fix: "Check door seals / coils", conf: "0.79" },
    ],
    tariffs: [
      { w: "Off-Peak", r: "Low", s: "Schedule defrost & prep" },
      { w: "Peak", r: "High", s: "Cap peaks; dim lighting slightly" },
    ],
    savingsBreakdown: [
      { opt: "Refrigeration scheduling", impact: "52%", notes: "Defrost shifted off-peak" },
      { opt: "Lighting optimization", impact: "26%", notes: "Daylight dimming" },
      { opt: "HVAC optimization", impact: "22%", notes: "Opening ramp & setpoints" },
    ],
    billSim: [
      { p: "This month", base: "3,990 TND", ai: "3,350 TND", saved: "640 TND" },
      { p: "Last 30 days", base: "4,120 TND", ai: "3,470 TND", saved: "650 TND" },
      { p: "Today", base: "71 TND", ai: "62 TND", saved: "9 TND" },
    ],
    anomalies: [
      { status: "warn", issue: "Refrigeration runtime rising (Store #2)", impact: "~55 TND/month", fix: "Inspect seals/coils; check setpoint", conf: "79%" },
      { status: "info", issue: "Lighting savings stable", impact: "~120 TND/month saved", fix: "—", conf: "90%" },
    ],
  },
};

export const sectionTitles: Record<string, [string, string]> = {
  overview: ["Overview", "Real-time control, transparent savings, and AI explanations."],
  savings: ["Verified Savings", "Measurement & verification, breakdown, and bill simulator."],
  controls: ["Load Control", "Priorities, AI modes, and comfort/critical constraints."],
  peaks: ["Peak & Tariffs", "Demand cap, tariff windows, and demand-response readiness."],
  anomalies: ["Anomaly Detection", "Detect faults, abnormal consumption, and hidden waste."],
  portfolio: ["Multi-Building", "Portfolio view for property managers and chains."],
  reports: ["Reports", "Exports for CFO, ESG, and compliance workflows."],
  coach: ["AI Energy Coach", "Ask questions and get actionable recommendations."],
};

export const navItems = [
  { id: 'overview', label: 'Overview', badge: 'Live' },
  { id: 'savings', label: 'Verified Savings', badge: 'M&V' },
  { id: 'controls', label: 'Load Control', badge: 'AI' },
  { id: 'peaks', label: 'Peak & Tariffs', badge: 'TOU' },
  { id: 'anomalies', label: 'Anomaly Detection', badge: 'Alerts' },
  { id: 'portfolio', label: 'Multi-Building', badge: 'B2B' },
  { id: 'reports', label: 'Reports', badge: 'PDF' },
  { id: 'coach', label: 'AI Energy Coach', badge: 'Chat' },
];
