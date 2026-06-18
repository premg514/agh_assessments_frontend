import React from "react";
import {
  FooterWrapper,
  LeftSection,
  Logo,
  Title,
  Subtitle,
  SocialIcons,
  IconLink,
  RightSection,
  LinkGroup,
  LinkTitle,
  LinkItem,
  LinkButton,
} from "./Footer.styles";

import {
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../assets/agh_logo_black.png";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { getYear } from "date-fns";

const Footer = ({ scrollToContact, scrollToFeature, scrollToHome }) => {
  const year = getYear(new Date());
  return (
    <FooterWrapper>
      <LeftSection>
        <Logo loading={"lazy"} src={logo} alt="Aptitude Guru Hem Logo" />
        <Title>Aptitude Guru Hem</Title>
        <Subtitle>Transforming Learning, Empowering Success</Subtitle>

        <SocialIcons>
          <IconLink
            href="https://www.instagram.com/aptitudeguruhem?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </IconLink>

          <IconLink
            href="https://www.linkedin.com/company/aptitude-guru-hem/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </IconLink>

          <IconLink
            href="https://x.com/AptitudeGuruHem?t=cTg-4H_OLiGdk_NLTQLdEw&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </IconLink>

          <IconLink
            href="https://youtube.com/@AptitudeGuruHem?si=GKVZfzox05Z5HZ3g"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </IconLink>
        </SocialIcons>

        <Subtitle className="copyright">
          <FontAwesomeIcon icon={faCopyright} /> {year} All Right Reserved By
          Aptitude Guru Hem
        </Subtitle>
      </LeftSection>

      <RightSection>
        <LinkGroup>
          <LinkTitle>Quick&nbsp;Links</LinkTitle>
          <LinkButton onClick={scrollToHome}>Home</LinkButton>
          <LinkButton onClick={scrollToContact}>Contact&nbsp;Us</LinkButton>
          <LinkButton onClick={scrollToFeature}>Features</LinkButton>
        </LinkGroup>

        <LinkGroup>
          <LinkTitle>Support</LinkTitle>
          <LinkItem href="#">Help Center</LinkItem>
          <LinkItem href="#">FAQs</LinkItem>
          <LinkItem href="#">Terms & Condition</LinkItem>
          <LinkItem href="#">Privacy Policy</LinkItem>
        </LinkGroup>
      </RightSection>

    </FooterWrapper>
  );
};

export default Footer;
