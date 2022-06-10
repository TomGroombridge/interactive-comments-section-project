/// <reference types="cypress" />

describe('viewing comments', () => {
  beforeEach(() => {
    cy.fixture('comments-response.json').then((json) => {
      cy.intercept('GET', 'https://api.mocki.io/v2/a20ae30b/comments', json);
    });
    cy.visit('http://localhost:3000');
  });

  it('display h1 of comments following api call', () => {
    cy.get('[id="comment-1"]').contains('Impressive');
  });

  it('should show input field when reply button is clicked', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('input').should('be.visible');
  });

  it('should increase number of replies when submit is clicked', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('[id="replies-container"]')
      .eq(0)
      .find('div')
      .should('have.length', 0);
    cy.get('input[type="text"]').type('hello world');
    cy.get('form').submit();
    cy.get('[id="replies-container"]')
      .eq(0)
      .find('div')
      .should('have.length', 1);
  });

  it('form should disappear on submit', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('input[type="text"]').type('hello world');
    cy.get('form').submit();
    cy.get('form').should('not.exist');
  });

  it('should not submit reply if input field is empty', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('[id="replies-container"]')
      .eq(0)
      .find('div')
      .should('have.length', 0);
    cy.get('form').submit();
    cy.get('[id="replies-container"]')
      .eq(0)
      .find('div')
      .should('have.length', 0);
    cy.get('form').should('be.visible');
  });

  it('input field should clear after submit', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('input[type="text"]').type('hello world');
    cy.get('#reply-form').submit();
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('input[type="text"]').should('have.value', '@amyrobson ');
  });

  it('score should increase by 1 when plus button clicked once', () => {
    cy.get('[id="plus-button-1"]').click();
    cy.get('[id="score-1"]').contains(13);
  });

  it('score should not decrease below 0 when minus button clicked', () => {
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="minus-button-2"]').click();
    cy.get('[id="score-2"]').contains(0);
  });

  it('should add a new comment when add-comment form is submitted', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('#add-comment-form').submit();
    cy.get('[id="container"]')
      .find('div[id="comment-container"]')
      .should('have.length', 3);
  });

  it('should not post comment if input field is empty', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('#add-comment-form').submit();
    cy.get('[id="add-comment-form"]').should('be.visible');
    cy.get('[id="container"]')
      .find('div[id="comment-container"]')
      .should('have.length', 2);
  });

  it('form should disappear on submit after add comment input', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('#add-comment-form').submit();
    cy.get('[id="add-comment-form"]').should('not.exist');
  });

  it('edit form should only appear when clicking edit on your own comment', () => {
    cy.get('[id="edit-button"]').should('not.exist');
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="edit-button"]').click();
    cy.get('form').should('be.visible');
  });

  it('edit form should disappear on save', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('form').should('not.exist');
  });

  it('form remains when edit input field empty and submitted', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="edit-button"]').click();
    cy.get('[id="edit-input"]').clear();
    cy.get('form').submit();
    cy.get('form').should('be.visible');
  });

  it('should change first comment content to content of input', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="edit-button"]').click();
    cy.get('[id="edit-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="comment-container"]').contains('hello');
  });

  it('should show the username of the person replying a comment', () => {
    cy.get('[id="reply-button"]').eq(0).click();
    cy.get('input[type="text"]').type('hello world');
    cy.get('form').submit();
    cy.get('[id="replies-container"]')
      .eq(0)
      .find('div')
      .eq(0)
      .contains('juliusomo');
  });

  it('should have correct src for icon for user of comment', () => {
    cy.get('[id="comment-container"]').eq(0);
    cy.get('img[id="user-icon"]')
      .should('have.attr', 'src')
      .should('include', '/avatars/image-amyrobson.png');
  });

  it('should show delete modal on click of delete', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="delete-button"]').eq(0).click();
    cy.get('[id="delete-modal"]').should('exist');
  });

  it('modal should disappear when cancel is clicked', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="delete-button"]').eq(0).click();
    cy.get('[id="cancel-button"]').click();
    cy.get('[id="delete-modal"]').should('not.exist');
  });

  it('when delete button in modal is clicked, corresponding comment should not appear', () => {
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="comment-container"]')
      .eq(1)
      .contains('Woah, your project looks awesome!');
    cy.get('[id="delete-button"]').click();
    cy.get('[id="confirm-delete-button"]').click();
    cy.get('[id="comment-container"]').eq(2).should('not.exist');
  });

  it('delete button should only appear on your own comment', () => {
    cy.get('[id="delete-button"]').should('not.exist');
    cy.get('[id="add-comment"]').click();
    cy.get('[id="add-comment-input"]').type('hello');
    cy.get('form').submit();
    cy.get('[id="delete-button"]').should('be.visible');
  });
});

describe('unsuccessful api call', () => {
  it('should show error message when api call fails', () => {
    cy.intercept('GET', 'https://api.mocki.io/v2/a20ae30b/comments', {
      statusCode: 500,
    });
    cy.visit('http://localhost:3000');
    cy.get('h1').contains('There has been an error');
  });
});
