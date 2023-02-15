# Drawing board frontend 2023


## `Index page`
path : /

auth : anonymous

user story : user can view lastest 10 drawing and goto login page.

## `Login page`
path : /login

auth : anonymous

user story : user can login here, after login will redirect to show page.

## `Show page`
path : /show

auth : login required

user story : user can see all drawings under username, through the `navbar` [index] goto index page, [home] goto show page(current), [board] goto drawing board, logout leads to logout. when hover mouse on drawing, [edit] and [delete] button will showup, click the button to go to the corresponding page.

## `Edit page/ New page`
path : /draw

auth : login required

user story : `navbar` section is the same. on the floating panel, if you mouse move over the function panel, it will drift, and if you click one the pin button, it will pin down the function panel. on the functin panel [clear canvas] will clean the current drawing, [redraw] will redraw based on history stoke, [clear move history] can remove all the history stoke, [save] will popup a modal for input name and description of the drawing, in the modal click save will save drawing and return to the show page.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
