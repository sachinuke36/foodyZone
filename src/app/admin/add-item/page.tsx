import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AddItemForm from "../_components/AddItemForm"

const AddFoodItemPage = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add a food Item</CardTitle>
            </CardHeader>
            <CardContent>
                <AddItemForm />
            </CardContent>
        </Card>

    )
}

export default AddFoodItemPage