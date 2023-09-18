/// <reference types="cypress" />


context('Oracle Test', () => {

    let userData;

    before(() => {
        // Read the JSON file and save it to the 'userData' variable
        cy.readFile("cypress/e2e/3-tests/login.json").then((data) => {
        userData = data;
        });
    });

    it('google test', function() {

        // Log the loaded JSON data
        cy.log("Loaded User Data:", userData);

        // Access specific properties from the JSON data
        cy.log("Username:", userData.username);
        cy.log("Password:", userData.password);

        cy.visit("https://apex.oracle.com/pls/apex/r/danmende/qa-application/home")
        // cy.get('#P9999_USERNAME').type("QA_USER")
        // cy.get('#P9999_PASSWORD').type("qatest123")
        
        cy.get('#P9999_USERNAME').type(userData.username)
        cy.get('#P9999_PASSWORD').type(userData.password)

        cy.get('#B12601466532783624621').click()

        // Go to the page with order number 10
        cy.wait(5000)
        cy.get('.js-pg-next > .a-Icon').click()

        // Chnage customer of order number 10
        cy.get('[data-id="10"] > .u-tE').click();
        cy.get('.a-GV-row.is-selected > :nth-child(6)').dblclick().type('Deli')
        cy.get('.a-PopupLOV-searchBar > .a-Button').click()
        cy.wait(2000)
        cy.get('.a-IconList-item').click()
        cy.get('#B12602635547059750577').click()

        // Check if customer of order 10 changed as expected
        cy.wait(5000)
        cy.get('[data-id="10"] > :nth-child(6)').should('exist')        
        cy.get('[data-id="10"] > :nth-child(6)').should('have.text', 'Deli')

        // Change quantity of order number 10
        cy.get('[data-id="10"] > .u-tE').click().type('10')
        cy.get('#B12602635547059750577').click()
        
        // Check if quantity of order number 10 changed
        cy.wait(5000)
        cy.get('[data-id="10"] > .u-tE').should('exist')
        cy.get('[data-id="10"] > .u-tE').should('have.text', '10')

    })

})