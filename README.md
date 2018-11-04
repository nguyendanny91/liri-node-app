
# liri-node-app

## Overview
In this repository I created a LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Capabilities
* The application has the following search capabilities:
    1. Song - Details regarding a song a user is searching
    2. Venue - Upcoming shows for an artist(s)/performer
    3. Movie - Details regarding a movie a user is searching
* Application has a command line interface
* The application logs system responses into "log.txt" file

## Components
* API
  1. Spotify API
  2. BandsinTown API
  3. OMDB API
* NPM Packages
  1. dotenv
  2. inquirer
  3. moment
  4. node-spotify-api
  5. request

## Examples

1. Execute Application

```
node liri.js
```

<img width="453" alt="example1" src="https://user-images.githubusercontent.com/41662459/47960692-f65d7b00-dfbb-11e8-9174-478b0713936c.png">

2. User arrow keys to select what you would like to search for and select 'Enter' on keyboard
```
NOTE: If user selects "What you want" then the application will run the text in the "random.txt" file
```

<img width="580" alt="screenshot2" src="https://user-images.githubusercontent.com/41662459/47960726-83a0cf80-dfbc-11e8-93cf-cb78edaf488e.png">

3. Enter in your search criteria and select 'Enter' on keyboard

<img width="945" alt="screenshot3" src="https://user-images.githubusercontent.com/41662459/47960747-d8444a80-dfbc-11e8-977c-d2a7453d2eed.png">

4. Repeat steps 1-3 and view log.txt file
<img width="835" alt="screenshot4" src="https://user-images.githubusercontent.com/41662459/47960786-543e9280-dfbd-11e8-9e80-53abe6e95e43.png">
