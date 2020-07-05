import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  width: 100%;
`;
export const Header = styled.header`
  padding: 32px 0;
  background: "#28262e";
`;
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;

  > img {
    height: 5em;
  }

  > button {
    margin-left: auto;
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 800px) {
    padding: 20px;
    > img {
      width: 7em;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  @media (max-width: 800px) {
    padding: 20px;
    margin-left: 15px;
    > img {
      width: 7em;
    }
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.7;
      }
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  padding: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    max-width: 780px;
    margin: 0;
  }
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;

    span {
      position: relative;
    }
    span + span::before {
      content: "";
      width: 1px;
      height: 10px;
      border-left: 1px solid #ff9000;
      margin: 0 8px;
    }
  }

  @media (max-width: 800px) {
    margin-right: 0px;
    max-width: 100%;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      content: "";
      background: #ff9000;
      top: 10%;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: "fff";
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.aside`
  margin-top: 25px;
  font-size: 20px;
  line-height: 26px;
  border-bottom: 1px solid #3e3b47;
  display: block;
  padding-bottom: 16px;
  margin-bottom: 16px;

  > p {
    color: grey;
    font-size: 18px;
  }
`;

export const Appointment = styled.aside`
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  & + div {
    margin-top: 14px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    font-size: 16px;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    flex: 1;

    img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: "fff";
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  @media (max-width: 800px) {
    width: 90%;
    .DayPicker-Month {
      width: 0px;
    }
  }

  DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
    @media (max-width: 800px) {
    }
  }

  .DayPicker-Caption {
    color: #999;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
    @media (max-width: 400px) {
      width: 20px;
      height: 20px;
    }
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, "#3e3b47")};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
