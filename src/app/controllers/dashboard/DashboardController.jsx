import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "../../pages/header/Header"
import NotAllowed from "../../pages/others/NotAllowed"
import AnalyticCountController from "./AnalyticCountController"

const DashboardController = () => {
    const { user } = useSelector(state => state)
    if (!user.data.verfied) {
        return <NotAllowed />
    }
    return (
        <>
            <AnalyticCountController>
                <Outlet />
            </AnalyticCountController>

        </>
    )
}
export default DashboardController