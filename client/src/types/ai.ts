export type AIMessageRole = "user" | "assistant" | "system";
export type AIInsightType = "positive" | "negative" | "warning" | "info";

export interface AIMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: string;
}

export interface AIInsight {
  id: string;
  portfolioId: string;
  title: string;
  description: string;
  type: AIInsightType;
  confidence: number;
  createdAt: string;
}

export interface AdvisorRequest {
  message: string;
  sessionId?: string;
  portfolioId?: string;
}

export interface AdvisorResponse {
  reply: string;
  sessionId: string;
  sources?: string[];
}
