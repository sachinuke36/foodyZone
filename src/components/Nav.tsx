"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import Image from "next/image";
import handleSignIn from "./SignIn";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from 'lucide-react';

// import handleSignIn from "./SignIn";
// import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

const Nav = ({ children, user }: { children: ReactNode, user:User }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    // console.log("user",user);
    const router = useRouter()
  const  handleSignInClick =()=>{
    signIn("google")

  }

    return (<nav className=' text-black sm:w-[100%] md:w-[80%] mx-auto flex justify-between items-center py-4  px-1 md:px-3'>
        <div className="text-[#ff6347] font-bold sm:text-sm md:text-lg cursor-pointer" onClick={()=>router.push('/')}>FoodyZone</div>
        <div className="sm:flex hidden">
        {children}
        </div>
        <div className="flex sm:flex hidden items-center justify-around" >
            {!user ?  <Button variant='outline' onClick={handleSignInClick} >Sign In </Button>:(<div className="flex items-center justify-aroun gap-2">
                <Image src={user.image!} width={40} height={40} className="  rounded-full" alt={user.name!}/>
                <LogOut className=" hover:cursor-pointer  mx-auto" onClick={()=>signOut()} />
            </div>)
            }
        </div>
       


        {toggleMenu ?     <X className=" sm:hidden flex" onClick={()=>setToggleMenu(prev=>!prev)} />  : <Menu className="sm:hidden flex" onClick={()=>setToggleMenu(prev=>!prev)}/>}
        <div className={ `sm:hidden flex absolute right-0 py-4 top-[36px] flex-col bg-white z-10 ${!toggleMenu && 'hidden'}`}>
            <div className=" sm:hidden flex flex-col">
                {children}
            </div>
            
            <div className={`sm:hidden flex flex-col  h-[130px] `} >
            {!user ?  <Button variant='outline' onClick={handleSignInClick} >Sign In </Button>:(<div className={`${!toggleMenu && 'hidden'} flex-col h-full items-center justify-center  gap-6  `}>
                <Image src={user.image!} width={40} height={40} className="rounded-full sm:hidden flex  mt-10 mb-3 mx-auto" alt={user.name!}/>
                <LogOut className="  hover:cursor-pointer sm:hidden flex mx-auto" onClick={()=>signOut()} />
            </div>)
            }
        </div>
        </div>
    </nav>)
}

export default Nav;

export const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathname = usePathname();
    
    return (
        <Link  {...props} className={cn("p-2 md:p-4 pb-2 text-sm " +
            "focus-visible:underline focus-visible:text-secondary", pathname === props.href && "text-red-500 underline underline-offset-8")} />
    )
}