/// <reference types="Cypress" />
interface CustomCommands<Subject = any> {
  loginUI(username: string | undefined, password: string | undefined): Cypress.Chainable<string>;
}
