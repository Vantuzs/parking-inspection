import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getParkOfficers = async() => await httpClient.get('/parkOfficers');

export const deleteParkOfficer = async(parkOfficerId)=> await httpClient.delete(`/parkOfficers/${parkOfficerId}`)

export const dismissParkOfficer = async(parkOfficerId) => await httpClient.put(`/parkOfficers/${parkOfficerId}/dismiss`)