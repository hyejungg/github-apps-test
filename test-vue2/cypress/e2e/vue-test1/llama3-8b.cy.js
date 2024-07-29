describe("App", () => {
  context("when the Show Modal button is clicked", () => {
    it("should display the modal with Custom Header", () => {
      cy.visit("http://localhost:8081");
      cy.get("#show-modal").click();
      cy.get(".modal-mask").should("be.visible");
      cy.get(".modal-header h3").should("have.text", "Custom Header");
    });
  });
});
