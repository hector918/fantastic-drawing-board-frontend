const API = process.env.REACT_APP_API_URL;
// let setMsgEntry = (func)=>{
//   add_message = func;
// }
let default_fetch_options = { credentials: 'include' };
let add_message;
function error_handle(error) {
  console.log("dasd",add_message)
  if (add_message) {
    add_message("read error", error.toString(), "error" );
  }
}
function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
function setMsgEntry(func){
  add_message = func;
}
//////////////////////////////////////////////////////////////////////
function login(name, cb)//get
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify(name),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(`${API}/login`, options)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => { cb(data) })
    .catch(error_handle)
}

function uploadDrawing(name,description,moves,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify({name,description,moves}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/uploaddrawing`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}

export const srv = {
  login,
  setMsgEntry,
  uploadDrawing
}

