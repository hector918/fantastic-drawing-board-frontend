import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//pages/////////////////////////////////////////////////////////////////////////
import NavBar from './components/navbar';
import Index from './pages';
import FourOFour from './pages/FourOFour';
///////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"></link>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
