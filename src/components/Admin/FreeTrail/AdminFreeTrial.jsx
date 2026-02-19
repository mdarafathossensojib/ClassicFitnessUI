import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import authApiClient from "../../../services/auth_api_client";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import AdminFreeTrialModal from "./AdminFreeTrialModal";
import { Helmet } from "react-helmet";

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
    } catch {
      setErrorMsg("Failed to fetch trials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (trial) => {
    if (!window.confirm("Are you sure you want to delete this trial?")) return;

    try {
      await authApiClient.delete(`/free-trial/${trial.id}/`);
      setTrials((prev) => prev.filter((t) => t.id !== trial.id));
      setSuccMsg("Trial deleted successfully!");
    } catch {
      setErrorMsg("Delete failed!");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Admin Free Trial</title>
      </Helmet>

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Free Trial Requests
        </h1>

        {errorMsg && <ErrorAlert message={errorMsg} />}
        {succMsg && <SuccessAlert message={succMsg} />}

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="overflow-x-auto">
            <table className="min-w-150 w-full text-left">
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
                  <tr
                    key={trial.id}
                    className="border-t border-zinc-800 hover:bg-zinc-800/50 transition"
                  >
                    <td className="p-4 font-semibold">
                      {trial.full_name}
                    </td>

                    <td className="break-all text-sm text-zinc-300">
                      {trial.email}
                    </td>

                    <td className="text-sm text-zinc-400">
                      {new Date(trial.created_at).toLocaleString()}
                    </td>

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

                {trials.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm text-zinc-500"
                    >
                      No free trial requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
    </>
  );
}
