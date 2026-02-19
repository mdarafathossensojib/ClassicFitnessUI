import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../../services/auth_api_client";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const AddMembership = ({ editingPlan, setShowModal, refreshData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: editingPlan || {},
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPlan) {
      reset({
        ...editingPlan,
        features: Array.isArray(editingPlan.features)
          ? editingPlan.features.map((f) => f.text).join(", ")
          : "",
      });
    }
  }, [editingPlan, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccMsg("");

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
          ? data.features.split(",").map((f) => f.trim())
          : [],
      };

      if (editingPlan) {
        await authApiClient.patch(
          `/membership-plans/${editingPlan.id}/`,
          payload
        );
        setSuccMsg("Plan Updated Successfully!");
      } else {
        await authApiClient.post("/membership-plans/", payload);
        setSuccMsg("Plan Created Successfully!");
      }

      refreshData();
      setShowModal(false);
    } catch {
      setErrorMsg("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-5 text-white"
      >
        {errorMsg && <ErrorAlert message={errorMsg} />}
        {succMsg && <SuccessAlert message={succMsg} />}

        {/* Plan Name */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Plan Name
          </label>
          <input
            {...register("name", { required: true })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
          />
        </div>

        {/* Price + Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Price
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Period
            </label>
            <select
              {...register("period")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Yearly Price */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Yearly Price
          </label>
          <input
            {...register("yearlyPrice")}
            type="number"
            placeholder="Optional"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
          />
        </div>

        {/* Features */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Features (comma separated)
          </label>
          <textarea
            {...register("features")}
            rows={3}
            placeholder="Feature1, Feature2, Feature3"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Duration (Days)
          </label>
          <input
            {...register("duration_days")}
            type="number"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm"
          />
        </div>

        {/* Active */}
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" {...register("is_active")} />
          Active
        </label>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-md bg-red-600 py-3 text-sm font-bold uppercase hover:bg-red-700 disabled:opacity-50"
          >
            {editingPlan
              ? loading
                ? "Saving..."
                : "Save Changes"
              : loading
              ? "Adding..."
              : "Add Plan"}
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
    </div>
  );
};

export default AddMembership;
