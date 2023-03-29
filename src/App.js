import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generate from "./pages/Generate";
import Main from './pages/Main';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<Generate />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
