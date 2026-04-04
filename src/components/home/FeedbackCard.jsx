import { useState } from "react"
import { MoreVertical, Star, X, Edit2, Trash2, Quote } from "lucide-react"
import authApiClient from "../../services/auth_api_client"
import ErrorAlert from "../Alert/ErrorAlert"
import SuccessAlert from "../Alert/SuccessAlert"

export default function FeedbackCard({ feedback, currentUser, refreshFeedbacks }) {
  console.log(feedback);
  const memberName = feedback?.member_name || feedback?.member_email || "Anonymous";
  const memberPhoto = feedback?.member_photo
    ? feedback?.member_photo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=random`

  const isOwner = currentUser?.id === feedback?.member

  const [isEditing, setIsEditing] = useState(false)
  const [newComment, setNewComment] = useState(feedback?.comment || "")
  const [newRating, setNewRating] = useState(feedback?.rating || 0)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [succMsg, setSuccMsg] = useState("")
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your feedback?")) return
    setLoading(true)
    try {
      await authApiClient.delete(`/feedback/${feedback.id}/`)
      setSuccMsg("Comment Deleted!")
      setTimeout(() => refreshFeedbacks?.(), 1000)
    } catch (err) {
      setErrorMsg("Failed to delete feedback" + (err.response?.data?.message ? `: ${err.response.data.message}` : ""))
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await authApiClient.patch(`/feedback/${feedback.id}/`, {
        comment: newComment,
        rating: newRating,
      })
      refreshFeedbacks?.()
      setIsEditing(false)
      setSuccMsg("Updated successfully!")
    } catch (err) {
      setErrorMsg("Update failed" + (err.response?.data?.message ? `: ${err.response.data.message}` : ""))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="group relative flex flex-col justify-between bg-zinc-900 border border-zinc-800 p-6 rounded-3xl transition-all duration-500 hover:border-red-600/30 hover:shadow-[0_10px_30px_-15px_rgba(220,38,38,0.1)]">
      {/* Alerts */}
      <div className="absolute top-2 left-0 right-0 z-10 px-4">
        {errorMsg && <ErrorAlert message={errorMsg} />}
        {succMsg && <SuccessAlert message={succMsg} />}
      </div>

      {/* Top Part: Rating & Options */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star <= (feedback?.rating || 0) 
                ? "fill-yellow-500 text-yellow-500" 
                : "text-zinc-800 fill-zinc-800/50"
              }`}
            />
          ))}
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="p-1 rounded-full text-zinc-600 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <MoreVertical size={20} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-zinc-800 border border-zinc-700 rounded-xl shadow-2xl py-1 z-50">
                <button
                  onClick={() => { setOpen(false); setIsEditing(true); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-blue-400"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => { setOpen(false); handleDelete(); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-red-400"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Middle Part: Comment */}
      <div className="relative mb-6">
        <Quote className="absolute -top-2 -left-2 text-zinc-800 w-8 h-8 z-0 opacity-50" />
        <p className="relative z-10 text-zinc-300 text-sm leading-relaxed italic">
          "{feedback?.comment}"
        </p>
      </div>

      {/* Bottom Part: User Profile */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/50">
        <img
          src={memberPhoto}
          alt={memberName}
          className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-zinc-700"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white leading-none">{memberName}</span>
          <span className="text-[10px] text-zinc-400  tracking-widest mt-1 font-semibold">Email: {feedback?.member_email}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-semibold">Verified Member</span>
        </div>
      </div>

      {/* Edit Modal (Logic same, styling consistent) */}
      {isEditing && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Edit Feedback</h3>
              <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-3 tracking-widest">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setNewRating(star)}>
                      <Star size={32} className={`${star <= newRating ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-3 tracking-widest">Your Message</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full rounded-xl bg-red-600 py-4 text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 uppercase tracking-widest"
              >
                {loading ? "Updating..." : "Update Feedback"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}