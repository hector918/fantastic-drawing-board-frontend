import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DrawingTile from "../components/drawing-tile";
import { srv } from "../fetch_";


///////////////////////////////////////////////////////////////
export default function Index({username}) {
  const [drawings, setDrawings] = useState([]);
  useEffect(()=>{
    srv.get_all_drawings((data) =>{
      if(Array.isArray(data)) setDrawings(data);
    })
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
      <div className="container-d" style={{marginTop:"20px"}}>
        {drawings.map((el, idx)=>
          <DrawingTile key={idx} drawing={el} idx={idx}/>
        )}
      </div>
    </div>
  )
}