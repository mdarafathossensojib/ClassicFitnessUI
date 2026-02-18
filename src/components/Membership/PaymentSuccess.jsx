import { CheckCircle, ArrowRight, BadgeCheck } from "lucide-react"
import { Helmet } from "react-helmet"
import { Link } from "react-router"

export default function PaymentSuccess() {
  return (
    <>
    <Helmet>
      <title>Payment Successfull</title>
    </Helmet>
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-xl">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-600/20 p-4 rounded-full animate-pulse">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-3">
          Payment Successful 
        </h1>
        <BadgeCheck className="text-green-500 mb-2 ml-1" />
        </div>
        {/* Message */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          Your membership subscription has been successfully activated.
          You can now access all premium features and classes.
        </p>

        {/* Action Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Extra Info */}
        <p className="text-xs text-zinc-500 mt-4">
          A confirmation email has been sent to your registered email.
        </p>
      </div>
    </div>
    </>
  )
}
