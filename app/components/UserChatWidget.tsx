"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { MessageSquare, X, Send } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
}

export default function UserChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userEmail = session?.user?.email;
  const userName = session?.user?.name || "Guest";

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for real-time messages when chat is open and user is logged in
  useEffect(() => {
    if (!isOpen || !userEmail) return;

    const messagesRef = collection(db, "chats", userEmail, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [isOpen, userEmail]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !userEmail) return;

    const messageText = text.trim();
    setText("");

    try {
      // 1. Update/Create parent chat document for Admin overview
      const chatDocRef = doc(db, "chats", userEmail);
      await setDoc(
        chatDocRef,
        {
          userId: userEmail,
          userName: userName,
          lastMessage: messageText,
          updatedAt: serverTimestamp(),
          unreadByAdmin: true,
        },
        { merge: true }
      );

      // 2. Add message to user's subcollection
      const messagesRef = collection(db, "chats", userEmail, "messages");
      await addDoc(messagesRef, {
        senderId: userEmail,
        text: messageText,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!session) return null; // Only render for signed-in users

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs">Chat with Support</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">NICON Concierge</h3>
              <p className="text-[10px] text-slate-400">Direct link to Admin Support</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.length === 0 ? (
              <p className="text-center text-slate-500 my-auto">
                Send a message to start chatting with support!
              </p>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === userEmail;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-3.5 py-2 rounded-xl text-xs ${
                        isMe
                          ? "bg-amber-500 text-slate-950 font-medium rounded-br-none"
                          : "bg-slate-800 text-slate-100 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}