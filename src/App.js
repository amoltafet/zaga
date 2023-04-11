import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anything from "./pages/Anything";
import Generate from "./pages/Generate";
import Main from './pages/Main';
import Brainstorm from './pages/Brainstorm';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/anything" element={<Anything />} />
      <Route path="/brainstorm" element={<Brainstorm />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
