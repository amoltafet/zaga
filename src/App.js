import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anything from "./pages/Anything";
import Generate from "./pages/Generate";
import Main from './pages/Main';
import Projects from "./pages/Projects";
import Custom404 from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCd7dgwMl9FfHsGHsav4RVfjKCIWwUR91A",
    authDomain: "zaga-2fcfe.firebaseapp.com",
    projectId: "zaga-2fcfe",
    storageBucket: "zaga-2fcfe.appspot.com",
    messagingSenderId: "408135409648",
    appId: "1:408135409648:web:4dfb74bba3a49c1be84735",
    measurementId: "G-V846TBDXJ7"
  };

    // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAuth(app);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/anything" element={<Anything />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<Custom404 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;




