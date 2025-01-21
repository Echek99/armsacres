import React from "react"
import { Diamond, Headphones, Truck } from "lucide-react";

const Qualities = () => {
    return (
        <ul className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-b-2 border-black p-5 sm:p-10 w-full sm:w-2/3 my-10 oswald">
            <li className="text-center text-xl sm:text-2xl flex flex-col items-center mb-5 sm:mb-0">
                <Diamond size={48} color="rgba(0,0,0,1)" />
                <span>High Quality Products</span>
            </li>
            <li className="text-center text-xl sm:text-2xl flex flex-col items-center mb-5 sm:mb-0">
                <Truck size={48} />
                <span>Easy, Reliable<br /> and Trustworthy</span>
            </li>
            <li className="text-center text-xl sm:text-2xl flex flex-col items-center">
                <Headphones size={48} />
                <span>Free Delivery, <br /> No Minimum Required</span>
            </li>
        </ul>
    )
}

export default Qualities