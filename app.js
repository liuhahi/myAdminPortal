var app = require('express')(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	port = process.env.PORT||3000,
	mongo = require('mongoskin'),
	MongoClient = mongo.MongoClient,
	mongourl = 'mongodb://localhost:27017/trellodemo'	
    Db = mongo.Db,
    _db = null,
    Server = mongo.Server;

app.use(morgan('dev'));

app.use(bodyParser.json());

_db = MongoClient.connect(mongourl);

app.listen(port, function() {
	console.log('listening for requests on localhost:%s',port);
	var collection = _db.collection('data');
	collection.find({}).toArray(function (err, result) {
		console.log(result[0]);
		});
})

app.get('/users',function (req,res){
	var collection = _db.collection('data');
	collection.find({}).toArray(function (err, result) {
		if(err){
			console.error(err);
			res.status(500).end();
		}else{
			res.send({success:true,users:result});
		}
	})
})
    

