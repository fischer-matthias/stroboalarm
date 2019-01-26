const { spawn } = require('child_process');

module.exports = function() {
    
    var sender = {};

    sender.sendValue = (value) => {
        const ls = spawn('./send', [value]);

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