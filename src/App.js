import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anything from "./pages/Anything";
import Main from './pages/Main';
import Brainstorm from './pages/Brainstorm';
import Projects from "./pages/Projects";
import Custom404 from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';

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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
      <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Main user={user} />} />
        <Route path="/generate" element={<Anything user={user} />} />
        <Route path="/anything" element={<Anything user={user} />} />
        <Route path="/search" element={<Anything user={user} />} />
        <Route path="/brainstorm" element={<Anything user={user} />} />
        <Route path="/projects" element={<Projects user={user} />} />
        <Route path="/writer" element={<Anything user={user} />} />
        <Route path="*" element={<Custom404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
