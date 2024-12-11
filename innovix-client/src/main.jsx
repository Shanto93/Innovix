import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center"/>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
