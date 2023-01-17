# Interview Scheduler

## About 

Interview Scheduler is a full stack web application built using: 

- `Frontend:` React, HTML, Javascript & CSS
- `Backend:` PostgreSQL, Express, Nodejs & Axios
- `Testing:` Jest & Cypress

The app allows an user to create, edit and delete interviews based on the 25 slots available, Monday through Friday. The app also includes features to notify users of error such as fail api requests and missing inputs.

The API/Server side of the application was provided while the frontend of the application was developed using React components, and served as a tool to learn how components, hooks, states, and common testing practices.


## Setup

Install dependencies with `npm install or yarn install`. Note that some dependencies may not install properly using npm install for the client side, so it may be worth while using `yarn install`.

To install the [server side](https://github.com/lighthouse-labs/scheduler-api) please visit and follow the instructions .

## Running Webpack Development Server

```sh
npm start or yarn start
```

## Running Jest Test Framework

```sh
npm test or yarn test
```

## Running Storybook Visual Testbed

```sh
npm run storybook or yarn run storybook
```

## Running Cypress

```sh
npm run cypress or yarn run cypress
```
## Screenshots

Application home page:
![Application on load](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/blob/master/docs/Screen%20Shot%202023-01-16%20at%207.06.33%20AM.png)

Adding appointment:
![Booking Appointment](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/blob/master/docs/Screen%20Shot%202023-01-16%20at%207.06.59%20AM.png)

Booked appointment:
![Booked Appointment](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/blob/master/docs/Screen%20Shot%202023-01-16%20at%207.07.40%20AM.png)

Delete appointment:
![Delete confirmation page](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/tree/master/docs#:~:text=Screen%20Shot%202023%2D01%2D16%20at%207.08.15%20AM.png)

Submit empty form:
![Input Error](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/blob/master/docs/Screen%20Shot%202023-01-16%20at%207.09.16%20AM.png)

Edit error:
![API Error](https://github.com/Jevaughn-W/lighthouse-labs-scheduler/blob/master/docs/Screen%20Shot%202023-01-16%20at%207.09.55%20AM.png)

