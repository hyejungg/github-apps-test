// src/ App.spec.js

describe("Show Modal", () => {
  context("모달이 표시된 상태", () => {
    it("모달의 제목과 본문 내용이 비어있지 않다.", () => {
      cy.visit("http://localhost:8081"); // * 내가 추가
      // Mock show modal button click event
      cy.get("#show-modal-button").click();

      // Verify modal title and content are not empty
      cy.get('[data-test="modal-title"]').should("have.text", "Information");
      cy.get('[data-test="modal-content"]').should(
        "have.text",
        "안녕하세요. 몰리입니다.",
      );
    });

    it("close 버튼 클릭 시 모달이 닫힌다.", () => {
      // Mock close button click event
      cy.get("#close-button").click();

      // Verify modal is closed
      cy.get('[data-test="modal"]').should("not.exist");
    });
  });
});
