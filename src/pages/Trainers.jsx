import {Link} from "react-router";
import PageHeader from "../components/PageHeader";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "../services/api_client";
import Loading from "../components/Alert/Loading";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";



const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchTrainersData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/trainers");
      setTrainers(response.data);
    } catch (error) {
      setErrorMsg(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrainersData();
  }, [])

  const imageUrl = "https://res.cloudinary.com/mdarafathossen/";

  return (
    <>
    <Helmet>
      <title>Trainers</title>
    </Helmet>
      <main>
        <PageHeader
          label="Our Team"
          title="Expert Trainers"
          description="Meet the dedicated professionals who will guide, motivate, and push you toward achieving your fitness goals."
        />

        <section className="bg-zinc-950 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            {loading ? (
              <Loading />
            ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {errorMsg && <ErrorAlert message={errorMsg} /> }
              {trainers.map((trainer) => (
                <Link
                  key={trainer.id}
                  to={`/trainers/${trainer.id}`}
                  className="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-red-600/50"
                >
                  
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={imageUrl + trainer.image || "/placeholder.svg"}
                      alt={trainer.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-red-500 text-red-500" />
                        <span className="text-sm font-medium text-white">{trainer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                    <p className="mt-1 text-sm font-medium text-red-500">{trainer.role}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {trainer.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">{s}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                      <span>{trainer.experience} exp</span>
                      <span>{trainer.clients}+ clients</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Trainers
