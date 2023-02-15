//Utility/////////////////////////////////////////////////////////////
function throttle(fn, wait) {
  let lastCall = Date.now() - wait;
  return function() {
    let now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn.apply(this, arguments);
    }
  };
}
function cumulativeOffset(element) {
  let [top, left, height, width] = [0, 0, 0, 0];
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    height = element.offsetHeight || 0;
    width = element.offsetWidth || 0;
    element = element.offsetParent;
  } while (element);
  return { top, left, height, width };
};
function get_time_lapse_in_mi() {
  let d = new Date();
  return d.getTime();
}
//Utility/////////////////////////////////////////////////////////////
//canvas/////////////////////////////////////////////////////////////
class drawingBoard {
  backgroundCanvas = undefined;
  drawingCanvas = undefined;
  recent_moves = [];
  touchDevice = false;
  listen_event = { down : "mousedown", move : "mousemove", up : "mouseup" };
  readOnly = false;
  replay_speed = 0.5;
  brush_color = "red";
  constructor(bg, db) {
    this.backgroundCanvas = bg;
    this.drawingCanvas = db;
    this.init_whiteboard();
    this.touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
    console.log("is touch device", this.touchDevice);
    this.switch_mode("mouse");
  }
  //
  setBackgroundImg(blob) {
    blobtoDataURL(blob, (dataURL) => {
      const ctx = this.backgroundCanvas.getContext('2d');
      let img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
    });
    //https://chiayilai.com/image-%E5%90%84%E7%A8%AE%E5%9E%8B%E6%85%8B%E8%BD%89%E6%8F%9Bblob-dataurl-canvas-in-javascript/
    function blobtoDataURL(blob, callback) {
      var fr = new FileReader();
      fr.onload = function (e) {
        callback(e.target.result);
      };
      fr.readAsDataURL(blob);
    }
  }
  //
  init_whiteboard() {
    const ctx = this.drawingCanvas.getContext('2d');
    let [preX, preY] = [0, 0];
    let brush_moves = [];
    let start_time = new Date().getTime();
    ////////////////////////////////////////////////////////////////////
    const moveFn = (e) => {
      const x = e.pageX - this.layer_offset.left ;
      const y = e.pageY - this.layer_offset.top ;
      ctx.moveTo(preX, preY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "red";
      ctx.stroke();
      preX = x;
      preY = y;
      brush_moves.push([x, y, get_time_lapse_in_mi() - start_time]);
    }
    const throttleMoveFn = throttle(moveFn, 30);
    const mdown = (e) => {
      // console.log("event down");
      if (this.readOnly) return;
      this.layer_offset = cumulativeOffset( this.drawingCanvas );
      brush_moves = [];
      start_time = get_time_lapse_in_mi();
      preX = e.pageX - this.layer_offset.left;
      preY = e.pageY - this.layer_offset.top;
      brush_moves.push([preX, preY, 0]);
      e.target.addEventListener(this.listen_event.move, throttleMoveFn);
    }
    const mup = (e) => {
      // console.log("event up");
      e.target.removeEventListener(this.listen_event.move, throttleMoveFn);
      this.recent_moves.push({brush:"red",move:[...brush_moves]});
      // console.log(this.recent_moves);
    }
    ////////////////////////////////////////////////////
    this.drawingCanvas.addEventListener(this.listen_event.down, mdown);
    this.drawingCanvas.addEventListener(this.listen_event.up, mup);
    window.addEventListener("resize", this.resize_drawing_board.bind(this));
    this.resize_drawing_board();
  }
  //
  resize_drawing_board() {
    let height = this.backgroundCanvas.parentElement.offsetHeight;
    let width = this.backgroundCanvas.parentElement.offsetWidth;
    this.backgroundCanvas.setAttribute("height", `${height}`);
    this.backgroundCanvas.setAttribute("width", `${width}`);
    this.drawingCanvas.setAttribute("height", `${height}`);
    this.drawingCanvas.setAttribute("width", `${width}`);
    this.backgroundCanvas.style.height =`${height}px`;
    this.backgroundCanvas.style.width = `${width}px`;
    this.drawingCanvas.style.height =`${height}px`;
    this.drawingCanvas.style.width = `${width}px`;
  }
  //
  clear_drawing() {
    const context = this.drawingCanvas.getContext('2d');
    context.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    context.beginPath();
  }
  //
  re_draw(board = this.drawingCanvas, moves = this.recent_moves) {
    redraw_universal(board, moves, this.replay_speed);
  }
  set_moves(moves) {
    this.recent_moves = [...moves];
  }
  get_moves() {
    return this.recent_moves;
  }
  get_canvas_size(){
    return {
      width : this.drawingCanvas.getAttribute("width"),
      height : this.drawingCanvas.getAttribute("height")
    }
  }
  clear_all_moves(){
    this.recent_moves = [];
  }
  switch_mode(mode = "mouse") {
    if(mode !== "mouse"){
      this.listen_event.down = "touchstart";
      this.listen_event.move = "touchmove";
      this.listen_event.down = "touchend";
    }else{
      this.listen_event.down = "mousedown";
      this.listen_event.move = "mousemove";
      this.listen_event.down = "mouseup";
    }
  }
}
/////////////////////////////////////////////////////////
function redraw_universal(board , moves, speed = 1){
  const ctx = board.getContext('2d');
  let acc_lapse = 0;
  let step_lapse = 0;
  for(let { move } of moves) {
    for(let i = 1; i < move.length; i++){
      let [x, y, lapse] = move[i];
      let [pre_x, pre_y] = move[i-1];
      step_lapse = Math.max(Math.round((lapse * speed) , i));
      setTimeout(()=>{
        ctx.moveTo(pre_x, pre_y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "red";
        ctx.stroke();
      }, step_lapse + acc_lapse)
    }
    acc_lapse += step_lapse;
  }
}
export { drawingBoard, redraw_universal }