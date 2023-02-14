import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { srv } from './fetch_';
import { add_message } from './components/alert-dialog';
//pages/////////////////////////////////////////////////////////////////////////
import NavBar from './components/navbar';
import Index from './pages';
import FourOFour from './pages/FourOFour';
import DrawingPage from './pages/drawing-page';
import Login from './pages/login';
import Show from './pages/show';
///////////////////////////////////////////////////////////////////////////////

function App() {
  const [ username, setUsername ] = useState(undefined);
  const [drawings, setDrawings] = useState([]);
  srv.setMsgEntry (add_message);

  return (
    <div className="App">
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"></link>
      <Router>
        <Routes>
          <Route path="/draw/*" element={<NavBar username={username} setUsername={setUsername} />} />
          <Route path="/show" element={<NavBar username={username} setUsername={setUsername} />} />
          <Route path="/*" element={<></>} />
        </Routes>
        {/*  */}
        <Routes>
          <Route path="/" element={<Index username={username}/>} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route exact path="/draw" element={<DrawingPage/>} />
          <Route path="/draw/:id" element={<DrawingPage drawings={drawings} setDrawings={setDrawings}/>} />
          <Route path="/show" element={<Show drawings={drawings} setDrawings={setDrawings}/>} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
        {/*  */}
        <Routes>
          <Route path="*" element={<div id='alert_dialog' style={{position:"sticky",width:"100%",bottom:"0px"}}>
          </div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
