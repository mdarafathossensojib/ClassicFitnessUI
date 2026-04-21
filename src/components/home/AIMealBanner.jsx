import { Utensils, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import ErrorAlert from "../Alert/ErrorAlert";

export default function AIMealBanner() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleAIClick = (e, to) => {
    if (!user) {
      e.preventDefault();
      setErrorMsg("Please login first to use AI Assistant!");
      
      setTimeout(() => setErrorMsg(""), 4000);
    } else {
      navigate(to);
    }
  };

  return (
    <section className="py-20 px-6 bg-black">
      <div className="container mx-auto">
        <div className="bg-linear-to-br from-zinc-900 to-black border border-zinc-800 p-10 md:p-20 rounded-[3rem] relative overflow-hidden group">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          {errorMsg && (
            <div className="fixed top-20 right-5 z-100">
              <ErrorAlert message={errorMsg} />
            </div>
          )}
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-6">
                <Sparkles size={16} /> AI Personalized Nutrition
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-tight mb-6">
                Eat <span className="text-red-600">Smarter</span> <br /> With AI Dietician
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Our AI will automatically create a diet chart based on your body type and goals. The right diet along with the gym will help you reach your goals faster.
              </p>
              <Link to="/ai-assistant" onClick={(e) => handleAIClick(e, "/ai-assistant")} className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-red-600/20">
                Get My Meal Plan
              </Link>
            </div>
            <div className="relative">
               <div className="bg-zinc-800 p-8 rounded-[2.5rem] border border-zinc-700 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Utensils size={100} className="text-red-600 opacity-20 absolute top-0 right-0 -translate-y-4 translate-x-4" />
                  <div className="space-y-4">
                    <div className="h-4 w-40 bg-zinc-700 rounded-full"></div>
                    <div className="h-4 w-32 bg-zinc-700 rounded-full opacity-50"></div>
                    <div className="h-4 w-48 bg-red-600/30 rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}