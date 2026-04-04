import { useEffect, useState } from "react";
import apiClient from "../../services/api_client";
import ErrorAlert from "../Alert/ErrorAlert";
import Loading from "../Alert/Loading";
import { Trophy, Quote, ExternalLink } from "lucide-react";

export default function StudentAchievement() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/achievements/");
        setAchievements(response.data || []);
      } catch (error) {
        setErrorMsg("Failed to load achievements." + (error.response?.data?.detail || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) return <div className="py-10 text-center"><Loading /></div>;
  if (!loading && achievements.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 text-[15rem] font-black text-white/5 select-none leading-none -translate-y-20 translate-x-20 italic">
        FAME
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-[0.3em]">
              <Trophy size={16} />
              Success Stories
            </div>
            <h2 className="text-4xl font-black text-white uppercase leading-none">
              Student <span className="text-red-600">Achievements</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs text-sm border-l-2 border-zinc-800 pl-4">
            Real transformations from our dedicated members who pushed their limits.
          </p>
        </div>

        {errorMsg && <div className="mb-8"><ErrorAlert message={errorMsg} /></div>}

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-red-600/30 hover:shadow-2xl hover:shadow-red-900/10"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-8 right-8 text-zinc-800 group-hover:text-red-600/20 transition-colors" size={40} />

              <div className="flex flex-col h-full">
                {/* Student Info Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={ item.image ? `https://res.cloudinary.com/mdarafathossen/${item.image}` : `https://ui-avatars.com/api/?name=${item.student_name}`}
                      alt={item.student_name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-800 group-hover:border-red-600 transition-colors"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-red-600 p-1.5 rounded-lg">
                       <Trophy size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.student_name}</h4>
                    <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{item.title}</p>
                  </div>
                </div>

                {/* Achievement Description */}
                <div className="flex-1">
                  <p className="text-zinc-400 text-sm leading-relaxed italic line-clamp-4">
                    {item.description}
                  </p>
                </div>

                {/* Footer Decor */}
                <div className="mt-6 pt-6 border-t border-zinc-800/50 flex justify-between items-center">
                   <span className="text-[10px] text-zinc-600 uppercase font-black tracking-tighter">Verified Result</span>
                   <ExternalLink size={16} className="text-zinc-700 group-hover:text-white transition-colors cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}