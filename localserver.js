const http = require('http');
var express = require('express');
var app = express();
var port = 8000;
var cors = require('cors');
var multer = require('multer');
var child_process = require('child_process').execSync;
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');



var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./");
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
		console.log(file.originalname)
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: Storage
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(cors());

app.use(express.static('./')); 

// Start the server on port 3000
app.listen(port, '127.0.0.1');
console.log('File server running on port '+port);

app.post("/upload", upload.any(), function (req, res, cb) {
    console.log("in");

    res.send("done");
});

app.post("/upload7",function (req, res) {
	
const directoryPath = __dirname;

var model=req.body.id;
console.log("model"+model);
var hnumber=0
var ref=null;
var prev=null;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if (file.includes(model)) {
            var ext = file.split('.').pop();
            console.log("ext"+ext);
            if (ext == "prt"||ext =="asm") {
                ref = file;
				prev=file
                //var hnumber=0;
				console.log("part");
            }
            if (ext != "prt") {
               console.log("111");
                if (ext > hnumber) {
					console.log("in")
                    ref = file;
					
					fs.unlink(prev, function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
}); 
					
					hnumber=ext;
					prev=file;
                } 

            };
        };
    });
	
var newname=model;
console.log(ref);
console.log("sent"+newname);
	
fs.renameSync(ref, newname);
    
});

res.send("done");
});


//joining path of directory 
