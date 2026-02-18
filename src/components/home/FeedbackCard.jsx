import { useState } from "react"
import { Star, X } from "lucide-react"
import authApiClient from "../../services/auth_api_client"
import ErrorAlert from "../Alert/ErrorAlert"
import SuccessAlert from "../Alert/SuccessAlert"

export default function FeedbackCard({ feedback, currentUser, refreshFeedbacks }) {
  const memberName = feedback?.member_name || feedback?.member_email || "Anonymous"
  const memberPhoto =
    feedback?.member_photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}`

  // Member might just be an ID number from backend
  const isOwner = currentUser?.id === feedback?.member

  // State for edit modal
  const [isEditing, setIsEditing] = useState(false)
  const [newComment, setNewComment] = useState(feedback?.comment || "")
  const [newRating, setNewRating] = useState(feedback?.rating || 0)
  const [updating, setUpdating] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your feedback?")) return;
    setErrorMsg("");
    setSuccMsg("");
    setLoading(true);
    try {
      await authApiClient.delete(`/feedback/${feedback.id}/`)
      if (refreshFeedbacks) refreshFeedbacks();
      setSuccMsg("Comment Deleted Successfully!");
    } catch (err) {
      setErrorMsg(err.response?.data);
    }finally{
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    setErrorMsg("");
    setSuccMsg("");
    setLoading(true);
    try {
      setUpdating(true)
      await authApiClient.patch(`/feedback/${feedback.id}/`, {
        comment: newComment,
        rating: newRating
      })
      if (refreshFeedbacks) refreshFeedbacks()
      setIsEditing(false);
      setSuccMsg("Comment Updated!");
    } catch (err) {
      setErrorMsg(err.response?.data);
    } finally {
      setUpdating(false);
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-lg relative">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      {/* User Photo */}
      <div>
        <img
          src={memberPhoto}
          alt={memberName}
          className="w-12 h-12 rounded-full object-cover border border-zinc-700"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-bold text-white">{memberName}</h4>

          {/* Edit/Delete for owner */}
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-400 hover:text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-400 hover:text-red-500"
              >
                {loading ? "Deleting" : "Delete"}
              </button>
            </div>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-yellow-400 ${
                star <= (feedback?.rating || 0) ? "opacity-100" : "opacity-40"
              }`}
            >
              <Star className="w-5 h-5" />
            </span>
          ))}
        </div>

        <p className="text-sm text-zinc-300">{feedback?.comment || ""}</p>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Edit Feedback</h3>
              <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium uppercase text-zinc-400 mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`text-yellow-400 focus:outline-none ${
                      star <= newRating ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <Star className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium uppercase text-zinc-400 mb-1">Comment</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="flex-1 rounded-md bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Saving" : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-md border border-zinc-700 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
