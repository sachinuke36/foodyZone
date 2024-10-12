"use client"
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

 const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathname = usePathname();
    return (
        <Link {...props} className={cn("py-4 pb-2 " +
            "focus-visible:underline focus-visible:text-secondary", pathname === props.href && "text-red-500 underline underline-offset-8")} />
    )
}
export default NavLink