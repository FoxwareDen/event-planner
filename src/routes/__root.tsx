import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import "../index.css"; // import normally, no ?url
import { useEffect } from "react";
import { createClientConnection } from "../lib/db";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Event planler" },
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
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <Scripts />
    </>
  );
}
