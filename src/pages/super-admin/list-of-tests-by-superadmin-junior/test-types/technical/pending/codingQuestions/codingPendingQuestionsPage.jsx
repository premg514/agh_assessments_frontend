import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodingQuestionPreview from "../../../../../test-list-page/Components/ViewCodingQuestions/CodingQuestionPreview";
import axiosInstance from "../../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import PaginationComponent from "../../../../../../../component/pagination/pagination-component";
import toast from "react-hot-toast";
import FlashoutPageComponent from "../../../../../../../component/flash-out-page/flash-out-page-component";
import ConfirmationComponent from "../../../../../../../component/confirmation/confirmation-component";
import { AppContext } from "../../../../../../../context/AppContext";
import ConfirmationWithTextarea from "../../../../../../../component/confimation-with-textarea/ConfirmationWithTextarea";
import Header from "../../../../../../../component/header/header";
import {
  Section,
  H1,
} from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/style";
import { QuestionsContainer } from "../../../../../../super-admin-junior/test-type-pages/technical/questions/questions-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { sendOTP } from "../../../../../../../utils/functions";
import { Button } from "../../../../../../user/login/user-login-style";
import { BoxButtonsContainer } from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/topicList-style";
import OTP_VERFICATION_FOR_MODAL from "../../../../../../../component/otp-verificatiion/otp-verification-for-modal";
import BulbAnimation from "../../../../../../../component/BulbAnimation";

const TechnicalCodingPendingQuestionsPage = () => {
  const { testId, superAdminJuniorId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { setPopupbox, componentName, setComponentName, setLoading } =
    useContext(AppContext);
  const navigate = useNavigate();

  const updatePageClick = (index) => {
    setCurrentPage(index);
  };
  useEffect(() => {
    const fetchTestQuestionDetails = async (testId) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/createTest/getcodingtestforediting`,
          {
            params: { testId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestInfo(getData.data.getAptitudeTest);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchTestQuestionDetails(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, token]);

  useEffect(() => {
    const fetchTechnicalPendingCodingQuestionsSuperAdminJunior = async (
      testId
    ) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getTechnicalPendingCodingQuestions`,
          {
            params: {
              testId,
              page: currentPage,
              superAdminJuniorId: superAdminJuniorId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(getData.data.codingQuestions);
        setTotalPages(getData?.data?.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchTechnicalPendingCodingQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, superAdminJuniorId, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testInfo) {
    return <BulbAnimation $height={"70vh"} />;
  }

  const handleClickAccept = async () => {
    const isSendOTP = await sendOTP(user.email, toast);
    if (isSendOTP) {
      setComponentName("OTP_VERIFICATION");
      setPopupbox(true);
    }
  };

  const onSubmitOTP = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL +
          "/v1/super-admin-junior" +
          "/approve-coding-questions",
        {
          codingQuestionId: testId,
          superAdminJuniorId: superAdminJuniorId,
          otp: data.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate(-1, { replace: true });
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClickReject = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL +
          "/v1/super-admin-junior" +
          "/reject-coding-questions",
        {
          codingQuestionId: testId,
          superAdminJuniorId: superAdminJuniorId,
          reason: data.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate(-1, { replace: true });
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClickCancel = () => {
    setComponentName(null);
    setPopupbox(false);
  };

  return (
    <div>
      <Header />
      <Section>
        <H1>Pending {testInfo?.type} MCQ's</H1>
        <div>
          <span>{testInfo?.topic}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.subTopic}</span>
        </div>

        <BoxButtonsContainer className="width-fit">
          <Button
            onClick={() => {
              setComponentName("ACCEPT");
              setPopupbox(true);
            }}
          >
            Accept
          </Button>
          <Button
            $primary
            onClick={() => {
              setComponentName("REJECT");
              setPopupbox(true);
            }}
          >
            Reject
          </Button>
        </BoxButtonsContainer>

        <FlashoutPageComponent
          component={
            componentName === "ACCEPT" ? (
              <ConfirmationComponent
                detail={"Have you check every coding question ?"}
                onClick={handleClickAccept}
                handleClickCancel={handleClickCancel}
              />
            ) : componentName === "REJECT" ? (
              <ConfirmationWithTextarea
                name={"reason"}
                handleClickSubmit={handleClickReject}
                handleClickCancel={handleClickCancel}
              />
            ) : componentName === "OTP_VERIFICATION" ? (
              <OTP_VERFICATION_FOR_MODAL
                onSubmit={onSubmitOTP}
                handleClickClose={handleClickCancel}
              />
            ) : null
          }
        />

        <QuestionsContainer>
          {questions.map((question, index) => (
            <div key={index} className="question_box box">
              <CodingQuestionPreview
                question={question}
                questionIndex={index}
              />
            </div>
          ))}
        </QuestionsContainer>
        {questions?.length > 0 ? (
          <div className="page__component">
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageClick={updatePageClick}
            />
          </div>
        ) : null}
      </Section>
    </div>
  );
};

export default TechnicalCodingPendingQuestionsPage;
