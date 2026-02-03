export interface Lawyer {
  id: number;
  name: string;
  office: string;
  specialty: string;
  location: string;
  lat: number;
  lng: number;
  rating: number;
  experience: number;
}

export interface RegionStat {
  region: string;
  count: number;
}

export interface SpecialtyStat {
  name: string;
  value: number;
  color: string;
}

export interface HeatmapCell {
  region: string;
  category: string;
  count: number;
}

export interface GraphNode {
  id: string;
  name: string;
  type: "constitution" | "law" | "decree" | "regulation";
  orbit: number;
  color: string;
  size: number;
  logo?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label?: string;
}

export interface PrecedentItem {
  id: number;
  caseNumber: string;
  caseName: string;
  court: string;
  date: string;
  docType: string;
  similarity: number;
  summary: string;
  content: string;
  aiAnswer: string;
}
