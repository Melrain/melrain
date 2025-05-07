// types/user.ts
export interface PublicUser {
  userId: string;
  authMethod: "telegram" | "email" | "google" | "phone";
  email?: string;
  phone?: string;
  telegramId?: string;
  walletAddress: string;
  metadata?: {
    balance?: string;
  };
}
