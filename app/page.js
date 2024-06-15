"use client";
import { initializeLocalStorage } from "@/data";
import { useEffect } from "react"

export default function Home() {

  useEffect(()=>{
      initializeLocalStorage();
  },[])


  return (

    <>
      Inventory management
    </>
  );
}
