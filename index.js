'use strict';

const execFile = require('mz/child_process').execFile;
const fs = require('mz/fs');

const hostapdCli = '/usr/bin/hostapd_cli';
const hostapdCliArgs = ['all_sta'];

function getHostapdStatus() {
  return execFile(hostapdCli, hostapdCliArgs).then(result => {
    return result[0];
  }, err => {
    throw new Error('Failed to get hostapd status');
  });
}

function getConnectedClients() {
  return getHostapdStatus().then(function (data) {
    const lines = data.split('\n');
    const clients = [];
    let client = null;
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line.match(/^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/)) {
        client = {mac: line};
        clients.push(client);
      } else if (client) {
        const pair = line.split('=');
        if (pair[0]) {
          client[pair[0]] = pair[1];
        }
      }
    }
    return clients;
  });
}

getHostapdStatus().then(function (data) {
  console.log('success:', data);
}, function (err) {
  console.log('fail:', err);
});

exports.getConnectedClients = getConnectedClients;
