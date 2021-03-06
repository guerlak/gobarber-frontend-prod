import styled, { css } from "styled-components";

interface ToastProp {
  type?: "success" | "error" | "default";
  hasDescription: boolean;
}

const toastTypes = {
  default: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;
export const Toast = styled.div<ToastProp>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 800px) {
    /* width: 20%; */
  }

  display: flex;

  & + div {
    margin-top: 10px;
  }

  ${(props) => toastTypes[props.type || "default"]}
  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;
    `} 


  svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
    }
  }

  button {
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    color: red;
    padding: 10px;
    color: inherit;
  }
`;
