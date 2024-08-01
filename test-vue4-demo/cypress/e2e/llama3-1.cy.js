describe("Add and remove statistics", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  context('when user inputs "test" and clicks Add a Stat button', () => {
    it('should add a new statistic with label "test"', () => {
      cy.get("#add input").type("test");
      cy.get("#add button").click();
      cy.get("#raw pre").contains(
        JSON.stringify({
          label: "test",
          value: 100,
        }),
      );
    });
  });

  context(
    'when user clicks X button next to statistic with label "test"',
    () => {
      it('should remove the statistic with label "test" from the right JSON', () => {
        cy.get("#raw pre").contains(
          JSON.stringify({
            label: "test",
            value: 100,
          }),
        );
        cy.get(".remove").contains("X").click();
        cy.get("#raw pre")
          .not()
          .contains(
            JSON.stringify({
              label: "test",
              value: 100,
            }),
          );
      });
    },
  );
});
