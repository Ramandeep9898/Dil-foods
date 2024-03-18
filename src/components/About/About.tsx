
export const About = ({ heading, title, subtitle, csvName, fileSize }: any) => {
    return (
        <div className="overflow-x-scroll">
            <div className="font-dmSans ml-24 mt-20 mr-4 md:mt-36 sm:m-36">
                <h1 className="font-medium text-2xl mb-4 flex flex-row justify-center items-center w-fit">

                    <div className="bg-primary w-1 h-6  mr-3"></div>
                    {heading}</h1>
                <h2 className="font-medium text-3xl sm:text-5xl mb-2">{title}</h2>
                <h3 className="font-normal text-lg sm:text-2xl text-gray-600 mb-12">{subtitle}</h3>
            </div>
        </div>
    )
}
