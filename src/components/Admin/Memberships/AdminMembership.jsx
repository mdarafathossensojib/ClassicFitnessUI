import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import AddMembership from "./AddMembership"
import apiClient from "../../../services/api_client"
import authApiClient from "../../../services/auth_api_client"
import Loading from "../../Alert/Loading"
import SuccessAlert from "../../Alert/SuccessAlert"
import ErrorAlert from "../../Alert/ErrorAlert"

export default function AdminMemberships() {
  const [showModal, setShowModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [membershipsData, setMembershipsData] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const fetchMembershipsData = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get("/membership-plans/")
      setMembershipsData(response.data || [])
    } catch (error) {
      setErrorMsg(error.response?.data);
      setMembershipsData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembershipsData()
  }, [])

  const openAddModal = () => {
    setEditingPlan(null)
    setShowModal(true)
  }

  const openEditModal = (plan) => {
    setEditingPlan(plan)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return

    try {
      await authApiClient.delete(`/membership-plans/${id}/`)
      setMembershipsData(prev => prev.filter(p => p.id !== id));
      setSuccMsg("Membership Plan Deleted Successfully!");
    } catch (error) {
      setErrorMsg(error.response?.data);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Memberships</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Create and manage membership plans and pricing.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        {succMsg && <SuccessAlert message={succMsg} /> } 

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
          Add Plan
        </button>
      </div>

      {/* Plan Cards Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {membershipsData.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                plan.is_active
                  ? "bg-green-600/10 text-green-400"
                  : "bg-red-600/10 text-red-400"
              }`}>
                {plan.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">
                ${plan.price}
              </span>
              <span className="text-sm text-zinc-500">/{plan.period}</span>
            </p>

            <p className="mt-2 text-xs text-zinc-400">
              Duration: {plan.duration_days} days
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEditModal(plan)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-700 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>

              <button
                onClick={() => handleDelete(plan.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-700 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-red-600/10 hover:text-red-400 hover:border-red-600/30"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-bold text-white">All Plans</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-3 text-left text-xs text-zinc-400">Plan</th>
                <th className="px-6 py-3 text-left text-xs text-zinc-400">Price</th>
                <th className="px-6 py-3 text-left text-xs text-zinc-400">Billing</th>
                <th className="px-6 py-3 text-left text-xs text-zinc-400">Duration</th>
                <th className="px-6 py-3 text-left text-xs text-zinc-400">Features</th>
                <th className="px-6 py-3 text-right text-xs text-zinc-400">Actions</th>
              </tr>
            </thead>

            <tbody>
              {membershipsData.map((plan) => (
                <tr key={plan.id} className="border-b border-zinc-800 last:border-0">
                  <td className="px-6 py-4 text-sm font-medium text-zinc-200">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-200">
                    ${plan.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400 capitalize">
                    {plan.period}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {plan.duration_days} days
                  </td>
                  <td className="max-w-xs px-6 py-4 text-xs text-zinc-500 truncate">
                    {Array.isArray(plan.features)
                      ? plan.features.map((f) => f.text).join(", ")
                      : ""}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(plan)}
                        className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="rounded-md p-2 text-zinc-500 hover:bg-red-600/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-900 p-8 my-10">
            <AddMembership
              editingPlan={editingPlan}
              setShowModal={setShowModal}
              refreshData={fetchMembershipsData}
            />
          </div>
        </div>
      )}
    </div>
  )
}
