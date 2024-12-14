import axios from "axios";

const $host = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export { $host };
