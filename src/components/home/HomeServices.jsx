import { useEffect, useState } from "react"
import { Link } from "react-router"
import apiClient from "../../services/api_client"
import ErrorAlert from "../Alert/ErrorAlert";
import { ArrowUpRight } from "lucide-react";

export default function HomeServices() {
  const [services, setServices] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get("/services/")
        setServices(response.data.slice(0, 4) || []) 
      } catch (error) {
        setErrorMsg("Unable to fetch services." + (error.response?.data?.message || error.message));
        setServices([])
      }
    }
    fetchServices()
  }, [])

  if (services.length === 0) return null

  return (
    <section className="bg-zinc-950 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-[0.3em]">
              <span className="w-12 h-0.5 bg-red-600"></span>
              Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none">
              PUSH YOUR <br /> <span className="text-red-600">LIMITS</span>
            </h2>
          </div>
          
          <Link
            to="/services"
            className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-xl"
          >
            All Services <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {errorMsg && <div className="mb-8"><ErrorAlert message={errorMsg} /></div>}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group relative h-112.5 overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-red-600/50"
            >
              {/* Background Image */}
              <img
                src={`https://res.cloudinary.com/mdarafathossen/${service.image}`}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top: Index Number */}
                <div className="text-4xl font-black text-white/10 group-hover:text-red-600/20 transition-colors duration-500">
                  0{idx + 1}
                </div>

                {/* Bottom: Info */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                    {service.name}
                  </h3>
                  <div className="h-0 overflow-hidden group-hover:h-20 transition-all duration-500 ease-in-out">
                    <p className="text-zinc-400 text-sm line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle Indicator */}
                  <div className="mt-4 w-10 h-1 bg-red-600 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}