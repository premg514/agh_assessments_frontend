import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../user/login/user-login-style";
import { TopTitleHeading } from "../admin/common.style";
import { AGHAssessmentWrapper } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import BulbAnimation from "../../component/BulbAnimation";
import NoDataFoundPage from "../../component/no-data-found/NoDataFound";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import axiosInstance from "../../services/apiconnector";
import AGHAssessmentDetails from "./AghAssessmentDetailsCard";
import { useUserId } from "../../hooks/useUserId";
import Select from "react-select";
import { reactSelectTheme } from "../../theme";

const assessmentTypeOptions = [
  { value: "", label: "All Assessment Types" },
  { value: "Main Assessment", label: "Main" },
  { value: "Company Specific Assessment", label: "Company Specific" },
];

const groupTypeOptions = [
  { value: "", label: "All Group Types" },
  { value: "grouped", label: "Grouped" },
  { value: "non-grouped", label: "Non Grouped" },
];

const selectStyles = {
  container: (base) => ({
    ...base,
    minWidth: "240px",
  }),
  control: (base) => ({
    ...base,
    minHeight: "42px",
  }),
};

const AGHAssessments = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { name } = useSelector((state) => state.theme);
  const userId = useUserId();
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedAssessmentType = useMemo(() => {
    const val = searchParams.get("assessmentType") ?? "";
    return (
      assessmentTypeOptions.find((o) => o.value === val) ??
      assessmentTypeOptions[0]
    );
  }, [searchParams]);

  const selectedGroupType = useMemo(() => {
    const val = searchParams.get("groupType") ?? "";
    return groupTypeOptions.find((o) => o.value === val) ?? groupTypeOptions[0];
  }, [searchParams]);

  const setSelectedAssessmentType = (option) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (option?.value) next.set("assessmentType", option.value);
        else next.delete("assessmentType");
        return next;
      },
      { replace: true },
    );
  };

  const setSelectedGroupType = (option) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (option?.value) next.set("groupType", option.value);
        else next.delete("groupType");
        return next;
      },
      { replace: true },
    );
  };

  const fetchAghAssessmentsByAdmin = async ({ pageParam = 1 }) => {
    if (!token) {
      throw new Error("Token missing");
    }
    // console.log("THE TOKEN I AM GETTING IN FRONTEND", token);
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments`,
      {
        params: {
          page: pageParam,
          search,
          userId,
          assessmentType: selectedAssessmentType?.value || "",
          groupType: selectedGroupType?.value || "",
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
    queryKey: [
      "agh-assessment-by-admin",
      search,
      selectedAssessmentType?.value,
      selectedGroupType?.value,
    ],
    queryFn: fetchAghAssessmentsByAdmin,
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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
      }, 400),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  if (isError) {
    return <div>some thing went wrong</div>;
  }

  return (
    <AGHAssessmentWrapper>
      <div className="heading-container">
        <TopTitleHeading>AGH Assessments</TopTitleHeading>
        <div className="assessment-buttons">
          {user?.accountType === "Admin" && (
            <Button
              onClick={() => {
                navigate("create-group-assessment");
              }}
              $bg_color="#E9E9E9"
              $color="#515151"
              className="w-fit"
            >
              <FontAwesomeIcon icon={faPlus} /> Group
            </Button>
          )}

          {user?.accountType === "Admin" && (
            <Button
              onClick={() => {
                navigate("create-assessment");
              }}
              $primary
              className="w-fit"
            >
              <FontAwesomeIcon icon={faPlus} /> Assessment
            </Button>
          )}
        </div>
      </div>

      <div className="assessment-filters">
        <div className="filter-item">
          <label>Assessment Type</label>
          <Select
            options={assessmentTypeOptions}
            value={selectedAssessmentType}
            onChange={(value) =>
              setSelectedAssessmentType(value || assessmentTypeOptions[0])
            }
            placeholder="Select assessment type"
            styles={selectStyles}
            isClearable={false}
            theme={reactSelectTheme(name !== "LIGHT")}
          />
        </div>

        {user.accountType === "Admin" && (
          <div className="filter-item">
            <label>Group Type</label>
            <Select
              options={groupTypeOptions}
              value={selectedGroupType}
              onChange={(value) =>
                setSelectedGroupType(value || groupTypeOptions[0])
              }
              placeholder="Select group type"
              styles={selectStyles}
              isClearable={false}
              theme={reactSelectTheme(name !== "LIGHT")}
            />
          </div>
        )}
      </div>

      <div style={{ paddingTop: "1rem" }}>
        {assessments?.map((item, index) => {
          const isLast = index === assessments.length - 1;

          return (
            <div
              key={item._id}
              style={{ marginBottom: "1rem" }}
              ref={isLast ? ref : null}
            >
              <AGHAssessmentDetails
                handleClickView={(item) =>
                  navigate(
                    item?.type === "group"
                      ? `/agh-assessments/group-view/${item._id}`
                      : `/agh-assessments/view/${item._id}`,
                  )
                }
                handleViewLiveStatus={(item) => {
                  navigate(`/agh-assessments/live-tracking/${item._id}`); //this is live tracking
                }}
                assessment={item}
                onEdit={(item) => navigate(`/agh-assessments/edit/${item._id}`)}
                handleClickCreateCopy={(item) =>
                  navigate(`/agh-assessments/create-copy/${item._id}`)
                }
                handleClickAddAssessmentToGroup={(group) =>
                  navigate("create-group-assessment", {
                    state: {
                      groupId: group._id,
                      groupName: group.name,
                    },
                  })
                }
              />
            </div>
          );
        })}
      </div>

      {(isLoading || isFetchingNextPage) && <BulbAnimation $height="200px" />}

      {!isLoading && assessments.length === 0 && (
        <NoDataFoundPage title="No Data Found" description={" "} />
      )}
    </AGHAssessmentWrapper>
  );
};

export default AGHAssessments;
