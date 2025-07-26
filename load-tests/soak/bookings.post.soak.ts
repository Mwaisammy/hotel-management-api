import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8081';

export const options = {
  stages: [
    { duration: '30s', target: 500 },   // ramp up to 500 users
    { duration: '50s', target: 1000 },  // hold at 1000 users
    { duration: '50s', target: 2000 },  // hold at peak load
    { duration: '20s', target: 500 },   // scale down to 500
    { duration: '10s', target: 0 },     // ramp down to 0
  ],

  ext: {
    loadimpact: {
      name: 'Bookings POST Soak Test',
    },
  },
};

function randomDate(daysAhead: number = 7) {
  const today = new Date();
  const future = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return future.toISOString().split('T')[0];
}

export default function () {
  const payload = JSON.stringify({
    userId: 1, 
    roomId: 1, 
    checkInDate: randomDate(1),
    checkOutDate: randomDate(3),
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(`${BASE_URL}/booking`, payload, { headers });

  const success = check(res, {
    'is status 201': (r) => r.status === 201,
    'response has booking id or message': (r) => {
      try {
        const body = r.json();
        if (
          typeof body === 'object' &&
          body !== null &&
          !Array.isArray(body)
        ) {
          return (
            (body as Record<string, unknown>).id !== undefined ||
            (typeof (body as Record<string, unknown>).message === 'string' &&
              ((body as Record<string, unknown>).message as string).includes('success'))
          );
        }
        return false;
      } catch {
        return false;
      }
    },
  });

  if (success) {
    console.log('✅ Booking was created');
  }else{
    console.log('❌ Booking was not created');
  }

  sleep(1); // simulate user pacing
}
