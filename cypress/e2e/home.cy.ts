describe('My Home Page Test', () => {
  it('Visits home project page', () => {
    cy.visit('/')
    cy.contains('Welcome | Users App List')
    cy.get('table');
    cy.get('button');
    cy.get('app-columns');
    cy.get('input').type('name');
  });
});
