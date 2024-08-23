import { Button } from "@/components/ui/button";
import Link from "next/link";

const Actions = () => {
  return (
    <div>
      <Link href="/deaths/new">
        <Button>New record</Button>
      </Link>
    </div>
  );
};

export default Actions;
