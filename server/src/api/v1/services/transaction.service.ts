import { prisma } from "../../../config/database";

interface PaginationOptions {
  page: number;
  pageSize: number;
}

export async function getTransactions(userId: string, { page, pageSize }: PaginationOptions) {
  const skip = (page - 1) * pageSize;
  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.transaction.count({ where: { userId } }),
  ]);
  return { transactions, total, page, pageSize };
}

export async function getTransactionById(id: string, userId: string) {
  const tx = await prisma.transaction.findUnique({ where: { id } });
  if (!tx || tx.userId !== userId) {
    throw Object.assign(new Error("Transaction not found"), { statusCode: 404 });
  }
  return tx;
}

export async function createTransaction(
  userId: string,
  data: {
    date: string;
    description: string;
    amount: number;
    type: string;
    category: string;
    symbol?: string;
    portfolioId?: string;
    notes?: string;
  }
) {
  return prisma.transaction.create({ data: { ...data, userId } });
}

export async function updateTransaction(
  id: string,
  userId: string,
  data: Partial<{ description: string; amount: number; category: string; notes: string }>
) {
  await getTransactionById(id, userId);
  return prisma.transaction.update({ where: { id }, data });
}

export async function deleteTransaction(id: string, userId: string) {
  await getTransactionById(id, userId);
  await prisma.transaction.delete({ where: { id } });
}
