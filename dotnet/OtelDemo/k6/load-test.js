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
                { duration: '1m', target: 1 },
                { duration: '10m', target: 1 },
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

    const createPayload = JSON.stringify({
        firstName: randomString(8),
        lastName: randomString(8),
        age: randomIntBetween(1, 80),
    });
    const res = http.post(`${baseUrl}/api/user/create`, createPayload, params);
    sleep(randomIntBetween(1, 1));      
    
    const loginPayload = JSON.stringify({
        username: randomString(8),
        password: randomString(12),
    });
    http.post(`${baseUrl}/api/login`, loginPayload, params);
    sleep(randomIntBetween(1, 1));
}
