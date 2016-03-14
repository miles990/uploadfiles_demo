var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    //callback(null, file.fieldname + '-' + Date.now());
    callback(null, file.originalname);
  }
});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/file',function(req,res){
    var upload = multer({ storage : storage}).single('userFile');
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.\n"+err);
        }
        if(req.res.req.file){
          console.log(req.res.req.file);
          res.writeHead(200,{"Content-Type": "charset=utf-8"});
          res.end("'"+req.res.req.file.filename+"'"+" File is uploaded");
        }else{
          res.end("No choosen file");
        }
        
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});