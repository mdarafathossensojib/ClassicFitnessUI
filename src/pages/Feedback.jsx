import { useEffect, useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import apiClient from "../services/api_client"
import authApiClient from "../services/auth_api_client"
import FeedbackCard from "../components/home/FeedbackCard"
import ErrorAlert from "../components/Alert/ErrorAlert"
import SuccessAlert from "../components/Alert/SuccessAlert"
import { Helmet } from "react-helmet"

export default function Feedback() {
  const { user } = useAuthContext()
  const [feedbacks, setFeedbacks] = useState([])
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await apiClient.get("/feedback/")
      setFeedbacks(response.data || [])
    } catch (error) {
      setErrorMsg(error.response?.data);
      setFeedbacks([])
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert("Please login to submit feedback.");
    setErrorMsg("");
    setSuccMsg("");
    try {
      setLoading(true)
      await authApiClient.post("/feedback/", {
        comment: newComment,
        rating: newRating,
      })
      setNewComment("")
      setNewRating(5)
      fetchFeedbacks();
      setSuccMsg("Thanks for Comment");
    } catch (error) {
      setErrorMsg(error.response?.data);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Helmet>
      <title>Feedback</title>
    </Helmet>
    <div className="p-6 bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">All Feedbacks</h1>
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 

      {/* Add Feedback Form */}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg mb-6"
        >
          <div className="flex gap-4 items-center mb-3">
            <label className="text-white font-medium">Rating:</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white resize-none mb-3"
            placeholder="Write your feedback..."
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold"
          >
            {loading ? "Submiting" : "Submit"}
          </button>
        </form>
      )}

      {/* Feedback List */}
      <div className="grid gap-4">
        {feedbacks.map((fb) => (
          <FeedbackCard
            key={fb.id}
            feedback={fb}
            currentUser={user}
            refreshFeedbacks={fetchFeedbacks}
          />
        ))}
      </div>
    </div>
    </>
  )
}
