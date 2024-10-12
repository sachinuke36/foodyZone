"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import fs from 'fs/promises'
import React, { useState } from 'react'
// import { Food } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
// import updateFood from '../add-item/_actions/updateFood'
import { IFood } from '@/models/foodModel'
import updateFood from '../_components/update'
import { Button } from '@/components/ui/button'
import addFood from '../add-item/_actions/addFood'
import { formatCurrency, formatNumber } from '@/lib/formatter'
import Image from 'next/image'



const AddItemForm = ({ food }:{ food?: IFood | null}) => {
    
    //   console.log("from addForm",food)
    const [error, action] = useFormState(
        food == null ? addFood : updateFood.bind(null, food?._id ),
        {}
      )
    

    const [priceInCents, setPriceInCents] = useState<number | undefined>(food?.price);
    return (
        <form action={action} className='w-[80%] mx-auto p-2 flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <Label htmlFor='file' className='text-xl font-bold'> Upload Image</Label>
                <Input type='file' className='w-[50%]' required={food == null} id='image' name='image' />
                 {food != null && <Image alt='product image' height="400" width="400" src={food.image}/>}
                {error.image && <div className='text-destructive'>{error.image}</div>}
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='Food Item name' className='text-xl font-bold' >Name of food Item</Label>
                <Input type='text' id='name' name='name' defaultValue={food?.name} className='w-[50%]' />
                {error.name && <div className='text-destructive'>{error.name}</div>}
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='Food description' className='text-xl font-bold' >Food description</Label>
                <Textarea id='description' name='description' defaultValue={food?.description} className='w-[50%]' />
                {error.description && <div className='text-destructive'>{error.description}</div>}

            </div>

            <div className='flex justify-center items-center gap-5'>
                <div className='flex flex-col  gap-2'>
                    <Label htmlFor='Food description' className='text-xl font-bold' >Category</Label>
                    <Select name='category' defaultValue={food?.category} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Salad">Salad</SelectItem>
                            <SelectItem value="Rolls">Rolls</SelectItem>
                            <SelectItem value="Deserts">Deserts</SelectItem>
                            <SelectItem value="Sandwich">Sandwich</SelectItem>
                            <SelectItem value="Cake">Cake</SelectItem>
                            <SelectItem value="Pure Veg">Pure Veg</SelectItem>
                            <SelectItem value="Pasta">Pasta</SelectItem>
                            <SelectItem value="Noodles">Noodles</SelectItem>
                        </SelectContent>
                    </Select>
                    {error.category && <div className='text-destructive'>{error.category}</div>}

                </div>
                <div className='flex gap-2 items-center'>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor='Price' className='text-xl font-bold' >Price</Label>
                        <div className="flex gap-3 items-center">
                          <Input type='number' onChange={(e)=>setPriceInCents(Number(e.target.value) || undefined)} value={priceInCents ?? ""} id='price' name='price' />
                          <div>{formatCurrency((priceInCents || 0 )/ 100)}</div>
                        </div>
                    </div>
                    {error.price && <div className='text-destructive'>{error.price}</div>}
                </div>
            </div>
            <SubmitButton />
        </form>
    )
}

export default AddItemForm


const SubmitButton =()=>{
    const {pending} = useFormStatus()
    return (<Button type='submit' className='w-40 mx-auto' disabled={pending}>{pending ? 'Saving...':"Save"}</Button>) 

}



