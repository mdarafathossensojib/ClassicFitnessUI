import { ArrowRight } from "lucide-react";
import HeroImage from "../../assets/images/hero-gym.jpg"; // your imported image
import AnimatedText from "./AnimatedText";
import { Link } from "react-router";


const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={HeroImage}
        alt="Modern gym interior with dramatic lighting"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-zinc-950/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Premium Fitness Experience
        </p>
        <h1 className="text-5xl font-bold uppercase leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
          <AnimatedText text="Transform Your" />
          <br />
          <span className="text-red-500">
            <AnimatedText text="Body & Mind" />
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          World-class facilities, expert trainers, and personalized programs
          designed to push your limits and achieve extraordinary results.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/free-trial"
            className="inline-flex items-center rounded-md bg-red-600 px-8 py-4 text-base font-medium uppercase tracking-wide text-white transition-colors hover:bg-red-700"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/programs"
            className="inline-flex items-center rounded-md border border-zinc-700 bg-transparent px-8 py-4 text-base font-medium uppercase tracking-wide text-zinc-100 transition-colors hover:bg-zinc-800"
          >
            View Programs
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "500+", label: "Active Members" },
            { value: "50+", label: "Expert Trainers" },
            { value: "30+", label: "Programs" },
            { value: "24/7", label: "Access" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-red-500 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm uppercase tracking-wide text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
