const { spawn } = require('child_process');
const bParser = require('./brennenstuhl-parser')();

module.exports = function() {
    
    const STATE_ON = 'ON';
    const STATE_OFF = 'OFF';

    var sender = {};

    sender.on = (systemCode, unitCode) => {
      send(bParser.parse(systemCode, unitCode, STATE_ON));
    }

    sender.off = (systemCode, unitCode) => {
      send(bParser.parse(systemCode, unitCode, STATE_OFF));
    }

    send = (value) => {
        const ls = spawn('./bin/send', [value]);

        ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        
        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        
        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
    };

    return sender;
}