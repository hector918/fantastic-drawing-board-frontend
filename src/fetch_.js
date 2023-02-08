const API = process.env.REACT_APP_API_URL;
// let setMsgEntry = (func)=>{
//   add_message = func;
// }
let default_fetch_options = { };
let add_message;
function error_handle(error) {
  if (add_message) {
    add_message("read error", error.toString());
  }
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
  console.log(`${API}/login`, name, cb)
  fetch(`${API}/login`, options)
    .then(response => response.json())
    .then(data => { cb(data) })
    .catch(error_handle);
}

// function create(body,cb)//post
// {
//   let options = {
//     ...default_fetch_options,
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   fetch(`${API}`,options)
//     .then(response=>response.json())
//     .then(data=>{cb(data)})
//     .catch(error_handle);
// }

export const srv = {
  login
}