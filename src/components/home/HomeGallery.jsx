import { useEffect, useState } from "react"
import { Link } from "react-router"
import apiClient from "../../services/api_client"
import Loading from "../Alert/Loading";
import ErrorAlert from "../Alert/ErrorAlert";

export default function HomeGallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchGallery = async () => {
      try {
        const response = await apiClient.get("/gallery/")
        setGallery(response.data.slice(0, 4) || []) 
      } catch (error) {
        setErrorMsg(error.response?.data);
        setGallery([])
      } finally {
      setLoading(false);
      }
    }

    fetchGallery()
  }, [])

  if (gallery.length === 0) return null

  return (
    <section className="bg-zinc-950">
        {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Gallery</h2>
          <Link
            to="/gallery"
            className="text-red-600 hover:text-red-700 text-sm font-semibold"
          >
            View All
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 group"
            >
              {/* Image */}
              <img
                src={`https://res.cloudinary.com/mdarafathossen/${item.image}`}
                alt={item.name}
                className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                <h3 className="text-sm font-semibold text-white truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
