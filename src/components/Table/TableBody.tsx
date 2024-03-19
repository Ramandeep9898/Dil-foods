import { useFilterContext } from "../../hooks/context/useFilterContext"
import { TABLE_CONFIG } from "../../config/tableHead.config"

type DataType = {
    episodeNumberOverall: number,
    season: number,
    episodeNumberInSeason: number,
    title: string,
    directedBy: string,
    writtenBy: string,
    originalAirDate: string,
    englishAirDate: string,
    rating: number,
    votes: number,
    description: string,
    type: string
}

export const TableBody = () => {
    const { filteredData } = useFilterContext()
    console.log(filteredData)

    return (<div className="">
        {filteredData.map((data: DataType) => (
            <div className="flex flex-row">
                {TABLE_CONFIG.map(({ key }) => (
                    //@ts-ignore
                    <div className="border-r border-b border-[border-grey] font-dmSans px-3 py-2 min-w-[250px] text-sm text-start h-max-[100px]" >{data[key]}</div>
                ))}
            </div>
        ))}
    </div>
    )
}