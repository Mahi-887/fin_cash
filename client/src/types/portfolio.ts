export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  totalValue?: number;
  totalCost?: number;
  gainLoss?: number;
  gainLossPercent?: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Holding {
  id: string;
  portfolioId: string;
  symbol: string;
  name: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  assetClass: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioRequest {
  name: string;
  description?: string;
}
