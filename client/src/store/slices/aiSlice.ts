import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AIMessage, AIInsight } from "@/types/ai";

interface AIState {
  messages: AIMessage[];
  insights: AIInsight[];
  isStreaming: boolean;
  error: string | null;
}

const initialState: AIState = {
  messages: [],
  insights: [],
  isStreaming: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<AIMessage>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<AIMessage[]>) {
      state.messages = action.payload;
    },
    setInsights(state, action: PayloadAction<AIInsight[]>) {
      state.insights = action.payload;
    },
    setStreaming(state, action: PayloadAction<boolean>) {
      state.isStreaming = action.payload;
    },
    setAIError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isStreaming = false;
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

export const {
  addMessage,
  setMessages,
  setInsights,
  setStreaming,
  setAIError,
  clearChat,
} = aiSlice.actions;
export default aiSlice.reducer;
