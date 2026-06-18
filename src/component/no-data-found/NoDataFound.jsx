import React from "react";
import {
  NoDataFoundContainer,
  MessageBox,
  Heading,
  Description,
} from "./NoDataFound.style";

const NoDataFoundPage = ({ title, description }) => {
  return (
    <NoDataFoundContainer>
      <MessageBox>
        <Heading>{title || "No New Requests"}</Heading>
        <Description>
          {description ||
            "You're all caught up! There are no new requests at the moment."}
        </Description>
      </MessageBox>
    </NoDataFoundContainer>
  );
};

// Can we give refresh button ?

export default NoDataFoundPage;
