import { saveAs } from "file-saver";
import axiosInstance from "../../services/apiconnector";

const getFileNameFromDisposition = (disposition, fallback) => {
  if (!disposition) return fallback;

  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const fileNameMatch = disposition.match(/filename="?([^"]+)"?/i);
  if (fileNameMatch?.[1]) {
    return fileNameMatch[1];
  }

  return fallback;
};

const safeFileName = (name) =>
  `${String(name || "combined-result")
    .replace(/[\\/?*[\]:"]/g, " ")
    .replace(/\s+/g, "_")
    .slice(0, 80)}.xlsx`;

export const downloadAghGroupCombinedResult = async ({
  groupId,
  groupName,
  token,
}) => {
  const response = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    },
  );

  const fileName = getFileNameFromDisposition(
    response.headers["content-disposition"],
    safeFileName(groupName),
  );

  saveAs(
    new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    fileName,
  );
};
