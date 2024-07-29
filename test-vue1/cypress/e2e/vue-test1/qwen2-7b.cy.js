describe("테스트 화면", () => {
  const BASE_URL = "http://localhost:8081";

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  context("두번째 p태그 클릭 시", () => {
    it("검정색 글씨로 표시되는 테스트", () => {
      // 두 번째 p 태그를 찾아 선택합니다.
      const secondP = cy.get(":nth-child(2) p");

      // 페이지가 로드될 때까지 기다립니다
      secondP.should("exist");

      // 두 번째 p태그를 클릭합니다.
      // 이때 'then' 부분에는 실제로 변경이 발생하는지 확인해야 합니다.
      // 예를 들어, 클릭 후에 해당 텍스트의 색상이 검정색인지 확인하려면 다음과 같이 코드를 작성할 수 있습니다:

      secondP.click();

      // 사용자의 움직임을 기다립니다. (예: 마우스가 끝나는지)
      cy.wait(1000);

      // 변경사항이 성공적으로 적용되었는지 확인합니다.
      cy.get(":nth-child(2) p").should("have.css", "color", "rgb(0, 0, 0)");
    });
  });
});
