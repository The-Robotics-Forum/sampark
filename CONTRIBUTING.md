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
