import { About } from "../About/About"
import { DASHBOARD_CONFIG } from "../../config/dashboardAbout.config"
import { TableHead } from "./TableHead"
import { TableBody } from "./TableBody"

export const Table = () => {
    return (
        <div className="flex flex-col ml-16 mt-24 overflow-x-scroll mr-5 md:mt-36 md:mx-36 ">
            <About {...DASHBOARD_CONFIG} />
            <div className="border border-[border-grey] w-full h-[500px] overflow-scroll">
                <TableHead />
                <TableBody />
            </div>
        </div>

    )
}










