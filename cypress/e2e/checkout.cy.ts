describe('Checkout confirmation', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#pay-button').click();
    });


    it('should initialize the form with empty and invalid state', () => {
        // Check form and fields initialization
        cy.get('form[name="adressForm"]').should('exist');
        cy.get('#contactName').should('have.value', '');
        cy.get('#contactEmail').should('have.value', '');
        cy.get('#contactPhoneNumber').should('have.value', '');
        cy.get('#country').should('have.value', null); // assuming "Select an option" as initial value
        cy.get('#stateProvince').should('have.value', '');
        cy.get('#city').should('have.value', '');
        cy.get('#streetHouse').should('have.value', '');
        cy.get('#zipCode').should('have.value', '');
        cy.get('#nextButton').click();
        cy.wait(1000);
        cy.get('ngb-alert').should('exist');
    });

    it('should shows fields errors on click next button', () => {
        cy.get('#nextButton').click();
        cy.get('#contactNameField').get('#requiredError').should('exist');
        cy.get('#contactEmailField').get('#requiredError').should('exist');
        cy.get('#contactPhoneNumberField').get('#requiredError').should('exist');
        cy.get('#countryField').get('#requiredError').should('exist');
        cy.get('#stateProvinceField').get('#requiredError').should('exist');
        cy.get('#cityField').get('#requiredError').should('exist');
        cy.get('#streetHouseField').get('#requiredError').should('exist');
        cy.get('#zipCodeField').get('#requiredError').should('exist');
    });

    it('should validate email format', () => {
        cy.get('#contactEmail').type('invalid-email');
        cy.get('#contactEmailField').get('#invalidEmailError').should('exist');

        cy.get('#contactEmail').clear().type('test@example.com');
        cy.get('#contactEmailField').get('#invalidEmailError').should('not.exist');
    });

    it('should validate max length for contactName', () => {
        cy.get('#contactName').type('A'.repeat(51));
        cy.get('#contactNameField').get('#maxlengthError').should('exist');
        cy.get('#contactName').clear().type('Valid Name');
        cy.get('#contactNameField').get('#maxlengthError').should('not.exist');
    });

    it('should enable Next button when form is valid', () => {
        cy.get('#contactName').type('John Doe');
        cy.get('#contactEmail').type('john@example.com');
        cy.get('#contactPhoneNumber').type('+123456789');
        cy.get('#country').select('United States'); // replace with an actual option if needed
        cy.get('#stateProvince').type('California');
        cy.get('#city').type('Los Angeles');
        cy.get('#streetHouse').type('1234 Sunset Blvd');
        cy.get('#zipCode').type('90001');
        cy.get('#nextButton').click();
        cy.get('ngb-alert').should('not.exist');
        cy.get('app-payment-information').should('be.visible');
    });

});


describe('Payment Information', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000);
        cy.get('#item').first().get('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#item-dialog').get('#item-size').first().click();
        cy.get('#item-dialog').find('#add-to-cart').click();
        cy.wait(1000);
        cy.get('#cart-button').click();
        cy.get('#shopping-cart').get('#pay-button').click();
        cy.get('#contactName').type('John Doe');
        cy.get('#contactEmail').type('john@example.com');
        cy.get('#contactPhoneNumber').type('+123456789');
        cy.get('#country').select('United States'); // replace with an actual option if needed
        cy.get('#stateProvince').type('California');
        cy.get('#city').type('Los Angeles');
        cy.get('#streetHouse').type('1234 Sunset Blvd');
        cy.get('#zipCode').type('90001');
        cy.get('#nextButton').click();
    });
    

    it('should initialize the form with empty and invalid state', () => {
        cy.get('form[name="paymentInfoForm"]').should('exist');
        cy.get('#cardHolderName').should('have.value', '');
        cy.get('#cardNumber').should('have.value', '');
        cy.get('#expairyDate').should('have.value', '');
        cy.get('#cvv').should('have.value', '');
        cy.get('#paymentNextButton').click();
        cy.wait(1000);
        cy.get('ngb-alert').should('exist');
    });

    it('fills and submits the form successfully', () => {
        cy.get('#cardHolderName').type('John Doe');
        cy.get('#cardNumber').type('4675 7645 9846 3723');
        cy.get('#expairyDate').type('12/25');
        cy.get('#cvv').type('123');
        cy.get('#paymentNextButton').click();
    });
});