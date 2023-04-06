import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anything from "./pages/Anything";
import Generate from "./pages/Generate";
import Main from './pages/Main';
import Projects from "./pages/Projects";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/anything" element={<Anything />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
