const { ipcReceive, ipcReceiveOnce } = require('./ipcReceive');
const ipcSend = require('./ipcSend');

module.exports = {
  ipcReceive,
  ipcReceiveOnce,
  ipcSend
}