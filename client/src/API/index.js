import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getParkOfficers = async () =>
  await httpClient.get("/parkOfficers");

export const deleteParkOfficer = async (parkOfficerId) =>
  await httpClient.delete(`/parkOfficers/${parkOfficerId}`);

export const dismissParkOfficer = async (parkOfficerId) =>
  await httpClient.put(`/parkOfficers/${parkOfficerId}/dismiss`);

export const createParkOfficer = async (body) =>
  await httpClient.post("/parkOfficers", body);

export const updateParkOfficer = async (parkOfficerId, updatedData) =>
  await httpClient.put(`parkOfficers/${parkOfficerId}`, updatedData);

// ProtoclAPI

export const getAllProtocols = async () =>
  await httpClient.get("parkOfficers/protocols");

export const deleteProtocol = async (parkOfficerId, protocolId) =>
  await httpClient.delete(
    `/parkOfficers/${parkOfficerId}/protocols/${protocolId}`
  );

  export const createProtocol = async (parkOfficerId,protocolBody) =>
    await httpClient.post(`/parkOfficers/${parkOfficerId}/protocols/`,protocolBody)

  export const getAllProtocolsById = async (parkOfficerId) => 
    await httpClient.get(`/parkOfficers/${parkOfficerId}/protocols/`)

  export const updateProtocolById = async(parkOfficerId,protocolId,protocolBody) =>
    await httpClient.put(`/parkOfficers/${parkOfficerId}/protocols/${protocolId}`,protocolBody)

  