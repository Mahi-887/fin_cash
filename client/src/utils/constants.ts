export const API_URL = import.meta.env.VITE_API_URL ?? "/api/v1";
export const AI_URL = import.meta.env.VITE_AI_URL ?? "http://localhost:8000/api/v1";
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "FinVerse AI";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
] as const;

export const TRANSACTION_TYPES = ["credit", "debit"] as const;

export const ASSET_CLASSES = [
  "Equity",
  "Fixed Income",
  "Real Estate",
  "Commodities",
  "Cryptocurrency",
  "Cash",
] as const;

export const CHART_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
