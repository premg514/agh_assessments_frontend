import { useSelector } from "react-redux";

export const useIsThemeDark = () => {
  const themeName = useSelector((state) => state.theme.name);
  return themeName === "DARK" ? true : false;
};
