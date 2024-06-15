"use client";
import { initializeLocalStorage } from "@/data";
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    // Initialize localStorage only if it hasn't been initialized before
    const items = JSON.parse(localStorage.getItem('items'));
    if (!items) {
      initializeLocalStorage();
    }
  }, []);


  return (

    <>
      Inventory management
    </>
  );
}
