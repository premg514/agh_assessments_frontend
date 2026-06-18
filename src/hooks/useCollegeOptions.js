import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllColleges = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/v1/college/colleges?limit=1000`,
  );
  return (data?.data || []).map((college) => ({
    value: college.name,
    label: college.name,
  }));
};

const useCollegeOptions = () => {
  const { data: collegeOptions = [], isLoading } = useQuery({
    queryKey: ["collegeOptions"],
    queryFn: fetchAllColleges,
    staleTime: 5 * 60 * 1000,
  });

  return { collegeOptions, isLoading };
};

export default useCollegeOptions;
