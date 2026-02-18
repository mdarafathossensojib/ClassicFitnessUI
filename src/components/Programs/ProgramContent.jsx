import { Check } from "lucide-react";


const ProgramContent = ({ programsData }) => {
    return (
        <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-zinc-300">{programsData.description}</p>
            <p className="mt-4 leading-relaxed text-zinc-400">{programsData.longDescription}</p>

            {/* Benefits */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Benefits</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {programsData.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                    <Check className="h-5 w-5 shrink-0 text-red-500" />
                    <span className="text-sm text-zinc-300">{benefit}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* What to Expect */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-white">What to Expect</h2>
                <div className="mt-6 flex flex-col gap-4">
                {programsData.whatToExpect.map((step, index) => (
                    <div key={step} className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                        {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-zinc-300">{step}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProgramContent;