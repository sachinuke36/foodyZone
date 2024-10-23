import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
