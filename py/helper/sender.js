module.exports = () => {
    
    exec = require('child_process').exec;

    pySender.sendValue = (value) => {
        exec('../bin/send ' + val, (error, stdout, stderr) => { 
        
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