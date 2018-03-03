# muscat

[![Build Status](https://travis-ci.org/sarah-yu/muscat.svg?branch=master)](https://travis-ci.org/sarah-yu/muscat)

Find your purrfect friend with muscat! This app shows you cats that are available for adoption and is named after my own cat, Muscat.

![muscat screenshot](./public/muscat-home.png)

With muscat, you can:
- Search for cats by location (zip code or city, state).
- Filter by breed, age, gender, and special needs.
- See more details about each cat, including contact information for those interested in adopting.

![muscat screenshot](./public/muscat-show.png)


## Technology & Data

- Data retrieved from the [Petfinder API](https://www.petfinder.com/developers/api-docs)
- Node.js
- Express.js
- React.js
- [Material-UI](http://www.material-ui.com/)
- [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [SuperTest](https://github.com/visionmedia/supertest)
- Travis CI


## Installation

1. Clone the repo for the back end API [here](https://github.com/sarah-yu/muscat-service) and run ```npm install``` to install all dependencies.
2. Clone this repo for the front end application and run ```npm install``` to install all dependencies.
3. Start the back end server by running ```nodemon index.js```.
4. Start the front end React app by running ```npm run start```.
