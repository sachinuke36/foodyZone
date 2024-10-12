import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from '@/lib/formatter';
import { Button } from '@/components/ui/button';

type FoodCardProps = {
  name: string;
  image: string;
  description: string;
  price: number;
  id: string;
  quantity: number;
  onAdd: (id: string) => void;
};

const FoodCard = ({ name, image, description, price, id, quantity, onAdd }: FoodCardProps) => {
  return (
    <Card className="mt-4 w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-clip overflow-hidden w-[90%]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} height={250} width={250} alt="food" />
      </CardContent>
      <CardFooter className="flex justify-evenly">
        <p className="text-[#ff6347]">{formatCurrency(price / 100)}</p>
        <Button onClick={() => onAdd(id)} variant="outline">
          Add ({quantity})
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;



// // import { Card } from '@/components/ui/card'
// import Image from 'next/image'
// import React from 'react'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { formatCurrency } from '@/lib/formatter'
// import { Button } from '@/components/ui/button'


// type foodCard = {
//     name: string, image: string, description: string, price: number, id: string, quantity:{}
// }
// const FoodCard = ({ name, image, description, price, id, quantity }: foodCard) => {
//     const handleAdd = (id:string)=>{
//             Object.quantity
//     }
//     return (
//         <>
//         <Card className='mt-4 w-[300px]'>
//             <CardHeader>
//                 <CardTitle>{name}</CardTitle>
//                 <CardDescription className='text-clip overflow-hidden w-[90%]'>{description}</CardDescription>
//             </CardHeader>
//             <CardContent >
//                 <Image className='' src={image} height={250} width={250} alt='food' />
//             </CardContent>
//             <CardFooter className='flex justify-evenly'>
//                 <p className='text-[#ff6347]'>{formatCurrency(price / 100)}</p>
//                 <Button onClick={()=>handleAdd(id)} variant={'outline'}>Add</Button>
//             </CardFooter>
//         </Card>
//         </>


//     )
// }

// export default FoodCard

