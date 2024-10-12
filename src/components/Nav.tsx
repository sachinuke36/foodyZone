"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import Image from "next/image";
import handleSignIn from "./SignIn";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// import handleSignIn from "./SignIn";
// import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

const Nav = ({ children, user }: { children: ReactNode, user:User }) => {
    // console.log("user",user);
    const router = useRouter()
  const  handleSignInClick =()=>{
    signIn("google")

  }

    return <nav className=' text-black w-[80%] mx-auto flex justify-between items-center py-4 px-3'>
        <div className="text-[#ff6347] font-bold text-lg cursor-pointer" onClick={()=>router.push('/')}>FoodyZone</div>
        <div>
        {children}
        </div>
        <div >
            {!user ?  <Button variant='outline' onClick={handleSignInClick} >Sign In </Button>:(<div className="flex gap-2">
                <Image src={user.image!} width={40} height={40} className="rounded-full" alt={user.name!}/>
                <Button variant='outline' onClick={()=>signOut()} >sign out</Button>
            </div>)
            }
        </div>
    </nav>
}

export default Nav;

export const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathname = usePathname();
    return (
        <Link {...props} className={cn("p-4 pb-2 " +
            "focus-visible:underline focus-visible:text-secondary", pathname === props.href && "text-red-500 underline underline-offset-8")} />
    )
}