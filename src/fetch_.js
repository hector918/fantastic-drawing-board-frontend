const API = process.env.REACT_APP_API_URL;
// let setMsgEntry = (func)=>{
//   add_message = func;
// }
let default_fetch_options = { credentials: 'include' };
let add_message;
function error_handle(error) {
  if (add_message) {
    add_message("read error", error.toString(), "error" );
  }
}
function handleErrors(response) {
  if (!response.ok) {
    switch(response.status){
      case 403:
        window.location.assign("/");
      break;
      default:
        
    }
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

function logout(cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
  }
  fetch(`${API}/login`, options)
    .then(handleErrors)
    .then(response => response.json())
    .then(data => { cb(data) })
    .catch(error_handle)
}
/////////////////////////////////////
function uploadDrawing(name,description,moves,board_size,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'POST',
    body: JSON.stringify({
      name, description, 
      moves:JSON.stringify(moves), 
      board_size:JSON.stringify(board_size)
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/uploaddrawing`,options)
    .then(handleErrors)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////////
function updateDrawing(id,name,description,moves,board_size,cb)//post
{
  let options = {
    ...default_fetch_options,
    method: 'PUT',
    body: JSON.stringify({
      name, description, 
      moves:JSON.stringify(moves), 
      board_size:JSON.stringify(board_size)
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/uploaddrawing/${id}`,options)
    .then(handleErrors)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////////
function deleteDrawing(id, cb)//delete
{
  let options = {
    ...default_fetch_options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/uploaddrawing/${id}`,options)
    .then(handleErrors)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////////
function get_drawings_by_user(cb){
  let options = {
    ...default_fetch_options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/drawings`,options)
    .then(handleErrors)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////////
function get_all_drawings(cb){
  let options = {
    ...default_fetch_options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/all`,options)
    .then(handleErrors)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
///////////////////////////////////////////////////////////////////////
export const srv = {
  login,
  logout,
  setMsgEntry,
  uploadDrawing,
  updateDrawing,
  deleteDrawing,
  get_drawings_by_user,
  get_all_drawings
}

