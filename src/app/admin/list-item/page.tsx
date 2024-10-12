import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency } from "@/lib/formatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import ActiveToggleDropdownItem, { DeleteDropdownItem } from "../_components/FoodActions";
import { connectDB } from "@/utils/constants";
import { Food } from "@/models/foodModel";

const ListItems = async () => {
    await connectDB();
    const food = await Food.find((
          {
            // id: true,
            // name: true,
            // price: true,
            // isAvailable: true,
            // category:true,
            // image:true,
            // _count: { $sum: { orders: 1 } }
        }
    ));
    console.log("food",food)

    if(food.length === 0) return <p>No products found</p>




    return (
        <div className="mt-5">
            <h1 className="text-center font-bold text-[23px] mb-2">Food Item List</h1>
            <hr />
            <Table className="px-2 max-w-[90%] mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0">
                            <span className="sr-only">Available</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead >Price</TableHead>
                        <TableHead className="w-0">
                            <span className="sr-only">Action</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        food.map((item)=>(
                            <TableRow key={item.id}>
                                <TableCell>{item.isAvailable ?
                                    (
                                    <>
                                    <span className="sr-only">Available</span>
                                    <CheckCircle2/>
                                    </>
                                )
                                    :(
                                    <>
                                    <span className="sr-only">Unavailable</span>
                                    <XCircle className="stroke-destructive"/>
                                    </>
                                    )}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{formatCurrency(item.price/100)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <span className="sr-only">Action</span>
                                            <MoreVertical/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem >
                                                    <Link href={`/admin/food/${item.id}/edit`}>Edit</Link>
                                            </DropdownMenuItem>
                                            <ActiveToggleDropdownItem id={item.id} isAvailable={item.isAvailable} />
                                            <DeleteDropdownItem id={item.id} disabled={item?.orders.length > 0}/>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>

    )
}
export default ListItems