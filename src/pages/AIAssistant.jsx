import { useState } from "react";
import { Sparkles, Bot, User, ArrowLeft } from "lucide-react";
import authApiClient from "../services/auth_api_client";
import { Helmet } from "react-helmet";
import { Link } from "react-router";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI Fitness Coach. How can I help you today? Choose a goal below.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAIService = async (type, input) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: `Create a ${type} for me.` }]);
    
    try {
      const res = await authApiClient.post("/assistant/", { type, input });
      setMessages(prev => [...prev, { role: 'bot', content: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am facing some issues. Try again later.' }]);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
    <Helmet>
      <title>AI Assistant</title>
    </Helmet>
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-4xl border border-zinc-800 overflow-hidden flex flex-col h-[80vh]">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">AI Fitness Pro</h2>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold">
                  {msg.role === 'bot' ? <Bot size={12}/> : <User size={12}/>}
                  {msg.role}
                </div>
                <div className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && <div className="text-red-600 animate-pulse text-sm font-bold">AI is thinking...</div>}
        </div>

        {/* Quick Actions Footer */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-3 gap-3">
          <button 
            onClick={() => handleAIService('workout', {goal: 'Muscle Gain'})}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-xs font-bold text-zinc-300 transition-all"
          >
            Generate Workout Plan 🏋️
          </button>
          <button 
            onClick={() => handleAIService('meal', {goal: 'Fat Loss'})}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-xs font-bold text-zinc-300 transition-all"
          >
            Generate Meal Plan 🥗
          </button>
          <button 
            onClick={() => handleAIService('health', {bmi: '28.5'})}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-xs font-bold text-zinc-300 transition-all"
          >
            AI Health Analytics 📊
          </button>
        </div>
      </div>
    </div>
    </>
  );
}