import { useEffect, useState } from "react";
import apiClient from "../services/api_client";

const useFetchProgram = (
  currentPage,
  searchQuery,
  level,
  instructor,
  classDateFrom,
  classDateTo,
  startTime,
  endTime
) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);

      let url = `/classes/?page=${currentPage}`;

      if (searchQuery) url += `&search=${searchQuery}`;
      if (level) url += `&level=${level}`;
      if (instructor) url += `&instructor__name__icontains=${instructor}`;
      if (classDateFrom) url += `&class_date__gte=${classDateFrom}`;
      if (classDateTo) url += `&class_date__lte=${classDateTo}`;
      if (startTime) url += `&start_time__gte=${startTime}`;
      if (endTime) url += `&end_time__lte=${endTime}`;

      try {
        const response = await apiClient.get(url);
        const data = response.data;

        setPrograms(data.results || []);
        setTotalPages(Math.ceil(data.count / (data.results?.length || 6)));
      } catch (error) {
        setErrorMsg(error.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [
    currentPage,
    searchQuery,
    level,
    instructor,
    classDateFrom,
    classDateTo,
    startTime,
    endTime,
  ]);

  return { programs, loading, totalPages, errorMsg };
};

export default useFetchProgram;