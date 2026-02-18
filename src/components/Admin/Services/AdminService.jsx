import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import AddService from "./AddService"
import apiClient from "../../../services/api_client"
import authApiClient from "../../../services/auth_api_client"
import Loading from "../../Alert/Loading"
import ErrorAlert from "../../Alert/ErrorAlert"
import SuccessAlert from "../../Alert/SuccessAlert"
import { Helmet } from "react-helmet"

export default function AdminService() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get("/services/")
      setServices(res.data || [])
    } catch (err) {
      setErrorMsg(err.response?.data)
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openAddModal = () => {
    setEditingService(null)
    setShowModal(true)
  }

  const openEditModal = (service) => {
    setEditingService(service)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return

    try {
      await authApiClient.delete(`/services/${id}/`)
      setServices(prev => prev.filter(service => service.id !== id))
      setSuccMsg("Services Deleted Successfully!");
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
      <title>Admin Services</title>
    </Helmet>
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Services</h1>
          <p className="text-sm text-zinc-400">
            Create and manage gym services.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        {succMsg && <SuccessAlert message={succMsg} /> } 

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
          >
            <img
              src={`https://res.cloudinary.com/mdarafathossen/${service.image}`}
              alt=""
              className="h-40 w-full object-cover rounded-md"
            />

            <h3 className="mt-4 text-lg font-bold text-white">
              {service.name}
            </h3>

            <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
              {service.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  service.is_active
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {service.is_active ? "Active" : "Inactive"}
              </span>

              <div className="flex gap-2">
                <button onClick={() => openEditModal(service)}>
                  <Pencil className="h-4 w-4 text-zinc-400 hover:text-white" />
                </button>

                <button onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-lg my-10">
            <AddService
              editingService={editingService}
              setShowModal={setShowModal}
              refreshData={fetchServices}
            />
          </div>
        </div>
      )}
    </div>
    </>
  )
}
