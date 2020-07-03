import styled from "styled-components";

export const Container = styled.div`
  background-color: peru;
  padding: 10px;
  position: absolute;
  right: 10px;
  top: 60px;
  border-radius: 5px;
`;
export const Select = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;

  button {
    &:first-child {
      border-right: 2px solid black;
      padding-right: 22px;
    }
    font-size: 14px;
    background: transparent;
    border: 0;
  }
`;
