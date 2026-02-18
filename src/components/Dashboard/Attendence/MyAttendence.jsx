import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";
import MyAttendanceDetail from "./MyAttendenceDetail";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";

export default function MyAttendance() {
  const [summary, setSummary] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get("/attendance/my_summary/");
      setSummary(res.data);
      
    } catch (error) {
      setErrorMsg(error.response?.data);
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    return ( <Loading /> );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        My Attendance
      </h1>
      {errorMsg && <ErrorAlert message={errorMsg} /> }

      {summary.length === 0 ? (
        <p className="text-zinc-400">
          You have no attendance records yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {summary.map((cls) => (
            <div
              key={cls.class_id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition"
            >
              <h3 className="text-lg font-semibold text-white">
                {cls.class_title}
              </h3>

              <div className="flex justify-between mt-4 text-sm">
                <span className="text-green-400">
                  Present: {cls.present_count}
                </span>
                <span className="text-red-400">
                  Absent: {cls.absent_count}
                </span>
              </div>

              <button
                onClick={() => setSelectedClass(cls)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm font-bold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedClass && (
        <MyAttendanceDetail
          classData={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}
