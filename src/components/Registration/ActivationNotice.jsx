import { useLocation } from "react-router";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import SuccessAlert from "../Alert/SuccessAlert";
import ErrorAlert from "../Alert/ErrorAlert";
import { Helmet } from "react-helmet";

const ActivationNotice = () => {

  const { resendActivationEmail, errorMsg } = useAuthContext();
  const location = useLocation();
  const email = location.state?.email;

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await resendActivationEmail(email);
      if (response.success) {
        setSuccessMsg("Activation email sent again successfully!");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Activation Notice</title>
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">

        <h1 className="text-2xl font-bold uppercase text-white">
          Verify Your Email
        </h1>

        <p className="mt-4 text-sm text-zinc-400">
          A verification link has been sent to
        </p>

        <p className="mt-1 font-semibold text-red-500">
          {email}
        </p>

        <p className="mt-4 text-xs text-zinc-500">
          Please check your inbox and click the activation link to activate your account.
        </p>

        {successMsg && <SuccessAlert message={successMsg} />}
        {errorMsg && <ErrorAlert message={errorMsg} />}

        <button
          onClick={handleResend}
          className="mt-6 w-full rounded-md bg-red-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
        >
          {loading ? "Resending" : "Resend Activation Email"}
        </button>
      </div>
    </div>
    </>
  );
};

export default ActivationNotice;
