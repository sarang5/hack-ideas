# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

In the project directory, run

### `npm install`

This will install all the dependencies required for the application to start mentioned in the package.json

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npx json-server --watch data/db.json --port 8000`

Runs the demo rest json webservice. Data will be served from [JSON](./data/db.json) file and is used for GET/POST/PUT operations in the app

## Login
Use employee ids from the list [E2018101, E2018121, E2019212, E2020250]

## Operations(Home)
Employees can perform the below operations in the Home page after successful login
[Create, Search, Sort(Created Date and Votes), Upvote]

## Future Ideas
1. UI
    Allow users to see only their blogs
    Option to Delete the blog
    Sorting through UI

2. Service
    Separate `Votes` from challenges REST Service
