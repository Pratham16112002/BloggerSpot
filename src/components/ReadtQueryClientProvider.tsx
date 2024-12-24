"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReadtQueryClientProvider({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReadtQueryClientProvider;
