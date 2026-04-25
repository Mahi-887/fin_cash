import { baseApi } from "./baseApi";
import type { Portfolio, Holding, CreatePortfolioRequest } from "@/types/portfolio";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPortfolios: build.query<Portfolio[], void>({
      query: () => "/portfolios",
      providesTags: ["Portfolio"],
    }),
    getPortfolio: build.query<Portfolio, string>({
      query: (id) => `/portfolios/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Portfolio", id }],
    }),
    createPortfolio: build.mutation<Portfolio, CreatePortfolioRequest>({
      query: (body) => ({ url: "/portfolios", method: "POST", body }),
      invalidatesTags: ["Portfolio"],
    }),
    deletePortfolio: build.mutation<void, string>({
      query: (id) => ({ url: `/portfolios/${id}`, method: "DELETE" }),
      invalidatesTags: ["Portfolio"],
    }),
    getHoldings: build.query<Holding[], string>({
      query: (portfolioId) => `/portfolios/${portfolioId}/holdings`,
      providesTags: ["Portfolio"],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioQuery,
  useCreatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetHoldingsQuery,
} = portfolioApi;
