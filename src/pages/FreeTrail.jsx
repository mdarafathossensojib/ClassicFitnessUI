import { useState } from "react"
import {Link} from "react-router"
import { Dumbbell, Check, ArrowRight } from "lucide-react"
import authApiClient from "../services/auth_api_client";
import ErrorAlert from "../components/Alert/ErrorAlert";

const trialFeatures = [
  "Full gym access for 7 days",
  "2 group classes included",
  "1 personal training session",
  "Free fitness assessment",
  "Locker room and shower access",
  "No credit card required",
]

const FreeTrial = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    fitnessGoal: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await authApiClient.post("/free-trial/", {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        fitness_goal: formData.fitnessGoal,
      })
      setSubmitted(true)
    } catch (err) {
      setError(
        err.response?.data?.detail || "Something went wrong, maybe you already requested a trial"
      )
    }
  }
  return (
    <>
      <main className="bg-zinc-950 pt-20">
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            {!submitted ? (
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Left - Info */}
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                    Start Today
                  </p>
                  <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                    Free 7-Day Trial
                  </h1>
                  <p className="mt-4 leading-relaxed text-zinc-400">
                    Experience everything PowerFit has to offer with no commitment. Try our facilities, classes, and trainers completely free for 7 days.
                  </p>

                  <ul className="mt-8 flex flex-col gap-3">
                    {trialFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 shrink-0 text-red-500" />
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10">
                        <Dumbbell className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">No Credit Card Required</p>
                        <p className="text-xs text-zinc-400">Just bring your ID and workout clothes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Form */}
                {error && <ErrorAlert message={error} />}
                <div>
                  <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
                    <h2 className="text-xl font-bold uppercase tracking-wide text-white">
                      Claim Your Free Trial
                    </h2>
                    <div className="mt-6 flex flex-col gap-5">
                      <div>
                        <label htmlFor="fullName" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          required
                          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="fitnessGoal" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                          Fitness Goal
                        </label>
                        <select
                          id="fitnessGoal"
                          name="fitnessGoal"
                          value={formData.fitnessGoal}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        >
                          <option value="">Select your goal</option>
                          <option value="lose-weight">Lose Weight</option>
                          <option value="build-muscle">Build Muscle</option>
                          <option value="improve-fitness">Improve Overall Fitness</option>
                          <option value="flexibility">Flexibility & Recovery</option>
                          <option value="competitive">Competition Prep</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                      >
                        Start Free Trial
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="mx-auto max-w-lg text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600/10">
                  <Check className="h-10 w-10 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  {"You're All Set!"}
                </h1>
                <p className="mt-4 leading-relaxed text-zinc-400">
                  Your free 7-day trial has been activated. Check your email for confirmation and visit us anytime to start your fitness journey.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    to="/programs"
                    className="rounded-md bg-red-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                  >
                    Explore Programs
                  </Link>
                  <Link
                    to="/"
                    className="rounded-md border border-zinc-700 px-8 py-3 text-sm font-medium uppercase tracking-wide text-zinc-200 transition-colors hover:bg-zinc-800"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default FreeTrial;
