/// <reference types="Cypress" /> 

describe("assignment3",() => {
    
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
        })
    })

it("login_to_flipkart_select_price_range_fetch_all_available_products_sort_priceHighToLow_and_fetch_highest_product_details", function() {
    cy.visit(this.data.urlFlipkart) //hit the url
    cy.contains(this.locator.electronics).trigger('mouseover') //mouseover on electronics section
    cy.contains(this.locator.laptopAccesories).trigger('mouseover') //mouseover on laptop accesories under electronics section
    cy.contains(this.locator.laptopKeyboards).click() //select laptop keyboards
    cy.get(this.locator.minRange).select(this.text.minRange) //set minimum range to 1000
    cy.get(this.locator.maxRange).select(this.text.maxRange) //set maximum range to 2000

    // getting the total available products count
    //function to reverse the string
    function ReverseString(str) {
        return str.split('').reverse().join('')
     }
    cy.get('._2tDckM').then( (productNumberString) => { //productNumberString- (Showing 1 – 40 products of 5,397 products)
      let temp= productNumberString.text().substring(28);
      cy.log(temp) //output: 5,397 products)
      let reverseTemp= ReverseString(temp);
      cy.log(reverseTemp) //output: )stcudorp 793,5
      let temp1= reverseTemp.substring(10);
      cy.log(temp1) //output: 793,5
      let productNumber= ReverseString(temp1)
      cy.log("total available products: "+productNumber) //output: total available products: 5,397
    })
    
    cy.contains(this.locator.sortHighToLow).click() //sort products price high to low
    // fetching the highest price product's name
    cy.get(this.locator.highestProductName).then( name => {
        cy.log(name.text())
    })
    //fetching the highest price product's price
    cy.get(this.locator.highestProductPrice).then( price => {
        cy.log(price.text())
    })
    
})

})
