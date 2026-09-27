"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, ShieldCheck, CheckCheck } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export function LiveChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Welcome to Motoplex Bangladesh! I am your VIP Concierge. How may I assist your ride today?",
      time: "Just now",
    },
  ]);

  const quickPrompts = [
    "Book an Aprilia RS 457 consultation",
    "Delivery times to Chittagong / Sylhet?",
    "Official warranty on Shoei helmets?",
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated responsive reply
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our Gulshan flagship showroom team has received your query and can assist you at +880 1700-MOTOPLEX.";
      const lower = text.toLowerCase();

      if (lower.includes("rs 457") || lower.includes("aprilia") || lower.includes("consultation")) {
        reply = "The Aprilia RS 457 is available for private showroom viewing at Motoplex Gulshan-2, Dhaka. We have limited units remaining in Prismatic Dark and Racing Stripes Red. Would you like our specialist to reserve a slot?";
      } else if (lower.includes("delivery") || lower.includes("chittagong") || lower.includes("sylhet")) {
        reply = "We offer 24-48 hours courier delivery inside Dhaka city, and 2-4 business days across all 64 districts in Bangladesh via Steadfast and Pathao Courier with parcel inspection!";
      } else if (lower.includes("shoei") || lower.includes("warranty") || lower.includes("helmet")) {
        reply = "All Shoei, AGV, and HJC helmets imported by Motoplex BD are 100% genuine ECE 22.06 certified with official 5-year manufacturer warranty and importer verification seals.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: reply,
          time: "Just now",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-zinc-900 hover:bg-zinc-800 text-white p-3.5 rounded-full shadow-2xl border border-zinc-700 flex items-center gap-2.5 group transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open Motoplex Concierge Chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-red-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900 animate-pulse" />
          </div>
          <span className="text-xs font-semibold pr-1.5 hidden md:inline-block">
            Motoplex Concierge
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-zinc-950 text-white p-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 font-black text-sm">
                MP
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm">Motoplex VIP Concierge</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="text-[11px] text-zinc-400">Official Bangladesh Showroom Live</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-white text-zinc-800 border border-zinc-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1 px-1">
                  {m.time} {m.sender === "user" && <CheckCheck className="w-3 h-3 text-zinc-400" />}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-zinc-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-full transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about bikes, helmets, delivery..."
              className="flex-1 bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
