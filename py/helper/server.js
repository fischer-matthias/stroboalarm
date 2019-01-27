const express = require('express');
const bodyParser = require('body-parser');
const sender = require('./sender')();

module.exports = function() {
    const server = {};

    server.init = () => {
        server.app = express();
        server.app.use(bodyParser.urlencoded({ extended: true }));
        server.app.use(bodyParser.json());

        server.port = process.env.PORT || 8080;
        server.router = express.Router();

        setUpRoutes();
        server.app.use('/api', server.router);

        server.app.listen(server.port);
        console.log('Server listens on port ' + server.port + '.');
    }

    setUpRoutes = () => {
        server.router.get('/:systemCode/:unitCode/on', (req, res) => {
            const systemCode = req.params.systemCode;
            const unitCode = req.params.unitCode;
            
            if (systemCode && unitCode) {
                send(res, systemCode, unitCode, true);
            }
        });

        server.router.get('/:systemCode/:unitCode/off', (req, res) => {

            const systemCode = req.params.systemCode;
            const unitCode = req.params.unitCode;
            
            if (systemCode && unitCode) {
                send(res, systemCode, unitCode, false);
            }
        });
    }

    send = (res, systemCode, unitCode, on) => {
        if (validateParameters(res, systemCode, unitCode)) {
            console.log('Systemcode: ' + systemCode + ' UnitCode: ' + unitCode);

            if (on) {
                sender.on(systemCode, unitCode);
            } else {
                sender.off(systemCode, unitCode);
            }
            
            res.status = 200;
            res.json({ status: 200 });
        }
    }

    validateParameters = (res, systemCode, unitCode) => {
        if (systemCode.length !== 5) {

            res.status = 412;
            res.json({ error: 'wrong systemCode length => should be five!'});
            return false;

        } else if (unitCode !== 'A' && unitCode !== 'B' && unitCode !== 'C' && unitCode !== 'D') {

            res.status = 412;
            res.json({ error: 'wrong unitCode => should be one of them [A,B,C,D]!'});
            return false;

        } else {
            return true;
        }

        return true;
    }

    return server;
}