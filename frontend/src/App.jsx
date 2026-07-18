import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import URLDetail from "./pages/URLDetail";
import Landing from "./pages/Landing";
import "./styles/global.css";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { ToastProvider } from "./context/ToastProvider";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000, // 30s — avoid hammering the API on every focus
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Routes>

                {/* Public */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                {/* Protected */}
                <Route element={<DashboardLayout />}>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/urls/:shortCode" element={<URLDetail />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
