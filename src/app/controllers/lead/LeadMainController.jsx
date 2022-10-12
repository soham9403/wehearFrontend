import { Outlet } from "react-router-dom"
import { getLeadDataApi } from "../../apis/lead.api"
import LeadsCountController from "./LeadsCountController"

const LeadMainController = () => {




    return (
        <>
            <LeadsCountController />
            <Outlet />
        </>
    )
}
export default LeadMainController