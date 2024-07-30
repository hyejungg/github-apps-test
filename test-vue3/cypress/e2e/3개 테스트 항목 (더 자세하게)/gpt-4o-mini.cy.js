// fileName: test-vue3/cypress/e2e/todo.spec.js
describe("Todo App", () => {
  context("입력창에 아이템 추가", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8081");
    });

    it("test1을 입력하고 엔터를 누르면 목록에 추가된다", () => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".todo-list").should("contain", "test1");
    });

    it("test2를 입력하고 엔터를 누르면 목록에 추가된다", () => {
      cy.get(".new-todo").type("test2{enter}");
      cy.get(".todo-list").should("contain", "test2");
    });

    it("test3을 입력하고 엔터를 누르면 목록에 추가된다", () => {
      cy.get(".new-todo").type("test3{enter}");
      cy.get(".todo-list").should("contain", "test3");
    });

    it("목록 아래에 3 item left가 표시된다", () => {
      cy.get(".todo-list").should("exist");
      cy.get(".todo-count strong").should("contain", "3");
    });

    it("test2의 원 클릭 시 test2에 밑줄 표시가 된다", () => {
      cy.get(".toggle").eq(1).click(); // test2가 두 번째이므로 인덱스 1
      cy.get(".todo").eq(1).should("have.class", "completed");
      cy.get(".todo-count strong").should("contain", "2");
      cy.get(".clear-completed").should("be.visible");
    });

    it("Completed 버튼 클릭 시 completed 목록만 표시된다", () => {
      cy.contains("Completed").click();
      cy.get(".todo-list")
        .should("contain", "test2")
        .and("not.contain", "test1")
        .and("not.contain", "test3");
    });

    it("Active 버튼 클릭 시 active 목록만 표시된다", () => {
      cy.contains("Active").click();
      cy.get(".todo-list")
        .should("contain", "test1")
        .and("contain", "test3")
        .and("not.contain", "test2");
    });
  });
});
