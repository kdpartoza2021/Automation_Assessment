import { test, expect } from '@playwright/test';
import { BASE_URL, API_KEY } from '../helpers';

test('Scenario_5 - Login user without password', async ({ request }) => {
  const loginBody = { email: 'eve.holt@reqres.in' }; // missing password

  const response = await request.post(`${BASE_URL}/login`, {
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
    data: loginBody
  });

  expect(response.status()).toBe(400);

  const body = await response.json();
  console.log('Login attempt response:', body);
});

// Scenario_5
// 1. Login user without password
// 2. Validate that the user could not login