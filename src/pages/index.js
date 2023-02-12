import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index({username}) {

  useEffect(()=>{

  },[])
  return (
    
    <div className="container">
      <div className="hero bg-gray hero-sm">
        <div className="hero-body">
          <div className="columns">
            <div className="column">
              <h1>Drawing board</h1>
            </div>
            <div className="divider-vert " data-content="|"></div>
            <div className="column">
              <p className="text-left">A flat and smooth surface, where lines come to life, With a straight edge, lines stay true, And a secret rule, angled lines to ensue.</p>
              <p className="text-right">
                {username===undefined?
                  <Link to="/login">Login...</Link>
                  :
                  <Link to="/draw">back to your drawing</Link>
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column col-6">col-6</div>
        <div className="column col-3">col-3</div>
        <div className="column col-2">col-2</div>
        <div className="column col-1">col-1</div>
      </div>
    </div>
  )
}