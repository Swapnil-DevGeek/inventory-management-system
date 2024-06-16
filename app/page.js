"use client";
import { initializeLocalStorage } from "@/data";
import { useEffect } from "react"
import Home from "@/components/Home";

export default function Page() {

  useEffect(() => {
    // Initialize localStorage only if it hasn't been initialized before
    const items = JSON.parse(localStorage.getItem('items'));
    if (!items) {
      initializeLocalStorage();
    }
  }, []);


  return (

    <>
      <Home/>
    </>
  );
}
