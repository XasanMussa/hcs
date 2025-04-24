import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import QualityServices from "./components/QualityServices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#1db85c",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <main>
            <Hero />
            <QualityServices />
            <Services />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
