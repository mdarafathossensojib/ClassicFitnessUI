import { useEffect, useState } from "react";
import authApiClient from "../../../services/auth_api_client";
import ErrorAlert from "../../Alert/ErrorAlert";
import SuccessAlert from "../../Alert/SuccessAlert";

export default function AttendanceForm() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isPresent, setIsPresent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await authApiClient.get("/classes/");
    setClasses(res.data);
  };

  const fetchUsers = async (classId) => {
    const res = await authApiClient.get(
      `/attendance/booked-users/?class_id=${classId}`
    );
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApiClient.post("/attendance/", {
      fitness_class: selectedClass,
      member: selectedUser,
      is_present: isPresent,
      });

      setSuccMsg("Attendance marked!");
    } catch (error) {
      setErrorMsg(error.response?.data)
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-10">
      <h2 className="text-xl font-bold text-white mb-6">
        Mark Attendance
      </h2>
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {succMsg && <SuccessAlert message={succMsg} /> } 
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          onChange={(e) => {
            setSelectedClass(e.target.value);
            fetchUsers(e.target.value);
          }}
          className="bg-zinc-800 p-3 rounded"
        >
          <option>Select Class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.title}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          className="bg-zinc-800 p-3 rounded"
        >
          <option>Select User</option>
          {users.map((u) => (
            <option key={u.member_id} value={u.member_id}>
              {u.member_name}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={isPresent}
            onChange={() => setIsPresent(!isPresent)}
          />
          Present
        </label>

        <button disabled={loading} className="bg-red-600 py-2 rounded">
          {loading ? "Submiting" : "Submit"}
        </button>
      </form>
    </div>
  );
}
