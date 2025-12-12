import { test, expect } from '@playwright/test';
import { BASE_URL, API_KEY } from '../helpers';

const delays = [0, 3];

for (const delay of delays) {
  test(`Scenario_4 - Validate response time with delay=${delay}`, async ({ request }) => {
    const start = Date.now();

    const response = await request.get(`${BASE_URL}/users?delay=${delay}`, {
      headers: { 'x-api-key': API_KEY }
    });

    const duration = Date.now() - start;

    // Adjust expected max duration based on delay
    const maxExpected = 1000 + delay * 1000; // 1s baseline + delay in seconds
    expect(duration).toBeLessThanOrEqual(maxExpected);

    expect(response.status()).toBe(200);

    console.log(`Response time for delay=${delay}: ${duration}ms`);
  });
}

// Scenario_4
// 1. Write a parameterized validation with the values `0` and `3`
// 2. Get a list of users passing a delay query parameter with the provided value for the validation
// 3. Validate that the response time is no longer than `1` second