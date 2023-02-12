import logo from '../logo.svg';
import { srv } from '../fetch_';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NavBar({username, setUsername}) {
  const navigator = useNavigate();

  useEffect(()=>{
    if(username === undefined) navigator("/");
  },[navigator, username])
  
  const on_logout_click = () => {
    if(window.confirm(`logout yes?`)){
      srv.logout((data)=>{
        setUsername(undefined);
        navigator("/");

      })
    }
  }
  ////////////////////////////////////////
  return (
    <header className="navbar bg-secondary">
      <section className="navbar-section">
        <Link href="#" className="btn btn-link" to="/">Index</Link>
        <Link href="#" className="btn btn-link" to="/show">Home</Link>
        <Link href="#" className="btn btn-link" to="/draw">Board</Link>
      </section>
      <section className="navbar-center">
        <img src={logo} className="App-logo" style={{width:"50px",height:"50px"}} alt="logo" />

      </section>
      <section className="navbar-section">
        <button href="#" className="btn btn-link">Hello {username?username:"guest"}</button>
        <button href="#" className="btn btn-link" onClick={on_logout_click}>Logout</button>
      </section>
    </header>  
  )
}