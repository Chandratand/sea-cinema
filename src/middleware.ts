import { withAuth } from "next-auth/middleware";

export default withAuth(async () => {});

export const config = {
  matcher: [
    "/balance",
    "/balance/(.*)",
    "/transactions",
    "/transactions/(.*)",
    "/order",
    "/order/(.*)",
  ],
};
