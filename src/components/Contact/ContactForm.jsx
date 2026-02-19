import { useForm } from "react-hook-form";
import apiClient from "../../services/api_client";

const ContactForm = ({ setSuccessMsg, setErrorMsg }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await apiClient.post("/contact/", data);

      setSuccessMsg("Your message has been sent successfully!");
      reset();

      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

    } catch (error) {
      setErrorMsg(
        error.response?.data?.detail || "Something went wrong!"
      );
    }
  };

  const inputStyle = "w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"


  return (
    <div className="lg:col-span-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-zinc-800 bg-zinc-900 p-8"
      >
        <h2 className="text-xl font-bold uppercase tracking-wide text-white">
          Send a Message
        </h2>

        <div className="mt-6 flex flex-col gap-5">

          {/* Name & Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="John Doe"
                className={inputStyle}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Phone
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+880 123456789"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Subject
              </label>
              <select
                {...register("subject", { required: "Subject is required" })}
                className={inputStyle}
              >
                <option value="">Select a subject</option>
                <option value="membership">Membership Inquiry</option>
                <option value="training">Personal Training</option>
                <option value="classes">Group Classes</option>
                <option value="facility">Facility Tour</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              rows={5}
              placeholder="Tell us how we can help..."
              className={inputStyle}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
