
// import { auth } from "@clerk/nextjs/server"
import ExploreComponent from "./components/ExploreComponent"
import HomeComponent from "./components/HomeComponent"

const HomePage = () =>{
    // const { sessionClaims } = auth()
    // console.log("session",sessionClaims)

    return (
        <>
        <HomeComponent/>
        <ExploreComponent />
        </>
    )
}

export default HomePage