import axios, { AxiosRequestConfig } from 'axios';
import 'axios-response-logger';

/**
 * Axios configuration.
 */
 export const config: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_URL,
	responseType: 'json',
	headers: { accept: 'application/json', 'content-type': 'application/json' },
	timeout: 40000,
	withCredentials: true,
	maxRedirects: 5,
	validateStatus: (status: number) => status >= 200 && status < 300,
	transformResponse: (response) => {
		if (response.error) {
			console.log(response.error);
		}
		return response;
	},
};

export const saveClient = async (data: any) => {
	config.url = `clients/register`;
	config.data = data;
	config.method = 'post';
	return axios.request(config);
};