/// <reference types="cypress" />

context('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('works', () => cy.get('body').should('contain', 'Amazing boilerplate'))
})

export {}
