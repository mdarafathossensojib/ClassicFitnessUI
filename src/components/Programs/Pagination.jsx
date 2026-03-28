const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 hover:cursor-pointer rounded transition ${
              currentPage === page
                ? "bg-red-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;