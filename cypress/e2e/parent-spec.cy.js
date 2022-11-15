/// <reference types="cypress" />
it('listens to the window.parent.postMessage events', () => {
  // the messages to the "parent" window are sent by the child
  // page loaded in an iframe. Instead of stubbing, let's
  // just subscribe to the events
  const postMessageStub = cy.stub().as('postMessage')

  cy.visit('parent.html', {
    onBeforeLoad(win) {
      win.addEventListener('message', (e) => {
        // we are only interested in the argument itself
        postMessageStub(e.data)
      })
    },
  })
  cy.get('@postMessage')
    .should('have.been.calledTwice')
    .and('have.been.calledWithExactly', 'one')
    .and('have.been.calledWithExactly', 'two')
})
