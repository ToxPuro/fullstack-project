describe("Login", function() {

  beforeEach( function() {

    cy.request("POST", "http://localhost:4000/testing/reset")

    const mutation = `mutation{
      createUser(username: "TestUsername", name: "ABC" password: "salainen"){id}
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

      cy.request("POST", "http://localhost:4000/testing/reset")

      const mutation = `mutation{
      createUser(username: "TestUsername", name: "ABC" password: "salainen"){id}
    }`

      cy.request("POST", "http://localhost:4000/graphql",{ query: mutation }).then(() => {
        cy.login({ username: "TestUsername", password: "salainen" }).then(() => {
          const token = localStorage.getItem("user-token")
          const addGroup = `mutation{
          createGroup(name: "TestGroup", users: []){name}
        }`
          cy.request({
            method: "POST",
            url: "http://localhost:4000/graphql",
            body: { query: addGroup },
            headers: {
              Authorization: `bearer ${token}`
            }
          }).then((res) => {
            cy.log(JSON.stringify(res))
          })
        })

      })


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