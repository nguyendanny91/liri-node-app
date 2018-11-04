require("dotenv").config();

var spotify = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var inquirer = require("inquirer");
var filename = "log.txt"

var displayName = ''
 
var spotify = new Spotify({
  id: spotify.spotify.id,
  secret: spotify.spotify.secret
});

var command = '';


function liriLogic(search,command) {
command === 'spotify-this-song' ?

    ((search == '' ? search ='The Sign Ace of Base' :
        search) 

    ,

    spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    displayName = 
        "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" +

        "Song Name: " + data.tracks.items[0].name + "\n" +

        "Album Name: " + data.tracks.items[0].album.name + "\n" +

        "Preview Link: " + data.tracks.items[0].preview_url;

    console.log(displayName);

    logfile(displayName)

    })) :

command === 'concert-this' ?

    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        var artists = JSON.parse(body)
        var artistDateRaw = artists[0].datetime

        displayName = 
            "Name of Venue: " + artists[0].venue.name + "\n" +

            "Country/City: " + artists[0].venue.country + "/" + artists[0].venue.city + "\n" +

            "Date of Event: " + moment(artistDateRaw).format("MM/DD/YYYY");

    console.log(displayName);

    logfile(displayName)
    }
    }) :

command === 'movie-this' ?

    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        var response = JSON.parse(body)

        displayName = 
            "Movie Title: " + response.Title + "\n" +
            "Movie Year Release: " + response.Year + "\n" +
            "IMDB Rating: " + response.imdbRating + "\n" +
            "Rotten Tomatoes Rating: " + response.Ratings[1].Value + "\n" +
            "Country: " + response.Country + "\n" +
            "Lanaguage: " + response.Language + "\n" +
            "Movie Plot: " + response.Plot + "\n" +
            "Cast: " + response.Actors;

        console.log(displayName);

        logfile(displayName)
    }
    }) :

console.log("Error!")
}

//inquirer logic

inquirer.prompt([
    {
        type: "list",
        name: "searchType",
        message: "What would you like to search for?",
        choices: ["Whatever you want (text file)", "Song", "Concert", "Movie"]
    }

]).then(function(user) {

    user.searchType === 'Song' ?
        command = 'spotify-this-song' :
    user.searchType === 'Movie' ?
        command = 'movie-this' :
    user.searchType === 'Concert' ?
        command = 'concert-this' :
    user.searchType === 'Whatever you want (text file)' ?
        command = 'do-what-it-says':

        null;

    command != 'do-what-it-says' ?

        inquirer.prompt([
        {
            type: "input",
            name: "search",
            message: "Please enter details of selection"
        }
        ]).then(function(user) {
        console.log(user.search)

        liriLogic(user.search,command)
        }) :
    
        fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        command = dataArr[0]
        search = dataArr[1].replace(/"/g, "")      

        liriLogic(search,command)

    })


})

function logfile(text) {

    text = text + "\n" + "------------------------" + "\n" ;

    fs.appendFile(filename, text, function(err) {

        // If an error was experienced we will log it.
        if (err) {
        console.log(err);
        }
    
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
        console.log("Content Logged!");
        }
    
    });
}


