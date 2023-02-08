import {srv} from '../fetch_';
export default function Login() {
  function on_submit(evt) {
    evt.preventDefault();

    srv.login({name:evt.target.name.value}, (data)=>{
      console.log(data);
    })
  }
  return (
    <div className="empty">
      <div className="empty-icon">
        {/* <i className="icon icon-people"></i> */}
        <figure className="figure">
          <figcaption className="figure-caption text-center">Drawing board</figcaption>
          <img style={{margin:"auto",borderTop: "#ccc 2px solid",borderLeft: "#ccc 2px solid",padding: "5px"}} className="img-responsive ..." src="./login-logo.png" alt="macOS Yosemite Wallpaper"/>
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