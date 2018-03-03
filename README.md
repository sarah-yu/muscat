# muscat

[![Build Status](https://travis-ci.org/sarah-yu/muscat.svg?branch=master)](https://travis-ci.org/sarah-yu/muscat)

Find your purrfect friend with muscat! This app shows you cats that are available for adoption and is named after my own cat, Muscat.

![muscat screenshot](./public/muscat-home.png)

With muscat, you can:
- Search for cats by location (zip code or city, state).
- Filter by breed, age, gender, and special needs.
- See more details about each cat, including contact information for those interested in adopting.

![muscat screenshot](./public/muscat-show.png)


## Why muscat?

I built muscat because cats are the best, and I think every cat deserves a loving home. I included a column indicating whether or not each cat has special needs because [some people](https://www.youtube.com/watch?v=7WN3ohF104s) specialize in taking in these kinds of cats, and I think the people that have it in their hearts to do so are truly amazing.


## Technology & Data

- Data retrieved from the [Petfinder API](https://www.petfinder.com/developers/api-docs)
- Node.js
- Express.js
- React.js
- [Material-UI](http://www.material-ui.com/)
- [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [SuperTest](https://github.com/visionmedia/supertest)
- Travis CI


## Installation

1. Clone the repo for the service layer [here](https://github.com/sarah-yu/muscat-service) and run ```npm install```.
2. Clone this repo and run ```npm install```.
3. Start your Express server by running ```nodemon index.js``` in the service layer directory.
4. Start the React app by running ```npm run start```.
