import { makeRpcRequest } from '../support/rpcHelper';

describe('Interact with Moralis Node via RPC', () => {
  let currentBlockNumber: number;
  let blockDetails: any;
  let transactionHash: string;

  it('should get the current block number', () => {
    makeRpcRequest('eth_blockNumber').then((response) => {
      expect(response.status).to.eq(200);
      currentBlockNumber = parseInt(response.body.result, 16);
      cy.log(`Current Block Number: ${currentBlockNumber}`);
    });
  });

  it('should get the details of the current block', () => {
    cy.wrap(null).then(() => {
      if (currentBlockNumber) {
        makeRpcRequest('eth_getBlockByNumber', [`0x${currentBlockNumber.toString(16)}`, true]).then((response) => {
          expect(response.status).to.eq(200);
          blockDetails = response.body.result;
          cy.log(`Block Details: ${JSON.stringify(blockDetails)}`);
          transactionHash = blockDetails.transactions[0]?.hash;
        });
      } else {
        throw new Error('Current block number is not set.');
      }
    });
  });

  it('should get the details of a transaction by hash', () => {
    cy.wrap(null).then(() => {
      if (transactionHash) {
        makeRpcRequest('eth_getTransactionByHash', [transactionHash]).then((response) => {
          expect(response.status).to.eq(200);
          const transactionDetails = response.body.result;
          cy.log(`Transaction Details: ${JSON.stringify(transactionDetails)}`);
        });
      } else {
        cy.log('No transactions found in the current block.');
      }
    });
  });
});
