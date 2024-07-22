
declare namespace Cypress {
    interface Chainable<Subject = any> {
      findByTestId(testId: string): Chainable<Element>;
      findAllByTestId(testId: string): Chainable<Element>;
      acceptCookies(): Chainable<void>;
      loginWithApi(): Chainable<void>;
      bypassCaptcha(): Chainable<void>;
      loginWithToken(): Chainable<void>;
      // Add other commands from @testing-library/cypress as needed
    }
  }
  