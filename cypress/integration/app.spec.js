describe("Login", function() {

  before( function() {

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
    before(function() {

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

    beforeEach(function() {
      cy.login({ username: "TestUsername", password: "salainen" })
    })
    it("user can logout", function () {
      cy.get("#logout-button").click()
      cy.contains("Login")
    })

    it("user can add event", function () {
      cy.get("#addEvent-button").click()
      cy.contains("New Event")
      cy.get("#name").type("EventTestName")
      cy.get("#group-options").type("TestGroup{enter}")
      cy.get("#submit-button").click()
      cy.get("#homepage-button").click()
      cy.contains("EventTestName")
    })
  })
})

describe("when there are events", function () {
  before(function() {

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
        }).then(() => {
          const addEvent = `mutation{
            addEvent(name: "EventTestName", group: "TestGroup", dates: []){name}
          }`
          cy.request({
            method: "POST",
            url: "http://localhost:4000/graphql",
            body: { query: addEvent },
            headers: {
              Authorization: `bearer ${token}`
            }
          })
        })
      })

    })
  })

  beforeEach(() => {
    cy.login({ username: "TestUsername", password: "salainen" })
  })

  it("Event View", function() {
    cy.contains("EventTestName").click()
  })

})