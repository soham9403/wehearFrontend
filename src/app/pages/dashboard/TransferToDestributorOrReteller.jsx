import { Box, Button, FormControl, Typography } from "@mui/material"
import CustomInput from "../../../component/common/CustomInput"
import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const TransferToDestributorOrReteller = (props) => {
    return (
        <>
            <div className={'column  row m-v-primary'} style={{ maxWidth: "500px", width: '90%' }}>

                <div className="df column p-primary radius-primary  row" style={{ overflowY: "scroll", maxHeight: "100%", background: "white" }}>
                    <Typography variant="h3">{props.fromReteller?_lang('transfer_to_reteller'):_lang('transfer_to_destributor')}</Typography>
                    <form className="row df column m-v-primary" style={{ marginTop: "0px" }}>
                        <div className="row center df" style={{ height: "25px" }}>
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default TransferToDestributorOrReteller