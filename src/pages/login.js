import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {srv} from '../fetch_';

export default function Login({setUsername}) {
  let navigator = useNavigate();
  function on_submit(evt) {
    evt.preventDefault();

    srv.login({name:evt.target.name.value}, (data)=>{
      if(data.name){
        setUsername(data.name);
        navigator("/show");
      }
    })
  }
  useEffect(()=>{
    document.querySelector("input").focus();
  },[])
  return (
    <div className="empty" style={{height:"100%"}}>
      <div className="empty-icon">
        {/* <i className="icon icon-people"></i> */}
        <figure className="figure">
          <figcaption className="figure-caption text-center"><Link to="/">Drawing board</Link></figcaption>
          <img style={{margin:"auto",borderTop: "#ccc 2px solid",borderLeft: "#ccc 2px solid",padding: "5px"}} className="img-responsive ..." src="../login-logo.png" alt="macOS Yosemite Wallpaper"/>
        </figure>
      </div>
      <form onSubmit={on_submit}>
        <p className="empty-title h5">we need your name</p>
        <p className="empty-subtitle"><input className="form-input" type="text"  maxLength="20" name='name' placeholder="Name" style={{maxWidth:"50%",margin:"auto"}}/></p>
        <div className="empty-action">
          <button className="btn btn-primary">Send a name</button>

        </div>
      </form>
    </div>
  )
}