describe("Date-selector app", function() {

  beforeEach( function() {
    const mutation = `{
      createUser(username: "TestUsername", name: "TestName" password: "salainen"){name}
    }`

    const addGroup = `{
      createGroup(name: "TestGroup", users: []){name}
    }`
    cy.visit("http://localhost:4000/graphql")
    cy.request(
      { url: "http://localhost:4000/graphql",
        body: { mutation },
        failOnStatusCode: false }
    ).then(({body}) => {
      cy.log(body)
      cy.request(
        { url: "http://localhost:4000/graphql",
        body: { mutation: addGroup },
        failOnStatusCode: false }
      )
    })
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