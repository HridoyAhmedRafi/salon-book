import { createAuthClient } from "better-auth/react";

// Same-origin by default, so no baseURL is needed in the browser.
export const authClient = createAuthClient();

export const { signIn, signUp, useSession } = authClient;
