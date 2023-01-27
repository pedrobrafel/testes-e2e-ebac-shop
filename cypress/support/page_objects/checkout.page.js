
class Checkout {

    validaCarrinho() {
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', '4')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.page-title').should('contain', 'Carrinho')
    }

    finalizarComprar() {
        cy.get('[type="radio"]').check('cod')
        cy.get('#terms').should('not.be.checked').check()
        cy.get('#place_order').click()
    }
}

export default new Checkout()