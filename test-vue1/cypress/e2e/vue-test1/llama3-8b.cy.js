describe("Dynamic Color Test", () => {
  it("should toggle color and text when clicking on p tags", () => {
    cy.visit("http://localhost:8081");
    cy.get("p").first().as("firstP");

    cy.get("@firstP").should("have.css", "color", "rgb(0, 128, 0)"); // initial green color
    cy.get("@firstP span").should("have.title", "Hello World!");

    cy.get("@firstP").click();
    cy.get("@firstP").should("have.css", "color", "red"); // toggle to red

    cy.get("@firstP").click();
    cy.get("@firstP").should("have.css", "color", "rgb(0, 128, 0)"); // toggle back to green
  });
});
