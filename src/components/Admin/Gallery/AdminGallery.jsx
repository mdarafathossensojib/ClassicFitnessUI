import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import AddGallery from "./AddGallery"
import apiClient from "../../../services/api_client"
import authApiClient from "../../../services/auth_api_client"
import Loading from "../../Alert/Loading"
import ErrorAlert from "../../Alert/ErrorAlert"
import SuccessAlert from "../../Alert/SuccessAlert"
import { Helmet } from "react-helmet"

export default function AdminGallery() {
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [galleryData, setGalleryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get("/gallery/")
      setGalleryData(res.data || [])
    } catch (err) {
      setErrorMsg(err.response?.data);
      setGalleryData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const openAddModal = () => {
    setEditingItem(null)
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await authApiClient.delete(`/gallery/${id}/`)
      setGalleryData(prev => prev.filter(item => item.id !== id));
      setSuccMsg("Gallery deleted!");
    } catch (error) {
      setErrorMsg(error.response?.data);
    }
  }

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
      <title>Admin Gallery</title>
    </Helmet>
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Gallery</h1>
          <p className="text-sm text-zinc-400">
            Upload and manage gallery images.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        {succMsg && <SuccessAlert message={succMsg} /> } 

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Add Image
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {galleryData.map(item => (
          <div
            key={item.id}
            className="relative group rounded-lg overflow-hidden border border-zinc-800"
          >
            <img
              src={`https://res.cloudinary.com/mdarafathossen/${item.image}`}
              alt=""
              className="h-48 w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
              <button onClick={() => openEditModal(item)}>
                <Pencil className="h-5 w-5 text-white" />
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-lg my-10">
            <AddGallery
              editingItem={editingItem}
              setShowModal={setShowModal}
              refreshData={fetchGallery}
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}
