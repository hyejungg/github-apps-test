describe("App 화면", () => {
  context('사용자가 "Show Modal" 버튼을 클릭했을 때', () => {
    it('ShowModal 버튼 클릭 시 모달이 표시된다. 모달의 제목은 "Custom Header"이다.', () => {
      cy.visit("http://localhost:8081");

      // Show Modal 버튼 클릭
      cy.get("#show-modal").click();

      // 모달이 나타나는지 확인
      cy.get(".modal-container").should("be.visible");

      // 모달의 제목 확인
      cy.get(".modal-header h3").should("have.text", "Custom Header");
    });
  });
});
