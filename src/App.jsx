import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { useMediaQuery } from "@mui/material";
import PrincipalDashboardPage from "./routes/PrincipalDashboard";
import TeacherDashboardPage from "./routes/TeacherDashboard";
import StudentDashboardPage from "./routes/StudentDashboard";
import LoginPage from "./routes/Login";
import ProtectedRoute from "./routes/protectedRoute/protectedRoute"; // Ensure this is compatible with v6

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode);
  const handleLogin = (email, password) => {
    console.log("Logged in:", { email, password });
  };

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Navbar setMode={setMode} mode={mode} />
        <Routes>
          <Route
            path="/principal/*"
            element={
              <ProtectedRoute requiredRole="principal">
                <PrincipalDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/*"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/*"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
