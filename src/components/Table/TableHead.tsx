import { TABLE_CONFIG } from "../../config/tableHead.config"
import { ColumnFilter } from "../Filter/ColumnFilter"

export const TableHead = () => {
    return (
        <div className="flex flex-row w-full sticky top-0 ">
            {TABLE_CONFIG.map(({ title, filterElement, key, chips }) => (
                <ColumnFilter key={key} columnTitle={title} filterElement={filterElement} id={key} chips={chips} />
            ))}
        </div>
    )
}