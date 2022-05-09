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
            <div className="we-container-small  df column radius-2">
                <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); props.exportCsv() }}>
                    <h3 className="h3 text-secondary">{_lang('export')}</h3>
                    <span className="h6 text-danger pb-3 pt-3">{props.err}&nbsp;</span>


                    <div className="df row form-filed">

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
                    <div className="df row form-filed">

                        <TextField className="df flex-1" id="outlined-basic" type={"date"} value={props.handleValues('get', 'startDate')} onChange={(e) => { props.handleValues('set', 'startDate', e.target.value) }} label={_lang('start')} variant="outlined" />
                        <span className="df center p-3"> - </span>
                        <TextField className="df flex-1" id="outlined-basic" type={"date"} value={props.handleValues('get', 'endDate')} onChange={(e) => { props.handleValues('set', 'endDate', e.target.value) }} label={_lang('end')} variant="outlined" />
                    </div>

                    <div className="row form-filed" style={{ marginBottom: "0px" }}>

                        <button
                            className="auth-submit-btn df center text-light row pointer h3 btn-gradient"
                            disabled={props.loading}
                            variant="contained"
                            fullWidth={true}


                        > {props.loading ? <SmallLoader /> : _lang('export')}</button>
                    </div>
                </form>


            </div>
        </>
    )
}
export default ExportCsv