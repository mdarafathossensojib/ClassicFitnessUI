import { useState, useEffect } from "react";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import useAuthContext from "../../../hooks/useAuthContext";
import authApiClient from "../../../services/auth_api_client";

const ProgramBooking = ({ programId }) => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    const checkBooking = async () => {
      if (!user) return;

      try {
        const res = await authApiClient.get("/classes/my_booking/");
        const found = res.data.find(
          (b) => b.fitness_class?.id === Number(programId)
        );
        if (found) {
          setAlreadyBooked(true);
        }
      } catch (err) {
        setError(err.response.data.detail);
      }
    };

    checkBooking();
  }, [programId, user]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book this class.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await authApiClient.post(`/classes/${programId}/book/`);

      setSuccess(true);
      setAlreadyBooked(true);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
      <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-4">
        Book This Class
      </h3>

      {/* Success State */}
      {success || alreadyBooked ? (
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          You have already booked this class
        </div>
      ) : (
        <>
          <p className="text-sm text-zinc-400 mb-4">
            Secure your spot now and join this program.
          </p>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-red-700 hover:scale-[1.02] disabled:opacity-50"
          >
            <Calendar className="w-4 h-4" />
            {loading ? "Booking..." : "Book Now"}
          </button>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProgramBooking;
