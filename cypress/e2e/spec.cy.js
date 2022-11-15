/// <reference types="cypress" />
it('listens to the window.postMessage events', () => {
  cy.visit('index.html', {
    onBeforeLoad(win) {
      cy.spy(win, 'postMessage').as('postMessage')
    },
  })
  cy.get('@postMessage')
    .should('have.been.calledTwice')
    .and('have.been.calledWithExactly', 'one')
    .and('have.been.calledWithExactly', 'two')
})
