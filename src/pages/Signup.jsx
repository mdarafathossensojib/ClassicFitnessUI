import { useState } from "react"
import {Link, useNavigate } from "react-router"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";


const  Signup = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors },
  } = useForm();


  const onSubmit = async (data) => {
    setLoading(true);
    delete data.confirm_password;
    try {
      const response = await registerUser(data);
      if (response.success) {
        navigate("/activation-notice", { state: { email: data.email } });
      }
    } catch (error) {
      console.log("Registration failed", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="my-8 text-center">
          <h1 className="mt-6 text-3xl font-bold uppercase tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Start your fitness journey with us today.
          </p>
        </div>
        {errorMsg && <ErrorAlert message={errorMsg} />}
        {/* Form */}
        <form onSubmit={handleRegisterSubmit(onSubmit)} className="rounded-lg border border-zinc-800 bg-zinc-900 p-8">
          <div className="flex flex-col gap-5">
            {/* First Name */}
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                {...registerForm("first_name", {
                  required: "First Name is Required",
                })}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.first_name && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.first_name.message}
                </span>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="John Doe"
                {...registerForm("last_name", {
                  required: "Last Name is Required",
                })}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.last_name && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.last_name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                {...registerForm("email", {
                  required: "Email is Required",
                })}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.email && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                {...registerForm("phone_number", {
                  required: "Phone Number is Required",
                })}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.phone_number && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.phone_number.message}
                </span>
              )}
            </div>
            {/* Address */}
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                {...registerForm("address", {
                  required: "Address is Required",
                })}
                placeholder="Enter Your Address"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.address && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.address.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...registerForm("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                  placeholder="Create a strong password"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 pr-12 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {registerErrors.password && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium uppercase tracking-wide text-zinc-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...registerForm("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
                placeholder="Confirm your password"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              {registerErrors.confirm_password && (
                <span className="label-text-alt text-error text-red-500">
                  {registerErrors.confirm_password.message}
                </span>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-red-600 focus:ring-red-600"
              />
              <span className="text-xs leading-relaxed text-zinc-400">
                {"I agree to the "}
                <Link href="#" className="text-red-500 hover:text-red-400">Terms of Service</Link>
                {" and "}
                <Link href="#" className="text-red-500 hover:text-red-400">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button disabled={loading}
              type="submit"
              className="mt-2 w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
            >
              {loading ? "Submitting": "Create Account"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Signup
