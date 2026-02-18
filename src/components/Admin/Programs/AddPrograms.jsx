import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../../services/auth_api_client";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const AddPrograms = ({ editingProgram, setShowModal, refreshData }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: editingProgram || {},
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProgram) {
      reset(editingProgram);
    }
  }, [editingProgram, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("level", data.level || "");
      formData.append("description", data.description);
      formData.append("longDescription", data.longDescription || "");
      formData.append("class_date", data.class_date);
      formData.append("start_time", data.start_time);
      formData.append("end_time", data.end_time);
      formData.append("capacity", data.capacity);
      formData.append("instructor", data.instructor || "");

      // Convert textarea -> array JSON
      const benefitsArray = Array.isArray(data.benefits)
        ? data.benefits
        : data.benefits
            ? data.benefits.split("\n")
            : [];

      const expectArray = Array.isArray(data.whatToExpect)
        ? data.whatToExpect
        : data.whatToExpect
            ? data.whatToExpect.split("\n")
            : [];
            
      formData.append("benefits", JSON.stringify(benefitsArray));
      formData.append("whatToExpect", JSON.stringify(expectArray));

      // Multiple image upload
      if (data.image && data.image.length > 0) {
        for (let i = 0; i < data.image.length; i++) {
          formData.append("image", data.image[i]);
        }
      }

      if (editingProgram) {
        await authApiClient.patch(
          `/classes/${editingProgram.id}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccMsg("Program Updated Successfully!");
      } else {
        await authApiClient.post("/classes/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccMsg("Program Create Successfully!");
      }

      if (refreshData) refreshData();

      setShowModal(false);
    } catch (error) {
      setErrorMsg(error.response?.data);
    }finally{
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      {/* Title */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Title
        </label>
        <input
          {...register("title", { required: true })}
          type="text"
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
          placeholder="Strength Training"
        />
      </div>

      {/* Level */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Level
        </label>
        <select
          {...register("level")}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        >
          <option value="All Levels">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          rows={3}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Long Description */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Long Description
        </label>
        <textarea
          {...register("longDescription")}
          rows={4}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Benefits */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Benefits (One per line)
        </label>
        <textarea
          {...register("benefits")}
          rows={4}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* What To Expect */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          What To Expect (One per line)
        </label>
        <textarea
          {...register("whatToExpect")}
          rows={4}
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-3 gap-4">
        <input
          {...register("class_date", { required: true })}
          type="date"
          className="appearance-auto rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
        <input
          {...register("start_time", { required: true })}
          type="time"
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
        <input
          {...register("end_time", { required: true })}
          type="time"
          className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Capacity */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Capacity
        </label>
        <input
          {...register("capacity", { required: true, min: 0 })}
          type="number"
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Instructor */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Instructor ID
        </label>
        <input
          {...register("instructor")}
          type="number"
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
        />
      </div>

      {/* Multiple Image Upload */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
          Upload Images (Multiple)
        </label>
        <input
          {...register("image")}
          type="file"
          multiple
          accept="image/*"
          className="w-full text-sm text-zinc-300"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-md bg-red-600 py-3 text-sm font-bold uppercase text-white hover:bg-red-700"
        >
          {editingProgram ? (loading ? "Saving" : "Save Changes") : (loading ? "Adding" : "Add Program")}
        </button>

        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="flex-1 rounded-md border border-zinc-700 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPrograms;
