import { useState } from "react";
import { HeaderStyle } from "./Style";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../user/login/user-login-style";
import { useSelector } from "react-redux";
import GetInTouch from "./get-in-touch/get-in-touch";
import ContactUsModal from "./contact-us/ContactUs";
import { useRef } from "react";
import HeroSection from "./hero-section/Herosection";
import Empower from "./empower/Empower";
import Impact from "./Impact/Impact";
import Features from "./Features/features";
import Alumni from "./alumni/Alumni";
import Footer from "./footer/Footer";
import FAQ from "./faq/FAQ";
import ThemeToggleButton from "../../component/theme-toggle-button/themeToggleButton";

export const Header = ({ isButtonNeeded }) => {
  const { name } = useSelector((state) => state.theme);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <HeaderStyle>
      <div>
        <Link to={"/"}>
          <img
            src={name === "LIGHT" ? "/agh-logo.png" : "/agh-dark-logo.png"}
            width={150}
            height={50}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex_container">
        {/* <ThemeToggleButton /> */}
        {isButtonNeeded && (
          <div className="button__container">
            {location.pathname == "/userLogin" || (
              <Button
                $bg_color={"inherit"}
                $color={"#FC2947"}
                onClick={() => navigate("/userLogin")}
              >
                Log&nbsp;In
              </Button>
            )}
            {location.pathname == "/userSignup" || (
              <Button onClick={() => navigate("/userSignup")} $primary>
                Get&nbsp;Started
              </Button>
            )}
          </div>
        )}
      </div>
    </HeaderStyle>
  );
};

const Home = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [showContactModal, setShowContactModal] = useState(false);
  const contactRef = useRef(null);
  const featureRef = useRef(null);
  const homeRef = useRef(null);
  if (token && user && Object?.hasOwn(user, "accountType")) {
    if (user?.accountType === "User") {
      return <Navigate to={"/agh-tests"} replace={true} />;
    } else {
      return <Navigate to={"/agh-assessments"} replace={true} />;
    }
  }

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <Header isButtonNeeded={true} />
      <HeroSection ref={homeRef} />
      <Empower />
      <Impact />
      <Features ref={featureRef} />
      <Alumni />

      {showContactModal && (
        <ContactUsModal
          setShowContactModal={setShowContactModal}
          showContactModal={showContactModal}
        />
      )}
      <GetInTouch
        contactRef={contactRef}
        setShowContactModal={setShowContactModal}
      />
      <FAQ />
      <Footer
        scrollToContact={() => scrollToRef(contactRef)}
        scrollToFeature={() => scrollToRef(featureRef)}
        scrollToHome={() => scrollToRef(homeRef)}
      />
    </>
  );
};

export default Home;
