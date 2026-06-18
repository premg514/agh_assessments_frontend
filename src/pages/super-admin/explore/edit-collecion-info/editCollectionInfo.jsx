import React, { useState, useEffect, useMemo, forwardRef } from "react";
import { BackButton } from "../view-problem-set/styles";
import { EditCollectionStyle } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../user/login/user-login-style";
import { SearchInputContainer } from "../../../admin/list-of-students/list-of-students-style";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/apiconnector";
import NoDataFoundPage from "../../../../component/no-data-found/NoDataFound";
import { useInView } from "react-intersection-observer";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import debounce from "lodash.debounce";
import { DifficultyBadge } from "../../../../component/Practice_portal/ProblemRow/ProblemRow.styles";
import Select from "react-select";
import { reactSelectTheme } from "../../../../theme";
import { useIsThemeDark } from "../../../../hooks/useIsThemeDark";

// for mcq problems.

export const ProblemRow = forwardRef(function ProblemRow(
  { problem, setSelectedProblems, setAllProblems, serialNumber },
  ref,
) {
  return (
    <tr ref={ref}>
      <td>{serialNumber}</td>
      <td>
        <input
          type="checkbox"
          checked={problem?.isSelected}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedProblems((prev) => [...prev, problem]);
              setAllProblems((prev) => {
                return prev.map((value) => {
                  if (value._id === problem._id) {
                    return { ...value, isSelected: true };
                  } else {
                    return value;
                  }
                });
              });
            } else {
              setAllProblems((prev) => {
                return prev.map((value) => {
                  if (value._id === problem._id) {
                    return { ...value, isSelected: false };
                  } else {
                    return value;
                  }
                });
              });
              setSelectedProblems((prev) => {
                return prev.filter((value) => value._id !== problem._id);
              });
            }
          }}
        />
      </td>
      <td>{problem?.title}</td>
      <td>
        <DifficultyBadge difficulty={problem?.difficulty}>
          {problem?.difficulty}
        </DifficultyBadge>
      </td>
      <td className="actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
      </td>
    </tr>
  );
});

export const AllProblemsSection = ({
  selectedProblems,
  setSelectedProblems,
  allProblem,
  setAllProblems,
  token,
  questions_type,
  apiEndPoint = "code/sa/coding-problems",
}) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { problemSetId } = useParams();
  const { ref, inView } = useInView();
  const isDarkTheme = useIsThemeDark();
  const [topicTagOptions, setTopicTagOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectAllLoading, setSelectAllLoading] = useState(false);

  const addIsSeletedFieldAndValue = (arr) => {
    return arr.map((obj) => {
      if (obj?.questionLevel) {
        return {
          _id: obj._id,
          title: obj.question,
          difficulty: obj.questionLevel,
          isSelected: selectedProblems.some((p) => p._id === obj._id),
        };
      } else {
        return {
          ...obj,
          isSelected: selectedProblems.some((p) => p._id === obj._id),
        };
      }
    });
  };

  const fetchProblems = async (
    token,
    search,
    page,
    selectedTopic,
    problemSetId,
  ) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/${apiEndPoint}`,
        {
          params: {
            search: search,
            page: page,
            topic: selectedTopic,
            problemSetId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setHasNextPage(res.data.hasMore);

      let problemsWithIsSelectedField = addIsSeletedFieldAndValue(
        res.data.data,
      );
      setAllProblems((prev) => [...prev, ...problemsWithIsSelectedField]);
    } catch (error) {
      setError("Something went wrong");
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProblems(token, search, page, selectedTopic, problemSetId);
    }
  }, [token, search, page, selectedTopic, problemSetId]);

  const fetchTopicTagsList = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/code/sa/topic-tags`,
        {
          params: {
            type: questions_type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const options = res?.data?.data?.map((item) => ({
        value: item?._id,
        label: item?.name,
      }));
      setTopicTagOptions(options);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage]);

  const handleChangeSearchInput = (e) => {
    setPage(1);
    setAllProblems([]);
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(
    () => debounce(handleChangeSearchInput, 300),
    [],
  );

  const handleGetAllProblems = async () => {
    try {
      setSelectAllLoading(true);
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/sa/all-problems-by-question-type`,
        {
          params: {
            search: search,
            topic: selectedTopic,
            questions_type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setSelectAllLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicTagsList();
  }, [token]);

  useEffect(() => {
    return () => debouncedResults.cancel();
  });

  return (
    <div>
      <h2>All Problems</h2>
      <div className="filter_container">
        <SearchInputContainer>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              id={"search"}
              type={"text"}
              placeholder="Search Question"
              onChange={debouncedResults}
            />
          </label>
        </SearchInputContainer>

        <Select
          placeholder={"Topic"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "50px",
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              width: "150px",
            }),
          }}
          isClearable
          theme={reactSelectTheme(isDarkTheme)}
          options={topicTagOptions}
          onChange={(selectedItem) => {
            setSelectedTopic(selectedItem?.value || "");
            setAllProblems([]);
            setPage(1);
          }}
        />
      </div>

      <div className="problems">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Status</th>
              <th>Problem</th>
              <th>Difficulty</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProblem?.map((problem, index) => {
              const isLastItem = index === allProblem?.length - 1;
              return (
                <ProblemRow
                  key={problem._id}
                  serialNumber={index + 1}
                  problem={problem}
                  ref={isLastItem ? ref : null}
                  setSelectedProblems={setSelectedProblems}
                  setAllProblems={setAllProblems}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="problem_select_footer">
        <div></div>
        <button
          disabled={selectAllLoading || (!search?.trim() && !selectedTopic)}
          className="select-btn"
          onClick={async () => {
            const data = await handleGetAllProblems();
            if (Array.isArray(data)) {
              let problemsWithIsSelectedField = addIsSeletedFieldAndValue(data);
              setAllProblems((prev) => {
                return prev.map((value) => {
                  return problemsWithIsSelectedField.find(
                    (item) => item._id === value._id,
                  )
                    ? { ...value, isSelected: true }
                    : value;
                });
              });
              setSelectedProblems((prev) => {
                const map = new Map();

                // add previous problems
                prev.forEach((p) => {
                  map.set(p._id, p);
                });

                // add new problems (overwrite if exists)
                problemsWithIsSelectedField.forEach((p) => {
                  map.set(p._id, { ...p, isSelected: true });
                });

                return Array.from(map.values());
              });
            }
          }}
        >
          Select All
        </button>
      </div>
    </div>
  );
};

export const AddedProblemRow = ({
  problem,
  serialNumber,
  setSelectedProblems,
  setAllProblems,
  ...props
}) => {
  return (
    <tr {...props}>
      <td>{serialNumber}</td>
      <td>{problem?.title}</td>
      <td>
        <DifficultyBadge difficulty={problem?.difficulty}>
          {problem?.difficulty}
        </DifficultyBadge>
      </td>
      <td className="actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAllProblems((prev) => {
              return prev.map((value) => {
                if (value._id === problem._id) {
                  return { ...value, isSelected: false };
                } else {
                  return value;
                }
              });
            });
            setSelectedProblems((prev) => {
              return prev.filter((value) => value._id !== problem._id);
            });
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};

export const SelectedProblems = ({
  selectedProblems,
  setSelectedProblems,
  setAllProblems,
}) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const isDarkTheme = useIsThemeDark();

  let selectedCount = selectedProblems?.length;

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...selectedProblems];
    const draggedElement = newItems[draggedItem.index];

    // Remove the dragged item
    newItems.splice(draggedItem.index, 1);

    // Insert at new position
    newItems.splice(dropIndex, 0, draggedElement);

    setSelectedProblems(newItems);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      <h2>Selected Problems</h2>
      <div className="filter_container">
        <SearchInputContainer>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              id={"search"}
              type={"text"}
              placeholder="Search Question"
              // onChange={debouncedResults}
            />
          </label>
        </SearchInputContainer>

        <Select
          placeholder={"Topic"}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "50px",
            }),
          }}
          theme={reactSelectTheme(isDarkTheme)}
          options={[]}
        />
      </div>
      <div className="problems">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Problem</th>
              <th>Difficulty</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {selectedProblems?.map((problem, index) => (
              <AddedProblemRow
                key={problem._id}
                serialNumber={index + 1}
                problem={problem}
                setSelectedProblems={setSelectedProblems}
                setAllProblems={setAllProblems}
                draggable
                onDragStart={(e) => handleDragStart(e, problem, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              />
            ))}
          </tbody>
        </table>
        {selectedCount === 0 ? (
          <NoDataFoundPage title={"No Questions added"} description={" "} />
        ) : null}
      </div>
      <div className="problem_select_footer">
        <div>Total Selected: {selectedCount}</div>
        <button
          className="remove-btn"
          type="button"
          onClick={() => {
            setSelectedProblems([]);
            setAllProblems((prev) =>
              prev.map((value) => ({
                ...value,
                isSelected: false,
              })),
            );
          }}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

const EditCollection = () => {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [allProblem, setAllProblems] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { problemSetId, collectionId } = useParams();
  const navigate = useNavigate();

  const [selectedLoading, setSelectedLoading] = useState(true);
  const fetchCollectionProblems = async (token, collectionId) => {
    setSelectedLoading(true);
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/sa/collections/${collectionId}/problems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelectedProblems(res.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setSelectedLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchCollectionProblems(token, collectionId);
    }
  }, [token, collectionId]);

  const [saveLoading, setSaveLoading] = useState(false);

  const handleClickSave = async (data) => {
    setSaveLoading(true);
    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/sa/collections/${collectionId}/problems`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate(-1);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <EditCollectionStyle>
      <BackButton className="work-sans-medium" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
        &nbsp;Back
      </BackButton>

      <div className="layout">
        <div className="content_container">
          {!selectedLoading && (
            <AllProblemsSection
              setSelectedProblems={setSelectedProblems}
              selectedProblems={selectedProblems}
              token={token}
              allProblem={allProblem}
              setAllProblems={setAllProblems}
              questions_type={"CODING"}
            />
          )}
        </div>
        <div className="content_container">
          <SelectedProblems
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            setAllProblems={setAllProblems}
          />
        </div>
      </div>

      <Button
        onClick={() => {
          if (selectedProblems.length > 0) {
            handleClickSave(selectedProblems);
          } else {
            toast.error("Selected at least one problem");
          }
        }}
        disabled={saveLoading}
        className="w-fit save-btn"
        $primary
      >
        Save
      </Button>
    </EditCollectionStyle>
  );
};

export default EditCollection;
