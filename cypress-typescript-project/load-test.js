import http from 'k6/http';
import { sleep, check } from 'k6';

const EMAIL = "antonnesterov939@gmail.com";
const PASSWORD = "Belarus99!";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNmOTc4YmY3LWJlNGEtNGIyOS1iMjJmLWMyNmEzMDc4NzQ2YiIsIm9yZ0lkIjoiNDAwNjA2IiwidXNlcklkIjoiNDExNjQwIiwidHlwZUlkIjoiMzdhODVlZDAtMWMzMy00MTI4LThiMDMtZTUxNWEzNzUwYjUxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjEzMjY1NjcsImV4cCI6NDg3NzA4NjU2N30.tWh8WwEq8rQYJzTEHreKpng1yvNPe3qr4fu2-RmzTL4";
const API_URL = "https://api.dashboard.moralis.io";

export let options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp-up to 10 users over 30 seconds
        { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
    ],
};

export default function () {
    // Login request
    let loginPayload = JSON.stringify({
        email: EMAIL,
        password: PASSWORD,
        keepmeLoggedin: true,
    });
    let loginParams = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': TOKEN,  // Assuming you meant to use TOKEN here
        },
    };
    let loginRes = http.post(`${API_URL}/auth/login`, loginPayload, loginParams);
    check(loginRes, {
        'login succeeded': (r) => r.status === 200,
    });

    // Assume login response contains token
    let token = loginRes.json('token');

    // Fetch Wallet NFTs request
    let fetchNftsParams = {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': TOKEN,
            'Authorization': `Bearer ${token}`,
        },
    };
    let fetchNftsRes = http.get(`${API_URL}/nft/0x524cab2ec69124574082676e6f654a18df49a048/7603`, fetchNftsParams);
    check(fetchNftsRes, {
        'fetch NFTs succeeded': (r) => r.status === 200,
    });

    // Sleep between requests to simulate user think time
    sleep(1);
}
