const express = require('express');
const bodyParser = require('body-parser');
const sender = require('./sender')();

module.exports = function() {
    const server = {};
    const app = express();

    server.init = () => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        server.port = process.env.PORT || 8080;
        server.router = express.Router();

        setUpRoutes();
        app.use('/api', server.router);

        app.listen(port);
        console.log('Server listens on port ' + port + '.');
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

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);