// fileName: test-vue3/cypress/e2e/todo.spec.js
describe("TodoMVC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  context("초기 화면", () => {
    it("맨 처음 화면 진입 시 input 창이 존재하고, Todos 라는 제목이 표시된다.", () => {
      cy.get("h1").should("contain", "Todos");
      cy.get(".new-todo").should("exist");
    });
  });

  context("새로운 할 일 추가", () => {
    it("input 창에 test1 이라고 입력 후 enter 시 test1이 표시된 목록이 보이며 목록 하단에는 1 item left 라고 명시되어 있다.", () => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".todo-list li").should("have.length", 1).and("contain", "test1");
      cy.get(".todo-count").should("contain", "1 item left");
    });
  });

  context("할 일 완료 처리", () => {
    beforeEach(() => {
      cy.get(".new-todo").type("test1{enter}");
    });

    it("목록에 표시된 test1의 맨 왼쪽 원 클릭 시 test1에 밑줄 표시가 되며 0 item left 라고 명시되어 있다.", () => {
      cy.get(".toggle").click();
      cy.get(".todo-list li").should("have.class", "completed");
      cy.get(".todo-count").should("contain", "0 items left");
    });
  });
});
