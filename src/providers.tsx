import { ClerkProvider } from "@clerk/clerk-react";
import { StateProvider } from "./utils/use-app-state";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider frontendApi={clerkPubKey}>
      <StateProvider>{children}</StateProvider>
    </ClerkProvider>
  );
}
