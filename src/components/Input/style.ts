import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: string;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border: 2px solid #232129;
  border-radius: 3px;
  padding: 10px;
  width: 100%;
  color: #ccc;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border: 1px solid #ff9000;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  ${(props) =>
    props.isError &&
    css`
      border: 1px solid red;
    `}

  input {
    background: transparent;
    color: #ccc;
    flex: 1;
    border: 0;
    padding: 5px;

    &::placeholder {
      color: #999;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.div`
  color: red;
  margin: 10px;
`;
