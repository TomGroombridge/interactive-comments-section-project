## Interactive Comments Project

This interactive comments section allows you to log in using an email address and password, or Google credentials, and then upvote, downvote, add new comments, edit your own comments, reply to existing comments or delete your own comments.

There is website and mobile styling, and we have created tests for all functionality, which all pass.

This project was created with [Create React App](https://github.com/facebook/create-react-app). This project is focussed on making sure we understand how to use state, props, unit/integration tests, responsive design, valitdaion, Javascript objects and React patterns

## How to install and run the project and tests

To run this project, start by running `npm install` to install the dependencies. Then run `npm start` to run the app in the development mode. Open [http://localhost:3000] to view it in your browser. To run the tests, run `npm run cypress:open` in the terminal. This will open up the cypress package in a chrome window and allow you to run your integration tests.

## How to use the project

When not logged in or not authenticated:

User can view existing comments and replies, including the image and name of the user who posted the comment, the time it was posted, and the score for each comment and reply.

An unauthenticated user cannot upvote or downvote a comment or reply, a modal will appear advising the user to log in to vote.

When logged in or authenticated:

User can upvote and downvote on comments and replies by clicking the + or - which will either increase or decrease the value of the score.

The authenticated user can reply to existing comments by clicking the reply button, entering details into the input field and submitting the form.

User can add a new comment by typing into the text area with the placeholder 'Add a comment...' and submitting the form. The user can then also edit or delete their own comments and replies, but nobody else's, by clicking the edit or delete buttons, which only show on user's own comments when authenticated.

We used React for the application, Cypress for testing, Auth0 for authentication and uuidv4 for generating unique IDs.

## Collaborators

Charlottee Walker, Carina Druce, Tom Groombridge
