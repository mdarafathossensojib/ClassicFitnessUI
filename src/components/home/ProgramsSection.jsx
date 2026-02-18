import { Flame, Dumbbell, Heart } from "lucide-react"
import ProgramSlide from "./ProgramSlide"

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react"
import apiClient from "../../services/api_client"
import Loading from "../Alert/Loading";
import ErrorAlert from "../Alert/ErrorAlert";


const ProgramsSection = () => {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const icon = [Dumbbell, Flame, Heart, Heart]

  const fetchProgramsData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/classes");
      setProgramsData(response.data);
    } catch (error) {
      setErrorMsg(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProgramsData();
  }, [])  


  return (
    <section id="programs" className="bg-zinc-950 py-24">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            Our Programs
          </p>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            Train Like a Champion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-zinc-400">
            Choose from our diverse range of world-class programs designed to
            challenge, inspire, and transform.
          </p>
        </div>

        {/* Program Cards */}
        {loading ? (
          <Loading />
        ) : (
        <div className="relative">
          <Swiper autoplay={{ delay: 3000, disableOnInteraction: false }} pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              650: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            className="mt-4 px-4 container">
            {programsData.map((program, index) => {
              const IconComponent = icon[index % icon.length];
              const imageUrl = `https://res.cloudinary.com/mdarafathossen/${program.image}`
              return (
                <SwiperSlide key={index} className="flex justify-center">
                  <ProgramSlide title={program.title} description={program.description} iconComponent={IconComponent} image={imageUrl} programId={program.id} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
