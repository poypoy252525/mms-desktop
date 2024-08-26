"use client";
import { ReactNode, useEffect, useState } from "react";

const MobileNotSupportedPage = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) return "Mobile devices or small screen not supported";

  return children;
};

export default MobileNotSupportedPage;
