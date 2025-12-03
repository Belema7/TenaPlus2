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
  AlertCircle,
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = { 
      sender: "user", 
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConversation((prev) => [...prev, userMessage]);
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
        text: data.reply || "Sorry, I didn't understand that. Could you please rephrase?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversation((prev) => [...prev, aiReply]);

      // Try to parse JSON tasks from AI reply
      try {
        const parsedTasks = JSON.parse(data.reply);
        if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
          const newTasks = parsedTasks.map((t, idx) => ({
            ...t,
            id: Date.now() + idx,
          }));

          dispatch({
            type: Type.SET_TASKS,
            tasks: [...tasks, ...newTasks],
          });

          // Add success message
          setConversation(prev => [...prev, {
            sender: "ai",
            text: `✅ I've added ${newTasks.length} new task${newTasks.length > 1 ? 's' : ''} to your schedule!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSystem: true
          }]);
        }
      } catch (err) {
        // If AI reply is not JSON, ignore
        console.log("No task JSON detected in AI reply");
      }
    } catch (error) {
      setConversation((prev) => [
        ...prev, 
        { 
          sender: "ai", 
          text: "⚠️ Sorry, I'm having trouble connecting to the server. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        }
      ]);
      console.error(error);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setConversation([]);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const suggestedPrompts = [
    "What's the best time to take my medication?",
    "Can you create a medication schedule?",
    "Tell me about drug interactions",
    "Suggest healthy habits for my condition",
    "Explain side effects of my medication"
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto w-full p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Health AI Assistant
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ask questions about medications, get personalized advice, and manage your health
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Info & Suggestions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Assistant Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Messages</span>
                  <span className="font-bold text-gray-900">{conversation.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Created</span>
                  <span className="font-bold text-green-600">
                    {conversation.filter(m => m.isSystem).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">AI Health Level</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-2 h-6 bg-green-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Quick Prompts
              </h3>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(prompt)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition text-sm text-gray-700 hover:text-blue-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Be specific about medication names and dosages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Ask about food interactions and timing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Request to create structured schedules</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col flex-1">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="font-bold text-white">Health Assistant</h2>
                      <p className="text-blue-100 text-sm">Always here to help</p>
                    </div>
                  </div>
                  {conversation.length > 0 && (
                    <button
                      onClick={clearConversation}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Chat
                    </button>
                  )}
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-hidden p-4 bg-gradient-to-b from-white to-gray-50/50">
                <div className="h-full overflow-y-auto pr-2">
                  {conversation.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                        <Bot className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Start a Conversation
                      </h3>
                      <p className="text-gray-600 max-w-md mb-6">
                        I'm your AI health assistant. Ask me about medications, schedules, 
                        side effects, or request personalized health tasks.
                      </p>
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Ready to assist</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {conversation.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="max-w-[85%] sm:max-w-[80%]">
                            <div
                              className={`rounded-2xl p-4 relative group ${
                                msg.sender === "user"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none"
                                  : msg.isError
                                  ? "bg-gradient-to-r from-red-50 to-orange-50 border border-red-100"
                                  : msg.isSystem
                                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                                  : "bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100 rounded-bl-none"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  {msg.sender === "ai" && !msg.isSystem && !msg.isError && (
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <Bot className="h-3 w-3 text-white" />
                                      </div>
                                      <span className="text-xs font-medium text-gray-500">Assistant</span>
                                    </div>
                                  )}
                                  <div className="whitespace-pre-wrap break-words text-sm sm:text-base">
                                    {msg.text}
                                  </div>
                                  <div className="mt-2 text-xs opacity-70">
                                    {msg.timestamp}
                                  </div>
                                </div>
                                {msg.sender === "ai" && (
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                      onClick={() => copyToClipboard(msg.text, idx)}
                                      className="p-1.5 hover:bg-white/20 rounded"
                                      title="Copy"
                                    >
                                      {copiedIndex === idx ? (
                                        <Check className="h-3 w-3 text-green-600" />
                                      ) : (
                                        <Copy className="h-3 w-3 text-gray-500" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => speakMessage(msg.text)}
                                      className="p-1.5 hover:bg-white/20 rounded"
                                      title="Speak"
                                    >
                                      <Volume2 className="h-3 w-3 text-gray-500" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {loading && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] sm:max-w-[80%]">
                            <div className="rounded-2xl rounded-bl-none p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                                <span className="text-sm text-gray-600">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      className="w-full px-4 py-3.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none max-h-32"
                      rows={1}
                      placeholder="Type your health question here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <div className="absolute right-3 top-3 text-xs text-gray-400">
                      {message.length}/1000
                    </div>
                  </div>
                  <button
                    className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                      message.trim() && !loading
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        : "bg-gray-200 cursor-not-allowed"
                    }`}
                    onClick={sendMessage}
                    disabled={!message.trim() || loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 text-white animate-spin" />
                    ) : (
                      <Send className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex justify-between">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                  <span className="text-blue-600">AI-powered responses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistance;