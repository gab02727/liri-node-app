require("dotenv").config();
//FS IS AN NPM PACKAGE FOR READING AND WRITING FILES
var fs = require('fs');

var keys = require('./keys.js');

var action = process.argv[2];
var nodeArgs = process.argv;



var value = "";
// LOOPS THROUGH ALL THE WORDS IN THE NODE ARGUMENT 
// LOOP TO GET EVERYTHING AFTER THE INDEX OF 2 NODE ARGUMENT
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        value = value + "+" + nodeArgs[i];
    }

    else {
        value = value + nodeArgs[i];
    }
}

// IF STATEMENT FOR RUNNING DIFFERENT APPS 
// THIS WILL DIRECT WHICH FUNCTION TO RUN

if (action == "my-tweets") {
    twitter();
} else if (action == "spotify-this-song") {
    spotify();
} else if (action == "movie-this") {
    imdb();
} else if (action == "do-what-it-says") {
    dwis();
}


// twitter function
function twitter() {
    //GRAB THE TWITTER PACKAGE 
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);


    var params = { screen_name: value, count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("================================");
            console.log("here are the rescent tweets");
            console.log("=================================");

            for (var i = 0; i < tweets.length; i++) {
                console.log("-------------------------------------------");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}


function spotify() {

    if (value != false) {

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);

        spotify.search({
            type: 'track',
            query: value, limit: 1
        }, function (error, data) {
            if (error) {
                console.log('error occured: ' + error);
                return;

            }

            console.log("---------------------------------------------------");
            console.log(" ");
            console.log("The song you entered was " + value + ".");
            console.log(" ");
            console.log("Here is the infromation you requested!");
            console.log(" ");
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log(" ");
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log(" ");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log(" ");
            console.log("---------------------------------------------------")
        });
    }
    else {
        {
            var Spotify = require('node-spotify-api');
            var spotify = new Spotify(keys.spotify);

            spotify.search({
                type: 'track',
                query: 'ace+of+base+sign' + '&limit=1&'

            }, function (error, data) {
                if (error) {
                    return console.log(error);
                }
                console.log("---------------------------------------------------");
                console.log(" ");
                console.log("Since you didnt enter a song here is the following: ");
                console.log(" ");
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log(" ");
                console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
                console.log(" ");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log(" ");
                console.log("---------------------------------------------------");
            });
        }
    }
}


function imdb() {
    var request = require('request');
    // var omdbApi = require('omdb-client');
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy", function (error, response, body) {
        // console.log(body);
        // IF THE REQUEST IS SUCCESFUL (i.e. IF THE RESPONSE STATUS CODE IS 200)
        // if (!error && response.statusCode == 200) {
        if (value != false) {

            // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
            console.log("======================================================================");
            console.log("The movie's name is: " + JSON.parse(body).Title);
            console.log("");
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("");
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("This movie was produced in the: " + JSON.parse(body).Country);
            console.log("");
            console.log("The language for this movie is in: " + JSON.parse(body).Language);
            console.log("");
            console.log("The movie's Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("The movie's Actor's: " + JSON.parse(body).Actors);
            console.log("");
            console.log("");
            console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
            console.log("");
            console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
            console.log("");
        } else {

            //IF THERE IS MOVIE NETERED BY THE USER IT WILL DEFAULT TO THE MOVIE PRELAODED HERE MR. NOBODY.     
            var request = require('request');

            // RUN A REQUEST TO THE OMDB API WITH THE MOVIE SPECIFIED (CAN BE MULTI WORD MOVIES)
            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json&apikey=trilogy', function (error, response, body) {

                // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
                console.log("======================================================================");
                console.log("The movie's name is: " + JSON.parse(body).Title);
                console.log("");
                console.log("The movie was released in: " + JSON.parse(body).Year);
                console.log("");
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("");
                console.log("This movie was produced in the: " + JSON.parse(body).Country);
                console.log("");
                console.log("The language for this movie is in: " + JSON.parse(body).Language);
                console.log("");
                console.log("The movie's Plot: " + JSON.parse(body).Plot);
                console.log("");
                console.log("The movie's Actor's: " + JSON.parse(body).Actors);
                console.log("");
                console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
                console.log("");
                console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
                console.log("");
            });

        }
    });
}




function dwis() {

    //FS IS AN NPM PACKAGE FOR READING AND WRITING FILES 
    var fs = require('fs');

    // THIS BLOCK OF CODE READS FROM THE "random.txt" FILE.

    fs.readFile("random.txt", "utf8", function (error, data) {

        //THIS SPLITS ALL THE INFORMATIOM INSIDE 
        data = data.split(',');

        var command;
        var parameter;

        if (data.length == 2) {
            command = data[0];
            parameter = data[1];

            // PRINTS THE CONTENTS OF DATA WHICH IS IN RESULT 
            //console.log(result);

            // if (result != false) {
            parameter = parameter.replace('"', '');
            parameter = parameter.replace('"', '');
            // console.log(parameter);

            switch (command) {
                case 'my-tweets':
                    value = parameter;
                    twitter();
                    break;

                case 'spotify-this-song':
                    value = parameter;
                    spotify();
                    break;

                case 'movie-this':
                    value = parameter;
                    imdb();
                    break;
            }
        }
    });    
}





























    // var omdb = new Omdb(keys.omdb);




    //     var params = {
    //         apiKey: 'trilogy',
    //         title: value,
    //         incTomatoes: true
    //     }
    //     omdbApi.get(params, function (err, data) {
    //         if (err) return console.log("Movie name is either incorrect or not found!");
    //         // process response...
    //         //console.log(data)
    //         console.log(`Title: ${data.Title}.
    // Year: ${data.Year}.
    // IMDB Rating: ${data.imdbRating}.
    // Rotten Tomatoes:${data.Ratings[1].Value}.
    // Country: ${data.Country}.
    // Language: ${data.Language}.
    // Plot: ${data.Plot}.
    // Actors: ${data.Actors}.`);


    //     });
    // }



































    // var queryUrl ='http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=trilogy';
    // console.log(queryUrl);
    //  request(queryUrl, function (error, response, body) {
        // IF THE REQUEST IS SUCCESFUL (i.e. IF THE RESPONSE STATUS CODE IS 200)
        // if (!error && response.statusCode == 200) {
        //     console.log("release year: " + JSON.parse(body).Year);
        // }
        // else{
        //     console.log(error);
        // }
        // IF THE REQUEST IS SUCCESFUL (i.e. IF THE RESPONSE STATUS CODE IS 200)
        //if (!error && response.statusCode == 200) {
    //         if (value != false) {

    //             // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
    //             console.log("======================================================================");
    //             console.log("The movie's name is: " + JSON.parse(body).Title);
    //             console.log("");
    //             console.log("The movie was released in: " + JSON.parse(body).Year);
    //             console.log("");
    //             console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    //             console.log("");
    //             console.log("This movie was produced in the: " + JSON.parse(body).Country);
    //             console.log("");
    //             console.log("The language for this movie is in: " + JSON.parse(body).Language);
    //             console.log("");
    //             console.log("The movie's Plot: " + JSON.parse(body).Plot);
    //             console.log("");
    //             console.log("The movie's Actor's: " + JSON.parse(body).Actors);
    //             console.log("");
    //             console.log("");
    //             console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
    //             console.log("");
    //             console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
    //             console.log("");
    //         } else {

    //             //IF THERE IS MOVIE NETERED BY THE USER IT WILL DEFAULT TO THE MOVIE PRELAODED HERE MR. NOBODY.     
    //             var request = require('request');

    //             // RUN A REQUEST TO THE OMDB API WITH THE MOVIE SPECIFIED (CAN BE MULTI WORD MOVIES)
    //             request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=triology', function(error, response, body) {

    //                 // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
    //                 console.log("======================================================================");
    //                 console.log("The movie's name is: " + JSON.parse(body).Title);
    //                 console.log("");
    //                 console.log("The movie was released in: " + JSON.parse(body).Year);
    //                 console.log("");
    //                 console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    //                 console.log("");
    //                 console.log("This movie was produced in the: " + JSON.parse(body).Country);
    //                 console.log("");
    //                 console.log("The language for this movie is in: " + JSON.parse(body).Language);
    //                 console.log("");
    //                 console.log("The movie's Plot: " + JSON.parse(body).Plot);
    //                 console.log("");
    //                 console.log("The movie's Actor's: " + JSON.parse(body).Actors);
    //                 console.log("");
    //                 console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
    //                 console.log("");
    //                 console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
    //                 console.log("");
    //             });
    //         }    
    //     });    
//     });
// }        



