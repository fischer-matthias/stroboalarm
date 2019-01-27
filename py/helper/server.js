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
            let result = send(res, req.params.systemCode, req.params.unitCode, true);
            res.status = result.status;
            res.json(result);
        });

        server.router.get('/:systemCode/:unitCode/off', (req, res) => {
            let result = send(res, req.params.systemCode, req.params.unitCode, false);
            res.status = result.status;
            res.json(result);
        });
    }

    send = (systemCode, unitCode, on) => {

        let validationResult = validateParameters(systemCode, unitCode);

        if (!validationResult.error) {
            console.log('Systemcode: ' + systemCode + ' UnitCode: ' + unitCode);

            if (on) {
                sender.on(systemCode, unitCode);
            } else {
                sender.off(systemCode, unitCode);
            }
        }

        return validationResult.status;
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