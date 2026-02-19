import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import authApiClient from "../../../services/auth_api_client";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import AdminFreeTrialModal from "./AdminFreeTrialModal";

export default function AdminFreeTrial() {
  const [trials, setTrials] = useState([]);
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const res = await authApiClient.get("/free-trial/");
      setTrials(res.data);
    } catch (err) {
      setErrorMsg("Failed to fetch trials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (trial) => {
    if (!window.confirm("Are you sure you want to delete this trial?")) return;
    setErrorMsg("");
    setSuccMsg("");

    try {
      await authApiClient.delete(`/free-trial/${trial.id}/`);
      setTrials(trials.filter((t) => t.id !== trial.id));
      setSuccMsg("Trial deleted successfully!");
    } catch {
      setErrorMsg("Delete failed!");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Free Trial Requests</h1>

      {errorMsg && <ErrorAlert message={errorMsg} />}
      {succMsg && <SuccessAlert message={succMsg} />}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-zinc-400 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((trial) => (
              <tr key={trial.id} className="border-t border-zinc-800 hover:bg-zinc-800/50 transition">
                <td className="p-4">{trial.name}</td>
                <td>{trial.email}</td>
                <td>{new Date(trial.created_at).toLocaleString()}</td>
                <td className="flex gap-3 py-4">
                  <button
                    onClick={() => setSelectedTrial(trial)}
                    className="text-green-400 hover:text-green-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(trial)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTrial && (
        <AdminFreeTrialModal
          trial={selectedTrial}
          onClose={() => setSelectedTrial(null)}
          refresh={fetchTrials}
          setErrorMsg={setErrorMsg}
          setSuccMsg={setSuccMsg}
        />
      )}
    </div>
  );
}
