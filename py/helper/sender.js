module.exports = () => {
    
    var exec = require('child_process').exec;
    var pySender = {};

    pySender.sendValue = (value) => {
        exec('./../bin/send ' + value, (error, stdout, stderr) => { 
        
            if (error) {
                console.error(error);
            }
    
            if (stdout) {
                console.log('Send')
            }
        });
    };

    return pySender;
}