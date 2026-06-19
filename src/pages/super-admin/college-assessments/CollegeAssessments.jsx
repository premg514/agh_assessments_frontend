import React, { useEffect, useState, useContext } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FiChevronLeft,
  FiPlus,
  FiCalendar,
  FiClock,
  FiCopy,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../services/apiconnector";
import BulbAnimation from "../../../component/BulbAnimation";
import { AppContext } from "../../../context/AppContext";
import FlashoutPageComponent from "../../../component/flash-out-page/flash-out-page-component";
import ConfirmationComponent from "../../../component/confirmation/confirmation-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Layout,
  HeaderRow,
  BackButton,
  Meta,
  Tabs,
  TabButton,
  Section,
  SectionHeader,
  ActionBar,
  AssessmentGrid,
  AssessmentCard,
  CardActions,
  Input,
  PaginationBar,
  PaginationButton,
  PaginationStatus,
  DeleteConfirmationHint,
  DeleteConfirmationInput,
} from "./CollegeAssessments.styles";
import { Button } from "../../user/login/user-login-style";

const CollegeAssessments = () => {
  const { adminId, type } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => state.auth);
  const { popupbox, setPopupbox, componentName, setComponentName } =
    useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const tabParam = searchParams.get("tab") || "assigned";
  const pageParam = Number(searchParams.get("page") || 1);
  const creatorAdminId = searchParams.get("creatorAdminId") || "";
  const [activeTab, setActiveTab] = useState(tabParam);

  const [collegeData, setCollegeData] = useState(null);
  const [confirmDeleteData, setConfirmDeleteData] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const [persistentCollegeName, setPersistentCollegeName] = useState(
    state?.collegeName || "",
  );

  // This is an AGH-only project. The `:type` route param must always be "agh";
  // any other value (e.g. a manually-typed /assessments/technical URL) is sent
  // back to the college page so the non-AGH code paths can never run.
  const isAghType = type === "agh";

  useEffect(() => {
    if (type && !isAghType) {
      navigate(`/college-course-details/${adminId}`, { replace: true });
    }
  }, [type, isAghType, adminId, navigate]);

  const fetchCollegeData = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/superadmin-assessments/college/${adminId}?type=${type}&tab=${tabParam}&search=${search}&page=${pageParam}&limit=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.data.success) {
        return res.data.data;
      }
      return null;
    } catch (error) {
      toast.error("Failed to fetch college assessments");
      return null;
    }
  };

  const fetchGlobalData = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/superadmin-assessments/${type}?adminId=${adminId}&search=${search}&creatorAdminId=${creatorAdminId}&page=${pageParam}&limit=12`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    } catch (error) {
      toast.error("Failed to fetch global assessments");
      return [];
    }
  };

  const collegeAssessmentsQuery = useQuery({
    queryKey: [
      "superadmin-college-assessments",
      adminId,
      type,
      tabParam,
      pageParam,
      token,
      search,
    ],
    queryFn: fetchCollegeData,
    enabled: Boolean(token && adminId && type && tabParam !== "available"),
  });

  const availableAssessmentsQuery = useQuery({
    queryKey: [
      "superadmin-available-assessments",
      adminId,
      type,
      search,
      creatorAdminId,
      pageParam,
      token,
    ],
    queryFn: fetchGlobalData,
    enabled: Boolean(token && adminId && type && tabParam === "available"),
  });

  const activeCollegeData = collegeAssessmentsQuery.data || collegeData;
  const globalData = availableAssessmentsQuery.data?.data || [];
  const pagination =
    tabParam === "available"
      ? availableAssessmentsQuery.data?.pagination
      : activeCollegeData?.pagination;
  const loading =
    tabParam === "available"
      ? availableAssessmentsQuery.isLoading
      : collegeAssessmentsQuery.isLoading;

  useEffect(() => {
    if (tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [activeTab, tabParam]);

  useEffect(() => {
    if (collegeAssessmentsQuery.data) {
      setCollegeData(collegeAssessmentsQuery.data);
      if (collegeAssessmentsQuery.data.collegeName) {
        setPersistentCollegeName(collegeAssessmentsQuery.data.collegeName);
      }
    }
  }, [collegeAssessmentsQuery.data]);

  const invalidateAssessmentQueries = () => {
    queryClient.invalidateQueries({
      queryKey: ["superadmin-college-assessments"],
    });
    queryClient.invalidateQueries({
      queryKey: ["superadmin-available-assessments"],
    });
  };

  const deleteAGHAssessmentMutation = useMutation({
    mutationFn: (assessmentId) =>
      axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: () => {
      toast.success("Assessment deleted successfully");
      setConfirmDeleteData(null);
      setDeleteConfirmText("");
      setPopupbox(false);
      invalidateAssessmentQueries();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete assessment",
      );
    },
  });

  // For AGH: navigate to dedicated edit page instead of opening a modal
  const handleEditAssignedClick = (item) => {
    const encodedCollegeName = encodeURIComponent(persistentCollegeName || "");
    if (item.isGlobal) {
      // Global test — use assign-edit to create a local copy
      navigate(
        `/college-course-details/${adminId}/assessments/agh/edit/${item._id}?mode=assign-edit&collegeName=${encodedCollegeName}`,
      );
    } else {
      // Local copy — edit directly
      navigate(
        `/college-course-details/${adminId}/assessments/agh/edit/${item._id}?mode=edit-assigned&collegeName=${encodedCollegeName}`,
      );
    }
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab, search, creatorAdminId, page: "1" });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams({
      tab: tabParam,
      search: value,
      creatorAdminId,
      page: "1",
    });
  };

  const handlePageChange = (nextPage) => {
    setSearchParams({
      tab: tabParam,
      search,
      creatorAdminId,
      page: String(nextPage),
    });
  };

  useEffect(() => {
    if (tabParam === "scheduled") {
      setSearchParams(
        { tab: "assigned", search, creatorAdminId, page: "1" },
        { replace: true },
      );
    }
  }, [tabParam, search, creatorAdminId, setSearchParams]);

  const getAssignedItems = () => {
    if (!activeCollegeData) return [];
    return activeCollegeData.agh || [];
  };

  const getSourceItems = () => {
    if (tabParam === "available") {
      return globalData || [];
    }
    return getAssignedItems();
  };

  const isAssigned = (id) => {
    const assigned = getAssignedItems();
    return assigned.some((item) => item._id === id);
  };

  const flashoutpageFunction = () => {
    switch (componentName) {
      case "confirm-delete-agh":
        return (
          <ConfirmationComponent
            title="Delete Confirmation"
            detail="Do you want to delete this assessment? Note: Results regarding this test will also be deleted."
            confirmDisabled={
              deleteConfirmText !== "Delete" ||
              deleteAGHAssessmentMutation.isPending
            }
            confirmLabel={
              deleteAGHAssessmentMutation.isPending ? "Deleting..." : "Delete"
            }
            handleClickCancel={() => {
              setConfirmDeleteData(null);
              setDeleteConfirmText("");
              setPopupbox(false);
            }}
            onClick={() => {
              if (confirmDeleteData?.id) {
                deleteAGHAssessmentMutation.mutate(confirmDeleteData.id);
              }
            }}
          >
            <DeleteConfirmationHint>
              Type Delete to enable the delete button.
            </DeleteConfirmationHint>
            <DeleteConfirmationInput
              autoFocus
              placeholder="Delete"
              value={deleteConfirmText}
              onChange={(event) => setDeleteConfirmText(event.target.value)}
            />
          </ConfirmationComponent>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (popupbox === false) {
      invalidateAssessmentQueries();
    }
  }, [popupbox, tabParam]);

  if (!isAghType) return null;

  return (
    <>
      <Layout>
        <FlashoutPageComponent component={flashoutpageFunction()} />
        <HeaderRow>
          <div>
            <BackButton
              onClick={() => navigate(`/college-course-details/${adminId}`)}
            >
              <FiChevronLeft /> Back
            </BackButton>
            <div style={{ marginTop: "16px" }}>
              <h1 style={{ margin: 0, fontSize: "24px", color: "#101828" }}>
                AGH Assessments
              </h1>
              <Meta>{persistentCollegeName || "Loading..."}</Meta>
            </div>
          </div>
          <ActionBar>
            <Button
              onClick={() => {
                const encodedCollegeName = encodeURIComponent(
                  persistentCollegeName || "",
                );
                navigate(
                  `/agh-assessments/create-assessment?adminId=${adminId}&collegeName=${encodedCollegeName}`,
                );
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
              }}
            >
              <FiPlus /> Create New AGH
            </Button>
          </ActionBar>
        </HeaderRow>

        <Tabs>
          <TabButton
            className={tabParam === "assigned" ? "active" : ""}
            onClick={() => handleTabChange("assigned")}
          >
            Assigned
          </TabButton>
          <TabButton
            className={tabParam === "available" ? "active" : ""}
            onClick={() => handleTabChange("available")}
          >
            Available Assessments
          </TabButton>
        </Tabs>

        <Section>
          {tabParam === "available" && (
            <SectionHeader>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flex: 1,
                }}
              >
                <Input
                  placeholder="Search assessments..."
                  value={search}
                  onChange={handleSearchChange}
                  style={{ maxWidth: "300px", padding: "8px 12px" }}
                />
              </div>
            </SectionHeader>
          )}

          {loading ? (
            <BulbAnimation />
          ) : (
            <>
              <AssessmentGrid>
                {getSourceItems().map((item, index) => (
                  <AssessmentCard key={`${item._id}-${index}`}>
                    {tabParam === "assigned" && (
                      <button
                        className="unassign-btn"
                        title="Delete Assessment"
                        onClick={() => {
                          setConfirmDeleteData({ id: item._id });
                          setDeleteConfirmText("");
                          setComponentName("confirm-delete-agh");
                          setPopupbox(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                    <h3>{item.topic || item.name || "Untitled Assessment"}</h3>
                    <Meta style={{ fontSize: "12px" }}>
                      {item.subTopic || (item.type && `Type: ${item.type}`)}
                    </Meta>
                    {tabParam === "available" && (
                      <Meta style={{ fontSize: "12px" }}>
                        Created by:{" "}
                        {item.creatorLabel ||
                          (item.createdBy === "superadmin"
                            ? "Super Admin"
                            : "College Admin")}
                      </Meta>
                    )}

                    {item.startDateTime && (
                        <div
                          style={{
                            marginTop: "12px",
                            fontSize: "13px",
                            color: "#475467",
                          }}
                        >
                          <div>
                            <FiCalendar
                              style={{
                                verticalAlign: "middle",
                                marginRight: "4px",
                              }}
                            />
                            {new Date(item.startDateTime).toLocaleString()}
                          </div>
                          <div style={{ marginTop: "4px" }}>
                            <FiClock
                              style={{
                                verticalAlign: "middle",
                                marginRight: "4px",
                              }}
                            />
                            Duration: {item.duration} mins
                          </div>
                        </div>
                      )}

                    <CardActions>
                      {tabParam === "available" && (
                        <Button
                          disabled={isAssigned(item._id)}
                          onClick={() => {
                            const encodedCollegeName = encodeURIComponent(
                              persistentCollegeName || "",
                            );
                            navigate(
                              `/agh-assessments/assign-to-college/${item._id}?adminId=${adminId}&collegeName=${encodedCollegeName}`,
                            );
                          }}
                          style={{
                            padding: "6px 12px",
                            fontSize: "13px",
                          }}
                        >
                          {isAssigned(item._id) ? "Assigned" : "Assign to College"}
                        </Button>
                      )}

                      {tabParam === "assigned" &&
                        item.createdBy !== "admin" && (
                          <Button
                            onClick={() => handleEditAssignedClick(item)}
                            style={{
                              padding: "6px 12px",
                              fontSize: "13px",
                              background: "#fffaeb",
                              color: "#b54708",
                              border: "1px solid #fedf89",
                            }}
                          >
                            Edit
                          </Button>
                        )}

                      {tabParam === "assigned" && (
                        <>
                          <Button
                            onClick={() => {
                              const encodedCollegeName = encodeURIComponent(
                                persistentCollegeName || "",
                              );
                              navigate(
                                `/agh-assessments/create-copy/${item._id}?adminId=${adminId}&collegeName=${encodedCollegeName}`,
                              );
                            }}
                            style={{
                              padding: "6px 12px",
                              fontSize: "13px",
                              background: "transparent",
                              color: "#475467",
                              border: "1px solid #d0d5dd",
                            }}
                          >
                            <FiCopy style={{ marginRight: "4px" }} />
                            Create Copy
                          </Button>

                          <Button
                            onClick={() => {
                              const encodedCollegeName = encodeURIComponent(
                                persistentCollegeName || "",
                              );

                              const route = `/agh-assessments/view/${item._id}?adminId=${adminId}&collegeName=${encodedCollegeName}`;
                              navigate(route);
                            }}
                            style={{
                              padding: "6px 12px",
                              fontSize: "13px",
                              background: "transparent",
                              color: "#475467",
                              border: "1px solid #d0d5dd",
                            }}
                          >
                            Details
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </AssessmentCard>
                ))}
              </AssessmentGrid>

              {getSourceItems().length === 0 && !loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px dashed #eaecf0",
                    marginTop: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      marginBottom: "16px",
                      color: "#98a2b3",
                    }}
                  >
                    <FiPlus style={{ opacity: 0.5 }} />
                  </div>
                  <h3 style={{ margin: "0 0 8px 0", color: "#101828" }}>
                    No Assessments Found
                  </h3>
                  <p
                    style={{
                      color: "#667085",
                      maxWidth: "400px",
                      margin: "0 auto",
                    }}
                  >
                    {tabParam === "assigned"
                      ? "No assessments have been assigned to this college yet. Switch to the 'Available' tab to assign some."
                      : tabParam === "scheduled"
                        ? "There are no scheduled instances of this assessment. Click 'Schedule' on an assigned test to get started."
                        : "We couldn't find any assessments matching your criteria in the global library."}
                  </p>
                </div>
              )}

              {pagination && pagination.totalPages > 1 && (
                <PaginationBar>
                  <PaginationButton
                    disabled={!pagination.hasPrevPage}
                    onClick={() => handlePageChange(Math.max(1, pageParam - 1))}
                  >
                    Previous
                  </PaginationButton>
                  <PaginationStatus>
                    Page {pagination.page} of {pagination.totalPages}
                  </PaginationStatus>
                  <PaginationButton
                    disabled={!pagination.hasNextPage}
                    onClick={() => handlePageChange(pageParam + 1)}
                  >
                    Next
                  </PaginationButton>
                </PaginationBar>
              )}
            </>
          )}
        </Section>
      </Layout>
    </>
  );
};

export default CollegeAssessments;
