require("dotenv").config();
var fs = require('fs');
var keys = require('./keys.js');

var action = process.argv[2];
var nodeArgs =process.argv;



var value = "";
for(var i = 3; i < nodeArgs.lenght; i++){
    if (i>3 && i<nodeArgs.length){
        value=value + "+" + nodeArgs[i];
    }

    else{
        value = value + nodeArgs[i];
    }
}

if (action == "my-tweets"){
    twitter();
} else if(action == "spotify-this-song"){
    spotify();
} else if(action == "movie-this"){
    imdb();
} else if (action == "do-what-it-says"){
    dwis();
}


// twitter function
function twitter(){
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);


var params = { screen_name: value, count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error){
        console.log("================================");
        console.log("here are the rescent tweets");
        console.log("=================================");

        for (var i = 0; i < tweets.length; i++){
            console.log("-------------------------------------------");
            console.log("Tweeted on: " + tweets[i].created_at);
            console.log(tweets[i].text);
        }
    }
});
}