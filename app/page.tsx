import { authOptions } from "@/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  else redirect("/login");
};

export default page;
