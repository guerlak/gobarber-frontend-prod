import React, { useContext, createContext, useCallback, useState } from "react";
import { uuid } from "uuidv4";
import ToastContainer from "../components/ToastContainer";

interface ToastData {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}
export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "default";
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastData>({} as ToastData);

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, "id">) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      setToasts([...toasts, toast]);
    },
    [toasts]
  );
  const removeToast = useCallback(
    (id: string) => {
      setToasts(toasts.filter((t) => t.id !== id));
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export function useToast(): ToastData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within an AuthProvider");
  }
  return context;
}
