import React from "react";
import { AuthProvider } from "./Auth";
import { ToastProvider } from "./Toast";

const Providers: React.FC = ({ children }) => (
  <ToastProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastProvider>
);

export default Providers;
