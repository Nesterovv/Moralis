import { getWalletNFTs } from '../support/apiHelper';

describe('Authenticate and fetch Wallet NFTs', () => {
  let apiKey: string;

  it('should get NFTs by wallet', () => {
    cy.fixture('apiKey.json').then((data) => {
      const walletAddress = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e';
      const chain = 'eth';
      getWalletNFTs(walletAddress, chain, data.apiKey).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`NFTs: ${JSON.stringify(response.body)}`);
      });
    });
  });
});