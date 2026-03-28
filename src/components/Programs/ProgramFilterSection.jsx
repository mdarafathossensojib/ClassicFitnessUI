
const ProgramFilterSection = ({
  open,
  setOpen,
  tempFilters,
  setTempFilters,
  applyFilters,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="w-96 h-full bg-zinc-900 p-6 overflow-y-auto text-white">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* LEVEL */}
        <select
          value={tempFilters.level}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, level: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-800"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* INSTRUCTOR */}
        <input
          placeholder="Instructor"
          value={tempFilters.instructor}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, instructor: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-800"
        />

        {/* DATE FROM */}
        <input
          type="date"
          value={tempFilters.classDateFrom}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, classDateFrom: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-700 text-white rounded outline-none"
        />

        {/* DATE TO */}
        <input
          type="date"
          value={tempFilters.classDateTo}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, classDateTo: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-700 text-white rounded outline-none"
        />

        {/* START TIME */}
        <input
          type="time"
          value={tempFilters.startTime}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, startTime: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-700 text-white rounded outline-none"
        />

        {/* END TIME */}
        <input
          type="time"
          value={tempFilters.endTime}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, endTime: e.target.value })
          }
          className="w-full p-2 mb-3 bg-zinc-700 text-white rounded outline-none"
        />

        {/* APPLY */}
        <button
          onClick={applyFilters}
          className="w-full mt-4 bg-red-600 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProgramFilterSection;