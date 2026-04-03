import { useEffect, useState } from "react"
import apiClient from "../services/api_client"
import Loading from "../components/Alert/Loading";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";
import { Clock, Users, ShieldCheck } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get("/services/")
        setServices(response.data || [])
      } catch (error) {
        setErrorMsg("Failed to load services. Please try again." + (error.response?.data?.message || ""));
        setServices([])
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const features = [
    { icon: <Clock className="text-red-600" />, title: "24/7 Access", desc: "Train whenever you want, day or night." },
    { icon: <Users className="text-red-600" />, title: "Expert Trainers", desc: "Get guided by certified fitness professionals." },
    { icon: <ShieldCheck className="text-red-600" />, title: "Modern Safety", desc: "Clean and sanitized environment for your health." },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 min-h-screen">
      <Helmet>
        <title>Our Services | ProGym</title>
      </Helmet>

      {/* --- 1. Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent -z-10"></div>
        
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Elevate Your <span className="text-red-600">Fitness</span> Journey
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide world-class facilities and expert guidance to help you reach your maximum potential. Explore our specialized services below.
          </p>
        </div>
      </section>

      {/* --- 2. Features Row (Static Data) --- */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50">
              <div className="p-3 bg-zinc-800 rounded-lg">{f.icon}</div>
              <div>
                <h4 className="text-white font-bold">{f.title}</h4>
                <p className="text-zinc-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. Dynamic Services Section --- */}
      <section className="container mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-red-600"></span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Our Programs</h2>
          </div>
        </div>

        {errorMsg && <div className="mb-6"><ErrorAlert message={errorMsg} /></div>}

        {services.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
             <p className="text-zinc-500">No premium services found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-red-600/50 transition-all duration-500"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://res.cloudinary.com/mdarafathossen/${service.image}`}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-red-500 font-semibold text-sm cursor-pointer hover:gap-3 transition-all">
                    Learn More <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- 4. Call to Action (Static) --- */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-red-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-red-900/20">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 italic">READY TO START YOUR TRANSFORMATION?</h2>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase hover:bg-zinc-200 transition-colors shadow-lg">
              Join Now & Get 20% Off
            </button>
          </div>
          {/* Background Decorative Circles */}
          <div className="absolute -top-12.5 -right-12.5 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12.5 -left-12.5 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}