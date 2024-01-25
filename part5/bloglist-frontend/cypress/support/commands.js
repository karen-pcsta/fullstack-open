// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedNoteappUser", JSON.stringify(body))
    cy.visit("http://localhost:5173")
  })
})

Cypress.Commands.add("createUser", (user) => {
  cy.request("POST", "http://localhost:3003/api/users/", user)
})

Cypress.Commands.add("typeUserCredentials", () => {
  cy.get("#usernameField").type("blabla2023")
  cy.get("#passwordField").type("12345")
  cy.get("button").click()
})

Cypress.Commands.add("addBlogPost", () => {
  cy.get("#newPostButton").click()
  cy.get("#title-input").type("A Feast for Crows")
  cy.get("#author-input").type("George R.R Martin")
  cy.get("#url-input").type("https://www.hbo.com/game-of-thrones")
  cy.get("#submitBtn").click()
})

Cypress.Commands.add("addAdditionalBlogPost", () => {
  cy.get("#newPostButton").click()
  cy.get("#title-input").type("A Dance with Dragons")
  cy.get("#author-input").type("George R.R Martin")
  cy.get("#url-input").type("https://www.hbo.com/game-of-thrones")
  cy.get("#submitBtn").click()
})

Cypress.Commands.add("clickAndWait", () => {
  cy.get(".blog-post").eq(1).contains("like").click()
  cy.wait(500)
  cy.get(".blog-post").eq(1).contains("like").click()
  cy.wait(500)
})
