import { auth } from "@/auth";
import Nav, {NavLink} from "@/components/Nav";

const AdminLayout = async({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{
    const session = await auth()
    return(
        <>
        <Nav user={session?.user!}>
            <NavLink href={'/admin'}>Dashboard</NavLink>
            <NavLink href={'/admin/add-item'}>Add Item</NavLink>
            <NavLink href={'/admin/list-item'}>List Items</NavLink>
            <NavLink href={'/admin/orders'}>Orders</NavLink>
        </Nav>
       <div>{children}</div>
        </>
    )
}

export default AdminLayout