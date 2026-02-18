import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authApiClient from "../../../services/auth_api_client"
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const AddTrainer = ({ editingTrainer, setShowModal, refreshData }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingTrainer
      ? {
          ...editingTrainer,
          certifications: editingTrainer.certifications
            ? JSON.stringify(editingTrainer.certifications, null, 2)
            : "",
          specialties: editingTrainer.specialties
            ? JSON.stringify(editingTrainer.specialties, null, 2)
            : "",
          schedule: editingTrainer.schedule
            ? JSON.stringify(editingTrainer.schedule, null, 2)
            : ""
        }
      : {}
  })

  useEffect(() => {
    if (editingTrainer) reset()
  }, [editingTrainer, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData()

      Object.keys(data).forEach(key => {
        if (key === "image" && data.image?.length > 0) {
          formData.append("image", data.image[0])
        } else if (
          key === "certifications" ||
          key === "specialties" ||
          key === "schedule"
        ) {
          formData.append(key, data[key] ? JSON.parse(data[key]) : "")
        } else {
          formData.append(key, data[key] || "")
        }
      })

      if (editingTrainer) {
        await authApiClient.patch(
          `/trainers/${editingTrainer.id}/`,
          formData
        );
        setSuccMsg("Trainer Information Updated Successfully!");
      } else {
        await authApiClient.post("/trainers/", formData);
        setSuccMsg("New Trainer Joined!");
      }

      refreshData()
      setShowModal(false)

    } catch (error) {
      setErrorMsg(error.response?.data)
    }finally{
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"

  const labelStyle =
    "mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 

      <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">
        {editingTrainer ? "Edit Trainer" : "Add New Trainer"}
      </h2>

      {/* Basic Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Name *</label>
          <input {...register("name", { required: true })} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Role *</label>
          <input {...register("role", { required: true })} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Rating</label>
          <input type="number" step="0.1" {...register("rating")} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Experience</label>
          <input {...register("experience")} placeholder="e.g. 5 Years" className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Total Clients</label>
          <input type="number" {...register("clients")} className={inputStyle} />
        </div>

        <div>
          <label className={labelStyle}>Image</label>
          <input type="file" accept="image/*" {...register("image")}
            className="text-sm text-zinc-300 file:bg-red-600 file:text-white file:px-4 file:py-2 file:rounded-md file:border-0 file:cursor-pointer"
          />
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <label className={labelStyle}>Bio</label>
        <textarea rows={3} {...register("bio")} className={inputStyle} />
      </div>

      <div>
        <label className={labelStyle}>Philosophy</label>
        <textarea rows={3} {...register("philosophy")} className={inputStyle} />
      </div>

      {/* JSON Fields */}
      <div className="space-y-4 border-t border-zinc-800 pt-6">
        <h3 className="text-sm font-semibold text-red-500 uppercase">
          Advanced JSON Fields
        </h3>

        <div>
          <label className={labelStyle}>Certifications (JSON)</label>
          <textarea
            rows={3}
            {...register("certifications")}
            placeholder='["NASM", "ACE"]'
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Specialties (JSON)</label>
          <textarea
            rows={3}
            {...register("specialties")}
            placeholder='["Weight Loss", "Strength Training"]'
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Schedule (JSON)</label>
          <textarea
            rows={3}
            {...register("schedule")}
            placeholder='{"monday":"9AM-5PM"}'
            className={inputStyle}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700 transition"
        >
          {editingTrainer ? (loading ? "Saving" : "Save Changes") : (loading ? "Adding" : "Add Trainer")}
        </button>

        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="flex-1 rounded-md border border-zinc-700 py-3 text-sm font-medium uppercase tracking-wide text-zinc-300 hover:bg-zinc-800 transition"
        >
          Cancel
        </button>
      </div>

    </form>
  )
}

export default AddTrainer;
