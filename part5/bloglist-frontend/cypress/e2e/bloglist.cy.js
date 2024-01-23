describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "blabla2023",
      password: "12345",
    }
    cy.createUser(user)
    // cy.login({ username: `${user.username}`, password: `${user.password}` })
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function () {
    cy.get("form#loginForm")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.typeUserCredentials()
      cy.contains("blogs")
    })

    it("fails with wrong credentials", function () {
      cy.get("#usernameField").type("blabla2023")
      cy.get("#passwordField").type("konnichiwa")
      cy.get("button").click()
      cy.contains("Wrong username or password").should("have.css", "backgroundColor", "rgb(244, 67, 54)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.typeUserCredentials()
    })
    it("A blog can be created", function () {
      cy.get("#newPostButton").click()
      cy.get("#title-input").type("A Feast for Crows")
      cy.get("#author-input").type("George R.R Martin")
      cy.get("#url-input").type("https://www.hbo.com/game-of-thrones")
      cy.get("#submitBtn").click()
      cy.contains("A Feast for Crows - George R.R Martin")
    })
  })
})
