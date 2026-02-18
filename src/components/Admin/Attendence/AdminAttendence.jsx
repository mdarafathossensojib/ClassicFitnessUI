import AttendanceForm from "./AttendenceForm";
import ClassSummary from "./ClassSummary";

export default function AdminAttendance() {
  return (
    <div className="p-8 text-white">
      <AttendanceForm />
      <ClassSummary />
    </div>
  );
}
