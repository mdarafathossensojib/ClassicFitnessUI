import { useEffect, useState } from "react"
import { Shield, Calendar } from "lucide-react"
import authApiClient from "../../../services/auth_api_client"
import Loading from "../../Alert/Loading"
import ErrorAlert from "../../Alert/ErrorAlert"

export default function MySubscription() {
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSubscription = async () => {
    try {
      const response = await authApiClient.get("/membership-plans/my_subscription/")
      setSubscription(response.data);
    } catch (error) {
      setSubscription(null);
      setErrorMsg(error.response?.data);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        My Subscription
      </h1>
      {errorMsg && <ErrorAlert message={errorMsg} /> }

      {!subscription ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
          You do not have an active subscription.
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {subscription.plan.name}
              </h2>
              <p className="text-sm text-zinc-400">
                $ {subscription.plan.price}
              </p>
            </div>

            <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full text-xs font-semibold">
              Active
            </span>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-3 text-zinc-300">
              <Calendar className="w-5 h-5 text-red-500" />
              <div>
                <p>Start Date</p>
                <p className="font-semibold text-white">
                  {subscription.start_date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <Calendar className="w-5 h-5 text-red-500" />
              <div>
                <p>End Date</p>
                <p className="font-semibold text-white">
                  {subscription.end_date}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="w-4 h-4" />
            {subscription.auto_renew
              ? "Auto renewal enabled"
              : "Auto renewal disabled"}
          </div>
        </div>
      )}
    </div>
  )
}
