import React from "react";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import { TodoProvider } from "./TodoContext";
import Header from "./Header";
import Homepage from "./Homepage";

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Header />
        <Homepage />
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
