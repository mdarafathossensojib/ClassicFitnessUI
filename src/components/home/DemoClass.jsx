import { Clock, Flame } from "lucide-react";

export default function DemoClass() {
  const classes = [
    {
      id: "1",
      title: "Full Body HIIT Workout",
      duration: "20 Mins",
      level: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI",
      calories: "300 kcal",
    },
    {
      id: "2",
      title: "Core & Abs Strength",
      duration: "15 Mins",
      level: "Beginner",
      videoUrl: "https://www.youtube.com/embed/AnYl6Nk9GOA",
      calories: "150 kcal",
    },
  ];

  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-10 h-0.5 bg-red-600"></span>
              Virtual Training
            </div>
            <h2 className="text-4xl font-black text-white uppercase">
              Free <span className="text-red-600">Demo</span> Classes
            </h2>
        </div>
          <p className="text-zinc-500 max-w-sm text-sm">
            Can&apos;t make it to the gym? Try our most popular workout sessions from the comfort of your home.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {classes.map((item) => (
            <div 
              key={item.id} 
              className="group bg-zinc-900 rounded-4xl overflow-hidden border border-zinc-800 transition-all duration-500 hover:border-red-600/30"
            >
              {/* Video Player */}
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                  src={item.videoUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info */}
              <div className="p-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 bg-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-300 uppercase">
                    <Clock size={12} className="text-red-600" /> {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-300 uppercase">
                    <Flame size={12} className="text-red-600" /> {item.calories}
                  </span>
                  <span className="flex items-center gap-1.5 bg-red-600/10 px-3 py-1 rounded-full text-[10px] font-bold text-red-500 uppercase">
                    {item.level}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}