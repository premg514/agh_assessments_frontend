import { useEffect, useState, Fragment } from "react";
import { convertFetchedDataToSidebarDesiredFormat } from "../../../../../../super-admin/test-list-page/utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import NoDataFoundPage from "../../../../../../../component/no-data-found/NoDataFound";

import axiosInstance from "../../../../../../../services/apiconnector";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FlexSpaceBetween,
  BoxButtonsContainer,
  FlexColumnContainerSubTopic,
  Button,
  H2,
  H3,
} from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/topicList-style";
import BulbAnimation from "../../../../../../../component/BulbAnimation";

export const SubTopic = ({ navigateRoute, item1 }) => {
  const navigate = useNavigate();
  return (
    <FlexSpaceBetween
      className="border_lock padding_subTopic"
      role="button"
      tabIndex="0"
    >
      <H3 className="work-sans-medium">{item1.title}</H3>

      <BoxButtonsContainer>
        <Button
          className="secondary"
          onClick={() => {
            navigate(navigateRoute);
          }}
        >
          Questions
        </Button>
      </BoxButtonsContainer>
    </FlexSpaceBetween>
  );
};

const TechnicalCodingTopicList = () => {
  const [sidebarData, setSidebarData] = useState(null);
  const [loadingForSidebar, setLoadingForSidebar] = useState(true);
  const [showSubtopic, setShowsubtopic] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const { superAdminJuniorId } = useParams();
  function handleClickSidebarItem(val) {
    setShowsubtopic((prev) => (prev === val ? 0 : val));
  }

  let isObjectEmpty = false;
  if (sidebarData !== null) {
    isObjectEmpty = Object.keys(sidebarData).length === 0;
  }

  useEffect(() => {
    const fetchSidebarData = async () => {
      setLoadingForSidebar(true);
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            "/v1/super-admin-junior" +
            `/getListOfTechnicalCodingQuestionsRejectedTopics`,
          {
            params: {
              superAdminJuniorId: superAdminJuniorId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const structureSidebar = convertFetchedDataToSidebarDesiredFormat(
          getData.data.allTests
        );

        setSidebarData(structureSidebar);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      } finally {
        setLoadingForSidebar(false);
      }
    };
    fetchSidebarData();
  }, [token, superAdminJuniorId]);

  if (loadingForSidebar) {
    return <BulbAnimation $height={"70vh"} />;
  }

  return (
    <div>
      {sidebarData && !isObjectEmpty ? (
        Object.keys(sidebarData).map((key, index) => {
          return (
            <Fragment key={index}>
              <FlexSpaceBetween
                className={`border_lock padding_topic`}
                key={index}
                onClick={() => handleClickSidebarItem(index + 1)}
                role="button"
                tabIndex="0"
                style={{ cursor: "pointer" }}
              >
                <H2 className="work-sans-medium">{key}</H2>
                <FontAwesomeIcon icon={faAngleDown} />
              </FlexSpaceBetween>
              <FlexColumnContainerSubTopic>
                {showSubtopic === index + 1 &&
                  sidebarData[key].map((item1, index1) => {
                    return (
                      <SubTopic
                        item1={item1}
                        key={index1}
                        navigateRoute={`${location.pathname}/${item1.id}/coding`}
                      />
                    );
                  })}
              </FlexColumnContainerSubTopic>
            </Fragment>
          );
        })
      ) : (
        <div>
          <NoDataFoundPage title="No Test Found" description={" "} />
        </div>
      )}
    </div>
  );
};

export default TechnicalCodingTopicList;
