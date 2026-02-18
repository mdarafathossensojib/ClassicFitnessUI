import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";
import { X } from "lucide-react";
import ErrorAlert from "../../Alert/ErrorAlert";

export default function MyAttendanceDetailModal({ classData, onClose }) {
  const [attendance, setAttendance] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchDetails();
  }, []);
  

  const fetchDetails = async () => {
    try {
        const res = await authApiClient.get(
        `/attendance/?fitness_class=${classData.class_id}`
      );
      setAttendance(res.data);
    } catch (error) {
      setErrorMsg(error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-3xl rounded-xl p-8 relative border border-zinc-800">
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {classData.class_title}
        </h2>

        <div className="space-y-4">
          {attendance.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-zinc-800 p-4 rounded-lg"
            >
              <span className="text-sm text-zinc-400">
                {new Date(item.marked_at).toLocaleDateString()}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.is_present
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {item.is_present ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
