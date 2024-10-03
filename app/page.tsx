import { redirect } from "next/navigation";
import React from "react";

const RootPage = () => {
  return redirect("/dashboard");
};

export default RootPage;
