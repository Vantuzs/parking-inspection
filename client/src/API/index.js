import axios from "axios";
import history from "../BrowserHistory";

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

export const createProtocol = async (parkOfficerId, protocolBody) =>
  await httpClient.post(
    `/parkOfficers/${parkOfficerId}/protocols/`,
    protocolBody
  );

export const getAllProtocolsById = async (parkOfficerId) =>
  await httpClient.get(`/parkOfficers/${parkOfficerId}/protocols/`);

export const updateProtocolById = async (
  parkOfficerId,
  protocolId,
  protocolBody
) =>
  await httpClient.put(
    `/parkOfficers/${parkOfficerId}/protocols/${protocolId}`,
    protocolBody
  );

export const addProtocolImages = async (protocolId, images) => {
  await httpClient.post(`/parkOfficers/protocols/${protocolId}/images`, images);
};

export const deleteProtocolImageById = async (protocolId, imageId) => {
  await httpClient.delete(
    `/parkOfficers/protocols/${protocolId}/images/${imageId}`
  );
};

// AUTH

let geolocation;
navigator.geolocation.getCurrentPosition(
  ({ coords: { latitude, longitude } }) => {
    geolocation = `${latitude} ${longitude}`;
  }
);

export const loginUser = async (userData) =>
  await httpClient.post("/users/sign-in", {
    ...userData,
    geolocation,
  });

export const registerUser = async (userData) =>
  await httpClient.post("/users/sign-up", {
    ...userData,
    geolocation,
  });

// TOKENS

export const authUser = async () => {
  await httpClient.get("/users");
};

export const refreshUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const { data } = await httpClient.post("/users/refresh", {
    refreshToken,
    geolocation,
  });

  return data;
};

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    const {
      data: { tokens },
    } = response;

    if (tokens) {
      const { accessToken, refreshToken } = tokens;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response;
  },
  async (err) => {
    const {
      response: { status },
      config,
    } = err;

    if (status === 403 && localStorage.getItem("refreshToken")) {
      await refreshUser();

      return await httpClient(config);
    } else if (status === 401) {
      localStorage.clear();
      history.push("/");
    } else {
      history.push("/");
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);
