import axios from 'axios';

// get result from /api
export const getResult = async () => {
	const response = await axios.get('/api');
	return response.data;
};