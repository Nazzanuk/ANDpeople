var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var DS = require("./document.js");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/people', function (req, res) {
    DS.insertDocument('people', req.body, function (doc) {
        res.send(doc);
    });
});

app.put('/people/', function (req, res) {
    DS.updateDocument('people', req.body, function (doc) {
        res.send(doc);
    });
});

app.get('/people', function (req, res) {
    DS.getDocuments('people', function (docs) {
        res.send(docs);
    });
});

app.get('/skills', function (req, res) {
    DS.getDocuments('skills', function (docs) {
        res.send(docs);
    });
});

app.get('/', function (req, res) {
    res.send('hello');
});

//
//app.get('/people/:id', function (req, res) {
//    res.send(users[req.params.id]);
//});
//

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});