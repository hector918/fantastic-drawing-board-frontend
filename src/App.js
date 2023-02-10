import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import {srv} from './fetch_';
import { add_message } from './components/alert-dialog';
//pages/////////////////////////////////////////////////////////////////////////
import NavBar from './components/navbar';
import Index from './pages';
import FourOFour from './pages/FourOFour';
import DrawingPage from './pages/drawing-page';
import Login from './pages/login';
///////////////////////////////////////////////////////////////////////////////

function App() {
  const [ username, setUsername ] = useState(undefined);
  srv.setMsgEntry (add_message);

  return (
    <div className="App">
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css"></link>
      <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css"></link>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar username={username} />} />
          <Route path="/draw" element={<NavBar />} />
          <Route path="/*" element={<></>} />
        </Routes>
        {/*  */}
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
          <Route path="/draw" element={<DrawingPage/>} />

          <Route path="*" element={<FourOFour />} />
        </Routes>
        {/*  */}
        <Routes>
          <Route path="*" element={<div id='alert_dialog' style={{position:"absolute",width:"100%",bottom:"0px"}}>
          </div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
