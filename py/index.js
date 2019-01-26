var exec = require('child_process').exec;

console.log('start sniffer-process . . .');
exec('./bin/sniffer', (error, stdout, stderr) => {
    console.log(stdout);
});