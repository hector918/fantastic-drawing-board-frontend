import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DrawingTile from "../components/drawing-tile";
import { srv } from "../fetch_";
import './index.css';

///////////////////////////////////////////////////////////////
export default function Index({username}) {
  const [drawings, setDrawings] = useState([]);
  useEffect(()=>{
    srv.get_all_drawings((data) =>{
      if(Array.isArray(data)) setDrawings(data);
    })
    document.querySelector(".red_span").classList.add("fade");
  },[])
  return (
    <div className="container">
      <div className="hero bg-gray hero-sm">
        <div className="hero-body">
          <div className="columns">
            <div className="column" style={{display: "inline-flex"}}>
              <h1 style={{margin:"auto"}}>Draw<span className="red_span">i</span>ng board</h1>
            </div>
            <div className="divider-vert " data-content="|"></div>
            <div className="column">
              <p className="text-left">Behold, a canvas doth lie before thee,A space that calls for thy creativity.</p>
              <p className="text-left">What may this be, thou may ask, this wondrous place? A riddle that doth challenge the mind's embrace. </p>
              <p className="text-right"> - ChatGPT 3.5</p>
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