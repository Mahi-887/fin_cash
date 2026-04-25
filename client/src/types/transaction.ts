export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  portfolioId?: string;
  userId: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  symbol?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  symbol?: string;
  portfolioId?: string;
  notes?: string;
}
