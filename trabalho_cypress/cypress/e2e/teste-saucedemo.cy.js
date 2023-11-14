/// <reference types="cypress"/>

describe('Criando cenário de teste para o site saucedemo.com', () => {

  it('Caso de teste: Realizando login com sucesso:', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_container').should('be.visible');
  })

  it('Caso de teste: Realizando login com falha:', () => {
    cy.login('standard_user', 'invalid_password');
    cy.get('[data-test="error"]').should('be.visible');
  })

  it('Caso de teste: Realizando login e logout:', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_container').should('be.visible');
    cy.get('.bm-burger-button').click();
    cy.get('#logout_sidebar_link').click();
    cy.get('[data-test="login-button"]').should('be.visible');
  })

  it('Caso de teste: Adicionando um item ao carrinho:', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_container').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_container').click();
    cy.get('.cart_item').should('be.visible');
  })

  it('Caso de teste: Adicionando e removendo um item do carrinho:', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_container').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_container').click();
    cy.get('.cart_item').should('be.visible');
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.cart_item').should('not.exist');
  })

  it('Caso de teste: Comprando um item:', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.get('.inventory_container').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_container').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Samuel');
    cy.get('[data-test="lastName"]').type('Nascimento Filho');
    cy.get('[data-test="postalCode"]').type('37540000');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('be.visible');
  })

})

