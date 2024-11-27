"use client";

import Navbar from "@/components/fragments/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}