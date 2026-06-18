import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AGHAssessmentWrapper } from "../styles";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import BulbAnimation from "../../../component/BulbAnimation";
import NoDataFoundPage from "../../../component/no-data-found/NoDataFound";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import axiosInstance from "../../../services/apiconnector";
import AssessmentCard from "../agh-assessment-card/AssessmentCard";

const AGHScheduledAssessments = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");

  const fetchAghAssessmentsForUser = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/scheduled`,
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

    return res.data; // { data, hasMore }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["agh-assessment-by-user", search],
    queryFn: fetchAghAssessmentsForUser,
    enabled: !!token,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const assessments = data?.pages.flatMap((page) => page.data) || [];

  // Trigger infinite loading
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 400),
    [],
  );

  if (isError) {
    return <div>some thing went wrong</div>;
  }

  return (
    <AGHAssessmentWrapper>
      <div
        style={{
          paddingTop: "1rem",
        }}
      >
        {assessments?.map((item, index) => {
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
          title="No Scheduled Assessments"
          description="You currently have no upcoming or active assessments."
        />
      )}
    </AGHAssessmentWrapper>
  );
};

export default AGHScheduledAssessments;
