
export const About = ({ heading, title, subtitle }: any) => {
    return (
        <div className="overflow-x-scroll font-dmSans">
            <h1 className="font-medium text-xl mb-4 flex flex-row justify-center items-center w-fit">

                <div className="bg-primary w-1 h-6  mr-3"></div>
                {heading}</h1>
            <h2 className="font-medium text-3xl sm:text-5xl mb-2">{title}</h2>
            <h3 className="font-normal text-lg sm:text-2xl text-gray-600 mb-7">{subtitle}</h3>
        </div>
    )
}
