import logo from '../logo.svg';

export default function NavBar() {
  return (
    <header className="navbar bg-secondary">
      <section className="navbar-section">
        <button href="#" className="btn btn-link">Docs</button>
        <button href="#" className="btn btn-link">Examples</button>
      </section>
      <section className="navbar-center">
        <img src={logo} className="App-logo" style={{width:"50px",height:"50px"}} alt="logo" />

      </section>
      <section className="navbar-section">
        <button href="#" className="btn btn-link">Twitter</button>
        <button href="#" className="btn btn-link">GitHub</button>
      </section>
    </header>  
  )
}