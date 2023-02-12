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
/////////////////////////////////////////////////////////////////////////////
export default class floatingPanel {
  parentDiv = undefined;
  isDown = false;
  offset = [0, 0];
  pinned = false;
  constructor(base_div, pseudo_canvas=undefined) {
    this.parentDiv = base_div;
    this.pseudo_canvas = pseudo_canvas;
    this.init();
  }

  init = () => {
    this.parentDiv.addEventListener('mousedown', (e) => {
      if(this.pinned) return;
      this.isDown = true;
      console.log("panel down")
      this.offset = [
        this.parentDiv.offsetLeft - e.clientX,
        this.parentDiv.offsetTop - e.clientY
      ];
    }, true);
    this.parentDiv.style = `transition: transform 0.5s ease; 
                            position:absolute;
                            cursor:grab;
                            left:0px;
                            top:0px;
                            alignItems: center;
                            `;
    this.parentDiv.addEventListener('mouseup', () => {
      this.isDown = false;
    }, true);
    this.parentDiv.style.transform = `translateY(60px)`; 
    document.querySelector("body").addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (this.isDown) {
        this.parentDiv.style.left = (event.clientX + this.offset[0]) + 'px';
        this.parentDiv.style.top = (event.clientY + this.offset[1]) + 'px';
      }
    }, true);
    //
    let divs = this.parentDiv.querySelectorAll("div");
    let throttleMoveFn = throttle((evt) => {
      if(this.pinned) return;
      this.pinned = true;
      let otop = this.parentDiv.getBoundingClientRect();
      
      if(otop > (window.innerHeight / 2)){
        let rtop = cumulativeOffset(this.pseudo_canvas.drawingCanvas).top - 180;
        this.parentDiv.style.transform = `translateY(${rtop}px)`;        
      }else{
        let rtop = cumulativeOffset(this.pseudo_canvas.drawingCanvas);
        rtop = rtop.top + rtop.height;
        console.log(rtop,otop)
        this.parentDiv.style.transform = `translateY(${rtop - otop.top - 10}px)`;
      }
      setTimeout(() => {
        this.pinned = false;
      }, 600);
    }, 1000);
    let function_panel_div = divs[2];
    function_panel_div.addEventListener("mousemove", throttleMoveFn);
    // function_panel_div.style.opacity = "0.5"
   
    let pin_panel_div = this.parentDiv.querySelector("#floating_pin_panel");
    let pin = pin_panel_div.querySelector("span");
    
    pin.addEventListener("click",(evt)=>{
      if(this.pinned){
        pin.style.filter = "grayscale(1)";
      }else{
        pin.style.filter = "";
      }
      this.pinned = !this.pinned;
    })
  }
}
