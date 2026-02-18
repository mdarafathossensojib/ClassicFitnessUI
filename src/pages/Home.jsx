import HeroSection from "../components/home/HeroSection"
import ProgramsSection from "../components/home/ProgramsSection"
import MembershipSection from "../components/home/MembershipSection"
import CTASection from "../components/home/CTASection"
import HomeGallery from "../components/home/HomeGallery";
import HomeServices from "../components/home/HomeServices";
import HomeFeedback from "../components/home/HomeFeedback";

const Home = () => {
  return (
    <>
        <HeroSection />
        <ProgramsSection />
        <MembershipSection />
        <HomeGallery />
        <CTASection />
        <HomeServices />
        <HomeFeedback />
    </>
  );
};

export default Home;