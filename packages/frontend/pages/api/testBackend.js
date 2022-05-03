import axios from 'axios';

export const API = axios.create({baseURL: 'https://swk23c8.herokuapp.com' });

// export const fetchHello = () => API.get('/api');



// get response from localhost:5000/api
