import assert from "node:assert/strict";
import test from "node:test";

import {
  DarwinConnectClient,
  createApplicationClient,
  createLinkedAiClient,
} from "../dist/index.js";

test("exposes the complete Connect resource surface", () => {
  const client = createApplicationClient({
    token: "connect_test",
    baseUrl: "https://api.example.test/api/v1",
  });

  assert.ok(client instanceof DarwinConnectClient);
  assert.equal(typeof client.applications.listApplications, "function");
  assert.equal(typeof client.applications.getApplicationWallet, "function");
  assert.equal(typeof client.applications.fundApplicationWallet, "function");
  assert.equal(typeof client.enrollment.createEnrollmentBatch, "function");
  assert.equal(typeof client.ephemeralGoals.createEphemeralGoal, "function");
  assert.equal(typeof client.webhooks.createWebhook, "function");
  assert.equal(typeof client.listings.listListings, "function");
  assert.equal(typeof client.network.browseNetwork, "function");
});

test("uses bearer authority for application wallet requests", async () => {
  const calls = [];
  const client = createApplicationClient({
    token: "connect_application_test",
    baseUrl: "https://api.example.test/api/v1",
    maxRetries: 0,
    fetch: async (input, init) => {
      calls.push({
        url: String(input),
        method: init?.method,
        authorization: new Headers(init?.headers).get("authorization"),
      });
      return new Response(JSON.stringify({ wallet: {} }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });

  await client.applications.getApplicationWallet({ applicationId: "app_123" });

  assert.deepEqual(calls, [
    {
      url: "https://api.example.test/api/v1/applications/app_123/wallet",
      method: "GET",
      authorization: "Bearer connect_application_test",
    },
  ]);
});

test("creates a linked-AI client without changing the generated resource model", () => {
  const client = createLinkedAiClient({ token: "linked_user_test" });

  assert.ok(client instanceof DarwinConnectClient);
  assert.equal(typeof client.goals.createGoal, "function");
  assert.equal(typeof client.listings.listListings, "function");
  assert.equal(typeof client.deals.listDeals, "function");
});
