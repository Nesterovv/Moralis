const moralisNodeUrl = 'https://site1.moralis-nodes.com/base/62427b5c302241aab8aba8fea4ded588';

export const makeRpcRequest = (method: string, params: any[] = []) => {
  return cy.request({
    method: 'POST',
    url: moralisNodeUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params,
    },
  });
};
