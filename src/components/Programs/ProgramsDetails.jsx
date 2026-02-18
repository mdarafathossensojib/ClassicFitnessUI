import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import apiClient from "../../services/api_client";
import { useEffect, useState } from "react";
import Loading from "../Alert/Loading";
import PageNotFound from "../Alert/PageNotFound";
import ProgramInfo from "./ProgramInfo";
import ProgramContent from "./ProgramContent";
import ProgramFeedback from "./ProgramFeedback";
import ProgramBooking from "../Dashboard/Classes/ProgramBooking";
import ErrorAlert from "../Alert/ErrorAlert";
import { Helmet } from "react-helmet";

const ProgramsDetails = () => {
  const { programId } = useParams();

  const [programsData, setProgramsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/classes/${programId}`);
        setProgramsData(response.data || null);
      } catch (error) {
        setErrorMsg(error.response?.data);
        setProgramsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsData();
  }, [programId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <Loading />
      </div>
    );
  }

  if (!programsData) {
    return <PageNotFound title="Program" to="/programs" />;
  }

  const imageUrl = programsData.image
    ? `https://res.cloudinary.com/mdarafathossen/${programsData.image}`
    : "/placeholder.svg";

  return (
    <>
    <Helmet>
      <title>Program Details</title>
    </Helmet>
    <main className="bg-zinc-950 pt-20">
      {errorMsg && <ErrorAlert message={errorMsg} /> }
      {/* Hero */}
      <section className="relative h-80 overflow-hidden md:h-96">
        <img
          src={imageUrl}
          alt={programsData.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/programs"
              className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Link>

            <h1 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
              {programsData.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <ProgramContent programsData={programsData} />
            <ProgramFeedback programId={programId} />

            {/* Sidebar */}
            <ProgramInfo programsData={programsData} />
            <ProgramBooking programId={programId} />

          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default ProgramsDetails;
