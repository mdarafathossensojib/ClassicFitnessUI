import { useEffect, useState } from "react"
import { Users, DollarSign, Layers, TrendingUp, Star } from "lucide-react"
import authApiClient from "../../services/auth_api_client"
import ErrorAlert from "../Alert/ErrorAlert"
import Loading from "../Alert/Loading"

export default function AdminDashboard() {
  const [membershipStatus, setMembershipStatus] = useState({})
  const [attendanceSummary, setAttendanceSummary] = useState({})
  const [monthlyMembership, setMonthlyMembership] = useState([])
  const [planDistribution, setPlanDistribution] = useState([])
  const [expiringSoon, setExpiringSoon] = useState([])
  const [feedbackReport, setFeedbackReport] = useState([])
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        membershipRes,
        attendanceRes,
        monthlyRes,
        planRes,
        expiringRes,
        feedbackRes
      ] = await Promise.all([
        authApiClient.get("/reports/memberships/status/"),
        authApiClient.get("/reports/attendance/summary/"),
        authApiClient.get("/reports/memberships/monthly/"),
        authApiClient.get("/reports/memberships/plans/"),
        authApiClient.get("/reports/memberships/expiring-soon/"),
        authApiClient.get("/reports/feedback/classes/")
      ])

      setMembershipStatus(membershipRes.data)
      setAttendanceSummary(attendanceRes.data)
      setMonthlyMembership(monthlyRes.data)
      setPlanDistribution(planRes.data)
      setExpiringSoon(expiringRes.data)
      setFeedbackReport(feedbackRes.data.class_summary)

    } catch (error) {
      setErrorMsg(error.response?.data);
    }finally{
      setLoading(false);
    }
  }

  const stats = [
    {
      label: "Active Members",
      value: membershipStatus.active_memberships || 0,
      icon: Users,
    },
    {
      label: "Expired Memberships",
      value: membershipStatus.expired_memberships || 0,
      icon: DollarSign,
    },
    {
      label: "Total Attendance",
      value: attendanceSummary.total_records || 0,
      icon: Layers,
    },
    {
      label: "Classes Reviewed",
      value: feedbackReport.length || 0,
      icon: TrendingUp,
    },
  ]

  if(loading) return <Loading />

  return (
    <div className="p-8 text-white">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Complete gym analytics & management overview
        </p>
      </div>
      {errorMsg && <ErrorAlert message={errorMsg} /> }

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase text-zinc-400">
                  {stat.label}
                </span>
                <Icon className="w-5 h-5 text-red-500" />
              </div>
              <p className="mt-4 text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Membership Plan Distribution */}
      <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Membership Plan Distribution</h2>
        <div className="space-y-3">
          {planDistribution.map((plan, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{plan.plan__name}</span>
              <span className="text-red-400 font-semibold">
                {plan.total_members}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Membership Growth */}
      <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Monthly Membership Growth</h2>
        <div className="space-y-2">
          {monthlyMembership.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {new Date(item.month).toLocaleDateString()}
              </span>
              <span className="text-green-400 font-semibold">
                {item.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expiring Soon Table */}
      <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="font-bold">Membership Expiring Soon</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Plan</th>
                <th className="px-6 py-3 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {expiringSoon.map((item, index) => (
                <tr key={index} className="border-b border-zinc-800">
                  <td className="px-6 py-4">{item.user__email}</td>
                  <td className="px-6 py-4">{item.plan__name}</td>
                  <td className="px-6 py-4">
                    {new Date(item.end_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Rated Classes */}
      <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Top Rated Classes</h2>

        <div className="space-y-3">
          {feedbackReport.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.fitness_class__title}</span>
              <span className="text-yellow-400 font-semibold">
                <Star /> {item.average_rating?.toFixed(1)} ({item.total_reviews})
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
