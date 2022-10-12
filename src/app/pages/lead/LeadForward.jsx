import { Button, FormControl, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import CustomInput from "../../../component/common/CustomInput"
import DynamicDropDown from "../../../component/common/DynamicDropDown"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { _lang } from "../../../config/helper"

const LeadForward = (props) => {
    const { user } = useSelector(state => state)
    return (
        <>
            <div className="we-container-small  df column radius-2">
                <h3 className="h3">{_lang('forward')}</h3>
                <form className="df row column profile-edit-form" onSubmit={props.onSubmit}>

                    <span className="h6 text-danger pt-3 pb-3">{props.handleValues('get', 'err')}&nbsp;</span>


                    <div className="line-margin row" style={{ marginBottom: "10px" }}>
                        <CustomInput
                            disabled={props.loading}
                            value={props.handleValues('get', 'message')}
                            onChange={(e) => { props.handleValues('set', 'message', e.target.value) }}
                            type="textarea"
                            multiline={true}
                            rows={4}
                            label={_lang('message')}
                        />
                    </div>






                    <div className="form-filed row" style={{ marginBottom: "10px" }}>
                        <FormControl fullWidth={true} >
                            <SearchDropDown

                                getOptionLabel={(option) => {
                                    return option.label

                                }}
                                renderOption={(defaultProps, option) => (

                                    <Box component="li" {...defaultProps}>
                                        {option.label}
                                    </Box>
                                )}
                                list={props.assignToDropDown}

                                value={props.handleValues('get', 'to') == '' ? null : props.handleValues('get', 'to')}
                                label={_lang('to')}

                                onChange={(val) => { props.handleValues('set', 'to', val) }}
                            />
                        </FormControl>
                    </div>



                    {props.handleValues('get', 'to') && props.handleValues('get', 'to').index == 'child' && <DynamicDropDown placeholder="Select Child" lazyFun={props.fetchUserFun} defaultOption={[]} onSelect={(data) => { props.handleValues('set', 'toId', data.value) }} />}








                    <div className="row " style={{ marginBottom: "0px", zIndex: "", backgroundColor: "white" }}>
                        {<button disabled={props.loading} variant="contained" type="submit" className="row auth-submit-btn df center text-light row pointer h3 btn-gradient letter-space-2" >
                            {props.loading ? <SmallLoader /> : _lang('forward')}
                        </button>}
                    </div>


                </form>
            </div>

        </>
    )
}
export default LeadForward