'use client';

import React, { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import { Type } from "../../../Utility/action.type";
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Sparkles, 
  Loader2,
  Copy,
  Check,
  Volume2,
  Brain,
  PlusCircle
} from "lucide-react";

const AiAssistance = () => {
  const [{ tasks }, dispatch] = useContext(DataContext);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = { sender: "user", text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setConversation(prev => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      const aiReply = {
        sender: "ai",
        text: data.reply || "I'm not sure how to help with that.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversation(prev => [...prev, aiReply]);

      // Auto-add tasks if AI returns JSON
      try {
        const tasksToAdd = JSON.parse(data.reply);
        if (Array.isArray(tasksToAdd)) {
          const newTasks = tasksToAdd.map((t, i) => ({ ...t, id: Date.now() + i }));
          dispatch({ type: Type.SET_TASKS, tasks: [...tasks, ...newTasks] });
          setConversation(prev => [...prev, {
            sender: "ai",
            text: `Added ${newTasks.length} task${newTasks.length > 1 ? 's' : ''} to your day!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            system: true
          }]);
        }
      } catch {}
    } catch (err) {
      setConversation(prev => [...prev, {
        sender: "ai",
        text: "Connection failed. Try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: true
      }]);
    }
    setLoading(false);
  };

  const copyText = async (text, i) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">

        {/* Header */}
        <div className="text-center mb-10">
          
          <h1 className="text-3xl sm:text-4xl font-bold">Health AI Assistant</h1>
          <p className="text-gray-500 mt-2">Ask anything. I’ll help with meds, schedules & health tips.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar */}
          <div className="space-y-5">
            {/* Quick Prompts */}
            <div className="bg-neutral-900/80 backdrop-blur border border-gray-800 rounded-2xl p-2xl p-5">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" /> Quick Questions
              </h3>
              <div className="space-y-2">
                {[
                  "Create my medication schedule",
                  "Best time to take pills?",
                  "Any food interactions?",
                  "Explain side effects",
                  "Suggest daily health habits"
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(q)}
                    className="w-full text-left p-3 bg-gray-900/50 hover:bg-gray-800 rounded-xl text-sm text-gray-300 hover:text-white transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-neutral-900/80 backdrop-blur border border-gray-800 rounded-2xl p-5">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Messages</span>
                  <span className="font-bold">{conversation.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasks Added</span>
                  <span className="text-green-400 font-bold">
                    {conversation.filter(m => m.system).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl flex flex-col h-[75vh] md:h-[80vh]">

              {/* Chat Header */}
              <div className="p-5 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <h2 className="font-bold">AI Assistant</h2>
                    <p className="text-xs text-gray-500">Online • Ready</p>
                  </div>
                </div>
                {conversation.length > 0 && (
                  <button onClick={() => setConversation([])} className="text-gray-500 hover:text-white">
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {conversation.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-6 bg-gray-900/50 rounded-3xl mb-6">
                      <Bot className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500">Start typing below</p>
                    </div>
                  </div>
                ) : (
                  conversation.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 ${
                        msg.sender === "user" 
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                          : msg.error
                          ? "bg-red-900/50 border border-red-800/50 text-red-300"
                          : msg.system
                          ? "bg-emerald-900/50 border border-emerald-800/50 text-emerald-300"
                          : "bg-gray-800/70 text-gray-200"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs opacity-60">{msg.time}</span>
                          {msg.sender === "ai" && !msg.system && !msg.error && (
                            <div className="flex gap-2">
                              <button onClick={() => copyText(msg.text, i)} className="hover:bg-white/10 p-1 rounded">
                                {copiedIndex === i ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                              </button>
                              <button onClick={() => speakMessage(msg.text)} className="hover:bg-white/10 p-1 rounded">
                                <Volume2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {loading && (
                  <div className="flex gap-3 text-gray-500">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex gap-1 items-end">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-5 border-t border-gray-800">
                <div className="flex gap-3">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    placeholder="Ask me anything about your health..."
                    className="flex-1 bg-gray-900/70 border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none max-h-32"
                    rows={1}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim() || loading}
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-600 text-center mt-3">Enter to send • Shift+Enter for new line</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistance;