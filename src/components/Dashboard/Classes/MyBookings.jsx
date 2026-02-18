import { useEffect, useState } from "react";
import { Calendar, Clock} from "lucide-react";
import authApiClient from "../../../services/auth_api_client";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await authApiClient.get("/classes/my_booking/");
      setBookings(response.data || []);
    } catch (err) {
      setErrorMsg(err.response?.data)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await authApiClient.post(`/classes/${id}/cancel_booking/`);
      fetchBookings();
      setSuccMsg("Class Booking Canceled Successfully!");
    } catch (err) {
      setErrorMsg(err.response.data);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-8 bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 

      {bookings.length === 0 ? (
        <div className="text-center text-zinc-400">
          <Calendar className="mx-auto mb-4" />
          No booked classes yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const program = booking.fitness_class;

            return (
              <div
                key={booking.id}
                className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-3"
              >
                <h3 className="text-lg font-bold text-white">
                  {program.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Clock size={16} />
                  {program.class_date} | {program.start_time}
                </div>

                <button
                  onClick={() => handleCancel(booking.id)}
                  className="mt-4 w-full rounded-md bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
