"use client";

import { useState, useEffect, useRef } from "react";
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
import { User, Send, MessageSquare } from "lucide-react";

interface ChatThread {
  id: string; // userEmail
  userId: string;
  userName: string;
  lastMessage: string;
  updatedAt: any;
  unreadByAdmin?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
}

export default function AdminChatsPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch all active chat threads in real-time
  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activeThreads: ChatThread[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ChatThread, "id">),
      }));
      setThreads(activeThreads);

      // Auto-select first thread if none is selected
      if (!selectedChat && activeThreads.length > 0) {
        setSelectedChat(activeThreads[0]);
      }
    });

    return () => unsubscribe();
  }, [selectedChat]);

  // 2. Fetch messages for selected thread
  useEffect(() => {
    if (!selectedChat) return;

    const messagesRef = collection(db, "chats", selectedChat.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));
      setMessages(fetchedMessages);
    });

    // Mark as read by admin
    setDoc(
      doc(db, "chats", selectedChat.id),
      { unreadByAdmin: false },
      { merge: true }
    );

    return () => unsubscribe();
  }, [selectedChat]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Send admin reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;

    const textToSend = replyText.trim();
    setReplyText("");

    try {
      // Add message to subcollection
      const messagesRef = collection(db, "chats", selectedChat.id, "messages");
      await addDoc(messagesRef, {
        senderId: "admin",
        text: textToSend,
        createdAt: serverTimestamp(),
      });

      // Update main thread metadata
      await setDoc(
        doc(db, "chats", selectedChat.id),
        {
          lastMessage: `Admin: ${textToSend}`,
          updatedAt: serverTimestamp(),
          unreadByUser: true,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error sending admin reply:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex shadow-2xl">
      {/* Left Sidebar - Chat Threads */}
      <div className="w-1/3 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            Customer Enquiries
          </h2>
          <p className="text-xs text-slate-400">Live chat support requests</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
          {threads.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No active conversations yet.
            </div>
          ) : (
            threads.map((thread) => {
              const isSelected = selectedChat?.id === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedChat(thread)}
                  className={`w-full p-4 text-left transition-colors flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-l-2 border-amber-500"
                      : "hover:bg-slate-900/50"
                  }`}
                >
                  <div className="p-2 bg-slate-800 rounded-full text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {thread.userName}
                      </h4>
                      {thread.unreadByAdmin && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {thread.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Area - Selected Conversation Thread */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-4 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {selectedChat.userName}
                </h3>
                <p className="text-xs text-slate-400">{selectedChat.userId}</p>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                const isAdmin = msg.senderId === "admin";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? "bg-amber-500 text-slate-950 font-medium rounded-br-none"
                          : "bg-slate-800 text-slate-100 border border-slate-700/50 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Input Form */}
            <form
              onSubmit={handleSendReply}
              className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
            >
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${selectedChat.userName}...`}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-xs cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
            Select a conversation from the sidebar to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}