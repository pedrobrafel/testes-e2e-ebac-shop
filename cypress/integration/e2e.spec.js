/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
var faker = require('faker-br');
import enderecoEntrega from '../support/page_objects/endereco.page'
import checkout from '../support/page_objects/checkout.page'


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.visit('produtos/')
        cy.get('[class="product-block grid"]').eq(1).click()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()
        let empresa = faker.company.companyName()
        let endereco = faker.address.streetAddress()
        let pais = 'Brasil'
        let estado = 'Minas Gerais'
        let cidade = faker.address.city()
        let cep = faker.address.zipCode()
        let telefone = faker.phone.phoneNumber()
        let email = faker.internet.email(nome)

        cy.addProdutos('S', 'Blue', 1)
        cy.addProdutos('XS', 'Blue', 1)
        cy.addProdutos('M', 'Red', 1)
        cy.addProdutos('L', 'Green', 1)

        checkout.validaCarrinho()

        cy.confirmaIdentidade(perfil.usuario, perfil.senha)

        enderecoEntrega.atualizarEnderecoFaturamento(nome, sobrenome, empresa, pais, endereco, cidade, estado, cep, telefone, email)

        checkout.finalizarComprar()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
        cy.get('.woocommerce-order-overview__order').should('exist')
    });
})