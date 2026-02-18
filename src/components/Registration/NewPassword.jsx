import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const NewPassword = () => {
  const { uid, token } = useParams();
  const { setNewPassword } = useAuthContext();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (data.newPassword !== data.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await setNewPassword({
        uid: uid,
        token: token,
        new_password: data.newPassword,
      });

      setSuccessMsg("Password updated successfully!");
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.detail ||
        err.response?.data?.new_password?.[0] ||
        "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
      >
        <h2 className="text-center text-2xl font-bold text-white">
          Change Password
        </h2>

        <p className="mt-2 text-center text-sm text-zinc-400">
          Enter your new password below
        </p>

        {successMsg && <SuccessAlert message={successMsg} />}
        {errorMsg && <ErrorAlert message={errorMsg} />}

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", { required: true })}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-white focus:ring-1 focus:ring-white transition"
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-8 w-full rounded-lg bg-zinc-700 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-zinc-600 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
