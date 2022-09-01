import { Actor, HttpAgent, Identity } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory, _SERVICE } from './notify_backend_backend.did.js';
export { idlFactory } from './notify_backend_backend.did.js';
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = "rkp4c-7iaaa-aaaaa-aaaca-cai";
// const canisterId = process.env.NOTIFY_BACKEND_BACKEND_CANISTER_ID;

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./notify_backend_backend.did.js")._SERVICE>}
 */
export const createActor = (canisterId, options) => {
  const agent = new HttpAgent(options ? { ...options.agentOptions } : {
    // Identity,
    host: "http://localhost:8000/",
  });
  
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...(options ? options.actorOptions : {}),
  });
};
  
/**
 * A ready-to-use agent for the notify_backend_backend canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./notify_backend_backend.did.js")._SERVICE>}
 */
export const notify_backend_backend = createActor(canisterId);
