import { test, expect } from '@playwright/test';
import { BASE_URL, API_KEY } from '../helpers';

test('Scenario_2 - Create a new user', async ({ request }) => {
  const requestBody = { name: 'John Doe', job: 'Software Engineer' };

  const response = await request.post(`${BASE_URL}/users`, {
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  const createdAt = new Date(body.createdAt);
  const today = new Date();
  expect(createdAt.toDateString()).toBe(today.toDateString());

  console.log('Created user:', body);
});

// Scenario_2
// 1. Create a new user
// 2. Validate that the creation was successful
// 3. Validate that the creation date is today