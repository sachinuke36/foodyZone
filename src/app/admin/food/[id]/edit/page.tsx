import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AddItemForm from "../../../_components/AddItemForm"
import db from "@/db/db"
import { Food } from "@/models/foodModel"

const EditFoodItemPage = async({params:{id}}:{params:{id:string}}) => {
    // the props will be automatically inserted
    // console.log(id);

    const food = await Food.findById({_id:id})

    // console.log(food);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit a food Item</CardTitle>
            </CardHeader>
            <CardContent>
                <AddItemForm food={food}/>
            </CardContent>
        </Card>

    )
}

export default EditFoodItemPage