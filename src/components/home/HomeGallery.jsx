import { useEffect, useState } from "react"
import { Link } from "react-router"
import apiClient from "../../services/api_client"
import Loading from "../Alert/Loading";
import ErrorAlert from "../Alert/ErrorAlert";
import { ArrowRight } from "lucide-react";

export default function HomeGallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/gallery/")
        setGallery(response.data.slice(0, 4) || []) 
      } catch (error) {
        setErrorMsg("Failed to load gallery items." + (error.response?.data?.message || ""));
        setGallery([])
      } finally {
        setLoading(false);
      }
    }
    fetchGallery()
  }, [])

  if (!loading && gallery.length === 0) return null

  return (
    <section className="bg-zinc-950 py-16 px-6 overflow-hidden">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-10 h-0.5 bg-red-600"></span>
              Visual Tour
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase">
              Gym <span className="text-red-600">Atmosphere</span>
            </h2>
          </div>
          
          <Link
            to="/gallery"
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold text-sm"
          >
            Explore Full Gallery
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-red-600" />
          </Link>
        </div>

        {errorMsg && <div className="mb-6"><ErrorAlert message={errorMsg} /></div>}

        {loading ? (
          <div className="h-60 flex items-center justify-center"><Loading /></div>
        ) : (
          /* Bento-inspired Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-125">
            {/* First Image (Large/Featured) */}
            {gallery[0] && (
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl border border-zinc-800">
                <img
                  src={`https://res.cloudinary.com/mdarafathossen/${gallery[0].image}`}
                  alt={gallery[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white font-bold text-lg italic uppercase">{gallery[0].title}</h3>
                </div>
              </div>
            )}

            {/* Second Image (Long) */}
            {gallery[1] && (
              <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-zinc-800 h-60 md:h-full">
                <img
                  src={`https://res.cloudinary.com/mdarafathossen/${gallery[1].image}`}
                  alt={gallery[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <h3 className="text-white font-bold italic uppercase">{gallery[1].title}</h3>
                </div>
              </div>
            )}

            {/* Third and Fourth Images (Small) */}
            {gallery.slice(2, 4).map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-2xl border border-zinc-800 h-60 md:h-full"
              >
                <img
                  src={`https://res.cloudinary.com/mdarafathossen/${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white font-bold text-sm italic uppercase">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}