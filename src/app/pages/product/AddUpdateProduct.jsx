import { Button, FormControl, Typography } from "@mui/material"
import { Box } from "@mui/system"
import CustomInput from "../../../component/common/CustomInput"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import constants from "../../../config/constants"
import { getKeyByValue, getObjectBykey, isAllowedPhone, _lang } from "../../../config/helper"

const AddUpdateProduct = (props) => {
    return (
        <>
            <div className="we-container-small  df column radius-2">
                <div className="df row column profile-edit-form" >
                    <h2 classname="h3">{props.calledFromUpdate ? _lang('update_product') : _lang('add_product')}</h2>
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

                        <div className=" form-filed row">
                            <FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        return constants.color[option]

                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            { constants.color[option]}
                                        </Box>
                                    )}
                                    list={Object.keys(constants.color).map((label, index) => {
                                        return label
                                    })}

                                    value={props.handleValues('get', 'color') == '' ? null : props.handleValues('get', 'color')}
                                    label={_lang('color')}

                                    onChange={(val) => { props.handleValues('set', 'color', val) }}
                                />
                            </FormControl>
                        </div>


                        <div className=" form-filed row">
                            <FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        return option

                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            {option}
                                        </Box>
                                    )}
                                    list={constants.producttype}

                                    value={props.handleValues('get', 'type') == '' ? null : props.handleValues('get', 'type')}
                                    label={_lang('type')}

                                    onChange={(val) => { props.handleValues('set', 'type', val) }}
                                />
                            </FormControl>
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
export default AddUpdateProduct