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
        server.router.get('/sytem/:system/unit/:unit/on', (req, res) => {
            let result = send(res, req.params.system, req.params.unit, true);
            res.status = result.status;
            res.json(result);
        });

        server.router.get('/sytem/:system/unit/:unit/off', (req, res) => {
            let result = send(res, req.params.system, req.params.unit, false);
            res.status = result.status;
            res.json(result);
        });
    }

    send = (systemCode, unitCode, on) => {

        console.log('Systemcode: ' + systemCode + ' UnitCode: ' + unitCode);
        let validationResult = validateParameters(systemCode, unitCode);

        if (!validationResult.error) {

            if (on) {
                sender.on(systemCode, unitCode);
            } else {
                sender.off(systemCode, unitCode);
            }
        }

        return validationResult;
    }

    validateParameters = (systemCode, unitCode) => {
        if (systemCode == undefined || systemCode == null || systemCode.length !== 5) {
            return { error: 'wrong systemCode length => should be five!', status: 412 };
        } else if (unitCode !== 'A' && unitCode !== 'B' && unitCode !== 'C' && unitCode !== 'D') {
            return { error: 'wrong unitCode => should be one of them [A,B,C,D]!', status: 412 };
        } else {
            return { status: 200 };
        }
    }

    return server;
}