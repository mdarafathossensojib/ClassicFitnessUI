import {Link} from "react-router";
import  PageHeader  from "../components/PageHeader";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../services/api_client";
import Loading from "../components/Alert/Loading";
import MembershipFAQ from "../components/Membership/MembershipFAQ";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";


const Membership = () => {
  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg]  = useState("");

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
    <>
    <Helmet>
      <title>Memberships</title>
    </Helmet>
      <main>
        <PageHeader
          label="Membership Plans"
          title="Find Your Perfect Plan"
          description="Flexible membership options to fit your lifestyle and fitness goals. No long-term contracts required. Cancel anytime."
        />

        <section className="bg-zinc-950 pb-24">
          {loading ? (
              <Loading />
            ) : (
          <div className="mx-auto max-w-7xl px-6">
            {errorMsg && <ErrorAlert message={errorMsg} /> }
            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {membershipPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-lg border p-8 transition-all ${
                    plan.id===2
                      ? "border-red-600 bg-zinc-800"
                      : "border-zinc-800 bg-zinc-900"
                  }`}
                >
                  {plan.id===2 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-xl font-bold uppercase tracking-wide text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-zinc-500">{plan.period}</span>
                  </div>

                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 shrink-0 text-red-500" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-zinc-600" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-zinc-300" : "text-zinc-600"}`}>
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
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <MembershipFAQ />
          </div>
            )}
        </section>
      </main>
    </>
  );
};

export default Membership
