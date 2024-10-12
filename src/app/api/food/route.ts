import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';
import { auth } from '@/auth';
import { Food } from '@/models/foodModel';
import { connectDB } from '@/utils/constants';
// import { currentUser } from '@clerk/nextjs/server';


export async function GET(req: NextRequest) {
  await connectDB();
  // console.log(req)
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  // console.log(category)
  const session = await auth()
  // console.log("user",session?.user)


  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  }

  try {
    const food = await Food.find(
      {
        category,
        isAvailable:true,
      },
    );
    return NextResponse.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    return NextResponse.json({ error: 'Failed to fetch food' }, { status: 500 });
  }
}














// import { NextApiRequest, NextApiResponse } from "next";

// export const getFoodAccordingToCategory = async(req:NextApiRequest,res:NextApiResponse)=>{
//     const {category} = req.query
//     console.log(category)
//     // console.log(req.query);
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import db from '@/db/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { category } = req.query;

//   try {
//     const food = await db.food.findMany({
//       where: {
//         category: category as string,
//       },
//     });
//     res.status(200).json(food);
//   } catch (error) {
//     console.error('Error fetching food:', error);
//     res.status(500).json({ error: 'Failed to fetch food' });
//   }
// }
