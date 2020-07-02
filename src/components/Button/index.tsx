import React, { ButtonHTMLAttributes } from "react";
import { Container } from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}; // interface without props

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>{loading ? "Carregando..." : children}</Container>
  );
};

export default Button;
