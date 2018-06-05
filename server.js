require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var api = require('./routes/api')

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.once('open', ()=>{
	console.log('Mongo ON')
}).on('error',() => { 
	console.log('Database Error '+err);
})

app.use('/api/', api)
app.use(express.static('public'));

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/index.html');
});

app.listen(3000 || process.env.PORT, ()=>{
	console.log("Server On");
});
