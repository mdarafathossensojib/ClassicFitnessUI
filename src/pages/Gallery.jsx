import { useEffect, useState } from "react"
import apiClient from "../services/api_client"
import Loading from "../components/Alert/Loading"
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";

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
        setErrorMsg(error.response?.data);
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
    <>
    <Helmet>
      <title>Gallery</title>
    </Helmet>
    <div className="p-8 bg-zinc-950 min-h-screen">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
    <h1 className="text-3xl font-bold text-white mb-6">Gallery</h1>
    {gallery.length === 0 ? (
        <p className="text-zinc-400">No gallery images found.</p>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
            <img
                src={`https://res.cloudinary.com/mdarafathossen/${item.image}`}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-3">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
    </>
  )
}
