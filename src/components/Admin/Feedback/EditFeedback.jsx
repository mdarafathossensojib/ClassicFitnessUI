import { useForm } from "react-hook-form"
import authApiClient from "../../../services/auth_api_client"
import { useEffect, useState } from "react"
import ErrorAlert from "../../Alert/ErrorAlert"
import SuccessAlert from "../../Alert/SuccessAlert"

const EditFeedback = ({ feedback, refreshData, setShowModal, feedbackType, classId }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      rating: feedback.rating,
      comment: feedback.comment
    }
  })

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    reset({
      rating: feedback.rating,
      comment: feedback.comment
    })
  }, [feedback, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (feedbackType === "gym") {
        await authApiClient.patch(`/feedback/${feedback.id}/`, data);
        setSuccMsg("GYM FeedBack Updated!")
      } else {
        await authApiClient.patch(`/classes/${classId}/class-feedback/${feedback.id}/`, data);
        setSuccMsg("Class FeedBack Updated!");
      }
      refreshData()
      setShowModal(false)
    } catch (error) {
      setErrorMsg(error.response?.data);
    }finally{
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:border-red-600 focus:ring-1 focus:ring-red-600"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      <div>
        <label className="mb-2 block text-xs uppercase text-zinc-400">Rating</label>
        <input type="number" min={1} max={5} {...register("rating", { required: true })} className={inputStyle} />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase text-zinc-400">Comment</label>
        <textarea rows={3} {...register("comment", { required: true })} className={inputStyle} />
      </div>

      <div className="flex gap-3">
        <button disabled={loading} type="submit" className="flex-1 rounded-md bg-red-600 py-3 text-sm font-bold uppercase text-white hover:bg-red-700">
          {loading ? "Saving" : "Save Changes"}
        </button>
        <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-md border border-zinc-700 py-3 text-sm text-zinc-300 hover:bg-zinc-800">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditFeedback
