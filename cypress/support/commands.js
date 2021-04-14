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
  const mutation = `mutation{
    login(username: "${username}", password: "${password}"){value}
  }`
  cy.request( "POST", "http://localhost:4000/graphql", { query: mutation })
    .then((res) => {
      localStorage.setItem("user-token", res.body.data.login.value.toString())
      cy.visit("http://localhost:4000")
    })
})


Cypress.Commands.add("createUser", ({ username, name, password }) => {
  const mutation = `mutation{
    createUser(username: "${username}", name: "${name}" password: "${password}"){id}
  }`
  cy.request("POST", "http://localhost:4000/graphql",{ query: mutation })
})