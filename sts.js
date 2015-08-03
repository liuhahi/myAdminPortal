var async       = require("async"); 
var Trello      = require("node-trello");
var getRequests = require("./getRequests");
var dateFormat  = require('dateformat');
var yaml        = require('js-yaml');
var fs          = require('fs');
var mongo       = require('mongoskin');
var MongoClient = mongo.MongoClient;


//initialization
var mongourl = null;
var appkey   = null;
var token    = null;
var admin    = null;
//var lastTime = new Date();
try {
    var doc  = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    mongourl = doc.mongodburl;  
    appkey   = doc.appKey;
    token    = doc.oauthToken;
    admin    = doc.admin;
} catch (e) {
  console.log(e);
}

var g = new getRequests(appkey,token);
var count = 0;
//connect to database
var _db = MongoClient.connect(mongourl);

async.whilst(
    function () { return true; },    
        function (callback) {
        count++;
        setTimeout(callback, 5000);
        //console.log(Jcards.length);  
        console.log(Date())
 
        var collection = _db.collection('TrelloMsgSendingQueue');

        
        collection.find({}).toArray(function (err, result){
        var Jcards=JSON.parse(JSON.stringify(result));
        for(var i=0; i < Jcards.length; ++i) {
            console.log("item id:"+Jcards[i]._id)
            g.advCommentCard(Jcards[i].text,Jcards[i].Destination,Jcards[i]._id,function(data){
                //console.log(data);
                if(data!=null){
                    //console.log(typeof(data))
                    var myObj = JSON.parse(data)
                    pushToSentStack(myObj);                    
                    //console.log("piggy back:"+myObj.itemid)
                    removefromSendingQueue(myObj.itemid);     
                    //send to sentStack
                }
            });
        }
        });

        },
    function (err) {
        // 5 seconds have passed
    }//end of function
);

function pushToSentStack(myObj){
    
    var sentTime = new Date();
    //console.log(myObj.data)
    //dateFormat(sentTime, "isoDateTime");

    if(myObj !=null || typeof(myObj) != "undefined"){
        //console.log(sentTime.getDay()+'-'+sentTime.getMonth()+'-'+sentTime.getYear()+myObj.id)
        //create or insert to the stack
        // var month = sentTime.getMonth()+1;
        // var _db_name = sentTime.getDate()+'-'+month+'-'+sentTime.getFullYear();
        // console.log("db name :"+_db_name)    
        //_db_name = _db_name+"";
        _db_name = "TrelloMsgSentRecord";
        _db.createCollection(_db_name,function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("create result "+result);
        }
        );
        var collection = _db.collection(_db_name);
        collection.insert({text:myObj.data.text,cardid:myObj.id,sentTime:sentTime,creator:myObj.memberCreator.username},function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("INSERT result"+JSON.stringify(result));
        }
        );
    }
    else{
        console.log("no more from sending stack")
    }
    //var sentCollection = _db.collection(sentTime.get'');

}
function removefromSendingQueue(cardid){
    //console.log(typeof(collection)+collection);

    var collection = _db.collection('TrelloMsgSendingQueue');
    collection.removeById(cardid,function(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("Delete result"+result);
        }
    );
    console.log("removed _id:"+cardid)
}