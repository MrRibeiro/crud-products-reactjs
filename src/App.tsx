import React from "react";
import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";

import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./styles/global";
import { theme } from "./styles/theme";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <AuthProvider>
        <AppProvider>
          <Routes />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
