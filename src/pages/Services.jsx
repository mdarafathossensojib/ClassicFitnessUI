import { useEffect, useState } from "react"
import apiClient from "../services/api_client"
import Loading from "../components/Alert/Loading";
import ErrorAlert from "../components/Alert/ErrorAlert";

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
        setErrorMsg(error.response?.data);
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-white text-lg">No services found.</p>
      </div>
    )
  }

  return (
    <section className="bg-zinc-950 py-12">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">All Gym Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={`https://res.cloudinary.com/mdarafathossen/${service.image}`}
                alt={service.name}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="text-sm text-zinc-300 mt-1 line-clamp-3">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
