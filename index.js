const execFile = require('mz/child_process').execFile;
const fs = require('mz/fs');

const hostapdCli = '/usr/bin/hostapd_cli';
const hostapdCliArgs = ['all_sta'];
const hostapdMock = 'hostapd_mock.txt';

function getHostapdStatusCli() {
  return execFile(hostapdCli, hostapdCliArgs).then(result => {
    return result[0];
  });
}

function getHostapdStatusMock() {
  return fs.readFile(hostapdMock).then(data => {
    return data.toString();
  });
}

function getHostapdStatus() {
  return getHostapdStatusMock().catch(err => {
    throw new Error('Failed to get hostapd status');
  });
}

getHostapdStatus().then(function (data) {
  console.log('success:', data);
}, function (err) {
  console.log('fail:', err);
});
