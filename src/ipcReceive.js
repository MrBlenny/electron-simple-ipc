/**************************************************
This function standardises electron's IPC receive
so it can be used in either the main electron thread
or a renderer.

The unused section of code should (hopefully?) be
cleaned up in your application's build process.

Example:
ipcReceive('SOME_EVENT_NAME', (payload) => {
  console.log('We process the payload here', payload);
})


- David Revay
**************************************************/
let ipcReceive
let ipcReceiveOnce

if (process.type == 'renderer') {
    const { ipcRenderer } = require('electron');

    ipcReceive = (event, callback) => {
        ipcRenderer.on(event, (event, wrappedPayload) => {
          const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
          callback(payload);
        })
    }

    ipcReceiveOnce = (event, callback) => {
        ipcRenderer.once(event, (event, wrappedPayload) => {
          const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
          callback(payload);
        })
    }

} else {
    const { ipcMain } = require('electron');

    ipcReceive = (event, callback) => {
        ipcMain.on(event, (event, wrappedPayload) => {
          const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
          callback(payload);
        })
    }

    ipcReceiveOnce = (event, callback) => {
        ipcMain.once(event, (event, wrappedPayload) => {
          const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
          callback(payload);
        })
    }
}

module.exports = { ipcReceive, ipcReceiveOnce };
