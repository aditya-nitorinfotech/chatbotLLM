// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme/index';
// components
import ThemeSettings from './components/settings';

function App() {
  return (
    <ThemeProvider>
      {/* <ThemeSettings> */}
      {" "}
      <Router />{" "}
      {/* </ThemeSettings> */}
    </ThemeProvider>
  );
}

export default App;
