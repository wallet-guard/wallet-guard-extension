export interface PhishingResponse {
  domainName: string;
  phishing: PhishingResult;
  warnings: Warning[] | null;
  verified: boolean;
}


export interface Warning {
  level: WarningLevel;
  type: WarningType;
  value: string;
}

export enum WarningType {
  Similarity = "SIMILARITY",
  RecentlyCreated = "RECENTLY_CREATED",
  Malware = "MALWARE",
  Homoglyph = "HOMOGLYPH",
  Blocklisted = "BLOCKLISTED",
  MLInference = "ML_INFERENCE",
  Drainer = "DRAINER"
}

export enum WarningLevel {
  Info = "INFO",
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Critical = "CRITICAL"
}

export enum PhishingResult {
  Phishing = "PHISHING",
  NotPhishing = "NOT_PHISHING",
  Unknown = "UNKNOWN"
}
