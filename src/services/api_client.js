import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://classicfitness-flax.vercel.app/api/v1",
});

export default apiClient;