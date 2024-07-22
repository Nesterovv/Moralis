export class LoginPage {
  private loginUrl: string;
  private emailField: string;
  private passwordInput: string;
  private submitButton: string;
  private currentPlanCard: string;
  private apiKeyElement: string;

  constructor() {
    this.loginUrl = '';
    this.emailField = 'test-email';
    this.passwordInput = 'test-password';
    this.submitButton = 'test-button';
    this.currentPlanCard = 'mui-card';
    this.apiKeyElement = "mui-input"
  }

  navigate() {
    cy.visit(this.loginUrl);
  }

  acceptCookies() {
    cy.acceptCookies();
  }

  enterEmail(email: string) {
    cy.findByTestId(this.emailField).type(email);
  }

  enterPassword(password: string) {
    cy.findAllByTestId(this.passwordInput).type(password);
  }

  submit() {
    cy.findByTestId(this.submitButton).click();
  }

  login(email: string, password: string) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.submit();
  }

  verifyCurrentPlanCard() {
    cy.findAllByTestId(this.currentPlanCard).eq(3).should("be.visible")
    cy.findAllByTestId(this.currentPlanCard).eq(3)
    .within(() => {
      cy.get('div.StyledHeaderWrapper-sc-l0gl7k-3').should('be.visible');
      cy.get('div.TypographyStyled-sc-l0gl7k-2').should('be.visible').and('contain.text', 'Current Plan');;
  }
)}

getApiKeyInput() {
  return cy.findByTestId(this.apiKeyElement);
}

fetchApiKey() {
  return this.getApiKeyInput().invoke('attr', 'id');
}
}
