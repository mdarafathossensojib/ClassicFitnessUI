import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Star } from "lucide-react"
import AddTrainer from "./AddTrainer"
import apiClient from "../../../services/api_client"
import authApiClient from "../../../services/auth_api_client"
import Loading from "../../Alert/Loading"
import ErrorAlert from "../../Alert/ErrorAlert"
import SuccessAlert from "../../Alert/SuccessAlert"

export default function AdminTrainer() {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchTrainers = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get("/trainers/")
      setTrainers(res.data || [])
    } catch (err) {
      setErrorMsg(err.response?.data)
      setTrainers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrainers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trainer?")) return

    try {
      await authApiClient.delete(`/trainers/${id}/`)
      setTrainers(prev => prev.filter(t => t.id !== id));
      setSuccMsg("Trainer Removed Successfully!");
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
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Trainers</h1>
          <p className="text-sm text-zinc-400">
            Create and manage gym trainers.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        {succMsg && <SuccessAlert message={succMsg} /> } 

        <button
          onClick={() => {
            setEditingTrainer(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Add Trainer
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {trainers.map(trainer => (
          <div
            key={trainer.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
          >
            {trainer.image && (
              <img
                src={`https://res.cloudinary.com/mdarafathossen/${trainer.image}`}
                alt=""
                className="h-40 w-full object-cover rounded-md"
              />
            )}

            <h3 className="mt-4 text-lg font-bold text-white">
              {trainer.name}
            </h3>

            <p className="text-sm text-red-500">{trainer.role}</p>

            <p className="flex mt-2 text-sm text-zinc-400 items-center">
              <Star className="text-yellow-400 w-4 h-4 font-bold mr-1" /> {trainer.rating || "N/A"} | {trainer.experience || "N/A"}
            </p>

            <div className="mt-4 flex justify-between">
              <button onClick={() => {
                setEditingTrainer(trainer)
                setShowModal(true)
              }}>
                <Pencil className="h-4 w-4 text-zinc-400 hover:text-white" />
              </button>

              <button onClick={() => handleDelete(trainer.id)}>
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-lg my-10">
            <AddTrainer
              editingTrainer={editingTrainer}
              setShowModal={setShowModal}
              refreshData={fetchTrainers}
            />
          </div>
        </div>
      )}
    </div>
  )
}
