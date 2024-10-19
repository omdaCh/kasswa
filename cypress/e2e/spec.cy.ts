describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Women').click();
    cy.url().should('include','gender=female');
  })
})
