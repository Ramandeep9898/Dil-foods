import { About } from "../About/About"
import { DASHBOARD_CONFIG } from "../../config/dashboardAbout.config"
import { useFilterContext } from "../../hooks/context/useFilterContext"

export const Table = () => {
    return (
        <div className="flex flex-col ml-16 overflow-x-scroll mr-5">

            <About {...DASHBOARD_CONFIG} />

            <div className="border border-[border-grey] w-full h-[500px] overflow-scroll">
                <TableHead />
                <TableBody />
            </div>
        </div>

    )
}
export const TABLE_CONFIG = [
    { title: "Branch", filterElement: "chips", key: "branch", chips: ['A', 'B', 'C'] },
    { title: "City", filterElement: "search", key: "city" },
    { title: "CustomerId", filterElement: "search", key: "customerId" },
    { title: "Customer Type", filterElement: "chips", key: "customerType", chips: ['Member', 'Normal'] },
    { title: "date", filterElement: "search", key: "date" },
    { title: "Gender", filterElement: "chips", key: "gender", chips: ['Male', 'Female'] },
    { title: "Gross Margin Percentage", filterElement: "search", key: "grossMarginPercentage" },
    { title: "Rating", filterElement: "chips", key: "rating", chips: ['4', '5', '6', '7', '8', '9', '10'] },
    { title: "Revenue", filterElement: "search", key: "revenue" },
    { title: "Sales", filterElement: "search", key: "sales" },
    { title: "Tax", filterElement: "search", key: "tax" },
    { title: "Time", filterElement: "search", key: "time" },
    { title: "Unit Price", filterElement: "search", key: "unitPrice" },
]



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



export const TableHead = () => {
    return (
        <div className="flex flex-row w-full sticky top-0 ">
            {TABLE_CONFIG.map(({ title, filterElement, key, chips }) => (
                <ColumnFilter key={key} columnTitle={title} filterElement={filterElement} id={key} chips={chips} />
            ))}
        </div>
    )
}

interface ColumnFilterProps {
    columnTitle: string;
    filterElement: string;
    id: string
    chips: Array<string> | undefined
}
import { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";


export const ColumnFilter = ({ columnTitle, filterElement, id, chips }: ColumnFilterProps) => {
    const [showFilter, setShowFilter] = useState(false);
    const [checkAscendingDescending, setCheckAscendingDescending] = useState("ascending")

    const toggleFilter = () => {
        setShowFilter(prevState => !prevState);
    };
    const { handleFilter } = useFilterContext()

    const handleAscendingDescending = () => {
        setCheckAscendingDescending(checkAscendingDescending === "ascending" ? "descending" : "ascending")

        handleFilter(id, checkAscendingDescending, "sort")
    }


    return (
        <div className="border-r bg-white border-b sans-serif border-[border-grey] flex w-full flex-col items-start px-3 py-2 min-w-[250px] ">
            <div className="font-medium text-sm w-full text-start whitespace-nowrap flex justify-between items-center ">
                <span>{columnTitle}</span>
                <div className="flex gap-2">
                    <button onClick={toggleFilter}><BsFilterRight /> </button>
                    <button className="rotate-180" onClick={handleAscendingDescending} ><FaArrowUpLong /> </button>
                </div>
            </div>
            {showFilter && <Filter filterElement={filterElement} id={id} chips={chips} />}
        </div>
    );
};


export const Filter = ({ filterElement, id, chips }: any) => {

    const returnElement = {
        "search": <SearchBar id={id} />,
        "chips": <Chips id={id} chips={chips} />
    }
    return returnElement[filterElement as keyof typeof Filter]
};



export const SearchBar = ({ id }: any) => {
    const { handleFilter } = useFilterContext()

    return (
        <input type="text" className="border border-[border-grey] px-3 py-1 rounded-md text-sm mt-4" placeholder="search" onChange={(e) => handleFilter(id, e.target.value, "filter")} />
    )
};

import { ReactElement } from "react";
import { JSXElementConstructor } from "react";
import { ReactNode } from "react";

export const Chips = ({ id, chips }: any) => {
    const { handleFilter } = useFilterContext()
    return (
        <div className="mt-4 flex gap-2 flex-wrap">
            {
                chips.map((element: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => (
                    //@ts-ignore
                    <button className="px-3 py-1 border border-[border-grey] rounded-lg text-sm" value={element} onClick={(e) => handleFilter(id, e.target.value, "filter")}>{element} </button>
                ))
            }
        </div >)
};