import { X } from "lucide-react";
import { useState, useEffect } from "react";
import authApiClient from "../../../services/auth_api_client";

export default function AdminFreeTrialModal({ trial, onClose, refresh, setErrorMsg, setSuccMsg }) {
  const [formData, setFormData] = useState(trial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(trial);
  }, [trial]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setErrorMsg("");
    setSuccMsg("");
    setLoading(true);
    try {
      const res = await authApiClient.patch(`/free-trial/${trial.id}/`, formData);
      setSuccMsg("Trial updated successfully!");
      refresh();
      onClose();
    } catch {
      setErrorMsg("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrorMsg("");
    setSuccMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-xl p-8 border border-zinc-800 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">Edit Free Trial</h2>

        <div className="space-y-4 text-sm text-zinc-300">
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-3 rounded"
          />
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-3 rounded"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
