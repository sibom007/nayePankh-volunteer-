import { Footer } from "@/feature/landing/components/footer";
import { Header } from "@/feature/landing/components/header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default layout;
