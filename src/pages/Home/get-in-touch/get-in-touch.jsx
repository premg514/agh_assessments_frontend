import GetInTouchImage from "../../../assets/get-in-touch.jpg";
import {
  Wrapper,
  Container,
  TextSection,
  Title,
  Description,
  Button,
  ImageSection,
} from "./get-in-touch-style";

const GetInTouch = ({ contactRef, setShowContactModal }) => {
  return (
    <Wrapper ref={contactRef}>
      <Container>
        <TextSection>
          <Title>GET IN TOUCH</Title>
          <Description>
            Have questions or feedback? We're here to help. Send us a message
            and we'll respond soon.
          </Description>
          <Button
            onClick={() => {
              setShowContactModal(true);
            }}
          >
            Contact Us
          </Button>
        </TextSection>
        <ImageSection>
          <div className="blob"></div>
          <img loading={"lazy"} src={GetInTouchImage} alt="Get in Touch" />
        </ImageSection>
      </Container>
    </Wrapper>
  );
};

export default GetInTouch;
