import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import Header from "../components/Header";
import "../index.css"; // import normally, no ?url
import { useEffect } from "react";
import { createClientConnection } from "../lib/db";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [], // CSS is handled via import
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const result = createClientConnection();

    if (!result) {
      throw new Error("failed to connect to supabase client")
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
