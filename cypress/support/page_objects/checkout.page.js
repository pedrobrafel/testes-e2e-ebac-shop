
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
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
        cy.get('.woocommerce-order-overview__order').should('exist')
    }
}

export default new Checkout()