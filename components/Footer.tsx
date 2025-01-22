import Image from "next/image"
import SocialIcons from "./SocialIcons"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t-2 border-black bg-black text-white py-10 flex flex-col lg:flex-row items-center justify-center relative w-full">
            <div className="flex flex-col items-center justify-center mb-6 lg:mb-0">
                <Image src="/fullLogo.png" alt="Logo" width={225} height={75} className="mx-auto"/>
                <SocialIcons />
            </div>
            <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center w-full lg:w-auto">
                <ul className="flex flex-col items-center lg:items-start border-b-2 lg:border-b-0 lg:border-r-2 px-4 lg:px-10 mx-auto mb-6 lg:mb-0">
                    <p className="font-bold text-2xl mb-2 mercadillo uppercase">Categories</p>
                    <li className="ml-2">
                        <Link href="/ounces" className="text-xl font-thin oswald">
                            Ounces
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link href="/eighths" className="text-xl font-thin oswald">
                            Eighths
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link href="/vapes" className="text-xl font-thin oswald">
                            Pens
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link href="/edibles" className="text-xl font-thin oswald">
                            Edibles
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link href="/pre-rolls" className="text-xl font-thin oswald">
                            Pre-Rolls
                        </Link>
                    </li>
                </ul>
                <ul className="flex flex-col items-center lg:items-start border-b-2 lg:border-b-0 lg:border-r-2 px-4 lg:px-10 mx-auto mb-6 lg:mb-0">
                    <p className="font-bold text-2xl mb-2 mercadillo uppercase">Information</p>
                    <li className="ml-2">
                        <Link href="/blog" className="text-xl font-thin oswald">
                            Blog
                        </Link>
                    </li>
                    <li className="ml-2">
                        <Link href="/terms" className="text-xl font-thin oswald">
                            Terms
                        </Link>
                    </li>
                    <p className="text-xl ml-2 text-bold my-5">
                        +1 (347) 935-4383
                    </p>
                </ul>
                <div className="flex flex-col items-center lg:items-start px-4 lg:px-10 mx-auto">
                    <p className="font-bold text-2xl mb-2 mercadillo uppercase">Hours</p>
                    <p className="text-xl font-thin ml-2 text-center lg:text-left oswald">
                        Monday - Sunday<br /> 12PM - 10PM
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer