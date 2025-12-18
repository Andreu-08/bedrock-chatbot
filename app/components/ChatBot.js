'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  ChefHat, 
  User, 
  Sparkles, 
  UtensilsCrossed, 
  Trash2,
  Copy,
  Check,
  Cookie
} from 'lucide-react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response, timestamp: new Date() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Error: ${data.error}`, timestamp: new Date(), isError: true },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error al conectar con el servidor', timestamp: new Date(), isError: true },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('es', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const suggestions = [
    "¿Qué puedo cocinar hoy?",
    "Dame una receta fácil",
    "Sustitutos de ingredientes",
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-red-950">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-amber-950 animate-pulse"></span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Chef AI
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </h1>
              <p className="text-sm text-orange-300">Tu asistente culinario personal</p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 group"
              title="Limpiar chat"
            >
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* Messages Container */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/30 animate-float">
                <UtensilsCrossed className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido a mi cocina! 👨‍🍳</h2>
              <p className="text-orange-200 mb-8 max-w-md">
                Soy tu Chef AI personal. Pregúntame por recetas, técnicas de cocina, sustitutos de ingredientes y mucho más.
              </p>
              
              {/* Suggestions */}
              <div className="flex flex-wrap gap-3 justify-center">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 text-orange-200 hover:text-white transition-all duration-200 text-sm flex items-center gap-2 group"
                  >
                    <Cookie className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-slideIn`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg shadow-amber-500/25' 
                    : 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/25'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <ChefHat className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div className={`group relative max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-tr-sm'
                        : message.isError
                        ? 'bg-red-500/20 border border-red-500/30 text-red-200 rounded-tl-sm'
                        : 'bg-white/10 backdrop-blur-sm border border-orange-500/20 text-orange-50 rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Message footer */}
                  <div className={`flex items-center gap-2 mt-1 px-1 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                    {message.role === 'assistant' && !message.isError && (
                      <button
                        onClick={() => copyToClipboard(message.content, index)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all duration-200"
                        title="Copiar"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 animate-slideIn">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="relative z-10 px-4 py-4 border-t border-white/10 backdrop-blur-xl bg-white/5">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="¿Qué te gustaría cocinar hoy?"
                disabled={isLoading}
                className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-orange-300/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 disabled:opacity-50 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-orange-300/50 mt-3">
            🍳 Potenciado por <span className="text-orange-400">AWS Bedrock</span> • Pulsa Enter para enviar
          </p>
        </form>
      </div>
    </div>
  );
}
