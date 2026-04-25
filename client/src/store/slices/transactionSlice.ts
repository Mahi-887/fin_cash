import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "@/types/transaction";

interface TransactionState {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  total: 0,
  page: 1,
  pageSize: 20,
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions(
      state,
      action: PayloadAction<{ transactions: Transaction[]; total: number }>
    ) {
      state.transactions = action.payload.transactions;
      state.total = action.payload.total;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTransactionLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setTransactionError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setTransactions,
  setPage,
  setTransactionLoading,
  setTransactionError,
} = transactionSlice.actions;
export default transactionSlice.reducer;
