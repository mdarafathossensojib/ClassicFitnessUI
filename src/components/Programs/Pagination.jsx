const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center my-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`mt-5 mx-1 px-3 py-1 rounded hover:cursor-pointer ${
            currentPage === i + 1 ? "btn bg-red-500 text-white" : "btn text-zinc-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;