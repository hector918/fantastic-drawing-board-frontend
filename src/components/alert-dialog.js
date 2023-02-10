function ce(tag, c, html, style, id = undefined){
  let ret = document.createElement(tag);
  ret.setAttribute("class", c);
  ret.innerHTML = html;
  ret.setAttribute("style", style);
  if(id) ret.id = id;
  return ret;
}


const add_message = (title, body, type, lasting = 10) => {
  let id = new Date().getTime();

  let dialog = document.querySelector("#alert_dialog");
  let div = ce('div',`toast toast-${type||"primary"}`,"","",id);
  let button = ce("button","btn btn-clear float-right","","");
  let span = ce("span","",`${title} - ${body}`,"");
  let progress = ce("progress","progress","",`animation:progress-indeterminate ${lasting}s linear infinite;background: #eef0f3 linear-gradient(to right,#5755d9 30%,#eef0f3 30%) top left/150% 150% no-repeat;`);
  progress.setAttribute("value","0");
  progress.setAttribute("max","100");

  div.append(button, span, progress);
  dialog.append(div);

  const remove_toastMsg = () => {
    dialog.removeChild(div);
  }

  let timeoutID = setTimeout(() => {
    remove_toastMsg(id)
  }, lasting * 1000);
  button.addEventListener("click",()=>{
    clearTimeout(timeoutID);
    dialog.removeChild(div);
  }) 
}
export {add_message};
