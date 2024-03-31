"use client";

import { useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { FramerSpinner } from "@/components/framer-spinner";
import { useMediaQuery } from "usehooks-ts";

export default function Home() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    // setTimeout(() => setIsLoaded(true), 2000); // test
  }, []);

  if (!isLoaded) return <FramerSpinner />;

  if (isLoaded)
    return (
      <>
        <div className="flex items-center justify-center w-[100%] h-[100%]">
          {" "}
          <span className="text-5xl font-semibold text-gradient">
            Kyte Assignment
          </span>
        </div>
        {/* <CardContainer isMobile={isMobile} /> */}
      </>
    );
}
