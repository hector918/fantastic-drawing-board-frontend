import { useEffect } from "react";
import {drawingBoard} from "./obj-db";
let db;
export default function DrawingBoard() {
  useEffect(()=>{
    db = new drawingBoard(document.querySelector("#layer1"), document.querySelector("#layer2"));
  })
  return (
    <div className="canvas-box" style={{position:"relative"}}>
      <canvas id="layer1" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
      <canvas id="layer2" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
    </div>
  )
}