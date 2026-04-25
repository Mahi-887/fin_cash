import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { addMessage, setStreaming, clearChat } from "@/store/slices/aiSlice";
import { useAskAdvisorMutation } from "@/store/api/aiApi";
import { Send, Trash2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AIMessage } from "@/types/ai";

export default function ChatInterface() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { messages, isStreaming } = useAppSelector((s) => s.ai);
  const [input, setInput] = useState("");
  const [askAdvisor] = useAskAdvisorMutation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage(userMsg));
    setInput("");
    dispatch(setStreaming(true));

    try {
      const response = await askAdvisor({ message: text }).unwrap();
      const assistantMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.reply,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(assistantMsg));
    } catch {
      const errMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(errMsg));
    } finally {
      dispatch(setStreaming(false));
    }
  }

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-600" />
          <span className="font-medium text-gray-900 dark:text-white text-sm">
            FinVerse AI Advisor
          </span>
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <button
          onClick={() => dispatch(clearChat())}
          className="rounded-lg p-1.5 text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-sm text-gray-400 space-y-2">
            <Bot className="h-10 w-10 opacity-30" />
            <p>{t("advisor.placeholder")}</p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-brand-100 dark:bg-brand-900/40"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4 text-brand-600" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isStreaming && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Bot className="h-4 w-4 text-gray-600" />
            </div>
            <div className="rounded-2xl bg-gray-100 dark:bg-gray-700 px-4 py-2.5">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 dark:border-gray-700 p-4">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("advisor.placeholder")}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="flex-shrink-0 rounded-xl bg-brand-600 p-2 text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
