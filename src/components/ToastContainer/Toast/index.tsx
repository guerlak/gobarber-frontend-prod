import React, { useEffect } from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import { Toast } from "./styles";
import { useToast, ToastMessage } from "../../../hooks/Toast";

interface ToastProps {
  toast: ToastMessage;
  style: object;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000);

    // Call a FN to do somethinf if the user destroy the component
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id]);

  return (
    <Toast
      key={toast.id}
      type={toast.type}
      hasdescription={String(!!toast.description)}
      style={style}
    >
      <FiAlertCircle />
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={22} />
      </button>
    </Toast>
  );
};

export default ToastComponent;
