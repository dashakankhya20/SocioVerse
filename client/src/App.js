import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Homepage from "scenes/homePage/Homepage";
import Loginpage from "scenes/loginPage/Loginpage";
import Profile from "scenes/profilePage/Profile";
import Message from "scenes/messenger/Message";
import UserProfilePage from "scenes/profilePage/UserProfilePage";
import ReportProblem from "scenes/reportProblem/ReportProblem";
import ThankYou from "scenes/defaultPages/ThankYou";
import ChangePassword from "scenes/changePassword/ChangePassword";
import ForgotPassword from "scenes/changePassword/ForgotPassword";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "theme";
import { createTheme } from "@mui/material";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route
            path="/home"
            element={isAuth ? <Homepage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:id"
            element={isAuth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/user-profile/:id"
            element={isAuth ? <UserProfilePage /> : <Navigate to="/" />}
          />

          <Route
            path="/report-problem/:id"
            element={isAuth ? <ReportProblem /> : <Navigate to="/" />}
          />

          <Route
            path="/message"
            element={isAuth ? <Message /> : <Navigate to="/" />}
          />

          <Route
            path="/change-password"
            element={isAuth ? <ChangePassword /> : <Navigate to="/" />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/visit-again"
            element={isAuth ? <ThankYou /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
