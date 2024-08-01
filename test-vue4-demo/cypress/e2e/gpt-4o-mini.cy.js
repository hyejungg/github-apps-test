describe("Statistics Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  context("Adding a new statistic", () => {
    it('Test adding a statistic with label "test"', () => {
      cy.get('input[name="newlabel"]').type("test");
      cy.get("button").contains("Add a Stat").click();
      cy.get("#raw").should("contain", '{"label":"test","value":100}');
    });
  });

  context("Removing a statistic", () => {
    beforeEach(() => {
      cy.get('input[name="newlabel"]').type("test");
      cy.get("button").contains("Add a Stat").click();
    });

    it('Test removing the statistic with label "test"', () => {
      cy.get("label").contains("test").siblings(".remove").click();
      cy.get("#raw").should("not.contain", '{"label":"test","value":100}');
    });
  });

  context("Limit on deletions", () => {
    beforeEach(() => {
      cy.get('input[name="newlabel"]').type("test1");
      cy.get("button").contains("Add a Stat").click();
      cy.get('input[name="newlabel"]').type("test2");
      cy.get("button").contains("Add a Stat").click();
      cy.get('input[name="newlabel"]').type("test3");
      cy.get("button").contains("Add a Stat").click();
      cy.get('input[name="newlabel"]').type("test4");
      cy.get("button").contains("Add a Stat").click();
    });

    it("Test alert when trying to remove more than 3 statistics", () => {
      cy.get("label").contains("test1").siblings(".remove").click();
      cy.get("label").contains("test2").siblings(".remove").click();
      cy.get("label").contains("test3").siblings(".remove").click();
      cy.get("label").contains("test4").siblings(".remove").click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Can't delete more!");
      });
    });
  });
});
