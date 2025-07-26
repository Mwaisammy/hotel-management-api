 import http from 'k6/http'
import  { check, sleep } from 'k6'


const BASE_URL = 'http://localhost:8081'


export const options = {
    stages: [
        {
            duration: '30s', target: 500
        },
        {
            duration: '50s', target: 1000
        },
        {
            duration: '50s', target: 2000
        },
        {
            duration: '20s', target: 500
        },
        {
            duration: '10s', target: 0
        }
    ],

    ext: {
        loadimpact: {
            name: 'Bookings GET Load Test', 
        }
    }
}


export default function() {
    const response = http.get(`${BASE_URL}/bookings`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    check(response, {
        'is status 200': (r) => r.status === 200
      
    })
    sleep(1)
}