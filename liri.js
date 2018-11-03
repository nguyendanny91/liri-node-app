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

var command = process.argv[2]
var search = process.argv.slice(3).join(" ");


command === 'do-what-it-says' ?

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");

        command = dataArr[0]
        search = dataArr[1].replace(/"/g, "")        

        liriLogic()
        }) :

        liriLogic()


function liriLogic() {
command === 'spotify-this-song' ?

    ((search == '' ? search ='The Sign Ace of Base' :
        search) 
    
    ,

    spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log(data.tracks.items[0].album.artists[0].name); // multiple artists e.g. finesse?

    console.log(data.tracks.items[0].name) // song name


    console.log(data.tracks.items[0].album.name) //album name

    console.log(data.tracks.items[0].preview_url) //preview url

    })) :

command === 'concert-this' ?

    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        var artists = JSON.parse(body)

        console.log(artists[0].venue.name)

        console.log(artists[0].venue.country)

        console.log(artists[0].venue.city)

        var artistDateRaw = artists[0].datetime

            console.log(moment(artistDateRaw).format("MM/DD/YYYY")) 
    }
    }) :

command === 'movie-this' ?

    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log(JSON.parse(body));
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

    command === 'do-what-it-says' ? 
        
    console.log("insert default logic") :

    inquirer.prompt([
    {
        type: "input",
        name: "search",
        message: "Please enter details of selection"
    }
    ]).then(function(user) {
    console.log(user.search)
    });


})


