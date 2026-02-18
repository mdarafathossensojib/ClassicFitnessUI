import { ArrowRight } from "lucide-react"
import { Link } from "react-router";


const CTASection = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-950 py-24">
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-red-600" />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Ready to Begin?
        </p>
        <h2 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
          Your Transformation
          <br />
          Starts Today
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          Join PowerFit and unlock your full potential. Get a free 7-day trial
          and see the difference world-class training can make.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/free-trial"
            className="inline-flex items-center rounded-md bg-red-600 px-8 py-4 text-base font-medium uppercase tracking-wide text-white transition-colors hover:bg-red-700"
          >
            Claim Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border border-zinc-700 bg-transparent px-8 py-4 text-base font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-zinc-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
