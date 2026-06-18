import { useSelector } from "react-redux";

export const useUserId = () => {
  const { user } = useSelector((state) => state.profile);
  return user?.accountType === "JuniorCollegeAdmin"
    ? user.parentAdmin
    : user._id;
};
