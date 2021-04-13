describe("SignIn", function () {
  before(function (){
    cy.request("POST", "http://localhost:4000/testing/reset")
    const mutation = `mutation{
      createUser(username: "TestUsername", name: "ABC" password: "salainen"){id}
    }`

    cy.request("POST", "http://localhost:4000/graphql",{ query: mutation })
  })
  it("User can sign in with unique username", function() {
    cy.visit("http://localhost:4000")
    cy.get("#signIn-button").click()
    cy.contains("Sign In")
    cy.get("#username").type("UniqueUsername")
    cy.get("#name").type("ABC")
    cy.get("#password").type("Salainen")
    cy.get("#submit-button").click()
    cy.contains("Hello ABC")
  })

  it("User can't sign in with username that has been already been taken", function () {
    cy.visit("http://localhost:4000")
    cy.get("#signIn-button").click()
    cy.contains("Sign In")
    cy.get("#username").type("TestUsername")
    cy.get("#name").type("ABC")
    cy.get("#password").type("Salainen")
    cy.get("#submit-button").click()
    cy.get("#notification")
      .contains("Username needs to be unique")
      .should("have.css", "color", "rgb(255, 0, 0)")
  })
})

describe("Login", function() {

  before( function() {

    cy.request("POST", "http://localhost:4000/testing/reset")

    const mutation = `mutation{
      createUser(username: "TestUsername", name: "ABC" password: "salainen"){id}
    }`

    cy.request("POST", "http://localhost:4000/graphql",{ query: mutation })
  })

  it("user can login with correct credentials", function() {
    cy.visit("http://localhost:4000")
    cy.contains("Login")
    cy.get("#username").type("TestUsername")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()
    cy.contains("Hello ABC")
    cy.get("#logout-button").click()
    cy.contains("Login")
  })

  it("login fails with incorrect credentials", function() {
    cy.visit("http://localhost:4000")
    cy.get("#username").type("WrongUsername")
    cy.get("#password").type("WrongPassword")
    cy.get("#login-button").click()
    cy.contains("wrong credentials")
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

    it("can't add event if no dates are picked", function () {
      cy.get("#addEvent-button").click()
      cy.contains("New Event")
      cy.get("#name").type("EventTestName")
      cy.get("#group-options").type("TestGroup{enter}")
      cy.get("#submit-button").click()
      cy.contains("pick possible dates")
    })

    it("can add event if dates are picked", function () {
      cy.get("#addEvent-button").click()
      cy.contains("New Event")
      cy.get("#name").type("EventTestName")
      cy.get("#dates-14").should("have.css", "background-color", "rgb(255, 255, 255)" )
      cy.get("#dates-14").click()
      cy.get("#dates-14").should("have.css", "background-color", "rgb(127, 255, 0)" )
      cy.get("#dates-15").should("have.css", "background-color", "rgb(255, 255, 255)" )
      cy.get("#dates-15").click()
      cy.get("#dates-15").should("have.css", "background-color", "rgb(127, 255, 0)" )
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
    cy.contains("EventTestName")
  })

})