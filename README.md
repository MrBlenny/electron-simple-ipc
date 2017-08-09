# electron-simple-ipc
This standardises IPC in electron so it works the same in all threads. It will also JSON stringify/parse any objects send over IPC. This makes IPC much much faster.

## Install
`npm install electron-simple-ipc`

## Usage
Usage is the same in both the renderer/electron threads.

For example:

In electron:
```javascript
const { ipcSend, ipcReceive } = require('electron-simple-ipc');

ipcSend('EVENT_FROM_ELECTRON', {
  data1: 'some data in the event payload'
})

ipcReceive('EVENT_FROM_RENDERER', (payload) => {
  console.log('We process the payload here', payload);
})

```

In Renderer:
```javascript
const { ipcSend, ipcReceive } = require('electron-simple-ipc');

ipcSend('EVENT_FROM_RENDERER', {
  data1: 'some data in the event payload'
})

ipcReceive('EVENT_FROM_ELECTRON', (payload) => {
  console.log('We process the payload here', payload);
})

```

### Unsubscription
```js
const off = ipcReceive('EVENT_FROM_RENDERER', (payload) => {
  console.log('We process the payload here', payload);
})
// once you're done with it:
off()
