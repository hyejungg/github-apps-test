// fileName: cypress/integration/modal_spec.js

describe("모달 테스트", () => {
  context("모달 표시 및 닫기 기능", () => {
    it(`'Show Modal' 버튼 클릭 시 모달이 표시된다. 모달의 제목과 본문 내용이 비어있지 않다. 'close' 버튼 클릭 시 모달이 닫힌다.`, () => {
      // 페이지 방문
      cy.visit("http://localhost:8081");

      // "Show Modal" 버튼 클릭
      cy.contains("Show Modal").click();

      // 모달이 표시됐는지 확인
      cy.get(".modal")
        .should("be.visible")
        .within(() => {
          // 모달 제목 확인
          cy.get("h2").should("contain", "Information");

          // 모달 본문 내용 확인
          cy.get("p").should("contain", "안녕하세요. 몰리입니다.");

          // "Close" 버튼 클릭
          cy.contains("button", "Close").click();
        });

      // 모달이 닫혔는지 확인
      cy.get(".modal").should("not.exist");
    });
  });
});
