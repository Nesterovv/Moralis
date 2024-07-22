export const getWalletNFTs = (walletAddress: string, chain: string, apiKey: string) => {
    return cy.request({
      method: 'GET',
      url: `https://deep-index.moralis.io/api/v2.2/nft/${walletAddress}?chain=${chain}&format=decimal&token_addresses=[]&media_items=false`,
      headers: {
        'accept': 'application/json',
        'X-API-Key': apiKey,
      },
    });
  };
  

export const authenticateAndGetApiKey = (email: string, password: string) => {
    return cy.request({
      method: 'POST',
      url: 'https://api.dashboard.moralis.io/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email,
        password,
        keepmeLoggedin: true
      }
    });
  };
  
