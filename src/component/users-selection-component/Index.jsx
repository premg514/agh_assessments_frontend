import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/apiconnector";
import BulbAnimation from "../BulbAnimation";
import { useSelector } from "react-redux";
import { SearchInputContainer } from "../../pages/admin/list-of-students/list-of-students-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { reactSelectTheme } from "../../theme";
import { useIsThemeDark } from "../../hooks/useIsThemeDark";
import { departmentOptions } from "../../data/departmentData";
import Select from "react-select";
import {
  UsersSelectionStyle,
  TableWrapper,
  StyledTable,
  TableHead,
  Th,
  Tr,
  Td,
  CheckboxCell,
  LoaderRow,
} from "./styles";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import NoDataFoundPage from "../no-data-found/NoDataFound";

const yearOptions = [
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
  {
    value: "2027",
    label: "2027",
  },
  {
    value: "2028",
    label: "2028",
  },
  {
    value: "2029",
    label: "2029",
  },
  {
    value: "2030",
    label: "2030",
  },
  {
    value: "2031",
    label: "2031",
  },
  {
    value: "2032",
    label: "2032",
  },
  {
    value: "2033",
    label: "2033",
  },
  {
    value: "2034",
    label: "2034",
  },
  {
    value: "2035",
    label: "2035",
  },
  {
    value: "2036",
    label: "2036",
  },
];

const UgOrPgOptions = [
  {
    value: "UG",
    label: "UG",
  },
  {
    value: "PG",
    label: "PG",
  },
];

const UsersSelection = ({
  collegeName,
  selectedUsers,
  setSelectedUsers,
  extraFilters = {},
  apiUrl = "/v1/auth/students",
  showCollegeFilter = false,
  collegeOptions: collegeOptionsProp,
  excludedUserIds = [],
}) => {
  // College list is only used by the optional `showCollegeFilter` dropdown,
  // which no caller enables in this AGH-only project. Fall back to the prop (or
  // an empty list) instead of fetching from a non-existent /college endpoint.
  const collegeOptions = collegeOptionsProp ?? [];
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [year, setYear] = useState("");
  const [ugOrPg, setUgOrPg] = useState("");
  const isDarkTheme = useIsThemeDark();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const adminId = user._id;

  const excludedUserIdSet = new Set(
    excludedUserIds.map((id) => id?.toString()).filter(Boolean),
  );

  const isExcludedStudent = (student) =>
    excludedUserIdSet.has(student?._id?.toString());

  const getFilterParams = ({
    searchValue = search,
    collegeValues = colleges,
    departmentValues = departments,
    batchValues = batches,
    yearValue = year,
    ugOrPgValue = ugOrPg,
  } = {}) => ({
    search: searchValue,
    colleges: collegeValues?.map((college) => college.value),
    departments: departmentValues?.map((d) => d.value),
    batches: batchValues?.map((b) => b.value),
    year: yearValue?.value,
    ugOrPg: ugOrPgValue?.value,
    collegeName:
      showCollegeFilter && collegeValues?.length > 0
        ? ""
        : collegeName || user.collegeName,
  });

  const fetchStudents = async ({ pageParam = 1, queryKey }) => {
    const [
      _key,
      searchValue,
      collegeValues,
      departmentValues,
      yearValue,
      batchValues,
      ugOrPgValue,
      queryExtraFilters,
    ] = queryKey;

    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}${apiUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: pageParam,
          ...getFilterParams({
            searchValue,
            collegeValues,
            departmentValues,
            batchValues,
            yearValue,
            ugOrPgValue,
          }),
          ...queryExtraFilters,
        },
      },
    );

    return res.data;
  };

  const fetchBatches = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/admin-batch/getbatches-of-dropdown`,
      {
        params: {
          adminId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data;
  };

  const handleSelect = (student) => {
    if (isExcludedStudent(student)) return;

    const exists = selectedUsers.find((u) => u._id === student._id);

    if (exists) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== student._id));
    } else {
      setSelectedUsers([...selectedUsers, student]);
    }
  };

  const handleSelectAll = async () => {
    try {
      toast.loading("Please wait...");
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}${apiUrl}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...getFilterParams(),
            ...extraFilters,
            selectAll: true,
          },
        },
      );
      toast.dismiss();
      toast.success("Selection Successful");
      setSelectedUsers(
        (res.data.students || []).filter(
          (student) => !isExcludedStudent(student),
        ),
      );
    } catch (err) {
      toast.dismiss();
      toast.error("Selection Failed");
      console.error("Select all failed", err);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: fetchedBatches,
    isLoading: isLoadingBatches,
    error: batchesError,
  } = useQuery({
    queryKey: ["batches", adminId],
    queryFn: fetchBatches,
  });

  const {
    data: students,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "users",
      search,
      colleges,
      departments,
      year,
      batches,
      ugOrPg,
      extraFilters,
    ],
    queryFn: fetchStudents,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination?.nextPage ?? undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    <BulbAnimation />;
  }

  if (error) {
    <div>Something went wrong</div>;
  }

  const batchOptions =
    fetchedBatches?.map((batch) => ({
      value: batch.id,
      label: batch.name,
    })) || [];

  const studentList = (
    students?.pages?.flatMap((page) => page.students) || []
  ).filter((student) => !isExcludedStudent(student));

  const thStyle = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontWeight: "600",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
  };

  return (
    <UsersSelectionStyle>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <SearchInputContainer>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              id="search"
              type="text"
              placeholder="Search students..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </SearchInputContainer>

        {showCollegeFilter && (
          <Select
            isMulti
            placeholder="College"
            isClearable
            value={colleges}
            theme={reactSelectTheme(isDarkTheme)}
            options={collegeOptions}
            onChange={(selected) => {
              setColleges(selected || []);
            }}
          />
        )}

        <Select
          isMulti
          placeholder="Department"
          isClearable
          value={departments}
          theme={reactSelectTheme(isDarkTheme)}
          options={departmentOptions}
          onChange={(selected) => {
            setDepartments(selected || []);
          }}
        />

        <Select
          placeholder="Year"
          isClearable
          value={year}
          theme={reactSelectTheme(isDarkTheme)}
          options={yearOptions}
          onChange={(selected) => {
            setYear(selected);
          }}
        />

        <Select
          placeholder="Ug or Pg"
          isClearable
          value={ugOrPg}
          theme={reactSelectTheme(isDarkTheme)}
          options={UgOrPgOptions}
          onChange={(selected) => {
            setUgOrPg(selected);
          }}
        />

        <Select
          placeholder="Batches"
          isMulti
          isClearable
          isLoading={isLoadingBatches}
          value={batches}
          theme={reactSelectTheme(isDarkTheme)}
          options={batchOptions}
          onChange={(selected) => {
            setBatches(selected || []);
          }}
        />
      </div>
      <div style={{ overflowX: "auto", height: "400px" }}>
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <tr>
                <Th></Th>
                <Th>Name</Th>
                <Th>Email</Th>
                {showCollegeFilter && <Th>College</Th>}
                <Th>Roll Number</Th>
                <Th>Department</Th>
                <Th>Year</Th>
                <Th>UG/PG</Th>
              </tr>
            </TableHead>

            <tbody>
              {studentList.map((student) => {
                const isSelected = selectedUsers.some(
                  (u) => u._id === student._id,
                );

                return (
                  <Tr key={student._id}>
                    <CheckboxCell onClick={() => handleSelect(student)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelect(student)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </CheckboxCell>

                    <Td>
                      {student.firstName} {student.lastName}
                    </Td>

                    <Td>{student.email}</Td>

                    {showCollegeFilter && (
                      <Td>{student.collegeName || "N/A"}</Td>
                    )}

                    <Td>{student.collegeRollNumber || "N/A"}</Td>

                    <Td>{student.department}</Td>

                    <Td>{student.year}</Td>

                    <Td>{student.ugOrPg}</Td>
                  </Tr>
                );
              })}

              <LoaderRow ref={ref}>
                <td colSpan="8">
                  {isFetchingNextPage ? "Loading more students..." : ""}
                </td>
              </LoaderRow>
            </tbody>
          </StyledTable>
        </TableWrapper>
        {studentList?.length === 0 && (
          <NoDataFoundPage title={"No Students found"} description={" "} />
        )}
      </div>

      <div className="footer">
        <div>
          <div>Selected : {selectedUsers.length}</div>
        </div>
        <div className="buttons_container">
          <button
            className="w-fit select-btn"
            type="button"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button
            className="w-fit remove-btn"
            type="button"
            disabled={selectedUsers?.length === 0}
            onClick={() => {
              setSelectedUsers([]);
              toast.success("Removed Selected Students");
            }}
          >
            Remove All
          </button>
        </div>
      </div>
    </UsersSelectionStyle>
  );
};

export default UsersSelection;
