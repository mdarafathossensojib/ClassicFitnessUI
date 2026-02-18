import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import authApiClient from "../../../services/auth_api_client"
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const AddGallery = ({ editingItem, setShowModal, refreshData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingItem || {}
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    if (editingItem) {
      reset(editingItem)
    }
  }, [editingItem, reset])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData()

      formData.append("title", data.title || "")

      if (data.image && data.image.length > 0) {
        for (let i = 0; i < data.image.length; i++) {
          formData.append("image", data.image[i])
        }
      }

      if (editingItem) {
        await authApiClient.patch(
          `/gallery/${editingItem.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccMsg("Gallery Updated Successfully!")
      } else {
        await authApiClient.post("/gallery/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setSuccMsg("Gallery Create Successfully!")
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
        {editingItem ? "Edit Image" : "Add Image"}
      </h2>

      <input
        {...register("title")}
        placeholder="Title"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white"
      />

      <input
        {...register("image")}
        type="file"
        multiple
        accept="image/*"
        className="text-sm text-zinc-300"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-red-600 py-3 rounded-md text-white font-bold hover:bg-red-700"
        >
          {editingItem ? (loading ? "Saving" : "Save Changes") : (loading ? "Uploading" : "Upload")}
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

export default AddGallery
