import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anything from "./pages/Anything";
import Generate from "./pages/Generate";
import Main from './pages/Main';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/anything" element={<Anything />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
