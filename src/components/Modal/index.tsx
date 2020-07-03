import React, { ButtonHTMLAttributes } from "react";
import { Container, Select } from "./style";
import { useAuth } from "../../hooks/Auth";

interface ModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  toggle(): void;
}

const Modal: React.FC<ModalProps> = ({ toggle }) => {
  const { signOut } = useAuth();
  return (
    <Container>
      Quer sair do app?
      <Select>
        <button type="button" onClick={signOut}>
          Sim
        </button>
        <button type="button" onClick={toggle}>
          Não
        </button>
      </Select>
    </Container>
  );
};

export default Modal;
