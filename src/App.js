import React, { useState } from "react";
import {  BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from "./libs/contextLib";
import MainRoutes from "./routes/MainRoutes";
import "./App.css";
import OmniFooter from "./components/OmniFooter.js";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <>
      <div className="App container py-3">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Router>
            <MainRoutes />
          </Router>
        </AppContext.Provider>
      </div>
      <OmniFooter />
    </>
  );
}
export default App;