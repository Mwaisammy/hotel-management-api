import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = 'http://localhost:8081'

export const options = {
    stages: [
        { duration: '20s', target: 20 },
        { duration: '30s', target: 40 },
        { duration: '10s', target: 0 }
    ],
    ext: {
        loadimpact: {
            name: 'User Registration Load Test',
        }
    }
}

// Generate a random email each time to avoid duplicate registration errors
function randomEmail() {
    const id = Math.floor(Math.random() * 1000000)
    return `user${id}@example.com`
}

export default function () {
    const payload = JSON.stringify({
         firstname: 'test',
        lastname: 'user',
        email: randomEmail(),
        password: '12345678',
        contactPhone: "0700222333",
        address: "Mombasa, Kenya",
    })

    const headers = {
        'Content-Type': 'application/json'
    }

    const res = http.post(`${BASE_URL}/auth/register`, payload, { headers })

    check(res, {
        'status is 201': (r) => r.status === 201,
        'registration success': (r) => {
            try {
                const body = r.json()
                let success = false
                if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
                    success = body.message.toLowerCase().includes("success")
                    if (success) console.log("✅ Registration successful")
                }
                return success
            } catch {
                return false
            }
        }
    })

    sleep(1)
}
