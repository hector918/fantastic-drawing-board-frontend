import { useEffect, useState } from "react";
import {drawingBoard} from "./obj-db";
import floatingPanel from './floatingpanel';
import {srv} from '../fetch_';
import { useNavigate } from "react-router-dom";
let db;
let fp;
export default function DrawingBoard({id, drawings, setDrawings}) {
  let [title, setTitle] = useState([]);
  let [description, setDescription] = useState([]);
  let navigator = useNavigate();
  ////////////////////////////////////////////////
  useEffect(()=>{
    db = new drawingBoard(document.querySelector("#layer1"), document.querySelector("#layer2"));
    fp = new floatingPanel(document.querySelector('#floatingpanel'), db);
    let buttons = document.querySelector('#floating_function_panel').querySelectorAll("button");
    buttons[0].addEventListener("click", ()=>{db.clear_drawing()});
    buttons[1].addEventListener("click", ()=>{db.re_draw()});
    buttons[2].addEventListener("click", ()=>{db.undo()});
    buttons[3].addEventListener("click", ()=>{db.clear_all_moves()});
    buttons[4].addEventListener("click", ()=>{on_save_click()});
  },[])

  useEffect(()=>{
    if(id === undefined || drawings.length < 1) return;
    let drawing = drawings.find(el => el.id.toString() === id.toString());
    setTitle(drawing.name);
    setDescription(drawing.description);
    db.set_moves(JSON.parse(drawing.moves));
    db.re_draw();
  },[id, drawings])
  /////////////////////////////////////////////////////////
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
  function on_save_modal(){
    if(!fp) return;
    let modal = document.querySelector("#drawingboard-save-confirm-modal");
    // let button = evt.currentTarget;
    let warning = [];
    if(title === ""){ warning.push("name is required.") }
    if(warning.length>0){
      alert(warning.join(","));
    }else{
      if(id===undefined){
        srv.uploadDrawing(
          title, 
          description, 
          db.get_moves(),
          db.get_canvas_size(),
          (response)=>{ if(response.id){ modal.classList.remove("active") }
        })
      }else{
        srv.updateDrawing(
          id,
          title, 
          description, 
          db.get_moves(),
          db.get_canvas_size(),
          (response)=>{ if(response.id){ modal.classList.remove("active") }
        })
      }
      navigator('/show');
    }
  }
  function on_title_change(evt){ setTitle(evt.target.value) }
  function on_descrption_change(evt){ setDescription(evt.target.value) }
  /////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="canvas-box" style={{position:"relative"}}>
        <canvas id="layer1" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
        <canvas id="layer2" style={{position:"absolute",left:"0",top:"0",zIndex:"0",width:"100%",height:"100%"}}></canvas>
      </div>
      <div id="floatingpanel" className="columns" >
        <div id="floating_pin_panel">
          <span className="s-circle column bg-secondary c-hand" style={{fontSize:"2em",filter:"grayscale(5)",width:"50px",height:"50px",padding:"0px"}}>📌</span>
        </div>
        <div className="divider-vert column" data-content="|"></div>
        <div id="floating_function_panel" style={{margin:"auto"}}>
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
            <div className="modal-title h5">Save drawing</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <div className="form-group">
                <label className="form-label" htmlFor="modal-input-name">Name</label>
                <input className="form-input" type="text" id="modal-input-name" placeholder="Name" value={title} onChange={on_title_change}/>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="modal-input-description">Description</label>
                <textarea className="form-input" id="modal-input-description" placeholder="Textarea" rows="3" value={description} onChange={on_descrption_change}></textarea>
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