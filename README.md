# Interactive Comments Project

This project was created with [Create React App](https://github.com/facebook/create-react-app). This project is focussed on making sure we understand how to use state, props, unit/integration tests, responsive design, valitdaion, Javascript objects and React patterns

## Available Scripts

To run this project make sure you start by running `npm install` to install the dependencies.

Then when you are ready you can use the script below to get going...

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open`

This will open up the cypress package in a chrome window and allow you to run your integration tests.

Make sure you read the cypress [documentation](https://docs.cypress.io/guides/getting-started/writing-your-first-test) to understand more of how to use cypress.

## Tasks for this project.

Inside this application you will see a 'designs' folder inside of the public directory. In there you will see designs as to how the application should look at the end including all the potential states.

Below you will see a list of tasks that you will need to do on your journey to completing this project.

### Task 1 

You will see there is already a top level component created in pages. In here you will fetch the json data from the below api address...

`api.mocki.io/v2/a20ae30b/comments`

Please make sure you handle all three potential states of the data being fetched. 

### Task 2

Once this has been done create a test inside cypress that mocks the api request and tests to make sure the data is formatted as expected.

https://docs.cypress.io/api/commands/intercept#Syntax


### Task 3

When a customer clicks the reply link it should reveil a reply section where the user can add their comment. 

The text field should start with the name of the person the reply is going too. (the person who created the comment)

Create cypress tests for this...


### Task 4

When the reply button in the form has been submitted it should add the new reply object to the 'state' on the comments.*

Make sure to have valiation so that you cannot submit the reply if the text field is empty.

*Please be aware we are not POSTing to and API at this point so we will only be updating the state and we exect on refresh for the state to reset.

Create cypress tests for this...


### Task 5

When a customer clicks on the + or - buttons it should either add 1 or remove 1 number form the 'score'.

validate to make sure the score can't be less that 0.

Create cypress tests for this...


### Task 6 

A customer should be able to create a new comment.*

Make sure we have validation for the field having a value.

*Again this should only be stored in the state for now and will be removed on refresh of the application. 

Create cypress tests for this...

### Task 7

A customer should be able to edit a comment if it belongs to them.

When the edit button is clicked it should show the data in a text field where it can be updated.

Create cypress tests for this...


### Task 8

A customer should be able to submit the edit form and it will update the state of the comment.

Create cypress tests for this...

### Task 9 

A customer should be able to click on the 'Delete' link and it show modal saying whether you wish to delete the comment.

https://tailwindui.com/components/application-ui/overlays/modals

Create cypress tests for this...

### Task 10

When a customer deletes the comment it should remove the comment from the state.

Create cypress tests for this...


