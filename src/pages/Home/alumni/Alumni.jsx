import React from "react";
import redStar from "../../../assets/Star.png";
import {
  AlumniWrapper,
  AlumniHeader,
  RedStar,
  AlumniHeading,
  RedText,
  AlumniScroll,
  AlumniCard,
  Comment,
  AlumniInfo,
  Avatar,
  Name,
  Role,
  AlumniScrollInner,
} from "./Alumni.styles";
import { testimonialsData } from "./data";

const Alumni = () => {
  return (
    <AlumniWrapper>
      <AlumniHeader>
        <RedStar loading={"lazy"} src={redStar} alt="red star" />
        <AlumniHeading>
          Love from our <RedText>alumni</RedText>
        </AlumniHeading>
      </AlumniHeader>

      <AlumniScroll>
        <AlumniScrollInner>
          {testimonialsData
            .concat(testimonialsData)
            .map((testimonial, index) => (
              <AlumniCard key={index}>
                <Comment>"{testimonial.story}"</Comment>
                <AlumniInfo>
                  <Avatar
                    loading={"lazy"}
                    src={testimonial.imageUrl}
                    alt="alumni avatar"
                  />
                  <div>
                    <Name>{testimonial.name}</Name>
                    <Role>{testimonial.designation}</Role>
                  </div>
                </AlumniInfo>
              </AlumniCard>
            ))}
        </AlumniScrollInner>
      </AlumniScroll>
    </AlumniWrapper>
  );
};

export default Alumni;
