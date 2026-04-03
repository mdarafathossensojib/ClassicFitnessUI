import { useState } from "react";
import { Info, Calculator, RefreshCw } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (height && weight) {
      // Formula: BMI = weight (kg) / [height (m)]^2
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      // Logic for Category
      if (bmiValue < 18.5) {
        setCategory("Underweight");
        setMessage("Time to bulk up! You need a balanced surplus diet.");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setCategory("Healthy Weight");
        setMessage("Great job! You are in perfect shape. Keep it up.");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setCategory("Overweight");
        setMessage("Don't worry! A consistent workout can bring you back.");
      } else {
        setCategory("Obese");
        setMessage("Health Alert! It's time to start your fitness journey.");
      }
    }
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setMessage("");
    setCategory("");
  };

  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900 border border-zinc-800 rounded-4xl p-8 md:p-16 overflow-hidden relative">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] z-0"></div>

          {/* Left Side: Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-4">
              <span className="w-10 h-0.5 bg-red-600"></span>
              Health Check
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase mb-6 leading-tight">
              Calculate Your <span className="text-red-600">BMI</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed max-w-md">
              The Body Mass Index (BMI) is a simple way to check if your weight is healthy for your height. Knowing your BMI is the first step to a better lifestyle.
            </p>
            
            <div className="space-y-4">
               <div className="flex items-start gap-3 bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                  <Info className="text-red-600 shrink-0" size={20} />
                  <p className="text-sm text-zinc-500">BMI results are a general guide. For a detailed health assessment, consult our expert trainers.</p>
               </div>
            </div>
          </div>

          {/* Right Side: Calculator Form */}
          <div className="relative z-10 bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            {!bmi ? (
              <form onSubmit={calculateBMI} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-widest">Height (cm)</label>
                    <input
                      type="number"
                      placeholder="e.g. 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 tracking-widest">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-600 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                >
                  <Calculator size={20} /> Calculate Now
                </button>
              </form>
            ) : (
              <div className="text-center animate-in fade-in zoom-in duration-300">
                <div className="mb-6">
                  <p className="text-zinc-500 text-sm uppercase tracking-widest mb-1">Your BMI is</p>
                  <h3 className="text-6xl font-black text-white">{bmi}</h3>
                  <div className={`mt-2 inline-block px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    category === "Healthy Weight" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {category}
                  </div>
                </div>
                <p className="text-zinc-300 mb-8 italic">{message}</p>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 mx-auto text-zinc-500 hover:text-white transition-colors text-sm font-semibold"
                >
                  <RefreshCw size={16} /> Recalculate
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}