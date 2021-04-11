describe("Date-selector app", function() {

  beforeEach( function() {

    cy.request("POST", "http://localhost:4000/testing/reset")

    const mutation = `mutation{
      createUser(username: "TestUsername", name: "ABC" password: "salainen"){name}
    }`

    const addGroup = `{
      createGroup(name: "TestGroup", users: []){name}
    }`
    cy.request("POST", "http://localhost:4000/graphql",{ query: mutation })
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
    beforeEach(function() {
      cy.login({username: "TestUsername", password: "salainen"})
    })
    it("user can logout", function () {
      cy.get("#logout-button").click()
      cy.contains("Login")
    })

    it("user can add event", function () {
      cy.get("#addEvent-button").click()
      cy.contains("New Event")
      cy.get("#name").type("EventTestName")
      cy.get("#group-options")
    })
  })



})