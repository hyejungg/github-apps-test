import "@testing-library/cypress";
import { mount } from "vue-test-utils";
import { createApp } from "./src/main.js";
import App from "./src/App.vue";

// Setup app using Vue Test Utils for testing components
const appWrapper = mount(App);

describe("app", () => {
  context("ShowModal", () => {
    it("button click should display modal with custom header", () => {
      // Find the button and simulate a click action
      const showModalBtn = appWrapper.find("#show-modal");

      // Simulate a click on the show button
      showModalBtn.trigger("click");

      // Wait for modal to be visible
      cy.get(".modal-mask").should("exist");

      // Verify that the modal header text is correct
      cy.get(".modal-container .modal-header h3").should(
        "have.text",
        "Custom Header",
      );
    });
  });
});
