import { useSelector } from "react-redux";
import Error from "./Error";

function GlobalErrorHandler() {
    const error = useSelector((state)=>state.error.error)
    console.log(error)
  return (error && <Error error={error} />)
}

export default GlobalErrorHandler