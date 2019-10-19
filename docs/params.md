# Parameters

## minWidth
- Type: `Number`
- Default: `100`
- Description: window's minimum width(px)

## maxWidth
- Type: `Number`
- Description: window's maximum width(px)

## minHeight
- Type: `Number`
- Default: `100`
- Description: window's minimum height(px)

## maxHeight
- Type: `Number`
- Description: window's maximum height(px)

## movable
- Type: `Boolean`
- Default: `true`
- Description: is drag feature available

## resizable
- Type: `Boolean`/`Array`
- Default: `true`
- Accepted Values: `left-top`/`left-bottom`/`left`/`right-top`/`right-bottom`/`right`/`top`/`bottom`
- Description: is resize feature available; when it is `true`, it means you could resize the window from every eight directions; when it is an Array value which contain String value, like `['left', 'left-top']` you could resize the window only from targeted directions.

## customMoveHandler
- Type: `String`/`Element`
- Description: custom drag handler. When it is `null`, you could move the window by dragging every inch of this window. Otherwise, when it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler's Element; in that case, you could move the window only by dragging the handler.

## customMaximizeHandler
- Type: `String`/`Element`
- Description: maximize feature's handler. When it is a String value, `vue-directive-window` will use `document.querySelector(customMoveHandler)` to get the handler.

## maximizeCallback
- Type: `Function`
- Description: window maximizeCallback function; there is one parameter, which means if it is current maximize(Boolean).