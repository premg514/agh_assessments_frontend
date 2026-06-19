import { setToken } from "../slices/authSlice";
import {
  setCompanyAccess,
  setElearningAccess,
  setTestAccess,
  setUser,
} from "../slices/profileSlice";
import { store } from "../store";

export const logoutUser = ({ redirect = true, redirectTo = "/" } = {}) => {
  store.dispatch(setToken(null));
  store.dispatch(setUser(null));
  store.dispatch(setCompanyAccess([]));
  store.dispatch(setElearningAccess(null));
  store.dispatch(setTestAccess(null));

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  if (redirect) {
    window.location.replace(redirectTo);
  }
};
