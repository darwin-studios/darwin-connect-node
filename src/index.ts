import { DarwinClient } from "@darwinso/sdk";

export * from "@darwinso/sdk";
export { DarwinClient as DarwinConnectClient } from "@darwinso/sdk";

type DarwinClientOptions = ConstructorParameters<typeof DarwinClient>[0];

export type ConnectClientOptions = Omit<DarwinClientOptions, "token"> & {
  /** Application credential or linked-user OAuth access token. */
  token: string;
};

/**
 * Creates a client for application-owned Connect operations such as application
 * management, enrollment, application-funded goals, wallet funding, and webhooks.
 */
export function createApplicationClient(options: ConnectClientOptions): DarwinClient {
  return new DarwinClient(options);
}

/**
 * Creates a client for operating resources through a linked user's OAuth grant.
 * The API enforces the application, user, AI, and scope boundaries on every call.
 */
export function createLinkedAiClient(options: ConnectClientOptions): DarwinClient {
  return new DarwinClient(options);
}
