var express = require('express');
var app = express();

app.use(express.static('public'))
app.get('/', function(req, res){
   res.sendFile(__dirname+"/public/index.html"); //__dirname: Aktif klasörün bulunduğu yol.
});

app.listen(process.env.PORT);