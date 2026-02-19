import { X } from "lucide-react";
import { useState } from "react";
import authApiClient from "../../../services/auth_api_client";

export default function AdminContactModal({ contact, onClose, refresh }) {
  const [formData, setFormData] = useState(contact);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await authApiClient.patch(
        `/contact/${contact.id}/`,
        formData
      );
      refresh();
      onClose();
    } catch {
      alert("Update failed");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-xl p-8 border border-zinc-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">
          Contact Details
        </h2>

        <div className="space-y-4 text-sm text-zinc-300">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-3 rounded"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-3 rounded"
          />

          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-3 rounded"
          />

          <button
            onClick={handleSave}
            className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700"
          >
            {loading ? "Saving" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
