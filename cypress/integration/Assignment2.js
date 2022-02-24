/// <reference types="Cypress" /> 

describe("assignment2",() => {
    
    // before block will run once before all tests in the block
    beforeEach(function() {
        // below command is used to load the specified file from the fixtures folder and get data from the file
        // and in brackets mention the file name
        cy.fixture("text").then(function(text) {
            this.text= text
        })
        cy.fixture("locators").then(function(locator) {
            this.locator= locator
        })
        cy.fixture("testData").then(function(data) {
            this.data= data
         // hit the url
         cy.visit(this.data.url)
        })
    })

    // first exercise
    // with arrow function this is lost, mind it
    it("login_add_an_item_to_cart_checkout_enter_details_and_continue", function() {
        cy.login(this.data.user1,this.data.password) //login to the application
        cy.addItem(this.locator.backpack) //add item to the cart
        cy.goToCart() //go to cart
        cy.clickCheckout() //click on checkout button
        cy.enterDetails(this.data.firstName, this.data.lastName, this.data.postalCode)  //enter the details at checkout
        cy.clickContinue() //click on continue button
        // verifying FINISH and CANCEL button are visible or not on checkout page
        cy.get(this.locator.finish).then(($el) => {
            expect($el).to.be.visible
        })
        cy.get(this.locator.cancel).then(($el) => {
            expect($el).to.be.visible
        })
    })

    // second exercise
    it("login_add_two_items_to_cart_checkout_enter_details_then_continue_and_verify", function() {
        cy.login(this.data.user1, this.data.password) //login to the application
        cy.addItem(this.locator.boltTshirt) //add first item to the cart
        cy.addItem(this.locator.fleeceJacket) //add second item to the cart
        cy.goToCart() //go to cart
        cy.clickCheckout() //click on checkout button
        cy.enterDetails(this.data.firstName, this.data.lastName, this.data.postalCode) //enter the details at checkout page
        cy.clickContinue() //click on continue button
        // all verifications
        cy.verifyCheckout('#item_1_title_link > .inventory_item_name', this.text.boltTshirt) //first item name
        cy.verifyCheckout(':nth-child(3) > .cart_item_label > .item_pricebar > .inventory_item_price', this.text.boltTshirt$) //first item price
        cy.verifyCheckout('#item_5_title_link > .inventory_item_name', this.text.fleeceJacket) //second item name
        cy.verifyCheckout(':nth-child(4) > .cart_item_label > .item_pricebar > .inventory_item_price', this.text.fleeceJacket$) //second item price
        cy.verifyCheckout('.summary_subtotal_label', 'Item total: $65.98') // verifying semi total before tax
        cy.verifyCheckout('.summary_tax_label', 'Tax: $5.28') //verifying tax amount
        cy.verifyCheckout('.summary_total_label', 'Total: $71.26') //verifying total amount
        cy.get(this.locator.finish).click() //click on FINISH button
        cy.verifyCheckout('.complete-header', 'THANK YOU FOR YOUR ORDER') //verifying the message at Checkout:Complete page

    })

    // third exercise
    it("login_add_item_goto_cart_checkout_leave_details_empty_and verify_error_message", function() {
        cy.login(this.data.user1, this.data.password) //login to the application
        cy.addItem(this.locator.oneSize) //add item to the cart
        cy.goToCart() //go to cart
        cy.clickCheckout() //click on checkout button

        //'{alt}' is used in below lines to keep the text field empty as we cannot pass the empty string or null or undefined in the type() function

        //verifying the error message for the empty First Name text field
        cy.emptyVerify('{alt}', this.data.lastName, this.data.postalCode, this.text.errorFirstName) //keeping First Name text field empty, fill details
        

        //verifying the error message for the empty Last Name text field
        cy.emptyVerify(this.data.firstName, '{alt}', this.data.postalCode, this.text.errorLastName) //keeping Last Name text field empty, fill details

        //verifying the error message for the empty Postal Code text field
        cy.emptyVerify(this.data.firstName, this.data.lastName, '{alt}', this.text.errorPostalCode) //keeping Postal Code text field empty, fill details
    })

    // fourth exercise
    it("login_sort_highToLow_and_verify_highest_price_item_should_be_in_the_first_place", function() {
        cy.login(this.data.user1, this.data.password) //login to the application
        cy.get(this.locator.sortContainer).select(this.locator.highToLow) //sorting the item list: Price high to low
        //verifying highest price item to be in the first place
        cy.get(this.locator.highestPriceItem).should('have.text',this.text.highestItemPrice) 
       })
       

})