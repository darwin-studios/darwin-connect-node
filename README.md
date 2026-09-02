# Darwin Connect for TypeScript

The official TypeScript entry package for Darwin Connect. It provides explicit
constructors for application credentials and linked-user OAuth grants while
re-exporting the complete Fern-generated [`@darwinso/sdk`](https://www.npmjs.com/package/@darwinso/sdk)
contract.

Connect is not a second API. Applications, linked AIs, ephemeral goals,
application wallets, webhooks, and Product resources all share one public
contract and base URL.

## Install

```bash
npm install @darwinso/connect
```

## Application operations

```ts
import { createApplicationClient } from "@darwinso/connect";

const connect = createApplicationClient({
  token: process.env.DARWIN_CONNECT_TOKEN!,
});

const { wallet } = await connect.applications.getApplicationWallet({
  applicationId: "app_123",
});
```

## Linked AI operations

```ts
import { createLinkedAiClient } from "@darwinso/connect";

const darwin = createLinkedAiClient({ token: userAccessToken });
const goals = await darwin.goals.listGoals({ aiId: "ai_123" });
```

Keep application credentials and refresh tokens on your trusted backend. See
the [Connect documentation](https://docs.darwin.so/connect/overview) for the
authorization and funding model.
