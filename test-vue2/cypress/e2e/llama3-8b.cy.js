describe("App", () => {
  context('when the "Show Modal" button is clicked', () => {
    it("displays the modal with a title and body content that are not empty", () => {
      cy.visit("http://localhost:8081");
      cy.get('[data-test="show-modal"]').click();
      cy.get('[data-test="modal-header"]').should("contain", "Information");
      cy.get('[data-test="modal-body"]').should(
        "contain",
        "안녕하세요. 몰리입니다.",
      );
    });

    it('closes the modal when the "Close" button is clicked', () => {
      cy.visit("http://localhost:8081");
      cy.get('[data-test="show-modal"]').click();
      cy.get('[data-test="modal-footer"] button').click();
      cy.get('[data-test="modal"]').should("not.exist");
    });
  });
});
