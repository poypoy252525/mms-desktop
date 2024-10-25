import { LoginForm } from "@/components/login-form";

const page = async () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default page;
