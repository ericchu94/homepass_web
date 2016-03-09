const expect = require('expect.js');
const fs = require('mz/fs');
const sinon = require('sinon');

function stubExecFile() {
  return fs.readFile('test/fixtures/hostapd_mock.txt').then(data => {
    return [data.toString()];
  });
}

it('should return 2 clients', function () {
  const child_process = require('mz/child_process');
  const stub = sinon.stub(child_process, 'execFile');
  stub.returns(stubExecFile());
  const index = require('../index');

  return index.getConnectedClients().then(function (data) {
    expect(data).to.eql([{
      mac: 'cc:fb:65:79:d3:4f',
      flags: '[AUTH][ASSOC][AUTHORIZED]',
      aid: '0',
      capability: '0x0',
      listen_interval: '0',
      supported_rates: '',
      timeout_next: 'NULLFUNC POLL',
      rx_packets: '0',
      tx_packets: '0',
      rx_bytes: '0',
      tx_bytes: '0',
      connected_time: '3'
    }, {
      mac: 'ac:cf:85:33:33:fc',
      flags: '[AUTH][ASSOC][AUTHORIZED]',
      aid: '0',
      capability: '0x0',
      listen_interval: '0',
      supported_rates: '',
      timeout_next: 'NULLFUNC POLL',
      rx_packets: '0',
      tx_packets: '0',
      rx_bytes: '0',
      tx_bytes: '0',
      connected_time: '13'
    }]);

    stub.restore();
  });
});
