import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Contact from './pages/Contest';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Progress from "./pages/Progress";
import QuestionSection from './pages/QuestionSection';



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/Contest" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/questions/:skill" element={<QuestionSection />} />



      </Routes>
    </div>
  );
}
export default App;
