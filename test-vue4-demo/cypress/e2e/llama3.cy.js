// tests/e2e.spec.js
// import { cy } from "cypress";
// import App from "./App.vue";

describe("Test App", () => {
  beforeEach(() => {
    // Visit the app page
    cy.visit("http://localhost:8081");
  });

  it("Add a new statistic", () => {
    // Enter "test" in the input field
    cy.get('input[name="newlabel"]').type("test");

    // Click the Add button
    cy.get("#add button").click();

    // Verify that the label is added to the statistics list
    cy.get("pre#raw").should("contain", "test");
  });

  it("Remove a statistic", () => {
    // Enter "test" in the input field
    cy.get('input[name="newlabel"]').type("test");

    // Click the Add button
    cy.get("#add button").click();

    // Verify that the label is added to the statistics list
    cy.get("pre#raw").should("contain", "test");

    // Remove the statistic
    cy.get("button.remove-statistic").click();

    // Verify that the label is removed from the statistics list
    cy.get("pre#raw").should("not.contain", "test");
  });
});
