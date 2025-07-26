import http from 'k6/http'
import { check, sleep} from 'k6'


export const options = {
    vus: 3,
    iterations: 3,
    duration: '15s'
     
}

export default function () {
    const url = `http://localhost:8081/auth/login`
    const payload = JSON.stringify({
       email: "testuser@gmail.com",
        password: "password456"
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = http.post(url, payload, params)
    check(res, {
        'is status 200': (r) => r.status === 200,
        'response has token' : (r) => {
            try {
                const body = JSON.parse(r.body as string)
                return typeof body.token === 'string'
                
            } catch (error) {
                return false
                
            }
        }
})

}