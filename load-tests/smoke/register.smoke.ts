import http from 'k6/http'
import { check, sleep } from 'k6'
export const options = {
    vus: 3, //users
    iterations: 3, //attemps
    duration: '15s'
}




function randomEmail() {

    return `user${Math.floor(Math.random() * 1000000)}@gmail.com` //random emails 

}

export default function () {
    const url = "http://localhost:8081/auth/register"

    const payload = JSON.stringify({
        firstname: 'test',
        lastname: 'user',
        email: randomEmail(),
        password: '12345678',
        contactPhone: "0700222333",
        address: "Mombasa, Kenya",
    })
    


    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = http.post(url, payload, params)

  check(res, {
  'is status 201': (r) => r.status === 201,
  'response has message': (r) => {
    try {
      const body = JSON.parse(r.body as  string);
      return body.message === 'User created successfully';
    } catch {
      return false;
    }
  }
});


    sleep(1)
} 