import { baseApi } from "./baseApi";
import type { AIMessage, AIInsight, AdvisorRequest, AdvisorResponse } from "@/types/ai";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    askAdvisor: build.mutation<AdvisorResponse, AdvisorRequest>({
      query: (body) => ({ url: "/ai/advisor", method: "POST", body }),
    }),
    getInsights: build.query<AIInsight[], string>({
      query: (portfolioId) => `/ai/insights/${portfolioId}`,
      providesTags: ["AI"],
    }),
    getChatHistory: build.query<AIMessage[], string>({
      query: (sessionId) => `/ai/chat/${sessionId}`,
      providesTags: ["AI"],
    }),
    getSentiment: build.query<{ symbol: string; score: number; label: string }, string>({
      query: (symbol) => `/ai/sentiment/${symbol}`,
    }),
  }),
});

export const {
  useAskAdvisorMutation,
  useGetInsightsQuery,
  useGetChatHistoryQuery,
  useGetSentimentQuery,
} = aiApi;
