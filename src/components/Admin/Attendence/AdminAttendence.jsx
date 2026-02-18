import { Helmet } from "react-helmet";
import AttendanceForm from "./AttendenceForm";
import ClassSummary from "./ClassSummary";

export default function AdminAttendance() {
  return (
    <>
    <Helmet>
      <title>Admin Attendence</title>
    </Helmet>
    <div className="p-8 text-white">
      <AttendanceForm />
      <ClassSummary />
    </div>
    </>
  );
}
