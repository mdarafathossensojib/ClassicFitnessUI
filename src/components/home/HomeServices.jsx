import { useEffect, useState } from "react"
import { Link } from "react-router"
import apiClient from "../../services/api_client"
import ErrorAlert from "../Alert/ErrorAlert";

export default function HomeServices() {
  const [services, setServices] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get("/services/")
        setServices(response.data.slice(0, 4) || []) // শুধু top 4
      } catch (error) {
        setErrorMsg(error.response?.data);
        setServices([])
      }
    }

    fetchServices()
  }, [])

  if (services.length === 0) return null

  return (
    <section className="bg-zinc-950 py-12">
        {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Our Services</h2>
          <Link
            to="/services"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${idx * 0.1}s`, opacity: 0 }}
            >
              {/* Image */}
              <img
                src={`https://res.cloudinary.com/mdarafathossen/${service.image}`}
                alt={service.name}
                className="w-full h-64 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="text-sm text-zinc-300 mt-1 line-clamp-2">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FadeInUp Animation */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
