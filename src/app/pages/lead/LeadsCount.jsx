import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { _lang } from "../../../config/helper"

const LeadsCount = (props) => {
    const params = useParams()
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    const changePage = (type = "type", val) => {
        if (type == 'type') {
            navigate("/lead/" + user.data.usercode + "/" + val + "/" + params.status)
        }
        if (type == 'status') {
            navigate("/lead/" + user.data.usercode + "/" + params.type + "/" + val)
        }
    }
    const checkPage = (type = "type", val) => {
        if (type == 'type') {
            return val == params.type
        }
        if (type == 'status') {
            return val == params.status
        }
    }
    return <>
        <div className='we_container analytics_area'>
            <Grid container spacing={2} justifyContent={"center"} className="m-v-primary grid-loader-conatiner">

                {
                    //loader
                    props.typesLoading && <>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>

                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                    </>
                }



                {!props.typesLoading && props.types && Array.isArray(props.types) &&
                    props.types.map((item, key) => {
                        return <Grid xs={6} md={3} container item>
                            <button className={`analytic-btn  df center column radius-1 bg-light row ${checkPage('type', item.type) ? 'analytic-btn-active' : 'pointer'}`} onClick={() => { changePage('type', item.type) }}>
                                <h1 className='h2 text-gradient-primary' style={{ marginBottom: "0.391vw" }}>{item.count ? item.count : "0"}</h1>
                                <h1 className='h4'>{_lang('lead_type_' + item.type)}</h1>
                            </button>
                        </Grid>
                    })

                }


            </Grid>


            <Grid container sx={{mt:1}} spacing={2} justifyContent={"center"} className="m-v-primary grid-loader-conatiner">

                {
                    //loader
                    props.statusLoading && <>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>

                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                        <Grid xs={6} md={3} container item>
                            <div className='grid-loader analytic-btn-active df center column radius-1 bg-light row'>

                            </div>

                        </Grid>
                    </>
                }



                {!props.statusLoading && props.status && Array.isArray(props.status) &&
                    props.status.map((item, key) => {
                        return <Grid xs={6} md={3} container item>
                            <button className={`analytic-btn  df center column radius-1 bg-light row ${checkPage('status', item.status) ? 'analytic-btn-active' : 'pointer'}`} onClick={() => { changePage('status', item.status) }}>
                                <h1 className='h2 text-gradient-primary' style={{ marginBottom: "0.391vw" }}>{item.count ? item.count : "0"}</h1>
                                <h1 className='h4'>{_lang('lead_status_' + item.status)}</h1>
                            </button>
                        </Grid>
                    })

                }


            </Grid>
        </div>

    </>
}
export default LeadsCount