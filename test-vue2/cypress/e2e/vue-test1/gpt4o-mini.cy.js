describe("Modal 화면", () => {
  context("ShowModal 버튼 클릭 시", () => {
    it('모달이 표시된다. 모달의 제목은 "Custom Header"이다.', () => {
      cy.visit("http://localhost:8081");

      // ShowModal 버튼 클릭
      cy.get("#show-modal").click();

      // 모달이 표시되는지 확인
      cy.get(".modal-mask").should("be.visible");

      // 모달의 제목 확인
      cy.get(".modal-header h3").contains("Custom Header");
    });
  });
});
