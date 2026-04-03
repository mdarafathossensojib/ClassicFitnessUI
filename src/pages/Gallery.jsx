import { useEffect, useState } from "react"
import apiClient from "../services/api_client"
import Loading from "../components/Alert/Loading"
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";
import { Image as ImageIcon, Maximize2 } from "lucide-react";

export default function Gallery() {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get("/gallery/")
        setGallery(response.data || [])
      } catch (error) {
        setErrorMsg("Could not load gallery images." + (error.response?.data?.message || ""));
        setGallery([])
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 min-h-screen pb-20">
      <Helmet>
        <title>Our Gallery | ProGym</title>
      </Helmet>

      {/* --- 1. Header Section --- */}
      <section className="pt-32 pb-16 px-6 bg-linear-to-b from-zinc-900 to-zinc-950">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
            <ImageIcon size={14} /> Visual Tour
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 italic">
            CAPTURE THE <span className="text-red-600">MOMENT</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Experience our high-end facilities and the hard work of our members through our visual gallery.
          </p>
        </div>
      </section>

      {/* --- 2. Gallery Grid --- */}
      <div className="container mx-auto px-6">
        {errorMsg && <div className="max-w-md mx-auto mb-8"><ErrorAlert message={errorMsg} /></div>}

        {gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-800 rounded-3xl">
            <ImageIcon size={48} className="text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-medium text-lg">Our gallery is getting ready!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-red-600/50"
              >
                {/* Image */}
                <img
                  src={`https://res.cloudinary.com/mdarafathossen/${item.image}`}
                  alt={item.title || "Gym Gallery"}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Overlay (Visible on Hover) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-red-600 w-10 h-1 mb-3 rounded-full"></div>
                    <h3 className="text-white font-bold text-lg leading-tight uppercase italic">
                      {item.title || "ProGym Action"}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1 font-medium tracking-wide">
                      Training Grounds
                    </p>
                  </div>
                  
                  {/* Icon on top right */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
                       <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- 3. Motivation Footer --- */}
      <div className="mt-24 text-center">
          <p className="text-zinc-500 font-bold text-7xl md:text-9xl select-none opacity-20 tracking-tighter">
            NO PAIN NO GAIN
          </p>
      </div>
    </div>
  )
}