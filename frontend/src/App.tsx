// src/App.tsx
import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotesProvider } from "./contexts/NotesContext";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import HomePage from "./components/HomePage";
import { useAuth } from "./contexts/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </NotesProvider>
    </AuthProvider>
  );
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default App;
