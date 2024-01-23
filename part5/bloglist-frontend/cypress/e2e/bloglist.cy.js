describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      username: "blabla2023",
      password: "12345",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:5173")
  })

  it("Login form is shown", function () {
    cy.get("form#loginForm")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#usernameField").type("blabla2023")
      cy.get("#passwordField").type("12345")
      cy.get("button").click()
      cy.contains("blogs")
    })

    it("fails with wrong credentials", function () {
      cy.get("#usernameField").type("blabla2023")
      cy.get("#passwordField").type("konnichiwa")
      cy.get("button").click()
      cy.contains("Wrong username or password").should("have.css", "backgroundColor", "rgb(244, 67, 54)")
    })
  })
})
