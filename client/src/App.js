import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Homepage from "scenes/homePage/Homepage";
import Loginpage from "scenes/loginPage/Loginpage";
import Profile from "scenes/profilePage/Profile";
import Messenger from "scenes/messenger/Messenger";
import UserProfilePage from "scenes/profilePage/UserProfilePage";
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
            path="/message"
            element={isAuth ? <Messenger /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
