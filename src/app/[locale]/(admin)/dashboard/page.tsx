import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Ecommerce() {
  return (
    <div>
      <h1 className="text-2xl">Statistics Page</h1>
    </div>
  );
}
