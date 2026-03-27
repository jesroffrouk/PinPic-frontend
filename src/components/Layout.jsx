import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import NavigationBar from "./ui/NavigationBar";
import { useState } from "react";

export default function Layout(){
return (
    <>
    {/* <Header /> */}
    <Outlet />
    {/* nav bar */}
    <NavigationBar />
    {/* <Footer /> */}
    </>
)
   
}