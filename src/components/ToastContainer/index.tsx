import React from "react";
import { useTransition } from "react-spring";
import { Container } from "./styles";
import { ToastMessage } from "../../hooks/Toast";
import Toast from "./Toast";

interface ToastContainerProps {
  toasts: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastWithTransition = useTransition(toasts, (toast) => toast.id, {
    from: { right: "-110%" },
    enter: { right: "0%" },
    leave: { right: "-110%" },
  });
  return (
    <Container>
      {toastWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} toast={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
