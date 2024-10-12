"use server"

import fs from 'fs/promises'
import db from '@/db/db'
import { z } from 'zod'
import { notFound, redirect } from 'next/navigation'
import { connectDB } from '@/utils/constants'
import { Food } from '@/models/foodModel'

const imageSchema = z.instanceof(File,{message:'Required'}).refine(file=> file.size === 0 || file.type.startsWith("image/"))

    const addSchema = z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        price: z.coerce.number().int().min(1, "Price must be a positive number"),
        category: z.string().min(1, "Category is required"),
        image: imageSchema.refine(file => file.size > 0,"Required")
    });

const editSchema = addSchema.extend({
    image: imageSchema.optional()
});
 const updateFood = async (id: any, prevState: unknown, formData: FormData) => {
    // Validate form data
    // console.log("clicked");
    // console.log(formData)
    // console.log("id from updatefood",id);
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
    // console.log(result);
    if (result.success == false) {
        console.log("here")
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    await connectDB();
    const food = await Food.findById( { _id: id } );

    if (!food) return notFound();

    // Handle image update
    let imagePath = food.image;  // Default to existing image
    if (data.image && data.image.size > 0) {
        // Delete the old image if a new one is uploaded
        await fs.unlink(`public${food.image}`).catch(err => {
            console.error(`Error deleting old image: ${err.message}`);
        });

        // Save the new image to disk
        imagePath = `/food/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
    }

    // Update food in the database
  const promises =  [connectDB(),Food.findByIdAndUpdate(
    { _id:id },
     {
        name: data.name,
        description: data.description,
        category: data.category,
        image: imagePath,
        price: data.price
    }, 
    {new:true}
) ]  
const [connection, updatedFood] = await Promise.all(promises);
console.log("Updated Food information: ", updatedFood);

    // Redirect to the admin page upon success
    redirect("/admin");
};

export default updateFood