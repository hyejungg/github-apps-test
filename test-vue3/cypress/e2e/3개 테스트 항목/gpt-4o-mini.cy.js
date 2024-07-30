describe("Todo 앱 화면", () => {
  context("맨 처음 화면 진입 시", () => {
    it("input 창이 존재하고, Todos 라는 제목이 표시된다", () => {
      cy.visit("http://localhost:8081");
      cy.get(".new-todo").should("exist");
      cy.get("h1").contains("Todos");
    });

    it("input 창에 test1 이라고 입력 후 enter 시 test1이 표시된 목록이 보이며 목록 하단에는 1 item left 라고 명시되어 있다", () => {
      cy.visit("http://localhost:8081"); //* 내가 추가
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".todo-list").should("contain", "test1");
      cy.get(".todo-count strong").should("contain", "1");
      cy.get(".todo-count span").should("contain", "item left");
    });

    it("목록에 표시된 test1의 맨 왼쪽 원 클릭 시 test1에 밑줄 표시가 되며 0 item left 라고 명시되어 있다", () => {
      cy.visit("http://localhost:8081"); //* 내가 추가
      cy.get(".toggle").click();
      cy.get(".todo-list .completed").should("contain", "test1");
      cy.get(".todo-count strong").should("contain", "0");
      cy.get(".todo-count span").should("contain", "items left");
    });
  });
});
