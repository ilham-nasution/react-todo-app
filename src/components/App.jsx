import React from "react";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Homepage />
    </AuthProvider>
  );
};

export default App;
