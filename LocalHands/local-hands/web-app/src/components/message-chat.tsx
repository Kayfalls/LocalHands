"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  sender: string;
  senderRole: "worker" | "employer";
  text: string;
  timestamp: Date;
}

interface MessageChatProps {
  currentUserRole: "worker" | "employer";
}

export function MessageChat({ currentUserRole }: MessageChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Sipho K.",
      senderRole: "worker",
      text: "Hi! I'm interested in the electrical assistant position.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      sender: "BuildCo Ltd",
      senderRole: "employer",
      text: "Great! Can you tell me about your experience?",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "3",
      sender: "Sipho K.",
      senderRole: "worker",
      text: "I have 5 years of experience in electrical maintenance and safety protocols.",
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUserRole === "worker" ? "You (Worker)" : "You (Employer)",
      senderRole: currentUserRole,
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-neutral-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderRole === currentUserRole ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderRole === currentUserRole
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm font-medium">{msg.sender}</p>
                <p className="text-sm mt-1">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.senderRole === currentUserRole ? "text-red-100" : "text-gray-500"}`}>
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEnd} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
