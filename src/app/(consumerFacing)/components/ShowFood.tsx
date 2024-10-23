"use client"
import FoodCard from "./FoodCard";
import { useState } from "react";
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IFood } from "@/models/foodModel";

const ShowFood = ({ foodItems }: { foodItems?:IFood[] }) => {
  const { data: session, status } = useSession()
  const router =  useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  const handleAdd = (id: string) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: (prevQuantity[id] || 0) + 1,
    }));
  };


  const handleClick = async () =>{
    if(session){
      setLoading(true);
      try {
        const res = await fetch('/api/cart/add',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            items: quantity,
            email : session.user.email
          })
        })
        if(res.ok){
          router.push('/cart');
        }else console.log("failed to add items");

      } catch (error) {
        console.log(error);
      }finally{
          setLoading(false)
      }
    }else{
      router.push('/usernotfound')
    }
    
  }

const totalQuantity = Object.values(quantity).reduce((accumulated, currentValue) => accumulated + currentValue, 0);
 
  return (
    <div className="">
      <div className="flex flex-wrap gap-3 justify-evenly mb-10">
        {foodItems?.map((food:IFood) => (
          <FoodCard
            key={food._id}
            image={food.image}
            name={food.name}
            price={food.price}
            description={food.description}
            id={food._id}
            quantity={quantity[food._id] || 0}
            onAdd={handleAdd}
          />
        ))}
      </div>
      {totalQuantity != 0 && (<div className="fixed justify-center rounded-sm text-white flex flex-col p-3 items-center border-black bg-[#ff6347] w-[200px] h-15 bottom-10">
             <div>
             {
                ( <p> {totalQuantity} item added</p>)
            }
             </div>
            {  <Button onClick={handleClick} variant={'outline'} disabled={loading} className="text-black"> {!loading ? "Add to cart":"Adding...."} </Button>} 
           
      </div>) } 
    </div>
  );
};

export default ShowFood;












// "use client"
// import { Food } from "@prisma/client"
// import FoodCard from "./FoodCard"
// import { useState } from "react"

// const ShowFood = ({ foodItems }: { foodItems?: Food[] }) => {
//     const [quantity,setQuantity] = useState({});
//     return (
//         <div className="">
//             <div className="flex flex-wrap gap-3 justify-evenly">
//                 {foodItems?.map((food) => (
//                     <FoodCard image={food.image}
//                         name={food.name}
//                         price={food.price}
//                         description={food.description}
//                         id={food.id}
//                         quantity={quantity}
//                     />
//                 ))}

//             </div>
//             <div>

//             </div>
//         </div>
//     )
// }

// export default ShowFood


