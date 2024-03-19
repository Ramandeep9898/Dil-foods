interface ColumnFilterProps {
    columnTitle: string;
    filterElement: string;
    id: string
    chips: Array<string> | undefined
}
import { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";
import { useFilterContext } from "../../hooks/context/useFilterContext";
import { Filter } from "./Filter";


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