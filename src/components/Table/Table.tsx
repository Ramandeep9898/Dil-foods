import { About } from "../About/About"
import { DASHBOARD_CONFIG } from "../../config/dashboardAbout.config"

export const Table = () => {
    return (
        <>
            <About {...DASHBOARD_CONFIG} />
        </>
    )
}
