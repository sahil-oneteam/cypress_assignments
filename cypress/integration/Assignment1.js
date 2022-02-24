/// <reference types="Cypress" />

describe("assignment1", function() {

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
              cy.visit(this.data.url) //hit the url
          })   
      })
  
  // first exercise
  it("Login_with_multiple_user_Keeping_data_in_fixtures", function() {
      // logging in with user1
      cy.login(this.data.user1,this.data.password)
      // verify
      cy.verifyHomeUrl()
      // logout user1
      cy.logout()
  
      // logging in with user3
      cy.login(this.data.user3,this.data.password)
      // verify
      cy.verifyHomeUrl()
      // logout user3
      cy.logout()
  
      // logging in with user4
      cy.login(this.data.user4,this.data.password)
      // verify
      cy.verifyHomeUrl()
      // logout user4
      cy.logout()
      
  })
  
  // second exercise
  it("Login_with_any_user_and_add_any_product_to_cart_goto_cart_verify_item_name_&_price", function() {
      cy.login(this.data.user1,this.data.password) //login with any user
      cy.get(this.locator.backpack).click() //add product to cart
      cy.goToCart() //go to cart
      cy.verifyCheckout(this.locator.itemName, this.text.backpack) //verifying the item name
      cy.verifyCheckout(this.locator.itemPrice, this.text.backpack$) //verifying the item price
  })
  
  // third exercise
  it("Login_with_any_user_then_add_lowest_price_product_then_remove_the_item", function() {
      cy.login(this.data.user1,this.data.password) //login with any user
      cy.get(this.locator.sortContainer).select(this.locator.lowToHigh) //sorting the item list: Price low to high
      // i have not put assertion on the above line because the DOM element is lost as of aynchronous nature
      cy.get(this.locator.sortContainer).should('have.value','lohi') //verify the sort (low to high)
      cy.get(this.locator.inventoryList).find(this.locator.inventoryItem).eq(0).contains('Add to cart').click() //add lowest price product to the cart
      cy.goToCart() //go to cart
      cy.verifyCheckout(this.locator.itemName, this.text.oneSize) //verifying the item name
      cy.verifyCheckout(this.locator.itemPrice, this.text.oneSize$) //verifying the item price
      cy.get(this.locator.removeOneSize).click() //remove the product from cart
      cy.get(this.locator.emptyCart).should('not.be.visible') //verifying the empty cart //emptyCart is not visible because its width is 0px as there is not item in the
  })

  })
  