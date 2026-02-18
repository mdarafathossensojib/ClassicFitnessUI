import { useEffect, useState } from "react"
import authApiClient from "../services/auth_api_client"
import { Calendar, CreditCard, Dumbbell, Clock } from "lucide-react"
import useAuthContext from "../hooks/useAuthContext"
import AdminDashboard from "../components/Admin/AdminDashboard"
import Loading from "../components/Alert/Loading"
import ErrorAlert from "../components/Alert/ErrorAlert"

export default function Dashboard() {
  const { user } = useAuthContext()
  const [data, setData] = useState(null)
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!user?.is_staff) {
      authApiClient.get("/accounts/dashboard/")
        .then(res => {
          setData(res.data)
        })
        .catch(err => {
          setErrorMsg(err.response?.data);
        })
    }
  }, [user])

  if (user?.is_staff) return <AdminDashboard />

  if (!data) return <Loading />;

  const stats = [
    {
      label: "Workouts This Month",
      value: data.stats?.attended_this_month,
      icon: Dumbbell,
      change: "Keep going"
    },
    {
      label: "Active Membership",
      value: data.membership?.plan || "No Active Plan",
      icon: CreditCard,
      change: data.membership?.expiry
        ? `Renews ${new Date(data.membership.expiry).toLocaleDateString()}`
        : ""
    },
    {
      label: "Total Classes Attended",
      value: data.stats?.total_attended,
      icon: Calendar,
      change: "All time"
    },
  ]

  return (
    <div className="p-8">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.first_name || "Member"}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">{stat.label}</span>
                <Icon className="h-5 w-5 text-red-500" />
              </div>
              <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Upcoming Classes */}
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-bold text-white">Upcoming Classes</h2>
        <div className="mt-4 flex flex-col gap-3">
          {data.upcoming_classes?.length === 0 && (
            <p className="text-sm text-zinc-500">No upcoming classes</p>
          )}
          {data?.upcoming_classes?.map((cls, index) => (
            <div key={index} className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-300">{cls.title}</span>
              <span className="text-xs text-zinc-500">
                <Clock className="inline h-3 w-3 mr-1" />
                {new Date(cls.date).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          {data?.recent_activity?.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-zinc-300">
                {item.present ? "Attended" : "Missed"} {item.class}
              </span>
              <span className="text-zinc-500">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
