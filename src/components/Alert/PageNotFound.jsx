import { Link } from "react-router";

const PageNotFound = ({ title, to }) => {
    return (
        <>
        <main className="flex min-h-screen items-center justify-center bg-zinc-950 pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">{title} Not Found</h1>
            <p className="mt-4 text-zinc-400">The {title.toLowerCase()} you are looking for does not exist.</p>
            <Link to={to} className="mt-6 inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700">
              View All {title}s
            </Link>
          </div>
        </main>
      </>
    );
};

export default PageNotFound;