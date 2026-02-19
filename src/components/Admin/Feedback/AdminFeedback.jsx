import { useEffect, useState } from "react";
import { Trash2, Edit, X, Star } from "lucide-react";
import apiClient from "../../../services/api_client";
import Loading from "../../Alert/Loading";
import EditFeedback from "./EditFeedback";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import { Helmet } from "react-helmet";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState("gym");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      let response;

      if (feedbackType === "gym") {
        response = await apiClient.get("/feedback/");
      } else {
        if (!selectedClassId) return;
        response = await apiClient.get(
          `/classes/${selectedClassId}/class-feedback/`
        );
      }

      setFeedbacks(response.data || []);
    } catch {
      setErrorMsg("Failed to load feedbacks");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [feedbackType, selectedClassId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?"))
      return;

    try {
      if (feedbackType === "gym") {
        await apiClient.delete(`/feedback/${id}/`);
        setSuccMsg("Gym Feedback deleted successfully!");
      } else {
        await apiClient.delete(
          `/classes/${selectedClassId}/class-feedback/${id}/`
        );
        setSuccMsg("Class Feedback deleted successfully!");
      }
      fetchFeedbacks();
    } catch {
      setErrorMsg("Delete failed!");
    }
  };

  const openEditModal = (feedback) => {
    setEditingFeedback(feedback);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Feedback</title>
      </Helmet>

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 text-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Manage Feedback
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            View, edit and delete feedbacks from members.
          </p>
        </div>

        {errorMsg && <ErrorAlert message={errorMsg} />}
        {succMsg && <SuccessAlert message={succMsg} />}

        {/* Type Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setFeedbackType("gym")}
            className={`px-4 py-2 rounded-md text-sm ${
              feedbackType === "gym"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            Gym Feedback
          </button>

          <button
            onClick={() => setFeedbackType("class")}
            className={`px-4 py-2 rounded-md text-sm ${
              feedbackType === "class"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            Class Feedback
          </button>

          {feedbackType === "class" && (
            <input
              type="number"
              placeholder="Enter Class ID"
              className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-white w-full sm:w-48"
              onChange={(e) => setSelectedClassId(e.target.value)}
            />
          )}
        </div>

        {/* Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-225 w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase">
                  <th className="px-6 py-3">Member</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Comment</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {feedbacks.map((fb) => (
                  <tr
                    key={fb.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm text-zinc-200">
                      {fb.member_name || `ID ${fb.member}`}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400 break-all">
                      {fb.member_email}
                    </td>

                    <td className="px-6 py-4 text-sm text-yellow-400 font-bold flex items-center gap-1">
                      {fb.rating}
                      <Star className="w-4 h-4" />
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-200 max-w-62.5 wrap-break-word">
                      {fb.comment}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {new Date(fb.created_at).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(fb)}
                          className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(fb.id)}
                          className="rounded-md p-2 text-zinc-500 hover:bg-red-600/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {feedbacks.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-zinc-500"
                    >
                      No feedback found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && editingFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm px-4">
            <div className="w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  Edit Feedback
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-zinc-500 hover:text-zinc-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <EditFeedback
                feedback={editingFeedback}
                refreshData={fetchFeedbacks}
                setShowModal={setShowModal}
                feedbackType={feedbackType}
                classId={selectedClassId}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
