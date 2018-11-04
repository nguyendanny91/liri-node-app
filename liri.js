require("dotenv").config();

var spotify = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var inquirer = require("inquirer");
 
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
    
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // multiple artists e.g. finesse?

    console.log("Song Name: " + data.tracks.items[0].name) // song name

    console.log("Album Name: " + data.tracks.items[0].album.name) //album name

    console.log("Preview Link: " + data.tracks.items[0].preview_url) //preview url

    })) :

command === 'concert-this' ?

    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        var artists = JSON.parse(body)

        console.log("Name of Venue: " + artists[0].venue.name)

        console.log("Country/City: " + artists[0].venue.country + "/" + artists[0].venue.city)

        var artistDateRaw = artists[0].datetime

            console.log("Date of Event: " + moment(artistDateRaw).format("MM/DD/YYYY")) 
    }
    }) :

command === 'movie-this' ?

    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        var response = JSON.parse(body)

        console.log("Movie Title: " + response.Title);
        console.log("Movie Year Release: " + response.Year);
        console.log("IMDB Rating: " + response.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.Ratings[1].Value);
        console.log("Country: " + response.Country);
        console.log("Lanaguage: " + response.Language);
        console.log("Movie Plot: " + response.Plot);
        console.log("Cast: " + response.Actors);
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


