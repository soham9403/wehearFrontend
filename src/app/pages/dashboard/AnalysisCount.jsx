import { Button, FormControl, SeMenuItem, lect, Typography, Select, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link, useLocation, useParams } from 'react-router-dom'
import { _lang } from '../../../config/helper'

const AnalysisCount = (props) => {
    const userInventoryData = props.userInventoryData
    const params = useParams()
    const location = useLocation()

    return (
        <Grid container spacing={2} justifyContent={"center"} className="m-v-primary">
            {userInventoryData &&
                <Grid xs={6} md={3} container item>

                    <Button variant='outlined' className='df fit-content  column row-center p-primary border-primary radius-primary'>
                        <Link to={"/users/" + params.usercode} className='fit-content column center df'>
                            <Typography variant='h3' color="black">{userInventoryData.total_user ? userInventoryData.total_user : "0"}</Typography>
                            <Typography variant='h4' color="black" >{_lang('users')}</Typography>
                        </Link>
                    </Button>

                </Grid>}
            {userInventoryData && userInventoryData.inventory &&
                <Grid xs={6} md={3} container item>
                    <Button variant={location.pathname == "/dashboard/" + params.usercode ? "contained" : 'outlined'} className='df fit-content  column row-center p-primary border-primary radius-primary'>
                        <Link to={"/dashboard/" + params.usercode} className='fit-content column center df'>
                            <Typography variant='h3' color={location.pathname == "/dashboard/" + params.usercode ? "white" : "dark"}>{userInventoryData.inventory.sold_count ? userInventoryData.inventory.sold_count : 0}</Typography>
                            <Typography variant='h4' color={location.pathname == "/dashboard/" + params.usercode ? "white" : "dark"} >{_lang('sold')}</Typography>
                            <FormControl variant="standard" sx={{background:location.pathname == "/dashboard/" + params.usercode ? "white" : "white",p:0}} >

                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={props.analysticFilters.value}
                                    color={"secondary"}
                                    sx={{px:1}}
                                    onChange={(e) => { props.handleAnlyticFilter('value', e.target.value) }}

                                >
                                    {
                                        props.allowedDatesFilter.map((filter_data, index) => {
                                            return (<MenuItem key={index} value={filter_data.value}>{filter_data.label}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Link>
                    </Button>
                </Grid>}
            {userInventoryData && userInventoryData.inventory &&
                <Grid xs={6} md={3} container item>
                    <Button variant={location.pathname == "/dashboard/" + params.usercode + "/all" ? "contained" : 'outlined'} className='df fit-content  column row-center p-primary border-primary radius-primary'>
                        <Link to={"/dashboard/" + params.usercode + "/all"} className='fit-content column center df'>
                            <Typography variant='h3' color={location.pathname == "/dashboard/" + params.usercode + "/all" ? "white" : "dark"}>{userInventoryData.inventory.personal_stock_count ? userInventoryData.inventory.personal_stock_count : 0}</Typography>
                            <Typography variant='h4' color={location.pathname == "/dashboard/" + params.usercode + "/all" ? "white" : "dark"} >{_lang('stock')}</Typography>
                        </Link>
                    </Button>
                </Grid>}


            {userInventoryData && userInventoryData.inventory &&
                <Grid xs={6} md={3} container item>
                    <div className='df fit-content  column row-center p-primary border-primary radius-primary'>
                        <Typography variant='h3' color="dark">{userInventoryData.inventory.channel_stock_count ? userInventoryData.inventory.channel_stock_count : 0}</Typography>
                        <Typography variant='h4' color="dark" >{_lang('channel_stock')}</Typography>
                    </div>
                </Grid>}
        </Grid>
    )
}
export default AnalysisCount