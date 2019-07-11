// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const formidable = require('formidable');

// open mongoose connection
// mongoose.connect('mongodb://localhost/files_database');
//mongoose.connect();
// listen to requests
// var app = require('express')();


// app.post('/', function (req, res){
//     var form = new formidable.IncomingForm();

//     form.parse(req);

//     form.on('fileBegin', function (name, file){
//         file.path = __dirname + '/uploads/' + file.name;
//     });
//     form.on('field', function (name, value) {
//         console.log('name:', name, 'value:', value)
//         fields[name] = value;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.name);
//     });
// res.send('Success!');
//    // res.sendFile(__dirname + '/index.html');
// });

 app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

//app.listen(3000);
/**
* Exports express
* @public
*/
module.exports = app;
