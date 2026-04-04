import HeroSection from "../components/home/HeroSection"
import ProgramsSection from "../components/home/ProgramsSection"
import MembershipSection from "../components/home/MembershipSection"
import CTASection from "../components/home/CTASection"
import HomeGallery from "../components/home/HomeGallery";
import HomeServices from "../components/home/HomeServices";
import HomeFeedback from "../components/home/HomeFeedback";
import { Helmet } from "react-helmet";
import BMICalculator from "../components/home/BMICalculator";
import DiscountBanner from "../components/home/DiscountBanar";
import DemoClass from "../components/home/DemoClass";
import StudentAchievement from "../components/home/StudentAchievement";

const Home = () => {
  return (
    <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <HeroSection />
        <ProgramsSection />
        <MembershipSection />
        <HomeGallery />
        <CTASection />
        <HomeServices />
        <BMICalculator />
        <DemoClass />
        <DiscountBanner />
        <StudentAchievement />
        <HomeFeedback />
    </>
  );
};

export default Home;