import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  padding-bottom: 20px;

  > header {
    height: 144px;
    background-color: #28262e;
    width: 100%;
    display: flex;
    align-items: center;
    svg {
      width: 25px;
      height: 25px;
      color: #999591;
      margin-left: 50px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  label {
    cursor: pointer;
    width: 48px;
    height: 48px;
    position: absolute;
    background-color: #ff9000;
    border-radius: 50%;
    border: none;
    right: 0;
    bottom: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: background 0.2s;
    &:hover {
      background: ${shade(0.1, "#ff9000")};
    }

    input {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -80px;
  form {
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin: 10px 0;
      color: #f4ede8;
      text-align: left;
      font-size: 20px;
    }

    a {
      color: #f4ede8;
      margin-top: 20px;
      text-decoration: none;
      margin-top: 20px;
    }
  }
`;
