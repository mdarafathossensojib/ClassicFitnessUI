import { Check } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import apiClient from "../../services/api_client";
import Loading from "../Alert/Loading";
import ErrorAlert from "../Alert/ErrorAlert";


const MembershipSection = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchPlansData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/membership-plans");
      setMembershipPlans(response.data);
    } catch (error) {
      setErrorMsg(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlansData();
  }, [])

  return (
    <section id="membership" className="bg-zinc-900 py-24">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Membership Plans
          </p>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            Find Your Perfect Plan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-zinc-400">
            Flexible membership options to fit your lifestyle and fitness goals.
            No long-term contracts required.
          </p>
        </div>

        {/* Pricing Cards */}
        {loading ? (
          <Loading />
        ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {membershipPlans.map((plan, index) => (
            <div
              key={plan.id || index}
              className={`relative flex flex-col rounded-lg border p-8 transition-all ${
                plan.id===2
                  ? "border-red-600 bg-zinc-800"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >
              {plan.id===2 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-sm text-zinc-400">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/membership/${plan.id}`}
                className={`mt-8 block w-full rounded-md py-3 text-center text-sm font-medium uppercase tracking-wide transition-colors ${
                  plan.id===2
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default MembershipSection;
