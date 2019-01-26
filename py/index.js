const { spawn } = require('child_process');
const ls = spawn('send', ['5506388']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// var sender = require('./helper/sender')();
// var sleep = require('sleep');

// var ON = '5506385';
// var OFF = '5506388';

// var status = OFF;

// while(1) {

//     if (status === ON) {
//         status = OFF;
//     } else {
//         status = ON;
//     }

//     while(true) {
//         sender.sendValue(status);
//         sleep.sleep(1);
//     }
// }
