module.exports = require('./lib/express');

var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {

    var options = {
        url: 'https://twitter.com',
        ca: fs.readFileSync("/path/to/crawlera-ca.crt"),
        requestCert: true,
        rejectUnauthorized: true
    };

    var new_req = request.defaults({
        'proxy': 'http://<API KEY>:@proxy.crawlera.com:8010'
    });

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response.headers);
            console.log(body);
        }
        else{
            console.log(error, response, body);
        }
    }

    new_req(options, callback);

});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);

});
