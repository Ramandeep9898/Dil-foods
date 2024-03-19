//@ts-nocheck
import { useState } from "react"


export const Dropdown = ({ dropdownOptions, updateState, label }: {
    dropdownOptions: any,
    updateState: any,
    label: string
}) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [dropDownValue, setDropdownValue] = useState<any>(dropdownOptions[0][0].toUpperCase() + dropdownOptions[0].substring(1))


    const dropDownClickHandler = (ele: { ele: string }) => {
        setDropdownValue(ele[0].toUpperCase() + ele.substring(1))
        updateState(label, ele)
        setIsDropDownOpen(false)
    }


    return (
        <div className="relative w-full mb-3">
            <p className="font-medium mb-1">{label}</p>
            <button onClick={() => setIsDropDownOpen(!isDropDownOpen)} id="dropdown-button" className="outline-none inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                <span className="mr-2 text-base">{dropDownValue}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isDropDownOpen && <div id="dropdown-menu" className="w-full z-10 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                {dropdownOptions.map((ele) => (
                    <div onClick={() => dropDownClickHandler(ele)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{ele[0].toUpperCase() + ele.substring(1)}</div>
                ))}
            </div>}
        </div>
    )
}