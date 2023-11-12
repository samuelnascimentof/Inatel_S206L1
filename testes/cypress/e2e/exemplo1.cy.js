/// <reference types="cypress"/>

describe('Criando cenário de teste para o site globalsqa', () => {

  it('Caso de teste: Registrando um usuário no site com sucesso', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  })

  it('Caso de teste: Registrando um usuário no site com falha (faltando senha)', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')

  })

  it('Caso de teste: Realizando login com sucesso', () => {
    const info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

  it('Caso de teste: Deletando um usuário com sucesso', () => {
    const info = criarUsuario()
    cy.login(info[0], info[1])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.login(info[0], info[1])
    cy.get('.ng-binding').should('have.text', 'Username or password is incorrect')
  })

  it.skip("Caso de teste: Realizando login com falha (senha incorreta)", () => {
    const { user } = criarUsuario();
    realizarLogin(user, "senha incorreta");
    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });

  it.skip("Caso de teste: Realizando login com falha (usuário incorreto)", () => {
    const { pass } = criarUsuario();
    realizarLogin("usuario incorreto", pass);

    cy.get(".ng-binding").should(
      "contain.text",
      "Username or password is incorrect"
    );
  });
})

function criarUsuario(){

  const horas = new Date().getHours().toString()
  const minutos = new Date().getMinutes().toString()
  const seg = new Date().getSeconds().toString()
  const user = horas + minutos + seg + 'Id'
  const senha = horas + minutos + seg + 'senha'
  const userInfo = [user, senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user)
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo
}

function realizarLogin(user, pass) {
  const currentPath = cy.url();
  if (
    currentPath !==
    "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
  ) {
    cy.visit(
      "https://globalsqa.com/angularJs-protractor/registration-login-example/#/login"
    );
  }
  if (user !== "") cy.get("#username").type(user);
  if (pass !== "") cy.get("#password").type(pass);

  if (user !== "" && pass !== "") cy.get(".btn-primary").click();
}
