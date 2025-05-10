// "use client";

// import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
// import { LocalAccountSigner } from "@alchemy/aa-core";
// import { sepolia } from "viem/chains";

// let client: Awaited<ReturnType<typeof createLightAccountAlchemyClient>> | null =
//   null;

// export async function getSmartAccountClient() {
//   if (client) return client;

//   const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY!;
//   const POLICY_ID = process.env.NEXT_PUBLIC_GAS_POLICY_ID!;
//   const PRIVATE_KEY = process.env.NEXT_PUBLIC_EOA_PRIVATE_KEY!;

//   const signer = LocalAccountSigner.privateKeyToAccountSigner(
//     PRIVATE_KEY as `0x${string}`
//   );

//   client = await createLightAccountAlchemyClient({
//     chain: sepolia,
//     apiKey: ALCHEMY_API_KEY,
//     signer,
//     gasManagerConfig: {
//       policyId: POLICY_ID,
//     },
//   });

//   return client;
// }
