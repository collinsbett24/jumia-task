describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Welcome | Users App List')
    // cy.contains('sandbox app is running!')
  })
})
