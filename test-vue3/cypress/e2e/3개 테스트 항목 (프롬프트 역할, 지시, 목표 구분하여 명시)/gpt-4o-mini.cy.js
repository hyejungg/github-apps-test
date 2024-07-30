// fileName: test-vue3/cypress/e2e/todo.spec.js

describe("Todo App", () => {
  context("맨 처음 화면 진입 시", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8081");
    });

    it("input 창이 존재하고, Todos 라는 제목이 표시된다.", () => {
      cy.get(".new-todo").should("exist");
      cy.get("h1").contains("Todos");
    });

    it('input 창에 "test1" 이라고 입력 후 enter 시 목록에 "test1"이 표시된다.', () => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".todo-list").contains("test1").should("exist");
      cy.get(".todo-count strong").contains("1");
      cy.get(".todo-count").contains("item left");
    });

    it('목록에 표시된 "test1"의 맨 왼쪽 원 클릭 시 밑줄이 표시된다.', () => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".toggle").click();
      cy.get(".todo-list")
        .contains("test1")
        .parent()
        .should("have.class", "completed");
      cy.get(".todo-count strong").contains("0");
      cy.get(".todo-count").contains("items left");
    });
  });
});
