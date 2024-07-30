describe("App.vue", () => {
  context("Show Modal 버튼 클릭 시 모달이 표시된다.", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8081");
    });

    it("모달의 제목과 본문 내용이 비어있지 않다.", () => {
      // ShowModal 버튼을 클릭하고, 모달이 나타난 후에 검사
      cy.findByText("Show Modal").click();
      cy.get(".modal-title").should("contain", "Information");
      cy.get(".modal-body p").should("contain", "안녕하세요. 몰리입니다.");
    });

    it("close 버튼 클릭 시 모달이 닫힌다.", () => {
      // ShowModal 버튼을 클릭하고, 모달이 나타난 후에 검사
      cy.findByText("Show Modal").click();
      // close 버튼이 나타나면 click하여 모달이 닫히는지 확인
      cy.get(".modal-footer button").contains("Close").click();
      cy.get(".modal").should("not.exist");
    });
  });
});
