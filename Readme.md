# Samparak Frontend
`deployed app link here`

## How Does sampark frontend work ?
Sampark uses React for frontend because of its modularity and reusablity of components. Redux and Redux-Thunk is used for state-management 

Sampark uses both HTTP requests and webscokets in its application.  HTTP is used to perform tasks like login, getting all available public rooms, creating a room etc. Whereas Websockets are used for realtime message sharing. Using HTTP for realtime message sharing is a bad idea for realtime coomunication and will provide bad user experince to the user. Whenever a user sends a message in a channel it is transmitted to all online users via socket.io and also saves the message in database. Then when a users opens up a room, all previous messages are gathered  by a REST endpoint and further real time message will be shown via socket.io till the time user is online.

## What should you know before contribution.
1) Good understanding for `react`,`redux` and `redux-thunk` is important.
2) Using `material-ui` components for frontend devlopment would be highly appreciated.

## How to run the code Locally
1) Fork the Repository
2) Checkout to the `front-master` branch.
3) Open Terminal,  type `npm start` (this will take couple of minutes)

## Contribution Guidelines

This is an Open Source Project. All contributions are welcome. Please follow the steps below for contributing.

- To file an issue or a feature request, use the [GitHub Issue Tracker](https://github.com/The-Robotics-Forum/samparak/issues) and describe briefly what you are expecting.
- To raise a Pull Request for frontend:
    1. Fork the repository
    2. Create a branch. Preferable name it the same as the issue you want to solve. Eg name `frontend-issue-712`.
    3. Commit your changes to the new branch you created in your forked repository.
    4. Raise a Pull Request to the `frontend-stage` branch of this repository.
- The `frontend-stage` will be merged with `frontend-master` and `backend-stage` will be merged with `backend-master` weekly on Sundays.
- Each master will have its own CI integration, so that the contributors and mentors can have look at recent code in action.

**Make sure to follow these guidelines**
1. Run `npm start` locally before pushing any commits or creating a Pull Request.
    - If `npm start` is failing locally, your Pull Request will also fail and won't be able to merge.
2. If you are taking up any issue from the issue tracker, please name your commits in this form. This will automatically link the Issue to your commit.
    - `Fix #{Issue Number}: Whatever change you did`
    - Example commit message: `Fix #9: Added a new function`
3. Give "easy to understand" names to the branches you create in your forked repository
4. While creating a Pull Request, explain in brief what changes you made.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
ee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
