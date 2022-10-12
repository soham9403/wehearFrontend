import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { accessControllByRole } from "../../../config/helper"





const HomePage = () => {
    const { user } = useSelector(state => state)
    return <>
        <div className='we_container analytics_area'>
            
            <Grid container spacing={2} justifyContent={"center"} className="m-v-primary grid-loader-conatiner">
                {accessControllByRole(user.data.role, "DASHBOARD", true) &&
                    <Grid xs={6} md={3} container item>
                        <Link className={`analytic-btn  df center column radius-1 bg-light row pointer`} to="/dashboard">
                            <h1 className='h2 text-gradient-primary' >Stock</h1>

                        </Link>
                    </Grid>}
                {accessControllByRole(user.data.role, "LEADDASHBOARD", true) && <Grid xs={6} md={3} container item>
                    <Link className={`analytic-btn  df center column radius-1 bg-light row pointer`} to="/lead">
                        <h1 className='h2 text-gradient-primary' >Leads</h1>

                    </Link>
                </Grid>}
                {accessControllByRole(user.data.role, "DASHBOARD", true) && <Grid xs={6} md={3} container item>
                    <button className={`analytic-btn  df center column radius-1 bg-light row `} to="/">
                        <h1 className='h2 text-gradient-primary' >Finance</h1>

                    </button>
                </Grid>}
            </Grid>
        </div>
    </>
}
export default HomePage