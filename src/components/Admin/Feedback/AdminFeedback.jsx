import { useEffect, useState } from "react"
import { Trash2, Edit, X, Star } from "lucide-react"
import apiClient from "../../../services/api_client"
import Loading from "../../Alert/Loading"
import EditFeedback from "./EditFeedback"
import ErrorAlert from "../../Alert/ErrorAlert"
import SuccessAlert from "../../Alert/SuccessAlert"

export default function AdminFeedback() {

  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFeedback, setEditingFeedback] = useState(null)
  const [feedbackType, setFeedbackType] = useState("gym") // gym | class
  const [selectedClassId, setSelectedClassId] = useState(null)
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      let response

      if (feedbackType === "gym") {
        response = await apiClient.get("/feedback/")
      } else {
        if (!selectedClassId) return
        response = await apiClient.get(`/classes/${selectedClassId}/class-feedback/`)
      }

      setFeedbacks(response.data || [])
    } catch (error) {
      setErrorMsg(error.response?.data);
      setFeedbacks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [feedbackType, selectedClassId])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return

    try {
      if (feedbackType === "gym") {
        await apiClient.delete(`/feedback/${id}/`);
        setSuccMsg("Gym Feedback deleted successfully!");
      } else {
        await apiClient.delete(`/classes/${selectedClassId}/class-feedback/${id}/`);
        setSuccMsg("Class Feedback Deleted Succesfully!");
      }
      fetchFeedbacks()
    } catch (error) {
      setErrorMsg(error.response?.data);
    }
  }

  const openEditModal = (feedback) => {
    setEditingFeedback(feedback)
    setShowModal(true)
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

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Manage Feedback
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            View, edit and delete feedbacks from members.
          </p>
        </div>
      </div>
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      {/* Type Toggle */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFeedbackType("gym")}
          className={`px-4 py-2 rounded-md text-sm ${
            feedbackType === "gym" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Gym Feedback
        </button>

        <button
          onClick={() => setFeedbackType("class")}
          className={`px-4 py-2 rounded-md text-sm ${
            feedbackType === "class" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Class Feedback
        </button>

        {feedbackType === "class" && (
          <input
            type="number"
            placeholder="Enter Class ID"
            className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-white"
            onChange={(e) => setSelectedClassId(e.target.value)}
          />
        )}
      </div>

      {/* Feedback Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">Created At</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="border-b border-zinc-800 last:border-0">
                  <td className="px-6 py-4 text-sm text-zinc-200">{fb.member_name || `ID ${fb.member}`}</td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{fb.member_email}</td>
                  <td className="px-6 py-4 text-sm text-yellow-400 font-bold flex justify-center items-center">{fb.rating} <Star className="w-4 h-4" /> </td>
                  <td className="px-6 py-4 text-sm text-zinc-200">{fb.comment}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">{new Date(fb.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(fb)}
                        className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(fb.id)}
                        className="rounded-md p-2 text-zinc-500 hover:bg-red-600/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {feedbacks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-zinc-500">
                    No feedback found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Edit Feedback</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            <EditFeedback
              feedback={editingFeedback}
              refreshData={fetchFeedbacks}
              setShowModal={setShowModal}
              feedbackType={feedbackType}
              classId={selectedClassId}
            />
          </div>
        </div>
      )}
    </div>
  )
}
