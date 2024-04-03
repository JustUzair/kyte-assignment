"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { useMediaQuery } from "usehooks-ts";
import { Navbar } from "@/components/navbar";

import { WagmiProvider } from "wagmi";
import { http, createConfig } from "@wagmi/core";
import { optimismSepolia } from "@wagmi/core/chains";

import { useTheme } from "next-themes";
import { ModalProvider } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const queryClient = new QueryClient();

export const SubLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { connectors } = getDefaultConfig({
    appName: "kyte-assignment",
    projectId: "d4fd71715f9b4ef3585dde48ca2e9572",
    chains: [optimismSepolia],
    ssr: true,
  });
  const config = createConfig({
    chains: [optimismSepolia],
    transports: {
      [optimismSepolia.id]: http(),
    },
    connectors: [
      injected(),
      walletConnect({ projectId: "d4fd71715f9b4ef3585dde48ca2e9572" }),
      metaMask(),
      safe(),
    ],
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: darkTheme,
    light: lightTheme,
  };

  const theme = themeMap[currentTheme];
  const isMobile = useMediaQuery("(max-width:768px)");

  if (isLoaded)
    return (
      <AnimatePresence>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          storageKey="motion-theme-dark"
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider
                showRecentTransactions={true}
                coolMode
                theme={theme()}
              >
                <Navbar />
                <Toaster position="bottom-right" richColors />
                <ModalProvider />

                <div
                  className={cn(
                    "fixed top-0 left-0 right-0 bottom-0 z-[-1] bg-no-repeat w-[100vw]"
                  )}
                />
                {children}

                {/* <Footer /> */}
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </AnimatePresence>
    );
};
