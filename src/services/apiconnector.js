import axios from "axios";
import { store } from "../store";
import { setToken } from "../slices/authSlice";
import { logoutUser } from "../utils/functions";
import toast from "react-hot-toast";

async function onRejectApiCall(error) {
  const originalRequest = error.config;

  if (error.response) {
    const message = error?.response?.data?.message || "";

    if (
      error.response.status === 401 &&
      message.includes("Logged in from another device")
    ) {
      toast.error("Your account was logged in on another device");
      logoutUser();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const userToken = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/v1/auth/refresh-token`,
          {
            token: userToken,
            refreshToken: refreshToken,
          },
          {
            withCredentials: true,
          },
        );

        if (!response.data.success) {
          store.dispatch(setToken(null));
          localStorage.clear();
          window.location.href = "/";
          return Promise.reject(error);
        }

        const newAccessToken = response.data.token;

        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          store.dispatch(setToken(newAccessToken));

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return axiosInstance(originalRequest);
        }

        throw new Error("Invalid token response");
      } catch (e) {
        const refreshErrorMessage = e?.response?.data?.message || "";

        if (refreshErrorMessage.includes("Logged in from another device")) {
          toast.error("Your account was logged in on another device");
        }

        logoutUser();
        return Promise.reject(e);
      }
    }

    if (error.response.status === 403) {
      logoutUser();
      toast.error(error?.response?.data?.message || "Access is expired");
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
}

function onFullFillApiCall(response) {
  return response;
}

const axiosInstance = axios.create({});

axiosInstance.interceptors.response.use(onFullFillApiCall, onRejectApiCall);

export const apiConnector = async (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};

export default axiosInstance;
