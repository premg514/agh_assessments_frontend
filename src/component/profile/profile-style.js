import styled from "styled-components";
export const WallStyle = styled.div`
  position: absolute;
  top: 100%;
  right: 10px;
  transition: all 0.3s ease;
  max-width: 280px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #dbdada;
`;
export const ProfileStyle = styled.div`
  position: relative;
  background-color: #fff;

  .container {
    display: flex;
    flex-direction: column;
  }

  .sub_container {
    padding: 12px 16px;
    display: flex;
    gap: 0.625rem;
    align-items: start;

    &:hover:not(:first-child) {
      background-color: #fafafa;
      cursor: pointer;
    }
  }

  .details_container {
  }

  .capitalize {
    text-transform: capitalize;
  }

  .items-center {
    align-items: center;
  }

  .image__style {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  .text {
    color: #51555b;
    font-size: 16px;
    font-weight: 500;
    word-break: break-all;
  }

  .color-red {
    color: #fc2947;
  }
  .userdetnprogress {
    display: flex;
    justify-content: center;
    gap: 90px;
    padding-top: 50px;
    flex-wrap: wrap;
    font-family: "Work Sans", sans-serif;
  }
  .profilepic {
    width: 150px;
    height: 150px;
  }
  .userdetails {
    display: flex;
    flex-wrap: wrap;
    font-family: "Inter", sans-serif;
    padding-top: 40px;
  }
  .textcont {
    padding-left: 20px;
    padding-top: 15px;
  }
  .username {
    font-size: 24px;
    font-weight: 600;
  }
  .email {
    font-size: 22px;
    font-weight: 300;
    color: #737373;
    padding-top: 10px;
  }
  .college {
    font-size: 22px;
    font-weight: 600;
    color: #737373;
  }
  .progressbar {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    text-align: center;
  }
  .medal {
    height: 125px;
    width: auto;
  }
  .circle {
    width: 160px;
  }
  .progcat {
    height: 80px;
    width: 80px;
  }
  .progtitle {
    font-size: 16px;
    font-weight: 500;
    color: #777575;
  }
  .progcount {
    font-size: 24px;
    font-weight: 500;
  }
  .track1 {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
  .parent_track {
    display: flex;
    justify-content: center;
    gap: 80px;
    padding-top: 20px;
    flex-wrap: wrap;
  }
  .t1 {
    padding-top: 30px;
  }
  .imgncont {
    display: flex;
    width: 233px;
    height: 100px;
    align-items: center;
    gap: 10px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  }
  .skills-container {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    max-width: 625px;
    font-family: "Work Sans", sans-serif;
  }

  .skills-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .skill {
    margin-bottom: 20px;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .skill-name {
    font-weight: 600;
  }

  .skill-level {
    font-weight: 500;
    color: #555;
  }

  .progress-bar {
    width: 100%;
    background: #e5e5ef;
    height: 8px;
    border-radius: 20px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    background: #8c88f3;
    border-radius: 20px 0 0 20px;
  }
`;
