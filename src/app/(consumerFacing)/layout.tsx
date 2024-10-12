import Nav,{NavLink} from "@/components/Nav";
import React from "react";
import { auth } from "@/auth";
// import NavLink from "@/components/NavLink";
// import { useRouter } from 'next/router';
const Layout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{

    const session = await auth();
    // console.log(session);


    return(
        <>
        <Nav user={session?.user!} >
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/cart'}>Cart</NavLink>
            <NavLink href={'/orders'}>My orders</NavLink>
        </Nav>

       

       <div>{children}</div>
        </>
    )
}

export default Layout