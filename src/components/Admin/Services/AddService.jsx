import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authApiClient from "../../../services/auth_api_client"
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert"

const AddService = ({ editingService, setShowModal, refreshData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingService || {}
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    if (editingService) {
      reset(editingService)
    }
  }, [editingService, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData()

      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("is_active", data.is_active || false)

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0])
      }

      if (editingService) {
        await authApiClient.patch(
          `/services/${editingService.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccMsg("Services Updated Successfully!");
      } else {
        await authApiClient.post("/services/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setSuccMsg("Services Create Successfully!");
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 

      <h2 className="text-xl font-bold text-white">
        {editingService ? "Edit Service" : "Add Service"}
      </h2>

      <input
        {...register("name", { required: true })}
        placeholder="Service Name"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white"
      />

      <textarea
        {...register("description", { required: true })}
        rows={4}
        placeholder="Service Description"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white"
      />

      <input
        {...register("image")}
        type="file"
        accept="image/*"
        className="text-sm text-zinc-300"
      />

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" {...register("is_active")} />
        Active
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-red-600 py-3 rounded-md text-white font-bold hover:bg-red-700"
        >
          {editingService ? (loading ? "Saving" : "Save Changes") : (loading ? "Adding" : "Add Service")}
        </button>

        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="flex-1 border border-zinc-700 py-3 rounded-md text-zinc-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddService;
