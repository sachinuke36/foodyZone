"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const ProceedToCheckout = () => {
    const router = useRouter()
  return (
    <Button onClick={()=>{
        router.push( '/checkout');
    }} className="w-[70%] bg-[#ff6347]">Proceed to checkout</Button>
  )
}

export default ProceedToCheckout
