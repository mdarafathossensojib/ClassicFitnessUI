
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import PurchaseCard from "./PurchaseCard";
import PageNotFound from "../Alert/PageNotFound";
import apiClient from "../../services/api_client";
import Loading from "../Alert/Loading";
import ErrorAlert from "../Alert/ErrorAlert";


const PurchaseDetails = () => {
  const { planId } = useParams();
  const [billing, setBilling] = useState("monthly");

  const [membershipsData, setMembershipsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMembershipsData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/membership-plans/${planId}`);
        setMembershipsData(response.data || null);
      } catch (error) {
        setErrorMsg(error.response?.data);
        setMembershipsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipsData();
  }, [planId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    );
  }

  if (!membershipsData) {
    return <PageNotFound title="Membership Plan" to="/membership" />;
  }

  const displayPrice = billing === "monthly" ? membershipsData.price : membershipsData.yearlyPrice
  const displayPeriod = billing === "monthly" ? "/month" : "/year"

  return (
    <>
      <main className="bg-zinc-950 pt-20">
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <Link to="/membership" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
              <ArrowLeft className="h-4 w-4" />
              Back to Plans
            </Link>

            <div className="grid gap-12 lg:grid-cols-5">
              {/* Plan Details */}
              <div className="lg:col-span-3">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                  Membership Plan
                </p>
                <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                  {membershipsData.name}
                </h1>
                <p className="mt-4 leading-relaxed text-zinc-400">{membershipsData.description}</p>

                {/* Billing Toggle */}
                <div className="mt-8 inline-flex rounded-lg border border-zinc-800 bg-zinc-900 p-1">
                  <button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    className={`rounded-md px-5 py-2 text-sm font-medium transition-colors ${
                      billing === "monthly" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling("yearly")}
                    className={`rounded-md px-5 py-2 text-sm font-medium transition-colors ${
                      billing === "yearly" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Yearly
                    <span className="ml-2 rounded-full bg-green-600/20 px-2 py-0.5 text-xs text-green-400">Save 17%</span>
                  </button>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">${displayPrice}</span>
                  <span className="text-zinc-500">{displayPeriod}</span>
                </div>

                {/* Features */}
                <div className="mt-10">
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                    {"What's Included"}
                  </h2>
                  <ul className="mt-6 flex flex-col gap-3">
                    {membershipsData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 shrink-0 text-red-500" />
                        <span className="text-sm text-zinc-300">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Card */}
              <PurchaseCard plan={membershipsData} billing={billing} displayPrice={displayPrice} />

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PurchaseDetails;
