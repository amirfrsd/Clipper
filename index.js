var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
const fileUpload = require('express-fileupload');

var app = express();
var port = process.env.port || 8191;
var router = express.Router();

app.use(morgan('dev'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

app.post('/upload', function(req, res){
    if (!req.files)
        return res.status(400).json({success:false,message:'No files are uploaded.'});
    let file = req.files.picture;
    let uuid = guid();
    file.mv('../static_content/' + uuid + '.jpg', function(err){
        if (err)
            return res.status(500).json({success:false, message:err});
        res.json({success:true, message:'https://myfuckingapi.com/'+ uuid + '.jpg'})
    })
});

app.listen(port);
