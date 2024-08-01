// fileName: test-vue4-demo/cypress/e2e/app.cy.js

describe('App.vue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081');
    });

    context('Adding a new stat', () => {
        it('should add a new stat with label "test" to the right JSON', () => {
            cy.get('input[name="newlabel"]').type('test');
            cy.get('button').contains('Add a Stat').click();

            cy.get('#raw').should('contain.text', '{"label":"test","value":100}');
        });
    });

    context('Removing a stat', () => {
        beforeEach(() => {
            cy.get('input[name="newlabel"]').type('test');
            cy.get('button').contains('Add a Stat').click();
        });

        it('should remove the stat with label "test" from the right JSON', () => {
            cy.get('div').contains('test').siblings('button.remove').click();

            cy.get('#raw').should('not.contain.text', '{"label":"test","value":100}');
        });
    });
});