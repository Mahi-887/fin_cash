import { prisma } from "../../../config/database";

export async function getPortfoliosByUser(userId: string) {
  return prisma.portfolio.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPortfolioById(id: string, userId: string) {
  const portfolio = await prisma.portfolio.findUnique({ where: { id } });
  if (!portfolio || portfolio.userId !== userId) {
    throw Object.assign(new Error("Portfolio not found"), { statusCode: 404 });
  }
  return portfolio;
}

export async function createPortfolio(userId: string, data: { name: string; description?: string }) {
  return prisma.portfolio.create({ data: { ...data, userId } });
}

export async function updatePortfolio(
  id: string,
  userId: string,
  data: { name?: string; description?: string }
) {
  await getPortfolioById(id, userId);
  return prisma.portfolio.update({ where: { id }, data });
}

export async function deletePortfolio(id: string, userId: string) {
  await getPortfolioById(id, userId);
  await prisma.portfolio.delete({ where: { id } });
}

export async function getHoldings(portfolioId: string, userId: string) {
  await getPortfolioById(portfolioId, userId);
  return prisma.holding.findMany({ where: { portfolioId }, orderBy: { symbol: "asc" } });
}

export async function addHolding(
  portfolioId: string,
  userId: string,
  data: {
    symbol: string;
    name: string;
    quantity: number;
    averageCost: number;
    currentPrice: number;
    assetClass?: string;
  }
) {
  await getPortfolioById(portfolioId, userId);
  const currentValue = data.quantity * data.currentPrice;
  const gainLoss = currentValue - data.quantity * data.averageCost;
  const gainLossPercent = data.averageCost > 0 ? (gainLoss / (data.quantity * data.averageCost)) * 100 : 0;
  return prisma.holding.create({
    data: {
      ...data,
      portfolioId,
      currentValue,
      gainLoss,
      gainLossPercent,
      assetClass: data.assetClass ?? "Equity",
    },
  });
}
