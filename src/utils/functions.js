import axios from "axios";
import { setToken } from "../slices/authSlice";
import {
  setCompanyAccess,
  setElearningAccess,
  setTestAccess,
  setUser,
} from "../slices/profileSlice";
import { store } from "../store";

// send otp use with useForm
// the function is written in pages/aptitude-test/functions.
export const sendOTP = async (email, toast, setLoading) => {
  if (setLoading) setLoading(true);
  const toastId = toast.loading("loading...");
  try {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + "/v1/auth/sendotp",
      {
        email: email,
      },
    );
    toast.dismiss(toastId);
    toast.success(res?.data?.message);
    return true;
  } catch (err) {
    toast.dismiss(toastId);
    toast.error(err?.response?.data?.message);
    return false;
  } finally {
    if (setLoading) setLoading(false);
  }
};

export function maskEmail(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email address");
  }

  const [username, domain] = email.split("@");

  if (!username || !domain) {
    throw new Error("Invalid email format");
  }
  const [domainName, domainExtension] = domain.split(".");

  if (!domainName || !domainExtension) {
    throw new Error("Invalid email format");
  }

  // Helper to limit the number of * characters
  const mask = (str, limit = 3) => {
    if (str.length <= 4) return str[0] + "*".repeat(str.length - 1);
    const visibleLength = Math.min(2, str.length - 2);
    return (
      str.slice(0, visibleLength) +
      "*".repeat(Math.min(str.length - visibleLength - 1, limit)) +
      str.slice(-1)
    );
  };

  const maskedUsername = mask(username);
  const maskedDomainName = mask(domainName);

  return `${maskedUsername}@${maskedDomainName}.${domainExtension}`;
}

export function analyzeString(str) {
  const hasUpperCase = /[A-Z]/.test(str);
  const hasLowerCase = /[a-z]/.test(str);
  const hasNumber = /\d/.test(str);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str);
  const isMinLengthEight = str.length >= 8;
  return {
    isOneUpperCaseCharacter: hasUpperCase,
    isOneLowerCaseCharacter: hasLowerCase,
    isOneNumber: hasNumber,
    isOneSpecialCharacter: hasSpecialChar,
    isMinLengthEight: isMinLengthEight,
  };
}

export const convertToHMSS = (remainingTime) => {
  if (remainingTime === null || remainingTime === 0) {
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }
  const hours = String(Math.floor(remainingTime / 3600)).padStart(2, "0"); // Get full hours and pad with 0
  const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(
    2,
    "0",
  ); // Get full minutes and pad with 0
  const seconds = String(remainingTime % 60).padStart(2, "0"); // Get remaining seconds and pad with 0

  return {
    hours,
    minutes,
    seconds,
  };
};

const parseTimeString = (timeStr = "0m 0s 0ms") => {
  const match = timeStr.match(/(\d+)m\s*(\d+)s\s*(\d+)ms/);
  return match
    ? { m: +match[1], s: +match[2], ms: +match[3] }
    : { m: 0, s: 0, ms: 0 };
};

export const subtractDuration = (timeTaken, duration) => {
  const { m, s, ms } = parseTimeString(timeTaken);
  let timeTakenMs = m * 60000 + s * 1000 + ms;
  let durationMs = duration * 60000;
  let remaining = Math.max(durationMs - timeTakenMs, 0);
  return `${Math.floor(remaining / 60000)}m ${Math.floor(
    (remaining % 60000) / 1000,
  )}s ${remaining % 1000}ms`;
};

// Dealing with Textarea Height
export const calcHeight = (value) => {
  let numberOfLineBreaks = (value?.match(/\n/g) || [])?.length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;

  if (newHeight > 400) {
    newHeight = 400;
  }

  return { height: newHeight + "px" };
};

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

export function createTabsData(
  totalCodingProblemsCount,
  totalMcqCount,
  totalSqlProblemsCount,
) {
  let arr = [];
  if (totalMcqCount > 0) {
    arr.push("MCQ");
  }

  if (totalCodingProblemsCount > 0) {
    arr.push("CODING");
  }

  if (totalSqlProblemsCount > 0) {
    arr.push("SQL");
  }

  return arr;
}
