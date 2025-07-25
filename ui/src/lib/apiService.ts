import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiService = {
	get: async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
		try {
			const res = await axios.get(url, config);
			return res;
		} catch (err) {
			throw err;
		}
	},
	post: async (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
		try {
			const res = await axios.post(url, data, config);
			return res;
		} catch (err) {
			throw err;
		}
	},
};

export default apiService;
