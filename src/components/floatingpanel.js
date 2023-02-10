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


export default class floatingPanel {
  parentDiv = undefined;
  isDown = false;
  offset = [0, 0];
  pinned = false;
  constructor(base_div) {
    this.parentDiv = base_div;
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

    this.parentDiv.addEventListener('mouseup', () => {
      this.isDown = false;
    }, true);

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
      if(Number(this.parentDiv.style.top.replace("px","")) > (window.innerHeight / 2)){
        setTimeout(() => {
          this.parentDiv.style.top = "50px";  
        }, 50);
      }else{
        setTimeout(()=>{
          this.parentDiv.style.top = (window.innerHeight - this.parentDiv.offsetHeight - 10) + "px";
        }, 50)
      }
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
