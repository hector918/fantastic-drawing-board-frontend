import { useEffect } from "react";
import {drawingBoard} from "./obj-db";
import floatingPanel from './floatingpanel';
import {srv} from '../fetch_';
let db;
let fp;
export default function DrawingBoard() {
  useEffect(()=>{
    db = new drawingBoard(document.querySelector("#layer1"), document.querySelector("#layer2"));
    fp = new floatingPanel(document.querySelector('#floatingpanel'));
    let buttons = document.querySelector('#floating_function_panel').querySelectorAll("button");
    buttons[0].addEventListener("click", ()=>{db.clear_drawing()});
    buttons[1].addEventListener("click", ()=>{db.re_draw()});
    buttons[2].addEventListener("click", ()=>{db.undo()});
    buttons[3].addEventListener("click", ()=>{db.clear_all_moves()});
    buttons[4].addEventListener("click", ()=>{on_save_click()});
  })


  function on_save_click(){
    let modal = document.querySelector("#drawingboard-save-confirm-modal");
    modal.classList.add("active");
    let on_modal_canvas = modal.querySelector("canvas");
    let can_size = db.get_canvas_size();
    on_modal_canvas.setAttribute("width",can_size.width);
    on_modal_canvas.setAttribute("height",can_size.height);
    db.re_draw(on_modal_canvas);
  }
  function on_close_modal(){
    let modal = document.querySelector("#drawingboard-save-confirm-modal");
    modal.classList.remove("active");

  }
  function on_save_modal(evt){
    if(!fp) return;
    let modal = document.querySelector("#drawingboard-save-confirm-modal");
    let name = modal.querySelector("#modal-input-name");
    let description = modal.querySelector("#modal-input-description");
    // let button = evt.currentTarget;
    
    let warning = [];
    if(name.value === ""){ warning.push("name is required.") }
    if(warning.length>0){
      alert(warning.join(","));
    }else{
      srv.uploadDrawing(name.value,description.value,db.get_moves(),(response)=>{
        if(response.id){
          modal.classList.remove("active");
        }
      })
    }
  }
  return (
    <>
      <div className="canvas-box" style={{position:"relative"}}>
        <canvas id="layer1" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
        <canvas id="layer2" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
      </div>
      <div id="floatingpanel" className="columns" style={{position:"absolute",cursor:"grab",left:"0px",top:"0px",alignItems: "center"}}>
        <div className="s-circle column bg-secondary c-hand" id="floating_pin_panel">
          <span style={{fontSize:"2em",filter:"grayscale(1)"}}>📌</span>
        </div>
        <div className="divider-vert column" data-content="|"></div>
        <div id="floating_function_panel">
          <div className="btn-group btn-group-block">
            <button className="btn">clear canvas</button>
            <button className="btn">redraw</button>
            <button className="btn d-none">undo</button>
            <button className="btn">clear move history</button>
            <button className="btn">Save</button>
          </div>
        </div>
      </div>
      {/* modal */}
      <div className="modal text-left" id="drawingboard-save-confirm-modal">
        <div href="#close" className="modal-overlay" aria-label="Close"></div>
        <div className="modal-container">
          <div className="modal-header">
            <div href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={on_close_modal}></div>
            <div className="modal-title h5">Modal title</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <div className="form-group">
                <label className="form-label" htmlFor="modal-input-name">Name</label>
                <input className="form-input" type="text" id="modal-input-name" placeholder="Name"/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="modal-input-description">Message</label>
                <textarea className="form-input" id="modal-input-description" placeholder="Textarea" rows="3"></textarea>
              </div>
              <div style={{border:"black 2px solid"}}>
                <canvas style={{width:"100%",height:"100%"}}></canvas>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn" style={{marginRight:"10px"}} onClick={on_close_modal}>cancel</button>
            <button className="btn btn-success" onClick={on_save_modal}>save</button>
          </div>
        </div>
      </div>
    </>
  )
}