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

            console.log('Systemcode: ' + systemCode + ' UnitCode: ' + unitCode);
            sender.on(systemCode, unitCode);

            res.status = 200;
            res.json({ status: 200 });
        });

        server.router.get('/:systemCode/:unitCode/off', (req, res) => {

            const systemCode = req.params.systemCode;
            const unitCode = req.params.unitCode;

            console.log('Systemcode: ' + systemCode + ' UnitCode: ' + unitCode);
            sender.off(systemCode, unitCode);
            
            res.status = 200;
            res.json({ status: 200 });
        });
    }

    return server;
}