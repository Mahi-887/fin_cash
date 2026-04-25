import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Portfolio, Holding } from "@/types/portfolio";

interface PortfolioState {
  portfolios: Portfolio[];
  selected: Portfolio | null;
  holdings: Holding[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  portfolios: [],
  selected: null,
  holdings: [],
  isLoading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolios(state, action: PayloadAction<Portfolio[]>) {
      state.portfolios = action.payload;
    },
    selectPortfolio(state, action: PayloadAction<Portfolio>) {
      state.selected = action.payload;
    },
    setHoldings(state, action: PayloadAction<Holding[]>) {
      state.holdings = action.payload;
    },
    setPortfolioLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPortfolioError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setPortfolios,
  selectPortfolio,
  setHoldings,
  setPortfolioLoading,
  setPortfolioError,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
