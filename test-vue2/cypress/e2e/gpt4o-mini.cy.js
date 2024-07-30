describe("모달 컴포넌트 테스트", () => {
  context("Show Modal 버튼 클릭 시", () => {
    it("모달이 표시된다.", () => {
      cy.visit("http://localhost:8081");
      cy.get("button").contains("Show Modal").click(); // 'Show Modal' 버튼 클릭
      cy.get(".modal").should("be.visible"); // 모달이 보이는지 확인
    });

    it("모달의 제목과 본문 내용이 비어있지 않다.", () => {
      cy.get(".modal").should("contain", "Information"); // 제목 확인
      cy.get(".modal").should("contain", "안녕하세요. 몰리입니다."); // 본문 내용 확인
    });

    it("'close' 버튼 클릭 시 모달이 닫힌다.", () => {
      cy.get(".modal").within(() => {
        cy.get("button").contains("Close").click(); // Close 버튼 클릭
      });
      cy.get(".modal").should("not.be.visible"); // 모달이 보이지 않는지 확인
    });
  });
});
