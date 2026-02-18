import { useEffect, useState } from "react"
import { Link } from "react-router"
import useAuthContext from "../../hooks/useAuthContext"
import apiClient from "../../services/api_client"
import FeedbackCard from "./FeedbackCard"

export default function HomeFeedback() {
  const [feedbacks, setFeedbacks] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await apiClient.get("/feedback/")
        setFeedbacks(response.data || [])
      } catch (error) {
        console.error("Error fetching feedbacks:", error)
        setFeedbacks([])
      }
    }

    fetchFeedbacks()
  }, [])

  if (feedbacks.length === 0) return null

  return (
    <section className="bg-zinc-950 py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">User Feedback</h2>
        <Link
          to="/feedback"
          className="text-red-600 hover:text-red-700 font-semibold"
        >
          View All
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {feedbacks.slice(0, 4).map((fb) => (
          <FeedbackCard
            key={fb.id}
            feedback={fb}
            currentUser={user}
            refreshFeedbacks={() => {
              // Refresh the slice for home view
              apiClient.get("/feedback/").then((res) => setFeedbacks(res.data || []))
            }}
          />
        ))}
      </div>
    </section>
  )
}
