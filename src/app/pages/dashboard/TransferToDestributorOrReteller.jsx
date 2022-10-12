import { Box, Button, FormControl, Typography } from "@mui/material"

import { useSelector } from "react-redux"
import DynamicDropDown from "../../../component/common/DynamicDropDown"

import SearchDropDown from "../../../component/common/SearchDropDown"
import SmallLoader from "../../../component/common/SmallLoader"
import { _lang } from "../../../config/helper"

const TransferToDestributorOrReteller = (props) => {
    const categories = useSelector(state => state.category).data
    return (
        <>

            <div className="we-container-small  df column radius-2">
                <h3 className="h3">{props.fromReteller ? _lang('transfer_to_reteller') : _lang('transfer_to_destributor')}</h3>
                <form className="df row column profile-edit-form" onSubmit={async (e) => { e.preventDefault(); props.onSubmitBtnClick() }}>

                    <span className="h6  pt-3 pb-3 text-danger">{props.handleValues('get', 'err')}&nbsp;</span>
                    <div className="row">
                        <FormControl fullWidth={true} >
                            {/* <SearchDropDown

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
                            /> */}
                            <DynamicDropDown placeholder={"Select " + (props.fromReteller ? _lang('reteller') : _lang('destributor'))} lazyFun={props.fetchUsers} defaultOption={[]} onSelect={(data) => { props.handleValues('set', 'allocated_user', data.value) }} />
                        </FormControl>
                    </div>

                    {(!props.currentCategory || props.currentCategory == '') && <div className="df mt-2">
                        <FormControl fullWidth={true} >
                            <SearchDropDown

                                getOptionLabel={(option) => {

                                    return option['name']
                                }}
                                renderOption={(defaultProps, option) => (

                                    <Box component="li" {...defaultProps}>
                                        {option['name']}
                                    </Box>
                                )}
                                list={categories}

                                value={props.handleValues('get', 'category')}
                                label={_lang('category')}

                                onChange={(val) => { props.handleValues('set', 'category', val) }}
                            />
                        </FormControl>
                    </div>}
                    <button className="auth-submit-btn df center text-light row pointer h3 btn-gradient">{props.loading ? <SmallLoader /> : 'Transfer'}</button>
                </form>
            </div>

            <h3 className="h3 text-secondary">{props.title}</h3>

        </>
    )
}
export default TransferToDestributorOrReteller