var sender = require('./helper/sender')();

var ON = '5506385';
var OFF = '5506388';

var status = OFF;

while(1) {

    if (status === ON) {
        status = OFF;
    } else {
        status = ON;
    }

    setTimeout(() => {
        sender.send(status);
    }, 1000);
}
