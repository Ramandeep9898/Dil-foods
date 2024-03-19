import { Link } from "react-router-dom"


export const Home = () => {
    return (
        <div className="w-full">
            <div className="w-full  h-screen flex flex-col items-center mt-36">
                <h1 className="text-center font-dmSans text-2xl md:text-[48px] font-semibold mb-4">Super Market Dataset
                </h1>
                <h2 className="font-normal text-lg sm:text-2xl hidden sm:block text-center text-gray-600 mb-6">Unveiling Patterns: Exploring the Depths of Super Market Dataset</h2>

                <div className="w-full justify-center items-center gap-2 flex mt-4">
                    <Link to="/dashboard">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-dmSans md:text-lg font-medium">Dashboard</button>
                    </Link>
                    <Link to="/charts">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg font-dmSans md:text-lg font-medium">Create Charts</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}
