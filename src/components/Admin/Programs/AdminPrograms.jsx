import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import AddPrograms from "./AddPrograms";
import apiClient from "../../../services/api_client";
import Loading from "../../Alert/Loading";
import authApiClient from "../../../services/auth_api_client";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import { Helmet } from "react-helmet";

export default function AdminPrograms() {
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  // Fetch Function (Reusable)
  const fetchProgramsData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/classes/");
      setProgramsData(response.data || []);
    } catch (error) {
      setErrorMsg(error.response?.data);
      setProgramsData([]);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchProgramsData();
  }, [fetchProgramsData]);

  const openAddModal = () => {
    setEditingProgram(null);
    setShowModal(true);
  };

  const openEditModal = (program) => {
    setEditingProgram(program);
    setShowModal(true);
  };

  // DELETE
  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    try {
      await authApiClient.delete(`/classes/${id}/`);

      // Optimistic update
      setProgramsData((prev) =>
        prev.filter((program) => program.id !== id)
      );
      setSuccMsg("Program Deleted Successfully!");
    } catch (error) {
      setErrorMsg(error.response?.data);
    }
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
      <title>Admin Programs</title>
    </Helmet>
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Programs</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Add, edit, and manage fitness programs.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        {succMsg && <SuccessAlert message={succMsg} /> } 

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Add Program
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-zinc-400">
                  Program
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-zinc-400">
                  Capacity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-zinc-400">
                  Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-zinc-400">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-zinc-400">
                  Booked
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {programsData.length > 0 ? (
                programsData.map((program) => (
                  <tr
                    key={program.id}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-zinc-200">
                      {program.title}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {program.capacity}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {program.level}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {program.class_date}
                    </td>

                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {program.booked_count}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(program)}
                          className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => onDelete(program.id)}
                          className="rounded-md p-2 text-zinc-500 hover:bg-red-600/10 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-6 text-center text-sm text-zinc-500"
                  >
                    No programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm">
          <div className="max-h-[90vh] overflow-y-auto w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingProgram ? "Edit Program" : "Add New Program"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <AddPrograms
              editingProgram={editingProgram}
              setShowModal={setShowModal}
              refreshData={fetchProgramsData} 
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
}
