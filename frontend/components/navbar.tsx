"use client";

import "@/app/globals.css";

import {
  AlignJustify,
  Menu,
  MoreHorizontal,
  MoreVertical,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ElementRef, useEffect, useRef, useState } from "react";
import { cubicBezier, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { useSettings } from "@/hooks/use-settings";

// import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

export const Navbar = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const [isResetting, setIsResetting] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const settings = useSettings();
  const navbarRef = useRef<ElementRef<"div">>(null);
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: cubicBezier(0.6, 0.01, -0.05, 0.95),
        duration: 1,
        staggerChildren: 1.25,
      },
    },
    end: {
      opacity: 0,
      y: -100,
    },
  };

  const Links = [
    {
      name: "Collections",
      href: "/collections",
    },

    {
      name: "My NFTs",
      href: "/my-nfts",
    },
    // {
    //   name: "Tutorials",
    //   href: "/",
    // },
  ];
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded && !isMobile)
    return (
      <div className={`navbar-glass sticky top-0 z-[99999] bg-accent`}>
        <motion.div
          transition={{
            duration: 0.5,
            type: "tween",
            ease: "easeInOut",
          }}
          initial={{
            y: "-100%",
          }}
          animate={{
            y: "0%",
          }}
          className={cn(
            !isMobile &&
              // "flex items-center justify-between p-5 sticky top-0 bg-[#fafafa] dark:bg-zinc-900 z-[99999]",
              "flex items-center justify-between p-5 z-[99999] text-white",
            isMobile && "hidden"
          )}
        >
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              router.push("/");
            }}
          >
            Kyte
          </span>
          <div className="flex grow items-center justify-between ">
            <motion.div
              className="flex px-10 grow items-center justify-end"
              initial="initial"
              animate={"animate"}
              exit={"end"}
              // key="page"
              variants={fadeInAnimationVariants}
            >
              {Links.slice(0, 2).map((link, index) => {
                return (
                  <motion.span key={index}>
                    <Link
                      href={link.href}
                      target={link.name != "Investors" ? "_self" : "_blank"}
                      className="mx-10 bg-accent text-zinc-900 hover:bg-gray-300 dark:hover:bg-zinc-900 dark:hover:text-[#fafafa] font-semibold transition-all px-3 py-2 rounded-lg duration-300"
                      key={index}
                    >
                      {link.name}
                    </Link>
                  </motion.span>
                );
              })}
            </motion.div>

            <motion.span
              variants={fadeInAnimationVariants}
              initial="initial"
              animate="animate"
              exit={"end"}
            >
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  largeScreen: true,
                  smallScreen: false,
                }}
                chainStatus={{
                  smallScreen: "none",
                  largeScreen: "full",
                }}
              />
            </motion.span>
          </div>
        </motion.div>
      </div>
    );

  if (isLoaded && isMobile)
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-3 top-3 dark:border-white"
          onClick={() => {
            setIsCollapsed(false);
          }}
        >
          <Menu className="dark:text-white" />
          {/* <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
        </Button>
        <motion.div
          ref={navbarRef}
          transition={{
            duration: 0.5,
            type: "tween",
            ease: "backInOut",
          }}
          animate={isCollapsed ? "open" : "close"}
          initial={{
            x: "-100%",
          }}
          variants={{
            close: {
              x: "0",
            },
            open: {
              opacity: 0,
              x: "-100%",
            },
          }}
          className={cn(
            !isMobile && "hidden",
            isMobile &&
              "fixed top-0 left-0 right-0 bottom-0 flex flex-col items-start justify-start py-10 px-4 h-[100vh] bg-[#fafafa] dark:bg-zinc-900 z-[99999]"
          )}
        >
          <span
            className="cursor-pointer flex justify-between items-center w-[100%]"
            onClick={() => {
              router.push("/");
            }}
          >
            <span className="flex-grow flex items-center justify-center">
              <Image
                src="/assets/img/theleaguediscordtransparent.png"
                alt={"Logo"}
                width={"70"}
                height={"70"}
                priority
              />
            </span>
            <span>
              <Button
                variant="outline"
                size="icon"
                className="dark:border-white"
                onClick={() => {
                  setIsCollapsed(true);
                }}
              >
                <X className="dark:text-white" />
              </Button>
            </span>
          </span>
          <div className="flex flex-col w-[100%] flex-grow">
            <div className="flex flex-col grow p-5 justify-around">
              {Links.map((link, index) => {
                return (
                  <motion.span
                    // href={link.href}
                    onClick={() => {
                      setIsCollapsed(true);
                      setTimeout(() => {
                        router.push(link.href);
                      }, 1500);
                    }}
                    key={index}
                    className="mx-10 cursor-pointer p-5 rounded-sm duration-300 font-semibold dark:hover:bg-zinc-700 hover:bg-gray-200 transition-all "
                  >
                    {link.name}
                  </motion.span>
                );
              })}
              {/* <Button
                className="bg-zinc-900 hover:bg-zinc-900/80 dark:hover:bg-gray-200/90 dark:bg-gray-200"
                variant="default"
                onClick={settings.onOpen}
              >
                Change Appearance
              </Button> */}
            </div>
            <span className="flex justify-center items-center">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
                showBalance={{
                  smallScreen: true,
                  largeScreen: true,
                }}
                chainStatus={{
                  smallScreen: "icon",
                  largeScreen: "full",
                }}
              />
            </span>
          </div>
        </motion.div>
      </>
    );
};
