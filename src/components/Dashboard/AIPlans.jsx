import { useEffect, useState } from "react";
import authApiClient from "../../services/auth_api_client";
import { FileText, Calendar, BrainCircuit } from "lucide-react";

export default function AIPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    authApiClient.get("/plans/").then(res => setPlans(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <BrainCircuit className="text-red-600" /> My AI Generated Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-red-600/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-red-600/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {plan.type}
              </span>
              <div className="flex items-center gap-1 text-zinc-500 text-xs">
                <Calendar size={12} /> {plan.date}
              </div>
            </div>
            <div className="text-zinc-300 text-sm line-clamp-3 mb-4 italic">
              {plan.response}
            </div>
            <button 
              onClick={() => alert(plan.response)}
              className="text-white text-xs font-bold flex items-center gap-2 hover:text-red-500 transition-colors"
            >
              <FileText size={14} /> View Full Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}