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

  it.only('should show input field when reply button is clicked', () => {
    cy.get('[id="reply-button-1"]').click();
    cy.get('input').should('be.visible');
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
