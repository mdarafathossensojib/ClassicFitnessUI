import { useEffect, useState } from "react"
import { Star, Trash2, Pencil } from "lucide-react"
import authApiClient from "../../services/auth_api_client"
import useAuthContext from "../../hooks/useAuthContext"
import ErrorAlert from "../Alert/ErrorAlert"
import SuccessAlert from "../Alert/SuccessAlert"

export default function ProgramFeedback({ programId }) {
  const { user } = useAuthContext()

  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [succMsg, setSuccMsg] = useState("")
  const [editingId, setEditingId] = useState(null)

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true)
      const res = await authApiClient.get(
        `/classes/${programId}/class-feedback/`
      )
      setFeedbacks(res.data || [])
    } catch (err) {
      setErrorMsg(err.response?.data);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [programId])

  // Submit Feedback
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!rating || !comment) return alert("Rating & Comment required")
      setErrorMsg("");
      setSuccMsg("");
    try {
      if (editingId) {
        await authApiClient.patch(
          `/classes/${programId}/class-feedback/${editingId}/`,
          { rating, comment }
        );
        setSuccMsg("Class Feedback Updated!");
      } else {
        await authApiClient.post(
          `/classes/${programId}/class-feedback/`,
          { rating, comment }
        );
        setSuccMsg("Thanks for feedback!");
      }

      setRating(0)
      setComment("")
      setEditingId(null)
      fetchFeedbacks()
    } catch (err) {
      errorMsg(err.response?.data);
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete your feedback?")) return;
    setErrorMsg("");
    setSuccMsg("");
    try {
      await authApiClient.delete(
        `/classes/${programId}/class-feedback/${id}/`
      )
      fetchFeedbacks();
      setSuccMsg("Comment deleted Successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data);
    }
  }

  const handleEdit = (fb) => {
    setEditingId(fb.id)
    setRating(fb.rating)
    setComment(fb.comment)
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  return (
    <section className="mt-20 border-t border-zinc-800 pt-12">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      <h2 className="mb-8 text-2xl font-bold text-white">
        Program Feedback
      </h2>

      {/* ===== Feedback Form ===== */}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className="mb-4">
            <label className="text-sm text-zinc-400">Rating</label>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-yellow-400 ${
                    star <= rating ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <Star className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback..."
            className="mb-4 w-full rounded-md border border-zinc-700 bg-zinc-800 p-3 text-sm text-white focus:outline-none focus:border-red-600"
          />

          <button
            type="submit"
            className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            {editingId ? "Update Feedback" : "Submit Feedback"}
          </button>
        </form>
      )}

      {/* ===== Feedback List ===== */}
      {loading ? (
        <p className="text-zinc-400">Loading feedback...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-zinc-500">No feedback yet.</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.map((fb) => {
            const isOwner = user?.id === fb.member


            return (
              <div
                key={fb.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              >
                <h1 className="text-amber-50 text-sm pb-2">{user?.first_name} {user?.last_name}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 text-yellow-400 ${
                          star <= fb.rating
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>

                  {isOwner && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(fb)}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(fb.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-sm text-zinc-300">
                  {fb.comment}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
