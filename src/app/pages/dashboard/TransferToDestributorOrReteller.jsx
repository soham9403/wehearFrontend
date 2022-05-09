import { Box, Button, FormControl, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const TransferToDestributorOrReteller = (props) => {
    return (
        <>

            <div className="we-container-small  df column radius-2">
                <h3 className="h3">{props.fromReteller ? _lang('transfer_to_reteller') : _lang('transfer_to_destributor')}</h3>
                <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); props.onSubmitBtnClick() }}>
                    
                    <span className="h6  pt-3 pb-3 text-danger">{props.handleValues('get', 'err')}&nbsp;</span>
                    <div className="row">
                        <FormControl fullWidth={true} >
                            <SearchDropDown

                                getOptionLabel={(option) => {
                                    if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                        return option['name'] + " (" + option['usercode'] + ")"
                                    }
                                    return ""
                                }}
                                renderOption={(defaultProps, option) => (

                                    <Box component="li" {...defaultProps}>
                                        {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                            option['name'] + " (" + option['usercode'] + ")" : ""
                                        }
                                    </Box>
                                )}
                                list={props.list}

                                value={props.handleValues('get', 'allocated_user')}
                                label={props.fromReteller ? _lang('reteller') : _lang('destributor')}

                                onChange={(val) => { props.handleValues('set', 'allocated_user', val) }}
                            />
                        </FormControl>
                    </div>
                    <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{props.loading ? <SmallLoader /> : 'Transfer'}</button>
                </form>
            </div>
            {/*<div className={'column  row m-v-primary'} style={{ maxWidth: "500px", width: '90%' }}>

                <div className="df column p-primary radius-primary  row" style={{ overflowY: "scroll", maxHeight: "100%", background: "white" }}>
                    <Typography variant="h3">{props.fromReteller?_lang('transfer_to_reteller'):_lang('transfer_to_destributor')}</Typography>
                    {/*<form className="row df column m-v-primary" style={{ marginTop: "0px" }}>*/}
            <h3 className="h3 text-secondary">{props.title}</h3>
            {/*<span className="h6 text-danger">{props.error}&nbsp;</span>*/}

            {/*<div className="form-field">*/}

            {/*<CustomInput
                        disabled={props.loading}
                        value={props.val}

                        // value={value}
                        onChange={(e) => { props.setVal(e.target.value) }}
                        type="text"
    />*/}
            {/*</div>*/}
            {/*</form>*/}
            {/*<FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                            return option['name'] + " (" + option['usercode'] + ")"
                                        }
                                        return ""
                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                option['name'] + " (" + option['usercode'] + ")" : ""
                                            }
                                        </Box>
                                    )}
                                    list={props.list}

                                    value={props.handleValues('get', 'allocated_user')}
                                    label={props.fromReteller?_lang('reteller'):_lang('destributor')}

                                    onChange={(val) => { props.handleValues('set', 'allocated_user', val) }}
                                />
                            </FormControl>
                <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient">Save Changes</button>
        </div>
                        {/*<div className="row center df" style={{ height: "25px" }}>
                            <Typography variant="h4" align="center" color={"red"}>{props.handleValues('get', 'err')}</Typography>
                        </div>
                        <div className="row">
                            <FormControl fullWidth={true} >
                                <SearchDropDown

                                    getOptionLabel={(option) => {
                                        if (option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "") {
                                            return option['name'] + " (" + option['usercode'] + ")"
                                        }
                                        return ""
                                    }}
                                    renderOption={(defaultProps, option) => (

                                        <Box component="li" {...defaultProps}>
                                            {option['name'] && option['usercode'] && option['name'] != "" && option['usercode'] != "" ?
                                                option['name'] + " (" + option['usercode'] + ")" : ""
                                            }
                                        </Box>
                                    )}
                                    list={props.list}

                                    value={props.handleValues('get', 'allocated_user')}
                                    label={props.fromReteller?_lang('reteller'):_lang('destributor')}

                                    onChange={(val) => { props.handleValues('set', 'allocated_user', val) }}
                                />
                            </FormControl>
                        </div>
                        <div className="row df center" style={{ height: '25px' }}>{props.loading && <SmallLoader />}</div>
                        <div className="row m-v-primary" style={{ marginBottom: "0px" }}>
                            <Button
                                variant="contained"
                                fullWidth={true}
                                onClick={props.onSubmitBtnClick}

                            >{_lang('update')}</Button>
                                        </div>*/}
            {/*</div>*/}
        </>
    )
}
export default TransferToDestributorOrReteller