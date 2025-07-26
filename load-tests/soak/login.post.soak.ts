import http from 'k6/http'
import { check, sleep } from 'k6'

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
            name: 'Login Load Test',
        }
    }
}

export default function () {
    const payload = JSON.stringify( {
        email: "testuser@gmail.com",
        password: "password456"
       })

    const headers = {
        'Content-Type': 'application/json',
    }

    const res = http.post(`${BASE_URL}/auth/login`, payload, { headers })

    check(res, {
        'is status 200': (r) => r.status === 200,
        'login success': (r) => {
            try {
                const body = r.json()
                let isLoggedIn = false
                if (body && typeof body === 'object' && body !== null) {
                    isLoggedIn = (body as any).token !== undefined || (body as any).message === "Login successful"
                }
                if (isLoggedIn) console.log('✅ Login successful')
                return !!isLoggedIn
            } catch {
                return false
            }
        }
    })

    sleep(1)
}
