import { useState, useEffect, useRef } from "react"; 
import { Sparkles, Bot, User, ArrowLeft, RefreshCw } from "lucide-react"; 
import authApiClient from "../services/auth_api_client";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am your AI Fitness Coach. How can I help you today? Choose a goal below.' }
  ]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("initial");
  const [userData, setUserData] = useState({ type: "", gender: "", goal: "" });
  const { user } = useAuthContext();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [userDataImg, setUserDataImg] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await authApiClient.get("/accounts/me");
        setUserDataImg(response.data || null);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleStepSelection = (field, value) => {
    const updatedData = { ...userData, [field]: value };
    setUserData(updatedData);

    setMessages(prev => [...prev, { role: 'user', content: value }]);

    if (field === "type") {
      setStep("gender");
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: "Great! What is your gender?" }]);
      }, 500);
    } else if (field === "gender") {
      setStep("goal");
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: "And what is your primary goal?" }]);
      }, 500);
    } else if (field === "goal") {
      setStep("processing");
      callAIService(updatedData);
    }
  };

  const callAIService = async (finalData) => {
    setLoading(true);
    try {
      const res = await authApiClient.post("/assistant/", { 
        type: finalData.type, 
        input: { gender: finalData.gender, goal: finalData.goal } 
      });
      setMessages(prev => [...prev, { role: 'bot', content: res.data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am facing some issues. Please reset and try again.' + (err.response?.data?.error || '') }]);
    }
    setLoading(false);
    setStep("done");
  };

  const resetChat = () => {
    setMessages([{ role: 'bot', content: 'Hello! Let\'s start again. Choose a goal below.' }]);
    setStep("initial");
    setUserData({ type: "", gender: "", goal: "" });
  };

  return (
    <>
    <Helmet><title>AI Assistant</title></Helmet>
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col h-[85vh]">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="flex-1 bg-zinc-900 rounded-4xl border border-zinc-800 overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/30">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight leading-none">AI Fitness Pro</h2>
                <span className="text-[10px] text-green-500 font-medium flex items-center gap-1 mt-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span> Online Now
                </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar Icons with Colors */}
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border overflow-hidden ${
                        msg.role === 'user' ? 'bg-zinc-800 border-zinc-700' : 'bg-red-600/10 border-red-600/20'
                    }`}>
                        {msg.role === 'bot' ? (
                            <Bot size={16} className="text-red-500" />
                        ) : (
                            user && userDataImg ? (
                                <img
                                    src={`https://res.cloudinary.com/mdarafathossen/${userDataImg?.profile_image}`}
                                    alt={user?.first_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={16} className="text-zinc-400" />
                            )
                        )}
                    </div>

                    <div className={`p-4 rounded-2xl ${
                    msg.role === 'user' 
                        ? 'bg-red-600 text-white rounded-tr-none shadow-lg shadow-red-600/10' 
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                    }`}>
                    <div className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</div>
                    </div>
                </div>
              </div>
            ))}
            
            {loading && (
                <div className="flex justify-start items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                        <Bot size={16} className="text-red-500 animate-bounce" />
                    </div>
                    <div className="text-red-600 animate-pulse text-xs font-bold tracking-widest uppercase">AI is Thinking...</div>
                </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Buttons Area */}
          <div className="p-6 bg-zinc-950 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-3 gap-3 transition-all duration-300">
            {step === "initial" && (
              <>
                <button onClick={() => handleStepSelection('type', 'Workout Plan')} className="action-btn">Workout Plan 🏋️</button>
                <button onClick={() => handleStepSelection('type', 'Meal Plan')} className="action-btn">Meal Plan 🥗</button>
              </>
            )}

            {step === "gender" && (
              <>
                <button onClick={() => handleStepSelection('gender', 'Male')} className="action-btn">Male ♂️</button>
                <button onClick={() => handleStepSelection('gender', 'Female')} className="action-btn">Female ♀️</button>
                <button onClick={() => handleStepSelection('gender', 'Other')} className="action-btn">Other ⚧️</button>
              </>
            )}

            {step === "goal" && (
              <>
                <button onClick={() => handleStepSelection('goal', 'Weight Loss')} className="action-btn">Weight Loss 🔥</button>
                <button onClick={() => handleStepSelection('goal', 'Muscle Gain')} className="action-btn">Muscle Gain 💪</button>
                <button onClick={() => handleStepSelection('goal', 'Stay Fit')} className="action-btn">Stay Fit ✨</button>
              </>
            )}

            {(step === "done" || step === "processing") && !loading && (
              <button onClick={resetChat} className="action-btn col-span-full border-red-600/30 text-red-500 flex items-center justify-center gap-2">
                <RefreshCw size={14} /> Start New Conversation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #27272a;
        border-radius: 10px;
      }
      .action-btn {
        background: #18181b;
        border: 1px solid #27272a;
        padding: 0.85rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 700;
        color: #d4d4d8;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .action-btn:hover {
        background: #27272a;
        border-color: #ef4444;
        color: #fff;
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .action-btn:active {
        transform: scale(0.98);
      }
    `}</style>
    </>
  );
}