var exec = require('child_process').exec;

var ON = '5506385';
var OFF = '5506388';

var status = false;

function sendValue(val) {
    exec('./bin/send ' + val, (error, stdout, stderr) => { console.log(stdout);});
}

while(true) {

    setTimeout(() => {
        status = !status;
        sendValue((status ? ON : OFF));
        sendValue((status ? ON : OFF));
        sendValue((status ? ON : OFF));
        sendValue((status ? ON : OFF));
        sendValue((status ? ON : OFF));
    }, 2000);

}

