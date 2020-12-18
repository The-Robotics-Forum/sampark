# Samparak
`Add the link for deployed frontend here`

## What the Project is?
Sampark is an open source team chat platform, which provides capabilies similar to slack. The Project is built using MERN Stack and Socket.io.
You can find the source code for front end in frontend branch of this repo and source code for backend in branch named backend.

## What Feature does this project have?
1) User can create Public rooms or private rooms, anyone can join your public room but for joing a private room, only people who are invited cna join. When a person is invited to a private room, an email is sent about the inviation.
2) Each Room will have multiple channels, which can be used for effective communication of various topics simultaneously.
3) Users can share text messages in real time on each channel.
4) Users can share files includes (audio/video/images) as well as location and formated code snippets.
5) Backend is able to detect abuses in text messages and messages can be reported as well.
6) Each user has some points associated to him, which decreases upon using abuses or when his messages are reported.
7) If a message is reported by some number of users it will not be shown to other members.
8) Each Room will have moderator, a moderator will have powers to kick a user or make the user a moderator.

## Excited? Want to start contributing?
1) For Contributing to backend, you should be familar with basics of node.js and socket.io and you are good to go.
2) For Contributing to frontend, you should have understanding of basics of Javascript, React and Redux.
3) Join your [Gitter channel]( https://gitter.im/The-Robotics-Forum/samparak?utm_source=share-link&utm_medium=link&utm_campaign=share-link ) , to get connected with the mentors. feel free to ask us questions and even if you wnat to suggest a new feature which the platform lacks.


## Contribution Guidelines

This is an Open Source Project. All contributions are welcome. Please follow the steps below for contributing.

- To file an issue or a feature request, use the [GitHub Issue Tracker](https://github.com/The-Robotics-Forum/samparak/issues) and describe briefly what you are expecting.
- To raise a Pull Request for frontend:
    1. Fork the repository
    2. Create a branch. Preferable name it the same as the issue you want to solve. Eg name `frontend-issue-712`.
    3. Commit your changes to the new branch you created in your forked repository.
    4. Raise a Pull Request to the `frontend-stage` branch of this repository.
- To raise a Pull Request for backend:
    1. Fork the repository
    2. Create a branch. Preferable name it the same as the issue you want to solve. Eg name `backend-issue-712`.
    3. Commit your changes to the new branch you created in your forked repository.
    4. Raise a Pull Request to the `backend-stage` branch of this repository.
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
