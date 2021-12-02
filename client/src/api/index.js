import axios from 'axios';

const api = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})

export const api;