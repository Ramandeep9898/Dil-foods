import { FaHeart } from "react-icons/fa";



export const Header = () => {
    return (
        <nav className="border-[grey-border] border-b fixed w-full bg-white z-10 top-0 flex">
            <div className=" text-red-500 flex items-center justify-center px-6 py-4">
                <FaHeart size={"24px"} />
            </div>
            <div className="w-full"></div>


        </nav>
    )
}