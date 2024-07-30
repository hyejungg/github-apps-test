// fileName: test-vue3/cypress/e2e/cy.js
describe("TodoMVC App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081");
  });

  context("Adding and displaying items", () => {
    it("input 창에 test1, test2, test3을 차례로 입력 후 enter 시 입력창 아래 3개의 목록이 표시되며 목록 하단에는 3 item left 라고 명시되어 있다.", () => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".new-todo").type("test2{enter}");
      cy.get(".new-todo").type("test3{enter}");
      cy.get(".todo-list li")
        .should("have.length", 3)
        .and((items) => {
          expect(items[0]).to.contain("test1");
          expect(items[1]).to.contain("test2");
          expect(items[2]).to.contain("test3");
        });
      cy.get(".todo-count").should("contain", "3 items left");
    });
  });

  context("Marking items as completed", () => {
    beforeEach(() => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".new-todo").type("test2{enter}");
      cy.get(".new-todo").type("test3{enter}");
    });

    it("목록에 표시된 test2의 맨 왼쪽 원 클릭 시 test2에 밑줄 표시가 되며 2 item left 라고 명시되고, Clear completed 라는 문구가 표시된다.", () => {
      cy.get(".todo-list li").eq(1).find(".toggle").click();
      cy.get(".todo-list li").eq(1).should("have.class", "completed");
      cy.get(".todo-count").should("contain", "2 items left");
      cy.get(".clear-completed").should("be.visible");
    });
  });

  context("Filtering items by status", () => {
    beforeEach(() => {
      cy.get(".new-todo").type("test1{enter}");
      cy.get(".new-todo").type("test2{enter}");
      cy.get(".new-todo").type("test3{enter}");
      cy.get(".todo-list li").eq(1).find(".toggle").click();
    });

    it("하단에 Completed 버튼 클릭 시 목록에는 test2만 밑줄로 표시된다.", () => {
      cy.contains("Completed").click();
      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("have.class", "completed");
    });

    it("Active 버튼 클릭 시 목록에는 test1, test3만 표시된다.", () => {
      cy.contains("Active").click();
      cy.get(".todo-list li")
        .should("have.length", 2)
        .and((items) => {
          expect(items[0]).to.contain("test1");
          expect(items[1]).to.contain("test3");
        });
    });
  });
});
