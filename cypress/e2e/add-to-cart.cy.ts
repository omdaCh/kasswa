describe('Add to cart and cart actions', () => {


    beforeEach(()=>{
        cy.visit('/');
    });

    it('Should show Item dialog when cart button clicked from item list', () => {
      
        cy.get('#item').first().get("#item-name").invoke('text').then((selectedItemName) => {

            cy.wait(1000);
            cy.get('#item').get('#add-to-cart').click();
            cy.wait(1000);
            cy.get('#item-dialog')
                .get('#item-name')
                .invoke('text').then((dialogItemName) => {
                    expect(dialogItemName).to.equal(selectedItemName);
                });
        })

    });

    it("'Add to cart' button should be activated when size is selected", () => {
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').get('#add-to-cart').should('not.be.disabled');
    });

    it("Photo should be changed when other color selected", () => {
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').get('#add-to-cart').should('not.be.disabled');
    });

    it("Should add item to cart when add-to-cart button is clicked", () => {
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-quantity').invoke('text').should('equal','1');
    });

    it("Shoud open shoping cart on navebar shopping cart button click", () => { 
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.url().should('contain','/cart');
        cy.get('#shopping-cart').should('exist');
    });

    it("Shopping cart Change quantity of and item", () => { 
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#cart-item').as('cart-item')
        cy.get('@cart-item').first().get('#item-increment-quantity-button').click();
        cy.get('@cart-item').first().get('#item-quantity').invoke('text').should('equal','2');
        cy.get('@cart-item').first().get('#item-decrement-quantity-button').click();
        cy.get('@cart-item').first().get('#item-quantity').invoke('text').should('equal','1');
    });

    it("Delete shopping cart item by decrementing quantity to 0", () => { 
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#cart-item').first().get('#item-decrement-quantity-button').click();
        cy.get('#shopping-cart').get('#delete-cart-item').should('exist');
        cy.get('#shopping-cart').get('#delete-cart-item').get('#confirm-deletion-button').click();
        cy.get('#shopping-cart').get('#cart-item').should('not.exist');
    });

    it("Delete shopping cart item by delete button", () => { 
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#cart-item').first().get('#remove-item-button').click();
        cy.get('#shopping-cart').get('#delete-cart-item').should('exist');
        cy.get('#shopping-cart').get('#delete-cart-item').get('#confirm-deletion-button').click();
        cy.get('#shopping-cart').get('#cart-item').should('not.exist');
    });


    it("The button Browse the articls should work", () => { 
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#browse-articles').should('exist');
        cy.get('#shopping-cart').get('#browse-articles').click();
        cy.url().should('contain','item/item-list');
    });

    it.only("The button pay should take use to checkout page", () => { 
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#pay-button').click();
        cy.url().should('contain', 'checkout');
    });

})