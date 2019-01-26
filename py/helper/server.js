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
        server.router.get('/on', (req, res) => {
            sender.sendValue('5506385');
            res.status = 200;
            res.json({ status: 200 });
        });

        server.router.get('/off', (req, res) => {
            sender.sendValue('5506388');
            res.status = 200;
            res.json({ status: 200 });
        });
    }

    return server;
}