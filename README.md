# Cypress Project for Moralis

This project leverages Cypress for end-to-end testing of the Moralis platform, focusing on both functional and automation tests for the admin UI and API.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Writing Tests](#writing-tests)
- [Load Testing](#load-testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- Node.js (>= 12.0.0)
- npm or yarn
- Cypress

### Steps
1. Clone the repository:
   \`\`\`sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   \`\`\`

2. Install dependencies:
   \`\`\`sh
   npm install
   # or
   yarn install
   \`\`\`

## Configuration

### Environment Variables
Create a \`.env\` file in the root directory and add the following environment variables:
\`\`\`env
CYPRESS_API_KEY=your_api_key_here
CYPRESS_API_URL=https://api.dashboard.moralis.io
CYPRESS_EMAIL=your-email@example.com
CYPRESS_PASSWORD=your-password
\`\`\`

## Running Tests

### Open Cypress Test Runner
\`\`\`sh
npx cypress open
\`\`\`

### Run Cypress Tests in Headless Mode
\`\`\`sh
npx cypress run
\`\`\`

### Run Specific Test
\`\`\`sh
npx cypress run --spec "cypress/e2e/your_test_file.cy.js"
\`\`\`

### Run Load Testing using k6
Install k6:
\`\`\`sh
brew install k6
\`\`\`

Run the load test:
\`\`\`sh
k6 run load-test.js
\`\`\`

## Project Structure

\`\`\`plaintext
cypress/
  e2e/
    tests
  fixtures/                # Test data
  support/
    commands.js            # Custom commands
    index.js               # Support file
    pages/
      loginPage.js         # Page Object Model for Login
load-test.js               # k6 load test script
README.md
\`\`\`

## Writing Tests

### Example UI Test
\`\`\`javascript
describe('Login to Moralis Admin', () => {
  it('should login and display the dashboard', () => {
    cy.visit(Cypress.env('CYPRESS_API_URL'));
    cy.get('#email').type(Cypress.env('CYPRESS_EMAIL'));
    cy.get('#password').type(Cypress.env('CYPRESS_PASSWORD'));
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome').should('be.visible');
  });
});
\`\`\`

### Example API Test
\`\`\`javascript
describe('Get Wallet NFTs', () => {
  it('should fetch NFTs for a given wallet', () => {
    cy.request({
      method: 'GET',
      url: \`\${Cypress.env('CYPRESS_API_URL')}/api/v2.2/nft/0x...\`,
      headers: {
        'X-API-Key': Cypress.env('CYPRESS_API_KEY'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('result');
    });
  });
});
\`\`\`

## Load Testing

The \`load-test.js\` file contains a k6 script for load testing the Moralis API. Configure the script with your API endpoints and run it as follows:

### Example \`load-test.js\`
\`\`\`javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = \`\${__ENV.CYPRESS_API_URL}/api/v2.2/nft/0x...\`;
  const params = {
    headers: {
      'X-API-Key': __ENV.CYPRESS_API_KEY,
    },
  };

  let res = http.get(url, params);
  check(res, {
    'status was 200': (r) => r.status == 200,
    'response body': (r) => r.body.indexOf('result') !== -1,
  });
}
\`\`\`

Run the load test:
\`\`\`sh
k6 run load-test.js
\`\`\`

## Contributing

1. Fork the repository.
2. Create your feature branch (\`git checkout -b feature/YourFeature\`).
3. Commit your changes (\`git commit -am 'Add some feature'\`).
4. Push to the branch (\`git push origin feature/YourFeature\`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
"""

with open("/mnt/data/README.txt", "w") as file:
    file.write(readme_content)

