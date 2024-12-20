import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login`);
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <Navbar />

        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
