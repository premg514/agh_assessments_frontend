import { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { ListOfCollegeStyle } from "./list-of-colleges-style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../component/header/header";
import axiosInstance from "../../services/apiconnector";
import NoDataFoundPage from "../../component/no-data-found/NoDataFound";
import BulbAnimation from "../../component/BulbAnimation";
import { reactSelectTheme } from "../../theme";

// SuperAdmin entry point for AGH assessments:
// lists colleges and navigates to a college's course-details page,
// from where AGH assessments are assigned / created / edited / scheduled.
const ListOfCollegeComponent = () => {
  const [selectedOption, setSelectedOption] = useState("All Colleges");
  const [api, setApi] = useState("getAllcolleges");
  const { token } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.theme);
  let navigate = useNavigate();

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    if (value === "All Colleges") {
      setApi("getAllcolleges");
    } else {
      setApi("getAlldeactivatedcolleges");
    }
  };

  const fetchAllAdminRequests = async () => {
    const response = await axiosInstance.get(
      import.meta.env.VITE_BASE_URL + "/v1/auth/getalladminrequests",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.getAll;
  };

  const fetchColleges = async (api, token) => {
    const response = await axiosInstance.get(
      import.meta.env.VITE_BASE_URL + `/v1/getUsers/${api}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.getAllColleges;
  };

  const {
    data: adminRequests,
  } = useQuery({
    queryKey: ["allAdminRequests"],
    queryFn: () => fetchAllAdminRequests(),
  });

  const {
    data: colleges,
    isLoading: collegeLoading,
  } = useQuery({
    queryKey: ["colleges", api, token],
    queryFn: () => fetchColleges(api, token),
    enabled: !!adminRequests,
  });

  const moveToCourseDetails = (id, collegeName) => {
    navigate(`/college-course-details/${id}`, {
      state: { id: id, collegeName: collegeName },
    });
  };

  if (collegeLoading) {
    return <BulbAnimation />;
  }

  return (
    <>
      <Header />
      <ListOfCollegeStyle>
        <div className="heading__box">
          <Select
            theme={reactSelectTheme(name === "LIGHT" ? false : true)}
            options={[
              {
                value: "All Colleges",
                label: "All Colleges",
              },
              {
                value: "Deactivated Colleges",
                label: "Deactivated Colleges",
              },
            ]}
            defaultValue={{
              value: selectedOption,
              label: selectedOption,
            }}
            onChange={(value) => {
              handleDropdownChange(value.value);
            }}
          />
          {selectedOption === "All Colleges" ? (
            <h1 className="heading">List Of Colleges</h1>
          ) : (
            <h1 className="heading">List of deactivated colleges</h1>
          )}
        </div>

        {colleges?.length === 0 ? (
          <NoDataFoundPage
            title={"No College Found"}
            description={"No Data Found"}
          />
        ) : (
          <table>
            <thead>
              <tr>
                <th>College</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {colleges?.map((collegeName, collegeIndex) => {
                return (
                  <tr key={collegeIndex}>
                    <td
                      style={{
                        color: adminRequests.find(
                          (request) => request._id === collegeName._id,
                        )
                          ? "#0077FF"
                          : collegeName.deactivateStudents === false
                            ? "green"
                            : "red",
                      }}
                      onClick={() => {
                        if (collegeName.active === true) {
                          moveToCourseDetails(
                            collegeName._id,
                            collegeName.collegeName,
                          );
                        }
                      }}
                    >
                      {collegeName.collegeName}
                    </td>
                    <td>
                      {adminRequests.find(
                        (request) => request._id === collegeName._id,
                      )
                        ? "Pending"
                        : collegeName.active === true
                          ? "True"
                          : collegeName.deactivateStudents === true
                            ? "False"
                            : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </ListOfCollegeStyle>
    </>
  );
};
export default ListOfCollegeComponent;
