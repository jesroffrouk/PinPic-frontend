import { Outlet } from "react-router";
import GlobalErrorHandler from "./GlobalErrorHandler";

export default function ErrorWrapper(){
return (
    <>
    <GlobalErrorHandler/>
    <Outlet />
    </>
)
   
}