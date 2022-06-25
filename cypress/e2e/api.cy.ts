describe('My Api Service Test', () => {
  it('Test GET userLists from randomuser.me', () => {
    cy.request('https://randomuser.me/api/?results=30')
      .then((response) => {
        expect(response.body).to.have.property('results');
      })
  });

});
