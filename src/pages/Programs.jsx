import {Link} from "react-router";
import PageHeader from "../components/PageHeader";
import { Dumbbell, Flame, Heart, Bike, Swords, Sparkles } from "lucide-react"

import { useEffect, useState } from "react";
import apiClient from "../services/api_client";
import Loading from "../components/Alert/Loading";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";


const Programs = () => {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const icon = [Dumbbell, Flame, Heart, Heart, Bike, Swords, Sparkles]

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
    <>
    <Helmet>
      <title>Programs</title>
    </Helmet>
      <main>
        <PageHeader
          label="Our Programs"
          title="Train Like a Champion"
          description="Choose from our diverse range of world-class programs designed to challenge, inspire, and transform your body and mind."
        />

        
        <section className="bg-zinc-950 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            {loading ? (
              <Loading />) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {errorMsg && <ErrorAlert message={errorMsg} /> }
              {programsData.map((program, index) => {
                const IconComponent = icon[index % icon.length];
                const imageUrl = `https://res.cloudinary.com/mdarafathossen/${program.image}`
                return (
                  <Link
                    key={program.id}
                    to={`/programs/${program.id}`}
                    className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-red-600/50"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={program.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-zinc-950/40" />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-red-600">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                        {program.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                        {program.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                          60 min
                        </span>
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                          {program.level}
                        </span>
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                          {program.class_date}
                        </span>
                      </div>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-red-500 transition-colors group-hover:text-red-400">
                        {"View Details \u2192"}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Programs
