import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ActivateAccount from "../components/Registration/ActivateAccount";
import Programs from "../pages/Programs";
import Membership from "../pages/Membership";
import Trainers from "../pages/Trainers";
import FreeTrial from "../pages/FreeTrail";
import Contact from "../pages/Contact";
import ForgotPassword from "../components/Registration/ForgotPassword";
import PurchaseDetails from "../components/Membership/PurchaseDetails";
import ProgramsDetails from "../components/Programs/ProgramsDetails";
import TrainerDetail from "../components/Trainers/TrainersDetails";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../components/Dashboard/Profile/Profile";
import ActivationNotice from "../components/Registration/ActivationNotice";
import AdminMemberships from "../components/Admin/Memberships/AdminMembership";
import AdminGallery from "../components/Admin/Gallery/AdminGallery";
import AdminService from "../components/Admin/Services/AdminService";
import AdminFeedback from "../components/Admin/Feedback/AdminFeedback";
import AdminPrograms from "../components/Admin/Programs/AdminPrograms";
import AdminTrainer from "../components/Admin/Trainers/AdminTrainer";
import Gallery from "../pages/Gallery";
import Services from "../pages/Services";
import Feedback from "../pages/Feedback";
import PaymentSuccess from "../components/Membership/PaymentSuccess";
import PaymentHistory from "../components/Dashboard/Purchases/PaymentHistory";
import MySubscription from "../components/Dashboard/Purchases/MySubscription";
import MyBookings from "../components/Dashboard/Classes/MyBookings";
import AdminAttendance from "../components/Admin/Attendence/AdminAttendence";
import MyAttendance from "../components/Dashboard/Attendence/MyAttendence";
import NewPassword from "../components/Registration/NewPassword";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes  */}

            <Route element={<MainLayout />}>
                <Route  path="/" element={<Home />} />
                <Route  path="/programs" element={<Programs />} />
                <Route  path="/programs/:programId" element={<ProgramsDetails />} />
                <Route  path="/membership" element={<Membership />} />
                <Route path="/membership/:planId" element={<PurchaseDetails />} />
                <Route  path="/trainers" element={<Trainers />} />
                <Route  path="/trainers/:trainerId" element={<TrainerDetail />} />
                <Route  path="/free-trial" element={<FreeTrial />} />
                <Route  path="/contact" element={<Contact />} />
                <Route  path="/gallery" element={<Gallery />} />
                <Route  path="/services" element={<Services />} />
                <Route  path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/activation-notice" element={<ActivationNotice />} />
                <Route path="activate/:uid/:token" element={<ActivateAccount />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<NewPassword />} />
            </Route>

            {/* Private Routes  */}
            <Route
                path="dashboard"
                element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="my-booking" element={<MyBookings />} />
                <Route path="my-attendance" element={<MyAttendance />} />
                <Route path="my-plan" element={<MySubscription />} />
                <Route path="payment/history" element={<PaymentHistory />} />
                <Route path="payment/success/" element={<PaymentSuccess />} />
                
                {/* For Admin */}
                <Route path="admin/programs" element={<AdminPrograms />} />
                <Route path="admin/attendance" element={<AdminAttendance />} />
                <Route path="admin/trainers" element={<AdminTrainer />} />
                <Route path="admin/memberships" element={<AdminMemberships />} />
                <Route path="admin/gallery" element={<AdminGallery />} />
                <Route path="admin/services" element={<AdminService />} />
                <Route path="admin/feedback" element={<AdminFeedback />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;