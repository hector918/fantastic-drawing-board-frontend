//Utility/////////////////////////////////////////////////////////////
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
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
  constructor(bg, db) {
    this.backgroundCanvas = bg;
    this.drawingCanvas = db;
    this.init_whiteboard();
    this.touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
    console.log("is touch device", this.touchDevice);
    this.switch_mode("mouse")
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
      console.log("event move");
      const x = e.pageX - this.layer_offset.left;
      const y = e.pageY - this.layer_offset.top;
      ctx.moveTo(preX, preY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "red";
      ctx.stroke();
      preX = x;
      preY = y;
      brush_moves.push([x, y, get_time_lapse_in_mi() - start_time]);
    }
    const throttleMoveFn = throttle(moveFn, 20);
    const mdown = (e) => {
      console.log("event down");
      this.layer_offset = cumulativeOffset( this.drawingCanvas );
      brush_moves = [];
      brush_moves.push([e.pageX, e.pageY, 0]);

      start_time = get_time_lapse_in_mi();
      preX = e.pageX - this.layer_offset.left;;
      preY = e.pageY - this.layer_offset.top;;
      e.target.addEventListener(this.listen_event.move, throttleMoveFn);
    }
    const mup = (e) => {
      console.log("event up");
      e.target.removeEventListener(this.listen_event.move, throttleMoveFn);
      this.recent_moves = [...brush_moves];
      console.log(this.recent_moves);
    }
    ////////////////////////////////////////////////////
    this.drawingCanvas.addEventListener(this.listen_event.down, mdown);
    this.drawingCanvas.addEventListener(this.listen_event.up, mup);
    window.addEventListener("resize", throttle((evt) => {
      this.resize_drawing_board();
    }, 500));
    this.resize_drawing_board();
  }
  //
  resize_drawing_board() {
    let {height, width} = cumulativeOffset(this.backgroundCanvas);
    this.backgroundCanvas.setAttribute("height", `${height}`);
    this.backgroundCanvas.setAttribute("width", `${width}`);
    this.drawingCanvas.setAttribute("height", `${height}`);
    this.drawingCanvas.setAttribute("width", `${width}`);
  }
  //
  clear_drawing() {
    const context = this.drawingCanvas.getContext('2d');
    context.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    context.beginPath();
  }
  //
  re_draw() {
    const ctx = this.drawingCanvas.getContext('2d');
    let acc_lapse = 0;
    let step_lapse = 0;

    for (let [x, y, lapse] of this.recent_moves) {
      x = x - this.layer_offset.left;
      y = y - this.layer_offset.top;
      if (lapse === 0) acc_lapse = step_lapse;
      setTimeout(() => {
        if (lapse === 0) {
          ctx.moveTo(x, y);
        }
        else {
          ctx.lineTo(x, y);
          ctx.strokeStyle = "red";
          ctx.stroke();
          ctx.moveTo(x, y);
        }
        console.log(x, y, lapse);
      }, lapse + acc_lapse);
      step_lapse += lapse;
    }
  }
  get_moves() {
    return this.recent_moves;
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
export { drawingBoard }