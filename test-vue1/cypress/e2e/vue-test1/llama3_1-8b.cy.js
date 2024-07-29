// fileName: test-vue1/tests/unit.spec.js
describe("App.vue", () => {
  describeContext("when two p tags are clicked", () => {
    it("should change the color to black", () => {
      cy.visit("/");

      // When
      cy.get('[data-test="p-tag-0"]').click();
      cy.get('[data-test="p-tag-1"]').click();

      // Then
      cy.get('[data-test="p-tag-0"]')
        .invoke("css", "color")
        .should("eq", "black");
      cy.get('[data-test="p-tag-1"]')
        .invoke("css", "color")
        .should("eq", "black");
    });
  });
});
