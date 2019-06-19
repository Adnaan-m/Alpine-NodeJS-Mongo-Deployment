var express = require('express');
var app = express();
var port = 4000;
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://alpine_mongodb_1:27017/alpine");
var nameSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: Number
   });
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.htm");
});

app.post("/submitform", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});



// prints an image
app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

// Useful Website https://codeburst.io/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073