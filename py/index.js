var sender = require('./helper/sender')();
var sleep = require('sleep');

var ON = '5506385';
var OFF = '5506388';

var status = OFF;

while(1) {

    if (status === ON) {
        status = OFF;
    } else {
        status = ON;
    }

    while(true) {
        sender.send(status);
        sleep.sleep(1);
    }
}
