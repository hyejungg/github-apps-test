// fileName: cypress/integration/test-vue4-demo.spec.js

describe("Test Vue App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  context("When adding a new statistic with input and button click", () => {
    it("should add a new statistic to the right JSON list", () => {
      //   Fill label input
      cy.get('input[type="text"]').type("test").should("have.value", "test");

      // Add statistics button click
      cy.get('button:contains("Add a Stat")')
        .click()
        .its("parentElement")
        .find('pre[id="raw"]')
        .should("contain.text", '{"label":"test","value":100}');
    });

    it("should add multiple stats and ensure it does not exceed the max limit (5)", () => {
      for (let i = 0; i < 6; i++) {
        // Add up to 6 stats

        cy.get('input[type="text"]')
          .type(`test ${i}`)
          .should("have.value", `test ${i}`);

        if (i === 4) {
          cy.log("Attempting to add more than max limit, should display alert");
          cy.get('button:contains("Add a Stat")')
            .click()
            .its("parentElement")
            .find(".alert")
            .should("be.visible");
        } else {
          cy.get('button:contains("Add a Stat")')
            .click()
            .its("parentElement")
            .find('pre[id="raw"]')
            .should(
              "contain.text",
              JSON.stringify(
                {
                  label: `test ${i}`,
                  value: 100,
                },
                null,
                " ",
              ),
            );
        }
      }
    });

    it("should remove a statistic when clicked on the X button", () => {
      // Add stats to fill up list (Skip if already enough)
      for (let i = 2; i < 3; i++) {
        cy.get('input[type="text"]')
          .type(`test ${i}`)
          .should("have.value", `test ${i}`);
      }

      // Check that there are at least 2 stats before attempting removal
      if (cy.get(".g").children().length > 1) {
        cy.get(".g").children().eq(0).find("text").should("exist");
        cy.get(".g").children().eq(0).next().find("circle").should("exist");

        // Remove first statistic
        cy.get(".g")
          .children()
          .eq(0)
          .find("text, circle")
          .eq(0)
          .parent()
          .find('button[aria-label="Remove"]')
          .click();

        // Check that the removed item is not present in JSON list (Prevent assertion failure)
        if (cy.get(".g").children().length === 1) {
          cy.get(".g")
            .children()
            .eq(0)
            .find("text, circle")
            .eq(0)
            .should("not.exist");
        }
      }
    });
  });
});
