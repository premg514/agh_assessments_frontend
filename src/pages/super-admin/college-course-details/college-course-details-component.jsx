import { useContext, useEffect, useState } from "react";
import {
  TableRow,
  PageWrapper,
  BackButton,
  TitleContainer,
  Title,
  Actions,
  Content,
  Table,
  CompanyAccessCell,
  Pill,
  TopSection,
} from "./college-course-details-style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-hot-toast";
import Header from "../../../component/header/header";
import axiosInstance from "../../../services/apiconnector";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BulbAnimation from "../../../component/BulbAnimation";
import { Button } from "../../user/login/user-login-style";
import { FiChevronLeft, FiEdit } from "react-icons/fi";
import { differenceInDays, format } from "date-fns";

const CollegeCourseDetailsComponent = () => {
  const { state } = useLocation();
  const { adminId: urlId } = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormdata] = useState([]);
  const navigate = useNavigate();
  const { collegename, setCollegename, Id, setId } = useContext(AppContext);
  const id = urlId || state?.id || Id;
  const collegeName = state?.collegeName ?? collegename;

  useEffect(() => {
    const getCourseAccess = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            "/v1/auth/getAllCourseAccessForSpecificAdmin",
          {
            params: {
              id: id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const courseProviders = res.data.courseProviders;

        setFormdata(courseProviders);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getCourseAccess();
  }, [token, id]);

  return (
    <>
      
      <PageWrapper>
        {loading === true ? (
          <BulbAnimation />
        ) : (
          <>
            <TopSection>
              <BackButton onClick={() => navigate(-1)}>
                <FiChevronLeft /> Back
              </BackButton>
              <TitleContainer>
                <Title>{collegeName}</Title>
                <Actions>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`/add-new-course-access/${id}`, {
                        state: { collegeName: collegeName },
                      });
                    }}
                  >
                    + New Access
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`companies`);
                    }}
                  >
                    Companies
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`/college-course-config-details/${id}`);
                    }}
                  >
                    Configure
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`/mock-interview-scheduled/${id}`);
                    }}
                  >
                    Mock Interview
                  </Button>

                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`lsrw-tests`);
                    }}
                  >
                    Lsrw Tests
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`assessments/technical`, {
                        state: { collegeName, adminId: id },
                      });
                    }}
                  >
                    Technical Assessment
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`assessments/aptitude`, {
                        state: { collegeName, adminId: id },
                      });
                    }}
                  >
                    Aptitude Assessment
                  </Button>
                  <Button
                    className="w-fit"
                    onClick={() => {
                      navigate(`assessments/agh`, {
                        state: { collegeName, adminId: id },
                      });
                    }}
                  >
                    AGH Assessment
                  </Button>
                </Actions>
              </TitleContainer>
            </TopSection>
            <Content>
              <Table>
                <thead>
                  <TableRow>
                    <th>Year</th>
                    <th>Practice Test</th>
                    <th>ATB</th>
                    <th>TTB</th>
                    <th>E-learning</th>
                    <th>ALTB</th>
                    <th>TLTB</th>
                    <th>UG/PG</th>
                    <th>Days Left</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </TableRow>
                </thead>
                <tbody>
                  {formData.map((key, index) => {
                    return (
                      <tr
                        key={index}
                        style={{
                          color:
                            differenceInDays(key.validityTill, new Date()) <= 0
                              ? "red"
                              : "inherit",
                        }}
                      >
                        <td>{key.year}</td>
                        <td>{key.practiceTest}</td>
                        <td>{key.aptitudeTestsBehaviour || "LOCKED"}</td>
                        <td>{key.technicalTestsBehaviour || "LOCKED"}</td>
                        <td>{key.elearningTest}</td>
                        <td>
                          {key.aptitudeELearningTestsBehaviour || "LOCKED"}
                        </td>
                        <td>
                          {key.technicalELearningTestsBehaviour || "LOCKED"}
                        </td>
                        <td>{key.ugorpg}</td>
                        <td>
                          {differenceInDays(key.validityTill, new Date()) +
                            " " +
                            format(key.validityTill, "(dd-MM-yyy)")}
                        </td>
                        <td>
                          <div>
                            {key?.departments
                              ?.filter((Value, index) => index < 3)
                              .map((department, subIndex) => (
                                <Pill key={subIndex} className="output__text">
                                  {department}
                                </Pill>
                              ))}
                            {key?.departments?.length - 3 > 0 ? (
                              <span>+ {key?.departments?.length - 3}</span>
                            ) : null}
                          </div>
                        </td>
                      
                        <td>
                          <button
                            className="edit_btn"
                            onClick={() => {
                              navigate(`/edit-course-access/${key?._id}`, {
                                state: { collegeName: collegeName },
                              });
                            }}
                          >
                            <FiEdit
                              style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Content>
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default CollegeCourseDetailsComponent;
