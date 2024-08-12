import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import EditProject from "./components/EditProject";
import CreateProject from "./components/CreateProject"; 

const App = () => {
  return (
    <Router>
      <div className="overflow-x-hidden text-neutral-300 antialiased bg-cy-300 selection:text-cyan-900">
        <div className="fixed top-0 left-0 -z-10 h-screen w-screen">
          <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        <div className="container mx-auto px-8">
          <Navbar />
          <Hero />
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/edit/:id" element={<EditProject />} /> 
            <Route path="/create" element={<CreateProject />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
