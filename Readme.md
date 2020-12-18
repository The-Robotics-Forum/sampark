# Samparak backend
`deployed app link here`

## How Does sampark  backend work ?
Sampark uses both HTTP requests and webscokets in its application.  HTTP is used to perform tasks like login, getting all available public rooms, creating a room etc. Whereas Websockets are used for realtime message sharing. Using HTTP for realtime message sharing is a bad idea for realtime coomunication and will provide bad user experince to the user. Whenever a user sends a message in a channel it is transmitted to all online users via socket.io and also saves the message in database. Then when a users opens up a room, all previous messages are gathered  by a REST endpoint and further real time message will be shown via socket.io till the time user is online.

## What should you know before contribution.
1) Good understanding for `express.js`,`mongoose` and `node` is important.
2) Basic understanding of `socket.io` is required, Don't worry `socket.io` is a simple node module, learning it will not require lot of efforts, just visit [socket.io website](https://socket.io/get-started/chat/) ones.

## How to run the code Locally
1) Fork the Repository
2) Checkout to the `backend-master` branch.
3) If running locally run,open terminal and type `npm run dev`, this will use nodemon, which automatically restarts server upon any changes in files.(Not recomended when using low configuration as it this is heavy in process load).
3) For deployment , open terminal and type `npm start`.
4) The server will start on 8081 by default, you can set a custom port by set a environment variable of name `PORT`.


## Contribution Guidelines

This is an Open Source Project. All contributions are welcome. Please follow the steps below for contributing.

- To file an issue or a feature request, use the [GitHub Issue Tracker](https://github.com/The-Robotics-Forum/samparak/issues) and describe briefly what you are expecting.
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
