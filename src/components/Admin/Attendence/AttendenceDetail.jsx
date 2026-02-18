import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";
import { X } from "lucide-react";

export default function AttendanceDetail({ classData, onClose }) {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const res = await authApiClient.get(
      `/attendance/?fitness_class=${classData.class_id}`
    );
    setAttendance(res.data);
  };

  const presentUsers = attendance.filter((a) => a.is_present);
  const absentUsers = attendance.filter((a) => !a.is_present);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-4xl rounded-xl p-8 relative border border-zinc-800">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {classData.class_title} - Details
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Present Users */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">
              Present Users ({presentUsers.length})
            </h3>

            <div className="space-y-3">
              {presentUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-zinc-800 p-3 rounded-lg"
                >
                  <p className="text-white text-sm">
                    {user.member_email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Absent Users */}
          <div>
            <h3 className="text-red-400 font-semibold mb-4">
              Absent Users ({absentUsers.length})
            </h3>

            <div className="space-y-3">
              {absentUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-zinc-800 p-3 rounded-lg"
                >
                  <p className="text-white text-sm">
                    {user.member_email}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
