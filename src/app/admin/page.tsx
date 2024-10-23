import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import getSalesData from "./_backend/getSalesData";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import getUserData from "./_backend/getUserData";
import getProductData from "./_backend/getFoodData";

const AdminDashboard = async () => {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ]);

    return (
        <div className="flex flex-col min-w-full gap-5">
            <DashboardCard
                title={"Sales"}
                description={`${formatNumber(salesData.numberOfSales)} orders`}
                content={` Rs.${formatNumber(salesData.amount)}`}
            />
            <DashboardCard
                title={"Customers"}
                description={`Rs.${formatNumber(userData.averageValuePerUser)} Average Value`}
                content={` ${formatNumber(userData.userCount)}`}
            />
            <DashboardCard
                title={"Active Products"}
                description={`${formatNumber(productData.inActiveCount)} Inactive`}
                content={`${formatNumber(productData.activeCount)}`}
            />
        </div>
    );
};

export default AdminDashboard;

type DashboardCardProps = {
    title: string;
    description: string;
    content: string;
};

export const DashboardCard = ({ title, description, content }: DashboardCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>
    );
};
