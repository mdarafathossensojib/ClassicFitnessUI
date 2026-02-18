import { Outlet } from "react-router";
import Navber from "./Navber";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
           <Navber />
           <Outlet />
           <Footer />
        </>
    );
};

export default MainLayout;