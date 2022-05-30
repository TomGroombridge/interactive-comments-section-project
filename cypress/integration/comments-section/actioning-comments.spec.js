/// <reference types="cypress" />


describe('viewing comments', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('display hello world', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('h1').should('have.text', 'Hello world!!')
  })
})
