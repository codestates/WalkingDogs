import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})

// const api = axios.create({
//     baseURL: `https://localhost:443`,
//     withCredentials: true,
// })
export default api;