import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearGlobalError } from "../../lib/features/errorSlice";

export default function Error({error}) {
    const dispatch = useDispatch()
    // one issue: is that I am not planning to just show this error for 5 sec. I want to find a way to show as long as i can. I need to find a way
    useEffect(()=> {
        let timerId = setTimeout(() => {
           dispatch(clearGlobalError()) 
        }, 5000);

        return () => clearTimeout(timerId)
    })
    console.log(error)
    
    return (
        <>
        <div className="bg-red-50 border-s-4 border-red-500 p-4 dark:bg-red-800/30" role="alert" tabIndex="-1" aria-labelledby="hs-bordered-red-style-label">
            <div className="flex">
            <div className="shrink-0">
                {/* Icon */}
                <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                </span>
                {/* End Icon */}
            </div>
            <div className="ms-3">
                <h3 id="hs-bordered-red-style-label" className="text-gray-800 font-semibold dark:text-white">
                Error!
                </h3>
                <p className="text-sm text-gray-700 dark:text-neutral-400">
                {error}
                </p>
            </div>
            </div>
        </div>
        </>
    );
}