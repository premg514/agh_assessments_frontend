import { useContext } from "react";
import { TestSubmitConfirmationStyle } from "./test-submit-confirmation-style";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../pages/user/test-list-user/style";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// const TestSubmitConfirmationComponent = ({
//   functionCall,
//   loading,
//   loadingStage = "idle",
//   submissionFailed = false,
// }) => {
//   const { setPopupbox, setComponentName } = useContext(AppContext);
//   const getLoadingMessage = () => {
//     switch (loadingStage) {
//       case "slow":
//         return "Still processing. Please don't close this window...";
//       case "very_slow":
//         return "Network is slow. Retrying your submission...";
//       case "submitting":
//       default:
//         return "Submitting your test...";
//     }
//   };
//   return (
//     <TestSubmitConfirmationStyle>
//       <div className="container">
//         <h2 className="detail__style">Important Note !</h2>
//         <p>
//           Before you submit your test, please reviewed all of your answers and
//           are satisfied with your choices?
//         </p>

//         <div className="button__container">
//           <Button disabled={loading} onClick={() => setPopupbox(false)}>
//             Cancel
//           </Button>
//           <Button
//             $bgColor="#FC2947"
//             onClick={async () => {
//               try {
//                 await functionCall();
//                 setPopupbox(false);
//                 setComponentName(null);
//               } catch (e) {
//                 console.error("Submission error:", e);
//                 // Don't close popup — keep it open so user can retry
//               }
//             }}
//             disabled={loading}
//           >
//             {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Confirm"}
//           </Button>
//         </div>
//       </div>
//     </TestSubmitConfirmationStyle>
//   );
// };
const TestSubmitConfirmationComponent = ({
  functionCall,
  loading,
  loadingStage, // undefined for old callers
  submissionFailed, // undefined for old callers
}) => {
  const { setPopupbox, setComponentName } = useContext(AppContext);

  // Detect if parent is opting into the enhanced UX
  // If submissionFailed is passed (even as false), parent is using new UX
  const useEnhancedUX = submissionFailed !== undefined;

  const getLoadingMessage = () => {
    if (loadingStage === "slow")
      return "Still processing. Please don't close this window...";
    if (loadingStage === "very_slow")
      return "Network is slow. Retrying your submission...";
    return null;
  };

  const slowMessage = getLoadingMessage();

  // ENHANCED UX: Show failure + retry screen (only for new callers)
  if (useEnhancedUX && submissionFailed && !loading) {
    return (
      <TestSubmitConfirmationStyle>
        <div className="container">
          <h2 className="detail__style" style={{ color: "#FC2947" }}>
            Submission Failed
          </h2>
          <p>
            We couldn't submit due to a network issue. Your answers are safe.
            Please check your internet and click Retry.
          </p>
          <div className="button__container">
            <Button
              onClick={() => {
                setPopupbox(false);
                setComponentName(null);
              }}
            >
              Cancel
            </Button>
            <Button
              $bgColor="#FC2947"
              onClick={async () => {
                try {
                  await functionCall();
                  setPopupbox(false);
                  setComponentName(null);
                } catch (e) {
                  console.error("Submission error:", e);
                }
              }}
            >
              Retry Submission
            </Button>
          </div>
        </div>
      </TestSubmitConfirmationStyle>
    );
  }

  // DEFAULT UI (works for both old and new callers)
  return (
    <TestSubmitConfirmationStyle>
      <div className="container">
        <h2 className="detail__style">Important Note !</h2>
        <p>
          Before you submit your test, please reviewed all of your answers and
          are satisfied with your choices?
        </p>

        {/* Slow warning only shows for new callers who passed loadingStage */}
        {useEnhancedUX && loading && slowMessage && (
          <p
            style={{
              color: "#FC2947",
              fontSize: "0.9rem",
              marginTop: "10px",
            }}
          >
            {slowMessage}
          </p>
        )}

        <div className="button__container">
          <Button disabled={loading} onClick={() => setPopupbox(false)}>
            Cancel
          </Button>
          <Button
            $bgColor="#FC2947"
            onClick={async () => {
              try {
                await functionCall();
                setPopupbox(false);
                setComponentName(null);
              } catch (e) {
                console.error("Submission error:", e);
                if (!useEnhancedUX) {
                  // OLD BEHAVIOR: close popup on error (matches original)
                  setPopupbox(false);
                  setComponentName(null);
                }
                // NEW BEHAVIOR: keep popup open so user can retry
              }
            }}
            disabled={loading}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Confirm"}
          </Button>
        </div>
      </div>
    </TestSubmitConfirmationStyle>
  );
};
export default TestSubmitConfirmationComponent;
