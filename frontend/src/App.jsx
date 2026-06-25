import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcomepage";
import ResumeBuilder from "./pages/resumebuilder";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/resume"
          element={<ResumeBuilder />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;                                 