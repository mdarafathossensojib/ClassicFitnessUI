import { X } from "lucide-react";
import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";

export default function AdminContactModal({ contact, onClose, refresh, setErrorMsg, setSuccMsg, mode = "edit" }) {
  const [formData, setFormData] = useState(contact);
  const [loading, setLoading] = useState(false);

  const isView = mode === "view";

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccMsg("");

    try {
      await authApiClient.patch(
        `/contact/${contact.id}/`,
        formData
      );

      setSuccMsg("Contact message updated successfully!");
      refresh();
      onClose();
    } catch (error) {
      setErrorMsg(
        error.response?.data?.detail ||
        "Update failed!"
      );
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
      <div className="bg-zinc-900 w-full max-w-2xl rounded-xl p-8 border border-zinc-800 relative animate-fadeIn">

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">
          {isView ? "View Message" : "Edit Message"}
        </h2>

        <div className="space-y-4 text-sm text-zinc-300">

          <input
            name="name"
            value={formData?.name || ""}
            onChange={handleChange}
            disabled={isView}
            className="w-full bg-zinc-800 p-3 rounded disabled:opacity-60"
          />

          <input
            name="email"
            value={formData?.email || ""}
            onChange={handleChange}
            disabled={isView}
            className="w-full bg-zinc-800 p-3 rounded disabled:opacity-60"
          />

          <textarea
            name="message"
            rows="4"
            value={formData?.message || ""}
            onChange={handleChange}
            disabled={isView}
            className="w-full bg-zinc-800 p-3 rounded disabled:opacity-60"
          />

          {!isView && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
