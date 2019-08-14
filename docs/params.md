# Parameters

Parameter | Description | Type | Accepted Values | Default 
---|---|---|---|---
minWidth | window's minimum width(px) | Number | —— | 100
maxWidth | window's maximum width(px) | Number | —— | ——
minHeight | window's minimum height(px) | Number | —— | 100
maxHeight | window's maximum height(px) | Number | —— | ——
movable | is drag feature available | Boolean | —— | true
resizable | is resize feature available; when it is `true`, it means you could resize the window from every eight directions; when it is an Array value which contain String value, like `['left', 'left-top']` you could resize the window only from targeted directions. | Boolean / Array | `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom` | true
customMoveHandler | custom drag handler. When it is `null`, you could move the window by dragging every inch of this window. Otherwise, when it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler's Element; in that case, you could move the window only by dragging the handler. | String / Element | —— | ——
customMaximizeHandler | maximize feature's handler. When it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler. | String / Element | —— | ——
maximizeCallback | window maximizeCallback function; there is one parameter, which means if it is current maximize(Boolean) | Function | —— | ——