import {Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react";
import apiClient from "../../services/api_client";
import Loading from "../Alert/Loading";
import PageNotFound from "../Alert/PageNotFound";
import TrainersInfo from "./TrainersInfo";
import TrainersCard from "./TrainersCard";
import ErrorAlert from "../Alert/ErrorAlert";
import { Helmet } from "react-helmet";



const TrainerDetail = () => {
  const { trainerId } = useParams();

  const [trainersData, setTrainersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
  
    useEffect(() => {
      const fetchTrainersData = async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/trainers/${trainerId}`);
          setTrainersData(response.data || null);
        } catch (error) {
          setErrorMsg(error.response?.data);
          setTrainersData(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTrainersData();
    }, [trainerId]);
  
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950">
          <Loading />
        </div>
      );
    }

  if (!trainersData) {
    return <PageNotFound title="Trainer" to="/trainers" />;
    
  }

  return (
    <>
    <Helmet>
      <title>Trainer Details</title>
    </Helmet>
      <main className="bg-zinc-950 pt-20">
        {errorMsg && <ErrorAlert message={errorMsg} /> }
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <Link to="/trainers" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200">
              <ArrowLeft className="h-4 w-4" />
              Back to Trainers
            </Link>

            <div className="grid gap-12 lg:grid-cols-3">
              {/* Sidebar - Trainer Card */}
              <TrainersCard trainersData={trainersData} />

              {/* Main Content */}
              <TrainersInfo trainersData={trainersData} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TrainerDetail;
