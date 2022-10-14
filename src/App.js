import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
// defaultTheme
import themes from 'themes';
import AuthComponent from "./features/auth";

function App() {
  const customization = useSelector((state) => state.customization);

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          minWidth: "150px",
          padding: "1rem",
        },
      },
      MuiTextField: {
        styleOverrides: {
          padding: "1rem 2rem",
        },
      },
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization, theme)}>
        <CssBaseline />
        <div className="app">
          <div className="chill">
            <AuthComponent />
          </div>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
