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

Cypress.Commands.add('loadListAndVisit', (url, status, jsonData) => {
    cy.intercept('GET', url, {
        statusCode: status,
        fixture: jsonData
    }).as('delay')

    cy.visit('/')
})

Cypress.Commands.add('loadDetailAndVisit', (url, method, testIdx) => {
    cy.fixture('contacts-list').then((contacts) => {
        const contact = contacts.find((e) => e.cIdx === testIdx);

        cy.intercept(method, `${url}/${testIdx}`, {
            statusCode: 200,
            body: contact
        }).as('delay')

        cy.visit(`/${testIdx}`)
    })
})

Cypress.Commands.add('seed', (url, status, testData) => {
    cy.intercept('GET', url, {
        statusCode: status,
        body: testData
    })
})

Cypress.Commands.add('seedPost', (url, status, testData) => {
    cy.intercept('POST', url, {
        statusCode: status,
        body: testData
    })
})

Cypress.Commands.add('seedGetList', (url, status, jsonData) => {
    cy.intercept('GET', url, {
        statusCode: status,
        fixture: jsonData
    })
})