/**************************************************
This function standardises electron's IPC send
so it can be used in either the main electron thread
or a renderer.

The unused section of code should (hopefully?) be
cleaned up in your application's build process.

Example:
ipcSend('SOME_EVENT_NAME', {
  data1: 'some data in the event payload'
})

- David Revay
**************************************************/
let ipcSend

const getWrappedPayload = (payload) => {
    // This will get the wrapped version of the payload.
    // This will stringify the payload if it is an object.
    
    // Stringified payloads are much much faster than
    // sending a large object.
    if (payload !== null && typeof payload === 'object') {
        return {
            payload: JSON.stringify(payload),
            isStringified: true
        }
    }
    return {
        payload
    }
};
                
if (process.type == 'renderer') {
    const { ipcRenderer } = require('electron');

    ipcSend = (event, payload) => {
        const wrappedPayload = getWrappedPayload(payload);
        ipcRenderer.send(event, wrappedPayload);
    };

} else {
    const { webContents } = require('electron');

    ipcSend = (event, payload) => {
        const wrappedPayload = getWrappedPayload(payload);
        
        webContents.getAllWebContents().forEach(({ webContents }) => {
            webContents.send(event, wrappedPayload);
        });
    }
}

module.exports = ipcSend;
