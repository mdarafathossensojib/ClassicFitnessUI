import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import { Dumbbell, Flame, Heart, Bike, Swords, Sparkles } from "lucide-react";
import { useState } from "react";
import Loading from "../components/Alert/Loading";
import ErrorAlert from "../components/Alert/ErrorAlert";
import { Helmet } from "react-helmet";
import Pagination from "../components/Programs/Pagination";
import useFetchProgram from "../hooks/useFetchClass";
import ProgramFilterSection from "../components/Programs/ProgramFilterSection";

const Programs = () => {
  const icon = [Dumbbell, Flame, Heart, Heart, Bike, Swords, Sparkles];

  const [currentPage, setCurrentPage] = useState(1);

  // SEARCH INPUT (local)
  const [searchInput, setSearchInput] = useState("");

  // FINAL SEARCH (API)
  const [searchQuery, setSearchQuery] = useState("");

  const [level, setLevel] = useState("");
  const [instructor, setInstructor] = useState("");
  const [classDateFrom, setClassDateFrom] = useState("");
  const [classDateTo, setClassDateTo] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const [tempFilters, setTempFilters] = useState({
    level: "",
    instructor: "",
    classDateFrom: "",
    classDateTo: "",
    startTime: "",
    endTime: "",
  });

  const { programs, loading, totalPages, errorMsg } = useFetchProgram(
    currentPage,
    searchQuery,
    level,
    instructor,
    classDateFrom,
    classDateTo,
    startTime,
    endTime
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  // APPLY FILTERS (MODAL)
  const applyFilters = () => {
    setLevel(tempFilters.level);
    setInstructor(tempFilters.instructor);
    setClassDateFrom(tempFilters.classDateFrom);
    setClassDateTo(tempFilters.classDateTo);
    setStartTime(tempFilters.startTime);
    setEndTime(tempFilters.endTime);

    setShowFilter(false);
    setCurrentPage(1);
  };

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

            {/* SEARCH + FILTER */}
            <div className="flex gap-3 mb-6 justify-self-end">
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Programs..."
                  className="w-full p-2 bg-zinc-800 text-white rounded"
                />
              </form>

              <button
                onClick={() => {
                  setTempFilters({
                    level,
                    instructor,
                    classDateFrom,
                    classDateTo,
                    startTime,
                    endTime,
                  });
                  setShowFilter(true);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Filters
              </button>
            </div>

            {/* FILTER MODAL */}
            <ProgramFilterSection
              open={showFilter}
              setOpen={setShowFilter}
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              applyFilters={applyFilters}
            />

            {loading ? (
              <Loading />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {errorMsg && <ErrorAlert message={errorMsg} />}

                {programs.map((program, index) => {
                  const IconComponent = icon[index % icon.length];
                  const imageUrl = `https://res.cloudinary.com/mdarafathossen/${program.image}`;

                  return (
                    <Link
                      key={program.id}
                      to={`/programs/${program.id}`}
                      className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={program.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-zinc-950/40" />
                        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-red-600">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white">
                          {program.title}
                        </h3>

                        <p className="text-sm text-zinc-400 line-clamp-3 mt-2">
                          {program.description}
                        </p>

                        <div className="mt-3 flex gap-2 text-xs text-zinc-300">
                          <span>{program.level}</span>
                          <span>{program.class_date}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Programs;