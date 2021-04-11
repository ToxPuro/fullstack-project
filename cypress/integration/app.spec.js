describe("Date-selector app", function() {

  beforeEach(async function() {
    const mutation = `{
      createUser(username: "TestUsername", name: "TestName" password: "salainen"){name}
    }`
    await cy.request(
      { url: "http://localhost:4000/graphql",
        body: { mutation },
        failOnStatusCode: false }
    )
  })
  it("front page can be opened", function() {
    cy.visit("http://localhost:4000")
    cy.contains("Login")

  })

  it("user can login with correct credentials", function() {
    cy.visit("http://localhost:4000")
    cy.get("#username").type("TestUsername")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()
    cy.get("#logout-button")
  })

  describe("when logged in", function () {
    it("user can logout", function () {
      cy.login({ usename: "TestUsername", password: "salainen" })
      cy.get("#logout-button").click()
      cy.contains("Login")
    })
  })



})