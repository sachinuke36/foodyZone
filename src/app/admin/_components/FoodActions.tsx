"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {  useTransition } from "react"
import { deleteFood, toggleFoodAvailability } from "../add-item/_actions/addFood"
import { useRouter } from "next/navigation"

const ActiveToggleDropdownItem = ({id, isAvailable}:{id:string, isAvailable:boolean}) =>{
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    return <DropdownMenuItem disabled={isPending} onClick={()=>{
        
        startTransition(async ()=>{
            await toggleFoodAvailability(id, !isAvailable);
            router.refresh();
        })
    }}>
        {isAvailable ? "Deactive": "Activate"}
    </DropdownMenuItem>
}

export default ActiveToggleDropdownItem

export const DeleteDropdownItem = ({id,disabled}:{id:string, disabled:boolean})=>{
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return <DropdownMenuItem disabled={disabled || isPending} onClick={()=>{
        
        startTransition(async ()=>{
            await deleteFood(id);
            router.refresh();
        })
    }}>
        Delete
    </DropdownMenuItem>

}