import { useContext, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../services/apiconnector";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import BulbAnimation from "../../../../component/BulbAnimation";
import NoDataFoundPage from "../../../../component/no-data-found/NoDataFound";
import debounce from "lodash.debounce";
import { intervalToDuration } from "date-fns";
import {
  Wrap,
  Header,
  TitleBlock,
  Title,
  Subtitle,
  Badge,
  StatsRow,
  StatCard,
  StatLabel,
  StatValue,
  Filters,
  FilterLabel,
  FilterBtn,
  TableWrap,
  TableScroll,
  Table,
  Th,
  Tr,
  Td,
  StudentName,
  StudentId,
  RankText,
  PctBarWrap,
  PctBar,
  PctFill,
  PctLabel,
  ViolText,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import FlashoutPageComponent from "../../../../component/flash-out-page/flash-out-page-component";
import ConfirmationComponent from "../../../../component/confirmation/confirmation-component";
import { AppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import { SearchInputContainer } from "../../../admin/list-of-students/list-of-students-style";

function violLevel(v) {
  if (v >= 25) return "high";
  if (v >= 15) return "mid";
  return "low";
}

function rankSuffix(n) {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
}

export default function StudentResults({
  assessmentId,
  maxViolationsAllowed,
  filters = {},
  adminId,
}) {
  return (
    <Wrap>
      <StudentsResultsList
        assessmentId={assessmentId}
        maxViolationsAllowed={maxViolationsAllowed}
        filters={filters}
        adminId={adminId}
      />
    </Wrap>
  );
}

export function ResultsTable({
  results = [],
  maxViolationsAllowed = 50,
  loaderRef,
  isLoading = false,
  isFetchingNextPage = false,
  renderActions,
}) {
  return (
    <TableWrap>
      <TableScroll>
        <Table>
          <colgroup>
            <col style={{ width: "48px" }} />
            <col style={{ width: "160px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "72px" }} />
            <col style={{ width: "64px" }} />
            <col style={{ width: "64px" }} />
            <col style={{ width: "80px" }} />
            <col style={{ width: "80px" }} />
            {renderActions && <col style={{ width: "80px" }} />}
          </colgroup>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Student</Th>
              <Th>Score</Th>
              <Th>Time Taken</Th>
              <Th>Percentage</Th>
              <Th>Correct</Th>
              <Th>Wrong</Th>
              <Th>Skipped</Th>
              <Th>Violations</Th>
              <Th>Status</Th>
              {renderActions && <Th>Actions</Th>}
            </tr>
          </thead>
          <tbody>
            {results.map((s, i) => {
              const pct = s.percentage;
              const { hours, minutes, seconds, milliseconds } =
                intervalToDuration({ start: 0, end: s.timeTakenInMs || 0 });
              const rank = i + 1;

              return (
                <Tr key={s._id || i}>
                  <Td>
                    <RankText rank={rank}>{rankSuffix(rank)}</RankText>
                  </Td>
                  <Td>
                    <StudentName>{s.username}</StudentName>
                    <StudentId>{s.collegeRollNumber || "N/A"}</StudentId>
                  </Td>
                  <Td>
                    <strong>{s.obtainedMarks}</strong>
                    <span style={{ color: "#b0ada6", fontWeight: 400 }}>
                      {" "}
                      / {s.totalMarks}
                    </span>
                  </Td>
                  <Td style={{ color: "#b0ada6", fontWeight: 400 }}>
                    {`${hours || 0}h ${minutes || 0}m ${seconds || 0}s ${milliseconds || 0}ms`}
                  </Td>
                  <Td>
                    <PctBarWrap>
                      <PctBar>
                        <PctFill pct={pct} />
                      </PctBar>
                      <PctLabel pct={pct}>{pct}%</PctLabel>
                    </PctBarWrap>
                  </Td>
                  <Td style={{ color: "#3B6D11", fontWeight: 500 }}>
                    {s.correct}
                  </Td>
                  <Td style={{ color: "#A32D2D", fontWeight: 500 }}>
                    {s.wrong}
                  </Td>
                  <Td style={{ color: "#854F0B" }}>{s.unattempted}</Td>
                  <Td>
                    <ViolText level={violLevel(s.violationsDone)}>
                      {s.violationsDone}/{maxViolationsAllowed}
                    </ViolText>
                  </Td>
                  <Td>
                    <Badge variant={pct >= 70 ? "green" : "red"}>
                      {pct >= 70 ? "Pass" : "Fail"}
                    </Badge>
                  </Td>
                  {renderActions && <Td>{renderActions(s, i)}</Td>}
                </Tr>
              );
            })}
          </tbody>
        </Table>

        {(isLoading || isFetchingNextPage) && <BulbAnimation $height="200px" />}
        {!isLoading && results.length === 0 && (
          <NoDataFoundPage title="No results" description=" " />
        )}
      </TableScroll>

      {loaderRef && <div ref={loaderRef} style={{ minHeight: "1px" }} />}
    </TableWrap>
  );
}

const StudentsResultsList = ({
  assessmentId,
  maxViolationsAllowed = 50,
  filters = {},
  adminId,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");

  const fetchAghAssessmentResults = async ({ pageParam = 1 }) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}/results`,
      {
        params: {
          page: pageParam,
          search,
          ...(filters.department ? { department: filters.department } : {}),
          ...(filters.year ? { year: filters.year } : {}),
          adminId: adminId || "",
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
    queryKey: [
      "agh-assessment-results",
      assessmentId,
      search,
      filters.department || "",
      filters.year || "",
      adminId || "",
    ],
    queryFn: fetchAghAssessmentResults,
    enabled: !!token && !!assessmentId,
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });


  const results = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearch(value), 400),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  if (isError) {
    return <div>something went wrong</div>;
  }

  return (
    <div>
      <SearchInputContainer style={{ marginBottom: "1rem" }}>
        <label htmlFor="search">
          <FontAwesomeIcon icon={faSearch} />
          <input
            id="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </label>
      </SearchInputContainer>

      <ResultsTable
        results={results}
        maxViolationsAllowed={maxViolationsAllowed}
        loaderRef={ref}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        renderActions={(s) => (
          <div className="actions_col">
            {user?.accountType === "Admin" && (
              <ResultDeleteButton resultId={s._id} studentId={s.user} />
            )}
            <button className="view" onClick={() => {}}>
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

const ResultDeleteButton = ({ resultId, studentId }) => {
  const { componentName, setComponentName, setPopupbox, setLoading } =
    useContext(AppContext);
  const { token } = useSelector((state) => state.auth);
  const { assessmentId } = useParams();
  const queryClient = useQueryClient();

  const deleteStudentResult = async (data) => {
    const res = await axiosInstance.put(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}/delete-student-result`,
      {
        studentId: data.studentId,
        resultId: data.resultId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: deleteStudentResult,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["agh-assessment-details", assessmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["agh-assessment-results", assessmentId],
      });
      toast.success(data.data.message || "Result deletion successful");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error(err.response.data.message || "Something went wrong");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleClickCancel = () => {
    setPopupbox(false);
    setComponentName(null);
  };

  const handleClickDelete = (resultId) => {
    setComponentName(`DELETE_USER_RESULT_${resultId}`);
    setPopupbox(true);
  };

  return (
    <>
      {componentName === `DELETE_USER_RESULT_${resultId}` && (
        <FlashoutPageComponent
          component={
            <ConfirmationComponent
              title={"Delete User Result"}
              detail={"Are you sure to detele User Result?"}
              onClick={() => {
                mutate({ resultId, studentId });
              }}
              handleClickCancel={handleClickCancel}
            />
          }
        />
      )}
      <button
        style={{ marginRight: "0.5rem" }}
        className="del"
        onClick={() => {
          handleClickDelete(resultId);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </>
  );
};
