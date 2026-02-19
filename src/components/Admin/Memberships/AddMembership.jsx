import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authApiClient from "../../../services/auth_api_client"
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const AddMembership = ({ editingPlan, setShowModal, refreshData }) => {

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingPlan || {}
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (editingPlan) {
    reset({
      ...editingPlan,
      features: Array.isArray(editingPlan.features)
        ? editingPlan.features.map(f => f.text).join(", ")
        : ""
    })
  }
}, [editingPlan, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        price: data.price,
        description: data.description || "",
        yearlyPrice: data.yearlyPrice || null,
        period: data.period,
        duration_days: data.duration_days || 0,
        is_active: data.is_active || false,
        features: data.features
          ? data.features.split(",").map(f => f.trim())
          : []
      }

      if (editingPlan) {
        await authApiClient.patch(`/membership-plans/${editingPlan.id}/`, payload);
        setSuccMsg("Plan Updated Successfully!");
      } else {
        await authApiClient.post("/membership-plans/", payload);
        setSuccMsg("Plan Create Successfully!");
      }

      refreshData()
      setShowModal(false)

    } catch (error) {
      setErrorMsg(error.response?.data);
    }finally{
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Plan Name
        </label>
        <input
          {...register("name", { required: true })}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Price"
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
        <select
          {...register("period")}
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <textarea
        {...register("features")}
        rows={3}
        placeholder="Features (comma separated)"
        className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
      />

      <input
        {...register("duration_days")}
        type="number"
        placeholder="Duration Days"
        className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
      />

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" {...register("is_active")} />
        Active
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-md bg-red-600 py-3 text-sm font-bold uppercase text-white hover:bg-red-700"
        >
          {editingPlan ? (loading ? "Saving" : "Save Changes") : (loading ? "Adding" : "Add Plan")}
        </button>

        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="flex-1 rounded-md border border-zinc-700 py-3 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>

    </form>
  )
}

export default AddMembership;
