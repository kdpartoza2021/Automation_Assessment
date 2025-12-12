import { test, expect } from '@playwright/test';
import { BASE_URL, API_KEY } from '../helpers';

test('Scenario_1 - Get users & print odd ID users', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/users`, {
    headers: { 'x-api-key': API_KEY }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();
  const oddUsers = data.data.filter((u: any) => u.id % 2 !== 0);

  console.log('Users with odd IDs:', oddUsers);
  test.info().annotations.push({ type: 'info', description: `Odd ID users: ${JSON.stringify(oddUsers)}` });
});

// Scenario_1
// 1. Get a list of available users
// 2. Validate that request was successful
// 3. Print available users with odd ID numbers to console or to test report