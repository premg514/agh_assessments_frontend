import React, { useEffect } from "react";
import { AGHAssessmentWrapper } from "../styles";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import BulbAnimation from "../../../component/BulbAnimation";
import NoDataFoundPage from "../../../component/no-data-found/NoDataFound";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/apiconnector";
import CompletedAssessmentCard from "../agh-assessment-card/CompletedAssessmentCard";

const CompletedAssessmentsUser = () => {
  const { token } = useSelector((state) => state.auth);
  const { ref, inView } = useInView();

  const fetchCompletedAssessments = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/completed`,
      {
        params: {
          page: pageParam,
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
    queryKey: ["agh-completed-assessments"],
    queryFn: fetchCompletedAssessments,
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

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <AGHAssessmentWrapper>
      <div style={{ paddingTop: "1rem" }}>
        {assessments.map((item, index) => {
          const isLast = index === assessments.length - 1;

          return (
            <div
              key={item._id}
              style={{ marginBottom: "1rem" }}
              ref={isLast ? ref : null}
            >
              <CompletedAssessmentCard assessment={item} />
            </div>
          );
        })}
      </div>

      {(isLoading || isFetchingNextPage) && <BulbAnimation $height="200px" />}

      {!isLoading && assessments.length === 0 && (
        <NoDataFoundPage
          title="No Completed Tests"
          description="You haven't completed any assessments yet."
        />
      )}
    </AGHAssessmentWrapper>
  );
};

export default CompletedAssessmentsUser;
