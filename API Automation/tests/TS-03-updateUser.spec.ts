import { test, expect } from '@playwright/test';
import { BASE_URL, API_KEY } from '../helpers';

test('Scenario_3 - Update a user', async ({ request }) => {
  const userId = 2;
  const updateBody = { name: 'Jane Doe', job: 'Senior Developer' };

  const response = await request.put(`${BASE_URL}/users/${userId}`, {
    headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
    data: updateBody
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe(updateBody.name);
  expect(body.job).toBe(updateBody.job);

  console.log('Updated user:', body);
});

// Scenario_3
// 1. Update a user
// 2. Validate that the update was successful
// 3. Validate that the response body matches the request body where applicable