// "use server"

// import db from "@/db/db";
// import { optional, z } from "zod";
// import fs from 'fs/promises'
// import { notFound, redirect } from "next/navigation";

// const imageSchema = z.instanceof(File,{message:'Required'}).refine(file=> file.size === 0 || file.type.startsWith("image/"));

// const addSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   price : z.coerce.number().int().min(1),
//   category: z.string().min(1),
//   image: imageSchema.refine(file => file.size > 0,"Required")
// })


// const addFood = async (prevState:unknown,formData: FormData) => {
//  const result =  addSchema.safeParse(Object.fromEntries(formData.entries()))
//   // console.log(formData);
//   // console.log("result",result)
 
//   if(result.success === false){
//    // console.log("error",result.error.formErrors.fieldErrors)
//     return result.error.formErrors.fieldErrors
//   }

// const data = result.data

// // console.log("data",data);

// await fs.mkdir('public/food',{recursive:true});
// const image = `/food/${crypto.randomUUID()}-${data.image.name}`
// await fs.writeFile(`public${image}`,Buffer.from(await data.image.arrayBuffer()))

// const response = await db.food.create({data:{
//   name:data.name,
//   description:data.description,
//   category:data.category,
//   image,
//   price: data.price
// }})
// // console.log("response",response);
// redirect("/admin")
// }

// export default addFood
// export const toggleFoodAvailibity= async(id:string, isAvailable:boolean)=>{
//     await db.food.update({where:{id}, data:{isAvailable}})
// }

// export const deleleFood = async(id:string)=>{
//   const food = await db.food.delete({where:{id}});
//   if(food === null) return notFound()
//   await  fs.unlink(`public${food.image}`)
// }











// const editSchema = addSchema.extend({image:imageSchema.optional()})

// export const updateFood = async (id:string, prevState:unknown,  formData: FormData ) => {
//   const result =  editSchema.safeParse(Object.fromEntries(formData.entries()))
//   //  console.log(formData);
//   //  console.log("result",result)
  
//    if(result.success === false){
//     // console.log("error",result.error.formErrors.fieldErrors)
//      return result.error.formErrors.fieldErrors
//    }
 
//  const data = result.data
//  const food = await db.food.findUnique({where:{id}});
//  if(food === null) return notFound()


//   let imagePath = data.image?.name
//   if(data.image != null && data?.image.size > 0 ){
//     await fs.unlink(`public${imagePath}`)
//     imagePath = `/food/${crypto.randomUUID()}-${data.image.name}`
//     await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))
//   }
 
//  // console.log("data",data);
 
 
//  const response = await db.food.update({where:{id},data:{
//    name:data.name,
//    description:data.description,
//    category:data.category,
//    image:imagePath,
//    price: data.price
//  }})
//  // console.log("response",response);
//  redirect("/admin")
//  }






















"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from 'fs/promises';
import { notFound, redirect } from "next/navigation";
import { connectDB } from "@/utils/constants";
import { Food } from "@/models/foodModel";

// Zod validation schema for image
const imageSchema = z.instanceof(File, { message: 'Required' })
    .refine(file => file.size === 0 || file.type.startsWith("image/"), "Invalid file type")
    .refine(file => file.size > 0, "Image file is required");

// Schema for adding a new food item
const addSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().int().min(1, "Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    image: imageSchema
});

// Server action for adding food
const addFood = async (prevState: unknown, formData: FormData) => {
    // Validate form data using Zod schema
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    // Ensure the public/food directory exists
    await fs.mkdir('public/food', { recursive: true });

    // Save image to disk
    const imagePath = `/food/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

    // Save the food item to the database
    const promises = [connectDB(),Food.create(
        {
            name: data.name,
            description: data.description,
            category: data.category,
            image: imagePath,
            price: data.price
        }
    )]
    const [connection, newFood] = await Promise.all(promises);
    console.log("Updated Food information: ", newFood);

    // Redirect to the admin page upon success
    redirect("/admin");
};
export default addFood


// Server action to toggle food availability
export const toggleFoodAvailability = async (id: string, isAvailable: boolean) => {
    await connectDB();
    await Food.findByIdAndUpdate(
         { _id:id },
        { isAvailable }
    );
};

// Server action to delete a food item
export const deleteFood = async (id: string) => {
    await connectDB()
    const food = await Food.findByIdAndDelete( { _id:id } );
    if (!food) return notFound();

    // Unlink the image file associated with the food item
    await fs.unlink(`public${food.image}`).catch(err => {
        console.error(`Error deleting image: ${err.message}`);
    });
};



// Schema for updating food (image is optional)
const editSchema = addSchema.extend({
    image: imageSchema.optional()
});

// Server action to update food
// export const updateFood = async (id: string, prevState: unknown, formData: FormData) => {
//     // Validate form data
//     console.log("clicked")
//     const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
//     if (!result.success) {
//         return result.error.formErrors.fieldErrors;
//     }

//     const data = result.data;
//     const food = await db.food.findUnique({ where: { id } });

//     if (!food) return notFound();

//     // Handle image update
//     let imagePath = food.image;  // Default to existing image
//     if (data.image && data.image.size > 0) {
//         // Delete the old image if a new one is uploaded
//         await fs.unlink(`public${food.image}`).catch(err => {
//             console.error(`Error deleting old image: ${err.message}`);
//         });

//         // Save the new image to disk
//         imagePath = `/food/${crypto.randomUUID()}-${data.image.name}`;
//         await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
//     }

//     // Update food in the database
//     await db.food.update({
//         where: { id },
//         data: {
//             name: data.name,
//             description: data.description,
//             category: data.category,
//             image: imagePath,
//             price: data.price
//         }
//     });

//     // Redirect to the admin page upon success
//     redirect("/admin");
// };
