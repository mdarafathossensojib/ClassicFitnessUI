import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";
import AttendanceDetail from "./AttendenceDetail";
import Loading from "../../Alert/Loading";
import ErrorAlert from "../../Alert/ErrorAlert";

export default function ClassSummary() {
  const [summary, setSummary] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setLoading(true);
    try {
        const res = await authApiClient.get("/attendance/class-summary/");
        setSummary(res.data);
        
    } catch (error) {
        setErrorMsg(error.response?.data);
    }finally{
        setLoading(false);
    }
  };

  if(loading){
    return ( <Loading /> )
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">
        Class Attendance Summary
      </h2>
      {errorMsg && <ErrorAlert message={errorMsg} /> }

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

      {selectedClass && (
        <AttendanceDetail
          classData={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
}
