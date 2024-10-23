"use client"

import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { addItem, removeItem } from "../actions/manageItem"
import { useRouter } from "next/navigation"

const AddAndRemoveButton = ({quantity, foodId, userId}:{quantity:number, foodId:string, userId:string}) => {
    const router = useRouter();
  return (
    < >
        <TableCell className="flex gap-2 items-center">
         <Button onClick={async()=>{
            await addItem(quantity,foodId,userId)
            router.refresh();
         }} >+</Button>
            {quantity}
         <Button onClick={async()=>{
            await removeItem(quantity,foodId,userId)
            router.refresh();
         }}>-</Button>
        </TableCell>
        
    </>
  )
}

export default AddAndRemoveButton
