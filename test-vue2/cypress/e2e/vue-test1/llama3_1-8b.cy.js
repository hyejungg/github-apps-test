describe("ShowModal", () => {
  context("when button is clicked", () => {
    it("should display modal with Custom Header", () => {
      cy.visit("http://localhost:8081");

      // Click on Show Modal button
      cy.get("#show-modal").click();

      // Wait for the modal to be displayed
      cy.wait(1000);

      // Verify that the modal title is "Custom Header"
      cy.get(".modal-header h3").should("contain", "Custom Header");
    });
  });
});
