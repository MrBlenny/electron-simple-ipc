# electron-simple-ipc
This standardises IPC in electron so it works the same in all threads.

## Usage
In either a renderer or main electron thread:
```javascript
ipcSend('SOME_EVENT_NAME', {
  data1: 'some data in the event payload'
})

ipcReceive('SOME_EVENT_NAME', (payload) => {
  console.log('We process the payload here', payload);
})

```
