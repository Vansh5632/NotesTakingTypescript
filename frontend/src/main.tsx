import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { NotesProvider } from "./contexts/NotesContext.tsx";
import { BrowserRouter, Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
