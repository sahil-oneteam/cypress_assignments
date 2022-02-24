// custom command for login functionality
Cypress.Commands.add("login", (username, password) => {
    // enter user name
    cy.get('#user-name').type(username)
    // enter password
    cy.get('#password').type(password)
    // click on login button
    cy.get('#login-button').click()
})

// custom command for verification
Cypress.Commands.add("verifyHomeUrl",() => {
    // verifying the home page with text 'Products'
    cy.contains('Products').should('have.text', 'Products')
    // verifying the url
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
})

// custom command for logout
Cypress.Commands.add("logout",() => {
     // logout from the application
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
})

// custom command to go to cart
Cypress.Commands.add("goToCart", () => {
    cy.get('.shopping_cart_link').click()
})

// custom command to add item in the cart
Cypress.Commands.add("addItem", (locator) => {
    cy.get(locator).click()
})

// custom command to click on checkout
Cypress.Commands.add("clickCheckout", () => {
    cy.get('#checkout').click()
})

// custom command to enter details at checkout
Cypress.Commands.add("enterDetails", (firstName, lastName, postalCode) => {
    cy.get('#first-name').clear().type(firstName)
    cy.get('#last-name').clear().type(lastName)
    cy.get('#postal-code').clear().type(postalCode)
})

// custom command to click on continue button
Cypress.Commands.add("clickContinue", () => {
    cy.get('#continue').click()
})

// custom command to verify at checkout page
Cypress.Commands.add("verifyCheckout", (locator, text) => {
    cy.get(locator).should('have.text', text)
})

// custom command for empty text field error message verification
Cypress.Commands.add("emptyVerify", (first, last, postal, error) => {
    cy.enterDetails(first, last, postal)
        cy.clickContinue() //click on continue button
        cy.get('[data-test="error"]').should('have.text', error) // verifying the error message
})

