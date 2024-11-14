describe('Filter Page Navigation and Search Functionality', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Navigates to Women\'s items on Women button click', () => {
    cy.contains('Women').click();
    cy.url().should('include', 'gender=female');
    cy.get('#list-title').should('contain','Women');
  });

  it('Navigates to Men\'s items on Men button click', () => {
    cy.contains('Men').click();
    cy.url().should('include', 'gender=male');
    cy.get('#list-title').should('contain','Men');
  });

  it('Navigates to Kids items on Kids button click', () => {
    cy.contains('Kids').click();
    cy.url().should('include', 'age=kids');
    cy.get('#list-title').should('contain','Kids');
  });

  it('Search work', () => {
    cy.get('#search-input').type('Wrangler');
    cy.get('#search-button').click();
    cy.get('#item').should('contain', 'Wrangler');
  });

  it('Visit an item', () => {
    cy.wait(500);
    cy.get('#item').click();
  })
});
