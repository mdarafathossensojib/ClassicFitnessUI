import { useEffect, useState } from "react";
import apiClient from "../services/api_client";

const useFetchProgram = (
  currentPage,
  searchQuery,
  sortOrder
) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const url = `/classes/?page=${currentPage}&search=${searchQuery}&ordering=${sortOrder}`;
      try {
        const response = await apiClient.get(url);
        const data = await response.data;

        setPrograms(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        setErrorMsg(error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [currentPage, searchQuery, sortOrder]);

  return { programs, loading, totalPages, errorMsg };
};

export default useFetchProgram;