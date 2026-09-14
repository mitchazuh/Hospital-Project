import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Queue from "./pages/Queue";
import Dashboard from "./pages/Dashboard";
import PatientDetails from "./pages/PatientDetails";

import { QueueProvider } from "./context/QueueContext";

function App() {
  return (
    <BrowserRouter>

      <QueueProvider>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/queue"
            element={<Queue />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/patient/:id"
            element={<PatientDetails />}
          />

        </Routes>

      </QueueProvider>

    </BrowserRouter>
  );
}

export default App;