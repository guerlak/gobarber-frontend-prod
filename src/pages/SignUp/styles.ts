import styled from "styled-components";
import backImg from "../../assets/sign-up-background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;

  form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin: 30px 0;
      color: #f4ede8;
    }

    a {
      color: #f4ede8;
      margin-top: 20px;
      text-decoration: none;
      margin-top: 20px;
    }
  }

  > a {
    color: #f4ede8;
    margin-top: 20px;
    text-decoration: none;
    margin-top: 30px;
    color: #ff9000;
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${backImg}) no-repeat center;
  background-size: cover;
`;
