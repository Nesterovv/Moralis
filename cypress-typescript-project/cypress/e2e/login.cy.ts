import { LoginPage } from '../pom/loginPage';

const loginPage = new LoginPage();

describe('Moralis Admin Login and fetch API key', () => {
  it('should successfully log in', () => {
    cy.bypassCaptcha();
    loginPage.navigate();
    loginPage.acceptCookies();
    loginPage.login(Cypress.env('email'), Cypress.env('password'));
    cy.url().should('eq', 'https://admin.moralis.io/');
    loginPage.verifyCurrentPlanCard();
  });
  it('should login and retrieve API key', () => {
    loginPage.navigate();
    loginPage.acceptCookies();
    loginPage.login(Cypress.env('email'), Cypress.env('password'));
    loginPage.fetchApiKey().then(apiKey => {
      cy.writeFile('cypress/fixtures/apiKey.json', { apiKey });
    });
  });
});
