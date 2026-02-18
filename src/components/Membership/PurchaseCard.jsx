import { Shield, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import authApiClient from "../../services/auth_api_client";
import ErrorAlert from "../Alert/ErrorAlert";

const PurchaseCard = ({ plan, billing, displayPrice }) => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await authApiClient.post(
            "/payment/initiate/",
            { plan_id: plan.id }
            )

            if (response.data.payment_url) {
            window.location.href = response.data.payment_url
            };
        } catch (error) {
            setErrorMsg(error.response?.data);
        }finally{
            setLoading(false);
        }
    }



    return (
        
        <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                Order Summary
                </h3>
                {errorMsg && <ErrorAlert message={errorMsg} /> }

                <div className="mt-6 flex flex-col gap-3 border-b border-zinc-800 pb-6">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">{plan.name} Plan ({billing})</span>
                    <span className="text-zinc-200">${displayPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Setup fee</span>
                    <span className="text-green-400">Free</span>
                </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">${displayPrice}</span>
                </div>

                {/* Payment Form */}
                <div className="mt-6 flex flex-col gap-4">
                <div>
                    <label htmlFor="card-name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Name on Card
                    </label>
                    <input
                    id="card-name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                </div>
                <div>
                    <label htmlFor="card-number" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                    Card Number
                    </label>
                    <div className="relative">
                    <input
                        id="card-number"
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label htmlFor="expiry" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                        Expiry
                    </label>
                    <input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    </div>
                    <div>
                    <label htmlFor="cvc" className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
                        CVC
                    </label>
                    <input
                        id="cvc"
                        type="text"
                        placeholder="123"
                        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    />
                    </div>
                </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700 disabled:opacity-50"
                    >
                    {loading ? "Processing..." : "Purchase Membership"}
                    </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <Lock className="h-3 w-3" />
                Secure payment powered by Stripe
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <Shield className="h-3 w-3" />
                30-day money-back guarantee
                </div>
            </div>
        </div>
    );
};

export default PurchaseCard;