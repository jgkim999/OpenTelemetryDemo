import http from 'k6/http';
import { fail, sleep } from 'k6';
import { randomString, randomIntBetween, check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
    thresholds: {
        http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
        http_req_duration: ['p(99)<1000'],
    },
    scenarios: {
        // define scenarios
        breaking: {
            executor: 'ramping-vus',
            stages: [
                { duration: '1m', target: 100 },
                { duration: '10m', target: 100 },
                { duration: '1m', target: 0 }
            ],
        },
    },
};

export default function () {
    const baseUrl = 'http://localhost:5025';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const username = randomString(8);
    const password = randomString(12);
    
    const createPayload = JSON.stringify({
        firstName: randomString(8),
        lastName: randomString(8),
        age: randomIntBetween(1, 80),
        username: username,
        password: password,
    });
    const res = http.post(`${baseUrl}/api/user/create`, createPayload, params);
    sleep(randomIntBetween(1, 1));      
    
    const loginPayload = JSON.stringify({
        username: username,
        password: password,
    });
    http.post(`${baseUrl}/api/login`, loginPayload, params);
    sleep(randomIntBetween(1, 1));
}
