import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="font-inter"> {/* Inter font agei set kore nilam */}
            <Navbar />
            <div className="min-h-[calc(100vh-285px)]"> 
                {/* 285px holo footer ar navbar er approximate height, jeno footer niche thake */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;