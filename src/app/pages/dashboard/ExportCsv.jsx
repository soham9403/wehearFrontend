import { FormControl } from "@mui/material"
import { InputLabel } from "@mui/material"
import { MenuItem } from "@mui/material"
import { Select } from "@mui/material"
import { Button, TextField, Typography } from "@mui/material"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"
const ExportCsv = (props) => {

    return (
        <>
            <div className={'column  row m-v-primary'} style={{ maxWidth: "500px", width: '90%' }}>

                <div className="df column p-primary radius-primary  row" style={{ overflowY: "scroll", maxHeight: "100%", background: "white" }}>
                    <Typography variant="h3">{_lang('export')}</Typography>
                    <Typography variant="h3" color={"red"} >{props.err}</Typography>
                    <div className="df row m-v-primary">
                        
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Date type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.handleValues('get', 'date_type')}
                                label="Date type"
                                onChange={(e) => { props.handleValues('set', 'date_type', e.target.value) }}
                            >
                                <MenuItem value={'packing_date'}>Packing Date</MenuItem>
                                <MenuItem value={'sale_date'}>Sale Date</MenuItem>
                                
                            </Select>
                        </FormControl>
                    </div>
                    <div className="df row m-v-primary">

                        <TextField id="outlined-basic" type={"date"} value={props.handleValues('get', 'startDate')} onChange={(e) => { props.handleValues('set', 'startDate', e.target.value) }} label={_lang('start')} variant="outlined" />
                        <span className="df center p-primary"> - </span>
                        <TextField id="outlined-basic" type={"date"} value={props.handleValues('get', 'endDate')} onChange={(e) => { props.handleValues('set', 'endDate', e.target.value) }} label={_lang('end')} variant="outlined" />
                    </div>
                    <div className="df center row" >
                        {props.loading && <SmallLoader />}
                    </div>
                    <div className="row m-v-primary" style={{ marginBottom: "0px" }}>

                        <Button
                            disabled={props.loading}
                            variant="contained"
                            fullWidth={true}
                            onClick={props.exportCsv}

                        >{_lang('export')}</Button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ExportCsv