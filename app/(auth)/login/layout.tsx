import { authOptions } from "@/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return children;
};

export default Layout;
