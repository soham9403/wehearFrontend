import { Button, FormControl, Typography } from "@mui/material"

import CustomInput from "../../../component/common/CustomInput"

import SmallLoader from "../../../component/common/SmallLoader"

import { _lang } from "../../../config/helper"

const AddUpdateCategory = (props) => {
    return (
        <>
            <div className="we-container-small  df column radius-2">
                <div className="df row column profile-edit-form" >
                    <h2 classname="h3">{props.calledFromUpdate ? _lang('update_category') : _lang('add_category')}</h2>
                    <form className="row df column " style={{ marginTop: "0px" }}>
                        <div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        </div>

                        <div className="form-filed row">
                            <CustomInput
                                disabled={props.loading}
                                value={props.handleValues('get', 'name')}
                                onChange={(e) => { props.handleValues('set', 'name', e.target.value) }}
                                type="text"
                                label={_lang('name')}
                            />
                        </div>

                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row form-filed " style={{ marginBottom: "0px", position: "sticky", bottom: "0px" }}>
                            {<Button disabled={props.loading} variant="contained" onClick={() => { if (props.calledFromUpdate) { props.updateFun() } else { props.createFun() } }} className="row" >
                                {props.calledFromUpdate ? _lang('update') : _lang('add')}
                            </Button>}
                        </div>


                    </form>
                </div>

            </div>
        </>
    )
}
export default AddUpdateCategory