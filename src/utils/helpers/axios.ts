import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;