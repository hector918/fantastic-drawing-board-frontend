import { useEffect } from "react";
import {redraw_universal} from "./obj-db";
import './canvas-show.css';
import { useNavigate } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////
export default function CanvasShow({drawing, idx}) {
  let {id, name, description, board_size, moves, timestamp} = drawing;
  const navigator = useNavigate();
 
  useEffect(()=>{
    let canvas = document.querySelector(`#show-canvas-id-${id}`);
    canvas.setAttribute("height",JSON.parse(board_size).height);
    canvas.setAttribute("width",JSON.parse(board_size).width);
    redraw_universal(canvas, JSON.parse(moves), 0.5);
  },[ id,moves, board_size ])
  //////////////////////////////////////////////////////////////////
  function on_edit_button_click(){
    navigator(`/draw/${id}`);
  }
  function on_delete_button_click(){

  }
  ////////////////////////////////////////////////////////////////
  return (
    <div className="column col-6 col-xs-12" style={{padding:"8px"}}>
      <div className="card text-left canvas-show">
        <div className="card-image">
          <canvas className="img-responsive" id={`show-canvas-id-${id}`}></canvas>
          {/* <img className="img-responsive" src="../img/macos-sierra-2.jpg" alt="macOS Sierra"/> */}
        </div>
        <div className="card-header">
          <div className=" float-right">
            <button className="btn btn-primary" onClick={on_edit_button_click}><i className="icon icon-edit"></i></button>
            <button className="btn btn-error" style={{marginLeft:"5px"}} onClick={on_delete_button_click}><i className="icon icon-delete"></i></button>
          </div>
          
          <div className="card-title h5">{name}</div>
          <div className="card-subtitle text-gray">{`H:${JSON.parse(board_size).height}px, W:${JSON.parse(board_size).width}px, ${new Date(timestamp).toDateString()}`}</div>
        </div>
        <div className="card-body">{description}</div>
      </div>
    </div>
  )
}