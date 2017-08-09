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

if (process.type == 'renderer') {
    const { ipcRenderer } = require('electron');

    ipcReceive = (event, callback) => {
        const handler = (event, wrappedPayload) => {
            const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
            callback(payload);
        }
        ipcRenderer.on(event, handler)
        const unsubscribe = () => ipcRenderer.removeListener(event, handler)
        return unsubscribe
    }

} else {
    const { ipcMain } = require('electron');

    ipcReceive = (event, callback) => {
        const handler = (event, wrappedPayload) => {
            const payload = wrappedPayload.isStringified ? JSON.parse(wrappedPayload.payload) : wrappedPayload.payload;
            callback(payload);
        }
        ipcMain.on(event, handler)
        const unsubscribe = () => ipcMain.removeListener(event, handler)
        return unsubscribe
    }
}

module.exports = ipcReceive;
