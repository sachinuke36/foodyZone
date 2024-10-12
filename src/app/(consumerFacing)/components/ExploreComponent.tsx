"use client"
import React, { useEffect, useState } from 'react'
import {menu_list} from '../../../../assets/assets'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ShowFood from './ShowFood'
import { IFood } from '@/models/foodModel'
// import { Food } from '@prisma/client'
// import ShowFood from '../_actions/ShowFood'
// import { getFoodAccordingToCategory } from '../api/getFoodAccordingToCategory'

const ExploreComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Salad");
  const [foodItems, setFoodItems] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(()=>{
    const getFood = async ()=>{
      setLoading(true);
      try {
        const res = await fetch(`/api/food?category=${selectedCategory}`,{next:{revalidate: 60*60*1000*24}});
        if (!res.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await res.json();
        // console.log(data);
        setFoodItems(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } 
    getFood()
  
  },[selectedCategory])

  const fetchFoodItems = async (category: string) => {
    setLoading(true);
    setError(null);

    

    if(!foodItems) return <div className="">Loading data.....</div>

  }

  return (
    <div className='w-[80%] mx-auto mt-4'>
        <h1 className='font-bold text-[20px]'>Explore our Menu</h1>
        <p className='text-neutral-500'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our meal satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className='flex justify-evenly pt-5'>
          {menu_list.map((i,k)=>(
            <div key={k} onClick={()=>{
              setSelectedCategory(i.menu_name);
              // fetchFoodItems(selectedCategory)
              }} className='flex flex-col items-center gap-2'>
              <div className={cn('',selectedCategory === i.menu_name && 'border border-red-500 p-1 rounded-full')}>
                <Image src={i.menu_image} width={80} alt='' height={80}/>
              </div>
                <p>{i.menu_name}</p>
            </div>
          )
        
          )}
        </div>
        <ShowFood foodItems={foodItems} />
    </div>
  )
}

export default ExploreComponent
