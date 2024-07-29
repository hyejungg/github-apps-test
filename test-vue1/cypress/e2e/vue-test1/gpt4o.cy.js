describe("App.vue 화면 테스트", () => {
  context("초기 로드 시", () => {
    it("두번째 p태그 클릭 시 검정색 글씨로 표시된다.", () => {
      // given
      cy.visit("http://localhost:8081");

      // when
      cy.get("p").eq(1).click();

      // then
      cy.get("p").eq(1).should("have.css", "color", "rgb(0, 0, 0)");
    });
  });
});
