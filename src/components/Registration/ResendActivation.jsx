
import { useState } from "react";
import {Link} from "react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";

const ResendActivation = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false);
  const {resendActivationEmail} = useAuthContext();

  const { register,
        handleSubmit,
      } = useForm();
  
      const onSubmit = async (data) => {
      try {
        const res = await resendActivationEmail(data);
        setEmail(data.email);
        if(res.success) setSubmitted(true);
      } catch (error) {
        console.log("Registration failed", error);
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md">

        {!submitted ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold uppercase tracking-tight text-white">
                Resend Activation
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Enter your email to receive a new activation link for your account.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {required:"Email is Required!"})}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                >
                  Resend Activation Link
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/10">
              <Mail className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
              Activation Email Sent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {"We've sent a new activation link to "}
              <span className="font-medium text-zinc-200">{email}</span>
              {". Please check your inbox and click the link to activate your account."}
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              {"Still didn't receive it? "}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-red-500 hover:text-red-400"
              >
                Try again
              </button>
            </p>
          </div>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResendActivation;
