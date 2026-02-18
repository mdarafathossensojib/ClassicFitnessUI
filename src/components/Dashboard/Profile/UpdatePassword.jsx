import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";
import { useState } from "react";

const UpdatePassword = () => {
  const { changePassword } = useAuthContext();
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
      await changePassword({
        current_password: data.currentPassword,
        new_password: data.newPassword,
      });
      setSuccessMsg("Password updated successfully!");
      reset();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-lg font-bold text-white">Change Password</h2>

      {successMsg && <SuccessAlert message={successMsg} />}
      {errorMsg && <ErrorAlert message={errorMsg} />}

      <div className="mt-6 flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
            Current Password
          </label>
          <input
            type="password"
            {...register("currentPassword", { required: true })}
            placeholder="Enter current password"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-400">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", { required: true })}
              placeholder="Enter new password"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
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
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100"
            />
          </div>
        </div>
      </div>

      <button disabled={loading} type="submit" className="mt-6 rounded-md bg-zinc-800 px-6 py-3 text-sm font-bold uppercase tracking-wide text-zinc-100">
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default UpdatePassword;
