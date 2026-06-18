import React, { useEffect, useMemo, useState } from "react";
import { AGHAssessmentWrapper } from "../styles";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import BulbAnimation from "../../../component/BulbAnimation";
import NoDataFoundPage from "../../../component/no-data-found/NoDataFound";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import axiosInstance from "../../../services/apiconnector";
import AssessmentCard from "../agh-assessment-card/AssessmentCard";

const NotAttendedAssessmentsUser = () => {
  const { token } = useSelector((state) => state.auth);
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");

  const fetchNotAttendedAssessments = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/not-attended`,
      {
        params: {
          page: pageParam,
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["agh-not-attended-assessments", search],
    queryFn: fetchNotAttendedAssessments,
    enabled: !!token,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
     retry: 3,
  });

  const assessments = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 400),
    [],
  );

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <AGHAssessmentWrapper>
      <div style={{ paddingTop: "1rem" }}>
        {assessments.map((item, index) => {
          const isLast = index === assessments.length - 1;

          return (
            <div key={item._id} ref={isLast ? ref : null}>
              <AssessmentCard assessment={item} />
            </div>
          );
        })}
      </div>

      {(isLoading || isFetchingNextPage) && <BulbAnimation $height="200px" />}

      {!isLoading && assessments.length === 0 && (
        <NoDataFoundPage
          title="No Missed Assessments"
          description="Great! You haven't missed any assessments."
        />
      )}
    </AGHAssessmentWrapper>
  );
};

export default NotAttendedAssessmentsUser;
