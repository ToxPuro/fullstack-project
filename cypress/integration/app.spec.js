describe("Date-selector app", function() {

  beforeEach(async function() {
    const mutation = `{
      createUser(username: "TestUsername, name: "TestName" password: "salainen"){name}
    }`
    await cy.request(
      {url: "http://localhost:4000",
    body: {mutation}}
    )
    cy.visit("http://localhost:4000")
  })
  it("front page can be opened", function() {
    cy.visit("http://localhost:4000")
    cy.contains("Login")

  })

  it("user can login", function() {
    cy.get("#username").type("TestUsername")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()
  })

})